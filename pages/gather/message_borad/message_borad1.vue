<template>
	<view class="ranking_list">
		<view class="list_content">
			<view class="list_title pr tc fw">
				邀请排行榜
			</view>
			<view class="mine df alc spb">
				<text>我</text>
				<text>我的昵称</text>
				<text>10名</text>
				<text>3</text>
				<view class="df alc">+0.5
					<u-icon name="/static/btn/gem-icon1.png" size="12" style="margin-left: 4rpx;"></u-icon>
				</view>
			</view>
			<view class="df  tc" style="font-size: 24rpx;color: #aaa;padding: 10rpx;">
				<view style="flex:1;text-align: center;">排名</view>
				<text style="flex:3" class="tc">昵称</text>
				<text style="flex:3" class="tc">邀请人数</text>
				<view class="df" style="flex:3;justify-content: flex-end;">获得宝石</view>
			</view>
			<view class="">
				<view class="list_item tc" v-for="item in 20">
					<view class="df alc" v-if="item <= 3">
						<u-icon class="df alc jc" style="flex:1;" :name="`/static/Continent/paihang${item}.png`"
							size="26"></u-icon>
						<text style="flex:3">昵称</text>
						<text style="flex:3">10</text>
						<view style="flex:3;justify-content: flex-end;" class="df alc">+1
							<u-icon name="/static/btn/gem-icon1.png" size="12" style="margin-left: 4rpx;"></u-icon>
						</view>
					</view>
					<view class="df alc " v-else>
						<text style="flex:1;text-align: center;">{{item}}</text>
						<text style="flex:3">昵称</text>
						<text style="flex:3">10</text>
						<view style="flex:3;justify-content: flex-end;" class="df alc">+1
							<u-icon name="/static/btn/gem-icon1.png" size="12" style="margin-left: 4rpx;"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// import time from '@/common/utils/time.js';
	// import Card from './components/Card.vue'
	export default {
		data() {
			return {
				feedback: '',
				feedBackList: [],
				userInfo: {},
				page: 1,
				limit: 10,
				canPull: true,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('colleHome.messageBoard')
			})
			this.getMessageList()
			// this.feedBackList = uni.getStorageSync('feedBackList') || []
		},
		onPullDownRefresh() {
			if (!this.canPull) {
				uni.stopPullDownRefresh()
				return
			}
			this.page++
			this.getMessageList()
		},
		methods: {
			async getMessageList() {
				let res = await uni.ajax.public_getMessageList({
					page: this.page,
					limit: this.limit
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
	}

	.ranking_list {
		width: 100%;
		min-height: 100%;
		padding: 200rpx 20rpx 0;
		background: linear-gradient(to Bottom, rgb(254, 207, 64), rgb(255, 255, 255));

		.list_content {
			background-color: #fff;
			padding: 20rpx;

			.list_title {
				margin-bottom: 40rpx;

				&::after {
					position: absolute;
					content: '';
					width: 10%;
					height: 8rpx;
					border-radius: 4rpx;
					background-color: #FE8E06;
					bottom: -20rpx;
					left: 45%;
				}
			}

			.mine {
				padding: 40rpx 20rpx;
				color: #FE8E06;
				background-color: rgba(254, 141, 6, 0.2);
				margin-bottom: 10rpx;
			}

			.list_item {
				padding: 10rpx;
				margin-bottom: 20rpx;
			}

		}
	}

	.message_board {
		width: 100%;
		padding-bottom: 20rpx;
		background-color: #F8F8F8;

		.message_title {
			padding: 10rpx 10rpx 20rpx;
			margin-bottom: 20rpx;
			background-color: #fff !important;
			box-shadow: 0rpx 4rpx 8rpx 2rpx #ccc;
		}

		.message_board_scroll {
			width: 100%;
			margin-bottom: 200rpx;
			padding: 20rpx;
			background-color: #F8F8F8;
		}

		.feedback_item {
			// border: 1px solid #ccc;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			padding: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 20rpx;

			.msg_content {
				text-align: right;
				// overflow-y: scroll;

				.feedback_text {
					// display: flex;
					// width: 100%;
					// flex-wrap: wrap;
				}

				.content {
					margin: 20rpx 0;
					padding: 20rpx;
					display: flex;
					// flex-wrap: wrap;
					background-color: #fff;
					border-radius: 10rpx;
				}
			}
		}

		.mr-20 {
			margin-right: 20rpx;
		}

		.time {
			font-size: 24rpx;
		}

		.color_333 {
			color: #333;
		}



		.footer {
			position: fixed;
			z-index: 10;
			width: 100%;
			// height: 100rpx;
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			bottom: 0;
			left: 0;
			background-color: #fff;

			.feedback {
				width: 80%;
			}

			.send {
				position: absolute;
				right: 20rpx;
				bottom: 20rpx;
				padding: 0 20rpx;
				height: 70rpx;
				line-height: 70rpx;
				margin: 0;
				// background-color: green;
				border: none !important;
				color: #555;

				::after {
					content: '';
				}
			}
		}
	}
</style>