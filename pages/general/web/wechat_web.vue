<template>
	<view class="container">
		<web-view class="webview" :src="gameUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gameUrl: '/static/cocos_game/game.js', // Cocos Creator微信小游戏的入口文件路径
			};
		},
	};
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
	}

	.webview {
		width: 100%;
		height: 100%;
	}
</style>