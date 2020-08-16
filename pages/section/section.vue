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
		<!-- 顶部开始 -->
		<!-- <view class="anmt" :style="{color:fontColor,lineHeight:statusBarHeight,backgroundColor:show?menuBg:pageBg,position:'fixed',top:'0',left:'0',zIndex:'6',width:'100%',fontSize:'3vw',zIndex:'20'}"> -->
			<!-- 时间电量开始 -->
			<!-- <view :style="{height:statusBarHeight,padding: '0 5vw'}">
				<view style="float: left;letter-spacing:0">
					<text v-text="systemTime"></text>
				</view>
				<view style="float: right;letter-spacing:0;">
					<text class="iconfont icon-80dianliang" style="font-size: 5vw;position: relative;">
						<text class="dianxin" :style="{backgroundColor:show?menuBg:pageBg}">
							<text class="dLiang" :style="{backgroundColor:fontColor,width:battery+'%'}"></text>
						</text>
					</text>
				</view>
			</view> -->
			<!-- 时间电量结束 -->
			<!-- 书名章节开始 -->
			<!-- <view style="height: 40rpx;line-height: 40rpx;padding: 0 5vw;">
				<view style="float: left;width: 300rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" v-text="shuming"></view>
				<view v-text="section_title" style="float: right;width: 300rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;"></view>
			</view> -->
			<!-- 书名章节结束 -->
		<!-- </view> -->
		<!-- 顶部结束 -->
		<!-- 小说正文开始 -->
		<view class="sview" :style="{ paddingTop : 'calc('+statusBarHeight+' + 110rpx)', color : textColor, fontSize : size + 'rpx', lineHeight : lineHeight + 'rpx'}">
			<rich-text :nodes="content_text"></rich-text>
		</view>
		<!-- <button @click="scrolltolower" style="margin: 20px;">下一章</button> -->
		<!-- 小说正文结束 -->
	</view>
</template>
<script>
	var interval, timeInter, dianliangInter;
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
				shuming: '', //书名
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

			}
		},
		onUnload() {
			// 页面卸载的时候清除定时器
			clearInterval(timeInter)
			clearInterval(dianliangInter)
			uni.hideLoading();
			//页面卸载的时候将通知栏显示出来
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
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
		onShow() {
			//页面显示的时候将通知栏隐藏掉
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
		},
		onHide() {
			//页面隐藏的时候将通知栏显示出来
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle('dark');
			plus.navigator.setStatusBarBackground('#FF0000');
			// #endif
			this.dianliang();
			this.getTimes();
			//每分钟获取一次电量
			dianliangInter = setInterval(() => {
				this.dianliang();
			}, 60000)
			//每秒获取一次时间
			timeInter = setInterval(() => {
				this.getTimes();
			}, 1000)
			this.getText(e)
		},
		methods: {
			scrolltolower() {
				this.getText({
					url: this.nextUrl
				})
			},
			getText(param) {
				console.log(param.url)
				const cheerio = require('cheerio')
				var this_ = this
				this.getHtml({
					url: param.url,
					success: function(res) {
						this_.content_text = '';
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 10
						});
						const $ = cheerio.load(res)
						this_.section_title = $('.bookname').find('h1').text();
						var text = this_.section_title + `<br><br>`;
						text += $.html('#content');

						this_.content_text = text
						this_.shuming = param.name
						this_.nextUrl = $(".bottem1").find('a').eq(3).attr('href')
						var book = uni.getStorageSync('book')
						book.hisUrl = param.url;
						book.hisTitle = this_.content_text;
						book.list = []
						var hislist;
						try {
							hislist = uni.getStorageSync('hislist')
						} catch (e) {}
						if (!hislist) {
							hislist = {}
						}
						hislist[book.name] = book
						uni.setStorageSync('hislist', hislist)
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
			//获取系统电量
			dianliang() {
				var this_ = this;
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform != 'ios') {
					var main = plus.android.runtimeMainActivity();
					var Intent = plus.android.importClass('android.content.Intent');
					var recevier = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
						onReceive: function(context, intent) {
							var action = intent.getAction();
							if (action == Intent.ACTION_BATTERY_CHANGED) {
								var level = intent.getIntExtra("level", 0); //电量  
								var voltage = intent.getIntExtra("voltage", 0); //电池电压  
								var temperature = intent.getIntExtra("temperature", 0); //电池温度  
								//如需获取别的，在这里继续写，此代码只提供获取电量  
								this_.battery = level;
							}
						}
					});
					var IntentFilter = plus.android.importClass('android.content.IntentFilter');
					var filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
					main.registerReceiver(recevier, filter);
				} else {
					var UIDevice = plus.ios.import("UIDevice");
					var dev = UIDevice.currentDevice();
					if (!dev.isBatteryMonitoringEnabled()) {
						dev.setBatteryMonitoringEnabled(true);
					}
					var level = dev.batteryLevel();
					this_.battery = level * 100;
				}
				// #endif
			},
			getTimes() {
				var times = new Date();
				this.systemTime = (times.getHours() < 10 ? '0' + times.getHours() : times.getHours()) + ':' + (times.getMinutes() <
					10 ? '0' + times.getMinutes() : times.getMinutes());
			}
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
