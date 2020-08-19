<template>
	<view class="content">
		<view class="l-body">
			<view class="" id="page_top">
				<view class="l-dl">
					<image class="l-dt" :src="book.image" mode="aspectFill"></image>
					<view class="l-dd">
						<view v-if="book.name" class="l-dd-title">
							{{book.name}}
						</view>
						<view v-if="book.user" class="l-dd-sub">
							{{book.user}}
						</view>
						<view v-if="book.desc" class="l-dd-content">
							{{book.desc}}
						</view>
						<view v-if="book.update" class="l-dd-footer">
							{{book.update}}
						</view>
					</view>
				</view>
				<view class="l-body-select">
					<view v-if="book.newName" class="l-body-tab">
						{{book.newName}}
					</view>
				</view>

				<view class="l-list">
					<view class="l-h3">
						<text class="l-h3-title">详情</text>
					</view>
					<view v-if="book.desc" class="l-list-view">
						{{book.desc}}
					</view>
				</view>
			</view>
			<view class="l-list">
				<view class="l-h3">
					<text class="l-h3-title">章节</text>
					<view class="" @click="orderChapter">
						<view class="l-h3-more" >{{ asc ? '倒序' : '正序' }}
						</view>
					</view>
				</view>
				<view class="l-list-content">
					<view class="l-list-sub-content">
						<scroll-view scroll-y style="height:100%">
							<view v-for="(item,index) in chapter" :key="index"  @tap="navtoSection(item)"> {{item.name}} </view>
						</scroll-view>
					</view>
				</view>
			</view>

		</view>

		<view class="l-body-fixed">
			<!-- <view class="l-handle-btn l-look-btn" @tap="borOpen(book.dowloadUrl)">
				TXT下载
			</view>
			<view class="l-handle-btn l-look-btn" @tap="borOpen(url)">
				官方看书
			</view> -->
			<view class="l-handle-btn l-buy-btn" @click="addToShelf()">
				加入书架
			</view>
			<view class="l-handle-btn l-buy-btn" @tap="navtoSection(chapter[0])">
				开始阅读
			</view>
		</view>
		
	</view>
</template>

<script>
	import { getBookShelf, setBookShelf } from '@/common/book.js'
	export default {
		data() {
			return {
				book:{},
				chapter:[],
				url:'',
				pageHeight:0,
				asc: true,
			}
		},
		onLoad(param) {
			this.url = param.url
			// uni.setNavigationBarTitle({
			// 	title: param.name
			// })
			
			const cheerio = require('cheerio')
			var this_ = this
			this.getRequest({
				url: param.url,
				success: function(res){
					const $ = cheerio.load(res)
					this_.book = {
						name: $('#maininfo').find('h1').text(),
						user: $('#info').find('p').eq(0).text(),
						desc: $('#intro').find('p').text(),
						update: $('#maininfo').find('p').eq(2).text(),
						newName: '最新章节：' + $('#info').find('p').eq(3).find('a').text(),
						// 最新章节
						newUrl: this_.$bookUrl + $('#info').find('p').eq(3).find('a').attr('href'),
						image: $("#fmimg").find("img").attr('src'),
					}
					$('#list').find('dd').each(function(i, elem) {
						this_.chapter.push({
							name: $(this).find('a').text(),
							url: this_.$bookUrl + $(this).find('a').attr('href')
						})
					})
				}
			})
		},
		
		methods: {
			borOpen(url){
				plus.runtime.openURL(url, function(res) {
				});  
			},
			navtoComment() {
				uni.navigateTo({
					url: `/pages/comment/comment`
				})
			},
			navtoSection(data) {
				uni.navigateTo({
					url: `/pages/section/section?url=` + data.url + `&title=` + data.name + `&name=` + this.book.name + `&image=` + this.book.image
				})
			},
			orderChapter(){
				this.asc = !this.asc
				this.chapter.reverse()
			},
			addToShelf(){
				setBookShelf(this.book.name, this.chapter[0].url, this.book.image, '', 1);
			}
		}
	}
</script>

<style>
	.l-list-sub-content{
		line-height: 55rpx;
	}
	.back{
		width: 40rpx;
		height: 40rpx;
	}
	.l-body-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 98rpx;
		display: flex;
		width: calc(100% - var(--pad-lr) - var(--pad-lr));
		padding: 0 var(--pad-lr);
		align-items: center;
		white-space: nowrap;
		background-color: #FFFFFF;
		justify-content: space-between;
		border-top: 1rpx solid #efefef;
	}

	.l-look-btn {
		width: 30%;
		background-color: var(--c-txt-2);
	}

	.l-buy-btn {
		width: 40%;
		background-color: #FFFFFF;
	}

	.l-handle-btn {
		font-size: 30rpx;
		display: flex;
		border-radius: 40rpx;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		margin: 10rpx;
	}

	.l-dl {
		/* margin-top: 32rpx; */
		display: flex;
		width: 100%;
		height: 320rpx;
	}

	.l-dt {
		width: 216rpx;
		height: 100%;
		border-radius: 6rpx;
		margin-right: 24rpx;
	}

	.l-dd {
		flex: 1;
		display: flex;
		padding-bottom: 12rpx;
		flex-direction: column;
		justify-content: space-between;
	}

	.l-dd-title {
		font: bold var(--f-size-5) normal;
	}

	.l-dd-sub {
		color: var(--c-txt-2);
		font: var(--f-size-2)/var(--f-size-4) normal;
	}

	.l-dd-content {
		width: 100%;
		color: #868DAB;
		font: 26rpx normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.l-dd-footer {
		display: flex;
		align-items: center;
	}

	.l-dd-view-footer {
		width: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
	}

	.l-dd-img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 6rpx;
	}

	.l-icon-star {
		width: 30rpx;
		height: 28rpx;
		margin-right: 4rpx;
	}

	.l-dd-grade {
		color: #F9174D;
		margin-left: 28rpx;
		font-size: var(--f-size-5);
	}

	.l-icon-share {
		margin-right: 18rpx;
	}

	.l-icon-share-1 {
		width: 29rpx;
		height: 28rpx;
	}

	.l-icon-share-2 {
		width: 25rpx;
		height: 27rpx;
	}

	.l-icon-share-3 {
		width: 27rpx;
		height: 22rpx;
	}

	.l-icon-share-4 {
		width: 30rpx;
		height: 24rpx;
	}

	.l-body-tab,
	.l-body-select {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-body-tab {
		padding: 40rpx 0 12rpx;
	}

	.l-list {
		padding-top: 40rpx;
	}

	.l-h3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-h3-title {
		font: bold var(--f-size-4) normal;
	}

	.l-h3-more {
		display: flex;
		align-items: center;
		color: var(--c-bg-2);
	}

	/* list */

	.l-list-view {
		padding-top: 40rpx;
		color: var(--c-bg-2);
		line-height: 40rpx;
	}

	.l-icon-like,
	.l-icon-star-blank {
		width: 22rpx;
		height: 20rpx;
		margin-right: 4rpx;
	}

	.l-icon-like {
		margin-right: 12rpx;
	}

	.l-list-content {
		background-color: rgba(245, 247, 249, 0.2);
		border-radius: 16rpx;
		padding: 35rpx 32rpx;
		margin-top: 32rpx;
	}

	.l-list-c-foot-l-name {
		margin-right: 20rpx;
	}

	.l-list-c-head {
		font-size: var(--f-size-3);
		padding-bottom: 25rpx;
	}

	.l-list-c-body {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		color: var(--c-txt-2);
		font-size: var(--f-size-1);
		margin-bottom: 35rpx;
	}

	.l-list-c-foot {
		color: var(--c-txt-2);
		font-size: var(--f-size-1);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}


	/* share */

	.l-share {
		position: fixed;
		bottom: 0;
		left: 0;
		width: calc(100% - var(--pad-lr) - var(--pad-lr));
		padding: 32rpx var(--pad-lr);
		z-index: 999;
		background-color: #080932;
	}

	.l-icon-share-list {
		width: 130rpx;
		height: 130rpx;
	}

	.l-share-img {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.l-close {
		text-align: right;
		margin-bottom: 27rpx;
	}

	.l-share-btn {
		padding: 56rpx 70rpx 0;
	}

	.l-share-botton {
		border-radius: 40rpx;
	}
</style>
