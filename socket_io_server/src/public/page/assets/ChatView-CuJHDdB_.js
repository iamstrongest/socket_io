import{u as $,r as m,g as z,o as u,c as d,a as t,d as w,e as i,F as b,b as x,t as g,i as C,f as I,R as S}from"./index-Bvb5MIaB.js";import{u as R,c as V}from"./user-CvFiV99N.js";import{u as B}from"./chat-DMcT0lHr.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";const E=["onClick"],A=["src"],D={class:"right-info"},j=["title"],N=["title"],F={__name:"Room",setup(y){const l=$(),v=R(),n=B(),r=m(),c=m();z(async()=>{const o={id:v.user.info.id};await n.getRoomDataList(o)});function a(o,s,e,h){let f=V[o].path;e&&(f=`${f}/${e}?receiveId=${h}&timestamp=${Date.now()}`),n.updateChatActive(s),n.updateActiveRoomId(e),l.push(f)}function L(o){o.preventDefault(),window.addEventListener("mousemove",_),window.addEventListener("mouseup",p)}function _(o){const s=o.clientX-r.value.getBoundingClientRect().left;s>150&&s<300&&(r.value.style.width=s+"px")}function p(){window.removeEventListener("mousemove",_),window.removeEventListener("mouseup",p)}return(o,s)=>(u(),d("div",{class:"chatList-container",ref_key:"resizableRef",ref:r},[s[2]||(s[2]=t("h3",null,"聊天记录",-1)),t("div",{class:"resizer",ref_key:"resizerRef",ref:c,onMousedown:L},null,544),t("div",{class:w(["new-friends hover",{active:i(n).chatActive==-1}]),onClick:s[0]||(s[0]=e=>a(-1,-1))},s[1]||(s[1]=[t("i",null,[t("svg",{class:"icon","aria-hidden":"true"},[t("use",{"xlink:href":"#icon-xindehaoyou"})])],-1),t("strong",null,"新的好友",-1)]),2),(u(!0),d(b,null,x(i(n).roomList,e=>(u(),d("div",{class:w(["room-list hover",{active:i(n).chatActive==e.roomId}]),key:e.id,onClick:h=>a(e.type,e.roomId,e.roomId,e.showUserId)},[t("div",null,[t("img",{src:e.avatar,alt:"用户头像",title:"用户头像"},null,8,A)]),t("div",D,[t("strong",{title:e.username},g(e.username),9,j),t("span",{title:e.lastChat},g(e.conment),9,N)])],10,E))),128))],512))}},M=k(F,[["__scopeId","data-v-b84dd3ce"]]),U={key:0,class:"chat-container"},H={class:"chat-container-right"},T={__name:"ChatView",setup(y){const l=R();return(v,n)=>{var r,c,a;return(a=(c=(r=i(l))==null?void 0:r.user)==null?void 0:c.info)!=null&&a.id?(u(),d("div",U,[C(M),t("div",H,[C(i(S))])])):I("",!0)}}},K=k(T,[["__scopeId","data-v-7af6ba94"]]);export{K as default};
