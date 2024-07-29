<template>
	<div class="my_info">

		<view class="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->

			<view class="user-info flex-between">
				<view class="info">
					<view class="user-name-box flex-between">
						<text class="user-name">
							{{info.nickname||'暂无昵称'}}
						</text>
					</view>
					<view class="user-id">
						<text>ID：{{info.user_code}}</text>
						<image src="/static/else/copy.png" @tap="copy(info.user_code)" class="copy" mode=""></image>
					</view>
				</view>
				<image :src="info.avatar?info.avatar:'/static/else/avatar.png'" class="user-avatar" mode=""></image>

			</view>
			<!-- 粉丝 动态 关注 -->
			<!-- <view class="fan-info flex-between">
				<view class="flex-start ">
					<view class="flex-colum fan-desc-box">
						<text class="num">{{info.follow_count||0}}</text>
						<text class="fan-desc" >关注</text>
					</view>
					<view class="flex-colum fan-desc-box">
						<text class="num">{{info.fans_count||0}}</text>
						<text class="fan-desc" >粉丝</text>
					</view>
					<view class="flex-colum fan-desc-box">
						<text class="num">{{info.dynamic||0}}</text>
						<text class="fan-desc" >动态</text>
					</view>
				</view>
				<view class="attention flex-center" @tap="community_zan">
					<image v-if="info.is_follow_count!=1" src="/static/community/add.png" mode="" class="add"></image>
					<text class="t1">{{info.is_follow_count==1?'已关注':'关注'}}</text>
				</view>
			</view> -->
		</view>


		<div class="content flex-between" v-if="loading!=4">
			<div class="list-box-one" v-for="(item, index) in list" :key="index">
				<view class="icon-box" v-if="item.pool">
					<u--image :showLoading="true" :src="item.pool.cover.show_src" width="100%"
						height="350rpx"></u--image>
				</view>
				<view class="f-box">
					<view class="f-title" v-if="item.pool">{{item.pool.title}}</view>
					<view class="f-num">
						<text class="t1">by {{ info.nickname }}</text>
					</view>
					<!-- <view class="price-box flex-end">
						<text class="t1">&yen;{{item.price}}</text>
					</view> -->
					<!-- <view class="price-box">
						<text class="t1">共{{ item.think_count || 0 }}个 寄售{{item.mark_count||0}}个</text>
					</view> -->
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
				author_id: ""
			}
		},
		onLoad(query) {
			this.author_id = query.author_id;
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
				let res = await uni.ajax.collect_getAuthor({
					author_id: this.author_id
				})
				if (res) {
					this.info = res.data;
					this.result = 4;
					if (this.info.is_author == 1) {
						uni.setNavigationBarTitle({
							title: "创作者"
						})
					} else {
						uni.setNavigationBarTitle({
							title: "详情"
						})
					}
				}
			},
			async getPoolList() {
				let res = await uni.ajax.collect_getPool({
					author_id: this.author_id,
					page: this.page,
					limit: uni.conf.limit
				})
				if (res) {
					// #ifdef APP-PLUS
					await uni.utils.sleep(200);
					// #endif
					if (res.data.list) {
						this.setPagedata('', 'list', res.data.list, 'getPoolList', false);
					} else {
						this.setPagedata('', 'list', res.data, 'getPoolList', false);
					}

				}
			},
			async community_zan(index) {
				let res = await uni.ajax.community_zan({
					forum_id: this.author_id,
					type: 2
				})
				if (res) {
					this.info.is_follow_count = this.info.is_follow_count == 1 ? 0 : 1;
					uni.showToast({
						title: "操作成功",
						icon: "none"
					})
				}
			},

		}
	}
</script>

<style lang="scss">
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

		.header {
			background-color: #FFFFFF;
			padding: 32rpx;

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
					height: 128rpx;
					background-color: #f5f5f5;
					border-radius: 100%;
				}

				.info {
					flex: 1;
					flex-wrap: nowrap;
					padding-left: 16rpx;

					.user-name-box {
						width: 100%;

						.user-name {
							font-size: 48rpx;
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