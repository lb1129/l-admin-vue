import{k as $,J as h,r as S,H as U,G as D,a1 as L,B,K as M,M as F,N as o,o as P,t as e,O as p,P as m,ag as R,ah as b,ai as z,aj as C,T as N,_ as O}from"./index-c3627875.js";import{_ as T,F as q}from"./index-85a4cb17.js";import"./index-d16e297e.js";import{B as x}from"./index-5ad669ea.js";import{I as E}from"./index-a430d91b.js";import H from"./Layout-4c445a29.js";import V from"./UserOutlined-70e58cc0.js";import j from"./LockOutlined-206cec21.js";import{_ as A}from"./Password-b3ed8c8e.js";import"./responsiveObserve-ec37b6a0.js";import"./styleChecker-9c4c630a.js";import"./useSize-95cb2737.js";import"./ResizeObserver.es-0f9f8adb.js";import"./raf-8f666c46.js";import"./RightOutlined-a11253ab.js";import"./index-0b8dc863.js";import"./index.vue_vue_type_script_setup_true_lang-dd411f72.js";import"./index-6e9d1785.js";import"./index-9c2affd4.js";import"./index-26eb0669.js";import"./Overflow-63923c65.js";/* empty css              */import"./index-3a96b05b.js";import"./EyeOutlined-e1195014.js";import"./EyeInvisibleOutlined-28a81654.js";const G=$({__name:"Login",setup(J){const s=h({username:"",password:""}),n=S(!1),c=U(),{t:d}=D(),f=L(),l=B(),g=async()=>{n.value=!0;try{const t=await R(s);await b.set(t.data);const a=await z(),i=await C();l.setMenuData(i.data),l.setMenuDataDone(!0),f.setUserInfo(a.data),await c.replace({name:"Home"}),setTimeout(()=>{N.success({message:d("welcome"),description:a.data.nickname})},200),n.value=!1}catch{n.value=!1}};return(t,a)=>{const i=V,v=E,r=T,w=j,y=A,_=M("router-link"),k=x,I=q;return P(),F(H,null,{default:o(()=>[e(I,{model:s,onFinish:g},{default:o(()=>[e(r,{name:"username",rules:[{required:!0,message:t.$t("pleaseEnterAccount")}]},{default:o(()=>[e(v,{size:"large",placeholder:t.$t("account"),value:s.username,"onUpdate:value":a[0]||(a[0]=u=>s.username=u)},{prefix:o(()=>[e(i,{class:"icon"})]),_:1},8,["placeholder","value"])]),_:1},8,["rules"]),e(r,{name:"password",rules:[{required:!0,message:t.$t("pleaseEnterPassword")}]},{default:o(()=>[e(y,{size:"large",placeholder:t.$t("password"),value:s.password,"onUpdate:value":a[1]||(a[1]=u=>s.password=u)},{prefix:o(()=>[e(w,{class:"icon"})]),_:1},8,["placeholder","value"])]),_:1},8,["rules"]),e(r,null,{default:o(()=>[e(_,{to:{name:"Register"}},{default:o(()=>[p(m(t.$t("signUp")),1)]),_:1}),e(_,{style:{float:"right"},to:{name:"FindPassword"}},{default:o(()=>[p(m(t.$t("forgotPassword")),1)]),_:1})]),_:1}),e(r,null,{default:o(()=>[e(k,{size:"large",block:"",loading:n.value,type:"primary","html-type":"submit"},{default:o(()=>[p(m(t.$t("login")),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1})}}});const ye=O(G,[["__scopeId","data-v-a1e5901c"]]);export{ye as default};