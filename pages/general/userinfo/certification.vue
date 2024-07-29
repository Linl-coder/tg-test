<template>
	<view class="cardAuth">
		<view class="desc_box">
			<view class="desc_title">
				<text class="t">{{$t('userInfoCertif.identityAuth')}}</text>
			</view>
			<view class="desc">
				<text class="t">
					{{$t('userInfoCertif.bindTip')}}

				</text>
			</view>
		</view>

		<view class="form_box">
			<view class="form_input flex-between" style="margin-bottom: 20rpx;">
				<u--input :placeholder="$t('userInfoCertif.plsInputName')" fontSize="32rpx" color="#999999" type="type"
					:clearable="true" border="none" v-model="form.username"></u--input>
			</view>
			<view class="form_input flex-between" style="margin-bottom: 20rpx;">
				<u--input :placeholder="$t('userInfoCertif.plsInputID')" fontSize="32rpx" color="#999999" type="type"
					:clearable="true" border="none" v-model="form.number"></u--input>
			</view>


			<view class="form_btn flex-center" @tap="auth()">
				<text class="t"> {{$t('userInfoCertif.submitAuth')}}</text>
			</view>


		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				form: {
					username: "",
					number: ""
				}
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onLoad() {
			this.phone = uni.utils.hide_phone(this.user_info.mobile);
		},
		methods: {
			async auth() {
				await uni.utils.is_null(this.form.username, this.$t('userInfoCertif.plsInputName'))
				await uni.utils.is_null(this.form.number, this.$t('userInfoCertif.plsInputID'))
				let res = await uni.ajax.public_applyCert(this.form);
				if (res) {
					uni.set_userInfo({
						cert_id: 1,
						cert: {
							number: this.form.number,
							username: this.form.username
						}

					})

					this.toredirect("general/userinfo/authSuccess")
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.cardAuth {
		padding: 24rpx 32rpx;

		.form_box {
			margin-top: 100rpx;

			.form_input {
				height: 88rpx;
				background: #F4F4F4;
				border-radius: 24rpx;
				padding-left: 32rpx;
				margin-bottom: 24rpx;
				border: 3rpx solid #E6E6E6;
			}

			.form_desc {
				.t {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 28rpx;
				}
			}
		}

		.form_btn {
			margin-top: 72rpx;
			height: 96rpx;
			// background: url('@/static/else/old01.png') no-repeat 100%;
			background: var(--linear-gradient-theme);
			box-shadow: var(--btn-shadow);
			border-radius: 16rpx;

			.t {
				font-size: 28rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 33rpx;
			}
		}

		.desc_box {
			.desc_title {
				margin-bottom: 16rpx;

				.t {
					font-size: 48rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000;
					line-height: 56rpx;
				}
			}

			.desc {
				.t {
					font-size: 26rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
				}
			}
		}
	}
</style>