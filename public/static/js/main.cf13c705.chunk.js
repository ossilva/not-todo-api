(this["webpackJsonpupload-gallery"]=this["webpackJsonpupload-gallery"]||[]).push([[0],{127:function(e,t,a){},138:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),o=a.n(c),l=(a(55),a(45)),i=a.n(l),u=a(4),s=a(2),p=Object(n.createContext)({}),m=a(8),d=function(e,t){switch(t.type){case"SAVE_USER":return Object(m.a)({},e,{isLoggedIn:!0,data:t.payload});case"LOGOUT":return Object(m.a)({},e,{isLoggedIn:!1,data:{}});default:return e}},g=function(e){var t=e.children,a=Object(n.useReducer)(d,{}),c=Object(s.a)(a,2),o=c[0],l=c[1];return r.a.createElement(p.Provider,{value:{user:o,dispatchUserAction:l}},t)},f=a(3),h=a.n(f),b=a(7),E=a(6),w=a.n(E),v=function(e){e?w.a.defaults.headers.common["x-auth"]=e:delete w.a.defaults.headers.common["x-auth"]},y=function(e){var t=e.siteTitle,a=e.isLoggedIn,n=e.logout;return r.a.createElement("header",{style:{background:"rebeccapurple",marginBottom:"1.45rem",padding:"1rem 0"}},r.a.createElement("div",{className:"flex-container container"},r.a.createElement("div",{className:"text-left"},r.a.createElement("h1",{style:{margin:0}},r.a.createElement(u.a,{to:"/",style:{color:"white",textDecoration:"none"}},t))),a&&r.a.createElement("div",{className:"text-right"},r.a.createElement("button",{type:"button",onClick:function(){Object(u.c)("/app/gallery")},className:"btn btn-primary gradient-green"},"gallery"),r.a.createElement("button",{type:"button",onClick:function(){Object(u.c)("/app/gallery/upload")},className:"btn btn-primary gradient-green"},"upload"),r.a.createElement("button",{type:"submit",onClick:n,className:"btn btn-primary gradient-green"},"logout"))))},O=(a(79),function(e){var t=e.children,a=e.isLoggedIn,n=e.logout;return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{siteTitle:"Gallery App",isLoggedIn:a,logout:n}),r.a.createElement("main",null,t))}),j=function(e){var t=e.children,a=Object(n.useContext)(p),c=a.user,o=a.dispatchUserAction,l=Object(n.useState)(!0),i=Object(s.a)(l,2),m=i[0],d=i[1],g=function(){var e=Object(b.a)(h.a.mark((function e(){var t,a,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(t=window.localStorage.getItem("token"))){e.next=15;break}return e.next=5,w()({method:"GET",url:"/api/user/verify",headers:{"Content-Type":"text/plain","x-auth":t}});case 5:return a=e.sent,n=a.data,e.next=9,v(n.token);case 9:o({type:"SAVE_USER",payload:"any"}),window.localStorage.setItem("token",n.token),"/app/login"!==window.location.pathname&&"/app/register"!==window.location.pathname&&"/app"!==window.location.pathname&&"/app/login/"!==window.location.pathname&&"/app/register/"!==window.location.pathname&&"/app/"!==window.location.pathname||Object(u.c)("/app/gallery/"),d(!1),e.next=17;break;case 15:"/app/gallery"!==window.location.pathname&&"/app/gallery/"!==window.location.pathname&&"/app/upload"!==window.location.pathname&&"/app/upload/"!==window.location.pathname||Object(u.c)("/app/login/"),d(!1);case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0),d(!1);case 22:case"end":return e.stop()}}),e,null,[[0,19]])})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){c.isLoggedIn||g()}),[]),r.a.createElement(r.a.Fragment,null,m?r.a.createElement("span",null,"Loading..."):r.a.createElement(O,{isLoggedIn:c.isLoggedIn,logout:function(){try{o({type:"LOGOUT"}),window.localStorage.removeItem("token"),v(!1),Object(u.c)("/")}catch(e){console.log(e)}}},t))},x=a(13),k=a(47),S=a.n(k),N=function(e){return e.map((function(e){var t,a;if(e.img_width&&e.img_height){var n=function(e){var t,a=[window.screen.availWidth,window.screen.availHeight],n=(t=[e,a],t[0].map((function(e,a){return t.map((function(e){return e[a]}))}))).map((function(e,t){return e/t})),r=.1/Math.max.apply(Math,Object(x.a)(n)),c=e.map((function(e){return e*r}));return Math.min.apply(Math,Object(x.a)(c))>80?c:c.map((function(e){return 80*e/Math.min.apply(Math,Object(x.a)(c))}))}([e.img_width,e.img_height].map(Number)),r=Object(s.a)(n,2);t=r[0],a=r[1]}return{key:e.Key,src:e.url,thumbnail:e.url,thumbnailWidth:t||100,thumbnailHeight:a||100,tagString:e.tags,tags:e.tags.split(",").filter((function(e){return""!==e})).map((function(e){return{value:e,title:e}})),isSelected:!1}}))},C=function(){var e=Object(b.a)(h.a.mark((function e(){var t,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("/api/images/all");case 2:return t=e.sent,a=t.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(){var e=Object(b.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C();case 2:return t=e.sent,e.abrupt("return",N(t));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(),l=Object(s.a)(o,2),i=l[0],u=l[1],p=Object(n.useState)(),m=Object(s.a)(p,2),d=m[0],g=m[1],f=Object(n.useState)(!1),E=Object(s.a)(f,2),v=E[0],y=E[1];Object(n.useEffect)((function(){(function(){var e=Object(b.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L();case 2:t=e.sent,u(t),g(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(n.useEffect)((function(){if(i){var e=i.filter((function(e){return e.tagString.includes(a)||e.isSelected}));g(e)}return function(){y(!1)}}),[a,v,i]);return r.a.createElement(r.a.Fragment,null,d&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("div",{className:"parent grid-parent"},r.a.createElement("h2",{className:"child"},"Tag Filter"),r.a.createElement("button",{onClick:function(){d.forEach((function(e){e.isSelected=!0})),y(!0)},className:"child btn btn-primary gradient-green"},"select all"),r.a.createElement("button",{onClick:function(){d.forEach((function(e){e.isSelected=!1})),y(!0)},className:"child btn btn-primary gradient-green"},"clear selection"),r.a.createElement("button",{onClick:function(e){var t=d.filter((function(e){return e.isSelected})).map((function(e){return e.key}));w.a.post("/s3/zip",t,{responseType:"arraybuffer"}).then((function(e){var t=window.URL.createObjectURL(new Blob([e.data])),a=document.createElement("a");a.href=t,a.setAttribute("download","".concat(Math.floor(Date.now()/1e3),"_tenerife20.zip")),document.body.appendChild(a),a.click()})).catch((function(e){return console.error("could not download selected\n        ".concat(e))}))},className:"child btn btn-primary gradient-green"},"download selected")),r.a.createElement("input",{onChange:function(e){c(e.target.value.replace(/[ #*;,.<>\{\}\[\]\\\/]/gi,"").toLocaleLowerCase())},value:a,placeholder:'Type to filter by tag e.g. "teide"',name:"tagsField",type:"text"})),r.a.createElement(S.a,{images:d,onSelectImage:function(e,t){d[e].isSelected=!t.isSelected}})))},I=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container center-text"},r.a.createElement("div",{style:{maxWidth:"700px",margin:"0 auto 3rem auto"}}),r.a.createElement("div",null,r.a.createElement(u.a,{className:"btn btn-rounded gradient-purple",to:"/app/login/"},"Login"))))},T=(a(126),a(48)),U=a.n(T),A=function(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Tags for pictures comma-separated e.g."," ","<photographer>,<place> (oscar,teide)"),r.a.createElement("input",{onChange:function(e){c(e.target.value.replace(/[ #*;.<>\{\}\[\]\\\/]/gi,"").toLocaleLowerCase())},value:a,placeholder:"optional",name:"tagsField",type:"text"}),r.a.createElement((function(){var e=function(){var e=Object(b.a)(h.a.mark((function e(t){var n,r,c,o,l,i,u,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.file,n=t.meta,r={"x-amz-meta-img_width":n.width.toString(),"x-amz-meta-img_height":n.height.toString(),"x-amz-meta-tag_string":a},c="/api/s3/file/".concat(n.name),e.next=5,w.a.post(c,{aux:r});case 5:return o=e.sent,l=o.data,i=l.url,u=l.fields,s="".concat(i,"/").concat(u.key),e.abrupt("return",{fields:u,meta:{fileUrl:s},url:i});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(U.a,{getUploadParams:e,onChangeStatus:function(e,t){var a=e.meta;console.log(t,a)},onSubmit:function(e,t){console.log(e.map((function(e){return e.meta}))),t.forEach((function(e){return e.remove()}))},accept:"image/*,audio/*,video/*",inputContent:function(e,t){return t.reject?"Image, audio and video files only":"Click or Drop (multiple)"},styles:{dropzoneReject:{borderColor:"red",backgroundColor:"#DAA"},inputLabel:function(e,t){return t.reject?{color:"red"}:{}}}}))}),null))},R=function(){return r.a.createElement(O,null,r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},_=a(15),B=function(e){var t=e.form,a=Object(n.useContext)(p).dispatchUserAction,c=Object(n.useState)(!1),o=Object(s.a)(c,2),l=o[0],i=o[1],d=Object(n.useState)({password:""}),g=Object(s.a)(d,2),f=g[0],E=g[1],y=Object(n.useState)({password:""}),O=Object(s.a)(y,2),j=O[0],x=O[1],k=function(){var e=Object(b.a)(h.a.mark((function e(n){var r,c,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),i(!0),e.prev=2,r=f.password,"login"!==t){e.next=19;break}if(r){e.next=10;break}i(!1),x(Object(m.a)({},j,{password:"Field is required"})),e.next=19;break;case 10:return e.next=12,w.a.post("/api/user/login",{password:r});case 12:return c=e.sent,o=c.data,e.next=16,v(o.token);case 16:a({type:"SAVE_USER",payload:o}),window.localStorage.setItem("token",o.token),Object(u.c)("/app/gallery/");case 19:e.next=25;break;case 21:e.prev=21,e.t0=e.catch(2),x(Object(m.a)({},j,{email:e.t0.response&&e.t0.response.data&&e.t0.response.error||"Could not authenticate"})),i(!1);case 25:case"end":return e.stop()}}),e,null,[[2,21]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:k},r.a.createElement("div",{className:"input-field black-input"},r.a.createElement("span",{className:"lock-icon"}),r.a.createElement("input",{onChange:function(e){E(Object(m.a)({},f,Object(_.a)({},e.target.name,e.target.value)))},onBlur:function(e){e.target.value||x(Object(m.a)({},j,Object(_.a)({},e.target.name,"Required field")))},type:"password",placeholder:"secreto/tunnussana",name:"password"}),j.password&&r.a.createElement("span",{style:{color:"red"}},j.password)),r.a.createElement("div",{className:"center-text"},r.a.createElement("button",{type:"submit",disabled:l,className:"btn btn-rounded gradient-green"},"ENTRAR/SIS\xc4\xc4N"))))},M=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(B,{form:"login"}))},z=(a(127),a(146)),D=a(49),G=a.n(D),W=Object(z.a)({root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:48,padding:"0 30px"}});function V(){var e=W();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container center-text"},r.a.createElement("h1",null,"Galeria de los 60 de Lister en Tenerife 2020"),r.a.createElement("h1",null,"Kuvagalleria Lister 60 Tenerife 2020")),r.a.createElement(G.a,{src:i.a,alt:"Traakki"}),r.a.createElement("div",null,r.a.createElement(u.a,{className:e.root,to:"/app/login/"},"Login")))}var q=function(){return r.a.createElement(g,null,r.a.createElement(j,null,r.a.createElement(u.b,null,r.a.createElement(V,{path:"/",component:V}),r.a.createElement(I,{path:"/app/",component:I}),r.a.createElement(M,{path:"/app/login/",component:M}),r.a.createElement(F,{path:"/app/gallery/",component:F}),r.a.createElement(A,{path:"/app/gallery/upload/",component:A}),r.a.createElement(R,{default:!0,component:R}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},45:function(e,t,a){e.exports=a.p+"static/media/traakki.d2f4d2b4.jpg"},50:function(e,t,a){e.exports=a(138)},55:function(e,t,a){},79:function(e,t,a){}},[[50,1,2]]]);
//# sourceMappingURL=main.cf13c705.chunk.js.map