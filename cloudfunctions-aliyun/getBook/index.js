'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	// //返回数据给客户端
	// return event
	const res = await uniCloud.httpclient.request(event.url, {
	    method: 'GET',
	})
	return res;
};
