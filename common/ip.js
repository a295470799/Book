const getRandom = (arr) => {
	return Math.floor(Math.random() * (arr[1] - arr[0]+1)) + arr[0];
}
const long2ip = (proper_address) => {
	var output = false;
	if (!isNaN(proper_address)) {
		output = ((proper_address>>24) & 0xff) + '.' +((proper_address>>16) & 0xff) + '.' +((proper_address>>8) & 0xff) + '.' +(proper_address & 0xff);
	}
	return output;
}
export const getIp = () => {
	let $ip_long = [
		[607649792,608174079],
		[1038614528,1039007743],
		[1783627776,1784676351],
		[2035023872,2035154943],
		[2078801920,2079064063],
		[-1950089216,-1948778497],
		[-1425539072,-1425014785],
		[-1236271104,-1235419137],
		[-770113536,-768606209],
		[-569376768,-564133889],
	]
	
	let $rand_key = Math.floor(Math.random() * 10)
	return long2ip(getRandom($ip_long[$rand_key]));
}