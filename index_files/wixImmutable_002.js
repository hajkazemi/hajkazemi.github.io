define(["lodash","immutable"],function(t,r){return function(t){function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var e={};return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},r.p="",r(r.s=78)}({0:function(r,e){r.exports=t},78:function(t,r,e){"use strict";var n=e(0),o=e(79),u=Object.create(o);u.fromJS=function t(r){return n.isArray(r)?o.List(n.map(r,t)):n.isObject(r)?o.Map(n.mapValues(r,t)):r},t.exports=u},79:function(t,e){t.exports=r}})});
//# sourceMappingURL=wixImmutable.js.map