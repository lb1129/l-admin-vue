import{i as a}from"./ResizeObserver.es-0f9f8adb.js";import{r as u,w as f,u as n}from"./index-ed1d3163.js";const d=(h,e)=>{const r=u(0),s=u(0);return f(o=>{const t=n(h);if(t){const c=new a(i=>{r.value=i[0].contentRect.width-(e?n(e.minusWidth??0):0),s.value=i[0].contentRect.height-(e?n(e.minusHeight??0):0)});c.observe(t),o(()=>c.unobserve(t))}}),{width:r,height:s}};export{d as u};
