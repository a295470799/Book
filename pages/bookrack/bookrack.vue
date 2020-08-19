<template>
	<view class="content">
		<!-- <view class="l-fixed"> -->
			<!-- #ifndef MP-WEIXIN -->
			<!-- <view class="l-status"></view> -->
			<!-- #endif -->
			<!-- l-head -->
			<!-- <view class="l-head">
				<view class="l-search">
					<image class="l-icon-search" src="../../static/l-icon-search.png" mode=""></image>
					<input type="text" class="l-search-input" disabled="" value="" placeholder="精彩热搜：金光布袋戏《羽国志异》" placeholder-class="l-holder" />
				</view>
			</view>
		</view> -->

		<!-- <view class="l-placeholder"></view> -->

		<view class="l-body l-clear-both">
			<view class="l-li" v-for="(item,key) in bookShelf" :key="key" @tap="navtoSection(item)">
				<image class="l-li-img" :src="item.image" mode="aspectFill"></image>
				<view class="l-li-txt">
					{{item.name}}
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
			}
		},
		onShow() {
			this.bookShelf = getBookShelf();
		},
		methods: {
			navtoSection(data) {
				uni.navigateTo({
					url: `/pages/section/section?url=` + data.url + "&title=" + data.name
				})
			},
		}
	}
</script>

<style>
	/* l-body */

	.l-body {
		padding: var(--pad-lr) 0 var(--pad-lr) var(--pad-lr);
	}

	.l-ul {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 32rpx;
	}

	.l-add,
	.l-li {
		width: 28%;
		float: left;
		height: 392rpx;
		margin-right: 5%;
		margin-bottom: 32rpx;
	}

	.l-li {
		text-align: center;
	}

	.l-add-view,
	.l-li-img {
		width: 100%;
		height: 300rpx;
		border-radius: 10rpx;
		margin-bottom: 8rpx;
	}

	.l-add-view {
		box-sizing: border-box;
		display: flex;
		border: 6rpx solid rgba(126, 127, 148, 1);
		align-items: center;
		justify-content: center;
	}

	.l-icon-add {
		width: 36rpx;
		height: 36rpx;
	}

	.l-li-txt {
		padding: 0 10rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
</style>
