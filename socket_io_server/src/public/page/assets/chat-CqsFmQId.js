import{p as f,r as c}from"./index-BJBM8RCy.js";import{a as s}from"./user-SyG9M8Is.js";function h(o){return s({url:"/room",method:"get",params:o})}function g(o){return s({url:"/chat",method:"get",params:o})}const p=f("chat",()=>{const o=c(-1),a=c(),n=c([]);function i(t){o.value=t}async function u(t){const{data:e}=await h(t),{data:r}=e;e.code===200&&(n.value=r),r.length==0&&alert(e.message)}function m(t){n.value.forEach(e=>{e.roomId===t.roomId&&(e.conment=t.conment)})}function d(t){a.value=t}return{chatActive:o,roomList:n,activeRoomId:a,updateActiveRoomId:d,getRoomDataList:u,updateChatActive:i,updateRoomList:m}});export{g,p as u};