define("compDesignUtils/cssItem/property",["lodash"],function(t){"use strict";return{keyvalue:function(t,e){return function(r,n){return r[t]=e(n),r}},map:function(e){return function(r,n){return t(e).mapValues(function(t){return t(n)}).merge(r).value()}}}}),define("compDesignUtils/cssItem/cssToken",[],function(){"use strict";return{KEYWORD:"keyword",LENGTH_OR_PERCENTAGE:"length_or_percentage",COLOR_RGBA:"rgbcolor",BR_WIDTH:"br_width",BORDER_WIDTH:"border_width",BORDER_STYLE:"border_style",BORDER_COLOR:"border_color"}}),define("compDesignUtils/cssItem/stringify",["lodash","compDesignUtils/cssItem/cssToken"],function(t,e){"use strict";var r={value:function(e,r){return function(o){var i=r||t.keys(o);return t(i).filter(t.partial(t.has,e)).map(function(t){return n[e[t]](o[t],t)}).without("").join(" ")}},join:function(e){return t(e).values().join(" ")},list:function(e){return function(r){return t.map(r,e).join(", ")}}},n={};return n[e.KEYWORD]=function(t,e){return t?e:""},n[e.LENGTH_OR_PERCENTAGE]=function(t){return 0===t.value?"0":t.value.toString()+t.unit},n[e.COLOR_RGBA]=function(t){return"rgba("+t.red+", "+t.green+", "+t.blue+", "+t.alpha+")"},n[e.BR_WIDTH]=function(t){return"string"==typeof t?t:n[e.LENGTH_OR_PERCENTAGE](t)},n[e.BORDER_WIDTH]=r.value({top:e.BR_WIDTH,right:e.BR_WIDTH,bottom:e.BR_WIDTH,left:e.BR_WIDTH}),n[e.BORDER_STYLE]=r.join,n[e.BORDER_COLOR]=r.value({top:e.COLOR_RGBA,right:e.COLOR_RGBA,bottom:e.COLOR_RGBA,left:e.COLOR_RGBA}),Object.freeze(n),r}),define("compDesignUtils/cssItem/cssItem",["compDesignUtils/cssItem/property","compDesignUtils/cssItem/stringify","compDesignUtils/cssItem/cssToken"],function(t,e,r){"use strict";return{cssBoxShadow:t.keyvalue("boxShadow",e.list(e.value({inset:r.KEYWORD,offsetX:r.LENGTH_OR_PERCENTAGE,offsetY:r.LENGTH_OR_PERCENTAGE,blurRadius:r.LENGTH_OR_PERCENTAGE,spreadRadius:r.LENGTH_OR_PERCENTAGE,color:r.COLOR_RGBA}))),cssBorderRadius:t.keyvalue("borderRadius",e.value({topLeft:r.LENGTH_OR_PERCENTAGE,topRight:r.LENGTH_OR_PERCENTAGE,bottomRight:r.LENGTH_OR_PERCENTAGE,bottomLeft:r.LENGTH_OR_PERCENTAGE},["topLeft","topRight","bottomRight","bottomLeft"])),cssBorder:t.map({borderWidth:e.value({width:r.BORDER_WIDTH}),borderStyle:e.value({style:r.BORDER_STYLE}),borderColor:e.value({color:r.BORDER_COLOR})})}}),define("compDesignUtils",["lodash","compDesignUtils/cssItem/cssItem"],function(t,e){"use strict";function r(r){return t(r).keys().filter(function(n){return!t.isNull(r[n])&&t.has(e,n)}).reduce(function(t,n){return e[n](t,r[n])},{})}return{renderDesign:r,getContainerStyle:function(e,n){var o={};if(n){var i=t.get(e,"cssStyle");t.isPlainObject(i)&&(o=t.assign(r(i),{overflow:"hidden",WebkitFilter:"blur()"}))}return o}}});
//# sourceMappingURL=compDesignUtils.min.js.map