import{T as v}from"./index-4070ec6e.js";import{r as g}from"./utils-f8386a49.js";import{a as P}from"./AntdIcon-462ec046.js";function _(l,f){for(var o=0;o<f.length;o++){const u=f[o];if(typeof u!="string"&&!Array.isArray(u)){for(const r in u)if(r!=="default"&&!(r in l)){const a=Object.getOwnPropertyDescriptor(u,r);a&&Object.defineProperty(l,r,a.get?a:{enumerable:!0,get:()=>u[r]})}}}return Object.freeze(Object.defineProperty(l,Symbol.toStringTag,{value:"Module"}))}var s={},p={};Object.defineProperty(p,"__esModule",{value:!0});var b={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 607.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V607.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V650h182.9v148zm9.6-226.6l-8.4 14.6H419.3l-8.4-14.6L334.4 438h355.2L613 571.4zM726.3 374H297.7l-85-148h598.6l-85 148z"}}]},name:"funnel-plot",theme:"outlined"};p.default=b;(function(l){Object.defineProperty(l,"__esModule",{value:!0}),l.default=void 0;var f=g,o=r(p),u=r(P);function r(e){return e&&e.__esModule?e:{default:e}}function a(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?Object(arguments[t]):{},i=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(c){return Object.getOwnPropertyDescriptor(n,c).enumerable}))),i.forEach(function(c){O(e,c,n[c])})}return e}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(t,n){var i=a({},t,n.attrs);return(0,f.createVNode)(u.default,a({},i,{icon:o.default}),null)};d.displayName="FunnelPlotOutlined",d.inheritAttrs=!1;var m=d;l.default=m})(s);const y=v(s),M=_({__proto__:null,default:y},[s]);export{M as F,s as a};