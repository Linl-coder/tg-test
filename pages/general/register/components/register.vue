<template>
	<view class="register" :style="bg_style">
		<view class="language flex-end color_w" v-if="!isOnlineExam">
			<text @click="langSelect">{{langText?langText:defaultLangText}}</text>
		</view>
		<u-picker :show="show" :showToolbar="true" :confirmText="$t('utils.confirm')" :cancelText="$t('utils.cancel')"
			:defaultIndex="defaultIndex" :columns="columns" @cancel="cancelLang" @confirm="confirmLang"></u-picker>
		<view class="register-tbox">
			<view class="register-title">
			</view>
			<view class="hint">
				{{$t('regis.WelcomeRegis')}}
			</view>
			<view class="register-form">
				<u--form labelPosition="left" :model="form" class="u-form">
					<u-form-item class="register-form-input  register-form-input-phone">
						<view class="country-selector flex-evenly" @click="toggleCountryDropdown">
							<image :src="selectedCountry[0].flag" mode="heightFix"></image>
							<text>{{'+'+selectedCountry[0].code}}</text>
							<text :class="{ 'arrow-down': !showDropdown, 'arrow-up': showDropdown }">&#9662;</text>
						</view>
						<view class="divider_line">
						</view>
						<u--input v-model="form.tel" clearable class="f-input" :placeholder="$t('regis.plsInputPhone')"
							border="none" color="#fff" type='number'
							placeholderStyle="color:#CCCCCC;font-size: 28rpx;"></u--input>
					</u-form-item>
					<transition name="fade">
						<view v-show="showDropdown"
							:class="{ 'dropdown-active': showDropdown, 'dropdown': !showDropdown }">
							<view v-for="(country, index) in countries" :key="index" @click="selectCountry(country)"
								class="dropdown-item flex-between">
								<view class="flex-center">
									<image :src="country.flag" mode="heightFix"></image>
									<text>{{country.name }}</text>
								</view>
								<view class="code">
									<text>{{'+'+country.code }}</text>
								</view>
							</view>
						</view>
					</transition>
					<u-form-item class="register-form-input register-form-input-phone">
						<u--input v-model="form.vcode" type="number" class="f-input"
							:placeholder="$t('regis.enterVerification')" border="none" color="#fff"
							placeholderStyle="color: #CCCCCC;font-size: 28rpx;">
						</u--input>
						<getcode :type="1" :device_sn="form.device_sn" :tel="form.tel" :verify_code="verify_code">
						</getcode>
					</u-form-item>
					<!-- 昵称 -->
					<u-form-item class="register-form-input  register-form-input-phone">
						<u--input v-model="form.nickname" type="text" class="f-input"
							:placeholder="$t('regis.plsInputNickname')" color="#fff" border="none" maxlength="16"
							placeholderStyle="color: #CCCCCC;font-size: 28rpx;"></u--input>
					</u-form-item>
					<u-form-item class="register-form-input register-form-input-pwd">
						<u--input v-model="form.password" type="password" class="f-input"
							:placeholder="$t('regis.setLoginPsw')" color="#fff" border="none"
							placeholderStyle="color:#CCCCCC;font-size: 28rpx;">
						</u--input>
					</u-form-item>
					<u-form-item class="register-form-input register-form-input-pwd">
						<u--input v-model="form.repassword" type="password" class="f-input"
							:placeholder="$t('regis.confirmLoginPsw')" color="#fff" border="none"
							placeholderStyle="color:#CCCCCC;font-size: 28rpx;">
						</u--input>
					</u-form-item>
					<u-form-item class="register-form-input  register-form-input-phone">
						<!-- <text>{{user_code}}</text> -->
						<u--input v-model="form.user_code" class="f-input" :placeholder="$t('regis.inputVertifyCode')"
							color="#fff" border="none" placeholderStyle="color:#CCCCCC;font-size: 28rpx;"></u--input>
					</u-form-item>
				</u--form>
				<view class="register-btn">
					<!-- <u-button @tap="submit()" class="custom-style" :text="$t('regis.regisNow')"></u-button> -->
					<button :plain="true" @tap="submit()" class="custom-style">{{$t('regis.regisNow')}}</button>
				</view>
				<view class="df alc jc" style="color:#fff;margin:40rpx 0 0" @tap="topage('general/login/index')">
					<text class="t">{{$t('regis.toLogin')}}</text>
					<!-- <u-icon name="arrow-right" bold color="var(--theme)"></u-icon> -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import getcode from "@/components/getcode.vue";
	import agreement from '@/components/agreement.vue';
	export default {
		components: {
			agreement,
			getcode,
		},
		data() {
			return {
				isOnlineExam: uni.getStorageSync('isOnlineExam'),
				is_agreement: true,
				form: {
					tel: '',
					email: '',
					email_code: '',
					password: '',
					nickname: '',
					sms_code: '',
					user_code: '',
					repassword: "",
					tel_area_code: '',
					device_sn: "",
					device_info: "",
					vcode: ""
				},
				language: uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n.locale,
				show: false,
				columns: [
					['中文繁體', 'English']
				],
				defaultIndex: [0],
				defaultLangText: "",
				langText: "",
				verify_code: "",
				bg_style: {},
				q_img: "",
				show_user_code: false,
				countries: [],
				selectedCountry: [{
					name: '',
					code: '',
					flag: ''
				}],
				showDropdown: false,
				newForm: {}
			}
		},
		props: {
			user_code: {
				type: String,
				default: ""
			}
		},
		async created() {
			this.bg_style = await uni.pro.systeminfo();
			this.form.user_code = this.user_code;
			if (uni.conf.appPackageName === 'ma') {
				this.countries = [{
					name: 'Malaysia',
					code: '60',
					lang: 'en-US',
					flag: '/static/else/my.png'
				}]
				// this.columns[0].push('Malay')
			} else if (uni.conf.appPackageName === 'vn') {
				this.countrise = [{
					name: 'Việt Nam',
					code: '84',
					lang: 'vi-VN',
					flag: '/static/else/vn.png'
				}]
				this.columns[0].push('Vietnamese')
			}
			this.selectedCountry = this.countries
			this.getDeviceInfo();
			this.setDefaultLangText();
		},
		methods: {
			setDefaultLangText() {
				const lang = uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n.locale;
				if (lang == 'zh-CN') {
					this.defaultLangText = "中文简体"
				}
				if (lang == 'zh-HK') {
					this.defaultLangText = "中文繁體"
				}
				if (lang == 'en-US') {
					this.defaultLangText = "English"
				}
				if (lang == 'ms-MS') {
					this.defaultLangText = "Malay"
				}
				if (lang == 'vi-VN') {
					this.defaultLangText = "Vietnamese"
				}
			},
			cancelLang() {
				this.show = false;
			},
			langSelect() {
				this.show = true;
			},
			confirmLang(e) {
				this.langText = e.value[0];
				let item = '';
				switch (e.value[0]) {
					case "中文简体":
						item = 'zh-CN';
						break;
					case "中文繁體":
						item = 'zh-HK';
						break;
					case "English":
						item = 'en-US';
						break;
					case "Malay":
						item = 'ms-MS';
						break;
					case "Vietnamese":
						item = 'vi-VN';
						break;
					default:
						item = uni.conf.areaCode == '60' ? 'en-US' : 'vi-VN';
				}
				this._i18n.locale = item;
				uni.setStorageSync('locale', item)
				this.language = uni.getStorageSync('locale')
				this.show = false;
			},
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
			toggleCountryDropdown() {
				this.showDropdown = !this.showDropdown;
			},
			selectCountry(country) {
				this.selectedCountry[0] = country;
				this.showDropdown = false;
				// #ifdef H5
				this.getCompanyCode(country.code);
				// #endif
			},
			findCompanyCode(number, array) {
				for (let item of array) {
					if (item.tel_area_code_list.includes(number.toString())) {
						return item.company_code;
					}
				}
				return null;
			},
			async getCompanyCode(code) {
				let res = await uni.ajax.public_getCompanyCode({
					package_name: uni.conf.appPackageName
				});
				let result = this.findCompanyCode(code, res.data.list);
				console.log("当前注册区号对应CompanyCode==>", result);
				uni.conf.companycode = res.data.list[0].company_code;
				uni.setStorageSync('CompanyCode', uni.conf.companycode);
			},
			filterDefaultCountry(lang) {
				this.selectedCountry = this.countries.filter(item => {
					return item.lang == lang;
				})
			},
			async public_createVerifyCode() {
				let res = await uni.ajax.public_createVerifyCode({
					is_img: 1
				})
				if (res) {
					this.q_img = res;
				}
			},
			async submit() {
				await uni.utils.is_phone(this.form.tel, this.$t('foget.needCorrectPhone'), this.$t(
					'login.plsInputPhone'));
				await uni.utils.is_null(this.form.nickname, this.$t('regis.plsInputNickname'));
				await uni.utils.is_null(this.form.vcode, this.$t('foget.plsInputVertCode'));
				var reg_pwd = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
				if (!reg_pwd.test(this.form.password)) {
					uni.showToast({
						title: this.$t('regis.pswContainletterNum'),
						icon: 'none'
					});
					return false;
				}
				await uni.utils.is_null(this.form.password, this.$t('regis.plsSetLoginPsw'));
				if (this.form.repassword != this.form.password) {
					uni.showToast({
						title: this.$t('regis.pswNotSame'),
						icon: "none"
					})
					return false;
				}
				if (!this.is_agreement) {
					uni.showToast({
						title: this.$t('regis.plsReadPrivacy'),
						icon: "none"
					})
					return false;
				}
				if (this.selectedCountry[0].code) {
					this.form.tel_area_code = this.selectedCountry[0].code;
				}
				console.log("form==>", this.form);
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

	.TestBox {
		background-color: white;
		width: 100%;
		height: 100%;
		color: black;
	}

	.f-input {
		color: #fff !important;
	}

	.register {
		position: relative;
		background-color: #091013;
		overflow-y: hidden;
		//background: url('/static/login_bg.jpg') no-repeat;
		background-size: 100%;


		.language {
			padding: 70rpx 30rpx 0 0;
			//background: red;
			//padding-right: 20rpx;

			text {
				font-size: 34rpx;
			}
		}


		.register-tbox {
			height: 90%;
			overflow: hidden;
			overflow-y: auto;

			.hint {
				font-size: 36rpx;
				//font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				padding-left: 64rpx;
				padding-top: calc(200rpx + var(--status-bar-height));
			}

			.register-form {
				width: 100%;
				box-sizing: border-box;
				padding: 40rpx 64rpx 0rpx;
				padding-top: calc(90rpx + var(--status-bar-height));
				box-sizing: border-box;

				// overflow: hidden;
				// overflow-y: scroll;

				.register-btn {
					width: 100%;
					margin-top: 60rpx;

					.custom-style {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						border-radius: 8rpx;
						font-size: 36rpx;
						font-weight: 500;
						color: #FFFFFF !important;
						//background: linear-gradient(90deg, #87C4FF 0%, #A180FF 100%);
						//box-shadow: var(--btn-shadow);
						background-image: url('/static/General/login_btn2.png');
						@include backImg;
					}


				}

				.to-register {
					//color: var(--theme);
					color: #FFFFFF;
					padding-top: 58rpx;
					text-decoration: underline;

					.t {
						font-size: 32rpx;
					}
				}

				.register-desc {
					.t1 {
						font-size: 28rpx;
						color: #ccc;
					}
				}

				.register-form-input {
					//margin-bottom: 28rpx;
					// width: 100%;
					//border-radius: 12rpx;
					height: 96rpx;
					//background: rgba(255, 255, 255, 0.1);
					border-bottom: 1px solid #FFFFFF;
					// padding: 0 32rpx !important;
					display: flex;
					// align-items: center;
					justify-content: center;
					//background: red;


					.country-selector {
						width: 140rpx;
						height: 96rpx;
						color: #fff;
						//background: yellow;

						image {
							height: 30rpx;
						}

						.arrow-down,
						.arrow-up {
							transition: transform 0.5s ease;
						}

						.arrow-up {
							transform: rotateX(180deg);
						}

					}

					.divider_line {
						width: 1rpx;
						height: 40rpx;
						margin: 0 10rpx;
						border-right: 1px solid #ccc;
					}

					.f-input {
						width: 500rpx;
						//background: yellow;
					}

				}

				.dropdown {
					overflow: hidden;
					transition: max-height 0.5s ease-in-out;
					max-height: 0;
					/* 初始为0，即默认隐藏 */
					position: absolute;
					left: 60rpx;
					z-index: 10;
					width: 290rpx;
					background-color: #fff;
				}

				.dropdown-active {
					max-height: 500rpx;
					position: absolute;
					left: 60rpx;
					z-index: 10;
					width: 290rpx;
					background-color: #fff;
					margin-right: 340rpx;
					// position: relative;
					//background: red;
				}

				.dropdown-item {
					padding: 10px;
					border-bottom: 1px solid #eee;
					font-size: 26rpx;


					image {
						height: 30rpx;
					}

					.code {
						// align-self: flex-end;
						align-self: flex-end;
					}
				}

				.dropdown-item:last-child {
					border-bottom: none;
				}


				.fade-enter-active,
				.fade-leave-active {
					transition: opacity 0.5s ease;
				}

				.fade-enter,
				.fade-leave-to {
					opacity: 0;
				}

				.register-form-input-phone {
					// height: 116rpx;
					// margin-bottom: 0;

					.f-input {
						//width: 100%;
						// height: 100%;
						width: 400rpx;
						// letter-spacing: 2rpx;
						// font-size: 30rpx;
						// font-weight: 500;
						//background: #1777FF;
					}
				}

				.register-form-input-pwd {

					// margin-bottom: 16rpx;
				}
			}

			.register-title {

				width: 100%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;

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

		.register-fbox {
			height: 10%;
		}

	}

	.getcode {
		.getcode-box {
			.get-code {
				color: #007aff;
			}
		}
	}
</style>