import{r as l,h as c,c as i,a,t as s,f as u,y as d,o as _}from"./index-DXBiOaP8.js";import{_ as p,e as v}from"./_plugin-vue_export-helper-D_52YD_W.js";const m={key:0,class:"detail-container"},f=["src"],y={__name:"UserView",setup(h){const o=d(),e=l({});return c(async()=>{const t=o.query.id,{data:n}=await v({id:t}),{data:r}=n;e.value=r}),(t,n)=>e.value.id?(_(),i("div",m,[a("img",{src:e.value.avatar,alt:"用户头像"},null,8,f),a("div",null,[a("div",null,[a("span",null,"id:"+s(e.value.id),1),a("span",null,"昵称："+s(e.value.username),1)]),a("div",null," 邮箱："+s(e.value.email),1),a("div",null," 留言： "+s(e.value.description),1)])])):u("",!0)}},g=p(y,[["__scopeId","data-v-47cbc829"]]);export{g as default};