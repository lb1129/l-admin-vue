import{T as P}from"./index-4070ec6e.js";import{r as g}from"./utils-f8386a49.js";import{a as _}from"./AntdIcon-462ec046.js";function b(n,o){for(var u=0;u<o.length;u++){const a=o[u];if(typeof a!="string"&&!Array.isArray(a)){for(const l in a)if(l!=="default"&&!(l in n)){const i=Object.getOwnPropertyDescriptor(a,l);i&&Object.defineProperty(n,l,i.get?i:{enumerable:!0,get:()=>a[l]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var d={},p={};Object.defineProperty(p,"__esModule",{value:!0});var O={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"}}]},name:"plus-circle",theme:"filled"};p.default=O;(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=g,u=l(p),a=l(_);function l(e){return e&&e.__esModule?e:{default:e}}function i(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?Object(arguments[r]):{},c=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(c=c.concat(Object.getOwnPropertySymbols(t).filter(function(f){return Object.getOwnPropertyDescriptor(t,f).enumerable}))),c.forEach(function(f){v(e,f,t[f])})}return e}function v(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var s=function(r,t){var c=i({},r,t.attrs);return(0,o.createVNode)(a.default,i({},c,{icon:u.default}),null)};s.displayName="PlusCircleFilled",s.inheritAttrs=!1;var m=s;n.default=m})(d);const y=P(d),j=b({__proto__:null,default:y},[d]);export{j as P,d as a};