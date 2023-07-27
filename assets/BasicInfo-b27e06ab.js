import{k as q,G as E,r as g,J as V,a1 as x,w as z,g as A,Y as m,P as h,t as e,N as a,a2 as C,o as D,u as _,O as P,a3 as j,a4 as G,a5 as I,a6 as k,a7 as H,_ as J}from"./index-af5ecab8.js";import{_ as L,F as M}from"./index-5f211a90.js";import{u as O,_ as T}from"./file-862e9e5e.js";import{B as Y}from"./index-a41a201f.js";import"./index-9109be09.js";import{_ as Z}from"./index-fddc043c.js";import{I as K}from"./index-f5a89c08.js";import{_ as Q}from"./TextArea-6f173fc5.js";import"./index-4db1b608.js";import W from"./EditOutlined-3cd059b0.js";import{a as X,_ as ee}from"./index-1585cc70.js";import"./responsiveObserve-f8f9e35a.js";import"./styleChecker-de1a7c29.js";import"./useSize-ddbff4fb.js";import"./pickAttrs-7528e645.js";import"./PaperClipOutlined-78d31c24.js";import"./PictureTwoTone-9e483eb6.js";import"./FileTwoTone-5bd36e4e.js";import"./EyeOutlined-fc4cd4bb.js";import"./DeleteOutlined-a67d9992.js";import"./DownloadOutlined-682f6e85.js";import"./index-52b559e0.js";import"./raf-8f666c46.js";import"./CheckOutlined-7821f7cb.js";import"./useMergedState-be3eb480.js";import"./index-57bfc884.js";import"./ResizeObserver.es-0f9f8adb.js";import"./css-06fbc100.js";import"./DialogWrap-ad156e00.js";import"./RightOutlined-26397cdd.js";import"./objectDestructuringEmpty-382bcb9d.js";import"./RotateLeftOutlined-b16bfbe6.js";import"./RotateRightOutlined-4716ec7f.js";import"./ZoomInOutlined-2e45dc5d.js";import"./ZoomOutOutlined-ccdf1916.js";import"./SearchOutlined-7ea5e869.js";import"./Password-0654893a.js";import"./EyeInvisibleOutlined-b0ed3b2a.js";const oe={class:"basic-info-title"},ae={class:"basic-info-image"},te={class:"basic-info-image-content"},ne=q({__name:"BasicInfo",setup(se){const{t:r}=E(),l=g(!1),s=g(!1),o=V({nickname:"",profile:""}),i=x(),u=Promise;z(()=>{o.nickname=i.userInfo.nickname,o.profile=i.userInfo.profile});const w=async()=>{l.value=!0;try{await I({nickname:o.nickname,profile:o.profile}),k.success(r("whatSuccess",[r("basicInfo")])),i.setUserInfo({nickname:o.nickname,profile:o.profile}),l.value=!1}catch{l.value=!1}},b=async t=>{s.value=!0;try{const n=await O(t.file);await I({avatar:n}),k.success(r("whatSuccess",[r("editAvatar")])),i.setUserInfo({avatar:n}),s.value=!1}catch{s.value=!1}};return(t,n)=>{const y=K,c=L,$=Q,f=Y,B=M,d=ee,S=Z,U=H,N=W,F=T,R=X;return D(),A(C,null,[m("h1",oe,h(t.$t("basicInfo")),1),e(R,null,{default:a(()=>[e(d,{span:14},{default:a(()=>[e(B,{layout:"vertical",hideRequiredMark:"",model:o,onFinish:w},{default:a(()=>[e(c,{label:t.$t("nickname"),name:"nickname",rules:[{validator:(p,v)=>!v||!/^[\u4e00-\u9fa5A-Za-z0-9_-]{4,10}$/.test(v)?_(u).reject(t.$t("nicknameRule")):_(u).resolve()}]},{default:a(()=>[e(y,{value:o.nickname,"onUpdate:value":n[0]||(n[0]=p=>o.nickname=p),placeholder:t.$t("pleaseEnterNickname")},null,8,["value","placeholder"])]),_:1},8,["label","rules"]),e(c,{label:t.$t("profile"),name:"profile"},{default:a(()=>[e($,{value:o.profile,"onUpdate:value":n[1]||(n[1]=p=>o.profile=p),placeholder:t.$t("profile"),rows:4},null,8,["value","placeholder"])]),_:1},8,["label"]),e(c,null,{default:a(()=>[e(f,{loading:l.value,type:"primary","html-type":"submit"},{default:a(()=>[P(h(t.$t("updateBasicInfo")),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1}),e(d,{span:10,style:{"text-align":"center"}},{default:a(()=>[m("div",ae,[e(U,{spinning:s.value},{default:a(()=>[m("div",te,[e(S,{width:200,height:200,src:_(i).userInfo.avatar},null,8,["src"])])]),_:1},8,["spinning"]),j(e(F,{class:"basic-info-image-edit","max-count":1,accept:"image/*","show-upload-list":!1,customRequest:b},{default:a(()=>[e(f,{shape:"circle",size:"large"},{icon:a(()=>[e(N)]),_:1})]),_:1},512),[[G,!s.value]])])]),_:1})]),_:1})],64)}}});const Le=J(ne,[["__scopeId","data-v-f7fad693"]]);export{Le as default};
