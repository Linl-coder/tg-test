<template>
	<view class="login flex-colum-between" :style="bg_style">
		<!-- 语言切换 -->
		<view class="language flex-end color_w" v-if="isShowLang">
			<text @click="langSelect">{{langText?langText:defaultLangText}}</text>
		</view>
		<u-picker :show="show" :showToolbar="true" :confirmText="$t('utils.confirm')" :cancelText="$t('utils.cancel')"
			:defaultIndex="defaultIndex" :columns="columns" @cancel="cancelLang" @confirm="confirmLang"></u-picker>
		<view class="login-tbox-bottom flex-colum-evenly">
			<view class="login-tbox">
				<view class="login-logo flex-center">
					<!-- <image :src="appInfo.logo" class="logo" mode=""></image> -->
					<!-- <text>{{$t("index.companyName")}}</text> -->
					<!-- <text>P. T. E</text> -->
				</view>
				<view class="hint">
					<!-- 欢迎来到{{appInfo.sitename}}! -->
				</view>
				<!-- 登录表单 -->
				<view class="login-form">
					<u--form labelPosition="left" :model="form" class="u-form">
						<u-form-item prop="userInfo.name" class="login-form-input  login-form-input-phone flex-center">
							<view class="img_name">
								<image src="/static/General/phone.png" mode="heightFix"></image>
							</view>
							<view class="country-selector flex-evenly" @click="toggleCountryDropdown">
								<image :src="selectedCountry[0].flag" mode="heightFix"></image>
								<text>{{'+'+selectedCountry[0].code}}</text>
								<text :class="{ 'arrow-down': !showDropdown, 'arrow-up': showDropdown }">&#9662;</text>
							</view>
							<view class="divider_line">
							</view>
							<u--input v-model="form.mobile" type="number" clearable color="#fff" class="f-input"
								:placeholder="$t('regis.plsInputPhone')" border="none"
								placeholderStyle="color: #CCCCCC;font-size: 28rpx;"></u--input>
						</u-form-item>
						<transition name="fade">
							<view v-show="showDropdown"
								:class="{ 'dropdown-active': showDropdown, 'dropdown': !showDropdown }">
								<view v-for="(country, index) in countries" :key="index" @click="selectCountry(country)"
									class="dropdown-item flex-between">
									<view class="flex-center">
										<image :src="country.flag" mode="heightFix"></image>
										<text>{{ country.name }}</text>
									</view>
									<view class="code">
										<text>{{'+'+country.code }}</text>
									</view>
								</view>
							</view>
						</transition>
						<u-form-item v-show="loginType==2" prop="userInfo.sex"
							class="login-form-input login-form-input-pwd flex-center">
							<u--input v-model="form.sms_code" type="number" color="#fff" class="f-input"
								:placeholder="$t('login.plsInputVertCode')" border="none"
								placeholderStyle="color: #CCCCCC;font-size: 28rpx;">
							</u--input>
							<getcode :type="1" :mobile="form.mobile"></getcode>
						</u-form-item>
						<u-form-item v-show="loginType==1" prop="userInfo.sex"
							class="login-form-input login-form-input-pwd flex-center">
							<view class="img_name">
								<image src="/static/General/psw.png" mode="heightFix"></image>
							</view>
							<u--input v-model="form.password" type="password" password color="#fff" class="f-input"
								:placeholder="$t('login.plsInputPsd')" border="none"
								placeholderStyle="color: #CCCCCC;font-size: 28rpx;">
							</u--input>
						</u-form-item>
					</u--form>
					<view class="login-fbox flex-start">
						<agreement :is_agreement='is_agreement' :lang='language' @set_agreement="set_agreement"
							color="var(--theme)">
						</agreement>
					</view>
					<view class="login-btn flex-center">
						<button :plain="true" @tap="submit()" class="custom-style">{{$t('login.login')}}</button>
					</view>
					<view class="to-register flex-center" @tap="topage('general/register/index')">
						<text class="t">{{$t('login.goToRegis')}}</text>
					</view>
				</view>
			</view>
			<!-- 显示验证码登录选项 -->
			<view class="login-desc flex-center">
				<!-- <text class="t1 verCodeLogin flex-center"
					@tap="setloginTtype()">{{loginType==1?$t('login.vertifyLogin'):$t('login.pswLogin')}}</text> -->
				<!-- #ifdef APP-PLUS -->
				<text class="t1 verCodeLogin flex-center" @tap="clearCache">{{$t('userInfo.clearCache')}}</text>
				<!-- #endif -->
				<text class="t1 fgtPsw flex-center"
					:class="[language === 'zh-CN'||language === 'zh-HK' ? 'fgtPsw-zh' : 'fgtPsw-else']"
					@click="goForgetPwd">{{$t('login.forgetPsw')}}</text>
			</view>
			<!-- 只显示忘记密码选项 -->
			<!-- @tap="topage('general/forget/index')" -->
			<!-- <view class="login-desc flex-center" v-show="language === 'vi-VN'">
				<text class="t1  flex-center "
					:class="[language === 'zh-CN' ||language === 'zh-HK'? 'fgtPsw-zh' : 'fgtPsw-else']"
					@click="goForgetPwd">{{$t('login.forgetPsw')}}</text>
			</view> -->
		</view>
		<view class="cus_icon_box flex-center" @click="goCustomer">
			<image src="/static/else/cus_icon.png"></image>
		</view>
		<view class="protocol_modal df alc jc " v-show='protocol_show'>
			<view class="protocol_content df  fdc c_b">
				<view class="protocol_title fw tc">
					{{$t('login.protocolTitle')}}
				</view>
				<view class="protocol_article">
					{{ $t('login.protocolContent1')}}
					<text style="color: #397BCD;"
						@click="topage('general/article/index?type=16&pagetype=protocol')">{{'《' + $t('login.protocolTitle') +'》' }}</text>
					{{$t('login.protocolContent2') }}
				</view>
				<view class="df alc spb tc fw">
					<view class="left" @click="protocol_show=false">
						取消
					</view>
					<view class="right" @click="protocolConfirm">
						同意
					</view>
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
			getcode
		},
		props: ['loginType', 'isShowLang'],
		data() {
			return {
				protocol_info: '',
				protocol_show: false,
				isOnlineExam: true,
				is_agreement: false,
				form: {
					mobile: '',
					password: '',
					sms_code: '',
					tel_area_code: '',
					device_sn: '',
					device_info: ''
				},
				bg_style: {},
				appName: getApp().globalData.appName,
				language: uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n.locale,
				show: false,
				columns: [
					['中文繁體', 'English']
				],
				defaultIndex: [0],
				defaultLangText: "",
				langText: "",
				showDropdown: false,
				countries: [],
				selectedCountry: [{
					name: '',
					code: '',
					lang: '',
					flag: ''
				}],
				newForm: {},
				customerServiceLink: '',
				os: '',
				ver: ''
			}
		},
		onLoad() {},
		mounted() {
			// 设置默认companycode为60
			this.getDeviceInfo();
			this.setDefaultLangText();
		},
		computed: {
			appInfo() {
				return this.$store.getters.get_appInfo;
			}
		},
		async created() {
			// this.get_info();
			this.public_getSmsConfig();
			if (uni.conf.appPackageName === 'ma') {
				this.countries = [{
					name: 'Malaysia',
					code: '60',
					lang: 'en-US',
					flag: '/static/else/my.png'
				}]
				if (this.columns[0].indexOf('Malay') == '-1') {
					// this.columns[0].push('Malay')
				}
			} else if (uni.conf.appPackageName === 'vn') {
				this.countries = [{
					name: 'Việt Nam',
					code: '84',
					lang: 'vi-VN',
					flag: '/static/else/vn.png'
				}]
				if (this.columns[0].indexOf('Vietnamese') == '-1') {
					this.columns[0].push('Vietnamese')
				}
			}
			this.getCompanyCode(uni.conf.companycode);
			this.getclientType()
			// #ifdef APP-PLUS
			this.getFormatSize()
			// #endif
			this.bg_style = await uni.pro.systeminfo();
		},
		methods: {
			// 获取免责声明
			async get_info() {
				let res = await uni.ajax.public_getPactInfo({
					type: 16
				});
				if (res) {
					this.protocol_info = res.data
				}
			},
			protocolConfirm() {
				this.protocol_show = false
				this.$emit('submit', this.form);
			},
			// 获取缓存数据大小
			getFormatSize() {
				let that = this
				plus.cache.calculate(function(size) {
					let sizeCacle = parseInt(size)
					that.fileSize = sizeCacle
				})
			},
			// 清除缓存按钮
			clearStorage() {
				let that = this
				uni.showModal({
					title: that.$t('userInfo.clearCache'),
					content: that.$t('userInfo.isConfirm'),
					success: function(res) {
						if (res.confirm) {
							that.clearCache()
						}
					}
				})
			},
			// 清理缓存
			clearCache() {
				let that = this
				let os = plus.os.name
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity()
					let sdRoot = main.getCacheDir()
					let files = plus.android.invoke(sdRoot, 'listFiles')
					let len = files.length
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) {
									uni.showToast({
										icon: "none",
										title: that.$t('userInfo.clearSuccess'),
										duration: 2000
									})
								}, function(e) {
									console.log(e.message)
								})
								that.getFormatSize()
							}
						}, function(e) {
							console.log('文件路径读取失败')
						})
					}
				} else {
					plus.cache.clear(function() {
						uni.showToast({
							icon: "none",
							title: '缓存清理完成',
							duration: 2000
						})
						that.getFormatSize()
					})
				}
			},
			// 获取设备信息
			getDeviceInfo() {
				uni.getSystemInfo({
					success: (res) => {
						this.form.device_info = res.model + " " + res.system || res.browserName + " " + res
							.browserVersion
					},
					fail: (err) => {
						console.error('获取设备信息失败：', err);
					}
				});
				// 从本地缓存中获取数据
				uni.getStorage({
					key: 'PhoneID',
					success: (res) => {
						this.form.device_sn = res.data.PhoneID;
					},
					fail: (error) => {
						// 在这里可以进行失败处理，例如设置默认值或者提示用户
						let device_snNum = this.generateUniqueRandomNumber()
						uni.setStorage({
							key: 'PhoneID',
							data: {
								PhoneID: device_snNum,
							},
							success: () => {

							}
						});
						this.form.device_sn = device_snNum;
					}
				});
				this.updateLoginTime(this.form.device_sn, this.form.device_info);
			},
			async updateLoginTime(device_sn, device_info) {
				try {
					let res = await uni.ajax.public_updateLoginTime({
						device_sn,
						device_info
					});
					this.customerServiceLink = res.data.customer_service_link
				} catch (error) {
					console.error('登录页面更新登录时间失败:', error);
				}
			},
			getclientType() {
				let system = uni.getSystemInfoSync();
				let os = '';
				if (system.platform == 'ios') {
					os = 'I';
				}
				if (system.platform == 'android') {
					os = 'A';
				}
				if (system.platform == 'windows') {
					os = 'W';
				}
				this.os = os;
			},
			getVersion() {
				const sysInfo = uni.getSystemInfoSync();
				// #ifdef H5
				this.ver = sysInfo.appVersion;;
				// #endif
				// #ifdef APP-PLUS
				this.ver = sysInfo.appWgtVersion;;
				// #endif
			},
			goForgetPwd() {
				uni.navigateTo({
					url: '/pages/general/forget/index?type=1'
				})
			},
			goCustomer() {
				const lang = this.language;
				uni.setStorage({
					key: "pay_url",
					data: `${this.customerServiceLink}?token=` + uni.getStorageSync(
							'jwt') +
						'&company_code=' + uni.conf.companycode + '&lang=' + lang + '&ver=' + this.ver +
						'&os=' + this.os,
					success: () => {
						this.topage("general/web/index");
					}
				})
			},
			toggleCountryDropdown() {
				this.showDropdown = !this.showDropdown;
			},
			selectCountry(country) {
				this.selectedCountry[0] = country;
				this.showDropdown = false;
				if (this.selectedCountry[0].code == 84) {
					uni.conf.companycode = 25;
					uni.setStorageSync('CompanyCode', 25);
				} else {
					uni.conf.companycode = this.selectedCountry[0].code;
					uni.setStorageSync('CompanyCode', uni.conf.companycode);
				}
			},
			findCompanyCode(number, array) {
				for (let item of array) {
					if (item.tel_area_code_list.includes(number + '')) {
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
				uni.conf.companycode = res.data.list[0].company_code;
				uni.setStorageSync('CompanyCode', uni.conf.companycode);
			},
			filterDefaultCountry(lang) {
				this.selectedCountry = this.countries.filter(item => {
					return item.lang === lang;
				})
			},
			clickNative() {
				const libPlugin = uni.requireNativePlugin("MyLibraryPlugin");
				// 调用自定义模块的登录方法
				libPlugin.login((data) => {
					// 处理登录成功返回数据
					console.log('Login data:', data);
				}, (error) => {
					// 错误处理
					console.error('Login error:', error);
				});
			},
			setDefaultLangText() {
				const lang = uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n.locale;
				if (uni.conf.areaCode == '60') {
					this.filterDefaultCountry('en-US');
				} else if (uni.conf.areaCode == '84') {
					this.filterDefaultCountry('vi-VN');
				} else {
					this.filterDefaultCountry(lang);
				}
				if (lang == 'zh-CN') {
					this.defaultLangText = "中文简体"
				}
				if (lang == 'zh-HK') {
					this.defaultLangText = "中文繁體"
				}
				if (lang == 'en-US') {
					this.defaultLangText = "English"
				}
				if (lang == 'vi-VN') {
					this.defaultLangText = "Vietnamese"
				}
				if (lang == 'ms-MS') {
					this.defaultLangText = "Malay"
				}
			},
			cancelLang() {
				this.show = false;
			},
			langSelect() {
				this.show = true;
			},
			// 回调参数为包含columnIndex、value、values
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
						item = uni.conf.areaCode == '60' ? 'ms-MS' : 'vi-VN';
				}
				this._i18n.locale = item;
				uni.setStorageSync('locale', item)
				this.language = uni.getStorageSync('locale')
				this.show = false;
			},
			async public_getSmsConfig() {
				let res = await uni.ajax.public_getSmsConfig();
				if (res) {
					this.isOnlineExam = res.data.apple_examine_switch == 1 ? true : false
				}
			},
			async submit() { //检验数据
				if (this.form.mobile === '') {
					this.$u.toast(this.$t('backendRespon.msg3'))
					return
				}
				if (this.loginType == 1) {
					await uni.utils.is_null(this.form.password, this.$t('login.plsInputPsd'));
				}
				if (this.loginType == 2) {
					await uni.utils.is_null(this.form.sms_code, this.$t('login.plsInputVertCode'));
				}
				this.form.loginType = this.loginType;
				if (!this.is_agreement) {
					uni.showToast({
						title: this.$t('login.plsReadPrivacy'),
						icon: "none"
					})
					return false;
				}
				if (this.selectedCountry[0].code) {
					this.form.tel_area_code = this.selectedCountry[0].code
				}
				// if (!uni.getStorageSync('showProtocol')) {
				// 	console.log(1)
				// 	this.protocol_show = true
				// } else {
				this.protocolConfirm()
				// }
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
				generatedNumbers.add(randomNumber);
				//将唯一的随机数添加到 Set 中
				return randomNumber;
			},
			setloginTtype() { //切换登录方式
				this.$emit('setloginTtype', this.loginType)
			},
			set_agreement(is_agreement) { //勾选隐私政策
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


	.protocol_modal {
		position: fixed;
		width: 100%;
		height: 100%;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.4);

		.protocol_content {
			background-color: #fefefe;
			/* 居中显示，稍微调整一下间距 */
			padding: 20px;
			border: 1px solid #888;
			width: 80%;
			// height: 60%;
			border-radius: 20rpx;

			.protocol_title {
				font-size: 40rpx;
			}

			.protocol_article {
				padding: 20rpx 0;
				margin: 20rpx 0;
			}

			.left {
				width: 48%;
				color: red;
				border: 4rpx solid red;
				padding: 20rpx 0;
				border-radius: 40rpx;
			}

			.right {
				width: 48%;
				padding: 20rpx 0;
				border-radius: 40rpx;
				color: #fff;
				background-color: red;
			}
		}
	}

	.type_a {
		font-size: 26rpx;
		font-weight: 500;
		color: #1777FF;
	}

	.a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 192rpx 96rpx 0;

		.a_l {
			view:nth-child(1) {
				font-size: 68rpx;
				font-weight: 600;
				color: #000000;
			}

			view:nth-child(2) {
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
				margin-top: 8rpx;
			}
		}

		.a_r {
			width: 120rpx;
			height: 120rpx;
			border-radius: 24rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 24rpx;
			}
		}
	}

	.img_name {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.login {
		width: 100%;
		height: 100%;
		position: relative;
		background-size: 100%;
		padding: 1;

		.language {
			padding: 70rpx 30rpx 0 0;

			text {
				font-size: 34rpx;
			}
		}

		.login-tbox-bottom {
			width: 100%;
			height: calc(100vh - 90rpx);
		}

		.login-tbox {

			.login-form {
				width: 100%;
				margin-top: 120rpx;
				padding: 0 64rpx 0rpx;

				.login-btn {
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
						background-image: url('/static/General/login_btn2.png');
						@include backImg;
					}
				}

				.to-register {
					margin-top: 80rpx;

					.t {
						font-size: 28rpx;
						color: #ffffff;
						text-decoration: underline;
					}
				}

				.country-selector {
					width: 140rpx;
					height: 96rpx;
					color: #fff;

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

				.login-form-input {
					margin-bottom: 28rpx;
					border-radius: 0rpx;
					height: 96rpx;
					border-bottom: 1rpx solid #FFF !important;

					.f-input {
						width: 500rpx;
					}
				}

				.dropdown {
					overflow: hidden;
					transition: max-height 0.5s ease-in-out;
					max-height: 0;
					position: absolute;
					left: 60rpx;
					z-index: 10;
					width: 290rpx;
					background-color: #fff;
					/* 初始为0，即默认隐藏 */
				}

				.dropdown-active {
					max-height: 500rpx;
					position: absolute;
					left: 60rpx;
					z-index: 10;
					width: 290rpx;
					background-color: #fff;
					margin-right: 340rpx;
				}

				.dropdown-item {
					padding: 10px;
					border-bottom: 1px solid #eee;
					font-size: 26rpx;


					image {
						height: 30rpx;
					}

					.code {
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

				.login-form-input-phone {
					margin-bottom: 0;

					.f-input {
						width: 400rpx;
					}
				}

			}

			.login-title {
				padding-left: 80rpx;
				width: 100%;
				box-sizing: border-box;
				height: 154rpx;
				padding-top: 48rpx;

				.t1 {
					font-size: 56rpx;
					font-weight: bold;
					margin-bottom: 8rpx;
					height: 64rpx;
				}

				.t2 {
					margin-top: 12rpx;
					font-weight: 600;
					color: #000000;
					font-size: 32rpx;
				}
			}

			.login-logo {
				position: relative;
				flex-direction: column;
				align-content: center;
				align-items: center;

				.logo {
					width: 152rpx;
					height: 152rpx;
					background-color: #FFFFFF;
					border-radius: 28rpx;
				}

				text {
					margin-top: 18rpx;
					font-size: 40rpx;
					font-weight: 600;
					color: #FFFFFF;
				}

				.login-logo-title {
					color: #FFF;
					text-align: center;
					font-size: 32rpx;
					font-style: normal;
					font-weight: 700;
					line-height: 36rpx;
					/* 112.5% */
					letter-spacing: 10.4px;
				}
			}
		}

		.login-desc {
			margin-top: 32rpx;
			color: #FFFFFF;

			.t1 {
				margin-right: 28rpx;
				font-size: 28rpx;
			}

			.fgtPsw-zh {
				width: 170rpx;
			}

			.fgtPsw-else {
				width: 280rpx;
			}

			.t2 {
				font-weight: 500;

				text {
					font-size: 28rpx;
					text-decoration: underline;
				}
			}
		}

		.login-fbox {
			width: 100%;
			height: 38rpx;
			// height: 10%;
			margin-top: 30rpx;
			//background: yellow;
		}

		.back {
			position: absolute;
			z-index: 1;
			right: 30rpx;
			/* #ifdef APP-PLUS */
			top: 80rpx;
			/* #endif */
			/* #ifdef H5 */
			top: 40rpx;

			/* #endif */
			.t {
				font-size: 30rpx;
			}
		}

		.cus_icon_box {
			width: 100rpx;
			height: 100rpx;
			position: fixed;
			right: 0;
			bottom: 300rpx;
			//background: red;

			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
</style>