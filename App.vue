<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	page,
	uni-page{
		background-color: var(--c-bg-1);
		color: var(--c-txt-1);
		font-size: var(--f-size-1);
		
		/* font-size */
		--f-size-1:24rpx;
		--f-size-2:28rpx;
		--f-size-3:32rpx;
		--f-size-4:36rpx;
		--f-size-5:40rpx;
		--f-size-6:44rpx;
		
		/* color | background */
		--c-txt-1:#333333;
		--c-txt-2:#888888;
		--c-txt-3:#222222;
		
		--c-bg-1:#FFFFFF;
		--c-bg-2:#7E7F94;
		--c-bg-3:#0b0c21;
		--c-bg-4:#f3f3f3;
		
		/* padding-left | right */
		--pad-lr:32rpx;
		
		/* navbar-height */
		--h-head:96rpx;
		
		/* input placeholder text color */
		--c-input-holder:#7E7E7E;
		
		
	}
	
	/* init button */
	
	uni-button,
	button{
		margin: 0;
		padding: 0;
		color: var(--c-txt-1);
		background-color: var(--c-bg-1);
	}
	
	uni-button:after,
	button:after{
		border: none;
		width: 100%;
		height: 100%;
	}
	
	.button-hover{
		color: inherit;
		background-color: inherit;
	}
	
	/* init img */
	uni-image>img,
	img{
		vertical-align: middle;
	}
	
	.l-status{
		width: 100%;
		height: var(--status-bar-height);
		background-color: transparent;
	}
	
	/* clear both  */
	.l-clear-both:after{
		content: ' ';
		display: block;
		width: 0;
		height: 0;
		clear: both;
		zoom: 1;
	}
	
	/* navbar -fixed -placeholder */
	.content {
		position: relative;
	}
	
	.l-fixed{
		position: fixed;
		width: 100%;
		z-index: 999;
		top: 0;
		background-color: var(--c-bg-1);
	}
	
	.l-placeholder{
		width: 100%;
		/* #ifndef MP-WEIXIN */
		height: calc(var(--status-bar-height) + var(--h-head));
		/* #endif */
		
		/* #ifdef MP-WEIXIN */
		height: var(--h-head);
		/* #endif */
	}
	
	/* l-head-search */
	
	.l-head{
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		height: var(--h-head);
	}
	
	.l-search{
		flex: 1;
		display: flex;
		align-items: center;
		padding: 0 26rpx;
		width: 100%;
		height: 76rpx;
		margin-right: 16rpx;
		border-radius: 60rpx;
		background-color: var(--c-bg-4);
	}
	
	.l-icon-search{
		width: 29rpx;
		height: 29rpx;
	}
	
	.l-search-input{
		flex: 1;
		padding: 0 12rpx;
		font-size: var(--f-size-1);
	}
	
	.l-holder{
		color: var(--c-input-holder);
	}
	
	/* l-swiper */
	
	.l-body{
		padding: 0 var(--pad-lr);
	}
	
	.l-swiper{
		margin: 36rpx 0 0;
		height: 248rpx;
	}
	
	.l-swiper-item{
		height: 80%;
		overflow: hidden;
		border-radius: 26rpx;
	}
	
	.l-carousel-img{
		width: 100%;
		height: 100%;
	}
	
	/* l-icon */
	
	.l-icon-more{
		width: 30rpx;
		/* height: 27rpx; */
		vertical-align: middle;
		margin-left: 12rpx;
	}
</style>
