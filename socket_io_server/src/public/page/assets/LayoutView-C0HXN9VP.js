import{_ as N,u as S,i as B,s as p}from"./_plugin-vue_export-helper-DsrsFqtt.js";import{u as $}from"./notify-ju4UpO40.js";import{u as V,r as y,n as g,o as i,c,a as n,F as b,b as A,d as q,e as f,t as w,f as I,g as U,h as j,w as F,i as P,j as M,k,R as O}from"./index-DVw92pm9.js";const T=["onClick","title"],D={class:"icon","aria-hidden":"true"},H=["xlink:href"],W=["title","onClick"],X={class:"inner"},G={class:"more_icon"},J={class:"icon","aria-hidden":"true"},K=["xlink:href"],Q={key:0,class:"notify"},Y={__name:"LeftAside",setup(m){const d=V(),r=S(),u=$(),e=y(),o=y(),_=y();function h(l,s){const{route:t,iconId:a}=l;s.stopPropagation(),a==4&&z(),u.updateAsideActive(a),t&&d.push(t)}const v=B;function z(){g(()=>{e.value[0]&&(e.value[0].style.display=e.value[0].style.display==="block"?"none":"block")})}function C(l){l.preventDefault(),window.addEventListener("mousemove",x),window.addEventListener("mouseup",R)}function x(l){const s=l.clientX-o.value.getBoundingClientRect().left;s>50&&s<100&&(o.value.style.width=s+"px")}function R(){window.removeEventListener("mousemove",x),window.removeEventListener("mouseup",R)}function E(l){let{route:s,iconId:t}=l;t==9&&(p.emit("logout",{id:r.user.info.id,username:r.user.info.username}),r.resetUserInfo(),localStorage.removeItem("token")),t==6&&(s=`${s}?id=${r.user.info.id}`),g(()=>{e.value[0]&&(e.value[0].style.display="none")}),s&&d.push(s)}return window.onclick=function(l){g(()=>{e.value[0]&&(e.value[0].style.display="none")})},(l,s)=>(i(),c("aside",{ref_key:"resizableRef",ref:o},[n("div",{class:"resizer",ref_key:"resizerRef",ref:_,onMousedown:C},null,544),n("div",null,[(i(!0),c(b,null,A(f(v),t=>(i(),c("div",{class:q(["common hover",{active:f(u).asideActive==t.iconId,popover:t.iconId==4}]),key:t.iconId,onClick:a=>h({route:t.route,iconId:t.iconId},a),title:t.title},[(i(),c("svg",D,[n("use",{"xlink:href":t.class},null,8,H)])),t.iconId==4?(i(),c("div",{key:0,ref_for:!0,ref_key:"popupRef",ref:e,class:"more-action"},[(i(!0),c(b,null,A(f(v)[3].children,a=>(i(),c("div",{class:"popup-item hover",title:a.title,key:a.iconId,onClick:re=>E(a)},[n("div",X,[n("div",G,[(i(),c("svg",J,[n("use",{"xlink:href":a.class},null,8,K)]))]),n("span",null,w(a.title),1)])],8,W))),128))],512)):I("",!0)],10,T))),128))]),f(u).notify.unreadNum?(i(),c("div",Q,[s[0]||(s[0]=n("div",{class:"notify-icon"},[n("svg",{class:"icon","aria-hidden":"true"},[n("use",{"xlink:href":"#icon-hongdian"})])],-1)),n("span",null,w(f(u).notify.unreadNum),1)])):I("",!0)],512))}},Z=N(Y,[["__scopeId","data-v-6fd08eba"]]);function L(){Notification.requestPermission().then(m=>{console.log(m==="granted"?"权限已授予，可以发送通知":m==="denied"?"权限被拒绝":"用户未做出选择")})}const ee={href:"https://beian.mps.gov.cn/#/query/webSearch"},oe={href:"https://beian.miit.gov.cn/"},ne={__name:"Footer",setup(m){const d=U({eamil:"1309148358@qq.com",recordText:"江西网安备 2032512330350号",recordOrder:"江B2-20241030-4"});return(r,u)=>(i(),c("footer",null,[n("p",null,[n("span",null,[n("a",ee,w(d.recordText),1)]),n("span",null,[n("a",oe,w(d.recordOrder),1)])])]))}},te=N(ne,[["__scopeId","data-v-42c0521b"]]),se={key:0},ie={class:"rightAise"},ce={__name:"LayoutView",setup(m){const d=$(),r=S();function u(e){let o="";switch(e.type){case 1:o="系统通知";break;case 2:o="好友申请";break;case 3:o="申请反馈";break}const _=new Notification(o,{body:e.conment,icon:"../assets/img/info.jpg"});_.onclick=()=>{window.focus()}}return j(async()=>{await r.setUserInfo(),await d.setNotifiy()}),F(()=>{var e,o;return(o=(e=r.user)==null?void 0:e.info)==null?void 0:o.theme},(e,o)=>{e&&window.document.documentElement.setAttribute("data-theme",e)}),P(()=>{window.document.documentElement.setAttribute("data-theme",r.user.info.theme||"light"),p.on("friend_login",e=>{const o=new Notification("好友上线通知",{body:e.msg,icon:"../assets/img/info.jpg"});o.onclick=()=>{window.focus()}}),p.on("friend_logout",e=>{const o=new Notification("好友下线通知",{body:e.msg,icon:"../assets/img/info.jpg"});o.onclick=()=>{window.focus()}}),p.on("disconnect",()=>{console.log(p.connected)}),window.onload=()=>{Notification.permission!=="granted"&&L()},p.on("receive_notify",e=>{d.addNotifiy(e),Notification.permission==="granted"?u(e):L()})}),M(()=>{r.resetUserInfo()}),(e,o)=>{var _,h,v;return i(),c(b,null,[(v=(h=(_=f(r))==null?void 0:_.user)==null?void 0:h.info)!=null&&v.id?(i(),c("main",se,[k(Z),n("div",ie,[k(f(O))])])):I("",!0),k(te)],64)}}},ue=N(ce,[["__scopeId","data-v-82aae17b"]]);export{ue as default};
