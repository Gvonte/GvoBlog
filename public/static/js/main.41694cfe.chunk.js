(this.webpackJsonptest=this.webpackJsonptest||[]).push([[4],{131:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),i=n(18),u=n(33),l=n(12),s=n(62),d=n(41),f=n(59),g=n(46),p=n(60),h=n(58),y=Object(l.d)(Object(l.c)({user:d.a,advertise:f.a,category:g.a,articleList:p.a,article:h.a}),Object(l.a)(s.a)),v=(n(79),n(42)),m=n(11),b=r.a.lazy((function(){return Promise.all([n.e(1),n.e(9),n.e(15)]).then(n.bind(null,606))})),w=r.a.lazy((function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(19)]).then(n.bind(null,599))})),E=r.a.lazy((function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(18)]).then(n.bind(null,600))}));var A=function(){return r.a.createElement("div",null,r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",{style:{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}},r.a.createElement(v.a,null))},r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/register",component:w}),r.a.createElement(m.b,{path:"/login",component:E}),r.a.createElement(m.b,{path:"/",component:b}))))},S=n(3),k=n.n(S),I=function(){k.a.defaults.baseURL="http://localhost:3000/api",k.a.interceptors.request.use((function(t){var e=JSON.parse(localStorage.getItem("user_info"));return e&&(t.headers.Authorization="Bearer "+e.token),t}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));I(),c.a.render(r.a.createElement(i.a,null,r.a.createElement(u.a,{store:y},r.a.createElement(A,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},41:function(t,e,n){"use strict";var a=n(3),r=n.n(a);n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return i})),n.d(e,"d",(function(){return u}));var o=JSON.parse(localStorage.getItem("user_info"))||{},c=function(t){return function(e){return function(t){return r.a.post("/login",t)}(t).then((function(t){var n=t.data.data;return e({type:"login",payload:n}),t}))}},i=function(){return{type:"logout"}},u=function(t){return function(){return function(t){return r.a.post("/register",t)}(t)}};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login":return localStorage.setItem("user_info",JSON.stringify(e.payload)),e.payload;case"logout":return localStorage.removeItem("user_info"),{};default:return t}}},46:function(t,e,n){"use strict";var a=n(3),r=n.n(a);n.d(e,"b",(function(){return o}));var o=function(){return function(t){return r.a.get("/category").then((function(e){return t({type:"setCategory",payload:e.data.data}),e}))}};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"setCategory":return e.payload||[];case"getCategory":default:return t}}},58:function(t,e,n){"use strict";var a=n(3),r=n.n(a);n.d(e,"b",(function(){return c}));var o={title:"",author:"",content:"",browse:"",category:"",comment:[]},c=function(t){return function(e){return function(t){return r.a.get("/article/".concat(t))}(t).then((function(t){var n=t.data.data.article,a=n.title,r=n.author,o=n.content,c=n.browse,i=n.Category.name,u=t.data.data.comment.rows;return e({type:"setArticle",payload:{title:a,author:r,content:o,browse:c,category:i,comment:u}}),t}))}};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"setArticle":return e.payload||o;case"getArticle":default:return t}}},59:function(t,e,n){"use strict";var a=n(3),r=n.n(a);n.d(e,"b",(function(){return o}));var o=function(){return function(t){r.a.get("/advertise").then((function(e){t({type:"setAdvertise",payload:e.data.data})}))}};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"setAdvertise":return e.payload||[];case"getAdvertise":default:return t}}},60:function(t,e,n){"use strict";var a=n(3),r=n.n(a);n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c}));var o=function(t,e,n){return function(a){return function(t,e,n){return n?r.a.get("/article",{params:{page:e,key:n}}):0===t?r.a.get("/article",{params:{page:e}}):r.a.get("/article",{params:{category:t,page:e}})}(t,e,n).then((function(t){return t.data.data.rows.length&&a({type:"concatArticleList",payload:t.data.data.rows}),t}))}},c=function(t){return{type:"setArticleList",payload:t}};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"concatArticleList":return t.concat(e.payload)||[];case"setArticleList":return e.payload;default:return t}}},93:function(t,e,n){t.exports=n(131)}},[[93,5,6]]]);
//# sourceMappingURL=main.41694cfe.chunk.js.map