import{r as l,g as i,c,a,t as s,f as u,m as d,o as _}from"./index-Bvb5MIaB.js";import{d as m}from"./user-CvFiV99N.js";import{_ as p}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v={key:0,class:"detail-container"},f=["src"],g={__name:"UserView",setup(y){const n=d(),e=l({});return i(async()=>{const t=n.query.id,{data:o}=await m({id:t}),{data:r}=o;e.value=r}),(t,o)=>e.value.id?(_(),c("div",v,[a("img",{src:e.value.avatar,alt:"用户头像"},null,8,f),a("div",null,[a("div",null,[a("span",null,"id:"+s(e.value.id),1),a("span",null,"昵称："+s(e.value.username),1)]),a("div",null," 邮箱："+s(e.value.email),1),a("div",null," 留言： "+s(e.value.description),1)])])):u("",!0)}},k=p(g,[["__scopeId","data-v-6eedeed0"]]);export{k as default};
