(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{"1a95":function(t,e,i){},2084:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("17c9"),n={props:{id:{type:String,default:"inputValue"},initValue:{type:String,default:""}},data:function(){return{bookList:[],hotList:[],historyList:[],value:"",noData:"我Giao，啥也没搜到~~~"}},onLoad:function(){this.hotList=this.$hot;var t=a.localStorage.getItem("search_history");this.historyList=t&&t.split(","),this.value=this.initValue,this.$emit("inputValue",{id:this.id,value:this.initValue})},methods:{goBack:function(){t.navigateBack({})},getSearch:function(t){this.value=t.detail.value,this.$emit("inputValue",{id:this.id,value:t.detail.value});var e=this;e.value||(e.bookList=[])},confirm:function(t){this.searchKey(t.detail.value)},searchKey:function(t){var e=this;if(this.value=t,this.$emit("inputValue",{id:this.id,value:t}),t){var n=this.historyList||[];-1==n.indexOf(t)&&n.push(t),a.localStorage.setItem("search_history",n)}var u=i("f76d");this.getRequest({url:this.$bookUrl+"/modules/article/waps.php?searchkey="+t,success:function(t){var i=[],a=u.load(t),n=a(".grid tr");n.each((function(t,e){var n=a(this).find("td").eq(0).text();n&&i.push({name:n,user:a(this).find("td").eq(2).text(),update:a(this).find("td").eq(3).text(),url:a(this).find("td").eq(0).find("a").attr("href")})})),0==i.length?e.bookList=[{name:e.noData,user:""}]:e.bookList=i}})},navtoDetail:function(e){e.name!=this.noData&&t.navigateTo({url:"/pages/detail/detail?url="+e.url+"&name="+e.name})},clearAll:function(){this.historyList=[],a.localStorage.clear()},clearInput:function(){this.value="",this.$emit("inputValue",{id:this.id,value:this.value}),this.bookList=[]}}};e.default=n}).call(this,i("543d")["default"])},"71bf":function(t,e,i){"use strict";(function(t){i("21dd");a(i("66fd"));var e=a(i("a15e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},8634:function(t,e,i){"use strict";var a=i("1a95"),n=i.n(a);n.a},"8abb":function(t,e,i){"use strict";i.r(e);var a=i("2084"),n=i.n(a);for(var u in a)"default"!==u&&function(t){i.d(e,t,(function(){return a[t]}))}(u);e["default"]=n.a},a15e:function(t,e,i){"use strict";i.r(e);var a=i("ea1c"),n=i("8abb");for(var u in n)"default"!==u&&function(t){i.d(e,t,(function(){return n[t]}))}(u);i("8634");var s,o=i("f0c5"),r=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=r.exports},ea1c:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement;t._self._c},u=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return u})),i.d(e,"a",(function(){return a}))}},[["71bf","common/runtime","common/vendor"]]]);