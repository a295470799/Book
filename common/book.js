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

export const getChapter = (url, res, host) => {
	const cheerio = require('cheerio')
	const chapter = [];
	if(res){
		let $ = cheerio.load(res)
		$('#list').find('dd').each(function(i, elem) {
			chapter.push({
				name: $(this).find('a').text(),
				url: host + $(this).find('a').attr('href')
			})
		})
		return chapter
	} else {
		return new Promise((res,rej) => {
			uni.request({
				url: url,
				success(data) {
					let $ = cheerio.load(data.data)
					
					$('#list').find('dd').each(function(i, elem) {
						chapter.push({
							name: $(this).find('a').text(),
							url: host + $(this).find('a').attr('href')
						})
					})
					res(chapter)
				},
				fail() {
					rej()
				}
			})
		})
	}
}

export const setBookShelf = (name, url, image, position, type) => {
	// name     -- 书名
	// url      -- 上次阅读章节url
	// image    -- 封面图
	// position --上次阅读位置，不设置则从头开始
	// type     -- 类型 1:书架 2:历史记录
	var hislist = [...uni.getStorageSync('book_shelf')] || [];
	let shelf = {
		name: name,
		url: url,
		image: image,
		position: position,
		type: type != 1 ? 2 : 1,
	}
	let add = true;
	hislist.forEach((item, key) => {
		if(item.name == shelf.name){
			add = false
		}
	})
	add && hislist.push(shelf)
	
	uni.setStorageSync('book_shelf', hislist)
	if(type == 1){
		uni.showToast({
			title: '添加成功',
			icon: 'success'
		})
	}
}

export const getBookShelf = () => {
	let shelf = [...uni.getStorageSync('book_shelf')] || [];
	return shelf;
}