import Vue from 'vue'
import App from './App'
import { getIp } from '@/common/ip.js';

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$toast = function(title){
	uni.showToast({
		title:`您点了` + title,
		icon:'none'
	})
}


Vue.prototype.getRequest = function(param){
	!param.loading && uni.showLoading();
	var ip = getIp();
	uni.request({
	    url: param.url,
		sslVerify: false,
		header:{
			'CLIENT-IP': ip,
			'X-FORWARDED-FOR': ip
		},
	    success: res => {
			typeof param.success == "function" && param.success(res.data);
	    },
	    fail: (e) => {
	        typeof param.fail == "function" && param.fail(e);
	    }, 
	    complete: () => {
			!param.loading && uni.hideLoading();
			typeof param.complete == "function" && param.complete();
		}
	});
}

// Vue.prototype.$bookUrl = 'http://www.biquge.info'
Vue.prototype.$bookUrl = 'http://www.xbiquge.la'
Vue.prototype.$searchUrl = 'http://unionsug.baidu.com/su?wd='
Vue.prototype.$hot = ['斗破苍穹','庆余年','圣墟','斗罗大陆4终极斗罗','大主宰','剑道第一仙']

const app = new Vue({
    ...App
})
app.$mount()
