import{E as D,r as s}from"./index-DVw92pm9.js";import{a as f}from"./_plugin-vue_export-helper-DsrsFqtt.js";import{j as U,k as G}from"./group_chat-CzpvJGJe.js";function T(a){return f({url:"/room",method:"get",params:a})}function S(a){return f({url:"/chat",method:"get",params:a})}const F=D("chat",()=>{const a=s(-1),i=s(),o=s([]),r=s([]),u=s([]);function m(t){a.value=t}async function l(t){const{data:e}=await T(t),{data:n}=e;o.value=[...o.value,...n],o.value.sort((c,d)=>new Date(d.createdAt).getTime()-new Date(c.createdAt).getTime())}async function v(t){const{data:e}=await U(t),{data:n}=e;o.value=[...o.value,...n],o.value.sort((c,d)=>new Date(d.createdAt).getTime()-new Date(c.createdAt).getTime())}async function h(t){const{data:e}=await G(t);u.value=e.data}function g(t){const e=u.value.findIndex(n=>n.joinId==t);u.value.splice(e,1)}function p(t){u.value.forEach(e=>{e.joinId===t.joinId&&(e.identity=t.identity)})}function A(t){o.value.forEach(e=>{e.roomId===t.roomId&&(e.conment=t.conment,e.createdAt=t.createdAt)}),o.value.sort((e,n)=>new Date(n.createdAt).getTime()-new Date(e.createdAt).getTime())}function L(t){i.value=t}function R(t){if(t instanceof Array){r.value.push(...t);return}r.value.push(t)}function I(t){u.value.push({...t,avater:t.sendIdAvatar,username:t.sendIdUsername})}function w(t){if(t instanceof Array){r.value.unshift(...t);return}r.value.push(t)}function y(){o.value.length=0}function C(){r.value.length=0}return{chatActive:a,roomList:o,activeRoomId:i,chatList:r,roomUserList:u,addUserAfter:I,deleteGroupRoomUserFn:g,getGroupRoomUserFn:h,updateGroupRoomUserIdenty:p,updateActiveRoomId:L,getSingleRoomDataList:l,getGroupRoomLastChatDataList:v,updateChatActive:m,updateRoomList:A,addAfterChat:R,addBeforeChat:w,resetRoomList:y,resetChatList:C}});export{S as g,F as u};
