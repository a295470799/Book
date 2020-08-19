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
export const getAgent = () => {
	var agents = [
		'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, likeGecko) Chrome/37.0.2062.124 Safari/537.36',
		'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2',
		'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36',
		'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0',
		'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E; rv:11.0) like Gecko',
		'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
	]
	let $rand_key = Math.floor(Math.random() * 10)
	return agents[$rand_key];
	
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