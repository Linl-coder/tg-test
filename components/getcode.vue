<template>
	<view class="getcode">
		<!-- {{email}}-- email -->
		<view class="getcode-box" @click="confirmUse">
			<text class="get-code" :class="color==='black'?'black':'white'" v-text="$t('login.sendSmsCode')"
				v-show="time == 60"></text>
			<text class="get-code" :class="color==='black'?'black':'white'" v-text="$t('login.sendAgain') + time + 's)'"
				v-show="time < 60"></text>
		</view>
		<!-- <captcha ref="captcha" @message="sendCode" :mobile="mobile"></captcha> -->
	</view>

</template>

<script>
	import captcha from '@/components/captcha.nvue'
	import debounce from 'lodash/debounce';
	export default {
		components: {
			captcha
		},
		data() {
			return {
				time: 60,
				countdownTimer: null
			};
		},
		props: {
			desc: {
				//验证码文字
				type: String,
				default: ''
			},
			tel: {
				type: String,
				default: ''
			},
			email: {
				type: String,
				default: ''
			},
			type: {
				//验证码类型
				type: Number,
				default: 1
			},
			color: {
				type: String,
				default: 'white'
			},
			device_sn: {
				type: String,
				default: ''
			}

		},
		created() {},
		methods: {
			countdown() {
				this.time = this.time - 1;
				this.countdownTimer = setTimeout(() => {
					if (this.time > 1) {
						this.countdown();
					} else {
						clearTimeout(this.countdownTimer);
						this.time = 60;
						this.countdownTimer = null;
					}
				}, 1000);
			},
			confirmUse: debounce(function() {
				// 要实现的业务逻辑
				this.startCountdown();
			}, 1000, {
				leading: true,
				trailing: false
			}),
			startCountdown() {
				if (this.countdownTimer != null) return false;
				this.sendCode();
			},
			async sendEmailCode() {
				//获取验证码
				await uni.utils.is_phone(this.email, this.$t('regis.plsInputEmail'));
				let res = await uni.ajax.public_sendEmailVerifyCode({
					email: this.email,
					type: this.type,
				});
				if (res) {
					uni.$u.toast("send success!");
					this.countdown();
				}
			},
			//发送手机号验证码
			async sendCode() {
				//获取验证码
				await uni.utils.is_phone(this.tel, this.$t('foget.needCorrectPhone'), this.$t(
					'login.plsInputPhone'));
				let res = await uni.ajax.public_sendPhoneVerifyCode({
					tel: this.tel,
					type: this.type,
					device_sn: this.device_sn
				});
				this.countdown();
				if (res) {
					console.log(res)
					uni.$u.toast("send success!");
				} else {
					console.log(res)
				}
			}
		}
	};
</script>

<style lang="scss">
	.getcode {
		background-color: #FFB040;
		// color: #fff;
		padding: 10rpx 10rpx;
		border-radius: 10rpx;

		.getcode-box {
			.get-code {
				// color: var(--theme);
				font-size: 24rpx;
			}
		}
	}

	.black {
		color: #ccc;
	}

	.white {
		color: #ffffff;
	}
</style>