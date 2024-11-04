import{g as y,u as $,o as d,c as f,a as e,q as w,l as p,v as u,C as x,I as k,r as V,f as I,J as R,t as h,m as b,L as D,K as F}from"./index-B0xKhKPY.js";import{_,l as C,k as L,r as S}from"./_plugin-vue_export-helper-C33wAQXg.js";const T={class:"form_container"},U={class:"form_col"},A={for:"email"},B={class:"form_col"},N={for:"password"},z={__name:"Login",setup(g){const l=y({password:"",email:""}),a=$(),r=async()=>{try{const{data:n}=await C(l),{data:o}=n;l.email="",l.password="",n.code===200&&confirm(n.message)&&(L(o.token,o.refresh_token),a.push("/"))}catch(n){console.error("登录失败:",n)}};return(n,o)=>(d(),f("div",T,[e("form",{onSubmit:x(r,["prevent"])},[e("div",U,[e("label",A,[o[2]||(o[2]=e("span",null,"邮箱: ",-1)),o[3]||(o[3]=w()),p(e("input",{type:"email","onUpdate:modelValue":o[0]||(o[0]=t=>l.email=t),name:"email",id:"email",placeholder:"输入邮箱"},null,512),[[u,l.email]])])]),e("div",B,[e("label",N,[o[4]||(o[4]=e("span",null,"密码: ",-1)),o[5]||(o[5]=w()),p(e("input",{type:"password","onUpdate:modelValue":o[1]||(o[1]=t=>l.password=t),name:"password",id:"password",placeholder:"输入密码"},null,512),[[u,l.password]])])]),o[6]||(o[6]=e("div",{class:"form_col submit"},[e("label",{for:"submit"},[e("button",{type:"submit",name:"submit"},"登录")])],-1))],32)]))}},c=_(z,[["__scopeId","data-v-49cdfdfd"]]),Z={class:"form_container"},K={class:"form_col file"},M={for:"file",class:"flie_label"},P=["src"],j={class:"form_col"},q={for:"password"},E={class:"form_col"},J={for:"email"},G={class:"form_col"},H={for:"password"},O={__name:"Register",setup(g){const l=k("file"),a=y({password:"",email:"",username:""}),r=V(),n=async()=>{const t=new FormData,s=l.value.files[0];if(!(s&&/^(image\/jpeg|image\/png|image\/gif|image\/bmp|image\/webp)$/.test(s.type))){alert("Valid image file.");return}if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(a.email)){alert("Invalid email address.");return}if(a.password.length<6){alert("注册密码不能少于6位数");return}if(a.username.length==0){alert("注册昵称不能为空");return}t.append("file",s),t.append("fileName",s.name.split(".")[0]),t.append("timestamp",Date.now()),t.append("email",a.email),t.append("password",a.password),t.append("username",a.username);try{const m=await S(t);console.log("上传成功:",m.data),a.email="",a.password="",a.username=""}catch(m){console.error("上传失败:",m)}},o=t=>{const s=t.target.files[0],i=new FileReader;i.onload=function(v){const m=v.target.result;r.value=m},i.readAsDataURL(s)};return(t,s)=>(d(),f("div",Z,[e("form",{onSubmit:x(n,["prevent"])},[e("div",K,[e("label",M,[s[3]||(s[3]=e("span",null,"上传图片: ",-1)),s[4]||(s[4]=e("div",null,[e("svg",{class:"icon","aria-hidden":"true"},[e("use",{"xlink:href":"#icon-shangchuantouxiang"})])],-1)),e("input",{type:"file",name:"file",ref:"file",id:"file",onChange:o},null,544),r.value?(d(),f("img",{key:0,src:r.value,alt:"预览"},null,8,P)):I("",!0)])]),e("div",j,[e("label",q,[s[5]||(s[5]=e("span",null,"昵称: ",-1)),p(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=i=>a.username=i),id:"password",name:"password",placeholder:"输入昵称"},null,512),[[u,a.username]])])]),e("div",E,[e("label",J,[s[6]||(s[6]=e("span",null,"注册邮箱: ",-1)),p(e("input",{type:"email","onUpdate:modelValue":s[1]||(s[1]=i=>a.email=i),id:"email",name:"email",placeholder:"输入邮箱认证"},null,512),[[u,a.email]])])]),e("div",G,[e("label",H,[s[7]||(s[7]=e("span",null,"登录密码: ",-1)),p(e("input",{type:"password","onUpdate:modelValue":s[2]||(s[2]=i=>a.password=i),id:"password",name:"password",placeholder:"输入密码"},null,512),[[u,a.password]])])]),s[8]||(s[8]=e("div",{class:"form_col submit"},[e("label",{for:"submit"},[e("button",{type:"submit",name:"submit",id:"submit"},"注册")])],-1))],32)]))}},Q=_(O,[["__scopeId","data-v-6f9a460f"]]),W={class:"login_view"},X={__name:"LoginView",setup(g){const l=R(c),a=V("注册");function r(){l.value===c?(a.value="登录",l.value=Q):(a.value="注册",l.value=c)}return(n,o)=>(d(),f("div",W,[e("button",{class:"toggle",type:"button",onClick:r},h(a.value),1),(d(),b(F,null,[(d(),b(D(l.value)))],1024))]))}},se=_(X,[["__scopeId","data-v-f7781aac"]]);export{se as default};
