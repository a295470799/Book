import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$toast = function(title){
	uni.showToast({
		title:`您点了` + title,
		icon:'none'
	})
}


Vue.prototype.getHtml = function(param){
	uni.showLoading();
	uni.request({
	    url: param.url,
		sslVerify: false,
	    success: res => {
			typeof param.success == "function" && param.success(res.data);
	    },
	    fail: (e) => {
	        typeof param.fail == "function" && param.fail(e);
	    }, 
	    complete: () => {
			uni.hideLoading();
			typeof param.complete == "function" && param.complete();
		}
	});
}

Vue.prototype.getRequest = function(param){
	uni.request({
	    url: param.url,
		type: param.type,
		sslVerify: false,
	    success: res => {
			typeof param.success == "function" && param.success(res.data);
	    },
	    fail: (e) => {
	        typeof param.fail == "function" && param.fail(e);
	    }, 
	    complete: () => {
			typeof param.complete == "function" && param.complete();
		}
	});
}


// Vue.prototype.$bookUrl = 'http://www.biquge.info'
Vue.prototype.$bookUrl = 'http://www.xbiquge.la'
Vue.prototype.$searchUrl = 'http://unionsug.baidu.com/su?wd='
Vue.prototype.$hot = ['武神主宰','斗罗大陆','庆余年','圣墟','斗罗大陆4终极斗罗','大主宰','剑道第一仙']

const app = new Vue({
    ...App
})
app.$mount()
