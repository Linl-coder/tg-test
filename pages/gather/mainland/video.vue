<template>
	<view class="all">
		<!-- #ifdef H5 -->
		<view class="overlay flex-between" v-if="showOverlay">
			<u-icon :name="muted?'volume-off':'volume'" color="#fff" size="28" @click="muted=!muted"></u-icon>
			<u-count-down :time="30 * 1000" format="ss" @finish="adsSeeDone" v-show="!showCancelIcon"></u-count-down>
			<u-icon name="close" color="#fff" size="28" v-show="showCancelIcon" @click="closeVideo"></u-icon>
		</view>
		<!-- #endif -->
		<video id="myVideo" class="fullscreen-video" :enable-progress-gesture="false" :muted="muted" :autoplay="true"
			:controls="false" :show-center-play-btn="false" :show-loading="true" :loop="false" :src="video_src">
			<!-- #ifdef APP-PLUS -->
			<!-- 覆盖层 -->
			<cover-view class="overlay flex-between" v-if="showOverlay">
				<cover-view class="play-button" @tap="muted=!muted">
					{{muted?'muted':'sound'}}
				</cover-view>
				<cover-view v-if="!showCancelIcon">
					{{ remainingTime }}
				</cover-view>
				<cover-view v-else @tap="closeVideo">Close</cover-view>
			</cover-view>
			<!-- #endif -->
		</video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOverlay: true,
				showCancelIcon: false,
				muted: false,
				// 初始化剩余时间
				remainingTime: 30,
				countdownTimer: '',
				videoList: [],
				videoList2: [],
				videoIndex: 0,
				isFormal: false,
				video_src: ''
			};
		},
		created() {
			// #ifdef APP-PLUS
			// 组件创建时开始倒计时
			this.startCountdown(30); // 开始5秒倒计时
			// #endif
			this.isFormal = uni.is_online ? true : false;
		},
		onHide() {
			// #ifdef APP-PLUS
			if (this.countdownTimer) {
				console.log(12)
				clearInterval(this.countdownTimer);
			}
			// #endif
		},
		beforeDestroy() {
			// 组件销毁前清除定时器
			if (this.countdownTimer) {
				console.log(1)
				clearInterval(this.countdownTimer);
			}
		},
		onLoad(option) {
			this.videoIndex = Number(option.index);
			this.videoList = JSON.parse(option.videoList)
			this.video_src = this.videoList[this.videoIndex]
			console.log(this.video_src)
		},
		methods: {
			adsSeeDone() {
				// #ifdef H5
				this.public_haveSeeAds();
				this.showCancelIcon = true;
				// #endif
			},
			async public_haveSeeAds() {
				let res = await uni.ajax.public_haveSeeAds();
				console.log("观看本次视频成功===>", res.data);
				if (res.code == 200) {
					uni.$u.toast(this.$t('signIn.currentAdsSeeDone'));
				}
			},
			startCountdown(duration) {
				// 设置剩余时间
				this.remainingTime = duration;
				// 每秒减少时间并更新视图
				this.countdownTimer = setInterval(() => {
					if (this.remainingTime > 0) {
						this.remainingTime--;
					} else {
						this.public_haveSeeAds();
						this.showCancelIcon = true;
						clearInterval(this.countdownTimer);
					}
				}, 1000);
			},
			closeVideo() {
				// console.log("1111");
				this.muted = true;
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-count-down__text {
		color: #fff !important;

		span {
			font-size: 34rpx !important;
		}
	}

	.all {
		width: 100%;
		// height: 400rpx;
	}

	/* 视频组件样式 */
	.fullscreen-video {
		position: fixed;
		/* 固定定位，相对于视口 */
		top: 0;
		left: 0;
		width: 100vw;
		/* 视口宽度 */
		height: 100vh;
		/* 视口高度 */
		object-fit: cover;
		/* 覆盖整个容器，如果需要的话 */
		z-index: -1;
		/* 选择一个适合的z-index值 */
	}

	.overlay {
		width: 100%;
		height: 90rpx;
		padding: 10rpx 20rpx;
		position: fixed;
		z-index: 77777;
		/* #ifdef H5 */
		top: 20rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		top: 100rpx;
		/* #endif */
		color: #fff;
		font-size: 40rpx;
		// background: red;



		image {
			height: 60rpx;
		}
	}
</style>