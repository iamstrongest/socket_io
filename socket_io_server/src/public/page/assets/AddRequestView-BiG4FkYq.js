import{G as y,g as k,i as A,u as F,o as i,c as v,a as o,q as _,l as m,v as l,C as w,r as V,e as C,d as p,m as f,f as u}from"./index-B0xKhKPY.js";import{_ as I,u as b,d as R,s as S}from"./_plugin-vue_export-helper-C33wAQXg.js";import{A as q}from"./AddRoom-DdXZYx0P.js";import{l as N}from"./group_chat-BSKifq6B.js";const $={class:"form_container"},B={class:"form_col"},D={for:"text"},M={class:"form_col"},U={for:"password"},g=["placeholder"],G={__name:"AddFriend",setup(x){const n=b(),r=y(()=>n.user.info.username),t=k({receiveId:"",conment:""});A(()=>{t.conment=`您好，我是${n.user.info.username},想要添加你成为好友`});const c=F(),a=async()=>{try{const s={sendId:n.user.info.id,receiveId:Number(t.receiveId),conment:t.conment,status:0,username:r.value},e={sendId:n.user.info.id,receiveId:Number(t.receiveId),conment:t.conment,type:2},{data:d}=await R(s);t.id="",t.conment="",d.code===200&&(alert(d.message),S.emit("send_notify",e),c.push("/chat/request"))}catch(s){console.error("登录失败:",s)}};return(s,e)=>(i(),v("div",$,[o("form",{onSubmit:w(a,["prevent"])},[o("div",B,[o("label",D,[e[2]||(e[2]=o("span",null,"用户ID: ",-1)),e[3]||(e[3]=_()),m(o("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=d=>t.receiveId=d),name:"text",id:"text",placeholder:"输入用户ID"},null,512),[[l,t.receiveId]])])]),o("div",M,[o("label",U,[e[4]||(e[4]=o("div",null,"附带信息: ",-1)),m(o("textarea",{type:"text",placeholder:t.conment,"onUpdate:modelValue":e[1]||(e[1]=d=>t.conment=d)},null,8,g),[[l,t.conment]])])]),e[5]||(e[5]=o("div",{class:"form_col submit"},[o("label",{for:"submit"},[o("button",{type:"submit",name:"submit"},"提交")])],-1))],32)]))}},T=I(G,[["__scopeId","data-v-6ed6747b"]]),h={key:0,class:"add-friend-container"},j={__name:"AddRequestView",setup(x){const n=b(),r=V(1);async function t(a){r.value=a}async function c(a){const s={roomId:a.roomId,joinId:n.user.info.id,status:1,conment:a.conment};alert("申请成功"),await N(s)}return(a,s)=>C(n).user.info.id?(i(),v("div",h,[o("p",null,[o("span",{class:p({active:r.value===1}),onClick:s[0]||(s[0]=e=>t(1))},"好友申请",2),s[2]||(s[2]=_("/")),o("span",{class:p({active:r.value===2}),onClick:s[1]||(s[1]=e=>t(2))},"群聊申请",2)]),r.value===1?(i(),f(T,{key:0})):u("",!0),r.value===2?(i(),f(q,{key:1,class:"color","has-conment":!0,"confirm-fn":c})):u("",!0)])):u("",!0)}},K=I(j,[["__scopeId","data-v-0a3d52a2"]]);export{K as default};