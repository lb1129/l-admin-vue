import{T as F}from"./index-ed1d3163.js";import{r as g}from"./utils-e2f33421.js";import{a as _}from"./AntdIcon-1dc18159.js";function b(a,d){for(var i=0;i<d.length;i++){const n=d[i];if(typeof n!="string"&&!Array.isArray(n)){for(const l in n)if(l!=="default"&&!(l in a)){const o=Object.getOwnPropertyDescriptor(n,l);o&&Object.defineProperty(a,l,o.get?o:{enumerable:!0,get:()=>n[l]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var s={},p={};Object.defineProperty(p,"__esModule",{value:!0});var O={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32z"}}]},name:"folder",theme:"filled"};p.default=O;(function(a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var d=g,i=l(p),n=l(_);function l(e){return e&&e.__esModule?e:{default:e}}function o(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?Object(arguments[r]):{},u=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(u=u.concat(Object.getOwnPropertySymbols(t).filter(function(f){return Object.getOwnPropertyDescriptor(t,f).enumerable}))),u.forEach(function(f){v(e,f,t[f])})}return e}function v(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var c=function(r,t){var u=o({},r,t.attrs);return(0,d.createVNode)(n.default,o({},u,{icon:i.default}),null)};c.displayName="FolderFilled",c.inheritAttrs=!1;var m=c;a.default=m})(s);const y=F(s),$=b({__proto__:null,default:y},[s]);export{$ as F,s as a};
