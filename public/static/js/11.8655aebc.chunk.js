(this.webpackJsonptest=this.webpackJsonptest||[]).push([[11],{200:function(e,t,a){"use strict";a(150);var n=a(136),c=(a(171),a(176)),i=a(0),r=a.n(i),o=(a(201),r.a.memo((function(e){var t=e.category,a=e.author,i=e.browse;return r.a.createElement("div",{className:"articleinfo-container"},r.a.createElement(c.a,{color:"rgb(234, 241, 255)",className:"category"},t),r.a.createElement(n.a,{type:"user",className:"icon"}),r.a.createElement("span",{className:"iconfont"},a),r.a.createElement(n.a,{type:"eye",className:"icon"}),r.a.createElement("span",{className:"iconfont"},i))})));t.a=o},201:function(e,t,a){},416:function(e,t,a){},424:function(e,t,a){},605:function(e,t,a){"use strict";a.r(t);var n=a(175),c=(a(171),a(176)),i=a(0),r=a.n(i),o=a(33),s=a(46),l=(a(416),a(79),a(42)),u=(a(596),a(587)),g=a(597),m=a(421),h=a(422),d=a(592),f=a(423),p=a(598),y=a(60),b=a(11),E=(a(424),a(425)),v=a.n(E),k=a(200),O=Object(o.b)((function(e){return{articleList:e.articleList}}),{getArticleList:y.b,setArticleList:y.c})(Object(b.g)(function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(f.a)(t).call(this,e))).handleInfiniteOnLoad=function(){var e=a.props,t=e.category,n=e.k,c=e.articleList,i=e.getArticleList,r=a.state.page;a.setState((function(e){return Object(g.a)({},e,{loading:!0})})),i(t,r,n).then((function(e){var t=e.data.data,n=t.rows;t.count===c.length+n.length?a.setState((function(e){return{hasMore:!1,loading:!1,page:e.page+1}})):a.setState((function(e){return{hasMore:!0,loading:!1,page:e.page+1}}))}))},a.state={hasMore:!0,loading:!1,page:1},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this,a=this.props.setArticleList;this.props.category!==e.category?(a([]),this.setState({hasMore:!0,loading:!1,page:1},(function(){t.handleInfiniteOnLoad()}))):this.props.k!==e.k&&(a([]),this.setState({hasMore:!0,loading:!1,page:1},(function(){t.handleInfiniteOnLoad()})))}},{key:"componentDidMount",value:function(){this.handleInfiniteOnLoad()}},{key:"componentWillUnmount",value:function(){(0,this.props.setArticleList)([])}},{key:"render",value:function(){var e=this.state,t=e.loading,a=e.hasMore,n=this.props,c=n.articleList,i=n.history;return r.a.createElement("div",{className:"articlelist-container"},r.a.createElement(v.a,{initialLoad:!1,pageStart:0,loadMore:this.handleInfiniteOnLoad,hasMore:!t&&a,useWindow:!0},r.a.createElement(u.a,{dataSource:c,size:"large",itemLayout:"vertical",renderItem:function(e){return r.a.createElement(u.a.Item,{key:e.id,className:"article-list-item",onClick:function(){i.push("/article/".concat(e.id))}},r.a.createElement("img",{src:e.cover,alt:""}),r.a.createElement("h1",null,e.title),r.a.createElement("p",null,e.description),r.a.createElement(k.a,{category:e.Category.name,author:e.author,browse:e.browse}))}},t&&a&&r.a.createElement("div",{className:"demo-loading-container"},r.a.createElement(l.a,null)))))}}]),t}(i.Component))),L=c.a.CheckableTag,N=Object(o.b)((function(e){return{tags:e.category}}),{getCategory:s.b})((function(e){var t=e.tags,a=e.getCategory,c=e.location,o=e.history,s=/key=(.+)/.exec(c.search);s&&(s=s[1]);var l=/category=(\d+)/.exec(c.search);l=l?Number(l[1]):0;var u=Object(i.useState)([]),g=Object(n.a)(u,2),m=g[0],h=g[1];Object(i.useEffect)((function(){a().then((function(e){h(e.data.data.slice(0,8))}))}),[a]);return r.a.createElement("div",{className:"articleindex-container"},r.a.createElement("div",{className:"tag-container"},r.a.createElement(L,{key:0,className:"tag",checked:0===l,onChange:function(){o.push("/article")}},"\u5168\u90e8"),m.map((function(e){return r.a.createElement(L,{key:e.id,className:"tag",checked:e.id===l,onChange:function(){o.push("/article?category=".concat(e.id))}},e.name)})),0===t.length?"":t.length!==m.length?r.a.createElement(L,{key:-1,className:["extend","tag"],onChange:function(){h(t)}},"\u5c55\u5f00"):r.a.createElement(L,{key:-2,className:["reduce","tag"],onChange:function(){h(t.slice(0,8))}},"\u6536\u8d77")),r.a.createElement(O,{category:l,k:s}))}));t.default=N}}]);
//# sourceMappingURL=11.8655aebc.chunk.js.map