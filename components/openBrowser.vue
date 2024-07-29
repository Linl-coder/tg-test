<template>
	<view class="openbrowser flex-center" :style="bg_style">
		<image src="/static/open-brower.png" class="icon" ></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bg_style: {}
			}
		},
		async created() {
			this.bg_style=await uni.pro.systeminfo();
		},
	}
</script>

<style lang="scss">
	.openbrowser{
		background: rgba(0,0,0,0.5);
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 100;
		align-items: flex-start;
		align-content: flex-start;
		.icon{
			width: 600rpx;
			height: 750rpx;
			margin-top: 120rpx;
		}
	}
</style>
