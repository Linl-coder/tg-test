<template>
	<view>
		<u-image src="/static/Continent/fuben.png" width="750rpx" height="1471rpx" mode=""></u-image>
		<u-icon class="back" name="arrow-left" color="#fff" bold size="56rpx" @click="toback()"></u-icon>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.back{
		position: fixed;
		top: calc(20rpx + var(--status-bar-height));
		left: 32rpx;
		z-index: 100;
	}
</style>
