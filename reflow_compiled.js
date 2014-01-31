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
lt.plugins.reflow.rewrap = (function rewrap(text,width){var text__$1 = text.replace((new RegExp("\\s*\n","g"))," ");return lt.plugins.reflow._rewrap.call(null,text__$1,width);
});
lt.plugins.reflow._rewrap = (function _rewrap(text,width){if((width >= text.length))
{return text;
} else
{var re = (new RegExp([cljs.core.str("^((.{0,"),cljs.core.str((width - 1)),cljs.core.str("}\\S)\\s+(.*)|(\\S*)\\s*(.*))")].join('')));var match = re.exec(text);var line = (function (){var or__6743__auto__ = (match[2]);if(cljs.core.truth_(or__6743__auto__))
{return or__6743__auto__;
} else
{return (match[4]);
}
})();var more = (function (){var or__6743__auto__ = (match[3]);if(cljs.core.truth_(or__6743__auto__))
{return or__6743__auto__;
} else
{return (match[5]);
}
})();if((0 < more.length))
{return [cljs.core.str(line),cljs.core.str("\n"),cljs.core.str(_rewrap.call(null,more,width))].join('');
} else
{return line;
}
}
});
lt.plugins.reflow.__BEH__reflow = (function __BEH__reflow(editor){if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor)))
{var map__8186_8197 = lt.objs.editor.selection_bounds.call(null,editor);var map__8186_8198__$1 = ((cljs.core.seq_QMARK_.call(null,map__8186_8197))?cljs.core.apply.call(null,cljs.core.hash_map,map__8186_8197):map__8186_8197);var to_8199 = cljs.core.get.call(null,map__8186_8198__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from_8200 = cljs.core.get.call(null,map__8186_8198__$1,new cljs.core.Keyword(null,"from","from",1017056028));var toline_8201 = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(to_8199),0))?(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(to_8199) - 1):new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(to_8199));lt.objs.editor.set_selection.call(null,editor,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(from_8200),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",1017226086),toline_8201], null));
} else
{var pos_8202 = lt.objs.editor.__GT_cursor.call(null,editor);var line_8203 = new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(pos_8202);var from_8204 = ((function (){var or__6743__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (pos_8202,line_8203){
return (function (p1__8183_SHARP_){return cljs.core._EQ_.call(null,lt.objs.editor.line_length.call(null,editor,p1__8183_SHARP_),0);
});})(pos_8202,line_8203))
,cljs.core.range.call(null,line_8203,0,-1)));if(cljs.core.truth_(or__6743__auto__))
{return or__6743__auto__;
} else
{return -1;
}
})() + 1);var to_8205 = ((function (){var or__6743__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (pos_8202,line_8203,from_8204){
return (function (p1__8184_SHARP_){return cljs.core._EQ_.call(null,lt.objs.editor.line_length.call(null,editor,p1__8184_SHARP_),0);
});})(pos_8202,line_8203,from_8204))
,cljs.core.range.call(null,line_8203,(lt.objs.editor.last_line.call(null,editor) + 1))));if(cljs.core.truth_(or__6743__auto__))
{return or__6743__auto__;
} else
{return (lt.objs.editor.last_line.call(null,editor) + 1);
}
})() - 1);if((from_8204 <= to_8205))
{lt.objs.editor.set_selection.call(null,editor,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),from_8204,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",1017226086),to_8205], null));
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