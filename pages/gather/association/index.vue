<template>
	<view class="association" :style="system">
		<view class="card card1" @click="topage('general/article/index?pagetype=gonghui&type=13')">
			<text>{{$t('collectAssociation.playIllustrate')}}</text>
			<u-icon name="plus-circle" bold size="60rpx" color="#fff"></u-icon>
		</view>
		<view class="card" @click="createguild">
			<text>{{$t('collectAssociation.createGuild')}}</text>
			<u-icon name="plus-circle" bold size="60rpx" color="#fff"></u-icon>
		</view>
		<view class="card card_" @click="topage('gather/association/myAssociation/myAssociation')">
			<text>{{$t('collectAssociation.joinGuild')}}</text>
			<u-icon name="plus-circle" bold size="60rpx" color="#fff"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				system: {}
			}
		},
		onLoad() {
			let system = uni.getSystemInfoSync()
			this.system = {
				width: system.windowWidth + 'px',
				height: system.windowHeight + 'px'
			}

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('collectAssociation.guild')
			})
		},
		methods: {
			createguild() {
				uni.$u.route('pages/gather/association/create/create?type=1')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.association {
		// background: url("@/static/Gather/home/home_bg.png") no-repeat;
		// background-size: 100% 100%;
		box-sizing: border-box;
		padding: 24rpx 32rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.card {
			width: 686rpx;
			height: 308rpx;
			background-color: rgba(0, 0, 0, 0.3);
			// background: url('/static/association/i1.jpg') no-repeat;
			background-size: cover;
			border-radius: 12rpx;
			margin-bottom: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			text {
				font-size: 48rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-right: 10rpx;
			}
		}

		.card_ {
			// background: url('/static/association/i2.jpg') no-repeat;
			background-size: cover;
		}

		.card1 {
			// background: url('/static/Continent/i32_.png') no-repeat;
			background-size: cover;
		}
	}
</style>