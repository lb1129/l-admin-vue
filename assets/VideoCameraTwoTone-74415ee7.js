import{T as g}from"./index-4070ec6e.js";import{r as T}from"./utils-f8386a49.js";import{a as _}from"./AntdIcon-462ec046.js";function V(a,n){for(var c=0;c<n.length;c++){const i=n[c];if(typeof i!="string"&&!Array.isArray(i)){for(const o in i)if(o!=="default"&&!(o in a)){const u=Object.getOwnPropertyDescriptor(i,o);u&&Object.defineProperty(a,o,u.get?u:{enumerable:!0,get:()=>i[o]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var m={},s={};Object.defineProperty(s,"__esModule",{value:!0});var b={icon:function(n,c){return{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M136 792h576V232H136v560zm64-488c0-4.4 3.6-8 8-8h112c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H208c-4.4 0-8-3.6-8-8v-48z",fill:c}},{tag:"path",attrs:{d:"M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM712 792H136V232h576v560zm176-167l-104-59.8V458.9L888 399v226z",fill:n}},{tag:"path",attrs:{d:"M208 360h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z",fill:n}}]}},name:"video-camera",theme:"twotone"};s.default=b;(function(a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=T,c=o(s),i=o(_);function o(e){return e&&e.__esModule?e:{default:e}}function u(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?Object(arguments[t]):{},f=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(f=f.concat(Object.getOwnPropertySymbols(r).filter(function(l){return Object.getOwnPropertyDescriptor(r,l).enumerable}))),f.forEach(function(l){v(e,l,r[l])})}return e}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var d=function(t,r){var f=u({},t,r.attrs);return(0,n.createVNode)(i.default,u({},f,{icon:c.default}),null)};d.displayName="VideoCameraTwoTone",d.inheritAttrs=!1;var p=d;a.default=p})(m);const O=g(m),P=V({__proto__:null,default:O},[m]);export{P as V,m as a};