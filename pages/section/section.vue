<template>
	<view class="content">
		<!-- 网页背景开始 -->
		<view class="l-page-bg anmt" :style = "{ backgroundColor: pageBg }"></view>
		<view class="l-mid-area" @click = "clickArea()"></view>
		<!-- 网页背景结束 -->
		<!-- 带返回键的导航栏开始 -->
		<view class="l-top-area anmt" :style = "{ color: fontColor, backgroundColor: menuBg,top : show ? '0' : '-100%' }">
			<!-- <view :style="{ height: statusBarHeight }"></view> -->
			<view class="l-top-content">
				<image src="../../static/back.svg" class="l-top-back" @click="back()"></image>
				<text>{{section_title}}</text>
			</view>
		</view>
		<!-- 带返回键的导航栏结束 -->
		<!-- 菜单开始 -->
		<view class="l-bottom-area anmt" :style="{ color: fontColor, backgroundColor: menuBg, bottom: show ? '0' : '-100%'} ">
			<view v-if="showSetting">
				<view class="l-bottom-setting1">
					<view class="l-bottom-flex">
						<view class="l-bottom-flex-name">字体</view>
						<view class="l-bottom-flex-line">
							<slider :value="size" min="20" max="100" @changing="changeFontSize" @change="changeFontSize"
							 :activeColor="fontColor" :backgroundColor="lineBg" :block-color="fontColor" block-size="16" />
						</view>
					</view>
					<view class="l-bottom-flex">
						<view class="l-bottom-flex-name">间距</view>
						<view class="l-bottom-flex-line">
							<slider :value="lineHeight" min="50" max="150" @changing="changeLineHeight" @change="changeLineHeight"
							 :activeColor="fontColor" :backgroundColor="lineBg" :block-color="fontColor" block-size="16" />
						</view>
					</view>
				</view>
				<view class="l-bottom-setting2">
					<view class="l-bottom-left">背景</view>
					<view class="l-bottom-right">
						<view class="l-bottom-color" v-for="(item,index) in themes" @tap="changeTheme(index)" :key="item.name" 
						:style="{ backgroundColor : item.pageBg, borderColor : thisTheme == index ? item.fontColor : 'rgba(0,0,0,0)'}"
						 v-if="index != 1 && index != 2">
						 </view>
					</view>
				</view>
			</view>
			<view class="l-bottom-setting3">
				<view @click="getMenu()">
					<view><text class="iconfont">&#xe608;</text></view>
					<!-- <view>目录</view> -->
				</view>
				<view @click="changeTheme(thisTheme == 1 ? 0 : 1)">
					<view><text class="iconfont">{{ thisTheme == 1 ? '&#xe6ee;' : '&#xe6a0;' }}</text></view>
					<!-- <view>{{thisTheme==1?'白天':'夜间'}}</view> -->
				</view>
				<view @click="toggleSetting()">
					<view><text class="iconfont">&#xe654;</text></view>
				</view>
				<!-- <view @click="changeTheme(thisTheme == 2 ? 0 : 2)" :style="thisTheme == 2 ? 'color:green' : ''">
					<view><text class="iconfont">&#xe654;</text></view>
					<view>护眼</view>
				</view> -->
			</view>
		</view>
		<!-- 菜单结束 -->
		<!-- 小说正文开始 -->
		<view class="sview" :style="{ paddingTop : 'calc('+statusBarHeight+' + 110rpx)', color : textColor, fontSize : size + 'rpx', lineHeight : lineHeight + 'rpx'}">
			<rich-text :nodes="content_text"></rich-text>
		</view>
		<!-- <button @click="scrolltolower" style="margin: 20px;">下一章</button> -->
		<!-- 小说正文结束 -->
	</view>
</template>
<script>
	import { getBookShelf, setBookShelf } from '@/common/book.js'
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
				fontColor: 'rgb(100,103,120)', //菜单字体颜色
				pageBg: 'rgb(252, 216, 142)', //页面背景色
				lineBg: '#333', //滑动线条颜色
				menuBg: '#fff', //菜单背景色
				textColor: '#333', //富文本文字颜色
				statusBarHeight: '',
				Dindex: '', //当前章节索引
				bookName: '', //书名
				id: '', //本书ID
				battery: '', //电量
				systemTime: '', //系统时间
				size: uni.getStorageSync('fontsize') ? uni.getStorageSync('fontsize') : 40, //正文字体大小
				lineHeight: uni.getStorageSync('lineHeight') ? uni.getStorageSync('lineHeight') : 70, //正文行间距
				nextUrl: '',
				windowHeight: 0,
				scroll_top: 0,
				type: '', //翻页方式
				showSetting: false,
				bookShelf: [],
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
				this.fontColor = theme.data[zt].fontColor; //菜单字体颜色
				this.pageBg = theme.data[zt].pageBg; //页面背景色
				this.menuBg = theme.data[zt].menuBg; //菜单背景色
				this.textColor = theme.data[zt].textColor; //富文本文字颜色
			} else {
				this.thisTheme = 0;
				this.fontColor = theme.data[0].fontColor; //菜单字体颜色
				this.pageBg = theme.data[0].pageBg; //页面背景色
				this.menuBg = theme.data[0].menuBg; //菜单背景色
				this.textColor = theme.data[0].textColor; //富文本文字颜色
			}
			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			})
		},
		onLoad(e) {
			this.getText(e)
		},
		onShow() {
			this.bookShelf = getBookShelf();
		},
		methods: {
			scrolltolower() {
				this.getText({
					url: this.nextUrl
				})
			},
			getText(param) {
				const cheerio = require('cheerio')
				this.getRequest({
					url: param.url,
					success: (res) => {
						this.content_text = '';
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 10
						});
						const $ = cheerio.load(res)
						this.section_title = $('.bookname').find('h1').text();
						var text = this.section_title + `<br><br>`;
						text += $.html('#content');

						this.content_text = text
						this.bookName = param.name
						this.nextUrl = $(".bottem1").find('a').eq(3).attr('href')
						
						let position = '';
						setBookShelf(param.name, param.url, param.image, position);
					}
				})
			},
			//修改正文字体大小
			changeFontSize(e) {
				this.size = e.detail.value;
				uni.setStorageSync('fontsize', e.detail.value);
			},
			//修改正文行间距
			changeLineHeight(e) {
				this.lineHeight = e.detail.value;
				uni.setStorageSync('lineHeight', e.detail.value);
			},
			getMenu() {
				uni.showToast({
					title: '打开目录'
				});
			},
			back() {
				uni.navigateBack({});
			},
			clickArea() {
				this.show = !this.show;
				this.showSetting = !this.show ? false : this.showSetting
			},
			//切换主题
			changeTheme(e) {
				this.fontColor = theme.data[e].fontColor; //菜单字体颜色
				this.pageBg = theme.data[e].pageBg; //页面背景色
				this.menuBg = theme.data[e].menuBg; //菜单背景色
				this.textColor = theme.data[e].textColor; //富文本文字颜色
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
	@font-face {
	  font-family: 'iconfont';  /* project id 2007537 */
	  src: url('//at.alicdn.com/t/font_2007537_wmvi1n1b66k.eot');
	  src: url('//at.alicdn.com/t/font_2007537_wmvi1n1b66k.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_2007537_wmvi1n1b66k.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_2007537_wmvi1n1b66k.woff') format('woff'),
	  url('//at.alicdn.com/t/font_2007537_wmvi1n1b66k.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_2007537_wmvi1n1b66k.svg#iconfont') format('svg');
	}
	
	.l-page-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
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
		line-height: 90rpx;
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

	.titlee {
		width: 100%;
		font-size: 45rpx;
		line-height: 65rpx;
		position: relative;
		z-index: 5;
		padding: 0 20rpx 50rpx;
		text-indent: -2.3em;
	}

	.l-top-content {
		display: flex;
		align-items: center;
		/* margin-top:40rpx; */
		height: 100rpx;
		line-height: 100rpx;
		text-overflow: ellipsis;
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
	}

	.l-bottom-area {
		padding: 20rpx 0 30rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
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
	.l-bottom-setting1 .l-bottom-flex-line{
		width: 70%;
		height: 70rpx;
		display: flex;
		align-content: center;
		justify-content: center;
	}
	.l-bottom-setting1 .l-bottom-flex-line>slider{
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

	

	.iconfont {
		font-family: iconfont;
		font-size: 42rpx;
		color: #333333;
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
