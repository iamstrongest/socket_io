import{q as m,i as N,s as y}from"./index-BthrF4y-.js";import{a as u,u as p}from"./user-DiX8ICKB.js";function h(o){return u({url:"/notify",method:"get",params:o})}function v(o){return u({url:"/notify",method:"put",data:o})}const A=m("notify",()=>{const o=N(1),t=y({unreadNum:0,data:[]}),a=p();async function r(){t.unreadNum=0;const e={receiveId:a.user.info.id},{data:n}=await h(e),{data:i}=n;t.data=i,i.forEach(d=>{d.status==0&&(t.unreadNum=t.unreadNum+1)})}async function s(e){t.data.forEach(n=>{n.id==e.id&&(n.status=e.status,t.unreadNum--)}),await v(e)}function c(e){t.data.unshift(e),t.unreadNum=t.unreadNum+1}function f(e){o.value=e}return{asideActive:o,notify:t,setNotifiy:r,updateNotifiy:s,addNotifiy:c,updateAsideActive:f}});export{A as u};
