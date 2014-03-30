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

;; Treat all non-ASCII characters as alphabetic.  Obviously wrong, but the right thing isn't obvious.
(def SYMBOLS (js/RegExp. "[^A-Za-z0-9\\u0080-\\uffff]*"))
(def ALPHA "[A-Za-z0-9\\u0080-\\uffff]")

(defn commonPrefix [text]
  (_commonPrefix (.split text "\n") nil))

(defn _commonPrefix [lines prefix]
  (let [line (first lines)
        lines (rest lines)
        lprefix (first (.match line SYMBOLS))
        prefix (if prefix
                 ;; Take the longest substring from the beginning that's in both
                 (.slice prefix 0 (first (filter #(= (.slice prefix 0 %) (.slice lprefix 0 %))
                                                 (range (min (count prefix) (count lprefix)) 0 -1))))
                 lprefix)]
    (if (or (= prefix "") (empty? lines))
      prefix
      (_commonPrefix lines prefix))))

(defn rewrap [text width]
  (let [prefix (commonPrefix text)
        qprefix (requote prefix)
        ;; Remove newlines and prefix at the beginning of all but first line
        text (.replace text (js/RegExp. (str "\\s*\n" qprefix) "g") " ")
        ;; Remove prefix from first line
        text (.replace text (js/RegExp. (str "^" qprefix)) "")]
    (_rewrap text (- width (count prefix)) prefix)))

(defn _rewrap [text width linePrefix]
  (if (>= width (.-length text))
    (str linePrefix text)
    (let [re (js/RegExp. (str "^((.{0," (- width 1) "}\\S)\\s+(.*)|(\\S*)\\s*(.*))"))
          match (.exec re text)
          line (or (aget match 2) (aget match 4))
          more (or (aget match 3) (aget match 5))]
      (if (< 0 (.-length more))
        (str linePrefix line "\n" (_rewrap more width linePrefix))
        (str linePrefix line)))))

(behavior ::reflow
          :triggers #{:reflow}
          :reaction (fn [editor]
                      (if (ed/selection? editor)
                        (let [{:keys [from to]} (ed/selection-bounds editor)
                              toline (if (= (:ch to) 0) (- (:line to) 1) (:line to))]
                          (ed/set-selection editor {:line (:line from) :ch 0} {:line toline}))
                        (let [pos (ed/->cursor editor)
                              lineComment (or (.-lineComment (.getModeAt (ed/->cm-ed editor)
                                                                         (clj->js pos)))
                                              nil)
                              line (:line pos)
                              ;; If current line is a comment, only included commented lines in paragraph
                              lineRegex (if (and lineComment (.match (ed/line editor line)
                                                                     (js/RegExp. (str "^\\s*" (requote lineComment)))))
                                          (js/RegExp. (str "^\\s*" (requote lineComment) ".*" ALPHA))
                                          (js/RegExp. ALPHA))
                              from (+ (or (first (filter #(not (.match (ed/line editor %) lineRegex)) (range line 0 -1))) -1) 1)
                              to   (- (or (first (filter #(not (.match (ed/line editor %) lineRegex)) (range line (+ (ed/last-line editor) 1))))
                                          (+ (ed/last-line editor) 1)) 1)]
                          (if (<= from to)
                            (ed/set-selection editor {:line from :ch 0} {:line to}))))
                      (if (ed/selection? editor)
                        (let [width (:reflow-width @editor)]
                          (ed/replace-selection editor (rewrap (ed/selection editor) width))))))

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
