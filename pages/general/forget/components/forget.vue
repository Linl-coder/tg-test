<template>
	<view class="forget" :style="bg_style">
		<view class="forget-tbox">
			<view class="forget-title">
				<!-- <view>
					重置密码
				</view> -->
				<!-- <image mode="aspectFit" src="@/static/logo.png"></image> -->
				<!-- <u-icon name="arrow-leftward" color="#ffffff" size="24" @click="toback"></u-icon> -->
				<!-- 33--<uni-icons type="arrow-left" size="24"></uni-icons> -->
				<uni-icons type="arrow-left" color="#fff" size="30" @click="toback"></uni-icons>
			</view>
			<view class="hint">
				<!-- <text class="t2" v-show="type==1">忘记密码</text> -->
				<!-- <text class="t2" v-show="type==2">修改密码</text> -->
				{{$t('foget.resetPsw')}}
			</view>
			<view class="forget-form">
				<u--form labelPosition="left" :model="form" class="u-form">
					<u-form-item prop="userInfo.name" class="forget-form-input flex-start forget-form-input-phone tips">
						<text style="font-weight: bold;color:red;margin: 0 10rpx;">60</text>
						<u--input v-model="form.tel" class="f-input" :placeholder="$t('foget.plsInputPhone')"
							border="none" color="#ccc" placeholderStyle="color: #CCCCCC;font-size: 28rpx;"></u--input>
					</u-form-item>
					<u-form-item prop="userInfo.sex" class="forget-form-input forget-form-input-phone">
						<u--input v-model="form.vcode" type="number" class="f-input"
							:placeholder="$t('foget.plsInputVertCode')" border="none" color="#fff"
							placeholderStyle="color: #CCCCCC;font-size: 28rpx;">
						</u--input>
						<getcode :device_sn="form.device_sn" :type="2" :tel="form.tel"></getcode>
					</u-form-item>
					<u-form-item prop="userInfo.name" class="forget-form-input flex-start forget-form-input-phone">
						<u--input v-model="form.password" type="password" class="f-input"
							:placeholder="$t('foget.plsInputNewPsd')" border="none" color="#fff"
							placeholderStyle="color: #CCCCCC;font-size: 28rpx;"></u--input>
					</u-form-item>

					<u-form-item prop="userInfo.sex" class="forget-form-input forget-form-input-pwd">
						<u--input v-model="form.repassword" type="password" class="f-input"
							:placeholder="$t('foget.inputNewPsdAgain')" border="none" color="#fff"
							placeholderStyle="color:#CCCCCC;font-size: 28rpx;">
						</u--input>
					</u-form-item>
				</u--form>
				<view class="forget-desc flex-start">
					<view class="img_name flex-center">
						<!-- <image src="../../../../static/icon1.png" mode=""></image> -->
						<image src="/static/General/notice_icon.png" mode="heightFix"></image>
					</view>
					<text class="t1 flex-center">{{$t('foget.pswNeed')}}</text>
				</view>
				<view class="forget-btn">
					<!-- <u-button @tap="submit()" class="custom-style" :text="$t('foget.confirmEdit')"></u-button> -->
					<button :plain="true" @tap="submit()" class="custom-style">{{$t('foget.confirmEdit')}}</button>
				</view>
				<!-- <view v-show="type==1" class="to-forget flex-center"  @tap="topage('general/login/index')">
					<text class="t">已有账号？去登录</text>
				</view> -->

			</view>
		</view>
		<view class="forget-fbox " v-show="type==1">
			<agreement @set_agreement="set_agreement" :from='from' :is_agreement='is_agreement' color="var(--theme)">
			</agreement>
		</view>
	</view>
</template>

<script>
	import getcode from "@/components/getcode.vue";
	import agreement from '@/components/agreement.vue';
	export default {
		components: {
			agreement,
			getcode
		},
		props: {
			type: { //1忘记密码2修改密码
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				from: 'forget',
				is_agreement: false,
				form: {
					tel: '',
					password: '',
					repassword: '',
					vcode: '',
					device_sn: ''
				},
				bg_style: {}
			}
		},
		onShow() {},
		async created() {
			this.bg_style = await uni.pro.systeminfo();
			this.getDeviceInfo()
		},
		methods: {
			getDeviceInfo() {
				uni.getSystemInfo({
					success: (res) => {
						// 如果没有 deviceId，则生成随机数
						this.form.device_sn = res.deviceId || this.generateUniqueRandomNumber();
						this.form.device_info = res.model + " " + res.system || res.browserName + " " + res
							.browserVersion
						// 将数据存储到本地缓存中
						uni.setStorage({
							key: 'PhoneID',
							data: {
								PhoneID: this.form.device_sn,
							},
							success: () => {}
						});
					},
					fail: (err) => {
						console.error('获取设备信息失败：', err);
					}
				});
			},
			generateRandomString(length) {
				const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				let randomString = '';
				for (let i = 0; i < length; i++) {
					const randomIndex = Math.floor(Math.random() * characters.length);
					randomString += characters.charAt(randomIndex);
				}
				return randomString;
			},
			generateUniqueRandomNumber() {
				const generatedNumbers = new Set();
				let randomNumber = '';
				do {
					// 生成随机数长度，范围为 10 至 30
					const length = Math.floor(Math.random() * 21) + 10;
					randomNumber = this.generateRandomString(length);
				} while (generatedNumbers.has(randomNumber)); // 检查是否已存在于 Set 中
				generatedNumbers.add(randomNumber); // 将唯一的随机数添加到 Set 中
				return randomNumber;
			},
			async submit() {
				// await uni.utils.is_phone(this.form.tel, this.$t('foget.plsInputPhone'));
				await uni.utils.is_phone(this.form.tel, this.$t('foget.needCorrectPhone'), this.$t(
					'login.plsInputPhone'));
				await uni.utils.is_null(this.form.vcode, this.$t('foget.plsInputVertCode'));

				var reg_pwd = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
				if (!reg_pwd.test(this.form.password)) {
					uni.showToast({
						title: this.$t('foget.pswNeed'),
						icon: 'none'
					});
					return false;
				}
				await uni.utils.is_null(this.form.password, this.$t('foget.plsInputNewPsd'));
				if (this.form.password != this.form.repassword) {
					uni.showToast({
						title: this.$t('foget.pswNotSame'),
						icon: "none"
					})
					return false;
				}
				if (!this.is_agreement && this.type == 1) {
					uni.showToast({
						title: this.$t('foget.plsReadPrivacy'),
						icon: "none"
					})
					return false;
				}
				this.$emit('submit', this.form);
			},
			set_agreement(is_agreement) {
				this.is_agreement = is_agreement;
			}
		}
	}
</script>
<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.forget {
		position: relative;
		background-color: #091013;
		// background: url('/static/login_bg.jpg') no-repeat;
		background-size: 100%;

		.tips {
			display: flex;
		}

		.forget-tbox {
			height: 85%;
			overflow: hidden;
			overflow-y: auto;

			.hint {
				font-size: 44rpx;
				//font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				padding-left: 64rpx;
				padding-top: calc(220rpx);
			}

			.forget-form {
				width: 100%;
				box-sizing: border-box;
				padding: 40rpx 64rpx 0rpx;
				box-sizing: border-box;
				// height: calc(100% - 154rpx);

				.forget-btn {
					width: 100%;
					margin-top: 60rpx;

					.custom-style {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						border-radius: 8rpx;
						font-size: 36rpx;
						font-weight: 500;
						color: #FFFFFF;
						//background: linear-gradient(90deg, #87C4FF 0%, #A180FF 100%);
						//box-shadow: var(--btn-shadow);
						background-image: url('/static/General/login_btn2.png');
						@include backImg;
					}

					// /deep/.u-button__text {
					// 	color: #FFFFFF;
					// 	font-size: 36rpx !important;
					// 	font-weight: 500 !important;

					// }
				}

				.to-forget {
					padding-top: 32rpx;

					.t {
						font-size: 28rpx;
					}
				}

				.forget-desc {
					color: #FFFFFF;
					//background: yellow;

					.img_name {
						width: 26rpx;
						height: 26rpx;
						margin-right: 8rpx;
						//background: yellow;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.t1 {
						font-size: 24rpx;
						//background: red;
						//color: #ccc;
					}
				}

				.forget-form-input {
					margin-bottom: 28rpx;
					// width: 100%;
					//border-radius: 12rpx;
					height: 96rpx;
					//background: rgba(255, 255, 255, 0.1);
					//border: 1rpx solid rgba(255, 255, 255, 0.2) !important;
					border-bottom: 1px solid #FFFFFF;
					// padding: 0 32rpx !important;
					display: flex;
					// align-items: center;
					justify-content: center;

					.f-input {
						//width: 350rpx;
					}


					.f-input:last-child {
						width: 460rpx;
					}

				}

				.forget-form-input-phone {
					// height: 116rpx;
				}

				.forget-form-input-pwd {

					// margin-bottom: 16rpx;
				}
			}

			.forget-title {
				padding-left: 40rpx;
				padding-top: 40rpx;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				//background: red;

				view {
					font-size: 36rpx;
					//font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
				}

				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 24rpx;
				}
			}


		}

		.forget-fbox {
			// height: 10%;
			width: 100%;
			text-align: center;
			//background: #87C4FF;
		}

	}
</style>