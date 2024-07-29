<template>
	<view class="card">
		<view class="annouce" v-if="is_annouce==1">
			<view class="title">
				<view class="pr">
					<u--text bold color="#333333" :text='data.title'></u--text>
					<u-badge type="error" v-show="data.is_read!=1" :isDot="true" absolute :offset='[0,-20]'></u-badge>
				</view>
				<u-icon name="arrow-right" width="20rpx" height="20rpx" label-color="#121317" label-size="24rpx"
					space="8rpx">
				</u-icon>
			</view>
			<view class="content">
				<u-parse :content="data.content"></u-parse>
			</view>
		</view>
		<view class="active" v-else>
			<view class="image">
				<image class="img" :src="data.cover_img_url" mode=""></image>
			</view>
			<view class="title">
				<view class="title_left">
					<u--text bold :lines="1" size="20" color="#333333" :text="data.title"></u--text>
				</view>
				<u-icon name="arrow-right" width="20rpx" height="20rpx" label-color="#cccccc" label-size="24rpx"
					space="8rpx">
				</u-icon>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			is_annouce: {
				type: Boolean,
				default: true
			},
			data: {
				type: Object,
				default: {}
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
		width: 96%;
		margin-left: 2%;
		border-radius: 10rpx;
		background-color: #fff;
		color: #000;
		overflow: hidden;

		.annouce {
			padding: 20rpx;
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

		.content {
			padding: 20rpx
		}
	}
</style>