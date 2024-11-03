import{g as _,r as u,h as w,c as U,a as t,l as a,v as f,q as m,H as p,C as x,o as V}from"./index-DXBiOaP8.js";import{_ as h,u as k,f as C,h as D}from"./_plugin-vue_export-helper-D_52YD_W.js";const I={class:"edit-container"},R={class:"file-container"},B={for:"file",class:"flie_label"},F=["src"],M={class:"form_col"},S={for:"username"},T={class:"form_col"},E={for:"description"},H={class:"form_col"},N={for:"dark"},A={for:"light"},j={__name:"EditUserView",setup(q){const o=k(),s=_({}),l=u(!1),r=u();w(async()=>{s.src=o.user.info.avatar,s.username=o.user.info.username,s.description=o.user.info.description,s.theme=o.user.info.theme});const c=i=>{l.value=!0;const e=i.target.files[0];if(!(e&&/^(image\/jpeg|image\/png|image\/gif|image\/bmp|image\/webp)$/.test(e.type))){alert("Valid image file.");return}const d=new FileReader;d.onload=function(b){const y=b.target.result;s.src=y},d.readAsDataURL(e)};async function g(){if(!l.value)return alert("请更改图片后，再进行上传");const i=new FormData,e=r.value.files[0];i.append("file",e),i.append("fileName",e.name.split(".")[0]),i.append("timestamp",Date.now());const{data:n}=await C(i);n.code===200&&await o.setUserInfo()}async function v(){const i={id:o.user.info.id,username:s.username,description:s.description,theme:s.theme};if(s.username.length==0){alert("注册昵称不能为空");return}if(s.description.length==0){alert("注册昵称不能为空");return}const{data:e}=await D(i);e.code===200&&await o.setUserInfo()}return(i,e)=>(V(),U("div",I,[t("div",R,[t("label",B,[e[4]||(e[4]=t("span",null,"更改头像: ",-1)),e[5]||(e[5]=t("div",null,[t("svg",{class:"icon","aria-hidden":"true"},[t("use",{"xlink:href":"#icon-shangchuantouxiang"})])],-1)),t("input",{type:"file",name:"file",ref_key:"fileRef",ref:r,id:"file",onChange:c},null,544),t("img",{src:s.src,alt:"预览图"},null,8,F)]),t("div",{class:"form_col"},[t("button",{type:"button",class:"upload",onClick:g},"上传")])]),t("form",{onSubmit:x(v,["prevent"])},[t("div",M,[t("label",S,[e[6]||(e[6]=t("span",null,"昵称: ",-1)),a(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=n=>s.username=n),id:"username",name:"username"},null,512),[[f,s.username]])])]),t("div",T,[t("label",E,[e[7]||(e[7]=t("span",null,"描述: ",-1)),a(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=n=>s.description=n),id:"description",name:"description"},null,512),[[f,s.description]])])]),t("div",H,[e[12]||(e[12]=t("p",null,"主题选择",-1)),t("label",N,[e[8]||(e[8]=t("span",null,"暗色:",-1)),e[9]||(e[9]=m()),a(t("input",{type:"radio",id:"dark","onUpdate:modelValue":e[2]||(e[2]=n=>s.theme=n),value:"dark"},null,512),[[p,s.theme]])]),t("label",A,[e[10]||(e[10]=t("span",null,"亮色:",-1)),e[11]||(e[11]=m()),a(t("input",{type:"radio",id:"light","onUpdate:modelValue":e[3]||(e[3]=n=>s.theme=n),value:"light"},null,512),[[p,s.theme]])])]),e[13]||(e[13]=t("div",{class:"form_col submit"},[t("label",{for:"submit"},[t("button",{type:"submit",name:"submit",id:"submit"},"更改")])],-1))],32)]))}},z=h(j,[["__scopeId","data-v-9ef5c556"]]);export{z as default};
