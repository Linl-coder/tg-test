<template>
	<view class="open_land" :style="{'--field-bg':`url(/static/Continent/mine_cave_bg.png)`}">
		<view class="info">
			<view class="message">
				<view class="">
					<view class="land_name">{{$t(info.name)}}</view>
					<!-- <view class="land_apprentice">学徒：{{info.num}}</view> -->
					<view class="flex-start">
						<view class="hint">{{$t('reclaimedLand.expectedToDig')}}</view>
					</view>
					<!-- <view class="land_apprentice">学徒：{{info.countPerson}}</view> -->
				</view>

			</view>
			<view class="hint">
				<u-icon name="/static/btn/gem-icon1.png" width="54rpx" height="54rpx" space="8rpx"
					:label="parseInt(info.output)" label-size="36rpx" label-color="#fff"></u-icon>
			</view>
		</view>
		<view class="consume">
			<view class="consume_hint">{{$t('reclaimedLand.consume')}}</view>
			<view class="consume_num">
				<u-icon :bold="true" name="/static/btn/gem-icon1.png" width="54rpx" height="54rpx" space="8rpx"
					:label="info.price" label-size="28rpx" label-color="#222"></u-icon>
			</view>
			<view class="df alc spb" style="padding-right: 20rpx;">
				<view class="open_btn flex-center" @click="open">
					{{$t('reclaimedLand.openMine')}}
				</view>
				<view class="">
					{{info.develop_mine_num}}/{{info.num}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			},
			current: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {

			}
		},
		created() {

		},
		methods: {
			open() {
				this.$emit('open', {
					info: this.info,
					index: this.current
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.open_land {
		width: 686rpx;
		height: 256rpx;
		background: var(--field-bg) no-repeat;
		background-size: cover;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 12rpx;
		padding: 24rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		margin-bottom: 24rpx;

		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.message {
				.land_name {
					font-size: 30rpx;
					//font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					margin-right: 12rpx;
				}

				.land_apprentice {
					line-height: 36rpx;
					margin-right: 10rpx;
					font-size: 24rpx;
					//font-family: DIN-Medium, DIN;
					font-weight: 500;
					color: #FFFFFF;
					border-radius: 8rpx;
					border: 2rpx solid #FFFFFF;
					padding: 8rpx 12rpx;
				}

				.hint {

					font-size: 28rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.6);
				}
			}

			.hint {
				color: #909090;

				//font-family: PingFang SC;
				font-size: 28rpx;
			}
		}

		.consume {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			width: 382rpx;
			height: 100%;
			background: url('/static/Continent/empty_right.png') no-repeat;
			background-size: 100% 100%;
			// padding-left: 50rpx;
			box-sizing: border-box;

			.consume_hint {
				font-size: 24rpx;
				//font-family: PingFang SC-Regular, PingFang SC;
				color: #999999;
				margin-left: 50rpx;
			}

			.consume_num {
				align-self: center;
				// display: flex;
				// justify-content: space-between;
				// width: 100%;
				padding: 0 30rpx 0 50rpx;
				box-sizing: border-box;
			}

			.open_btn {
				margin-left: 30rpx;
				background: var(--linear-gradient-theme);
				width: 212rpx;
				height: 56rpx;
				box-shadow: var(--btn-shadow);
				border-radius: 4rpx;
				font-size: 20rpx;
				//font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #030104;
			}
		}
	}
</style>