<template>
	<view class="content">
		<!-- l-head -->
		<!-- #ifndef MP-WEIXIN -->
			<view class="l-status"></view>
			<!-- #endif -->
		<view class="l-head">
			<view class="l-search" >
				<image class="l-icon-search" src="../../static/l-icon-search.png" mode=""></image>
				<input type="text" class="l-search-input"  placeholder-class="l-holder" v-model="queryName"/>
			</view>
			<button class="l-nav-bookrack" @tap="query">搜索</button>
		</view>
		<view class="l-view">
			<view class="l-h3">
				<text class="l-h3-title">搜索结果</text>
			</view>
			<view class="l-dl" v-for="(s,i) in books" :key="i" @tap="navtoDetail(s)">
				<image class="l-dt" :src="s.image" mode="aspectFill"></image>
				<view class="l-dd">
					<view class="l-dd-title">
						{{s.name}}
					</view>
					<view class="l-dd-content">
						{{s.desc}}
					</view>
					<view class="l-dd-footer">
						{{s.user}}
					</view>
				</view>
			</view>
			<view class="l-dl" v-if="books.lenght == 0">
				<view class="l-dd">
					暂无结果
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
				img: `../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`,
				bookimg: `../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`,
				queryName:'',
				cover: `../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`,
				books:[],
			}
		},
		onLoad() {

		},
		methods: {
			query() {
				const cheerio = require('cheerio')
				var this_ = this
				this.getHtml({
					url: 'https://www.280xs.com/searchbook.php?search_key=' + this_.queryName,
					
					success: function(res){
						var list = [];
						const $ = cheerio.load(res)
						var data = $('#BookList li');
						data.each(function(i, elem) {
						   list.push({
								name: $(this).find('strong a').text(),
								url: this_.$bookUrl +  $(this).find('strong a').attr('href'),
								user: $(this).find('.name span').eq(1).text(),
								desc: $(this).find('p').text(),
								image: $(this).find('img').attr('src'),
								new: $(this).find('dt a').text()
							}) 
						});
						this_.books = list;
					}
				})
			},
			navtoDetail(url) {
				uni.navigateTo({
					url: `/pages/detail/detail?url=` + url.url + '&name=' + url.name + '&image=' + url.image
				})
			}
		}
	}
</script>

<style>
	/* l-body-tab */
	.l-body-tab {
		display: flex;
		margin: 20rpx 0 0;
		align-items: center;
		white-space: nowrap;
		justify-content: space-around;
	}

	.l-tab-item-img {
		margin-bottom: 10rpx;
	}

	.l-tab-item-img-3,
	.l-tab-item-img-1 {
		width: 60rpx;
		height: 58rpx;
	}

	.l-tab-item-img-2 {
		width: 52rpx;
		height: 56rpx;
	}

	.l-tab-item-img-4 {
		width: 54rpx;
		height: 54rpx;
	}

	.l-tab-item-value {
		text-align: center;
		font-size: 26rpx;
		color: var(--c-txt-2);
	}

	/* l-view */

	.l-view {
		padding: 40rpx var(--pad-lr);
		border-bottom: 1rpx solid #222337;
	}

	.l-view-not-border {
		padding-bottom: 0;
		border-bottom: none;
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

	.l-icon-refresh {
		width: 33rpx;
		height: 25rpx;
		margin-left: 12rpx;
	}

	.l-icon-dot {
		width: 30rpx;
		margin-top: 10rpx;
	}

	.l-dl {
		margin-top: 32rpx;
		display: flex;
		width: 100%;
		height: 224rpx;
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
		color: var(--c-txt-3);
		font: var(--f-size-3) normal;
	}

	.l-dd-content,
	.l-dd-footer {
		color: var(--c-txt-2);
		font: var(--f-size-2)/var(--f-size-4) normal;
	}

	.l-dd-view-footer,
	.l-dd-content {
		width: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.l-dd-view-footer {
		color: #868DAB;
		font-size: var(--f-size-1);
		-webkit-line-clamp: 2;
	}

	.l-dd-content {
		-webkit-line-clamp: 3;
	}

	.l-dd-footer {
		display: flex;
		align-items: center;
	}

	.l-dd-img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 6rpx;
	}


	/* l-dl-view */

	.l-dl-view {
		position: relative;
		height: 282rpx;
		margin-top: 32rpx;
	}

	.l-dl-bg {
		height: 250rpx;
		background: rgba(34, 35, 55, 1);
		box-shadow: 0px 30px 60px 0px rgba(17, 21, 26, 0.1);
		border-radius: 20rpx;
		position: absolute;
		top: 32rpx;
		left: 0;
		width: 100%;
	}

	.l-dl-content {
		position: relative;
		z-index: 1;
		display: flex;
		padding: 0 48rpx;
	}

	.l-dt-view {
		width: 168rpx;
		height: 250rpx;
		border-radius: 10rpx;
		margin-right: 30rpx;
	}

	.l-dd-view {
		width: calc(100% - 198rpx);
		padding: 62rpx 0 14rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.l-dd-view-content {
		display: flex;
		justify-content: space-between;
	}

	.l-dd-view-title {
		width: calc(100% - 62rpx);
		border-bottom: 1rpx solid #5D637C;
	}

	.l-dd-view-ta,
	.l-dd-view-tb {
		width: 100%;
		overflow: hidden;
		white-space: normal;
		text-overflow: ellipsis;
	}

	.l-dd-view-ta {
		font: bold var(--f-size-3) normal;
	}

	.l-dd-view-tb {
		color: #5D637C;
		padding: 14rpx 0 25rpx;
		font-size: var(--f-size-1);
	}

	/* l-classify */

	.l-list-classify {
		padding: 32rpx 0 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.l-list-item {
		width: 330rpx;
		height: 160rpx;
		background-color: #F5F7F9;
		border-radius: 16rpx;
		margin-bottom: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.l-item_view {
		width: calc(100% - 64rpx);
		height: 122rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-item__value-title {
		font-size: var(--f-size-2);
		color: #2B3133;
		margin-bottom: 12rpx;
	}

	.l-item__value-sub {
		font-size: var(--f-size-1);
		color: #95A1A6;
	}

	.l-img-classify {
		width: 98rpx;
		height: 100%;
	}
</style>
