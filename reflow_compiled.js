if(!lt.util.load.provided_QMARK_('lt.plugins.reflow')) {
goog.provide('lt.plugins.reflow');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.reflow.requote = (function requote(s){var special = cljs.core.set.call(null,".?*+^$[]\\(){}|");var escfn = ((function (special){
return (function (p1__8674_SHARP_){if(cljs.core.truth_(special.call(null,p1__8674_SHARP_)))
{return [cljs.core.str("\\"),cljs.core.str(p1__8674_SHARP_)].join('');
} else
{return p1__8674_SHARP_;
}
});})(special))
;return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,escfn,s));
});
lt.plugins.reflow.SYMBOLS = (new RegExp("[^A-Za-z0-9\\u0080-\\uffff]*"));
lt.plugins.reflow.ALPHA = "[A-Za-z0-9\\u0080-\\uffff]";
lt.plugins.reflow.commonPrefix = (function commonPrefix(text){return lt.plugins.reflow._commonPrefix.call(null,text.split("\n"),null);
});
lt.plugins.reflow._commonPrefix = (function _commonPrefix(lines,prefix){var line = cljs.core.first.call(null,lines);var lines__$1 = cljs.core.rest.call(null,lines);var lprefix = cljs.core.first.call(null,line.match(lt.plugins.reflow.SYMBOLS));var prefix__$1 = (cljs.core.truth_(prefix)?prefix.slice(0,cljs.core.first.call(null,cljs.core.filter.call(null,((function (line,lines__$1,lprefix){
return (function (p1__8675_SHARP_){return cljs.core._EQ_.call(null,prefix.slice(0,p1__8675_SHARP_),lprefix.slice(0,p1__8675_SHARP_));
});})(line,lines__$1,lprefix))
,cljs.core.range.call(null,(function (){var x__7127__auto__ = cljs.core.count.call(null,prefix);var y__7128__auto__ = cljs.core.count.call(null,lprefix);return ((x__7127__auto__ < y__7128__auto__) ? x__7127__auto__ : y__7128__auto__);
})(),0,-1)))):lprefix);if((cljs.core._EQ_.call(null,prefix__$1,"")) || (cljs.core.empty_QMARK_.call(null,lines__$1)))
{return prefix__$1;
} else
{return _commonPrefix.call(null,lines__$1,prefix__$1);
}
});
lt.plugins.reflow.rewrap = (function rewrap(text,width){var prefix = lt.plugins.reflow.commonPrefix.call(null,text);var qprefix = lt.plugins.reflow.requote.call(null,prefix);var text__$1 = text.replace((new RegExp([cljs.core.str("\\s*\n"),cljs.core.str(qprefix)].join(''),"g"))," ");var text__$2 = text__$1.replace((new RegExp([cljs.core.str("^"),cljs.core.str(qprefix)].join(''))),"");return lt.plugins.reflow._rewrap.call(null,text__$2,(width - cljs.core.count.call(null,prefix)),prefix);
});
lt.plugins.reflow._rewrap = (function _rewrap(text,width,linePrefix){if((width >= text.length))
{return [cljs.core.str(linePrefix),cljs.core.str(text)].join('');
} else
{var re = (new RegExp([cljs.core.str("^((.{0,"),cljs.core.str((width - 1)),cljs.core.str("}\\S)\\s+(.*)|(\\S*)\\s*(.*))")].join('')));var match = re.exec(text);var line = (function (){var or__6813__auto__ = (match[2]);if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return (match[4]);
}
})();var more = (function (){var or__6813__auto__ = (match[3]);if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return (match[5]);
}
})();if((0 < more.length))
{return [cljs.core.str(linePrefix),cljs.core.str(line),cljs.core.str("\n"),cljs.core.str(_rewrap.call(null,more,width,linePrefix))].join('');
} else
{return [cljs.core.str(linePrefix),cljs.core.str(line)].join('');
}
}
});
lt.plugins.reflow.__BEH__reflow = (function __BEH__reflow(editor){if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor)))
{var map__8679_8680 = lt.objs.editor.selection_bounds.call(null,editor);var map__8679_8681__$1 = ((cljs.core.seq_QMARK_.call(null,map__8679_8680))?cljs.core.apply.call(null,cljs.core.hash_map,map__8679_8680):map__8679_8680);var to_8682 = cljs.core.get.call(null,map__8679_8681__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from_8683 = cljs.core.get.call(null,map__8679_8681__$1,new cljs.core.Keyword(null,"from","from",1017056028));var toline_8684 = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(to_8682),0))?(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(to_8682) - 1):new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(to_8682));lt.objs.editor.set_selection.call(null,editor,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(from_8683),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",1017226086),toline_8684], null));
} else
{var pos_8685 = lt.objs.editor.__GT_cursor.call(null,editor);var lineComment_8686 = (function (){var or__6813__auto__ = lt.objs.editor.__GT_cm_ed.call(null,editor).getModeAt(cljs.core.clj__GT_js.call(null,pos_8685)).lineComment;if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return null;
}
})();var line_8687 = new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(pos_8685);var lineRegex_8688 = (cljs.core.truth_((function (){var and__6801__auto__ = lineComment_8686;if(cljs.core.truth_(and__6801__auto__))
{return lt.objs.editor.line.call(null,editor,line_8687).match((new RegExp([cljs.core.str("^\\s*"),cljs.core.str(lt.plugins.reflow.requote.call(null,lineComment_8686))].join(''))));
} else
{return and__6801__auto__;
}
})())?(new RegExp([cljs.core.str("^\\s*"),cljs.core.str(lt.plugins.reflow.requote.call(null,lineComment_8686)),cljs.core.str(".*"),cljs.core.str(lt.plugins.reflow.ALPHA)].join(''))):(new RegExp(lt.plugins.reflow.ALPHA)));var from_8689 = ((function (){var or__6813__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (pos_8685,lineComment_8686,line_8687,lineRegex_8688){
return (function (p1__8676_SHARP_){return cljs.core.not.call(null,lt.objs.editor.line.call(null,editor,p1__8676_SHARP_).match(lineRegex_8688));
});})(pos_8685,lineComment_8686,line_8687,lineRegex_8688))
,cljs.core.range.call(null,line_8687,0,-1)));if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return -1;
}
})() + 1);var to_8690 = ((function (){var or__6813__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (pos_8685,lineComment_8686,line_8687,lineRegex_8688,from_8689){
return (function (p1__8677_SHARP_){return cljs.core.not.call(null,lt.objs.editor.line.call(null,editor,p1__8677_SHARP_).match(lineRegex_8688));
});})(pos_8685,lineComment_8686,line_8687,lineRegex_8688,from_8689))
,cljs.core.range.call(null,line_8687,(lt.objs.editor.last_line.call(null,editor) + 1))));if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return (lt.objs.editor.last_line.call(null,editor) + 1);
}
})() - 1);if((from_8689 <= to_8690))
{lt.objs.editor.set_selection.call(null,editor,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),from_8689,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",1017226086),to_8690], null));
} else
{}
}
if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor)))
{var width = new cljs.core.Keyword(null,"reflow-width","reflow-width",1058489932).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));return lt.objs.editor.replace_selection.call(null,editor,lt.plugins.reflow.rewrap.call(null,lt.objs.editor.selection.call(null,editor),width));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.reflow","reflow","lt.plugins.reflow/reflow",3528830403),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.reflow.__BEH__reflow,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reflow","reflow",4374049107),null], null), null));
lt.plugins.reflow.__BEH__set_width = (function __BEH__set_width(editor,width){return lt.object.merge_BANG_.call(null,editor,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reflow-width","reflow-width",1058489932),width], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.reflow","set-width","lt.plugins.reflow/set-width",4034763909),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.reflow.__BEH__set_width,new cljs.core.Keyword(null,"desc","desc",1016984067),"Editor: Reflow wrap width",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Wrap width",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"number","number",4274507451)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.reflow","reflow","lt.plugins.reflow/reflow",3528830403),new cljs.core.Keyword(null,"desc","desc",1016984067),"Reflow paragraph",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var editor = temp__4092__auto__;return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"reflow","reflow",4374049107));
} else
{return null;
}
})], null));
}

//# sourceMappingURL=reflow_compiled.js.map