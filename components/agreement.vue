<template>
	<view class="agreement" :class="[
     from == 'login' ? 'flex-start' : 'flex-center',
       lang === 'zh-CN'|| lang === 'zh-HK' ? 'agreement-zh' : 'agreement-else'
   ]" :style="{ width: width }">
		<view class="radio-box" @tap="set_agreement">
			<view class="radio" v-show="!is_agreement"></view>
			<image src="/static/General/selected.png" v-show="is_agreement" class="radio_active" mode=""></image>
		</view>
		<view class="desc-box">
			<text class="t1" @tap="set_agreement">{{$t('login.readAndAgree')}}</text>
			<text @tap="topage('general/article/index?type=2&pagetype=agreement')"
				class="t1 t2">{{$t('login.privacyPolicy')}}</text>
			<!-- 	<text class="t1">{{$t('utils.and')}}</text>
			<text @tap="topage('general/article/index?type=1&pagetype=agreement')"
				class="t1 t2">{{$t('login.userAgreement')}}</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appName: getApp().globalData.appName,
				// language: uni.getStorageSync('locale')
			};
		},
		props: {
			width: {
				type: String,
				default: ''
			},
			is_agreement: {
				type: Boolean,
				default: false
			},
			lang: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#FFFFFF'
			},
			type: {
				type: String,
				default: '1'
			},
			from: {
				type: String,
				default: 'login'
			}
		},
		onLoad() {

		},
		onShow() {
			// console.log("lang==>", this.appName);
		},
		created() {
			if (uni.getStorageSync("is_agreement") == true) {
				this.$emit('set_agreement', true);
			}
		},
		mounted() {},
		methods: {
			set_agreement() {
				this.$emit('set_agreement', !this.is_agreement);
				uni.setStorageSync("is_agreement", !this.is_agreement);
			}
		}
	};
</script>

<style lang="scss">
	.agreement-zh {
		font-size: 26rpx;
		//background: yellow;
	}

	.agreement-else {
		font-size: 21rpx;
		//background: red;
	}

	.agreement {
		//background: yellow;
		// padding-left: 16rpx;

		.radio-box {
			margin-top: 4rpx;
			margin-right: 10rpx;
			border-radius: 100%;

			.radio {
				width: 28rpx;
				height: 28rpx;
				opacity: 1;
				border: 2rpx solid #999999;
				box-sizing: border-box;
				border-radius: 100%;
				margin-right: 4rpx;
			}

			.radio_active {
				width: 28rpx;
				height: 28rpx;
				margin-right: 4rpx;
				// background-color: #0092f5;
				border-radius: 100%;
			}
		}

		.desc-box {
			// flex: 1;
			white-space: pre;

			.t1 {
				/* #ifdef H5 */
				text-align: justify;
				/* #endif */

				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}
		}

	}
</style>