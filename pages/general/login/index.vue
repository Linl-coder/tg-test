<template>
	<view class="login">
		<view class="c_w">
			content:{{content}}
		</view>
		<view class="c_w">
			content1:{{content1}}
		</view>
		<view class="c_w">
			token: {{token}}
		</view>
		<login @submit="submit" :isShowLang="isShowLanguage" :loginType="type" @setloginTtype="setloginTtype"></login>
	</view>
</template>

<script>
	import login from "./components/login.vue";
	// 引入加密库
	import CryptoJS from 'crypto-js';
	export default {
		components: {
			login
		},
		data() {
			return {
				content: "",
				content1: "",
				token: '',
				type: 1,
				isShowLanguage: true
			}
		},
		onLoad() {},
		onShow() {
			this._getCurrentPages()
			const pages = uni.getCurrent
			// #ifdef H5
			const code = uni.conf.areaCode;
			this.getCompanyCode(code);
			// #endif
			this.public_getExamConfig();
		},

		created() {

		},
		mounted() {

		},
		methods: {
			_getCurrentPages() {
				const pages = getCurrentPages()
			},
			async public_getExamConfig() {
				let res = await uni.ajax.public_getExamConfig();
				this.isShowLanguage = res.data.login_page_show_lang_button == 1 ? true : false;
			},
			setloginTtype(e) {
				if (e == 1) {
					this.type = 2;
				} else {
					this.type = 1;
				}
			},
			async submit(data) { //登录
				uni.removeStorageSync("isHideTab");
				uni.removeStorageSync("jwt");
				uni.removeStorageSync("isOnlineExam");
				uni.removeStorageSync("user_info");
				uni.removeStorageSync("cur");
				uni.removeStorageSync("onlineBuyCard");
				uni.removeStorageSync("tabList");
				uni.removeStorageSync("is_login");
				uni.removeStorageSync("is_show_exchange");
				uni.removeStorageSync("pageWebUrl");
				uni.removeStorageSync("annouce_id");
				uni.removeStorageSync("first");
				uni.removeStorageSync("isShowAnnouce");
				uni.removeStorageSync('invalid_give_gem');
				uni.removeStorageSync('goods_price_type');
				let res = null;
				if (data.loginType == 1) { //账号密码登录
					res = await uni.ajax.public_passwordLogin({
						mobile: data.mobile,
						password: data.password,
						device_sn: data.device_sn,
						device_info: data.device_info
					});
				} else { //短信登录
					res = await uni.ajax.public_smsLogindLogin({
						mobile: data.mobile,
						sms_code: data.sms_code,
						device_sn: data.device_sn,
						device_info: data.device_info
					});
				}
				if (res) {
					this.content = res.data.token // 测试login bug
					uni.setStorageSync('is_login', true)
					uni.setStorageSync('once_login', true)
					// this.$store.dispatch('connectSocket');
					this.set_userinfo(res.data);
				} else {
					this.content = res // 测试login bug
					uni.setStorageSync('is_login', false)
				}
			},
			async public_getOnlineInfo() { // 测试login bug
				let res = await uni.ajax.public_getOnlineInfo();
				this.content1 = res
			},
			findCompanyCode(number, array) {
				for (let item of array) {
					if (item.tel_area_code_list.includes(number)) {
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
			set_userinfo(res) { //设置用户信息
				uni.setStorageSync("jwt", res.token);
				this.$store.commit('set_login', true);
				uni.setStorageSync("user_info", res.userInfo);
				this.$store.commit("set_user_info", res.userInfo);
				const isHideTab = uni.getStorageSync('isHideTab');
				const isLogout = uni.getStorageSync('logout');
				uni.setStorageSync('isHideTab', true);
				uni.setStorageSync('cur', '3');
				this.token = uni.getStorageSync("jwt"); // 测试login bug
				this.public_getOnlineInfo() // 测试login bug
				uni.showToast({
					title: this.$t('login.loginSuccess'),
					icon: "none"
				})
				// #ifdef APP-PLUS
				if (!isHideTab && typeof isHideTab == 'string' && isLogout != 1) {
					this.totab("game/capsuleToys/capsuleToys");
					// this.totab("gather/homepage");
				} else if (typeof isHideTab == 'boolean' || isLogout == 1) {
					this.totab("gather/homepage");
				}
				// #endif
				// #ifdef H5
				this.totab("gather/homepage");
				// #endif
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

	.login {
		min-height: 100vh;
		//background: linear-gradient(136deg, #6D30D8 0%, #0D090D 53%, #8746FF 100%);
		background-image: url('/static/General/login_bg3.png');
		@include backImg;
		//background: red;
	}
</style>