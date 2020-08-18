const cheerio = require('cheerio');

export const getDetail = (url) => {
	return new Promise((res,rej) => {
		uni.request({
			url: url,
			success(data) {
				const cheerio = require('cheerio')
				const $ = cheerio.load(data.data)
				const book = {
					desc: $('#intro').find('p').text(),
					image: $("#fmimg").find("img").attr('src'),
				}
				res(book)
			},
			fail() {
				rej()
			}
		})
	})
}