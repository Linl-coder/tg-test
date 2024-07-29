<template>
	<view class="myGuild_container ">
		<view class="spaceCraft_box">
			<view class="star_move_bg">
				<div class="text1 " v-show="!isOnlineExam">
					<div class="flex-colum-evenly">
						<li>
							{{$t('myGuild.title')}}
						</li>
						<li class="df alc jc" style="font-size: 40rpx;">
							<u-icon name="/static/btn/gem-icon1.png" size="16" style="margin-right: 10rpx;"></u-icon>
							<u-count-to ref="uCountTo" separator="," :decimals="2" :startVal='startVal' :endVal="endVal"
								:autoplay=true :duration='5000'></u-count-to>
						</li>
					</div>
					<div class="flex-colum-evenly">
						<li style="font-size: 40rpx;" class="df alc jc" @click="notice_show=true">
							<text>{{$t('myGuild.yesterdayGems')}}</text>
							<u-icon name="/static/myGuild/notice.png" size="16" style="margin:6rpx 0 0 4rpx;"></u-icon>
						</li>
						<li class="df alc jc">
							<u-icon name="/static/btn/gem-icon1.png" size="20" style="margin-right: 10rpx;"></u-icon>
							<span class="fw">{{spaceInfo.expect_shortfall_food | formatData}}</span>
						</li>
					</div>
				</div>
				<view class="data">
					<!-- <view class="df alc spb data_item">
						<view class="data_item_left c_w">
							<text class="left_title">{{$t('myGuild.yesterdayGems')}}</text>
							<view class="df alc left_gem">
								<u-icon name="/static/btn/gem-icon1.png" size="14"
									style="margin-right: 10rpx;"></u-icon>
								<text>{{414017797 |formatData}}</text>
							</view>
						</view>
						<view class="data_item_right" :style="{color:is_up?'#F09AFE':'#9AFFFB'}">
							<view class="df alc">
								<text class="right_title">{{$t('myGuild.comparedToYesterday')}}</text>
								<u-icon
									:name="is_up?'/static/myGuild/up_triangle.png':'/static/myGuild/down_triangle.png'"
									color="#ED99FC" size="14" style="margin-right: 10rpx;"></u-icon>
							</view>
							<view class="right_gem">
								{{414017797 |formatData}}
							</view>
						</view>
					</view> -->
					<view class="df alc spb data_item">
						<view class="data_item_left c_w">
							<text class="left_title">{{$t('myGuild.tradableGems')}}</text>
							<view class="df alc left_gem">
								<u-icon name="/static/btn/gem-icon1.png" size="14"
									style="margin-right: 10rpx;"></u-icon>
								<text>{{spaceInfo.food_num | formatData}}</text>
							</view>
						</view>
						<view class="data_item_right"
							:style="{color:Number(spaceInfo.food_num)>=Number(spaceInfo.yesterday_user_food_num)?'#F09AFE':'#9AFFFB'}">
							<view class="df alc">
								<text class="right_title">{{$t('myGuild.comparedToYesterday')}}</text>
								<u-icon
									:name="Number(spaceInfo.food_num)>=Number(spaceInfo.yesterday_user_food_num)?'/static/myGuild/up_triangle.png':'/static/myGuild/down_triangle.png'"
									color="#ED99FC" size="14" style="margin-right: 10rpx;"></u-icon>
							</view>
							<view class="right_gem">
								<text>{{(spaceInfo.food_num-spaceInfo.yesterday_user_food_num)|formatData}}</text>
							</view>
						</view>
					</view>
					<view class="df alc spb data_item">
						<view class="data_item_left c_w">
							<text class="left_title">{{$t('myGuild.ApplyingGems')}}</text>
							<view class="df alc left_gem">
								<u-icon name="/static/btn/gem-icon1.png" size="14"
									style="margin-right: 10rpx;"></u-icon>
								<text>{{spaceInfo.active_develop_mine_food |formatData}}</text>
							</view>
						</view>
						<view class="data_item_right"
							:style="{color:Number(spaceInfo.today_develop_mine_food)>=0?'#F09AFE':'#9AFFFB'}">
							<view class="df alc ">
								<text class="right_title">{{$t('myGuild.comparedToYesterday')}}</text>
								<u-icon
									:name="Number(spaceInfo.today_develop_mine_food)>=0?'/static/myGuild/up_triangle.png':'/static/myGuild/down_triangle.png'"
									color="#ED99FC" size="14" style="margin-right: 10rpx;"></u-icon>
							</view>
							<view class="right_gem">
								{{(spaceInfo.today_develop_mine_food) |formatData}}
							</view>
						</view>
					</view>
					<!-- <view class="df alc spb data_item">
						<view class="data_item_left c_w">
							<text class="left_title">{{$t('myGuild.mineLockedGems')}}</text>
							<view class="df alc left_gem">
								<u-icon name="/static/btn/gem-icon1.png" size="14"
									style="margin-right: 10rpx;"></u-icon>
								<text>{{spaceInfo.develop_mine_food |formatData}}</text>
							</view>
						</view>
						<view class="data_item_right"
							:style="{color:Number(spaceInfo.develop_mine_food)>=Number(spaceInfo.yesterday_develop_mine_food)?'#F09AFE':'#9AFFFB'}">
							<view class="df alc ">
								<text class="right_title">{{$t('myGuild.comparedToYesterday')}}</text>
								<u-icon
									:name="Number(spaceInfo.develop_mine_food)>=Number(spaceInfo.yesterday_develop_mine_food)?'/static/myGuild/up_triangle.png':'/static/myGuild/down_triangle.png'"
									color="#ED99FC" size="14" style="margin-right: 10rpx;"></u-icon>
							</view>
							<view class="right_gem">
								{{(spaceInfo.develop_mine_food-spaceInfo.yesterday_develop_mine_food) |formatData}}
							</view>
						</view>
					</view> -->
					<view class="df alc spb data_item">
						<view class="data_item_left c_w">
							<text class="left_title">{{$t('myGuild.mineAdd')}}</text>
							<view class="df alc left_gem tc">
								<text>{{spaceInfo.today_develop_mine_people_num || 0}}</text>
							</view>
						</view>
						<view class="data_item_right" :style="{color:is_up?'#F09AFE':'#9AFFFB'}">
							<view class="df alc">
								<text class="right_title">{{$t('myGuild.comparedToYesterday')}}</text>
								<u-icon
									:name="is_up?'/static/myGuild/up_triangle.png':'/static/myGuild/down_triangle.png'"
									color="#ED99FC" size="14" style="margin-right: 10rpx;"></u-icon>
							</view>
							<view class="right_gem">
								{{spaceInfo.today_develop_mine_people_num || 0}}
							</view>
						</view>
					</view>
					<!-- <view class="df alc spb data_item">
						<view class="data_item_left c_w">
							<text class="left_title">{{$t('myGuild.mineAdd')}}</text>
						</view>
						<view class="data_item_right" style="color:'#F09AFE'">
							{{spaceInfo.today_develop_mine_people_num || 0}}
						</view>
					</view> -->
					<!-- <view class="df alc spb data_item">
						<view class="data_item_left c_w">
							<text class="left_title">{{$t('myGuild.businessLockedGems')}}</text>
							<view class="df alc left_gem">
								<u-icon name="/static/btn/gem-icon1.png" size="14"
									style="margin-right: 10rpx;"></u-icon>
								<text>414,017,797</text>
							</view>
						</view>
						<view class="data_item_right" :style="{color:is_up?'#F09AFE':'#9AFFFB'}">
							<view class="df alc">
								<text class="right_title">{{$t('myGuild.comparedToYesterday')}}</text>
								<u-icon
									:name="is_up?'/static/myGuild/up_triangle.png':'/static/myGuild/down_triangle.png'"
									color="#ED99FC" size="14" style="margin-right: 10rpx;"></u-icon>
							</view>
							<view class="right_gem">
								414,017,797
							</view>
						</view>
					</view> -->
				</view>
			</view>
			<div class="text3  tc" style="color: #D4C9EB;">
				<div class="flex-colum-evenly" v-show="isShowGem">
					<li> <span style="font-size: 32rpx;">{{spaceInfo.user_num}}</span>
						{{$t('myGuild.boardSpacecraft')}}
					</li>
					<li>{{$t('myGuild.findNewWorld')}}</li>
					<view class="triangle">
					</view>
					<view class="today_add df alc jc">
						<text>{{$t('myGuild.today_add')}}</text> <text>{{spaceInfo.today_register_num}}</text>
					</view>
				</div>
			</div>
		</view>
		<view class="star_box" v-show="showStar">
			<view class="star_title fw">
				<p>{{$t('myGuild.starTitle')}}</p>
			</view>
			<view class="star_ball_nav">
				<div class="star_ball_item star1" @tap="starClick(1)">
					<div class="flex-colum-start">
						<li>{{$t('myGuild.star1')}}</li>
						<!-- <li>航行发现</li> -->
						<li>{{$t('myGuild.star1Tip')}}</li>
					</div>
				</div>
				<div class="star_ball_item star2" @tap="starClick(2)">
					<div class="flex-colum-start">
						<li>{{$t('myGuild.star2')}}</li>
						<li>{{$t('myGuild.star2Tip')}}</li>
						<!-- <li>层层夺宝</li> -->
					</div>
				</div>
				<div class="star_ball_item star3" @click="notOpen">
					<div class="flex-colum-start">
						<li>{{$t('myGuild.star3')}}</li>
						<li>IP{{$t('myGuild.star3Tip')}}</li>
						<!-- <li>IP新风潮</li> -->
					</div>
				</div>
				<div class="star_ball_item star4" @click="notOpen">
					<div class="flex-colum-start">
						<li>{{$t('myGuild.star4')}}</li>
						<li>NFT{{$t('myGuild.star4Tip')}}</li>
						<!-- <li>赢潮玩卡</li> -->
					</div>
				</div>
			</view>
			<view class="star_bottom">
				<p>
					<image src="/static/guild/ship.png" mode="heightFix"></image>
					<span>{{$t('myGuild.waitExplore')}}</span>
				</p>
			</view>
		</view>
		<transition name="dialog">
			<view class="dialog" v-show="show">
				<p>{{$t('myGuild.notOpen')}}</p>
			</view>
		</transition>
		<view class="noticeModal df alc jc " v-show="notice_show" style="color: #000;font-size: 32rpx;">
			<view class="notice_content pr">
				<view class="title fw tc">
					{{$t('myGuild.hint')}}
				</view>
				<view class="content" style="color: #333;line-height: 50rpx;">
					{{$t('myGuild.hintContent')}}
				</view>
				<!-- <view class="tips tc df fdc">
					<text>{{$t('myGuild.tips')}}</text>
					<text style="font-size: 24rpx;">({{$t('myGuild.reference')}})</text>
				</view> -->
				<u-icon @click="notice_show=false" class="notice_icon" name="close-circle" color="#fff"
					size="26"></u-icon>
			</view>
		</view>
		<tabbar :pageSrc="'pages/gather/association/myGuild/myGuild'" :tabList='tabList' :lang='language'></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar.vue';
	export default {
		components: {
			tabbar,
		},
		data() {
			return {
				isOnlineExam: uni.getStorageSync('isOnlineExam'),
				notice_show: false,
				language: '',
				show: false,
				showStar: true,
				spaceInfo: {},
				runData: {},
				timer: null,
				isShowGem: true,
				tabList: [],
				is_up: true,
				startVal: '',
				endVal: '',
				interval: null,
			};
		},
		created() {
			uni.hideTabBar();
			this.public_getExamConfig();
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		watch: {
			'endVal': {
				immediate: true, // 立即执行一次
				handler(newVal, oldVal) {
					if (newVal != oldVal) {
						this.startScroll()
					}
				}
			},
		},
		mounted() {

		},
		onShow() {
			this.language = uni.getStorageSync('locale');
			this.getSpaceInfo();
			this.startScroll()
			this.tabList = uni.getStorageSync('tabList');
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
			}
		},
		onUnload() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
			}
		},
		onHide() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
			}
		},
		filters: {
			formatData(number) {
				number = parseFloat(Math.abs(number)).toFixed(2)
				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		},
		mounted() {},
		methods: {
			startScroll() {
				if (this.interval) clearInterval(this.interval)
				this.interval = null
				this.interval = setInterval(this.nextFrame, 5000);
			},
			nextFrame() {
				this.startVal = uni.getStorageSync('allGems') || 0
				this.endVal = Number(this.endVal) + 1
				uni.setStorageSync('allGems', this.endVal)
			},
			async public_getExamConfig() {
				let res;
				if (uni.getStorageSync('is_login')) {
					res = await uni.ajax.public_getExamInfo();
				} else {
					res = await uni.ajax.public_getExamConfig();
				}
				this.isShowGem = res.data.space_page_show_food == 1 ? true : false;
			},
			async getSpaceInfo() {
				let res = await uni.ajax.getSpaceInfo();
				if (res.code == 200) {
					this.spaceInfo = res.data;
					this.startVal = uni.getStorageSync('allGems') || 0
					this.endVal = Number(res.data.platform_food)
					uni.setStorageSync('allGems', this.endVal)
				}
			},
			// convertTimestamp(timestamp) {
			// 	var days = Math.floor(timestamp / (24 * 60 * 60));
			// 	var hours = Math.floor((timestamp % (24 * 60 * 60)) / (60 * 60)).toString().padStart(2, '0');
			// 	var minutes = Math.floor((timestamp % (60 * 60)) / 60).toString().padStart(2, '0');
			// 	var seconds = Math.floor(timestamp % 60).toString().padStart(2, '0');
			// 	var days = days;
			// 	var dayDetail = hours + ":" + minutes + ":" + seconds;
			// 	var data = {
			// 		days,
			// 		dayDetail
			// 	};
			// 	return data;
			// },
			// getRunData(startTime){
			// 	var currentTimestamp = new Date().getTime();
			// 	const nowTime = parseInt(currentTimestamp / 1000);
			// 	var timestamp = nowTime - startTime; // 假设时间戳为 9876543210 毫秒
			// 	var formattedTime = this.convertTimestamp(timestamp);
			// 	this.runData = formattedTime;
			// },
			goGuild() {
				// 在当前页面跳转到目标页面
				uni.navigateTo({
					url: '/pages/gather/association/index'
				});
			},
			starClick(num) {
				if (!this.isOnlineExam) {
					if (num == 1) {
						this.topage('gather/association/starStory')
					} else {
						this.topage('gather/association/gemProduct')
					}
				} else {
					this.show = true;
					setTimeout(() => {
						this.show = false;
					}, 800)
				}
			},
			notOpen() {
				this.show = true;
				setTimeout(() => {
					this.show = false;
				}, 800)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 像素字体
	// @font-face {
	// 	font-family: 'undoLineFont';
	// 	src: url('../../../../assets/font/edit_undo_line/edunline.ttf');
	// }

	@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');

	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}


	.myGuild_container {
		width: 100%;
		padding: 40rpx 0 0;
		/* #ifndef H5  */
		min-height: calc(100vh);
		/* #endif */
		/* #ifndef APP-PLUS */
		min-height: calc(100vh - 100rpx);
		/* #endif */
		position: relative;
		font-size: 36rpx;
		background: url('../../../../static/myGuild/myGuild.png');
		min-height: 100%;
		@include backImg;
		color: #BD7EFF;

		.noticeModal {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			min-height: 100%;
			z-index: 100;
			background-color: rgba(0, 0, 0, 0.5);

			.notice_content {
				width: 80%;
				padding: 20rpx;
				background-color: #EFF3F8;
				border-radius: 20rpx;

				.title {
					margin: 0 0 20rpx;
					font-size: 40rpx;
				}

				.content {
					background-color: #fff;
					padding: 20rpx;
					border-radius: 20rpx;
				}

				.tips {
					color: #FCAC34;
					margin: 20rpx 0;
					line-height: 50rpx;
				}

				.notice_icon {
					position: absolute;
					right: 0;
					top: -60rpx;
				}

			}
		}

		.spaceCraft_box {
			width: 100%;

			.star_move_bg {
				width: 90%;
				margin-left: 5%;
				margin-bottom: 100rpx;
				padding: 40rpx 0 0rpx;

				.data {
					background: linear-gradient(to bottom, rgb(45, 52, 133), rgb(54, 32, 112));
					margin-top: 20rpx;
					padding: 10rpx;
					border-radius: 20rpx 20rpx 100rpx 100rpx;

					.data_item {
						padding: 0 40rpx 20rpx;
						margin-bottom: 20rpx;
						border-bottom: 2rpx solid #41438A;

						.data_item_left {
							flex: 3
						}

						.data_item_right {
							flex: 2
						}

						.left_title {
							opacity: 0.6;
							font-size: 30rpx;
						}

						.left_gem {
							margin-top: 10rpx;
						}

						.right_title {
							font-size: 24rpx;
							margin-right: 10rpx;
						}

						.right_gem {
							margin-top: 10rpx;
							font-size: 28rpx
						}
					}

					.data_item:last-child {
						margin-bottom: 0rpx;
						border: none;
					}
				}

				.text1 {
					width: 100%;
					text-align: center;

					/deep/ .u-count-num {
						font-size: 50rpx !important;
						color: #BD7EFF !important;
						font-weight: bold !important;
					}

					div {
						li {
							margin: 10rpx 0;
						}

						li:nth-child(1) {
							span {
								font-style: italic;
							}
						}

						li:nth-child(2) {
							font-size: 68rpx;

							.font_special {
								font-family: 'Orbitron', sans-serif;
							}
						}

						li:nth-child(3) {
							font-weight: 500;
							font-size: 32rpx;
						}
					}
				}
			}

			@keyframes flicker {
				0% {
					opacity: 1;
				}

				50% {
					opacity: 0.2;
				}

				100% {
					opacity: 1;
				}
			}

			.text3 {
				width: 100%;
				padding: 0rpx 0 40rpx;

				div {
					/* #ifdef H5 */
					margin-top: 50rpx;
					/* #endif */

					li {
						font-size: 24rpx;

						span {
							font-size: 30rpx;
							color: #fff;
						}
					}

					li:nth-child(3) {
						display: flex;
						align-items: center;
						background-image: linear-gradient(to right, #D6DBC5, #B2CBE1, #BAAEDE);
						-webkit-background-clip: text;
						color: transparent;
					}
				}

				.triangle {
					margin: 0 auto;
					width: 0;
					height: 0;
					border-left: 12rpx solid transparent;
					/* 左边框，透明 */
					border-right: 12rpx solid transparent;
					/* 右边框，透明 */
					border-bottom: 12rpx solid #BACBF7;
					/* 底部边框，颜色为黑色 */
				}

				.today_add {
					min-width: 50%;
					margin: -2rpx auto 20rpx;
					padding: 8rpx 20rpx;
					border-radius: 10rpx;
					background-color: #BACBF7;
					color: #fff;
					letter-spacing: 2rpx;
					font-size: 28rpx;
				}
			}
		}

		.star_box {
			width: 100%;
			flex: 1;
			margin-top: 60rpx;
			font-family: 'undoLineFont', sans-serif;

			.star_title {
				text-align: center;
				font-size: 40rpx;
				color: #ccc;
			}

			.star_ball_nav {
				width: 100%;
				padding: 10rpx 30rpx;
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 20rpx;
			}

			.star_ball_item {
				height: 220rpx;
				justify-self: center;
				align-self: center;

				div {
					height: 100%;
					padding: 30rpx;

					li {
						color: #999999;
						font-size: 22rpx;
						margin-bottom: 10rpx;
					}

					li:nth-child(1) {
						width: 170rpx;
						font-size: 28rpx;
						color: #fff;
						margin-top: 50rpx;
					}
				}
			}

			.star1 {
				width: 100%;
				background: url('../../../../static/myGuild/myGuild_2.png');
				@include backImg;
				background-size: 120% 110%;
			}

			.star2 {
				width: 100%;
				background: url('../../../../static/myGuild/myGuild_4.png');
				@include backImg;
			}

			.star3 {
				width: 100%;
				background: url('../../../../static/myGuild/myGuild_3.png');
				@include backImg;
			}

			.star4 {
				width: 100%;
				background: url('../../../../static/myGuild/myGuild_1.png');
				@include backImg;
			}

			.star_bottom {
				text-align: center;
				// margin: 120rpx 0;
				margin-bottom: 130rpx;
				margin-top: 40rpx;
				font-size: 24rpx;
				color: #4B4B4B;

				p {
					display: flex;
					gap: 8rpx;
					justify-content: center;


					image {
						height: 30rpx;
					}
				}
			}
		}

		.dialog {
			width: 400rpx;
			// height: 100rpx;
			background: url('../../../../static/guild/dialog.png');
			@include backImg;
			//background: red;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;

			p {
				color: #666666;
				font-size: 28rpx;
				line-height: 50rpx;
			}
		}

		.dialog-enter-active,
		.dialog-leave-active {
			transition: opacity 0.5s;
		}

		.dialog-enter,
		.dialog-leave-to {
			opacity: 0;
		}
	}
</style>