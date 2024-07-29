<template>
	<view class="keyboard">
		<u-keyboard ref="uKeyboard" :overlay="true" @cancel="cancel" mode="number" @change="valChange"
			@backspace="backspace" @confirm="confirm" :show="show_uKeyboard" :tooltip="false"
			:safeAreaInsetBottom="true">
			<view class="code_box ">
				<view class="popup_title flex-center">
					<view class="close flex-center" @tap="cancel"><u-icon name="close" color="#000" size="20"></u-icon>
					</view>
					<view class="title flex-colum">
						<text>{{$t('keyBoard.plsInputPsw')}}</text>
						<text
							class="t">{{$t('keyBoard.plsInput')}}{{appName}}{{$t('keyBoard.payPsw')}},{{$t('keyBoard.toVerify')}}</text>
					</view>
				</view>
				<view class="code_box_title flex-between"></view>
				<view class="flex-center "><u-code-input :dot="true" v-model="password"
						:disabledKeyboard="true"></u-code-input></view>
				<view class="code_box_title flex-end" style="border: 0rpx;"
					@tap="topage('general/userinfo/setpwd?type=1')"><text class="t"
						style="color: #0092F5;">{{$t('keyBoard.forgetPsw')}}</text></view>
			</view>
		</u-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show_uKeyboard: false,
				appName: getApp().globalData.appName,
				password: ""
			};
		},
		methods: {
			open() {
				this.show_uKeyboard = true;
			},
			cancel() {
				this.show_uKeyboard = false;
				this.password = '';
			},
			confirm() {

			},
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.password += val;
				if (this.password.length >= 6) {
					this.$emit("confirm", this.password);
					this.cancel();
				}
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.password.length) this.password = this.password.substr(0, this.password.length - 1);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.keyboard {
		/deep/.u-popup__content {
			background: none !important;
		}

		.code_box {
			border-radius: 24rpx 24rpx 0rpx 0rpx;

			padding: 30rpx 0rpx;
			background: #ffffff;

			.code_box_title {
				border-top: 1rpx solid #f0f0f0;
				padding-top: 30rpx;

				.t {
					font-size: 28rpx;
					color: #808080;

					padding: 0rpx 30rpx;
				}
			}

			.popup_title {
				margin-bottom: 30rpx;
				position: relative;

				.title {
					font-size: 30rpx;
					font-weight: bold;

					.t {
						color: #c1c1c1;
						font-weight: 500;
						font-size: 24rpx;
					}
				}

				.close {
					position: absolute;
					left: 30rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>