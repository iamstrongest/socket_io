import{r as c,w as P,h as X,n as g,k as Y,c as v,a as s,F as L,b as D,l as q,m as K,o as m,e as $,t as _}from"./index-BJBM8RCy.js";import{u as z,g as N}from"./chat-CqsFmQId.js";import{u as W,s as U}from"./user-SyG9M8Is.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";function G(M,r){let i=null;return function(){i||(i=setTimeout(()=>{M.apply(this,arguments),clearTimeout(i),i=null},r))}}const J={class:"chat-tontainer"},O={key:0,class:"left-chat-info"},Q=["src"],Z={class:"chat-info-common"},ee=["title"],te={key:1,class:"right-chat-info"},ne={class:"chat-info-common right-chat-info-div"},se=["title"],oe=["src"],ae={class:"icons-containers"},le={class:"icon","aria-hidden":"true"},ie=["xlink:href"],ce={__name:"ChatSingleRoomView",setup(M){const r=K(),i=W(),C=z(),u=c([]),a=c(),I=c(),E=c(),l=c(),f=c(1),T=c();let b,B;const H=[{class:"#icon-biaoqing",id:1,title:"表情包"},{class:"#icon-stationary_file",id:2,title:"发送文件"},{class:"#icon-shipin",id:3,title:"视频通话"},{class:"#icon-gengduox",id:4,title:"更多"}],y=c(!1);P(()=>r.params.roomId,async(n,t)=>{u.value=[],f.value=1;const e={roomId:n,page:f.value},o=await R(e);u.value=o});function k(){if(y.value)return;const n=I.value.innerText.trim();if(n.length===0){alert("发送内容不能为空");return}const t=r.params.roomId,e=i.user.info.id;C.updateRoomList({roomId:t,conment:n});const o=parseInt(r.query.receiveId),d=1,h={roomId:t,sendId:e,conment:n,receiveId:o,type:d},p=i.user.info.username,F=i.user.info.avatar;u.value.push({conment:n,roomId:t,sendId:e,receiveId:o,type:d,sendIdUsername:p,sendIdAvatar:F}),U.emit("send_chat",h),g(()=>{I.value.innerText="",a.value.scrollTop=a.value.scrollHeight})}async function R(n){const{data:t}=await N(n),{data:e}=t;return T.value=t.totalPage,e.length==0&&alert(t.message),f.value<T.value&&f.value++,e}async function V(n){var t;if(((t=n.target)==null?void 0:t.scrollTop)<10){const o={roomId:r.params.roomId,page:f.value},d=await R(o);u.value.unshift(...d)}}const A=G(V,500);X(async()=>{const n=r.params.roomId,t={roomId:n,page:f.value},e=await R(t);u.value=e,U.on("receive",o=>{console.log(o),u.value.push(o),C.updateRoomList({roomId:n,conment:o.conment}),g(()=>{a.value&&(a.value.scrollTop=a.value.scrollHeight)})}),g(()=>{a.value&&(a.value.addEventListener("scroll",A),l.value.addEventListener("mousedown",S),a.value.scrollTop=a.value.scrollHeight)})});function S(n){var t,e;n.preventDefault(),n.stopPropagation(),b=n.clientX-((t=l.value)==null?void 0:t.getBoundingClientRect().left),B=n.clientY-((e=l.value)==null?void 0:e.getBoundingClientRect().top),document.addEventListener("mousemove",w),document.addEventListener("mouseup",x)}function w(n){var d,h,p;y.value=!0;const t=(d=E.value)==null?void 0:d.getBoundingClientRect();let e=n.clientX-b-t.left,o=n.clientY-B-t.top;e=Math.max(0,Math.min(e,t.width-((h=l.value)==null?void 0:h.offsetWidth))),o=Math.max(0,Math.min(o,t.height-((p=l.value)==null?void 0:p.offsetHeight))),g(()=>{l.value&&(l.value.style.left=`${e}px`,l.value.style.top=`${o}px`)})}function x(){setTimeout(()=>{y.value=!1},100),document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",x)}return Y(()=>{var n,t;(n=a.value)==null||n.removeEventListener("scroll",k),(t=l.value)==null||t.removeEventListener("mousedown",S),document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",x)}),(n,t)=>(m(),v("div",J,[s("div",{class:"chat-message",ref_key:"chatMessageRef",ref:a},[(m(!0),v(L,null,D(u.value,e=>(m(),v(L,{key:e.id},[e.sendId!=$(i).user.info.id?(m(),v("div",O,[s("div",null,[s("img",{src:e.sendIdAvatar,alt:"头像"},null,8,Q)]),s("div",Z,[s("h3",null,_(e.sendIdUsername),1),s("p",{class:"conment",title:e.conment},_(e.conment),9,ee)])])):(m(),v("div",te,[s("div",ne,[s("h3",null,_(e.sendIdUsername),1),s("p",{class:"conment",title:e.conment},_(e.conment),9,se)]),s("div",null,[s("img",{src:e.sendIdAvatar,alt:"头像"},null,8,oe)])]))],64))),128))],512),s("div",{class:"send-container",ref_key:"sendContainerRef",ref:E},[s("div",ae,[(m(),v(L,null,D(H,e=>s("div",{class:"icons",key:e.id,title:"功能未开发"},[(m(),v("svg",le,[s("use",{"xlink:href":e.class},null,8,ie)]))])),64))]),s("div",{class:"input-tontainer",contenteditable:"true",ref_key:"editableDivRef",ref:I,onKeydown:q(k,["enter"])},null,544),s("div",{class:"send-btns .tuozhuai",ref_key:"sendBtnsRef",ref:l,onClick:k,title:"可在输入框内拖拽"},t[0]||(t[0]=[s("div",{class:"svg"},[s("svg",{class:"icon","aria-hidden":"true"},[s("use",{"xlink:href":"#icon-fasong"})])],-1),s("button",{type:"button"},"发送",-1)]),512)],512)]))}},me=j(ce,[["__scopeId","data-v-e0a89ae4"]]);export{me as default};
