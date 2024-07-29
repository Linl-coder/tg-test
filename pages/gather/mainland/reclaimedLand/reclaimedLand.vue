<template>
	<view class="reclaimed_land">
		<u-navbar bgColor="#fff" @leftClick="leftClick" :leftText="$t('reclaimedLand.openNewMine')"
			leftIcon="arrow-leftward" title="" placeholder>
			<view slot="right" class="rule">
				<u-icon name="/static/Continent/play.png" width="40rpx" height="40rpx"
					:label="$t('reclaimedLand.playMethod')" label-size="28rpx" label-color="#222" space="10rpx"
					@click="topage('general/article/index?type=12&pagetype=playing_method')"></u-icon>
			</view>
		</u-navbar>
		<view class="asset">
			<view class="apprentice asset_item flex-start">
				<u-icon name="/static/Continent/my_monkey.png" width="50rpx" height="45rpx"
					:label="user_info.countPool || '--'" label-size="24rpx" label-color="#222"></u-icon>
			</view>
			<view class="asset_item flex-start">
				<u-icon name="/static/btn/gem-icon1.png" width="45rpx" height="45rpx" :label="user_info.food*1 || '--'"
					label-size="24rpx" label-color="#222"></u-icon>
			</view>
		</view>
		<view class="warp">
			<view class="title">
				{{$t('reclaimedLand.gemMine')}}
				<!-- <text>挖矿场的金币，挖出百万豪礼</text> -->
			</view>
			<view class="content">
				<block v-for="item,index in fieldList" :key="item.id">
					<open-land :info="item" :current="index" @open="open_land"></open-land>
				</block>
				<iloading :result="result"></iloading>
			</view>
		</view>
		<!-- 开通弹框 -->
		<u-popup :show="openPopup" round="24rpx" closeable bgColor="#f5f5f5" @close="openPopup = false">
			<view class="openPopup">
				<view class="popup_title">
					{{$t('reclaimedLand.openMine')}}
				</view>
				<view class="consume flex-between">
					<text>{{$t('reclaimedLand.needConsumeGem')}}</text>
					<u-icon name="/static/btn/gem-icon1.png" :label="openField.price" width="48rpx" height="48rpx"
						label-color="#222" label-size="24rpx"></u-icon>
				</view>
				<view class="hold">
					{{$t('reclaimedLand.myCanUseGem')}}<text>{{user_info.food || '0'}}</text>
				</view>
				<view class="open_btn flex-center" @click="confirmUse">
					{{$t('reclaimedLand.confirmOpen')}}
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import openLand from '../components/openLand.vue'
	import {
		userinfo
	} from "@/common/mixins/index.js";
	import debounce from 'lodash/debounce';
	export default {
		mixins: [userinfo],
		components: {
			openLand
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info
			}
		},
		watch: {
			// 监听 user_info 的变化
			user_info: {
				deep: true, // 开启深度监听
				handler(newVal, oldVal) {
					// 注意：newVal 和 this.user_info 在这个时刻是相同的，都表示最新的 user_info 值
					// console.log("newVal", newVal); // 新的 user_info 值
					// console.log("oldVal", oldVal); // 旧的 user_info 值

					// 检查 food 属性是否变化（如果 food 是你关心的属性）
					if (newVal.food !== oldVal.food) {
						console.log("Food has changed.");
					}
				}
			}
		},
		data() {
			return {
				fieldList: [],
				openPopup: false,
				openField: {},
				result: 1
			}
		},
		onLoad() {
			this.shop_landList()
		},
		methods: {
			confirmUse: debounce(function() {
				// 要实现的业务逻辑
				this.shop_landLevel();
			}, 2000, {
				leading: true,
				trailing: false
			}),
			leftClick: function() {
				uni.$emit('query', {
					needQuest: 1
				});
				uni.navigateBack();
			},
			async shop_landList() {
				let res = await uni.ajax.shop_mine_landList({
					page: 1,
					limit: 100
				});

				if (res) {
					this.fieldList = res.data.list;
					this.result = 4;
				}
			},
			open_land(e) {
				console.log("e=====>", e)
				this.openField = e.info
				this.openPopup = true
			},
			async shop_landLevel() {
				let result = await uni.ajax.shop_landLevel({
					mine_id: this.openField.id
				})
				console.log(result)
				if (result) {
					this.openPopup = false;
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('landLevel', {
						mineName: this.openField.name
					});
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rule {
		border-radius: 50px;
		border: 2rpx solid var(--theme);
		padding: 6rpx 18rpx;
	}

	.reclaimed_land {
		.asset {
			// height: 100rpx;
			padding: 22rpx 32rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			border-radius: 0 0 36rpx 36rpx;

			.asset_item {
				width: 48%;
				height: 56rpx;
				background-color: #F8F8F8;
				border-radius: 50px;
				padding-left: 28rpx;
				// padding-left: 14rpx;
			}

			.apprentice {
				font-size: 24rpx;
				//font-family: DIN-Medium, DIN;
				font-weight: 500;
				color: #000000;
				line-height: 56rpx;
				padding-left: 28rpx;
				box-sizing: border-box;
			}
		}

		.warp {
			background-color: #fff;
			border-radius: 36rpx 36rpx 0 0;
			margin-top: 20rpx;
		}

		.title {
			font-size: 32rpx;
			//font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #222222;
			padding: 20rpx 32rpx 0;

			text {
				color: #999;
				//font-family: PingFang SC;
				font-size: 24rpx;
				margin-top: 16rpx;
				font-style: normal;
			}
		}

		.content {
			padding: 36rpx 32rpx 24rpx;
		}

	}

	.openPopup {
		padding: 84rpx 32rpx 80rpx;

		.popup_title {
			font-size: 32rpx;
			font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #222222;
			margin-bottom: 40rpx;
		}

		.consume {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 28rpx 32rpx;
			margin-bottom: 28rpx;

			text {
				font-size: 32rpx;
				//font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #222222;
			}
		}

		.hold {
			font-size: 28rpx;
			//font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			margin-bottom: 68rpx;

			text {
				color: #222;
			}
		}

		.open_btn {
			height: 96rpx;
			background: var(--linear-gradient-theme);
			font-size: 32rpx;
			//font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			box-shadow: var(--btn-shadow);
			border-radius: 8rpx;
		}
	}
</style>