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

export const setBookShelf = (bookName, user, last, chapterName, chaptUrl, image, position, type) => {
	// bookName     -- 书名
	// user         -- 作者
	// chapterName  -- 上次阅读章节名
	// chaptUrl     -- 上次阅读章节url
	// image        -- 封面图
	// position     --上次阅读位置，不设置则从头开始(暂时没用)
	// type         -- 类型 1:书架 2:历史记录
	var hislist = [...uni.getStorageSync('book_shelf')] || [];
	let shelf = {
		bookName: bookName,
		chapterName: chapterName,
		user: user,
		last: last,
		chaptUrl: chaptUrl,
		image: image,
		position: position,
		type: type != 1 ? 2 : 1,
	}
	let add = true;
	hislist.forEach((item, key) => {
		if(item.bookName == shelf.bookName){
			if(shelf.type == 2){
				item.chapterName = shelf.chapterName
				item.chaptUrl = shelf.chaptUrl
				item.position = shelf.position
			} else {
				item.type = 1
			}
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