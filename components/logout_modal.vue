<template>
	<view class="modal">
		<!-- 模态框内容 -->
		<view class="modal-content">
			<text>您的账号已下线或在其他设备登录，请重新登录</text>
			<button @click="handleLogin">重新登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "logout_modal",
		data() {
			return {

			};
		},
		methods: {
			handleLogin() {
				// 处理重新登录逻辑
				uni.reLaunch({
					url: "/pages/general/login/index"
				});
			}
		},
	}
</script>

<style lang="scss">
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background-color: #fff;
		padding: 20px;
	}
</style>