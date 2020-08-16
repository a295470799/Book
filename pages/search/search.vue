<template>
	<view class="content">
		<view class="l-head">
			<view class="l-search-back iconfont" @click="goBack">&#xe607;</view>
			<view class="l-search">
				<input confirm-type="search" @confirm="confirm" @input="getSearch" type="text" :value="value" class="l-search-input" placeholder="斗罗大陆" placeholder-class="l-holder" />
				<view class="clear iconfont" @click="clearInput">&#xe710;</view>
			</view>
		</view>
		<!-- <view v-if="searchList.length" class="l-search-result">
			<view v-for="(item,index) in searchList" :key="index"  @tap="searchKey(item)">{{item}}</view>
		</view> -->
		<view class="l-search-other">
			<view class="l-search-hot">
				<view class="l-search-hot-name">热门</view>
				<view class="l-search-hot-value">
					<view class="l-search-item" v-for="(item,index) in $hot" :key="index" @tap="searchKey(item)">
						{{item}}
					</view>
				</view>
			</view>
			<view class="l-search-history">
				<view class="l-search-history-outer">
					<view class="l-search-history-name">搜索历史</view>
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
				<view style="width: 40%;">
					{{item.name}}
				</view>
				<view style="width: 30%;">
					{{item.user}}
				</view>
				<view>
					{{item.update}}
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
				// searchList: [],
				historyList: [],
				value: '',
			}
		},
		onLoad(){
			// var this_ = this;
			// window.fn = function(e){
			// 	this_.searchList = e.s
			// };
			
			
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
					// this_.searchList = [];
				}
				
				// this.getRequest({
				// 	url: this_.$searchUrl + encodeURI(this_.value),
				// 	type: "GET",
				// 	success: function(res){
				// 		new Function(`return ${res}`);
				// 	}
				// })
			},
			confirm(e){
				let searchVal = e.detail.value;
				if(searchVal){
					this.searchKey(searchVal)
					const historys = this.historyList || []
					historys.indexOf(searchVal) == -1 && historys.push(searchVal)
					localStorage.setItem('search_history', historys)
				}
			},
			searchKey(item){
				var this_ = this
				const cheerio = require('cheerio')
				this.getHtml({
					url: this_.$bookUrl + '/modules/article/waps.php?searchkey=' + item,
					success: function(res){
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
						this_.bookList = list;
						// this_.searchList = [];
					}
				})
			},
			navtoDetail(url) {
				uni.navigateTo({
					url: `/pages/detail/detail?url=` + url.url + '&name=' + url.name
				})
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
				this.searchList = [];
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
	.content{
		position: relative;
	}
	.clear{
		color: #bfbfbf;
	}
	.l-search-back{
		font-size: 40rpx;
		margin-right: 30rpx;
		font-weight: bold;
	}
	.l-search-hot,
	.l-search-history{
		margin-top: 60rpx;
		padding-left: 40rpx;
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
		position: fixed;
		width: 100%;
		height: 10000%;
		top: 0;
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
