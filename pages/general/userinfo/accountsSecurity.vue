<template>
	<view class="index">
		<view class="list-box">
			<!-- real name security -->
			<!-- 	<view class="list flex-between" @tap="tocertification()">
				<view class="flex-start">
					<image src="/static/General/i7.png" class="icon" mode=""></image>
					<text class="t1">{{$t('userInfoAccSec.relNameAuth')}}</text>
				</view>
				<view class="flex-end">
					<text
						class="t3">{{user_info.cert_id<1?$t('userInfoAccSec.notAuth'):$t('userInfoAccSec.haveAuth')}}</text>
					<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
				</view>
			</view> -->

			<!-- <view class="list flex-between" @tap="topage('general/userinfo/setpwd?type=3')">
				<view class="flex-start">
					<image src="/static/General/i10.png" class="icon" mode=""></image>
					<text class="t1">手机号</text>
				</view>
				<view class="flex-end">
					<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
				</view>
			</view> -->
			<view class="list flex-between" @tap="topage('general/userinfo/setpwd?type=1')">
				<view class="flex-start">
					<image src="/static/General/setPsw1.png" class="icon" mode=""></image>
					<text class="t1">{{$t('userInfoAccSec.payPsw')}}</text>
				</view>
				<view class="flex-end">
					<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
				</view>
			</view>
			<view class="list flex-between" @tap="topage('general/userinfo/setpwd?type=2')">
				<view class="flex-start">
					<image src="/static/General/setPsw2.png" class="icon" mode=""></image>
					<text class="t1">{{$t('userInfoAccSec.loginPsw')}}</text>
				</view>
				<view class="flex-end">
					<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
				</view>
			</view>
			<view class="list flex-between" @tap="topage('general/userinfo/setpwd?type=4')">
				<view class="flex-start">
					<image src="/static/General/setPsw2.png" class="icon" mode=""></image>
					<text class="t1">{{$t('setPwd.logOffAccount')}}</text>
				</view>
				<view class="flex-end">
					<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
				</view>
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
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('userInfoAccSec.accountSecur')
			})
		},
		methods: {
			tocertification() {
				if (this.user_info.cert_id < 1) {
					this.topage('general/userinfo/certification')
				} else {
					this.topage('general/userinfo/authSuccess')
				}
			}
		}
	}
</script>

<style lang="scss">
	// /deep/.u-icon__icon span {
	// 	font-family: uicon-iconfont !important;
	// }

	page {
		background-color: #FFFFFF;
	}

	.index {
		.list-box {
			padding: 0rpx 32rpx;

			.list {
				height: 100rpx;
				border-bottom: 1rpx solid #F0F0F0;

				.t1 {
					font-size: 28rpx;
					color: #000000;
				}

				.t2 {
					color: #999999;
					font-size: 28rpx;
				}

				.t3 {
					color: var(--theme);
					font-size: 28rpx;
				}

				.copy {
					width: 28rpx;
					height: 28rpx;
					margin-left: 16rpx;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 16rpx;
				}
			}
		}

	}
</style>