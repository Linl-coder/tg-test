<template>
	<view class="card">
		<view class="title fw tc">
			{{annouce.title}}
		</view>
		<view class="" style="text-align: right;font-size: 24rpx;">
			{{annouce.publish_time}}
		</view>
		<view class="content">
			<u-parse :content="annouce.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				annouce: {}
			};
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('msgCenter.annouceDetail')
			})
			this.getDetail()
		},
		methods: {
			async getDetail() {
				let res = await uni.ajax.public_adgetDetail({
					id: this.id
				})
				if (Object.keys(res.data).length > 0) {
					this.annouce = res.data
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
			margin-bottom: 20rpx;
		}

		.content {
			margin-top: 20rpx;
		}
	}
</style>