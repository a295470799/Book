<template>
	<view class="content">
		<view class="l-fixed">
			<!-- #ifndef MP-WEIXIN -->
			<view class="l-status"></view>
			<!-- #endif -->

			<!-- l-head -->

			<view class="l-head">
				<view class="l-search" @tap="navtoSearch">
					<image class="l-icon-search" src="../../static/l-icon-search.png" mode=""></image>
					<input type="text" class="l-search-input" disabled="" value="" placeholder="斗罗大陆" placeholder-class="l-holder" />
				</view>
				<button class="l-nav-bookrack" @tap="navto">书城</button>
			</view>
		</view>

		<view class="l-placeholder"></view>

		<view class="l-body">

			<!-- l-swiper -->

			<swiper class="l-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" indicator-color="var(--c-bg-2)"
			 indicator-active-color="#1a99de" circular @click="$toast(`轮播图`)">
				<swiper-item v-for="(item, index) in imgList" :key="index">
					<view class="l-swiper-item">
						<image class="l-carousel-img" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>

			<!-- l-madin -->
			<view class="l-main">

				<view class="l-h3">
					<text class="l-h3-title">推荐</text>
				</view>

				<view class="l-dl" v-for="(item,index) in bookList" :key="index" @tap="navtoDetail(item)">
					<image class="l-dt" :src="item.image" mode="aspectFill"></image>
					<view class="l-dd">
						<view class="l-dd-title">
							{{item.name}}
						</view>
						<view class="l-dd-content">
							{{item.desc}}
						</view>
						<view class="l-dd-footer">
							{{item.user}}
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				imgList: [`../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`, `../../static/56970b801c5a69c05cb8dca97a5ebdcc.jpg`],
				bookList:[],
			}
		},

		methods: {
			navto() {
				uni.navigateTo({
					url: `/pages/book-mall/book-mall`
				})
			},
			navtoDetail(url) {
				uni.navigateTo({
					url: `/pages/detail/detail?url=` + url.url + '&name=' + url.name + '&image=' + url.image
				})
			},
			navtoSearch(){
				uni.navigateTo({
					url: `/pages/search/search`
				})
			},
			initPage(){
				const cheerio = require('cheerio')
				this.getRequest({
					url: this.$bookUrl,
					success: res => {
						var list = [];
						const $ = cheerio.load(res)
						var data = $('#hotcontent .item');
						data.each(function(i, elem) {
						   list.push({
							name: $(this).find('dl a').text(),
							url: $(this).find('dt a').attr('href'),
							user: '作者：' + $(this).find('dt span').text(),
							desc: $(this).find('dd').text(),
							image: $(this).find('img').attr('src'),
						   })
						});
						this.bookList = list
						uni.stopPullDownRefresh()
					}
				})
			},
		},
		onPullDownRefresh(){
			this.initPage();
		},
		onLoad() {
			this.initPage();
		}
	}
</script>

<style>
	/* l-head */

	.l-nav-bookrack {
		font-size: 28rpx;
		background: 0;
		font-weight: 600;
		color: #555555;
		padding-left: 15rpx;
	}
	
	/* l-main */

	.l-main {
		padding-bottom: 32rpx;
	}

	.l-h3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-h3-title {
		font: bold var(--f-size-5) normal;
	}

	.l-h3-more {
		display: flex;
		align-items: center;
		color: var(--c-bg-2);
	}

	.l-dl {
		margin-top: 40rpx;
		display: flex;
		align-items: flex-start;
		width: 100%;
		height: 210rpx;
	}

	.l-dt {
		width: 160rpx;
		height: 100%;
		border-radius: 10rpx;
		margin-right: 24rpx;
	}

	.l-dd {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.l-dd-title {
		color: var(--c-txt-1);
		font: var(--f-size-3) normal;
	}

	.l-dd-content,
	.l-dd-footer {
		color: var(--c-txt-2);
		font: var(--f-size-1)/var(--f-size-4) normal;
	}

	.l-dd-content {
		width: 100%;
		margin: 10rpx 0;
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
</style>
