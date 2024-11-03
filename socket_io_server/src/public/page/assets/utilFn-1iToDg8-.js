function r(e,n){let t=null;return function(){t||(t=setTimeout(()=>{e.apply(this,arguments),clearTimeout(t),t=null},n))}}export{r as t};
