import{u as A,i as B,s as p}from"./user-SyG9M8Is.js";import{u as C}from"./notify-BFtLzm35.js";import{u as I,r as w,n as y,o as s,c,a as i,F as b,b as R,d as P,e as u,t as x,f as g,g as j,w as M,h as U,i as L,R as q}from"./index-BJBM8RCy.js";import{_ as S}from"./_plugin-vue_export-helper-DlAUqK2U.js";const D=["onClick","title"],F={class:"icon","aria-hidden":"true"},H=["xlink:href"],O=["title","onClick"],T={class:"inner"},W={class:"more_icon"},X={class:"icon","aria-hidden":"true"},G=["xlink:href"],J={key:0,class:"notify"},K={__name:"LeftAside",setup(v){const _=I(),r=A(),d=C(),e=w(),o=w(),f=w();function h(a,n){const{route:t,id:l}=a;n.stopPropagation(),l==4&&E(),d.updateAsideActive(l),t&&_.push(t)}const m=B;function E(){y(()=>{e.value[0]&&(e.value[0].style.display=e.value[0].style.display==="block"?"none":"block")})}function V(a){a.preventDefault(),window.addEventListener("mousemove",k),window.addEventListener("mouseup",N)}function k(a){const n=a.clientX-o.value.getBoundingClientRect().left;n>50&&n<100&&(o.value.style.width=n+"px")}function N(){window.removeEventListener("mousemove",k),window.removeEventListener("mouseup",N)}function $(a){let{route:n,id:t}=a;t==9&&(p.emit("logout",{id:r.user.info.id,username:r.user.info.username}),r.resetUserInfo(),localStorage.removeItem("token")),t==6&&(n=`${n}?id=${r.user.info.id}`),y(()=>{e.value[0]&&(e.value[0].style.display="none")}),n&&_.push(n)}return window.onclick=function(a){y(()=>{e.value[0]&&(e.value[0].style.display="none")})},(a,n)=>(s(),c("aside",{ref_key:"resizableRef",ref:o},[i("div",{class:"resizer",ref_key:"resizerRef",ref:f,onMousedown:V},null,544),i("div",null,[(s(!0),c(b,null,R(u(m),t=>(s(),c("div",{class:P(["common hover",{active:u(d).asideActive==t.id,popover:t.id==4}]),key:t.id,onClick:l=>h({route:t.route,id:t.id},l),title:t.title},[(s(),c("svg",F,[i("use",{"xlink:href":t.class},null,8,H)])),t.id==4?(s(),c("div",{key:0,ref_for:!0,ref_key:"popupRef",ref:e,class:"more-action"},[(s(!0),c(b,null,R(u(m)[3].children,l=>(s(),c("div",{class:"popup-item hover",title:l.title,onClick:oe=>$(l)},[i("div",T,[i("div",W,[(s(),c("svg",X,[i("use",{"xlink:href":l.class},null,8,G)]))]),i("span",null,x(l.title),1)])],8,O))),256))],512)):g("",!0)],10,D))),128))]),u(d).notify.unreadNum?(s(),c("div",J,[n[0]||(n[0]=i("div",{class:"notify-icon"},[i("svg",{class:"icon","aria-hidden":"true"},[i("use",{"xlink:href":"#icon-hongdian"})])],-1)),i("span",null,x(u(d).notify.unreadNum),1)])):g("",!0)],512))}},Q=S(K,[["__scopeId","data-v-6837d39f"]]);function z(){Notification.requestPermission().then(v=>{console.log(v==="granted"?"权限已授予，可以发送通知":v==="denied"?"权限被拒绝":"用户未做出选择")})}const Y={key:0},Z={class:"rightAise"},ee={__name:"LayoutView",setup(v){const _=C(),r=A();function d(e){let o="";switch(e.type){case 1:o="系统通知";break;case 2:o="好友申请";break;case 3:o="申请反馈";break}const f=new Notification(o,{body:e.conment,icon:"../assets/img/info.jpg"});f.onclick=()=>{window.focus()}}return j(async()=>{await r.setUserInfo(),await _.setNotifiy()}),M(()=>r.user.info.theme,(e,o)=>{e&&window.document.documentElement.setAttribute("data-theme",e)}),U(()=>{window.document.documentElement.setAttribute("data-theme",r.user.info.theme||"light"),p.on("friend_login",e=>{const o=new Notification("好友上线通知",{body:e.msg,icon:"../assets/img/info.jpg"});o.onclick=()=>{window.focus()}}),p.on("friend_logout",e=>{const o=new Notification("好友下线通知",{body:e.msg,icon:"../assets/img/info.jpg"});o.onclick=()=>{window.focus()}}),p.on("disconnect",()=>{console.log(p.connected)}),window.onload=()=>{Notification.permission!=="granted"&&z()},p.on("receive_notify",e=>{_.addNotifiy(e),Notification.permission==="granted"?d(e):z()})}),(e,o)=>{var f,h,m;return(m=(h=(f=u(r))==null?void 0:f.user)==null?void 0:h.info)!=null&&m.id?(s(),c("main",Y,[L(Q),i("div",Z,[L(u(q))])])):g("",!0)}}},ce=S(ee,[["__scopeId","data-v-a7a2673f"]]);export{ce as default};