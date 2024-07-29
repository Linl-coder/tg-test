<template>
	<view class="header">
		<view class="nav flex-end">
			<view class="pr">
				<image style="width: 50rpx;height: 50rpx;" mode="widthFix" src="@/static/General/msg_center.png"
					@tap="topage('general/userinfo/msg_center')">
				</image>
				<u-badge type="error" absolute :offset='[0,-10]' :value="bradgeNum?bradgeNum:''"></u-badge>
			</view>
			<image style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" mode="widthFix"
				src="@/static/else/setting.png" @tap="topage('general/userinfo/index')"></image>
		</view>
		<!-- <image class="header-logo" src="/static/index/header-logo.png" mode=""></image> -->
		<view class="user-info flex-start">
			<image @tap="topage('general/userinfo/index')" v-if="is_login"
				:src="user_info.avatar?handleImgUrl(user_info.avatar):'/static/else/avatar.png'" class="user-avatar"
				mode=""></image>
			<image v-else src="/static/else/avatar.png" class="user-avatar" mode="aspectFit"></image>
			<view style="flex:1;display: flex;align-items: center;justify-content: space-between;">
				<view class="info">
					<view class="user-name-box flex-between">
						<view class="user_a" v-if="is_login" @tap="topage('general/userinfo/index')">
							<view>{{user_info.nickname||$t('colleHome.noNikeName')}}</view>
							<!-- <image mode="widthFix" src="@/static/edit.png"></image> -->
						</view>
						<text class="user-name" v-else @tap="topage('general/login/index')">
							{{$t('colleHome.toLogin')}}
						</text>

					</view>
					<view class="user-id" v-if="is_login">
						<text>ID：{{user_info.user_code}}</text>
						<image src="/static/else/copy.png" @tap="copy(user_info.user_code)" class="copy" mode="">
						</image>
					</view>
					<!-- 					<view class="user-id" v-if="is_login">
						<text>余额：{{user_info.balance}}</text> -->
					<!-- <image src="/static/else/copy.png" @tap="copy(user_info.user_code)" class="copy" mode=""></image> -->
					<!-- </view> -->
				</view>
				<!-- 				<view @tap="topage('general/userinfo/index')" class="user-set flex-center">
					个人设置
					<u-icon name="arrow-right" color="#999999" size="12"></u-icon>
				</view> -->
				<!-- <view @tap="topage('general/userinfo/index')" class="set">
					<image mode="widthFix" src="@/static/else/set.png"></image>
				</view> -->
			</view>

		</view>
		<!-- <view class="user-address" v-if="is_login" @tap="copy(user_info.hash)">
			<view>区块链地址：<text>{{hash(user_info.hash)}}</text> </view>
			<image src="/static/copy1.png" class="copy" mode=""></image>
		</view> -->
		<!-- 粉丝 动态 关注 -->
		<!-- 		<view class="fan-info" v-if="is_login">
			<text class="fan-desc" @tap="topage('society/attention')">关注{{user_info.follow_count||0}}</text>
			<text class="fan-desc" @tap="topage('society/vermicelli')">粉丝{{user_info.fans_count||0}}</text>
			<text class="fan-desc"  @tap="topage('society/dynamic')">动态{{user_info.forum_count||0}}</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			bradgeNum: {
				type: Number,
				default: 0
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			is_login() {
				return this.$store.getters.is_login;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user_a {
		display: flex;
		align-items: center;

		view {
			font-size: 40rpx;
			//font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #222222;
		}

		image {
			width: 24rpx;
			margin-left: 8rpx;
		}
	}

	.header {
		padding-top: 90rpx;

		// background-color: #FFFFFF;
		// padding: 32rpx;
		.nav {

			//background: red;

		}

		.header-logo {
			width: 178rpx;
			height: 40rpx;
			margin-right: 24rpx;
		}

		.fan-info {
			margin-top: 24rpx;

			.fan-desc {
				margin-right: 48rpx;
				font-size: 24rpx;
			}
		}

		.user-info {

			// margin-top: 24rpx;
			.user-avatar {
				width: 104rpx;
				height: 104rpx;
				background-color: #f5f5f5;
				// border-radius: 100%;
				border-radius: 50%;
				// border: 1px solid rgba(0,0,0,0.1);
			}

			.info {
				height: 104rpx;
				flex: 1;
				flex-wrap: nowrap;
				padding-left: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.user-name-box {
					width: 100%;

					.user-name {
						font-size: 32rpx;
						//font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: bold;
						color: #000000;
					}

				}

				.user-id {
					// margin: 8rpx 0rpx;
				}

				.user-id {
					font-size: 24rpx;
					//font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #222222;
					display: flex;
					align-items: center;

					.copy {
						margin-left: 15rpx;
						width: 24rpx;
						height: 24rpx;
					}
				}
			}
		}
	}

	.user-address {
		margin-top: 24rpx;
		display: flex;
		align-items: center;

		view {
			font-size: 26rpx;
			//font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;

			text {
				font-size: 26rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #000000;
			}
		}

		.copy {
			margin-left: 10rpx;
			width: 24rpx;
			height: 24rpx;
		}
	}

	.user-set {
		background: #F5F5F5;
		border-radius: 48rpx;
		font-size: 22rpx;
		//font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		border: 1rpx solid #E0E0E0;
		display: flex;
		padding: 6rpx 16rpx;

		/deep/ .u-icon {
			margin-left: 6rpx;
		}
	}

	.set {
		width: 56rpx;
		height: 56rpx;

		image {
			width: 100%;
		}
	}
</style>