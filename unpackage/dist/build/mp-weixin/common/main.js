(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"318a":function(t,e,n){},7041:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=o},"796a":function(t,e,n){"use strict";(function(t,e){n("21dd");var o=u(n("66fd")),r=u(n("cab9"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}o.default.config.productionTip=!1,r.default.mpType="app",o.default.prototype.$toast=function(e){t.showToast({title:"您点了"+e,icon:"none"})},o.default.prototype.getRequest=function(e){!e.loading&&t.showLoading(),t.request({url:e.url,sslVerify:!1,success:function(t){"function"==typeof e.success&&e.success(t.data)},fail:function(t){"function"==typeof e.fail&&e.fail(t)},complete:function(){!e.loading&&t.hideLoading(),"function"==typeof e.complete&&e.complete()}})},o.default.prototype.$bookUrl="http://www.xbiquge.la",o.default.prototype.$searchUrl="http://unionsug.baidu.com/su?wd=",o.default.prototype.$hot=["斗破苍穹","庆余年","圣墟","斗罗大陆4终极斗罗","大主宰","剑道第一仙"];var f=new o.default(a({},r.default));e(f).$mount()}).call(this,n("543d")["default"],n("543d")["createApp"])},"8cf9":function(t,e,n){"use strict";n.r(e);var o=n("7041"),r=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=r.a},b4da:function(t,e,n){"use strict";var o=n("318a"),r=n.n(o);r.a},cab9:function(t,e,n){"use strict";n.r(e);var o=n("8cf9");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("b4da");var u,c,a,i,f=n("f0c5"),l=Object(f["a"])(o["default"],u,c,!1,null,null,null,!1,a,i);e["default"]=l.exports}},[["796a","common/runtime","common/vendor"]]]);