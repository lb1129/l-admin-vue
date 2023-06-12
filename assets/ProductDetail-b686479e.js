import{S as ue,_ as de}from"./index-80b98af8.js";import{b as n,_ as k,U as fe,f as B,a0 as ve,aG as pe,aH as me,aI as ye,J as b,P as M,d as J,R as be,aJ as _e,I as re,G as Se,S as Ce,aK as ne,K as xe,aL as ge,ah as he,aF as we,a8 as Pe,h as $e,x as ke,ai as Ie,o as De,c as je,w as f,u as N,e as C,t as x}from"./index-208c7445.js";import"./index-e22f5b5d.js";/* empty css              */import"./index-0996ca5e.js";import{B as Ae}from"./index-eef1e6e1.js";import{u as Be,o as Oe}from"./useAuth-f098b416.js";import{g as Re}from"./server-182bde09.js";import{R as le,r as ae}from"./responsiveObserve-4d433620.js";import"./eagerComputed-6bf17caf.js";import"./useSize-bcde2016.js";function E(o){return o!=null}var Le=function(e){var t=e.itemPrefixCls,l=e.component,s=e.span,a=e.labelStyle,i=e.contentStyle,p=e.bordered,c=e.label,u=e.content,r=e.colon,_=l;if(p){var v;return n(_,{class:[(v={},k(v,"".concat(t,"-item-label"),E(c)),k(v,"".concat(t,"-item-content"),E(u)),v)],colSpan:s},{default:function(){return[E(c)&&n("span",{style:a},[c]),E(u)&&n("span",{style:i},[u])]}})}return n(_,{class:["".concat(t,"-item")],colSpan:s},{default:function(){return[n("div",{class:"".concat(t,"-item-container")},[c&&n("span",{class:["".concat(t,"-item-label"),k({},"".concat(t,"-item-no-colon"),!r)],style:a},[c]),u&&n("span",{class:"".concat(t,"-item-content"),style:i},[u])])]}})};const G=Le;var Ne=function(e){var t=function(v,d,S){var I=d.colon,O=d.prefixCls,g=d.bordered,h=S.component,R=S.type,z=S.showLabel,L=S.showContent,w=S.labelStyle,D=S.contentStyle;return v.map(function(m,j){var P,A,y=m.props||{},K=y.prefixCls,F=K===void 0?O:K,H=y.span,q=H===void 0?1:H,Q=y.labelStyle,W=Q===void 0?y["label-style"]:Q,X=y.contentStyle,Y=X===void 0?y["content-style"]:X,Z=y.label,ee=Z===void 0?(P=m.children)===null||P===void 0||(A=P.label)===null||A===void 0?void 0:A.call(P):Z,te=pe(m),T=me(m),U=ye(m),V=m.key;return typeof h=="string"?n(G,{key:"".concat(R,"-").concat(String(V)||j),class:T,style:U,labelStyle:b(b({},w),W),contentStyle:b(b({},D),Y),span:q,colon:I,component:h,itemPrefixCls:F,bordered:g,label:z?ee:null,content:L?te:null},null):[n(G,{key:"label-".concat(String(V)||j),class:T,style:b(b(b({},w),U),W),span:1,colon:I,component:h[0],itemPrefixCls:F,bordered:g,label:ee},null),n(G,{key:"content-".concat(String(V)||j),class:T,style:b(b(b({},D),U),Y),span:q*2-1,component:h[1],itemPrefixCls:F,bordered:g,content:te},null)]})},l=e.prefixCls,s=e.vertical,a=e.row,i=e.index,p=e.bordered,c=fe(ie,{labelStyle:B({}),contentStyle:B({})}),u=c.labelStyle,r=c.contentStyle;return s?n(ve,null,[n("tr",{key:"label-".concat(i),class:"".concat(l,"-row")},[t(a,e,{component:"th",type:"label",showLabel:!0,labelStyle:u.value,contentStyle:r.value})]),n("tr",{key:"content-".concat(i),class:"".concat(l,"-row")},[t(a,e,{component:"td",type:"content",showContent:!0,labelStyle:u.value,contentStyle:r.value})])]):n("tr",{key:i,class:"".concat(l,"-row")},[t(a,e,{component:p?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0,labelStyle:u.value,contentStyle:r.value})])};const Ee=Ne;M.any;var Me=function(){return{prefixCls:String,label:M.any,labelStyle:{type:Object,default:void 0},contentStyle:{type:Object,default:void 0},span:{type:Number,default:1}}},se=J({compatConfig:{MODE:3},name:"ADescriptionsItem",props:Me(),slots:["label"],setup:function(e,t){var l=t.slots;return function(){var s;return(s=l.default)===null||s===void 0?void 0:s.call(l)}}}),ce={xxxl:3,xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function ze(o,e){if(typeof o=="number")return o;if(re(o)==="object")for(var t=0;t<ae.length;t++){var l=ae[t];if(e[l]&&o[l]!==void 0)return o[l]||ce[l]}return 3}function oe(o,e,t){var l=o;return(e===void 0||e>t)&&(l=he(o,{span:t}),we(e===void 0,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),l}function Fe(o,e){var t=ge(o),l=[],s=[],a=e;return t.forEach(function(i,p){var c,u=(c=i.props)===null||c===void 0?void 0:c.span,r=u||1;if(p===t.length-1){s.push(oe(i,u,a)),l.push(s);return}r<a?(a-=r,s.push(i)):(s.push(oe(i,r,a)),l.push(s),a=e,s=[])}),l}var Te=function(){return{prefixCls:String,bordered:{type:Boolean,default:void 0},size:{type:String,default:"default"},title:M.any,extra:M.any,column:{type:[Number,Object],default:function(){return ce}},layout:String,colon:{type:Boolean,default:void 0},labelStyle:{type:Object,default:void 0},contentStyle:{type:Object,default:void 0}}},ie=Symbol("descriptionsContext"),$=J({compatConfig:{MODE:3},name:"ADescriptions",props:Te(),slots:["title","extra"],Item:se,setup:function(e,t){var l=t.slots,s=be("descriptions",e),a=s.prefixCls,i=s.direction,p,c=B({});_e(function(){p=le.subscribe(function(r){re(e.column)==="object"&&(c.value=r)})}),Se(function(){le.unsubscribe(p)}),Ce(ie,{labelStyle:ne(e,"labelStyle"),contentStyle:ne(e,"contentStyle")});var u=xe(function(){return ze(e.column,c.value)});return function(){var r,_,v,d,S=e.size,I=e.bordered,O=I===void 0?!1:I,g=e.layout,h=g===void 0?"horizontal":g,R=e.colon,z=R===void 0?!0:R,L=e.title,w=L===void 0?(r=l.title)===null||r===void 0?void 0:r.call(l):L,D=e.extra,m=D===void 0?(_=l.extra)===null||_===void 0?void 0:_.call(l):D,j=(v=l.default)===null||v===void 0?void 0:v.call(l),P=Fe(j,u.value);return n("div",{class:[a.value,(d={},k(d,"".concat(a.value,"-").concat(S),S!=="default"),k(d,"".concat(a.value,"-bordered"),!!O),k(d,"".concat(a.value,"-rtl"),i.value==="rtl"),d)]},[(w||m)&&n("div",{class:"".concat(a.value,"-header")},[w&&n("div",{class:"".concat(a.value,"-title")},[w]),m&&n("div",{class:"".concat(a.value,"-extra")},[m])]),n("div",{class:"".concat(a.value,"-view")},[n("table",null,[n("tbody",null,[P.map(function(A,y){return n(Ee,{key:y,index:y,colon:z,prefixCls:a.value,vertical:h==="vertical",bordered:O,row:A},null)})])])])])}}});$.install=function(o){return o.component($.name,$),o.component($.Item.name,$.Item),o};const Ue=$;const et=J({__name:"ProductDetail",setup(o){const e=B(!1),t=B({id:"",name:"",brand:"",category:"",price:0,color:"",style:"",enable:!0,inventory:0,describe:""}),{operateAuth:l}=Be(),s=Pe(),{t:a}=$e(),i=async()=>{e.value=!0,t.value=await Re(s.params.id),e.value=!1};return ke(i),Ie(i),(p,c)=>{const u=Ae,r=se,_=Ue,v=ue,d=de;return De(),je(d,{ghost:!1,title:N(a)("detail"),onBack:c[1]||(c[1]=()=>p.$router.back())},{extra:f(()=>[n(u,{type:"primary",disabled:N(Oe)(N(l).edit),onClick:c[0]||(c[0]=()=>{p.$router.push({name:"ProductAddOrEdit",params:{id:"1"}})})},{default:f(()=>[C(x(N(a)("edit")),1)]),_:1},8,["disabled"])]),default:f(()=>[n(v,{loading:e.value},{default:f(()=>[n(_,{bordered:""},{default:f(()=>[n(r,{label:"name"},{default:f(()=>[C(x(t.value.name),1)]),_:1}),n(r,{label:"brand"},{default:f(()=>[C(x(t.value.brand),1)]),_:1}),n(r,{label:"category"},{default:f(()=>[C(x(t.value.category),1)]),_:1}),n(r,{label:"price"},{default:f(()=>[C(x(t.value.price),1)]),_:1}),n(r,{label:"color"},{default:f(()=>[C(x(t.value.color),1)]),_:1}),n(r,{label:"inventory"},{default:f(()=>[C(x(t.value.inventory),1)]),_:1}),n(r,{label:"style",span:3},{default:f(()=>[C(x(t.value.style),1)]),_:1}),n(r,{label:"describe"},{default:f(()=>[C(x(t.value.describe),1)]),_:1})]),_:1})]),_:1},8,["loading"])]),_:1},8,["title"])}}});export{et as default};