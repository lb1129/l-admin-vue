import{aj as M,d as p,R as S,K as r,_ as a,J as f,aL as b,b as s}from"./index-208c7445.js";var j=function(){return{prefixCls:String,type:{type:String,default:"horizontal"},dashed:{type:Boolean,default:!1},orientation:{type:String,default:"center"},plain:{type:Boolean,default:!1},orientationMargin:[String,Number]}},P=p({compatConfig:{MODE:3},name:"ADivider",props:j(),setup:function(n,g){var l=g.slots,u=S("divider",n),o=u.prefixCls,h=u.direction,c=r(function(){return n.orientation==="left"&&n.orientationMargin!=null}),d=r(function(){return n.orientation==="right"&&n.orientationMargin!=null}),m=r(function(){var t,i=n.type,C=n.dashed,_=n.plain,e=o.value;return t={},a(t,e,!0),a(t,"".concat(e,"-").concat(i),!0),a(t,"".concat(e,"-dashed"),!!C),a(t,"".concat(e,"-plain"),!!_),a(t,"".concat(e,"-rtl"),h.value==="rtl"),a(t,"".concat(e,"-no-default-orientation-margin-left"),c.value),a(t,"".concat(e,"-no-default-orientation-margin-right"),d.value),t}),x=r(function(){var t=typeof n.orientationMargin=="number"?"".concat(n.orientationMargin,"px"):n.orientationMargin;return f(f({},c.value&&{marginLeft:t}),d.value&&{marginRight:t})}),y=r(function(){return n.orientation.length>0?"-"+n.orientation:n.orientation});return function(){var t,i=b((t=l.default)===null||t===void 0?void 0:t.call(l));return s("div",{class:[m.value,i.length?"".concat(o.value,"-with-text ").concat(o.value,"-with-text").concat(y.value):""],role:"separator"},[i.length?s("span",{class:"".concat(o.value,"-inner-text"),style:x.value},[i]):null])}}});const w=M(P);export{w as _};
