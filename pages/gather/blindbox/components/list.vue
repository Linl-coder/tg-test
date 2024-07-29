<template>
	<view class="list" id="list">
		<div class="list-box-one" v-for="(item, index) in list" :key="index" @tap="open_card(item,index)">
			<view class="icon-box">
				<u--image :showLoading="true" :src="item.box.cover.show_src" width="100%" height="350rpx"></u--image>
				<view class="icon-tips" v-show="item.status==2">
					<image src="/static/Gather/i1.png" class="icon" mode=""></image>
					<text class="t1">寄售中</text>
				</view>
			</view>
			<!-- 卡牌标识 -->
			<view class="f-box">
				<view class="f-title">{{ item.box.title }}</view>
				<view class="f-num">
					<text class="t1">&yen;</text>
					<text class="t2">{{ item.price }}</text>
				</view>
				<view class="price-box">
					<!-- <text class="t1">共{{ item.think_count || 0 }}个 寄售{{item.mark_count||0}}个</text> -->
					<text class="t1">共{{ item.think_count || 0 }}个</text>
				</view>
			</view>
		</div>
		<card ref="card"></card>
	</view>
</template>

<script>
	let img_info = null;
	import card from './card.vue';
	export default {
		components: {
			card
		},
		props: {
			list: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		async mounted() {
			img_info = await uni.utils.info_distance('list');
		},
		methods: {
			setimgh(width, height) {
				return uni.utils.set_imgh(width, height, img_info.width) + 'px';
			},
			open_card(val, index) {
				// this.$refs.card.open(val.box_id,this.list[index]);

				switch (val.status) {
					case 1:
						this.topage("gather/blindbox/mydetails?id=" + val.id)
						break;
					case 2:
						this.topage("gather/market/details?mark_id=" + val.mark.id + "&buy_type=2")
						break;
					default:
						break;
				}

			},
			to_details(item) {
				this.popup_show = false;
				switch (item.status) {
					case 1:
						this.topage("gather/blindbox/mydetails?id=" + item.id)
						break;
					case 2:
						this.topage("gather/market/details?mark_id=" + item.mark.id + "&buy_type=2")
						break;
					default:
						break;
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	.list {
		.list-box-one {
			margin-bottom: 24rpx;
			box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
			background-color: #ffffff;
			border-radius: 24rpx;
			overflow: hidden;
			position: relative;
			-webkit-backface-visibility: hidden;
			-webkit-transform: translate3d(0, 0, 0);

			.icon-box {
				width: 100%;
				position: relative;

				.icon {
					width: 100%;
				}

				.icon-tips {
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0rpx;
					top: 0rpx;
					display: flex;
					background: rgba(0, 0, 0, 0.4);
					padding: 15rpx 0rpx 0rpx 15rpx;
					box-sizing: border-box;

					.icon {
						width: 32rpx;
						height: 32rpx;
					}

					.t1 {
						padding-left: 16rpx;
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						line-height: 28rpx;
						background: linear-gradient(180deg, #07ebfe 0%, #4daffe 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}

			.f-box {
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;

				.f-title {
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.f-num {
					margin-top: 12rpx;

					.t1 {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
					}

					.t2 {
						padding-left: 6rpx;
						font-size: 36rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: bold;
						color: #000000;
					}

					.t3 {
						margin: 0rpx 8rpx;
					}
				}

				.price-box {
					margin-top: 24rpx;

					.t1 {
						font-size: 22rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #999999;
					}

					.t2 {
						font-size: 32rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #fe3333;
					}
				}
			}
		}
	}
</style>