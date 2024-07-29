<template>
	<div class="collectImg">
		<div class="header1" v-if="imgInfo.mode_type==1" :style="{'height':imgInfo.height}">
			<u--image @click="imgPreview" :showLoading="true" class="icon" :src="imgInfo.img" width="100%" :height="imgInfo.height"></u--image>	
		</div>

		<div class="header1  header_bg flex-colum" v-if="imgInfo.mode_type==2" :style="img_bg">
			<web-view :src="'/hybrid/html/3d.html?bg='+imgInfo.bg_img.show_src+'&collectIcon='+imgInfo.img+'&bg_h='+imgInfo.bg_img.height"  style="height: 350px;width: 750rpx;"></web-view>
		</div>

		<div class="header1" v-if="imgInfo.mode_type==3">
			<!-- <video :autoplay="true" :controls="false" class="_video" :src="imgInfo.img"
				:loop="true" object-fit='fill' :show-center-play-btn="true"></video> -->
			<view class="video-box">
				<image :src="imgInfo.img+'?x-oss-process=video/snapshot,t_0,f_jpg'" style="width: 100%;" mode="widthFix"></image>
				<view class="mask flex-center" v-if="!show_video" @tap="play_video">
					<image src="/static/play.png" class="play" mode=""></image>
				</view>
				<!-- #ifdef APP-PLUS -->
				<video :src="imgInfo.img" :enable-progress-gesture="false" :play-strategy="2" v-if="show_video" ref="my_video" id="my_video"  class="_video" :show-center-play-btn="true" :loop="true"
					objectFit="fill" :controls="false"></video>	
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<video :src="imgInfo.img" :enable-progress-gesture="false" x5-video-orientation="portraint"  playsinline="true" webkit-playsinline="true"  x5-video-player-type="h5"  v-if="show_video" ref="my_video" id="my_video"  class="_video" :show-center-play-btn="true" :loop="true"
					objectFit="fill" :controls="false"></video>	
				
				<!-- #endif -->
			</view>
			
		</div>

		<div class="header1" v-if="imgInfo.mode_type==4" style="height: 350px;">
			<web-view :src="imgInfo.img+'?height=350'"  style="height: 350px;"></web-view>
		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				bg_style: {
					width: "",
					height: ""
				},
				img_bg: "",
				video_style: {
					width: "",
					height: ""
				},
				show:false,
				show_video:false
			}
		},
		props: {
			imgInfo: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		created () {	
			if(this.imgInfo.mode_type==2){
				if (this.imgInfo.bg_img) {			
					this.img_bg = {
						'background':'url(' + this.imgInfo.bg_img.show_src + ') no-repeat',
						'height':this.imgInfo.bg_img.height+'px'
					}
					
				}else{
					this.img_bg = {
						'background':'url(' + require('@/static/Gather/bg.png') + ') no-repeat',		
					}
				}
				setTimeout(()=>{
					this.show=true;
				},100)
			}
			
		},
		
		methods: {
			imgPreview() {
				var arr = [];
				arr[0] = this.imgInfo.img;
				uni.previewImage({
					urls: arr,
					current: 0,
				});
			},
			async get_videoInfo() {
				let system = await uni.pro.getSystemInfo();	
			},
			play_video(){
				this.videoContext = uni.createVideoContext('my_video',this);
				this.show_video=true;
				this.$nextTick(()=>{
					this.videoContext.play();  
				})
			},
			async getElInfo() {

				let system = await uni.pro.getSystemInfo();
				let buy_btn = await uni.utils.info_distance("buy_btn");

				this.bg_style = {
					'height': system.windowHeight - buy_btn.height + "px",
					'width': system.windowWidth + "px"
				};
			},
		}
	}
</script>

<style lang="scss" scoped>
	.collectImg {
		.header1 {
			overflow: hidden;
			-webkit-backface-visibility: hidden;
			-webkit-transform: translate3d(0, 0, 0);
			.icon {
				width: 100%;
			}

			._video {
				width: 100%;
				height: 450rpx;
			}
			.video-box {
				background-color: #fff;
				position: relative;
				width: 100%;
				min-height: 500rpx;
				.video_mask{
					left: 0rpx;
					top: 0rpx;
					position: absolute;
					width: 100%;
					height: 100%;
					
				}
				._video {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0rpx;
					left: 0rpx;
					
				}
				
				.mask {
					background: rgba(0, 0, 0, 0.1);
					left: 0rpx;
					top: 0rpx;
					position: absolute;
					width: 100%;
					height: 100%;
			
					.play {
						width: 120rpx;
						height: 120rpx;
					}
					
				}
			}

			.goods {
				width: 432rpx;
				height: 432rpx;
				// margin-top: 60rpx;
				position: relative;
				transform-style: preserve-3d;
				perspective: 12000rpx;
				transform: rotateX(800deg) rotateY(-620deg) rotateZ(-145deg);
				animation: rotate 15s linear infinite;
				background: url("@/static/Gather/i54.png") no-repeat;
				background-size: 100% 100%;
				border-radius: 40rpx;
				top: -60rpx;
			}

			.goods .bg {
				width: 432rpx;
				height: 432rpx;
				// border: 2rpx solid #000;

				position: absolute;
				left: calc(50% - 216rpx);
				top: calc(50% - 216rpx);
				border-radius: 20rpx;
				z-index: 99;
			}

			.goods .bg0 {
				transform: rotateY(0deg) translateZ(0rpx);
			}

			.goods .bg1 {
				transform: rotateY(0deg) translateZ(1rpx);
			}

			.goods .bg2 {
				transform: rotateY(0deg) translateZ(2rpx);
			}

			.goods .bg3 {
				transform: rotateY(0deg) translateZ(3rpx);
			}

			.goods .bg4 {
				transform: rotateY(0deg) translateZ(4rpx);
			}

			.goods .bg5 {
				transform: rotateY(0deg) translateZ(5rpx);
			}

			.goods .bg6 {
				transform: rotateY(0deg) translateZ(6rpx);
			}

			.goods .bg7 {
				transform: rotateY(0deg) translateZ(7rpx);
			}

			.goods .bg8 {
				transform: rotateY(0deg) translateZ(8rpx);
			}

			.goods .bg9 {
				transform: rotateY(0deg) translateZ(9rpx);
			}

			.goods .bg10 {
				transform: rotateY(0deg) translateZ(10rpx);
			}
			
			.goods .bg11 {
				transform: rotateY(0deg) translateZ(11rpx);
			}
			.goods .bg12 {
				transform: rotateY(0deg) translateZ(12rpx);
			}
			.goods .bg13 {
				transform: rotateY(0deg) translateZ(13rpx);
			}
			.goods .bg14 {
				transform: rotateY(0deg) translateZ(14rpx);
			}
			
			.goods .bg1_ {
				transform: rotateY(180deg) translateZ(0rpx);
			}

			.goods .bg1_ {
				transform: rotateY(180deg) translateZ(1rpx);
			}

			.goods .bg2_ {
				transform: rotateY(180deg) translateZ(2rpx);
			}

			.goods .bg3_ {
				transform: rotateY(180deg) translateZ(3rpx);
			}

			.goods .bg4_ {
				transform: rotateY(180deg) translateZ(4rpx);
			}

			.goods .bg5_ {
				transform: rotateY(180deg) translateZ(5rpx);
			}

			.goods .bg6_ {
				transform: rotateY(180deg) translateZ(6rpx);
			}

			.goods .bg7_ {
				transform: rotateY(180deg) translateZ(7rpx);
			}

			.goods .bg8_ {
				transform: rotateY(180deg) translateZ(8rpx);
			}

			.goods .bg9_ {
				transform: rotateY(180deg) translateZ(9rpx);
			}
			.goods .bg10_ {
				transform: rotateY(180deg) translateZ(10rpx);
			}
			.goods .bg11_ {
				transform: rotateY(180deg) translateZ(11rpx);
			}
			.goods .bg12_ {
				transform: rotateY(180deg) translateZ(12rpx);
			}
			.goods .bg13_ {
				transform: rotateY(180deg) translateZ(13rpx);
			}
		


			.goods_bg {
				margin-top: 32rpx;
				width: 750rpx;
				height: 360rpx;
			}

			.goods image {
				position: absolute;
				left: 0;
				top: 0;
			}

			.goods image:nth-child(1) {
				width: 380rpx;
				height: 380rpx;
				// border: 2rpx solid #000;
				transform: rotateY(0deg) translateZ(14rpx);
				position: absolute;
				left: calc(50% - 190rpx);
				top: calc(50% - 190rpx);
				border-radius: 20rpx;
				z-index: 100;
			}

			.goods image:nth-child(2) {
				// width: 16rpx;
				// height: 532rpx;
				width: 0rpx;
				height: 0rpx;
				// border-left: 2rpx solid #000;
				// border-right: 2rpx solid #f5f5f5;
				transform: rotateY(90deg) translateZ(520rpx);

			}

			.goods image:nth-child(3) {
				width: 380rpx;
				height: 380rpx;
				// border: 2rpx solid #f5f5f5;
				transform: rotateY(180deg) translateZ(13rpx);
				position: absolute;
				left: calc(50% - 190rpx);
				top: calc(50% - 190rpx);
				border-radius: 20rpx;
				z-index: 100;
			}

			.goods image:nth-child(4) {
				// width: 16rpx;
				// height: 532rpx;
				width: 0rpx;
				height: 0rpx;
				// border-left: 2rpx solid #f5f5f5;
				// border-right: 2rpx solid #f5f5f5;
				transform: rotateY(270deg) translateZ(1rpx);
			}



			.goods view {
				box-sizing: border-box;
				position: absolute;
				left: calc(50% - 190rpx);
				top: calc(50% - 190rpx);
				width: 380rpx;
				height: 380rpx;
				// padding: 20px;
				// border: 6rpx solid black;
				border-radius: 60rpx;
			}

			@keyframes rotate {
				0% {
					transform: rotateY(0deg);
					/*从0度开始*/
				}

				100% {
					transform: rotateY(360deg);
					/*360度结束*/
				}
			}

		}

		.header_bg {
			background-color: #fff;
			background-size: 100% 100% !important;
			// background: url("@/static/Gather/bg.png") no-repeat;
			// background-size: 100% 100%;
			width: 100%;
		}
	}
</style>
