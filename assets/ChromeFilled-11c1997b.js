import{T as g}from"./index-4070ec6e.js";import{r as _}from"./utils-f8386a49.js";import{a as h}from"./AntdIcon-462ec046.js";function b(n,f){for(var i=0;i<f.length;i++){const a=f[i];if(typeof a!="string"&&!Array.isArray(a)){for(const l in a)if(l!=="default"&&!(l in n)){const o=Object.getOwnPropertyDescriptor(a,l);o&&Object.defineProperty(n,l,o.get?o:{enumerable:!0,get:()=>a[l]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var m={},s={};Object.defineProperty(s,"__esModule",{value:!0});var O={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M371.8 512c0 77.5 62.7 140.2 140.2 140.2S652.2 589.5 652.2 512 589.5 371.8 512 371.8 371.8 434.4 371.8 512zM900 362.4l-234.3 12.1c63.6 74.3 64.6 181.5 11.1 263.7l-188 289.2c78 4.2 158.4-12.9 231.2-55.2 180-104 253-322.1 180-509.8zM320.3 591.9L163.8 284.1A415.35 415.35 0 0096 512c0 208 152.3 380.3 351.4 410.8l106.9-209.4c-96.6 18.2-189.9-34.8-234-121.5zm218.5-285.5l344.4 18.1C848 254.7 792.6 194 719.8 151.7 653.9 113.6 581.5 95.5 510.5 96c-122.5.5-242.2 55.2-322.1 154.5l128.2 196.9c32-91.9 124.8-146.7 222.2-141z"}}]},name:"chrome",theme:"filled"};s.default=O;(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var f=_,i=l(s),a=l(h);function l(e){return e&&e.__esModule?e:{default:e}}function o(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?Object(arguments[r]):{},u=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(u=u.concat(Object.getOwnPropertySymbols(t).filter(function(c){return Object.getOwnPropertyDescriptor(t,c).enumerable}))),u.forEach(function(c){p(e,c,t[c])})}return e}function p(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var d=function(r,t){var u=o({},r,t.attrs);return(0,f.createVNode)(a.default,o({},u,{icon:i.default}),null)};d.displayName="ChromeFilled",d.inheritAttrs=!1;var v=d;n.default=v})(m);const y=g(m),j=b({__proto__:null,default:y},[m]);export{j as C,m as a};