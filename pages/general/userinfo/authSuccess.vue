<template>
	<div class="authSuccess">
		<div class="header">

			<text class="t1">亲爱的用户！您已完成身份认证！</text>


			<view class="success-box flex-colum">
				<image src="/static/success.png" style="width: 200rpx;height: 200rpx;" mode=""></image>
				<text class="t2">已认证</text>
			</view>

			<view class="list-box">
				<div class="list_item flex-between">
					<div class="flex-start">
						<text class="l_t">姓名</text>
					</div>
					<div class="flex-end">
						<text class="l_t">{{name}}</text>
					</div>
				</div>



				<div class="list_item flex-between">
					<div class="flex-start">
						<text class="l_t">身份证号码</text>
					</div>
					<div class="flex-end">
						<text class="l_t">{{cardid}}</text>
					</div>
				</div>
			</view>

		</div>




	</div>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				name: "",
				cardid: ""
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onLoad() {
			this.phone = uni.utils.hide_phone(this.user_info.mobile);
			this.name = uni.utils.hide_name(this.user_info.cert.username);
			this.cardid = this.user_info.cert.number.replace(/^(\d{6})\d{8}(.{4}$)/g, `$1${Array(9).join('*')}$2`);
		},
		methods: {
			back() {
				uni.pro.switchTab("home/index")
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.authSuccess {
		// background-color: red;

		.header {
			position: relative;

			padding: 24rpx;

			.t1 {
				font-size: 36rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #353535;
			}

			.success-box {
				margin-top: 200rpx;
			}

			.list-box {
				margin-top: 56rpx;
				background: #F4F4F4;
				border-radius: 24rpx;

				.list_item {
					height: 88rpx;
					margin-top: 24rpx;
					padding: 0rpx 32rpx;

					.icon {
						width: 35rpx;
						height: 35rpx;
						margin-right: 21rpx;
					}

					.l_t {
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000;

					}
				}
			}
		}
	}
</style>