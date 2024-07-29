<template>
	<view class="index">
		<view class="container">
			<view class="content">
				<p>{{$t("blindBox_wait.text1")}}</p>
				<p>{{$t("blindBox_wait.text2")}}</p>
			</view>
			<view class="back_home flex-center" @click="totab('gather/mainland/index')">
				<p>{{$t("blindBox_wait.text3")}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {


		},
		onResize() {
			console.log("页面尺寸变化了,重新渲染页面.....");
			// uni.reLaunch({
			// 	url: '/pages/gather/mainland/blindBox_wait' // 替换成你需要重新加载的页面路径
			// });

			// plus.screen.lockOrientation("portrait-primary");
		},
		onShow() {
			// uni.setNavigationBarColor({
			// 	frontColor: '#ffffff',
			// 	backgroundColor: '#000',

			// })
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.index {
		width: 100%;
		/* #ifndef H5  */
		min-height: calc(100vh);
		/* #endif */
		/* #ifndef APP-PLUS */
		min-height: calc(100vh - 100rpx);
		/* #endif */
		background: url('/static/Continent/blindBox_bg.png');
		@include backImg;
		// background: #000;

		.container {
			width: 100%;
			height: 100%;
			padding-top: 1050rpx;
			text-align: center;
			// background: url('/static/Continent/blindBox_bg.png');
			// @include backImg;
			//background: red;

			.content {
				p {
					margin-bottom: 40rpx;
				}

				p:nth-child(1) {
					color: #fff;
					font-size: 60rpx;
					font-weight: bold;
				}

				p:nth-child(2) {
					color: #999;
					font-size: 30rpx;
				}
			}

			.back_home {
				p {
					width: 300rpx;
					color: #50442A;
					font-weight: bold;
					padding: 10rpx 20rpx;
					border-radius: 20rpx;
					background: #F0E0BC;
				}
			}
		}
	}
</style>