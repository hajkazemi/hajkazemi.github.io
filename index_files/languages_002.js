!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var o,u=t.flagCountryIconType={ROUND_CORNER:"roundedCorners",CIRCLE:"circle",SQUARE:"square"},f=t.symbolSuffixMap=(o={},r(o,u.ROUND_CORNER,"_C.svg"),r(o,u.CIRCLE,"_R.svg"),r(o,u.SQUARE,"_S.svg"),o);t.default={flagCountryIconType:u,symbolSuffixMap:f}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["eng","deu","zho","heb","bel","spa"],e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=function(e){return function(t){return t.toUpperCase()+e}};t.default={translationKey:{getShortName:o("_SHORT_NAME"),getFullName:o("_FULL_NAME"),getFlagCountry:o("_FLAG_COUNTRY")},getIconFileName:function(e,t){return e+r.symbolSuffixMap[t]}},e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),u=r(o),f=n(2),l=r(f),a=n(0);t.default={languages:u.default,utils:l.default,flagCountryIconType:a.flagCountryIconType},e.exports=t.default}])});