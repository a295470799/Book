(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/detail/detail"],{"0a54":function(t,n,e){"use strict";(function(t){e("21dd");i(e("66fd"));var n=i(e("3c82"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"19ee":function(t,n,e){"use strict";var i,a=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}))},"3c82":function(t,n,e){"use strict";e.r(n);var i=e("19ee"),a=e("647c");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("ffd61");var u,r=e("f0c5"),c=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);n["default"]=c.exports},5095:function(t,n,e){},"647c":function(t,n,e){"use strict";e.r(n);var i=e("c30a"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},c30a:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{book:{},chapter:[],url:"",pageHeight:0,asc:!0}},onLoad:function(n){this.url=n.url;var i=e("f76d"),a=this;this.getRequest({url:n.url,success:function(n){var e=i.load(n);a.book={name:e("#maininfo").find("h1").text(),user:e("#info").find("p").eq(0).text(),desc:e("#intro").find("p").text(),update:e("#maininfo").find("p").eq(2).text(),newName:"最新章节："+e("#info").find("p").eq(3).find("a").text(),newUrl:a.$bookUrl+e("#info").find("p").eq(3).find("a").attr("href"),image:e("#fmimg").find("img").attr("src")},e("#list").find("dd").each((function(t,n){a.chapter.push({name:e(this).find("a").text(),url:a.$bookUrl+e(this).find("a").attr("href")})})),t.setStorageSync("book",a.book)}})},methods:{borOpen:function(t){plus.runtime.openURL(t,(function(t){}))},navtoComment:function(){t.navigateTo({url:"/pages/comment/comment"})},navtoSection:function(n){t.navigateTo({url:"/pages/section/section?url="+n.url+"&title="+n.name})},orderChapter:function(){this.asc=!this.asc,this.zhangjie.reverse()}}};n.default=i}).call(this,e("543d")["default"])},ffd61:function(t,n,e){"use strict";var i=e("5095"),a=e.n(i);a.a}},[["0a54","common/runtime","common/vendor"]]]);