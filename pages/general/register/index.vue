<template>
	<view class="register">
		<register @submit="submit" :user_code="user_code"></register>
	</view>
</template>

<script>
	import register from "./components/register.vue";
	export default {
		components: {
			register
		},
		data() {
			return {
				user_code: "",
				pool_id: null
			}
		},
		onLoad(query) {
			if (query.user_code) {
				this.user_code = query.user_code;
			}
			if (query.pool_id) {
				this.pool_id = query.pool_id;
			}
		},
		methods: {
			async submit(data) { //注册
				let res = await uni.ajax.public_register({
					mobile: data.tel,
					password: data.password,
					user_code: data.user_code,
					pay_password: data.pay_password,
					tel_area_code: data.tel_area_code,
					nickname: data.nickname,
					device_sn: data.device_sn,
					device_info: data.device_info,
					vcode: data.vcode
				});
				if (res) {
					console.log(res)
					// #ifdef APP-PLUS
					this.to_login();
					// this.$store.dispatch('connectSocket');
					// #endif
					// #ifdef H5
					//this.to_downapp();
					//this.set_userinfo(res.data)
					this.to_login();
					//this.to_capsuleToys();
					// #endif
				}
			},
			set_userinfo(res) { //设置用户信息
				uni.setStorageSync("jwt", res.token);
				this.$store.commit('set_login', true);
				uni.setStorageSync("user_info", res.userInfo);
				this.$store.commit("set_user_info", res.userInfo);

				const isHideTab = uni.getStorageSync('isHideTab');
				const isLogout = uni.getStorageSync('logout');
				// #ifdef APP-PLUS
				if (!isHideTab && typeof isHideTab == 'string' && isLogout != 1) {
					this.totab("game/capsuleToys/capsuleToys");
					// this.totab("gather/homepage")
				} else if (typeof isHideTab == 'boolean' || isLogout == 1) {
					this.totab("gather/homepage")
				}
				// #endif
				// #ifdef H5
				this.totab("gather/homepage")
				// #endif
				uni.setStorageSync('isHideTab', true);
				uni.showToast({
					title: "Đăng ký thành công!",
					icon: "none"
				})
			},
			// set_userinfo(res) { //设置用户信息
			// 	uni.setStorageSync("jwt", res.token);
			// 	this.$store.commit('set_login', true);
			// 	uni.setStorageSync("user_info", res.userInfo);
			// 	this.$store.commit("set_user_info", res.userInfo);
			// 	//this.totab("collect/index");
			// 	this.totab("collect/homepage");
			// 	//this.totab("game/capsuleToys/capsuleToys");
			// 	uni.showToast({
			// 		title: "注冊成功",
			// 		icon: "none"
			// 	})
			// },
			to_downapp() {
				this.topage("general/downapp/index?from=register")
			},
			to_capsuleToys() {
				this.topage("game/capsuleToys/capsuleToys")
			},
			to_login() {
				this.topage("general/login/index")
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

	.register {
		height: 100vh;
		//background: linear-gradient(136deg, #6D30D8 0%, #0D090D 53%, #8746FF 100%);
		background-image: url('/static/General/login_bg3.png');
		@include backImg;
	}
</style>