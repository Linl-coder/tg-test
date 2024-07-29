<template>
	<view class="pagecode">
		<!-- <view class="list-box" v-for="(item,index) in 3" :key="index">
			<view class="t-box flex-between">
				<view class="icon-box">
					<image src="/static/logo.png" class="icon" mode=""></image>
				</view>
				<div class="info">
					<view class="title flex-start">
						<text class="t">XX官方54群</text>
						<u-icon name="qq-fill"></u-icon>
					</view>
					<view class="num">
						成员998
					</view>
				</div>
			</view>
			<view class="code-img">
				<image src="/static/General/code.png" class="icon" mode="widthFix"></image>
			</view>

			<view class="desc flex-center">
				扫一扫二维码，加入社区
			</view>
		</view> -->

		<view class="u-content"><u-parse :content="info"></u-parse></view>

		<!-- <view class="f-btn flex-center">
			分享
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			}
		},
		onShow() {
			this.public_getPactInfo();
		},
		created() {},
		methods: {
			async public_getPactInfo() {
				let res = await uni.ajax.public_getPactInfo({
					type: 5
				})
				if (res) {
					this.info = res.data;
				}
			}
		}
	}
</script>

<style lang="scss">
	.pagecode {
		width: 100%;
		padding: 0rpx 32rpx 32rpx 32rpx;
		box-sizing: border-box;

		.f-btn {
			position: fixed;
			width: 100%;
			width: 100%;
			bottom: 0rpx;
			left: 0rpx;
			height: 96rpx;
			border-radius: 24rpx 24rpx 0rpx 0rpx;
			background: url('@/static/else/old01.png') no-repeat 100%;
			font-size: 32rpx;
			//font-family: font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}

		.list-box {
			margin-bottom: 24rpx;
			background: #FFFFFF;
			box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
			border-radius: 32rpx;

			.code-img {
				padding: 0rpx 32rpx 0rpx 32rpx;

				.icon {
					width: 100%;
				}
			}

			.desc {
				height: 100rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}

			.t-box {
				width: 100%;
				box-sizing: border-box;
				padding: 32rpx;

				.info {
					width: calc(100% - 108rpx);
					padding-left: 16rpx;
					box-sizing: border-box;

					.title {
						white-space: pre-wrap;
						margin-bottom: 8rpx;

						.t {
							font-size: 32rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 500;
							color: #000000;
							margin-right: 8rpx;
						}
					}

					.num {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}

				.icon-box {
					width: 108rpx;
					height: 108rpx;
					border-radius: 100%;
					overflow: hidden;

					.icon {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>