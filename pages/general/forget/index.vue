<template>
	<view class="forget">
		<forget @submit="submit"></forget>
	</view>
</template>

<script>
	import forget from "./components/forget.vue";
	export default {
		components: {
			forget
		},
		data() {
			return {

			}
		},
		methods: {
			async submit(data) { //登录
				let res = await uni.ajax.public_forgertPassword({
					password: data.password,
					repassword: data.repassword,
					tel: data.tel,
					vcode: data.vcode
				});
				if (res) {
					uni.pro.clearLoginInfo();
					uni.showToast({
						title: "操作成功",
						icon: "none"
					})
					await uni.utils.sleep(500);
					uni.reLaunch({
						url: "/pages/general/login/index"
					})
				}
			},
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
		height: 100vh;
		//background: linear-gradient(136deg, #6D30D8 0%, #0D090D 53%, #8746FF 100%);
		background-image: url('/static/General/login_bg3.png');
		@include backImg;
	}
</style>