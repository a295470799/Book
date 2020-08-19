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

export const setBookShelf = (name, url, image, position, type) => {
	// name     -- 书名
	// url      -- 上次阅读章节url
	// image    -- 封面图
	// position --上次阅读位置，不设置则从头开始
	// type     -- 类型 1:书架 2:历史记录
	var hislist = [...uni.getStorageSync('book_shelf')] || [];
	let item = {
		name: name,
		url: url,
		image: image,
		position: position,
		type: type != 1 ? 2 : 1,
	}
	hislist.push(item)
	const res = new Map();
	
	uni.setStorageSync('book_shelf', hislist.filter((hislist) => !res.has(hislist.name)))
	uni.showToast({
		title: '添加成功',
		icon: 'success'
	})
}

export const getBookShelf = () => {
	let item = [...uni.getStorageSync('book_shelf')] || [];
	return item;
}