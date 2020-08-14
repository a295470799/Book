<template>
	<view class="content">
		<!-- #ifndef MP-WEIXIN -->
		<view class="l-fixed">
			<view class="l-status"></view>
			<view class="l-head-title">
				我的<image @tap="$toast(`设置`)" class="l-icon-setting" src="../../static/l-icon-setting.png" mode=""></image>
			</view>
		</view>
		<view class="l-placeholder"></view>
		<!-- #endif -->

		<view class="l-body">

			<view class="l-body-head">
				<image class="l-head-img" src="" mode="aspectFill"></image>
				<view class="l-head-intr">
					<view class="l-head-user">
						<view class="l-head-username" @tap="$toast(`昵称`)">
							任飘渺
						</view>
						<view class="l-head-city">
							<view class="l-head-city-txt" @tap="$toast(`城市`)">
								中国-成都
							</view>
						</view>
					</view>
					<view class="l-head-intr-txt" @tap="$toast(`个性签名`)">
						现在学东西晚吗? 种一棵树最好的时间是十年前，其次是现在。
					</view>
				</view>
			</view>

			<view class="l-ul">

				<view class="l-li" @tap="$toast(`账户`)">
					<view class="l-li-left">
						<image class="l-icon-mine l-icon-mine-1" src="../../static/mine/l-icon-mine-1.png" mode=""></image>
						账户
					</view>
					<view class="l-li-right">
						<view class="l-li-right-value">

						</view>
						<view class="l-li-right-label">
							¥1126.98
						</view>
					</view>
				</view>

				<view class="l-li" @tap="$toast(`我的书籍`)">
					<view class="l-li-left">
						<image class="l-icon-mine l-icon-mine-1" src="../../static/mine/l-icon-mine-2.png" mode=""></image>
						我的书籍
					</view>
					<view class="l-li-right">
						<view class="l-li-right-value">
							16本
						</view>
						<view class="l-li-right-label">
							5本读完
						</view>
					</view>
				</view>

				<view class="l-li" @tap="$toast(`想读`)">
					<view class="l-li-left">
						<image class="l-icon-mine l-icon-mine-1" src="../../static/mine/l-icon-mine-3.png" mode=""></image>
						想读
					</view>
					<view class="l-li-right">
						<view class="l-li-right-value">
							32本
						</view>
						<view class="l-li-right-label">
							5本已降价
						</view>
					</view>
				</view>

				<view class="l-li" @tap="$toast(`我的评论`)">
					<view class="l-li-left">
						<image class="l-icon-mine l-icon-mine-1" src="../../static/mine/l-icon-mine-4.png" mode=""></image>
						我的评论
					</view>
					<view class="l-li-right">
						<view class="l-li-right-value">
							235条
						</view>
						<view class="l-li-right-label">
							125个赞 344个评论
						</view>
					</view>
				</view>

				<view class="l-li" @tap="$toast(`好友排名`)">
					<view class="l-li-left">
						<image class="l-icon-mine l-icon-mine-1" src="../../static/mine/l-icon-mine-5.png" mode=""></image>
						好友排名
					</view>
					<view class="l-li-right">
						<view class="l-li-right-value">
							12名
						</view>
						<view class="l-li-right-label">
							48分钟阅读
						</view>
					</view>
				</view>

				<view class="l-li" @tap="$toast(`关注`)">
					<view class="l-li-left">
						<image class="l-icon-mine l-icon-mine-1" src="../../static/mine/l-icon-mine-6.png" mode=""></image>
						关注
					</view>
					<view class="l-li-right">
						<view class="l-li-right-value">
							16人
						</view>
						<view class="l-li-right-label">
							15人关注我
						</view>
					</view>
				</view>

				<view class="l-li" @tap="$toast(`我的阅历`)">
					<view class="l-li-left">
						<image class="l-icon-mine l-icon-mine-1" src="../../static/mine/l-icon-mine-7.png" mode=""></image>
						我的阅历
					</view>
					<view class="l-li-right">
						<view class="l-li-right-value">
							28小时
						</view>
						<view class="l-li-right-label">
							可兑换<text class="l-li-right-label-color">5</text>读书币
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
				headimg: ``
			}
		}
	}
</script>

<style>
	.l-head {
		/* width: calc(100% - var(--pad-lr) - var(--pad-lr)); */
		font: bold var(--f-size-5) norml;
	}

	.l-head-title {
		line-height: var(--h-head);
		position: relative;
		padding: 0 var(--pad-lr);
		text-align: center;
		font-size: var(--f-size-3);
	}

	.l-icon-setting {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 50%;
		right: var(--pad-lr);
		transform: translateY(-50%);
	}

	.l-body {
		padding: var(--pad-lr);
	}

	.l-body-head {
		width: 100%;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-head-img {
		width: 150rpx;
		height: 100%;
		border-radius: 50%;
		margin-right: 35rpx;
	}

	.l-head-intr {
		display: flex;
		height: 100%;
		width: calc(100% - 185rpx);
		flex-direction: column;
		justify-content: space-between;
		padding-top: 10rpx;
	}

	.l-head-user {
		width: 100%;
		display: flex;
		height: var(--f-size-6);
		line-height: var(--f-size-6);
		white-space: nowrap;
	}

	.l-head-username {
		max-width: 60%;
		margin-right: 10%;
		font: bold var(--f-size-6)/var(--f-size-6) normal;
	}

	.l-head-city {
		width: 30%;
		display: flex;
		align-self: flex-end;
		font: var(--f-size-2)/var(--f-size-2) normal;
		color: var(--c-txt-2);
	}

	.l-head-city-txt {
		width: 100%;
	}

	.l-head-city-txt,
	.l-head-username {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.l-head-intr-txt {
		width: 100%;
		font-size: 26rpx;
		color: var(--c-txt-2);
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.l-ul {
		padding: 120rpx 0 0;
	}

	.l-li {
		display: flex;
		align-items: center;
		margin-bottom: 52rpx;
		justify-content: space-between;
	}

	.l-li-left {
		display: flex;
		color: var(--c-txt-2);
		align-items: center;
	}

	.l-li-right {
		text-align: right;
	}

	.l-li-right-value {
		color: #515d61;
		font-size: 30rpx;
	}

	.l-li-right-label {
		color: #C1C1C1;
		font-size: var(--f-size-1);
	}

	.l-icon-mine {
		margin-right: 30rpx;
	}

	.l-icon-mine-7,
	.l-icon-mine-1 {
		width: 38rpx;
		height: 30rpx;
	}

	.l-icon-mine-3,
	.l-icon-mine-2 {
		width: 34rpx;
		height: 30rpx;
	}

	.l-icon-mine-4 {
		width: 32rpx;
		height: 30rpx;
	}

	.l-icon-mine-5 {
		width: 36rpx;
		height: 36rpx;
	}

	.l-icon-mine-6 {
		width: 38rpx;
		height: 26rpx;
	}

	.l-li-right-label-color {
		color: #FF9800;
	}
</style>
