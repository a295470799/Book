<template>
	<view class="content">
		<view class="l-body">
			<view class="l-tab-item">
				<text :class="{'active' : 0 == current}" @tap="changeTab(0)">我的书架</text>
				<text :class="{'active' : 1 == current}" @tap="changeTab(1)">浏览记录</text>
			</view>
			<view v-if="current == 0" class="l-shelf">
				<view class="center" v-if="bookShelf.length == 0">
					<text>书架是空的哦</text>
				</view>
				<view v-else class="l-dl" v-for="(item,index) in bookShelf" :key="index" @tap="navtoSection(item)">
					<image class="l-dt" :src="item.image" mode="aspectFill"></image>
					<view class="l-dd">
						<view class="l-dd-title">
							{{item.bookName}}
						</view>
						<view class="l-dd-content">
							{{item.last}}
						</view>
						<view class="l-dd-content">
							{{item.user}}
						</view>
						<view class="l-dd-footer">
							上次阅读到：{{item.chapterName}}
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="current == 1" class="l-history">
				<view class="center" v-if="bookHistory.length == 0">
					<text>暂时没有浏览记录</text>
				</view>
				<view v-else class="l-dl" v-for="(item,index) in bookHistory" :key="index" @tap="navtoSection(item)">
					<image class="l-dt" :src="item.image" mode="aspectFill"></image>
					<view class="l-dd">
						<view class="l-dd-title">
							{{item.bookName}}
						</view>
						<view class="l-dd-content">
							
						</view>
						<view class="l-dd-footer">
							上次阅读到：{{item.chapterName}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getBookShelf } from '@/common/book.js'
	export default {
		data() {
			return {
				title: '',
				bookShelf:[],
				bookHistory: [],
				current: 0,
			}
		},
		onShow() {
			this.getData();
		},
		onPullDownRefresh(){
			this.getData()
		},
		methods: {
			changeTab(e){
				this.current = e
			},
			getData(){
				let shelf = getBookShelf();
				this.bookShelf = shelf.filter((item)=>item.type == 1)
				this.bookHistory = shelf.filter((item)=>item.type == 2)
				uni.stopPullDownRefresh()
			},
			navtoSection(data) {
				uni.navigateTo({
					url: `/pages/section/section?url=` + data.url + `&title=` + data.name + `&name=` + data.name + `&image=` + data.image
				})
			},
		}
	}
</script>

<style>
	/* l-body */
	.l-tab-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 80rpx 15% 40rpx;
	}
	.l-tab-item text{
		padding-bottom: 20rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #FFFFFF;
	}
	.l-tab-item text.active{
		border-bottom: 1px solid #1a99de;
	}
	
	.center{
		text-align: center;
	}
	
	.l-dl {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
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
		font: bold var(--f-size-4) normal;
		padding-bottom: 20rpx;
	}
	
	.l-dd-content,
	.l-dd-footer {
		color: var(--c-txt-2);
		font: var(--f-size-1)/var(--f-size-4) normal;
		padding-bottom: 10rpx;
	}

</style>
