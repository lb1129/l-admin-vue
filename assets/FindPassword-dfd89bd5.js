import{k as E,G as F,H as I,r as d,J as L,h as T,K as V,M as q,N as a,o as k,t as o,u as l,O as g,P as w,g as U,Q as j,R as M,S as A,T as D}from"./index-c3627875.js";import{_ as H,F as G}from"./index-85a4cb17.js";import"./index-d16e297e.js";import{B as J}from"./index-5ad669ea.js";import{I as K}from"./index-a430d91b.js";import O from"./Layout-4c445a29.js";import{i as Q,a as W}from"./validate-e1f633e5.js";import{_ as X}from"./Password-b3ed8c8e.js";import"./index-fd0356fb.js";import"./index-7770e7d6.js";import{_ as Y,a as Z}from"./index-cf39136c.js";import"./responsiveObserve-ec37b6a0.js";import"./styleChecker-9c4c630a.js";import"./useSize-95cb2737.js";import"./ResizeObserver.es-0f9f8adb.js";import"./raf-8f666c46.js";import"./RightOutlined-a11253ab.js";import"./index-0b8dc863.js";import"./index.vue_vue_type_script_setup_true_lang-dd411f72.js";import"./index-6e9d1785.js";import"./index-9c2affd4.js";import"./index-26eb0669.js";import"./Overflow-63923c65.js";/* empty css              */import"./index-3a96b05b.js";import"./EyeOutlined-e1195014.js";import"./EyeInvisibleOutlined-28a81654.js";import"./SearchOutlined-2bea48f6.js";import"./TextArea-f79fdd1c.js";const x={key:0},Be=E({__name:"FindPassword",setup(ee){const{t:m}=F(),y=I(),c=d(!1),f=d(!1),_=d(""),h=d(),u=d(0),r=L({password:"",confirmPassword:"",phone:"",code:""}),C=T(()=>u.value>0?`${m("retrieve")}${u.value}s`:m("getVerificationCode")),N=async()=>{var e;f.value=!0;try{const t=await((e=h.value)==null?void 0:e.validateFields("phone")),v=await M(t==null?void 0:t.phone);_.value=v.data,u.value=60;const n=setInterval(()=>{u.value<=0?(_.value="",clearInterval(n)):u.value--},1e3);f.value=!1}catch{f.value=!1}},z=async()=>{c.value=!0;try{await A({password:r.password,phone:Number(r.phone),code:r.code}),D.success({message:m("tip"),description:m("findPasswordSuccess"),duration:2}),setTimeout(()=>{y.push({name:"Login"})},2e3),c.value=!1}catch{c.value=!1}},p=Promise;return(e,t)=>{const v=X,n=H,P=K,$=Y,b=J,R=Z,S=V("router-link"),B=G;return k(),q(O,null,{default:a(()=>[o(B,{ref_key:"formRef",ref:h,model:r,onFinish:z},{default:a(()=>[o(n,{name:"password",rules:[{required:!0,message:e.$t("pleaseEnterNewPassword")},{validator:(s,i)=>i&&!l(Q)(i)?l(p).reject(e.$t("passwordRule")):l(p).resolve()}]},{default:a(()=>[o(v,{size:"large",placeholder:e.$t("newPassword"),value:r.password,"onUpdate:value":t[0]||(t[0]=s=>r.password=s)},null,8,["placeholder","value"])]),_:1},8,["rules"]),o(n,{name:"confirmPassword",rules:[{required:!0,message:e.$t("pleaseEnterPassword")},{validator:(s,i)=>r.password&&i!==r.password?l(p).reject(e.$t("twoPasswordsDoNotMatch")):l(p).resolve()}]},{default:a(()=>[o(v,{size:"large",placeholder:e.$t("confirmPassword"),value:r.confirmPassword,"onUpdate:value":t[1]||(t[1]=s=>r.confirmPassword=s)},null,8,["placeholder","value"])]),_:1},8,["rules"]),o(n,{name:"phone",rules:[{required:!0,message:e.$t("pleaseEnterMobileNumber")},{validator:(s,i)=>i&&!l(W)(i)?l(p).reject(e.$t("phoneRule")):l(p).resolve()}]},{default:a(()=>[o(P,{size:"large",placeholder:e.$t("mobileNumber"),value:r.phone,"onUpdate:value":t[2]||(t[2]=s=>r.phone=s)},null,8,["placeholder","value"])]),_:1},8,["rules"]),o(R,{gutter:16},{default:a(()=>[o($,{span:16},{default:a(()=>[o(n,{name:"code",rules:[{required:!0,message:e.$t("pleaseEnterVerificationCode")}]},{default:a(()=>[o(P,{size:"large",placeholder:e.$t("verificationCode"),value:r.code,"onUpdate:value":t[3]||(t[3]=s=>r.code=s)},null,8,["placeholder","value"])]),_:1},8,["rules"])]),_:1}),o($,{span:8},{default:a(()=>[o(b,{block:"",size:"large",loading:f.value,disabled:u.value>0,onClick:N},{default:a(()=>[g(w(C.value),1)]),_:1},8,["loading","disabled"])]),_:1})]),_:1}),_.value?(k(),U("div",x,w(_.value),1)):j("",!0),o(n,null,{default:a(()=>[o(S,{to:{name:"Login"}},{default:a(()=>[g(w(e.$t("haveAnAccount")),1)]),_:1})]),_:1}),o(n,null,{default:a(()=>[o(b,{size:"large",loading:c.value,block:"",type:"primary","html-type":"submit"},{default:a(()=>[g(w(e.$t("confirm")),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1})}}});export{Be as default};