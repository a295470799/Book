<template>
	<view class="content">
		<view class="l-body">
			<view class="l-list-content" v-for="(s,i) in 10" :key="i" @tap="$toast(`评论`)">
				<view class="l-list-sub-content">
					<view class="l-list-c-head">
						三体的文风和细节描写简直赞
					</view>
					<view class="l-list-c-body">
						一直认为写作是件很耗费体力与脑力的事情，特别是从新构架一个新的世界，一个文明。这需要你有丰富的
						直认为写作是件很耗费体力与脑力的事情，特别是从新构架一个新的世界，一个文明。这需要你有丰富的
					</view>
					<view class="l-list-c-foot">
						<view class="l-list-c-foot-l">
							<text class="l-list-c-foot-l-name">任飘渺</text>
							<image v-for="(s,i) in 4" :key="i" class="l-icon-star-blank" src="../../static/detail/l-icon-star-blank.png"
							 mode=""></image>
							<image class="l-icon-star-blank" src="../../static/detail/l-icon-star-blank-un.png" mode=""></image>
						</view>
						<view class="l-list-c-foot-r">
							<image class="l-icon-like" src="../../static/detail/l-icon-like.png" mode=""></image>8
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="l-publish">
			<view class="l-form">
				<input class="l-input" type="text" v-model="keyword" placeholder="尝试说点什么..." />
			</view>
			<view class="l-publish-btn" @tap="publish">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ``
			}
		},
		methods: {
			publish() {
				uni.showToast({
					title: `您发表了评论:` + this.keyword,
					icon: 'none'
				})
				this.keyword = ``
			}
		}
	}
</script>

<style>
	.content {
		padding-bottom: 108rpx;
	}

	.l-publish {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 0 var(--pad-lr);
		width: calc(100% - var(--pad-lr) - var(--pad-lr));
		height: 98rpx;
		display: flex;
		align-items: center;
		background-color: #373A49;
	}

	.l-form {
		width: 600rpx;
		height: 80rpx;
		background: rgba(8, 9, 32, 1);
		border-radius: 40rpx;
		display: flex;
		align-items: center;
	}

	.l-input {
		flex: 1;
		padding: 0 var(--pad-lr);
	}

	.l-publish-btn {
		margin-left: 20rpx;
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

	.l-list-view {
		padding-top: 40rpx;
		color: var(--c-bg-2);
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
</style>
