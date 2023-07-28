import{k as V,aa as Tt,m as Q,x as gt,a9 as bt,y as pt,aZ as at,al as Ct,t as h,L as it,aV as St,as as xt,r as $,h as F,ac as kt,D as wt,s as f,w as Nt,aT as At,X as yt,l as L,a_ as Lt,aF as _t,a$ as Bt}from"./index-c3627875.js";import{w as rt}from"./raf-8f666c46.js";var X={transitionstart:{transition:"transitionstart",WebkitTransition:"webkitTransitionStart",MozTransition:"mozTransitionStart",OTransition:"oTransitionStart",msTransition:"MSTransitionStart"},animationstart:{animation:"animationstart",WebkitAnimation:"webkitAnimationStart",MozAnimation:"mozAnimationStart",OAnimation:"oAnimationStart",msAnimation:"MSAnimationStart"}},Z={transitionend:{transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd"},animationend:{animation:"animationend",WebkitAnimation:"webkitAnimationEnd",MozAnimation:"mozAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd"}},_=[],B=[];function It(){var n=document.createElement("div"),t=n.style;"AnimationEvent"in window||(delete X.animationstart.animation,delete Z.animationend.animation),"TransitionEvent"in window||(delete X.transitionstart.transition,delete Z.transitionend.transition);function a(i,b){for(var d in i)if(i.hasOwnProperty(d)){var p=i[d];for(var s in p)if(s in t){b.push(p[s]);break}}}a(X,_),a(Z,B)}typeof window<"u"&&typeof document<"u"&&It();function ot(n,t,a){n.addEventListener(t,a,!1)}function lt(n,t,a){n.removeEventListener(t,a,!1)}var Mt={startEvents:_,addStartEventListener:function(t,a){if(_.length===0){setTimeout(a,0);return}_.forEach(function(i){ot(t,i,a)})},removeStartEventListener:function(t,a){_.length!==0&&_.forEach(function(i){lt(t,i,a)})},endEvents:B,addEndEventListener:function(t,a){if(B.length===0){setTimeout(a,0);return}B.forEach(function(i){ot(t,i,a)})},removeEndEventListener:function(t,a){B.length!==0&&B.forEach(function(i){lt(t,i,a)})}};const R=Mt;var w;function ut(n){return!n||n.offsetParent===null}function Ot(n){var t=(n||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);return t&&t[1]&&t[2]&&t[3]?!(t[1]===t[2]&&t[2]===t[3]):!0}const Pt=V({compatConfig:{MODE:3},name:"Wave",props:{insertExtraNode:Boolean,disabled:Boolean},setup:function(t,a){var i=a.slots,b=a.expose,d=Tt(),p=Q("",t),s=p.csp,l=p.prefixCls;b({csp:s});var C=null,S=null,P=null,x=!1,v=null,A=!1,y=function(e){if(!A){var u=at(d);!e||e.target!==u||x||O(u)}},k=function(e){!e||e.animationName!=="fadeEffect"||O(e.target)},I=function(){var e=t.insertExtraNode;return e?"".concat(l.value,"-click-animating"):"".concat(l.value,"-click-animating-without-extra-node")},M=function(e,u){var N=t.insertExtraNode,o=t.disabled;if(!(o||!e||ut(e)||e.className.indexOf("-leave")>=0)){v=document.createElement("div"),v.className="".concat(l.value,"-click-animating-node");var r=I();if(e.removeAttribute(r),e.setAttribute(r,"true"),w=w||document.createElement("style"),u&&u!=="#ffffff"&&u!=="rgb(255, 255, 255)"&&Ot(u)&&!/rgba\(\d*, \d*, \d*, 0\)/.test(u)&&u!=="transparent"){var m;(m=s.value)!==null&&m!==void 0&&m.nonce&&(w.nonce=s.value.nonce),v.style.borderColor=u,w.innerHTML=`
        [`.concat(l.value,"-click-animating-without-extra-node='true']::after, .").concat(l.value,`-click-animating-node {
          --antd-wave-shadow-color: `).concat(u,`;
        }`),document.body.contains(w)||document.body.appendChild(w)}N&&e.appendChild(v),R.addStartEventListener(e,y),R.addEndEventListener(e,k)}},O=function(e){if(!(!e||e===v||!(e instanceof Element))){var u=t.insertExtraNode,N=I();e.setAttribute(N,"false"),w&&(w.innerHTML=""),u&&v&&e.contains(v)&&e.removeChild(v),R.removeStartEventListener(e,y),R.removeEndEventListener(e,k)}},z=function(e){if(!(!e||!e.getAttribute||e.getAttribute("disabled")||e.className.indexOf("disabled")>=0)){var u=function(o){if(!(o.target.tagName==="INPUT"||ut(o.target))){O(e);var r=getComputedStyle(e).getPropertyValue("border-top-color")||getComputedStyle(e).getPropertyValue("border-color")||getComputedStyle(e).getPropertyValue("background-color");S=setTimeout(function(){return M(e,r)},0),rt.cancel(P),x=!0,P=rt(function(){x=!1},10)}};return e.addEventListener("click",u,!0),{cancel:function(){e.removeEventListener("click",u,!0)}}}};return gt(function(){bt(function(){var c=at(d);c.nodeType===1&&(C=z(c))})}),pt(function(){C&&C.cancel(),clearTimeout(S),A=!0}),function(){var c;return(c=i.default)===null||c===void 0?void 0:c.call(i)[0]}}});function Vt(n){return n==="danger"?{danger:!0}:{type:n}}var zt=function(){return{prefixCls:String,type:String,htmlType:{type:String,default:"button"},shape:{type:String},size:{type:String},loading:{type:[Boolean,Object],default:function(){return!1}},disabled:{type:Boolean,default:void 0},ghost:{type:Boolean,default:void 0},block:{type:Boolean,default:void 0},danger:{type:Boolean,default:void 0},icon:Ct.any,href:String,target:String,title:String,onClick:{type:Function},onMousedown:{type:Function}}};const Wt=zt;var st=function(t){t&&(t.style.width="0px",t.style.opacity="0",t.style.transform="scale(0)")},ct=function(t){bt(function(){t&&(t.style.width="".concat(t.scrollWidth,"px"),t.style.opacity="1",t.style.transform="scale(1)")})},ft=function(t){t&&t.style&&(t.style.width=null,t.style.opacity=null,t.style.transform=null)};const jt=V({compatConfig:{MODE:3},name:"LoadingIcon",props:{prefixCls:String,loading:[Boolean,Object],existIcon:Boolean},setup:function(t){return function(){var a=t.existIcon,i=t.prefixCls,b=t.loading;if(a)return h("span",{class:"".concat(i,"-loading-icon")},[h(it,null,null)]);var d=!!b;return h(St,{name:"".concat(i,"-loading-icon-motion"),onBeforeEnter:st,onEnter:ct,onAfterEnter:ft,onBeforeLeave:ct,onLeave:function(s){setTimeout(function(){st(s)})},onAfterLeave:ft},{default:function(){return[d?h("span",{class:"".concat(i,"-loading-icon")},[h(it,null,null)]):null]}})}}});var dt=/^[\u4e00-\u9fa5]{2}$/,vt=dt.test.bind(dt);function U(n){return n==="text"||n==="link"}const G=V({compatConfig:{MODE:3},name:"AButton",inheritAttrs:!1,__ANT_BUTTON:!0,props:xt(Wt(),{type:"default"}),slots:["icon"],setup:function(t,a){var i=a.slots,b=a.attrs,d=a.emit,p=a.expose,s=Q("btn",t),l=s.prefixCls,C=s.autoInsertSpaceInButton,S=s.direction,P=s.size,x=$(null),v=$(void 0),A=!1,y=$(!1),k=$(!1),I=F(function(){return C.value!==!1}),M=F(function(){return kt(t.loading)==="object"&&t.loading.delay?t.loading.delay||!0:!!t.loading});wt(M,function(o){clearTimeout(v.value),typeof M.value=="number"?v.value=setTimeout(function(){y.value=o},M.value):y.value=o},{immediate:!0});var O=F(function(){var o,r=t.type,m=t.shape,E=m===void 0?"default":m,T=t.ghost,H=t.block,J=t.danger,g=l.value,W={large:"lg",small:"sm",middle:void 0},j=P.value,D=j&&W[j]||"";return o={},f(o,"".concat(g),!0),f(o,"".concat(g,"-").concat(r),r),f(o,"".concat(g,"-").concat(E),E!=="default"&&E),f(o,"".concat(g,"-").concat(D),D),f(o,"".concat(g,"-loading"),y.value),f(o,"".concat(g,"-background-ghost"),T&&!U(r)),f(o,"".concat(g,"-two-chinese-chars"),k.value&&I.value),f(o,"".concat(g,"-block"),H),f(o,"".concat(g,"-dangerous"),!!J),f(o,"".concat(g,"-rtl"),S.value==="rtl"),o}),z=function(){var r=x.value;if(!(!r||C.value===!1)){var m=r.textContent;A&&vt(m)?k.value||(k.value=!0):k.value&&(k.value=!1)}},c=function(r){if(y.value||t.disabled){r.preventDefault();return}d("click",r)},e=function(r,m){var E=m?" ":"";if(r.type===Lt){var T=r.children.trim();return vt(T)&&(T=T.split("").join(E)),h("span",null,[T])}return r};Nt(function(){_t(!(t.ghost&&U(t.type)),"Button","`link` or `text` button can't be a `ghost` button.")}),gt(z),At(z),pt(function(){v.value&&clearTimeout(v.value)});var u=function(){var r;(r=x.value)===null||r===void 0||r.focus()},N=function(){var r;(r=x.value)===null||r===void 0||r.blur()};return p({focus:u,blur:N}),function(){var o,r,m=t.icon,E=m===void 0?(o=i.icon)===null||o===void 0?void 0:o.call(i):m,T=yt((r=i.default)===null||r===void 0?void 0:r.call(i));A=T.length===1&&!E&&!U(t.type);var H=t.type,J=t.htmlType,g=t.disabled,W=t.href,j=t.title,D=t.target,Et=t.onMousedown,ht=y.value?"loading":E,K=L(L({},b),{},{title:j,disabled:g,class:[O.value,b.class,f({},"".concat(l.value,"-icon-only"),T.length===0&&!!ht)],onClick:c,onMousedown:Et});g||delete K.disabled;var Y=E&&!y.value?E:h(jt,{existIcon:!!E,prefixCls:l.value,loading:!!y.value},null),tt=T.map(function(et){return e(et,A&&I.value)});if(W!==void 0)return h("a",L(L({},K),{},{href:W,target:D,ref:x}),[Y,tt]);var nt=h("button",L(L({},K),{},{ref:x,type:J}),[Y,tt]);return U(H)?nt:h(Pt,{ref:"wave",disabled:!!y.value},{default:function(){return[nt]}})}}});function mt(n,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,Bt(i.key),i)}}function Dt(n,t,a){return t&&mt(n.prototype,t),a&&mt(n,a),Object.defineProperty(n,"prototype",{writable:!1}),n}function $t(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var Rt=Dt(function n(t){$t(this,n),this.error=new Error("unreachable case: ".concat(JSON.stringify(t)))}),Ut=function(){return{prefixCls:String,size:{type:String}}};const q=V({compatConfig:{MODE:3},name:"AButtonGroup",props:Ut(),setup:function(t,a){var i=a.slots,b=Q("btn-group",t),d=b.prefixCls,p=b.direction,s=F(function(){var l,C=t.size,S="";switch(C){case"large":S="lg";break;case"small":S="sm";break;case"middle":case void 0:break;default:console.warn(new Rt(C).error)}return l={},f(l,"".concat(d.value),!0),f(l,"".concat(d.value,"-").concat(S),S),f(l,"".concat(d.value,"-rtl"),p.value==="rtl"),l});return function(){var l;return h("div",{class:s.value},[yt((l=i.default)===null||l===void 0?void 0:l.call(i))])}}});G.Group=q;G.install=function(n){return n.component(G.name,G),n.component(q.name,q),n};export{G as B,Dt as _,$t as a,Wt as b,Vt as c,q as d};