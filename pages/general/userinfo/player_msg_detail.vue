<template>
	<view class="card">
		<view class="title fw tc">
			{{msg.title}}
		</view>
		<view class="" style="text-align: right;font-size: 24rpx;">
			{{msg.publish_time}}
		</view>
		<view class="content">
			<u-parse :content="msg.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				msg: {}
			};
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('msgCenter.playerMsgDetail')
			})
			this.getDetail()
		},
		methods: {
			async getDetail() {
				let res = await uni.ajax.public_getMsgDetail({
					id: this.id
				})
				if (Object.keys(res.data).length > 0) {
					this.msg = res.data
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