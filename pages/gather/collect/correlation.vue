<template>
	<view class="correlation">
		<view class="list flex-between">
			<div class="list-box-one" v-for="(item, index) in list" :key="index" @tap="set_correlation(item)">
				<view class="icon-box">
					<u--image :showLoading="true" :src="item.cover.show_src" width="100%"
						height="350rpx"></u--image>
				</view>
				<view class="f-box">
					<view class="f-title">{{ item.title }}</view>
					
					<!-- <view class="price-box">
						<text class="t1">共{{ item.think_count || 0 }}个 寄售{{item.mark_count||0}}个</text>
					</view> -->
				</view>
			</div>		
		</view>
		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	import {
		pages
	} from "@/common/mixins/index.js";
	export default {
		mixins: [pages],
		data() {
			return {
				list: [],
				loading: 1,
			}
		},
		created() {
			this.community_getPool();
		},
		methods: {
			async community_getPool() {
				let res = await uni.ajax.community_getPool({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {
					this.setPagedata('', 'list', res.data, 'community_getPool', false);
				}
			},
			set_correlation(item){
				uni.setStorageSync("correlation_data",item);
				this.toback();
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.correlation {
		padding-top: 24rpx;
		.list {
		    padding: 0rpx 24rpx;
			.list-box-one {
				width: 49%;
				margin-bottom: 24rpx;
				box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
				background-color: #ffffff;
				border-radius: 24rpx;
				overflow: hidden;
				-webkit-backface-visibility: hidden;
				-webkit-transform: translate3d(0, 0, 0);

				.icon-box {
					width: 100%;

					.icon {
						width: 100%;
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
					}

					.f-num {
						margin-top: 12rpx;

						.t1 {
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
						}

						.t2 {
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
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
	}
</style>