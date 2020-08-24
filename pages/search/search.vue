<template>
	<view class="content">
		<view class="l-head">
			<!-- #ifdef !MP-WEIXIN -->
			<!-- <view class="l-search-back iconfont" @tap="goBack">&#xe607;</view> -->
			<!-- #endif -->
			
			<view class="l-search">
				<input confirm-type="search" @confirm="confirm" @input="getSearch" type="text" :value="value" class="l-search-input" placeholder="斗罗大陆" placeholder-class="l-holder" />
				<view class="clear" @tap="clearInput">
					<text class="iconfont">&#xe710;</text>
				</view>
			</view>
		</view>
		<view class="l-search-other">
			<view class="l-search-hot">
				<text class="l-search-hot-name">热门</text>
				<view class="l-search-hot-value">
					<view class="l-search-item" v-for="(item,index) in hotList" :key="index" @tap="searchKey(item)">
						{{item}}
					</view>
				</view>
			</view>
			<view class="l-search-history">
				<view class="l-search-history-outer">
					<text class="l-search-history-name">搜索历史</text>
					<view class="iconfont" @tap="clearAll">&#xe637;</view>
				</view>
				<view class="l-search-history-value">
					<view class="l-search-item" v-for="(item,index) in historyList" :key="index" @tap="searchKey(item)">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="bookList.length" class="l-search-content">
			<view class="l-search-item" v-for="(item,index) in bookList" :key="index" @tap="navtoDetail(item)">
				<view class="search-name">
					{{item.name}}
				</view>
				<view class="search-user">
					{{item.user}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { localStorage } from '../../js_sdk/mp-storage/mp-storage/index.js'
	export default {
		props: {
			id: {
			    type: String,
			    default: 'inputValue'
			},
		    initValue: {
		        type: String,
		        default: ''
		    }
		},
		data() {
			return {
				bookList: [],
				hotList: [],
				historyList: [],
				value: '',
				noData: '我Giao，啥也没搜到~~~',
			}
		},
		onLoad(){
			
			this.hotList = this.$hot;
			
			let his = localStorage.getItem('search_history'); 
			this.historyList = his && his.split(',')
			
			this.value = this.initValue
			this.$emit('inputValue', {
			    id: this.id,
			    value: this.initValue
			})
		},
		methods: {
			goBack(){
				uni.navigateBack({});
			},
			getSearch(event){
				this.value = event.detail.value
				this.$emit('inputValue', {
				    id: this.id,
				    value: event.detail.value
				})
				var this_ = this
				if(!this_.value){
					this_.bookList = [];
				}
			},
			confirm(e){
				this.searchKey(e.detail.value)
			},
			searchKey(item){
				this.value = item
				this.$emit('inputValue', {
				    id: this.id,
				    value: item
				})
				
				if(item){
					const historys = this.historyList || []
					historys.indexOf(item) == -1 && historys.push(item)
					localStorage.setItem('search_history', historys)
				}
				
				const cheerio = require('cheerio')
				this.getRequest({
					url: this.$bookUrl + '/modules/article/waps.php?searchkey=' + item,
					success: res => {
						let list = [];
						const $ = cheerio.load(res)
						let data = $('.grid tr');
						data.each(function(i, elem) {
							let name = $(this).find('td').eq(0).text()
							if(name){
								list.push({
									name: name,
									user: $(this).find('td').eq(2).text(),
									update: $(this).find('td').eq(3).text(),
									url: $(this).find('td').eq(0).find('a').attr('href'),
								})
							}
						});
						if(list.length == 0){
							this.bookList = [{
								name: this.noData,
								user: ''
							}]
						} else {
							this.bookList = list;
						}
					}
				})
			},
			navtoDetail(url) {
				if(url.name != this.noData){
					uni.navigateTo({
						url: `/pages/detail/detail?url=` + url.url + '&name=' + url.name
					})
				}
			},
			clearAll(){
				this.historyList = []
				localStorage.clear()
			},
			clearInput(){
				this.value = ''
				this.$emit('inputValue', {
				    id: this.id,
				    value: this.value
				})
				this.bookList = [];
			}
		}
	}
</script>

<style>
	@font-face {
	  font-family: 'iconfont';  /* project id 2007537 */
	  src: url('//at.alicdn.com/t/font_2007537_eese0nxlmsu.eot');
	  src: url('//at.alicdn.com/t/font_2007537_eese0nxlmsu.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_2007537_eese0nxlmsu.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_2007537_eese0nxlmsu.woff') format('woff'),
	  url('//at.alicdn.com/t/font_2007537_eese0nxlmsu.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_2007537_eese0nxlmsu.svg#iconfont') format('svg');
	}
	.iconfont{
		font-family: iconfont;
		font-size: 22rpx;
	}
	.l-head,
	.l-search-other,
	.l-search-content{
		padding: 0 5%;
		box-sizing: border-box;

	}
	.l-head{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		padding: 0 5%;
		z-index: 10;
	}
	.content{
		position: relative;
	}
	.clear{
		color: #bfbfbf;
		width: 50rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.l-search-back{
		font-size: 40rpx;
		margin-right: 30rpx;
		font-weight: bold;
	}
	.l-search-other{
		padding-top: 80rpx;
	}
	.l-search-hot,
	.l-search-history{
		margin-top: 60rpx;
	}
	.l-search-hot-value,
	.l-search-history-value{
		display: flex;
		flex-wrap: wrap;
	}
	.l-search-hot-value>view,
	.l-search-history-value>view{
		margin:20rpx 30rpx 0 0;
		background-color: #f0f0f0;
		padding: 10rpx 20rpx;
		border-radius: 40rpx;
		font-size: 20rpx;	
	}
	.l-search-history-outer{
		display: flex;
		justify-content: space-between;
		padding-right: 40rpx;
	}
	.l-search-content{
		position: absolute;
		width: 100%;
		min-height: 100%;
		top: 88rpx;
		background-color: #FFFFFF;
	}
	.l-search-content .l-search-item{
		display: flex;
		padding: 0 10rpx;
		justify-content: space-between;
		border-bottom: 1px solid #DCDCDC;
		width: 90%;
		margin: 10rpx auto;
	}
	.l-search-content .l-search-item>view{
		height: 80rpx;
		line-height: 80rpx;
	}
	.l-search-result{
		position: absolute;
		top: 180rpx;
		width: 100%;
		height: 10000%;
		z-index: 1;
		background-color: #FFFFFF;
	}
	.l-search-result>view{
		padding-left: 10rpx;
		line-height: 80rpx;
		border-bottom: 1rpx solid #dcdcdc;
	}
	
	.l-nav-bookrack {
		font-size: 26rpx;
		background: 0;
		font-weight: 500;
		color: #555555;
	}
	
	.l-list-sub-content{
		line-height: 55rpx;
	}
	.back{
		width: 40rpx;
		height: 40rpx;
	}
</style>
