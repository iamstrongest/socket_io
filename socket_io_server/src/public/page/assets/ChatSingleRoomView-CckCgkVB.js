import{i as m,k as f,w as X,g as Y,n as k,l as q,c as r,F as L,r as B,b as K,a as n,m as N,p as $,o as u,e as z,t as h}from"./index-DCXIXEj8.js";import{u as W,g as j}from"./chat-DygNyFXo.js";import{u as G,s as S}from"./user-giQHEvsq.js";import{_ as J}from"./_plugin-vue_export-helper-DlAUqK2U.js";function O(M,d){let a=null;return function(){a||(a=setTimeout(()=>{M.apply(this,arguments),clearTimeout(a),a=null},d))}}const Q={class:"chat-tontainer"},Z={key:0,class:"chat-message",ref:"chatMessage"},ee={key:0,class:"left-chat-info"},te=["src"],ne={class:"chat-info-common"},se=["title"],oe={key:1,class:"right-chat-info"},ae={class:"chat-info-common right-chat-info-div"},ie=["title"],le=["src"],ce={class:"send-container",ref:"sendContainer"},re={class:"icons-containers"},ue={class:"icon","aria-hidden":"true"},de=["xlink:href"],ve={__name:"ChatSingleRoomView",setup(M){const d=$(),a=G(),w=W(),i=m([]),l=f("chatMessage"),R=f("editableDiv"),D=f("sendContainer"),c=f("sendBtns"),v=m(1),b=m();let C,x;const H=[{class:"#icon-biaoqing",id:1,title:"表情包"},{class:"#icon-stationary_file",id:2,title:"发送文件"},{class:"#icon-shipin",id:3,title:"视频通话"},{class:"#icon-gengduox",id:4,title:"更多"}],p=m(!1);X(()=>d.params.roomId,async(t,s)=>{i.value=[],v.value=1;const e={roomId:t,page:v.value},o=await _(e);i.value=o});function g(){if(p.value)return;const t=R.value.innerHTML.trim();if(t.length===0){alert("发送内容不能为空");return}const s=d.params.roomId,e=a.user.info.id;w.updateRoomList({roomId:s,conment:t});const o=parseInt(d.query.receiveId),T=1,A={roomId:s,sendId:e,conment:t,receiveId:o,type:T},F=a.user.info.username,P=a.user.info.avatar;i.value.push({conment:t,roomId:s,sendId:e,receiveId:o,type:T,sendIdUsername:F,sendIdAvatar:P}),k(()=>{l.value.scrollTop=l.value.scrollHeight}),S.emit("send_chat",A),R.value.innerHTML=""}async function _(t){const{data:s}=await j(t),{data:e}=s;return b.value=s.totalPage,e.length==0&&alert(s.message),v.value<b.value&&v.value++,e}async function U(t){if(t.target.scrollTop<10){const e={roomId:d.params.roomId,page:v.value},o=await _(e);i.value.unshift(...o)}}const V=O(U,500);Y(async()=>{const t=d.params.roomId,s={roomId:t,page:v.value},e=await _(s);i.value=e,S.on("receive",o=>{i.value.push(o),w.updateRoomList({roomId:t,conment:o.conment}),k(()=>{l.value.scrollTop=l.value.scrollHeight})}),k(()=>{l.value.scrollTop=l.value.scrollHeight}),l.value.addEventListener("scroll",V),c.value.addEventListener("mousedown",E)});function E(t){t.preventDefault(),t.stopPropagation(),C=t.clientX-c.value.getBoundingClientRect().left,x=t.clientY-c.value.getBoundingClientRect().top,document.addEventListener("mousemove",I),document.addEventListener("mouseup",y)}function I(t){p.value=!0;const s=D.value.getBoundingClientRect();let e=t.clientX-C-s.left,o=t.clientY-x-s.top;e=Math.max(0,Math.min(e,s.width-c.value.offsetWidth)),o=Math.max(0,Math.min(o,s.height-c.value.offsetHeight)),c.value.style.left=`${e}px`,c.value.style.top=`${o}px`}function y(){setTimeout(()=>{p.value=!1},100),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",y)}return q(()=>{l.value.removeEventListener("scroll",g),c.value.removeEventListener("mousedown",E),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",y)}),(t,s)=>(u(),r("div",Q,[i.value.length>0?(u(),r("div",Z,[(u(!0),r(L,null,B(i.value,e=>(u(),r(L,{key:e.id},[e.sendId!=z(a).user.info.id?(u(),r("div",ee,[n("div",null,[n("img",{src:e.sendIdAvatar,alt:"头像"},null,8,te)]),n("div",ne,[n("h3",null,h(e.sendIdUsername),1),n("p",{class:"conment",title:e.conment},h(e.conment),9,se)])])):(u(),r("div",oe,[n("div",ae,[n("h3",null,h(e.sendIdUsername),1),n("p",{class:"conment",title:e.conment},h(e.conment),9,ie)]),n("div",null,[n("img",{src:e.sendIdAvatar,alt:"头像"},null,8,le)])]))],64))),128))],512)):K("",!0),n("div",ce,[n("div",re,[(u(),r(L,null,B(H,e=>n("div",{class:"icons",key:e.id,title:"功能未开发"},[(u(),r("svg",ue,[n("use",{"xlink:href":e.class},null,8,de)]))])),64))]),n("div",{class:"input-tontainer",contenteditable:"true",ref:"editableDiv",onKeydown:N(g,["enter"])},null,544),n("div",{class:"send-btns .tuozhuai",ref:"sendBtns",onClick:g,title:"可在输入框内拖拽"},s[0]||(s[0]=[n("div",{class:"svg"},[n("svg",{class:"icon","aria-hidden":"true"},[n("use",{"xlink:href":"#icon-fasong"})])],-1),n("button",{type:"button"},"发送",-1)]),512)],512)]))}},ge=J(ve,[["__scopeId","data-v-ad7bb13b"]]);export{ge as default};
