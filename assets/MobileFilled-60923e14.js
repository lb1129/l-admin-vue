import{T as v}from"./index-4070ec6e.js";import{r as g}from"./utils-f8386a49.js";import{a as _}from"./AntdIcon-462ec046.js";function M(n,f){for(var o=0;o<f.length;o++){const a=f[o];if(typeof a!="string"&&!Array.isArray(a)){for(const l in a)if(l!=="default"&&!(l in n)){const i=Object.getOwnPropertyDescriptor(a,l);i&&Object.defineProperty(n,l,i.get?i:{enumerable:!0,get:()=>a[l]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var s={},b={};Object.defineProperty(b,"__esModule",{value:!0});var O={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M744 62H280c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h464c35.3 0 64-28.7 64-64V126c0-35.3-28.7-64-64-64zM512 824c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"}}]},name:"mobile",theme:"filled"};b.default=O;(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var f=g,o=l(b),a=l(_);function l(e){return e&&e.__esModule?e:{default:e}}function i(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?Object(arguments[t]):{},u=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(u=u.concat(Object.getOwnPropertySymbols(r).filter(function(c){return Object.getOwnPropertyDescriptor(r,c).enumerable}))),u.forEach(function(c){p(e,c,r[c])})}return e}function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var d=function(t,r){var u=i({},t,r.attrs);return(0,f.createVNode)(a.default,i({},u,{icon:o.default}),null)};d.displayName="MobileFilled",d.inheritAttrs=!1;var m=d;n.default=m})(s);const y=v(s),j=M({__proto__:null,default:y},[s]);export{j as M,s as a};