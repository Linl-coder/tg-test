<template>
	<view class="message_board">
		<u-sticky offset-top="0" class="tc message_title">
			<text>{{$t('colleHome.messageTitle')}}</text>
		</u-sticky>
		<view class="message_board_scroll">
			<view class="feedback_item" v-for="(item,index) in feedBackList" :key="index">
				<view class="color_333 mr-20 msg_content">
					<view class=" ">
						{{item.nickname}}
					</view>
					<view class="content">
						{{item.content}}
					</view>
					<!-- <Card :text="item.feedback"></Card> -->
				</view>
				<view class="user color_333">
					<u-avatar :src="item.avatar" size='40'></u-avatar>
					<!-- <view class="time ml-20">
						{{item.time}}
					</view> -->
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="feedback">
				<u--textarea maxlength='300' :fixed=true v-model="feedback" placeholder="请输入内容" autoHeight
					count></u--textarea>
			</view>
			<button class="send" @click="send">发送</button>
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
			send() {
				if (this.feedback) {
					this.sendMessage()
				}
			},
			async sendMessage() {
				let res = await uni.ajax.public_leaveMessage({
					content: this.feedback
				})
				if (res) {
					this.$u.toast('send success')
					this.feedback = ''
					this.page = 1
					this.getMessageList()
				}
			},
			async getMessageList() {
				let res = await uni.ajax.public_getMessageList({
					page: this.page,
					limit: this.limit
				})
				if (Object.keys(res.data).length != 0) {
					uni.stopPullDownRefresh()
					if (res.data.list.length != 0) {
						if (res.data.list.length < this.limit) {
							this.canPull = false
						}
						let userInfo = uni.getStorageSync('user_info')
						this.avatar = userInfo.avatar
						this.nickname = userInfo.nickname
						let feedBackList = res.data.list.map(item => {
							item = {
								avatar: this.avatar,
								nickname: this.nickname,
								...item
							}
							return item
						})
						if (this.page == 1) {
							this.feedBackList = feedBackList.reverse()
						} else {
							this.feedBackList = this.feedBackList.reverse().concat(feedBackList).reverse()
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
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