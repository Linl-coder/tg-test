<template>
	<view class="assets ">
		<view class="assets-box-one" v-if="type==1">
			<!-- <view class="assets-item flex-between" @tap="topage(item.link)" v-for="(item,index) in list" :key="index">
				<view class="flex-start">
					<image :src="item.icon" class="icon" mode=""></image>
					<text class="t1">{{item.title}}</text>
				</view>
				<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
			</view> -->



			<!-- <view class="a_list" @tap="topage('gather/order/orderlist')">
				<image mode="widthFix" src="@/static/else/ma.png"></image>
			</view>
			<view class="a_list" @tap="topage('gather/wallet/wallet')">
				<image mode="widthFix" src="@/static/else/mb.png"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			type: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.assets {
		.assets-box-one {
			// padding: 0 20rpx;
			// background-color: #FFFFFF;
			border-radius: 24rpx;
			display: flex;
			justify-content: space-between;

			.assets-item {
				width: 33.3%;
				padding-right: 8rpx;
				box-sizing: border-box;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 8rpx;
				}

				.t1 {
					font-size: 26rpx;
				}
			}
		}
	}

	.a_list {
		width: 48%;

		image {
			width: 100%;
		}
	}
</style>