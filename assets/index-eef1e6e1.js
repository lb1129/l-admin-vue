import{d as Q,C as Ct,R as vt,x as mt,F as gt,ba as et,G as bt,P as St,b as p,az as at,T as xt,O as wt,f as j,K as q,I as kt,D as At,_ as E,v as Nt,b0 as Lt,B as It,aL as Bt,J as N,a$ as Mt}from"./index-208c7445.js";var Et=function(t){return setTimeout(t,16)},yt=function(t){return clearTimeout(t)};typeof window<"u"&&"requestAnimationFrame"in window&&(Et=function(t){return window.requestAnimationFrame(t)},yt=function(t){return window.cancelAnimationFrame(t)});var it=0,X=new Map;function pt(e){X.delete(e)}function K(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;it+=1;var a=it;function o(v){if(v===0)pt(a),e();else{var m=Et(function(){o(v-1)});X.set(a,m)}}return o(t),a}K.cancel=function(e){var t=X.get(e);return pt(t),yt(t)};var G={transitionstart:{transition:"transitionstart",WebkitTransition:"webkitTransitionStart",MozTransition:"mozTransitionStart",OTransition:"oTransitionStart",msTransition:"MSTransitionStart"},animationstart:{animation:"animationstart",WebkitAnimation:"webkitAnimationStart",MozAnimation:"mozAnimationStart",OAnimation:"oAnimationStart",msAnimation:"MSAnimationStart"}},J={transitionend:{transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd"},animationend:{animation:"animationend",WebkitAnimation:"webkitAnimationEnd",MozAnimation:"mozAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd"}},L=[],I=[];function Ot(){var e=document.createElement("div"),t=e.style;"AnimationEvent"in window||(delete G.animationstart.animation,delete J.animationend.animation),"TransitionEvent"in window||(delete G.transitionstart.transition,delete J.transitionend.transition);function a(o,v){for(var m in o)if(o.hasOwnProperty(m)){var h=o[m];for(var s in h)if(s in t){v.push(h[s]);break}}}a(G,L),a(J,I)}typeof window<"u"&&typeof document<"u"&&Ot();function rt(e,t,a){e.addEventListener(t,a,!1)}function ot(e,t,a){e.removeEventListener(t,a,!1)}var Pt={startEvents:L,addStartEventListener:function(t,a){if(L.length===0){setTimeout(a,0);return}L.forEach(function(o){rt(t,o,a)})},removeStartEventListener:function(t,a){L.length!==0&&L.forEach(function(o){ot(t,o,a)})},endEvents:I,addEndEventListener:function(t,a){if(I.length===0){setTimeout(a,0);return}I.forEach(function(o){rt(t,o,a)})},removeEndEventListener:function(t,a){I.length!==0&&I.forEach(function(o){ot(t,o,a)})}};const F=Pt;var x;function ut(e){return!e||e.offsetParent===null}function _t(e){var t=(e||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);return t&&t[1]&&t[2]&&t[3]?!(t[1]===t[2]&&t[2]===t[3]):!0}const zt=Q({compatConfig:{MODE:3},name:"Wave",props:{insertExtraNode:Boolean,disabled:Boolean},setup:function(t,a){var o=a.slots,v=a.expose,m=Ct(),h=vt("",t),s=h.csp,T=h.prefixCls;v({csp:s});var k=null,P=null,_=null,C=!1,c=null,A=!1,g=function(n){if(!A){var u=et(m);!n||n.target!==u||C||O(u)}},S=function(n){!n||n.animationName!=="fadeEffect"||O(n.target)},B=function(){var n=t.insertExtraNode;return n?"".concat(T.value,"-click-animating"):"".concat(T.value,"-click-animating-without-extra-node")},M=function(n,u){var w=t.insertExtraNode,r=t.disabled;if(!(r||!n||ut(n)||n.className.indexOf("-leave")>=0)){c=document.createElement("div"),c.className="".concat(T.value,"-click-animating-node");var i=B();if(n.removeAttribute(i),n.setAttribute(i,"true"),x=x||document.createElement("style"),u&&u!=="#ffffff"&&u!=="rgb(255, 255, 255)"&&_t(u)&&!/rgba\(\d*, \d*, \d*, 0\)/.test(u)&&u!=="transparent"){var f;(f=s.value)!==null&&f!==void 0&&f.nonce&&(x.nonce=s.value.nonce),c.style.borderColor=u,x.innerHTML=`
        [`.concat(T.value,"-click-animating-without-extra-node='true']::after, .").concat(T.value,`-click-animating-node {
          --antd-wave-shadow-color: `).concat(u,`;
        }`),document.body.contains(x)||document.body.appendChild(x)}w&&n.appendChild(c),F.addStartEventListener(n,g),F.addEndEventListener(n,S)}},O=function(n){if(!(!n||n===c||!(n instanceof Element))){var u=t.insertExtraNode,w=B();n.setAttribute(w,"false"),x&&(x.innerHTML=""),u&&c&&n.contains(c)&&n.removeChild(c),F.removeStartEventListener(n,g),F.removeEndEventListener(n,S)}},z=function(n){if(!(!n||!n.getAttribute||n.getAttribute("disabled")||n.className.indexOf("disabled")>=0)){var u=function(r){if(!(r.target.tagName==="INPUT"||ut(r.target))){O(n);var i=getComputedStyle(n).getPropertyValue("border-top-color")||getComputedStyle(n).getPropertyValue("border-color")||getComputedStyle(n).getPropertyValue("background-color");P=setTimeout(function(){return M(n,i)},0),K.cancel(_),C=!0,_=K(function(){C=!1},10)}};return n.addEventListener("click",u,!0),{cancel:function(){n.removeEventListener("click",u,!0)}}}};return mt(function(){gt(function(){var l=et(m);l.nodeType===1&&(k=z(l))})}),bt(function(){k&&k.cancel(),clearTimeout(P),A=!0}),function(){var l;return(l=o.default)===null||l===void 0?void 0:l.call(o)[0]}}});function Ft(e){return e==="danger"?{danger:!0}:{type:e}}var Wt=function(){return{prefixCls:String,type:String,htmlType:{type:String,default:"button"},shape:{type:String},size:{type:String},loading:{type:[Boolean,Object],default:function(){return!1}},disabled:{type:Boolean,default:void 0},ghost:{type:Boolean,default:void 0},block:{type:Boolean,default:void 0},danger:{type:Boolean,default:void 0},icon:St.any,href:String,target:String,title:String,onClick:{type:Function},onMousedown:{type:Function}}};const Dt=Wt;var lt=function(t){t&&(t.style.width="0px",t.style.opacity="0",t.style.transform="scale(0)")},st=function(t){gt(function(){t&&(t.style.width="".concat(t.scrollWidth,"px"),t.style.opacity="1",t.style.transform="scale(1)")})},ct=function(t){t&&t.style&&(t.style.width=null,t.style.opacity=null,t.style.transform=null)};const Rt=Q({compatConfig:{MODE:3},name:"LoadingIcon",props:{prefixCls:String,loading:[Boolean,Object],existIcon:Boolean},setup:function(t){return function(){var a=t.existIcon,o=t.prefixCls,v=t.loading;if(a)return p("span",{class:"".concat(o,"-loading-icon")},[p(at,null,null)]);var m=!!v;return p(xt,{name:"".concat(o,"-loading-icon-motion"),onBeforeEnter:lt,onEnter:st,onAfterEnter:ct,onBeforeLeave:st,onLeave:function(s){setTimeout(function(){lt(s)})},onAfterLeave:ct},{default:function(){return[m?p("span",{class:"".concat(o,"-loading-icon")},[p(at,null,null)]):null]}})}}});var ft=/^[\u4e00-\u9fa5]{2}$/,dt=ft.test.bind(ft);function U(e){return e==="text"||e==="link"}const Ut=Q({compatConfig:{MODE:3},name:"AButton",inheritAttrs:!1,__ANT_BUTTON:!0,props:wt(Dt(),{type:"default"}),slots:["icon"],setup:function(t,a){var o=a.slots,v=a.attrs,m=a.emit,h=a.expose,s=vt("btn",t),T=s.prefixCls,k=s.autoInsertSpaceInButton,P=s.direction,_=s.size,C=j(null),c=j(void 0),A=!1,g=j(!1),S=j(!1),B=q(function(){return k.value!==!1}),M=q(function(){return kt(t.loading)==="object"&&t.loading.delay?t.loading.delay||!0:!!t.loading});At(M,function(r){clearTimeout(c.value),typeof M.value=="number"?c.value=setTimeout(function(){g.value=r},M.value):g.value=r},{immediate:!0});var O=q(function(){var r,i=t.type,f=t.shape,b=f===void 0?"default":f,y=t.ghost,$=t.block,V=t.danger,d=T.value,W={large:"lg",small:"sm",middle:void 0},D=_.value,R=D&&W[D]||"";return r={},E(r,"".concat(d),!0),E(r,"".concat(d,"-").concat(i),i),E(r,"".concat(d,"-").concat(b),b!=="default"&&b),E(r,"".concat(d,"-").concat(R),R),E(r,"".concat(d,"-loading"),g.value),E(r,"".concat(d,"-background-ghost"),y&&!U(i)),E(r,"".concat(d,"-two-chinese-chars"),S.value&&B.value),E(r,"".concat(d,"-block"),$),E(r,"".concat(d,"-dangerous"),!!V),E(r,"".concat(d,"-rtl"),P.value==="rtl"),r}),z=function(){var i=C.value;if(!(!i||k.value===!1)){var f=i.textContent;A&&dt(f)?S.value||(S.value=!0):S.value&&(S.value=!1)}},l=function(i){if(g.value||t.disabled){i.preventDefault();return}m("click",i)},n=function(i,f){var b=f?" ":"";if(i.type===Mt){var y=i.children.trim();return dt(y)&&(y=y.split("").join(b)),p("span",null,[y])}return i};Nt(function(){Lt(!(t.ghost&&U(t.type)),"Button","`link` or `text` button can't be a `ghost` button.")}),mt(z),It(z),bt(function(){c.value&&clearTimeout(c.value)});var u=function(){var i;(i=C.value)===null||i===void 0||i.focus()},w=function(){var i;(i=C.value)===null||i===void 0||i.blur()};return h({focus:u,blur:w}),function(){var r,i,f=t.icon,b=f===void 0?(r=o.icon)===null||r===void 0?void 0:r.call(o):f,y=Bt((i=o.default)===null||i===void 0?void 0:i.call(o));A=y.length===1&&!b&&!U(t.type);var $=t.type,V=t.htmlType,d=t.disabled,W=t.href,D=t.title,R=t.target,ht=t.onMousedown,Tt=g.value?"loading":b,H=N(N({},v),{},{title:D,disabled:d,class:[O.value,v.class,E({},"".concat(T.value,"-icon-only"),y.length===0&&!!Tt)],onClick:l,onMousedown:ht});d||delete H.disabled;var Y=b&&!g.value?b:p(Rt,{existIcon:!!b,prefixCls:T.value,loading:!!g.value},null),Z=y.map(function(nt){return n(nt,A&&B.value)});if(W!==void 0)return p("a",N(N({},H),{},{href:W,target:R,ref:C}),[Y,Z]);var tt=p("button",N(N({},H),{},{ref:C,type:V}),[Y,Z]);return U($)?tt:p(zt,{ref:"wave",disabled:!!g.value},{default:function(){return[tt]}})}}});export{Ut as B,Dt as b,Ft as c,K as w};