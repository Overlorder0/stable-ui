import{b as R,c as K,i as P,a as M,d as J,e as $,u as G,r as F,f as B,g as H,h as Q,w as X,o as m,j as k,n as V,k as u,l as h,m as r,p as Y,E as z,q as Z,s as uu,_ as eu,t as tu,v as a,x as T,y as l,z as p,A as I,B as j,C as d,D as A,F as au,G as nu,H as S,I as N,J as ou,K as lu,L as W,M as su,N as U,O as ru,P as iu,Q as du,R as cu,S as mu,T as pu,U as Eu,V as fu,W as vu,X as O,Y as ku,Z as _u,$ as yu,a0 as gu}from"./index.ca89aaee.js";import{W as wu}from"./WorkerBox.06c8d0a5.js";const hu=R({size:{type:[Number,String],values:K,default:"",validator:c=>P(c)},shape:{type:String,values:["circle","square"],default:"circle"},icon:{type:M},src:{type:String,default:""},alt:String,srcSet:String,fit:{type:J(String),default:"cover"}}),Du={error:c=>c instanceof Event},Cu=["src","alt","srcset"],bu={name:"ElAvatar"},Au=$({...bu,props:hu,emits:Du,setup(c,{emit:w}){const i=c,t=G("avatar"),E=F(!1),_=B(()=>{const{size:n,icon:s,shape:f}=i,v=[t.b()];return H(n)&&v.push(t.m(n)),s&&v.push(t.m("icon")),f&&v.push(t.m(f)),v}),y=B(()=>{const{size:n}=i;return P(n)?t.cssVarBlock({size:Q(n)||""}):void 0}),C=B(()=>({objectFit:i.fit}));X(()=>i.src,()=>E.value=!1);function D(n){E.value=!0,w("error",n)}return(n,s)=>(m(),k("span",{class:uu(u(_)),style:V(u(y))},[(n.src||n.srcSet)&&!E.value?(m(),k("img",{key:0,src:n.src,alt:n.alt,srcset:n.srcSet,style:V(u(C)),onError:D},null,44,Cu)):n.icon?(m(),h(u(z),{key:1},{default:r(()=>[(m(),h(Y(n.icon)))]),_:1})):Z(n.$slots,"default",{key:2})],6))}});var Bu=eu(Au,[["__file","/home/runner/work/element-plus/element-plus/packages/components/avatar/src/avatar.vue"]]);const Su=tu(Bu);const xu={style:{width:"100%",display:"flex","justify-content":"center"}},Fu={class:"data-label-content"},Vu={class:"data-label-icon"},$u={class:"data-label-title"},Wu={class:"data-label-content"},x=$({__name:"DataLabel",props:{label:null,color:null,content:null,icon:null},setup(c){return(w,i)=>(m(),k("div",xu,[a(u(T),{class:"data-label",style:{height:"70px",width:"100%"}},{default:r(()=>[l("div",Fu,[l("div",Vu,[a(u(Su),{size:60,icon:c.icon,style:V("background:"+c.color)},null,8,["icon","style"])]),l("div",null,[l("div",$u,p(c.label),1),l("div",Wu,[l("strong",null,p(c.content==null?"Loading...":c.content),1)])])])]),_:1})]))}});const zu=l("div",{style:{"font-size":"13px","word-break":"keep-all"}},"\u0423\u0434\u043E\u0441\u0442\u043E\u0432\u0435\u0440\u044C\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A \u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D!",-1),Tu=$({__name:"WorkerEditor",props:{worker:null},emits:["updated"],setup(c,{emit:w}){var f,v,b;const i=c,t=I(),E=j();async function _(g){var q,L;const e=await fetch(`${E.baseURL}/api/v2/workers/${(q=i.worker)==null?void 0:q.id}`,{method:"PUT",body:JSON.stringify(g),headers:{"Content-Type":"application/json",apikey:E.apiKey}}),o=await e.json();return U(e,o,200,"\u041E\u0448\u0438\u0431\u043A\u0430 \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 :/")?(w("updated",(L=i.worker)==null?void 0:L.id),o):!1}let y=F(void 0);function C(){ru.confirm("\u0414\u0430\u043D\u043D\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430 \u0443\u0434\u0430\u043B\u0438\u0442 \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?","\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430?",{confirmButtonText:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",cancelButtonText:"\u041E\u0442\u043C\u0435\u043D\u0430",type:"warning"}).then(()=>{y.value=setTimeout(async()=>{var o;const g=await fetch(`${E.baseURL}/api/v2/workers/${(o=i.worker)==null?void 0:o.id}`,{method:"DELETE",headers:{apikey:E.apiKey}}),e=await g.json();if(!U(g,e,200,"\u041E\u0448\u0438\u0431\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430"))return!1;t.updateWorkers(),n.value=!1},60*1e3)})}function D(){clearTimeout(y.value),y.value=void 0}const n=F(!1),s=F({maintenance:(f=i.worker)==null?void 0:f.maintenance_mode,info:i.worker.info,name:i.worker.name,team:((v=i.worker.team)==null?void 0:v.id)===null?"":(b=i.worker.team)==null?void 0:b.id});return(g,e)=>c.worker!=null?(m(),h(wu,{key:0,worker:c.worker},{header:r(()=>[a(u(A),{onClick:e[0]||(e[0]=o=>n.value=!0)},{default:r(()=>[d("\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C")]),_:1}),a(u(su),{modelValue:n.value,"onUpdate:modelValue":e[10]||(e[10]=o=>n.value=o),title:c.worker.name,style:{"min-height":"500px",width:"600px"},"align-center":""},{default:r(()=>[a(u(au),{"label-width":"140px",model:s.value,"label-position":"left",onSubmit:e[9]||(e[9]=nu(()=>{},["prevent"]))},{default:r(()=>[a(u(S),{label:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043C\u044F"},{default:r(()=>[zu,a(u(N),{modelValue:s.value.name,"onUpdate:modelValue":e[1]||(e[1]=o=>s.value.name=o),placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C \u043D\u043E\u0432\u043E\u0435 \u0438\u043C\u044F",style:{width:"80%","min-width":"200px"}},null,8,["modelValue"]),a(u(A),{onClick:e[2]||(e[2]=o=>_({name:s.value.name}))},{default:r(()=>[d("\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u044C")]),_:1})]),_:1}),a(u(S),{label:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"},{default:r(()=>[a(u(N),{modelValue:s.value.info,"onUpdate:modelValue":e[3]||(e[3]=o=>s.value.info=o),autosize:{minRows:2,maxRows:10},clearable:"",resize:"none",type:"textarea",style:{width:"80%","word-break":"keep-all","min-width":"200px"},maxlength:"1000",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u043E\u043F. \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0432\u0430\u0448\u0435\u043C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0435"},null,8,["modelValue"]),a(u(A),{onClick:e[4]||(e[4]=o=>_({info:s.value.info}))},{default:r(()=>[d("\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u044C")]),_:1})]),_:1}),a(ou,{label:"\u041A\u043E\u043C\u0430\u043D\u0434\u0430",prop:"team",modelValue:s.value.team,"onUpdate:modelValue":e[5]||(e[5]=o=>s.value.team=o),options:[{label:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C",value:""},...u(t).teams.map(o=>({label:o.name,value:o.id}))],onChange:e[6]||(e[6]=o=>_({team:s.value.team}))},null,8,["modelValue","options"]),a(u(S),{label:"\u0420\u0435\u0436\u0438\u043C \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044F"},{default:r(()=>[a(u(lu),{modelValue:s.value.maintenance,"onUpdate:modelValue":e[7]||(e[7]=o=>s.value.maintenance=o),onChange:e[8]||(e[8]=o=>_({maintenance:s.value.maintenance}))},null,8,["modelValue"])]),_:1}),a(u(S),{label:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430"},{default:r(()=>[u(y)==null?(m(),h(u(A),{key:0,type:"danger",onClick:C},{default:r(()=>[d("\u0423\u0434\u0430\u043B\u0438\u0442\u044C")]),_:1})):W("",!0),u(y)!=null?(m(),h(u(A),{key:1,type:"danger",onClick:D},{default:r(()=>[d("\u041E\u0442\u043C\u0435\u043D\u0430 (60\u0441 \u0442\u0430\u0439\u043C\u0435\u0440)")]),_:1})):W("",!0)]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"])]),_:1},8,["worker"])):W("",!0)}}),qu={class:"dashboard"},Lu={key:0},Nu={class:"dashboard-title"},Uu={key:1},Ou={class:"api-key-required"},Pu=l("strong",null,"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",-1),Iu=l("strong",null,"\u0412\u0430\u0448\u0438 \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0438",-1),ju={key:0,class:"user-workers"},Ru={key:1},Ku={key:3},Mu={class:"api-key-required"},Hu=$({__name:"DashboardView",setup(c){const w=iu(du),i=w.smallerOrEqual("xl");w.smallerOrEqual("lg");const t=cu(),E=I(),_=j(),y=B(()=>i.value?24:12);async function C(n){const s=t.userWorkers.findIndex(f=>f.id===n);t.userWorkers[s]=await E.getWorker(n)||t.userWorkers[s]}const D=B(()=>_.apiKey!="0000000000"&&_.apiKey!="");return(n,s)=>{var f,v,b,g;return m(),k("div",qu,[l("div",null,[u(D)?(m(),k("div",Lu,[l("div",Nu,"\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C, "+p(u(t).user.username),1),l("div",{style:V([{display:"flex",width:"100%","margin-bottom":"2rem"},{flexWrap:u(i)?"wrap":void 0,gap:u(i)?"8px":"1rem"}])},[a(x,{style:{width:"100%"},icon:u(pu),label:"\u041E\u0447\u043A\u0438",content:u(t).user.kudos,color:"var(--el-color-success)"},null,8,["icon","content"]),a(x,{style:{width:"100%"},icon:u(Eu),label:"\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439 \u0437\u0430\u043F\u0440\u043E\u0448\u0435\u043D\u043E",content:(v=(f=u(t).user.records)==null?void 0:f.request)==null?void 0:v.image,color:"var(--el-color-danger)"},null,8,["icon","content"]),a(x,{style:{width:"100%"},icon:u(fu),label:"\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u043E",content:(g=(b=u(t).user.records)==null?void 0:b.fulfillment)==null?void 0:g.image,color:"var(--el-color-primary)"},null,8,["icon","content"]),a(x,{style:{width:"100%"},icon:u(vu),label:"\u0412\u0441\u0435\u0433\u043E \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u043E\u0432",content:u(t).user.worker_count,color:"var(--el-color-warning)"},null,8,["icon","content"])],4)])):(m(),k("div",Uu,[l("div",Ou,[a(u(z),{size:30,style:{"margin-right":"10px"}},{default:r(()=>[a(u(O))]),_:1}),d("\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043D\u0430\u043B\u0438\u0447\u0438\u044F API \u043A\u043B\u044E\u0447\u0430")])])),a(u(mu),{gutter:u(i)?0:20,justify:"space-around",style:{"margin-bottom":"2rem"}},{default:r(()=>[a(u(ku),{span:u(y),class:"label"},{default:r(()=>[a(u(T),{style:{"margin-bottom":"10px"}},{header:r(()=>[Pu]),default:r(()=>[l("div",null,[d("\u0421\u0435\u0439\u0447\u0430\u0441 "),l("strong",null,p(u(t).performance.queued_requests),1),d(" \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438 ("),l("strong",null,p(u(t).performance.queued_megapixelsteps),1),d(" MPS) \u043A "),l("strong",null,p(u(t).performance.worker_count),1),d(" \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430\u043C ("),l("strong",null,p(u(t).performance.thread_count),1),d(" \u043F\u043E\u0442\u043E\u043A\u043E\u0432).")]),l("div",null,[d("\u0421\u0435\u0439\u0447\u0430\u0441 "),l("strong",null,p(u(t).performance.queued_forms),1),d(" \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043A "),l("strong",null,p(u(t).performance.interrogator_count),1),d(" \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430\u043C ("),l("strong",null,p(u(t).performance.interrogator_thread_count),1),d(" \u043F\u043E\u0442\u043E\u043A\u043E\u0432).")]),l("div",null,[d("\u0417\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u043C\u0438\u043D\u0443\u0442\u0443 \u0431\u044B\u043B\u043E \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u043E "),l("strong",null,p(u(t).performance.past_minute_megapixelsteps),1),d(" MPS.")])]),_:1})]),_:1},8,["span"])]),_:1},8,["gutter"]),u(D)?(m(),h(u(T),{key:2},{header:r(()=>[Iu]),default:r(()=>[u(t).userWorkers.length!==0?(m(),k("div",ju,[(m(!0),k(_u,null,yu(u(t).userWorkers,e=>(m(),h(Tu,{key:e.id,worker:e,onUpdated:s[0]||(s[0]=o=>C(o))},null,8,["worker"]))),128))])):(m(),k("div",Ru,[a(u(gu),{description:"\u0420\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"})]))]),_:1})):(m(),k("div",Ku,[l("div",Mu,[a(u(z),{size:30,style:{"margin-right":"10px"}},{default:r(()=>[a(u(O))]),_:1}),d("\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0438 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u043E\u0432 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 API \u043A\u043B\u044E\u0447")])]))])])}}});export{Hu as default};
