<template>
	<div class="my_info">

		<view class="header" :style="{backgroundImage:'url(' + info.cover +')','background-size':'cover'}">
			<u-navbar :title="info.name" autoBack placeholder left-icon-color="#fff" bgColor="rgba(0,0,0,0)"
				:fixed="false">
			</u-navbar>
			<!-- 			<view class="user-info flex-colum">

				<image @tap="topage('general/userinfo/index')"
					:src="info.cover?info.cover:'/static/else/avatar.png'" class="user-avatar" mode="widthFix">
				</image>
				<view class="info">
					<view class="user-name-box flex-between">
						<text class="user-name">
							{{info.name||'暂无昵称'}}
						</text>
					</view>
				</view>
			</view> -->
			<view class="a">
				<image :src="info.head_img?info.head_img:'/static/else/avatar.png'" class="a_a" mode="scaleToFill">
				</image>
				<view class="a_b">{{info.name||'暂无昵称'}}</view>
				<view class="a_c"> <u-parse :content="info.content"></u-parse> </view>
			</view>
		</view>

		<view style="padding: 24rpx 32rpx;font-size: 28rpx;font-weight: 500;color: #000000;">发行作品</view>
		<div class="content flex-between">
			<div class="list-box-one" v-for="(item, index) in list" :key="index"
				@tap="toredirect('gather/collect/deatils?id='+item.id)">
				<view class="icon-box">
					<u--image :showLoading="true" :src="item.cover.show_src" width="100%" height="350rpx"></u--image>
				</view>
				<view class="f-box">
					<view class="f-title">{{item.title}}</view>

					<view class="price-box flex-end">
						<text class="t1">&yen;{{item.price}}</text>
					</view>
				</view>
			</div>
		</div>

		<iloading :result="loading"></iloading>

	</div>
</template>

<script>
	import {
		pages
	} from "@/common/mixins/index.js";
	export default {
		mixins: [pages],
		data() {
			return {
				loading: 1,
				info: {},
				list: [],
				brand_id: ""
			}
		},
		onLoad(query) {
			this.brand_id = query.brand_id;
			this.getUserInfo();
			this.getPoolList();
		},

		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},

		methods: {
			async getUserInfo() {
				let res = await uni.ajax.collect_getBrand({
					brand_id: this.brand_id
				})
				if (res) {
					this.info = res.data;
					this.result = 4;
				}
			},
			async getPoolList() {
				let res = await uni.ajax.collect_brandgetPool({
					brand_id: this.brand_id,
					page: this.page,
					limit: uni.conf.limit
				})
				if (res) {
					this.setPagedata('', 'list', res.data.list, 'getPoolList', false);
				}
			},

		}
	}
</script>

<style lang="scss">
	/deep/.u-navbar__content__title {
		color: #fff !important;
	}

	.a {
		margin: 0 32rpx;
		background: #fff;
		border-radius: 24rpx;
		padding: 0 32rpx 28rpx 32rpx;
		margin-top: 112rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.a_a {
			width: 136rpx;
			height: 136rpx;
			border-radius: 50%;
			margin-top: -68rpx;
			text-align: center;
		}

		.a_b {
			margin-top: 24rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #000000;
		}

		.a_c {
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
			line-height: 30rpx;
			margin-top: 24rpx;
		}
	}

	.my_info {
		.content {
			padding: 24rpx 24rpx 0rpx 24rpx;

			.list-box-one {
				width: 48%;
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
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 28rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: bold;
					}

					.price-box {
						margin-top: 24rpx;

						.t1 {
							font-size: 32rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: bold;
							color: #000;
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

		.header {

			padding-bottom: 16rpx;
			min-height: 548rpx;
			width: 100%;
			position: relative;

			.header-logo {
				width: 178rpx;
				height: 40rpx;
				margin-right: 24rpx;
			}

			.fan-info {
				margin-top: 24rpx;

				.fan-desc-box {
					margin-right: 48rpx;

					.num {
						font-size: 40rpx;
						font-weight: bold;
						color: #000;
					}

					.fan-desc {

						font-size: 24rpx;
						color: #999999;
					}
				}

				.attention {
					width: 128rpx;
					height: 52rpx;
					border: 2rpx solid #0092F5;
					border-radius: 8rpx;

					.t1 {
						font-size: 24rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #0092F5;
					}

					.add {
						width: 40rpx;
						height: 40rpx;
					}
				}

			}

			.user-info {

				.user-avatar {
					width: 128rpx;
					background-color: #f5f5f5;

				}

				.info {
					flex: 1;
					flex-wrap: nowrap;
					padding-left: 16rpx;

					.user-name-box {
						width: 100%;

						.user-name {
							letter-spacing: 6rpx;
							margin-top: 24rpx;
							font-size: 32rpx;
							font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: bold;
							color: #000000;
						}

						.user-set {
							width: 180rpx;
							height: 48rpx;
							background: #F5F5F5;
							border-radius: 48rpx;
							font-size: 24rpx;
						}
					}

					.user-id {
						margin: 8rpx 0rpx;
					}

					.user-id,
					.user-address {
						color: #999999;
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;

						.copy {
							margin-left: 10rpx;
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			}
		}
	}
</style>