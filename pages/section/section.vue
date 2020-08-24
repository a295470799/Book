<template>
	<view class="content">
		<!-- 网页背景开始 -->
		<view class="l-page-bg anmt" :style = "{ backgroundColor: pageBg }"></view>
		<view class="l-mid-area" @tap="clickArea()"></view>
		<!-- 网页背景结束 -->
		<!-- 带返回键的导航栏开始 -->
		<view class="l-top-area anmt" :style = "{ color: menuFontColor, backgroundColor: menuBg,top : show ? '0' : '-135rpx' }">
			<!-- <view :style="{ height: statusBarHeight }"></view> -->
			<view class="l-top-content">
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/back.svg" class="l-top-back" @tap="back()"></image>
				<!-- #endif -->
				<text>{{section_title}}</text>
			</view>
		</view>
		<!-- 带返回键的导航栏结束 -->
		<!-- 菜单开始 -->
		<view class="l-bottom-area anmt" :style="{ color: menuFontColor, backgroundColor: menuBg, bottom: show ? '0' : '-120rpx'} ">
			<view v-if="showSetting">
				<view class="l-bottom-light">
					<image class="reduce" src="../../static/section/sun.png"></image>
					<view class="l-bottom-flex-line">
						<slider :value="light" min="0" max="1" step="0.05" @changing="changeLight" @change="changeLight" block-size="16" />
					</view>
					<image class="plus" src="../../static/section/sun.png"></image>
				</view>
				<view class="l-bottom-setting1">
					<view class="l-bottom-flex">
						<view class="l-bottom-flex-name">字体</view>
						<view class="l-bottom-flex-line">
							<slider :value="size" min="20" max="100" @changing="changeFontSize" @change="changeFontSize"
							 :activeColor="menuFontColor" :backgroundColor="lineBg" :block-color="menuFontColor" block-size="16" />
						</view>
					</view>
					<view class="l-bottom-flex">
						<view class="l-bottom-flex-name">间距</view>
						<view class="l-bottom-flex-line">
							<slider :value="lineHeight" min="40" max="150" @changing="changeLineHeight" @change="changeLineHeight"
							 :activeColor="menuFontColor" :backgroundColor="lineBg" :block-color="menuFontColor" block-size="16" />
						</view>
					</view>
				</view>
				<view class="l-bottom-setting2">
					<view class="l-bottom-left">背景</view>
					<view class="l-bottom-right">
						<view class="l-bottom-color" v-for="(item,index) in themes" @tap="changeTheme(index)" :key="item.name" 
						:style="{ backgroundColor: item.pageBg, borderColor : thisTheme == index ? item.menuFontColor : 'rgba(0,0,0,0)'}"
						 v-if="index != 1 && index != 2">
						 </view>
					</view>
				</view>
			</view>
			<view class="l-bottom-setting3">
				<view @tap="getMenu()">
					<view class="iconfont">
						<image src="../../static/section/menu.png"></image>
					</view>
					<!-- <view>目录</view> -->
				</view>
				<view @tap="changeTheme(thisTheme == 1 ? 0 : 1)">
					<view class="iconfont">
					<image v-if="thisTheme == 1" src="../../static/section/sun.png"></image>
					<image v-else src="../../static/section/moon.png"></image>
					</view>
					<!-- <view>{{thisTheme==1?'白天':'夜间'}}</view> -->
				</view>
				<view @tap="toggleSetting()">
					<view class="iconfont">
						<image src="../../static/section/setting.png"></image>
					</view>
				</view>
				<!-- <view @tap="changeTheme(thisTheme == 2 ? 0 : 2)" :style="thisTheme == 2 ? 'color:green' : ''">
					<view><text class="iconfont">&#xe654;</text></view>
					<view>护眼</view>
				</view> -->
			</view>
		</view>
		<!-- 菜单结束 -->
		<!-- 小说正文开始 -->
		<view id="bookContent" class="sview" :style="{ backgroundColor: pageBg, color : contentFontColor, fontSize : size + 'rpx', lineHeight : lineHeight + 'rpx'}">
			<rich-text :nodes="content_text"></rich-text>
		</view>
		<!-- <button @tap="scrolltolower" style="margin: 20px;">下一章</button> -->
		
		<!-- 小说正文结束 -->
		<!-- 目录开始 -->
		<view @tap="closeMenu" class="l-menu">
			<view :style="{ opacity: showMenu ? '1' : '0',visibility: showMenu ? 'visible' : 'hidden' }" class="menu-bg"></view>
			<scroll-view class="anmt" scroll-y="true" show-scrollbar="true" :style="{ height: windowHeight, left: showMenu ? '0' : '-100%' }">
				<view v-for="(item,index) in chapter" :key="index" :style="{ color: item.name == section_title ? '#e14101' : contentFontColor}" @tap.stop="getText(item, true)">{{item.name}}</view>
			</scroll-view>
		</view>
		<!-- 目录结束 -->
	</view>
</template>
<script>
	import { getBookShelf, setBookShelf, getChapter } from '@/common/book.js'
	import theme from '../../theme'
	export default {
		data() {
			return {
				section_title: '', //章节标题
				//正文
				content_text: '',
				show: false, //菜单display
				thisTheme: 0, //当前主题
				themes: theme.data, //主题列表
				menuFontColor: 'rgb(100,103,120)', //菜单字体颜色
				pageBg: '../../static/theme/white.png', //页面背景图
				lineBg: '#333', //滑动线条颜色
				menuBg: '../../static/theme/white.png', //菜单背景图
				contentFontColor: '#333', //富文本文字颜色
				statusBarHeight: '',
				Dindex: '', //当前章节索引
				bookName: '', //书名
				book_url: '', //本书Url
				battery: '', //电量
				systemTime: '', //系统时间
				size: uni.getStorageSync('fontsize') ? uni.getStorageSync('fontsize') : 40, //正文字体大小
				lineHeight: uni.getStorageSync('lineHeight') ? uni.getStorageSync('lineHeight') : 70, //正文行间距
				light: uni.getStorageSync('light') ? uni.getStorageSync('light') : 1,
				nextUrl: '',
				windowHeight: 0,
				scroll_top: 0,
				type: '', //翻页方式
				showSetting: false,
				bookShelf: [],
				chapter: [],
				showMenu: false
			}
		},
		created() {
			var this_ = this;
			//获取状态栏高度给顶部占位节点
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
			var zt = uni.getStorageSync('theme'); //主题索引
			if (zt) {
				this.thisTheme = zt;
				this.menuFontColor = theme.data[zt].menuFontColor; //菜单字体颜色
				this.pageBg = theme.data[zt].pageBg; //页面背景色
				this.menuBg = theme.data[zt].menuBg; //菜单背景色
				this.contentFontColor = theme.data[zt].contentFontColor; //富文本文字颜色
			} else {
				this.thisTheme = 0;
				this.menuFontColor = theme.data[0].menuFontColor; //菜单字体颜色
				this.pageBg = theme.data[0].pageBg; //页面背景色
				this.menuBg = theme.data[0].menuBg; //菜单背景色
				this.contentFontColor = theme.data[0].contentFontColor; //富文本文字颜色
			}
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight + 'px'
					this.statusBarHeight = res.statusBarHeight + 'px'
				}
			})
			
			uni.getScreenBrightness({
			    success: (res) => {
			        // console.log('屏幕亮度值：' + res.value);
					this.light = res.value;
			    }
			})
		},
		onLoad(e) {
			this.book_url = e.url;
			this.getText(e)
			
			setTimeout(()=>{
				let arr = this.book_url.split('/');
				arr.splice(-1);
				let url = arr.join('/');
				getChapter(url, '', this.$bookUrl).then((res) => {
					this.chapter = [...res];
				})
			}, 1000)
		},
		onShow() {
			this.bookShelf = getBookShelf();
		},
		onReachBottom() {
			this.getNext();
		},
		methods: {
			getNext() {
				this.getText({
					url: this.nextUrl,
					name: this.bookName,
				}, false, true)
			},
			getText(param, menu = false, next = false) {
				const cheerio = require('cheerio')
				this.getRequest({
					url: param.url,
					loading: next,
					success: (res) => {
						// this.content_text = '';
						// uni.pageScrollTo({
						// 	scrollTop: 0,
						// 	duration: 10
						// });
						const $ = cheerio.load(res)
						this.section_title = $('.bookname').find('h1').text();
						var text = this.section_title + `<br><br>`;
						text += $.html('#content');
						
						if(next){
							this.content_text += text
						} else {
							this.content_text = text
						}
						this.bookName = param.name
						this.nextUrl = this.$bookUrl + $(".bottem1").find('a').eq(3).attr('href')
						
						let position = '';
						setBookShelf(param.name, '', '', this.section_title, param.url, param.image, position);
						
						if(menu){
							this.showMenu = false
							this.showSetting = false
						}
					}
				})
			},
			//修改正文字体大小
			changeFontSize(e) {
				this.size = e.detail.value;
				uni.setStorageSync('fontsize', e.detail.value);
			},
			changeLight(e) {
				this.light = e.detail.value;
				uni.setScreenBrightness({
				    value: this.light,
				    success: function () {
				        // console.log('success');
				    }
				})
				uni.setStorageSync('light', e.detail.value);
			},
			//修改正文行间距
			changeLineHeight(e) {
				this.lineHeight = e.detail.value;
				uni.setStorageSync('lineHeight', e.detail.value);
			},
			getMenu() {
				this.showMenu = true;
			},
			closeMenu(){
				this.showMenu = false;
			},
			back() {
				uni.navigateBack({});
			},
			clickArea() {
				this.show = !this.show;
				this.showSetting = !this.show ? false : this.showSetting
				console.log(this.show)
			},
			//切换主题
			changeTheme(e) {
				this.menuFontColor = theme.data[e].menuFontColor; //菜单字体颜色
				this.pageBg = theme.data[e].pageBg; //页面背景色
				this.menuBg = theme.data[e].menuBg; //菜单背景色
				this.contentFontColor = theme.data[e].contentFontColor; //富文本文字颜色
				uni.setStorageSync('theme', e);
				this.thisTheme = e;
			},
			toggleSetting(){
				this.showSetting = !this.showSetting;
			},
		}
	}
</script>
<style>
	.l-page-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.l-menu{
		
	}
	.l-menu .menu-bg{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.2);
		z-index: 99;
		-webkit-transition: all 1s;
		transition: all 1s;

	}
	.l-menu scroll-view{
		position: fixed;
		top: 0;
		padding-left: 40rpx;
		width: 80%;
		box-sizing: border-box;
		background: #FFFFFF;
		z-index: 100;
	}
	.l-menu scroll-view view{
		line-height: 70rpx;
		border-bottom: 1px solid #efefef;
	}
	
	.l-menu ::-webkit-scrollbar
	{
		width: 30rpx!important;
		height: 30rpx!important;
		background-color: #FFFFFF;
	}
	  
	/*定义滚动条轨道 内阴影+圆角*/
	.l-menu ::-webkit-scrollbar-track
	{
		background-color: #FFFFFF;
	}
	  
	/*定义滑块 内阴影+圆角*/
	.l-menu ::-webkit-scrollbar-thumb
	{
		/* box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); */
		background-color: #dcdcdc;
	}

	.zuizhong.active {
		opacity: 1;
		position: fixed;
		width: 100rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		color: #ec706b;
		transform: translateX(50%) scale(0.7);
		right: 80rpx;
		-webkit-transition: all 0.5s;
		z-index: 9
	}

	.zuizhong {
		opacity: 0;
		position: fixed;
		width: 100rpx;
		text-align: center;
		font-size: 20rpx;
		font-weight: bold;
		color: #ec706b;
		right: 80rpx;
		transform: translateX(50%) scale(0.1);
		-webkit-transition: all 0.5s;
		transition: all 0.5s;
		z-index: 9
	}

	.quanquan {
		-webkit-box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
		box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
		position: fixed;
		right: 70rpx;
		z-index: 9;
		border-radius: 50%;
		overflow: hidden;
		transform: translateX(50%) scale(0.5);
	}

	.l-top-back {
		width: 40rpx;
		height: 40rpx;
		margin: 0 40rpx 0 20rpx;
	}

	.sview {
		width: calc(100% - 40rpx);
		font-size: 45rpx;
		line-height: 80rpx;
		position: relative;
		text-indent: calc(2em + 12rpx);
		margin: 0 auto;
		z-index: 5;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
		padding: 0 20rpx 100rpx;

	}
	.l-top-content {
		display: flex;
		align-items: center;
		padding-top: 30rpx;
		height: 100rpx;
		/* line-height: 100rpx; */
		text-overflow: ellipsis;
	}
	.l-top-content text{
		margin-left: 50rpx;
	}

	page {
		letter-spacing: 6rpx;
	}

	.l-top-area {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,.08);
	}

	.l-bottom-area {
		padding: 20rpx 0 30rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
		box-shadow: 0 -2px 4px 0 rgba(0,0,0,.08);
	}
	.l-bottom-setting1,
	.l-bottom-setting2,
	.l-bottom-setting3{
		display: flex;
		overflow: hidden;
	}
	.l-bottom-setting3{
		display: flex;
	}
	.l-bottom-light{
		padding: 0 30rpx;
		width: 100%;
		display:flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}
	.l-bottom-light .reduce{
		width: 30rpx;
		height: 30rpx;
	}
	.l-bottom-light .plus{
		width: 40rpx;
		height: 40rpx;
	}
	.l-bottom-light .l-bottom-flex-line {
		width: 100%;
	}
	.l-bottom-setting1 .l-bottom-flex{
		width: 50%;
		display:flex;
	}
	.l-bottom-setting1 .l-bottom-flex-name{
		width: 30%;
		line-height: 70rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.l-bottom-flex-line{
		width: 70%;
		height: 70rpx;
		display: flex;
		align-content: center;
		justify-content: center;
	}
	.l-bottom-flex-line>slider{
		width: 100%;
	}
	.l-bottom-setting2 .l-bottom-left{
		width: 15%;
		line-height: 100rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.l-bottom-setting2 .l-bottom-right{
		width: 85%;
		height: 100rpx;
		display: flex;
	}
	.l-bottom-area .l-bottom-setting3>view {
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		line-height: 40rpx;
	}

	.l-bottom-area .l-bottom-setting3 image {
		width: 40rpx;
		height: 40rpx;
	}

	.guanggao {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 6;
		width: 100%;
	}

	.dianxin {
		position: absolute;
		top: 32.5%;
		left: 11%;
		width: 72%;
		height: 35%;
	}

	.dLiang {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.anmt {
		transition: all 0.5s;
	}

	.l-bottom-color {
		width: 150rpx;
		height: 100rpx;
		background-color: #EC706B;
		border-radius: 12rpx;
		border: 5rpx solid #000;
		transform: scale(0.4);
		margin: -10rpx -35rpx 0;
	}

	.l-mid-area {
		top: 50%;
		position: fixed;
		left: 0;
		width: 100%;
		height: 50%;
		transform: translateY(-50%);
		z-index: 9;
	}

	.disinline {
		display: inline
	}
</style>
