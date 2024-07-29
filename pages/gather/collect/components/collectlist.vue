<template>
	<view class="collect-list" :id="'collect-list' + current">
		<view v-if="show" v-for="(item, index) in list" :key="index" class="list-one" @tap="buy_card(item)"
			:class="{ 'list-one-active': current == 0 &&index==0}">
			<view class="icon-box">
				<view class="collect-img" :style="{'height':'328rpx'}">
					<img :src="item.cover.show_src" />
					<!-- <u-image :showLoading="true" :src="item.cover.show_src" width="100%" height="468rpx" radius="4rpx"></u-image>					 -->
				</view>
				<!-- 已售罄 -->
				<view class="icon-tips flex-start" v-show="item.virtual==1">
					<image src="/static/Continent/i51.png" class="icon" mode=""></image>
				</view>
			</view>
			<view class="f-box">
				<view class="title u-line-2">{{ item.title }}</view>
				<view class="f_d">
					<view class="pri">
						￥
						<text>{{item.price.split('.')[0]}}.</text>
						{{item.price.split('.')[1]}}
					</view>
					<view class="buy_num">
						{{item.personCount ? item.personCount:0}}人付款
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		collectdata_list
	} from '@/pages/gather/list.js';
	export default {
		props: {
			current: {
				type: Number,
				default: 0
			},
			info: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				show: false,
				list: []
			};
		},
		created() {
			this.list = collectdata_list.slice(this.info.begin, this.info.end);
		},
		mounted() {
			this.set_img_info();
		},
		methods: {
			buy_card(item) {
				// if (item.virtual != 1) {
				//   this.totab("collect/mainland/index");
				// }
			},
			time_end(index) {
				this.list[index].is_time = 2;
			},
			async set_img_info() {
				let img_info = await uni.utils.info_distance('collect-list' + this.current);
				await uni.utils.sleep(30);
				this.list.forEach((item, index) => {
					item.cover.imgheight = img_info.width * 0.94 + "px";
					// item.cover.imgheight = uni.utils.set_imgh(item.cover.width, item.cover.height, img_info.width * 0.94) + 'px';
					if (this.list.length - 1 == index) {
						this.$nextTick(() => {
							this.show = true;
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.f_c {
		margin-top: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.f_c_a {
			display: flex;
			align-items: center;

			view {
				font-size: 22rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;

				&:nth-child(2) {
					margin-left: 6rpx;
				}
			}
		}

		.f_c_b {
			font-size: 40rpx;
			font-family: Tahoma-Bold, Tahoma;
			font-weight: bold;
			color: #000000;
		}
	}

	.f_d {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 24rpx;

		.pri {
			font-size: 20rpx;
			font-family: HarmonyOS Sans-Medium, HarmonyOS Sans;
			font-weight: 500;
			color: #333333;
			line-height: 28rpx;

			text {
				font-size: 32rpx;
				font-family: HarmonyOS Sans-Medium, HarmonyOS Sans;
				font-weight: 500;
				color: #333333;
				line-height: 28rpx;
			}
		}

		.buy_num {
			font-size: 20rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 36rpx;
		}
	}

	.f_b {
		margin-top: 16rpx;
		display: flex;
		align-items: center;

		view:nth-child(1) {
			padding: 4rpx 14rpx;
			background: #1777FF;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-size: 22rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #ffffff;
		}

		view:nth-child(2) {
			padding: 4rpx 14rpx;
			background: #EBF3FF;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-size: 22rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #1777FF;
			margin-left: 8rpx;
		}
	}

	.collect-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.list-one {
			background-color: #ffffff;
			// padding: 3%;
			box-sizing: border-box;
			width: 332rpx;
			border-radius: 24rpx;
			box-shadow: 0px 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.04);
			overflow: hidden;
			margin-bottom: 24rpx;

			.f-box {
				padding: 12rpx;

				// padding-top: 12rpx;
				.price-box {
					.price {
						font-size: 40rpx;
						font-weight: bold;
					}
				}

				.tips-box {
					.tips-left {
						width: 72rpx;
						height: 48rpx;
						background: #000000;
						font-size: 24rpx;
						color: #ffffff;
						border-radius: 8rpx 0rpx 0rpx 8rpx;
					}

					.tips-right {
						height: 48rpx;
						min-width: 100rpx;
						box-sizing: border-box;
						padding: 0rpx 8rpx;
						border: 1rpx solid #000;
						font-size: 24rpx;
						border-radius: 0rpx 8rpx 8rpx 0rpx;
					}
				}

				.title {

					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.desc {
					margin: 16rpx 0rpx;
					white-space: pre-wrap;

					.desc-text {
						font-size: 28rpx;
						color: #000000;
						font-weight: 500;
						margin-right: 24rpx;
					}

					.desc-author {
						padding: 4rpx 12rpx;
						border-radius: 4rpx;
						font-size: 22rpx;
						background: rgba(7, 235, 254, 0.15);
					}
				}
			}

			.icon-box {
				box-sizing: border-box;
				width: 100%;
				position: relative;
				padding: 24rpx;

				.collect-img {
					border-radius: 4rpx;
					width: 100%;
					overflow: hidden;
					position: relative;
					-webkit-backface-visibility: hidden;
					-webkit-transform: translate3d(0, 0, 0);

					img {
						width: 100%;
						height: 328rpx;
					}

					.mask {
						position: absolute;
						left: 0rpx;
						top: 0rpx;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.4);

						.mask-icon {
							width: 300rpx;
							height: 300rpx;
						}
					}
				}

				.icon-tips {
					position: absolute;
					left: 0rpx;
					top: 0rpx;
					width: 100%;
					height: 100%;
					background: rgba(192, 192, 192, 0.9);
					box-sizing: border-box;

					.icon {
						width: 90rpx;
						height: 83rpx;
						right: 0rpx;
						top: 0rpx;
						position: absolute;
					}
				}
			}
		}

		.list-one-active {
			// border-radius: 0rpx 24rpx 24rpx 24rpx;
		}
	}
</style>