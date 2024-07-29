<template>
	<view class="login">
		<login @submit="submit" :loginType="type" @setloginTtype="setloginTtype"></login>
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
				type: 1,
			}
		},
		onLoad() {

		},
		onShow() {
			// uni.setTabBarItem({
			// 	index: 0,
			// 	text: this.$t('index.title'),
			// })

		},
		mounted() {

		},
		methods: {
			setloginTtype(e) {
				if (e == 1) {
					this.type = 2;
				} else {
					this.type = 1;
				}
			},
			async submit(data) { //登录
				let res = null;
				if (data.loginType == 1) { //账号密码登录
					res = await uni.ajax.public_passwordLogin({
						mobile: data.mobile,
						password: data.password
					});
				} else { //短信登录
					res = await uni.ajax.public_smsLogindLogin({
						mobile: data.mobile,
						sms_code: data.sms_code
					});
				}
				if (res) {
					this.set_userinfo(res.data);
					//console.log("userInfo", res.data.userInfo);
					// this.$store.dispatch('connectSocket');
				}
			},

			set_userinfo(res) { //设置用户信息
				uni.setStorageSync("jwt", res.token);
				this.$store.commit('set_login', true);
				uni.setStorageSync("user_info", res.userInfo);
				this.$store.commit("set_user_info", res.userInfo);

				const isHideTab = uni.getStorageSync('isHideTab');
				console.log("isHideTab--login", isHideTab);
				console.log("type==isHideTab", typeof isHideTab);
				const isLogout = uni.getStorageSync('logout');
				//console.log("logout--login", isLogout);

				// #ifdef APP-PLUS
				if (!isHideTab && typeof isHideTab == 'string' && isLogout != 1) {
					this.totab("game/capsuleToys/capsuleToys");
				} else if (typeof isHideTab == 'boolean' || isLogout == 1) {
					this.totab("gather/homepage")
				}
				// #endif

				// #ifdef H5
				this.totab("gather/homepage")
				// #endif

				uni.setStorageSync('isHideTab', true)
				uni.showToast({
					title: this.$t('login.loginSuccess'),
					icon: "none"
				})
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
		background-image: url('/static/General/login_bg.png');
		@include backImg;
		//background: red;
	}
</style>