import{T as m}from"./index-4070ec6e.js";import{r as g}from"./utils-f8386a49.js";import{a as P}from"./AntdIcon-462ec046.js";function _(a,i){for(var o=0;o<i.length;o++){const n=i[o];if(typeof n!="string"&&!Array.isArray(n)){for(const u in n)if(u!=="default"&&!(u in a)){const l=Object.getOwnPropertyDescriptor(n,u);l&&Object.defineProperty(a,u,l.get?l:{enumerable:!0,get:()=>n[u]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var d={},p={};Object.defineProperty(p,"__esModule",{value:!0});var b={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"}},{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"}}]},name:"plus-square",theme:"outlined"};p.default=b;(function(a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=g,o=u(p),n=u(P);function u(e){return e&&e.__esModule?e:{default:e}}function l(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?Object(arguments[t]):{},c=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(c=c.concat(Object.getOwnPropertySymbols(r).filter(function(f){return Object.getOwnPropertyDescriptor(r,f).enumerable}))),c.forEach(function(f){v(e,f,r[f])})}return e}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=function(t,r){var c=l({},t,r.attrs);return(0,i.createVNode)(n.default,l({},c,{icon:o.default}),null)};s.displayName="PlusSquareOutlined",s.inheritAttrs=!1;var O=s;a.default=O})(d);const h=m(d),j=_({__proto__:null,default:h},[d]);export{j as P,d as a};