<template>
	<view class="ranking_list">
		<view class="header">
			<view class="back flex-start">
				<u-icon name="arrow-left" bold color="#fff" size="44rpx" @click="toback()"></u-icon>
			</view>
		</view>
		<scroll-view class="scroll" scroll-y @scrolltolower="scrolltolower">
			<view class="ranking_list_item flex-between" v-for="item,index in dataList" :key="index">
				<view class="info  df alc jc" style="flex:3;">
					<view class="flex-start df alc" v-if="index<3">
						<image :src="`/static/Continent/paihang${index+1}.png`" mode="widthFix"></image>
						<!-- <u-text v-else bold color="#fff" size="32rpx" block :text="index+1"></u-text> -->
						<!-- <view v-else class="index_i flex-center">{{index+1}}</view> -->
						<u-avatar :src="handleImgUrl(item.head_src)" size="56rpx"
							style="margin: 0 8rpx 12rpx 16rpx;"></u-avatar>
					</view>
					<view class="flex-start" v-else>
						<image :src="`/static/Continent/paihang${index+1}.png`" mode=""></image>
						<!-- <u-text v-else bold color="#fff" size="32rpx" block :text="index+1"></u-text> -->
						<!-- <view v-else class="index_i flex-center">{{index+1}}</view> -->
						<u-avatar :src="handleImgUrl(item.head_src)" size="56rpx"
							style="margin: 0 8rpx 12rpx 16rpx;"></u-avatar>
					</view>
					<view class="name flex-center">{{item.nickname | cut_out}}</view>
				</view>
				<view style="flex: 4;" class="flex-center">
					<view class="relation">
						<u-icon name="arrow-right" :label="$t('mainland.contactHe')" color="#333333" size="24rpx"
							label-size="24rpx" label-color="#333333" label-pos="left" @click="relation(item)"></u-icon>
					</view>

				</view>
				<view style="flex: 3;" class="flex-end">

					<u-icon name="/static/btn/gem-icon1.png" width="36rpx" height="36rpx"
						:label="parseFloat(item.total).toFixed(4)" label-color="#333333" label-size="24rpx"></u-icon>
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
					<u-avatar :src="relationData.head_src" size="96rpx"></u-avatar>
					<text>{{relationData.nickname}}</text>
				</view>
				<view class="contact_way flex-between">
					<u-icon name="/static/Continent/fb.png" width="48rpx" height="48rpx"
						:label="relationData.facebook || '******'" label-size="28rpx" label-color="#222"></u-icon>
					<view class="copy flex-center" @click="copy(relationData.facebook)">Copy</view>
				</view>
				<view class="contact_way flex-between">
					<u-icon name="/static/Continent/zalo.png" width="48rpx" height="48rpx"
						:label="relationData.zalo || '******'" label-size="28rpx" label-color="#222"></u-icon>
					<view class="copy flex-center" @click="copy(relationData.zalo)">Copy</view>
				</view>
				<view class="contact_way flex-between">
					<u-icon name="/static/Continent/tg.jpg" width="48rpx" height="48rpx"
						:label="relationData.telegram || '******'" label-size="28rpx" label-color="#222"></u-icon>
					<view class="copy flex-center" @click="copy(relationData.telegram)">Copy</view>
				</view>
				<view class="contact_way flex-between">
					<u-icon name="/static/Continent/wa.jpg" width="48rpx" height="48rpx"
						:label="relationData.whatsapp || '******'" label-size="28rpx" label-color="#222"></u-icon>
					<view class="copy flex-center" @click="copy(relationData.whatsapp)">Copy</view>
				</view>
				<!-- <view class="setUserInfo flex-center">
					<u-icon name="arrow-right" size="28rpx" color="#999" :label="$t('utils.setMySocialMsg')"
						labelColor="#999" labelSize="28rpx" label-pos="left"
						@click="topage('gather/mainland/rankingList/setmessage');userInfoPopup = false"></u-icon>
				</view> -->
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
				result: 4
			}
		},
		onLoad() {
			this.shop_foodRanking()
		},
		methods: {
			async shop_foodRanking() {
				this.status = 'loading'
				let res = await uni.ajax.shop_foodRanking({
					page: this.page,
					limit: uni.conf.limit
				})

				if (res) {
					this.dataList = this.dataList.concat(res.data.list);
					this.result = uni.utils.loading_result(this.page, res.data.list);
				}
			},
			relation(val) {
				// console.log("val===========>", val);
				this.relationData = val;
				this.userInfoPopup = true
			},
			scrolltolower() {
				if (this.result == 4) {
					this.page = this.page + 1;
					this.shop_foodRanking()
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
		.header {
			width: 750rpx;
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
				// height: 108rpx;
				margin-bottom: 20rpx;

				background: #ffffff;
				border-radius: 24rpx;
				padding: 26rpx 32rpx;

				.info {
					view {
						//background-color: red;

						>image {
							width: 40rpx;
							height: 40rpx;

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

						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #333333;
						//background: red;
					}
				}

				.relation {
					border: 2rpx solid #333333;
					border-radius: 50px;
					padding: 8rpx 20rpx;

					text {}
				}

			}
		}
	}
</style>