<template>
	<view class="card">
		<view class="annouce">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			}
		}

	}
</script>

<style lang="scss" scoped>
	.card {
		width: 90%;
		margin-left: 5%;
		border-radius: 10rpx;
		background-color: #fff;

		.annouce {
			width: 100%;
			padding: 20rpx;
			text-align: right;
			white-space: normal;
			display: block;
		}

		.image {
			width: 100%;
			height: 200rpx;


			.img {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			padding: 20rpx
		}

		.title_left {
			width: 70%;
		}

		.content {}
	}
</style>