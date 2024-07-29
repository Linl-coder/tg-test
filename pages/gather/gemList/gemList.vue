<template>
	<view class="ranking_list">
		<view class="header">
			<view class="back flex-start">
				<u-icon name="arrow-left" bold color="#fff" size="44rpx" @click="toback()"></u-icon>
				<text style="color: #fff;">{{$t('sendOut.gemRanking')}}</text>
			</view>
		</view>
		<scroll-view class="scroll" scroll-y @scrolltolower="scrolltolower">
			<view class="ranking_list_item df alc spb" v-for="item,index in  dataList" :key="item.id">
				<view class="info df alc">
					<view class="flex-start df alc" style="flex-wrap: nowrap;" v-if="index<3">
						<image :src="`/static/Continent/paihang${index+1}.png`"></image>
						<u-avatar :src="item.avatar" size="30" style="margin: 0 8rpx 0rpx 16rpx;"></u-avatar>
					</view>
					<view class="flex-start" style="flex-wrap: nowrap;" v-else>
						<image></image>
						<u-avatar :src="item.avatar" size="30" style="margin: 0 8rpx 0rpx 16rpx;"></u-avatar>
					</view>
					<view class="name flex-center" style="word-wrap: break-all;overflow-wrap: anywhere;">
						{{item.nickname}}
					</view>
				</view>
				<view style="flex: 3;padding-left: 10rpx;" class="tc">
					<view class="relation">
						<u-icon name="arrow-right" :label="$t('mainland.contactHe')" color="#333333" size="24rpx"
							label-size="24rpx" label-color="#333333" label-pos="left" @click="relation(item)"></u-icon>
					</view>
				</view>
				<view class="right df alc" style="flex: 3;justify-content: flex-end;">
					<u-icon name="/static/btn/gem-icon1.png" width="20rpx" height="20rpx"></u-icon>
					<text style="margin-left: 8rpx;">{{item.food | formate}}</text>
				</view>
			</view>
			<iloading :result="result"></iloading>
		</scroll-view>
		<u-popup :show="userInfoPopup" mode="center" round="24rpx" @close="userInfoPopup = false">
			<view class="userInfoPopup">
				<!-- 关闭 -->
				<u-icon name="close-circle" size="36rpx" color="#CFCFCF" shop
					style="position: absolute;top: 32rpx;right: 32rpx;z-index: 5;"
					@click="userInfoPopup = false"></u-icon>
				<view class="userInfo">
					<u-avatar :src="relationData.avatar" size="96rpx"></u-avatar>
					<text>{{relationData.nickname}}</text>
				</view>
				<!-- <view class="contact_way flex-between">
					<u-icon name="/static/Continent/fb.png" width="48rpx" height="48rpx"
						:label="relationData.facebook || '******'" label-size="28rpx" label-color="#222"></u-icon>
					<view class="copy flex-center" @click="copy(relationData.facebook)">Copy</view>
				</view>
				<view class="contact_way flex-between">
					<u-icon name="/static/Continent/zalo.png" width="48rpx" height="48rpx"
						:label="relationData.zalo || '******'" label-size="28rpx" label-color="#222"></u-icon>
					<view class="copy flex-center" @click="copy(relationData.zalo)">Copy</view>
				</view> -->
				<view class="contact_way flex-between" v-show="relationData.telegram">
					<u-icon name="/static/Continent/tg.jpg" width="48rpx" height="48rpx"
						:label="relationData.telegram || '******'" label-size="28rpx" label-color="#222"></u-icon>
					<view class="copy df alc jc" @tap='copyItem(relationData.telegram)'>
						copy
					</view>
				</view>
				<view class="df alc jc" v-show="!relationData.telegram">
					{{$t('sendOut.notSet')+'...'}}
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				userInfoPopup: false,
				dataList: [],
				relationData: {},
				result: 1,
				limit: 15,
			}
		},
		onLoad() {
			this.getRanklist()
		},
		filters: {
			formate(data) {
				data = parseFloat(data).toFixed(2)
				return data
			}
		},
		methods: {
			// 复制联系方式
			copyItem(data) {
				let _this = this
				if (data.includes('@')) {
					let index = data.indexOf('@')
					if (index == 0) {
						data = data.substr(index + 1, data.length)
					}
				}
				uni.setClipboardData({
					data: data,
					success: () => {
						uni.showToast({
							title: _this.$t('utils.copySuccess'),
							icon: "none",
							duration: 2000
						})
						// #ifdef H5
						window.open("https://t.me/" + data, '_blank');
						// #endif
						// #ifdef APP-PLUS
						plus.runtime.openURL("https://t.me/" + data, function(e) {
							alert("Open system default browser failed: " + e.message);
						});
						// #endif
					}
				})
			},
			async getRanklist() {
				let res = await uni.ajax.getRanklist({
					page: this.page,
					limit: this.limit
				})
				if (res) {
					this.dataList = this.dataList.concat(res.data.list);
					this.result = uni.utils.loading_result(this.page, res.data.list, this.limit);
				}
			},
			relation(val) {
				this.relationData = val;
				this.userInfoPopup = true
			},
			scrolltolower() {
				console.log(this.result)
				if (this.result == 4) {
					this.page = this.page + 1;
					this.getRanklist()
				}
			},
		}
	}
</script>
<style>
	page {
		background: #F5F5F5;
	}
</style>
<style lang="scss" scoped>
	.userInfoPopup {
		width: 520rpx;
		padding: 32rpx;
		box-sizing: border-box;
		position: relative;

		.userInfo {
			display: flex;
			flex-direction: column;
			align-items: center;
			transform: translateY(-80rpx);

			text {
				font-size: 28rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #222222;
			}
		}

		.contact_way {

			background: #EBEBEB;
			border-radius: 12rpx;
			height: 82rpx;
			margin-bottom: 24rpx;
			box-sizing: border-box;
			padding: 0 20rpx;

			.copy {
				width: 116rpx;
				height: 58rpx;
				border-radius: 12rpx;
				background-color: #93CA86;
				font-size: 28rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.setUserInfo {
			margin-top: 40rpx;
		}

	}

	.ranking_list {
		color: #000;

		.header {
			width: 100%;
			height: 370rpx;
			background: url('/static/Continent/topback.png') no-repeat;
			background-size: 100% 100%;

			.back {
				height: 88rpx;
				padding-left: 32rpx;
				padding-top: var(--status-bar-height);
			}
		}

		.scroll {
			height: calc(100vh - 370rpx);
			padding: 42rpx 32rpx 0;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			box-sizing: border-box;

			.ranking_list_item {
				margin-bottom: 20rpx;
				background: #ffffff;
				border-radius: 24rpx;
				padding: 26rpx 20rpx;

				.info {
					flex: 4;

					view {
						>image {
							width: 40rpx;
							height: 40rpx;
							vertical-align: bottom;
						}

						.index_i {
							font-size: 32rpx;
							color: #fff;
							font-weight: 600;
							width: 56rpx;
							height: 56rpx;
						}
					}

					.name {
						font-size: 26rpx;
						font-weight: 500;
						color: #333333;
					}
				}

				.right {
					font-size: 24rpx;
				}

				.relation {
					display: inline-block;
					border: 2rpx solid #333333;
					border-radius: 50rpx;
					padding: 8rpx 20rpx;
				}

			}
		}
	}
</style>