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


Vue.prototype.$bookUrl = 'https://www.280xs.com'

const app = new Vue({
    ...App
})
app.$mount()
