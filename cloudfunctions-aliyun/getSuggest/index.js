'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event.url : ', event.url)
	
	const res = await uniCloud.httpclient.request(event.url,{
		dataType: 'text'
	})
	
	return res.data;
	//返回数据给客户端
	// return new Promise((resolve, reject) => {
	// 	resolve(res.data)
	// })
};
