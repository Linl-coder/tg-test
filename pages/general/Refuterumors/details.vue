<template>
	<view class="index container">


		<view class="rumor">
			<view class="item">
				<view class="">
					<view class="">
						<view class="">
							<view class="">
								<image :src="'/static/else/avatar.png'" mode=""
									style="width: 52rpx;height: 52rpx;border-radius: 50%;"></image>
								<!-- <view class="jia" v-if="colours.re_prep =='假'">
									<image src="/static/find/10.png" mode="widthFix" style="width: 280rpx;"></image>
								</view> -->
								<view class="jia" v-if="colours.rumou_type==2">
									<image  src="/static/Gather/1.png" mode="widthFix" style="width: 280rpx;"></image>
								</view>
								<view class="jia" v-if="colours.rumou_type==1">
									<image  src="/static/Gather/2.png" mode="widthFix" style="width: 280rpx;"></image>
								</view>
							</view>

							<view class="">
								匿名用户
							</view>
						</view>
						<view class="">
							{{colours.add_time}}
						</view>
					</view>
					<view class="">
						<view class="">
							{{colours.title}}
						</view>
						<view class="img">

							<view class="" v-for="(item1,index1) in colours.files" :key="index1">
								<image :src="item1" mode="widthFix" style="width:686rpx;border-radius: 24rpx;">
								</image>
							</view>
						</view>
					</view>
				</view>
				<view class="reply">
					<view class="">
						<image src="/static/logo.png" mode="widthFix" style="width: 52rpx;"></image>
					</view>
					<view class="">
						官方回复:<text>{{colours.replay_text ||'暂未回复'}}</text>
					</view>
				</view>


			</view>

		</view>

		
		
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {

				colours: {}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getRumorDetail()
		},
		watch: {

		},
		
		methods: {
			
getRumorDetail() {
				uni.ajax.getRumorDetail({
					rumou_id: this.id
				}).then(res => {
					this.colours = res.data
				})
			},





		}
	}
</script>

<style scoped lang="less">
	.index {
	}

	.head_bar1 {
		display: flex;
		width: 100%;
		font-weight: 400;
		color: #999999;
		font-size: 32rpx;
		height: 88rpx;
		align-items: center;

		>view {
			height: 88rpx;
			display: flex;
			flex-direction: column;
			margin-top: 64rpx;
			margin-left: 56rpx;
		}

		// >view {
		// 	margin-left: 56rpx;
		// 	height: 88rpx;
		// }

		>view:first-child {
			margin-left: 32rpx;
		}

		.syColor {
			color: #000;
			font-weight: bold;
			font-size: 32rpx;
		}

		.syColor1 {
			background: #6E4DFF;
			width: 58rpx;
			height: 12rpx;
			margin: auto;
			border-radius: 8rpx;
		}
	}

	.whole {
		// background: url(/static/find/1.png) no-repeat;
		// background-size: 100% 100%;
		width: 686rpx;
		height: 70rpx;
		// margin: auto;
		white-space: nowrap;
	}

	.label {
		box-sizing: border-box;
		color: #043E4A;
		margin-top: 48rpx;

		.head_bar {
			>view {
				display: inline-block;
				// width: 180rpx;
				height: 62rpx;
				margin-right: 16rpx;
				margin-top: 4rpx;
				text-align: center;
				line-height: 62rpx;
				color: #999;
				padding: 0 24rpx;
			}

			>view:first-child {
				margin-left: 32rpx;
			}

			.syColor {
				display: inline-block;
				// width: 180rpx;
				height: 62rpx;
				margin-right: 16rpx;
				text-align: center;
				border: 1px solid #999999;
				border-radius: 48rpx;
				color: #000;
				font-weight: 600;
			}
		}
	}

	.notice_list {
		margin-top: 32rpx;

		>view {
			// background: #fff;
			width: 686rpx;
			height: 144rpx;
			display: flex;
			justify-content: space-between;
			margin: auto;
			margin-bottom: 24rpx;
			color: #000;
			// padding: 24rpx 24rpx 32rpx 24rpx;
			border-bottom: 1px solid #ddd;
			margin-bottom: 40rpx;
			padding-bottom: 40rpx;

			>view:first-child {
				font-size: 28rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 400rpx;
				margin-right: 24rpx;

				>view:last-child {
					display: flex;
					justify-content: space-between;
					align-items: center;

					>view:first-child {
						// color: #FFDEB3;
						border-radius: 8rpx;
						// border: 1px solid rgba(255, 222, 179, 1);
						font-size: 24rpx;
						width: 120rpx;
						text-align: center;
						line-height: 40rpx;
					}

					.a {
						border: 1px solid #D7A040;
						color: #D7A040;
						background: #FEF7ED;
					}

					.b {
						border: 1px solid #33B268;
						color: #33B268;
						background: #E6F9D9;
					}

					.c {
						border: 1px solid #6C83D3;
						color: #6C83D3;
						background: #F4F7FF;
					}

					>view:last-child {
						color: #999;
						border-radius: 8rpx;
						font-size: 20rpx;
					}
				}
			}

		}
	}


	.news_list {
		margin-top: 32rpx;

		>view {
			width: 686rpx;
			margin: 0 auto 24rpx;
			color: #000;
			border-radius: 24rpx;

			>view:last-child {
				font-size: 28rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-top: 32rpx;

				>view:last-child {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 32rpx;

					>view:first-child {
						color: #6C83D3;
						border-radius: 8rpx;
						border: 1px solid #6C83D3;
						font-size: 24rpx;
						width: 124rpx;
						text-align: center;
						line-height: 40rpx;
						background: #F4F7FF;
					}

					>view:last-child {
						color: #999999;
						border-radius: 8rpx;
						font-size: 20rpx;
					}
				}
			}

		}
	}

	.rumor {
		padding: 0 32rpx;
		margin-top: 16rpx;
		position: relative;

		.img {
			display: flex;
			flex-wrap: wrap;

			image {
				margin-right: 50rpx;
			}
		}

		>view>view:first-child {
			margin-bottom: 32rpx;
			padding-bottom: 32rpx;
			border-bottom: 1px solid #E5E5E5;

			>view:first-child {
				display: flex;
				justify-content: space-between;
				align-items: center;

				>view:first-child {
					display: flex;
					align-items: center;
					font-size: 26rpx;

					image {
						margin-right: 16rpx;
					}

				}

				>view:last-child {
					color: #000000;
					font-size: 24rpx;
				}
			}

			>view:last-child {
				margin-top: 24rpx;

				>view:last-child {
					margin-top: 32rpx;
				}
			}
		}

		.reply {
			width: 686rpx;
			background: rgba(110, 77, 255, 0.10);
			height: 88rpx;
			margin-bottom: 32rpx;
			display: flex;
			align-items: center;
			color: #000;
			font-size: 28rpx;
			border-radius: 8rpx;
			font-weight: bold;

			image {
				margin: 34rpx 26rpx 26rpx;
			}

			text {
				margin-left: 16rpx;
				font-weight: normal;
			}
		}

		.jia {
			position: absolute;
			// right: 0;
			margin-left: 200rpx;
			margin-top: 260rpx;
			z-index: 999;
		}

	}

	.release {
		position: absolute;
		right: 0;
		margin-right: 36rpx;
		bottom: 0;
		margin-bottom: 80rpx;
		background: linear-gradient(to right, #6E4DFF, #2CF4FF);
		border-radius: 50%;
		width: 120rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 36rpx;
			height: 36rpx;
		}
	}
</style>
