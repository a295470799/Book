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
		'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US);',
		'Mozilla/5.0 (compatible; MSIE 10.0; Macintosh; Intel Mac OS X 10_7_3; Trident/6.0);',
		'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US);',
		'Opera/9.80 (X11; Linux i686; U; ru) Presto/2.8.131 Version/11.11;',
		'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2;',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13;',
		'Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11;',
		'Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1;',
		'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:15.0) Gecko/20100101 Firefox/15.0.1;',
		'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25;',
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