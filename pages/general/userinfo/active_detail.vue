<template>
	<view class="card">
		<view class="title fw ">
			{{active.title}}
		</view>
		<view class="" style="font-size: 24rpx;">
			{{active.publish_time}}
		</view>
		<!-- <view class="image">
			<image class="img" :src="active.cover_img_url" mode=""></image>
		</view> -->
		<view class="content">
			<u-parse :content="active.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				active: {}
			};
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('msgCenter.activeDetail')
			})
			this.getDetail()
		},
		methods: {
			async getDetail() {
				let res = await uni.ajax.public_adgetDetail({
					id: this.id
				})
				if (Object.keys(res.data).length > 0) {
					this.active = res.data
				}
			},
		}
	}
</script>

<style lang="scss">
	.card {
		background-color: #fff;
		padding: 20rpx;
		width: 100%;
		height: 100%;

		.title {
			font-size: 40rpx;
			margin-bottom: 20rpx;
		}

		.image {
			width: 100%;
			height: 200rpx;


			.img {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			margin-top: 20rpx;
		}
	}
</style>