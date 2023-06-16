import{e as x,f as F,r as b,au as I,o as t,l,m as a,j as c,s as $,L as h,aQ as D,k as e,aR as V,aS as W,Z as k,$ as E,aT as H,v as i,y as o,av as T,a0 as C,E as p,a4 as A,a2 as q,a1 as O,a5 as N,z as f,q as P,C as v,a9 as U,x as R,aH as L,aI as j,aa as y,p as Q,D as z,aU as Z,A as S,n as G,aV as J,I as K,aC as X,P as Y,Q as e0}from"./index.ca89aaee.js";import{E as u0,a as g}from"./el-tab-pane.0d9cf8e0.js";import{W as t0}from"./WorkerBox.06c8d0a5.js";import{E as o0}from"./el-popover.cd604044.js";const M=u=>(L("data-v-8a443929"),u=u(),j(),u),s0=M(()=>o("span",{class:"ribbonSpan"},"NSFW",-1)),l0=[s0],a0={key:1},n0={"element-loading-text":"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",style:{height:"300px"}},r0={key:2,style:{height:"300px"}},d0={style:{padding:"20px"}},i0={style:{display:"flex","justify-content":"space-between","font-size":"16px"}},c0={class:"card-header"},_0={style:{"margin-left":"0.5rem"}},m0=M(()=>o("div",null,null,-1)),v0={key:0},f0={class:"small-font"},h0=x({__name:"ModelBox",props:{model:null},setup(u){const n=u,d=F(()=>n.model.count===0?"Offline":n.model.queued===0?"Standby":"Online"),_=b(null),r=b(!1);return I(_,([{isIntersecting:s}])=>{r.value=s},{rootMargin:"500px"}),(s,m)=>(t(),l(e(R),{class:"model-box","body-style":{padding:"0px"},ref_key:"imageRef",ref:_},{default:a(()=>[u.model.nsfw?(t(),c("div",{key:0,class:$({"ribbon ribbon-top-right":u.model.nsfw})},l0,2)):h("",!0),r.value&&u.model.nsfw!=!0?(t(),c("div",a0,[u.model.showcases?D((t(),l(e(W),{key:0,style:{width:"100%",margin:"0"},autoplay:!1,"indicator-position":"none",arrow:u.model.showcases.length===1?"never":"always"},{default:a(()=>[(t(!0),c(k,null,E(u.model.showcases,B=>(t(),l(e(H),{key:B},{default:a(()=>[i(e(T),{src:B},{placeholder:a(()=>[D(o("div",n0,null,512),[[e(V),!0]])]),_:2},1032,["src"])]),_:2},1024))),128))]),_:1},8,["arrow"])),[[e(V)]]):(t(),l(e(C),{key:1,description:"\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D!"}))])):(t(),c("div",r0)),o("div",d0,[o("div",i0,[o("div",c0,[i(e(N),{content:e(d),placement:"top"},{default:a(()=>[u.model.count===0?(t(),l(e(p),{key:0,size:20,color:"red"},{default:a(()=>[i(e(A))]),_:1})):u.model.queued===0?(t(),l(e(p),{key:1,size:20,color:"orange"},{default:a(()=>[i(e(q))]),_:1})):(t(),l(e(p),{key:2,size:20,color:"green"},{default:a(()=>[i(e(O))]),_:1}))]),_:1},8,["content"]),o("span",_0,f(u.model.name),1)]),P(s.$slots,"header",{},void 0,!0)]),o("div",null,[v("\u0421\u0435\u0439\u0447\u0430\u0441 "),o("strong",null,f(u.model.count),1),v(" \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u043E\u0432 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0441 \u044D\u0442\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u044C\u044E")]),o("div",null,[v("\u0421\u0435\u0439\u0447\u0430\u0441 \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438 "),o("strong",null,f(Math.floor((u.model.queued||0)/1e4)/100),1),v(" MPS")]),o("div",null,[v("\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C "),o("strong",null,f(Math.floor((u.model.performance||0)/1e4)/100),1),v(" MPS/s")]),o("div",null,[v("\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0447\u0442\u043E \u043F\u043E\u043D\u0430\u0434\u043E\u0431\u0438\u0442\u044C\u0441\u044F "),o("strong",null,f(u.model.eta)+"s",1),v(" \u0447\u0442\u043E\u0431\u044B \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0432\u0441\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C")]),m0,o("div",null,[v("\u0421\u0442\u0438\u043B\u044C \u044D\u0442\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438 - "),o("strong",null,f(u.model.style),1)]),u.model.nsfw?(t(),c("div",v0,"\u042D\u0442\u0430 \u043C\u043E\u0434\u0435\u043B\u044C \u043C\u043E\u0436\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u043D\u0435\u043F\u0440\u0438\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442\u0438.")):h("",!0),u.model.description?(t(),l(e(U),{key:1,style:{margin:"10px 0"}})):h("",!0),o("div",f0,f(u.model.description),1)])]),_:3},512))}});const p0=y(h0,[["__scopeId","data-v-8a443929"]]),y0=x({__name:"ButtonCycle",props:{options:null,modelValue:null,dimensions:null},emits:["update:modelValue"],setup(u,{emit:n}){const d=u;Z(r=>({"4bc4817a":u.dimensions}));function _(){const r=d.options.map(m=>m.value).indexOf(d.modelValue);if(r===-1)return;const s=d.options.length-1;return r<s?n("update:modelValue",d.options[r+1].value):n("update:modelValue",d.options[0].value)}return(r,s)=>(t(),l(e(z),{class:"cycle-button",onClick:_},{default:a(()=>[i(e(p),{size:u.dimensions*.5},{default:a(()=>[(t(),l(Q((u.options.find(m=>m.value===u.modelValue)||u.options[0]).icon)))]),_:1},8,["size"])]),_:1}))}});const k0={},E0={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},x0=o("path",{d:"M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z",fill:"currentColor"},null,-1),g0=[x0];function w0(u,n){return t(),c("svg",E0,g0)}const b0=y(k0,[["render",w0]]),C0={},B0={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},D0=o("path",{d:"M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z",fill:"currentColor"},null,-1),V0=[D0];function $0(u,n){return t(),c("svg",B0,V0)}const z0=y(C0,[["render",$0]]),S0={class:"sort-workers"},M0=["onClick"],F0=x({__name:"SortWorkers",props:{mobile:{type:Boolean}},setup(u){const n=S(),d=b(!1);return(_,r)=>(t(),c("div",S0,[i(e(K),{prop:"search",modelValue:e(n).searchFilter,"onUpdate:modelValue":r[0]||(r[0]=s=>e(n).searchFilter=s),placeholder:"\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0438\u043C\u0435\u043D\u0438",clearable:"",style:G(`max-width: 300px; ${u.mobile&&"margin-bottom: 0;"}`),"suffix-icon":e(J)},null,8,["modelValue","style","suffix-icon"]),i(e(o0),{visible:d.value,placement:"bottom",title:"Sort By",width:200},{reference:a(()=>[i(e(z),{onClick:r[1]||(r[1]=s=>d.value=!d.value),class:"square-btn"},{default:a(()=>[i(e(p),{size:16,color:"white"},{default:a(()=>[i(e(X))]),_:1})]),_:1})]),default:a(()=>[(t(!0),c(k,null,E(e(n).sortOptions,s=>(t(),c("div",{key:s,onClick:()=>e(n).sortBy=s,class:$(`el-select-dropdown__item ${e(n).sortBy===s?"selected":""}`)},f(s),11,M0))),128))]),_:1},8,["visible"]),i(y0,{modelValue:e(n).sortDirection,"onUpdate:modelValue":r[2]||(r[2]=s=>e(n).sortDirection=s),options:[{value:"Descending",icon:b0},{value:"Ascending",icon:z0}],dimensions:32,style:{"margin-left":"0"}},null,8,["modelValue","options"])]))}});const w=y(F0,[["__scopeId","data-v-ab3f21f0"]]),I0={class:"workers"},W0={key:0,class:"workers"},H0={key:1,class:"models"},T0=x({__name:"WorkersView",setup(u){const d=Y(e0).smallerOrEqual("lg"),_=S();return(r,s)=>(t(),l(e(u0),{modelValue:e(_).activeTab,"onUpdate:modelValue":s[0]||(s[0]=m=>e(_).activeTab=m)},{default:a(()=>[i(e(g),{label:"\u0420\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0438",name:"workers"},{default:a(()=>[e(d)?(t(),l(w,{key:0,mobile:""})):h("",!0),o("div",I0,[e(_).sortedWorkers.length!=0?(t(),c("div",W0,[(t(!0),c(k,null,E(e(_).sortedWorkers,m=>(t(),l(t0,{key:m.id,worker:m},null,8,["worker"]))),128))])):(t(),l(e(C),{key:1,description:"\u0420\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"}))])]),_:1}),i(e(g),{label:"\u041C\u043E\u0434\u0435\u043B\u0438",name:"models"},{default:a(()=>[e(d)?(t(),l(w,{key:0,mobile:""})):h("",!0),e(_).sortedModels.length!=0?(t(),c("div",H0,[(t(!0),c(k,null,E(e(_).sortedModels,m=>(t(),l(p0,{key:m.name,model:m},null,8,["model"]))),128))])):(t(),l(e(C),{key:2,description:"\u041C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"}))]),_:1}),e(d)?h("",!0):(t(),l(e(g),{key:0,disabled:""},{label:a(()=>[i(w)]),_:1}))]),_:1},8,["modelValue"]))}});const P0=y(T0,[["__scopeId","data-v-ee6f86dd"]]);export{P0 as default};