import{T as m}from"./index-4070ec6e.js";import{r as v}from"./utils-f8386a49.js";import{a as C}from"./AntdIcon-462ec046.js";function T(n,a){for(var o=0;o<a.length;o++){const l=a[o];if(typeof l!="string"&&!Array.isArray(l)){for(const c in l)if(c!=="default"&&!(c in n)){const i=Object.getOwnPropertyDescriptor(l,c);i&&Object.defineProperty(n,c,i.get?i:{enumerable:!0,get:()=>l[c]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var d={},p={};Object.defineProperty(p,"__esModule",{value:!0});var _={icon:function(a,o){return{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z",fill:a}},{tag:"path",attrs:{d:"M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm193.4 225.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.3 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.7-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.4 12.7z",fill:o}},{tag:"path",attrs:{d:"M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z",fill:a}}]}},name:"check-circle",theme:"twotone"};p.default=_;(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=v,o=c(p),l=c(C);function c(e){return e&&e.__esModule?e:{default:e}}function i(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?Object(arguments[t]):{},u=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(u=u.concat(Object.getOwnPropertySymbols(r).filter(function(f){return Object.getOwnPropertyDescriptor(r,f).enumerable}))),u.forEach(function(f){g(e,f,r[f])})}return e}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=function(t,r){var u=i({},t,r.attrs);return(0,a.createVNode)(l.default,i({},u,{icon:o.default}),null)};s.displayName="CheckCircleTwoTone",s.inheritAttrs=!1;var h=s;n.default=h})(d);const b=m(d),P=T({__proto__:null,default:b},[d]);export{P as C,d as a};