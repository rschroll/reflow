;; Copyright 2014 Robert Schroll
;; This file is part of Reflow and is distributed under the MIT license.

(ns lt.plugins.reflow
  (:require [lt.object :as object]
            [lt.objs.editor :as ed]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [behavior]]))

;; http://stackoverflow.com/questions/11976210/javas-pattern-quote-equivalent-in-clojurescript
(defn requote [s]
  (let [special (set ".?*+^$[]\\(){}|")
        escfn #(if (special %) (str \\ %) %)]
    (apply str (map escfn s))))

(defn rewrap [text width lineComment]
  (let [commented (and lineComment (.startsWith text lineComment))
        quotedComment (requote lineComment)
        ;; Remove newlines and comment symbols at the beginning of all but first lines
        text (.replace text (js/RegExp. (str "\\s*\n(" (if commented (str quotedComment " ?") "") ")?") "g") " ")
        ;; Remove comment symbols from first line
        text (if commented
               (.replace text (js/RegExp. (str "^" quotedComment " ?")) "")
               text)]
    (_rewrap text
             (if commented (- width (count lineComment) 1) width)
             (if commented (str lineComment " ") ""))))

(defn _rewrap [text width lineComment]
  (if (>= width (.-length text))
    (str lineComment text)
    (let [re (js/RegExp. (str "^((.{0," (- width 1) "}\\S)\\s+(.*)|(\\S*)\\s*(.*))"))
          match (.exec re text)
          line (or (aget match 2) (aget match 4))
          more (or (aget match 3) (aget match 5))]
      (if (< 0 (.-length more))
        (str lineComment line "\n" (_rewrap more width lineComment))
        (str lineComment line)))))

(behavior ::reflow
          :triggers #{:reflow}
          :reaction (fn [editor]
                      (if (ed/selection? editor)
                        (let [{:keys [from to]} (ed/selection-bounds editor)
                              toline (if (= (:ch to) 0) (- (:line to) 1) (:line to))]
                          (ed/set-selection editor {:line (:line from) :ch 0} {:line toline}))
                        (let [pos (ed/->cursor editor)
                              line (:line pos)
                              from (+ (or (first (filter #(= (ed/line-length editor %) 0) (range line 0 -1))) -1) 1)
                              to   (- (or (first (filter #(= (ed/line-length editor %) 0) (range line (+ (ed/last-line editor) 1))))
                                          (+ (ed/last-line editor) 1)) 1)]
                          (if (<= from to)
                            (ed/set-selection editor {:line from :ch 0} {:line to}))))
                      (if (ed/selection? editor)
                        (let [width (:reflow-width @editor)
                              lineComment (or (.-lineComment (.getModeAt (ed/->cm-ed editor)
                                                                         (clj->js (:from (ed/selection-bounds editor)))))
                                              nil)]
                          (ed/replace-selection editor (rewrap (ed/selection editor) width lineComment))))))

(behavior ::set-width
          :triggers #{:object.instant}
          :desc "Editor: Reflow wrap width"
          :params [{:label "Wrap width" :type :number}]
          :type :user
          :exclusive true
          :reaction (fn [editor width]
                      (object/merge! editor {:reflow-width width})))

(cmd/command {:command ::reflow
              :desc "Reflow paragraph"
              :exec (fn []
                      (when-let [editor (pool/last-active)]
                        (object/raise editor :reflow)))})
