<template>
	<view class="updatePopup flex-colum" v-if="show" :style="style">
		<view class="mask_top_back">
			<view class="mask_top_back_content">
				<p class="bold color_w">{{$t('homepage.versionUpdate')}}</p>
				<p>VERSION UPGRADE</p>
			</view>
		</view>
		<view class="mask_box">
			<!-- <view class="flex-center">
				<image src="/static/up.png" class="up_logo" mode=""></image>
			</view> -->
			<view class="mask_title bold">
				{{$t('homepage.isUpdate')}}V {{info.ver}}？
			</view>
			<view class="mask_version bold">
				<!-- 新版本大小：298.6MB -->
			</view>
			<view class="mask_content">
				<!-- 	<text class="content">
					{{info.update_content}}
				</text> -->
				<p>V{{info.ver}}{{$t('homepage.verUp')}}</p>
				<p>{{info.update_content}}</p>
				<!-- <p> -全新频道：大逃杀
				<p>
				<p>文案根据内容自定文案根据内容自定
				<p>
				<p> 文案根据内容自定文案根据内容自定</p>
				<p> 文案根据内容自定文案根据内容自定</p>
				<p> 文案根据内容自定文案根据内容自定</p>
				<p> 文案根据内容自定文案根据内容自定</p>
				<p> 文案根据内容自定文案根据内容自定</p> -->
			</view>
			<view class="up_btn flex-center" @tap="update" v-if="!is_line">
				<text class="up_t">{{$t('homepage.directUpgrade')}}</text>
			</view>
			<view class="up_btn browser_dow  flex-center" @tap="update" v-if="!is_line">
				<text class="up_t">{{$t('homepage.browDownload')}}</text>
			</view>

			<view class="mask_footer" v-if="is_line" style="margin-top: 45rpx;height: 80rpx;">
				<!-- <u-line-progress :striped="true" :percentage="" activeColor="#82D7C3" :striped-active="true">
				</u-line-progress> -->
				<u-line-progress :percentage="percent" activeColor="#9867DF"></u-line-progress>
			</view>
		</view>
		<view class="line_box" v-if="is_btn">

		</view>
		<view class="flex-center close" v-if="is_btn" @tap="close_">
			<u-icon name="close-circle" color="#fff" size="35"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			showPopup: {
				type: Boolean,
				default: true
			},
			downUrl: {
				type: String,
				default: ""
			},
			// info:{
			// 	update_content:"",更新内容
			//  is_apk:"",//1是可下载apk地址0是h5地址
			//  is_force："",//1是弹框不可关闭0是弹框可关闭
			//  download_url："",//is_apk=1 可下载apk地址  is_apk=0 h5地址
			// }
			info: {
				type: Object,
				default () {
					return {

					}
				}
			}
		},
		data() {
			return {
				show: false,
				is_line: false,
				percent: 0,
				style: "",
				downloadTask: ''

			}
		},
		created() {
			this.show = this.showPopup;
		},
		async mounted() {
			uni.getSystemInfo({
				success: (system) => {
					this.style = {
						'height': system.windowHeight + "px",
						"width": system.windowWidth + "px"
					};
				}
			})

		},
		computed: {
			is_btn() {
				if (this.info.is_force == 1) {
					return false;
				} else {
					return true;
				}
			}
		},

		methods: {
			close_() {
				// 取消下载任务
				if (this.downloadTask) {
					this.downloadTask.abort();
				}
				// 触发关闭模态框的事件
				this.$emit('updateValue', 'close_modal');
			},
			update() {
				if (this.info.is_apk == 1) {
					this.updateApp();
				} else {
					plus.runtime.openURL(this.info.download_url);
				}
			},
			updateApp() {
				uni.showLoading({
					title: this.$t('homepage.updatePrepare')
				});
				console.log("download_url===>", this.info.download_url);
				var that = this; // 修正变量名错误
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					console.log(widgetInfo);
					that.downloadTask = uni.downloadFile({ // 存储下载任务对象
						url: that.info.download_url,
						success: (downloadResult) => {
							if (downloadResult.statusCode === 200) {
								plus.runtime.install(downloadResult.tempFilePath, {
									force: false
								}, function() {
									console.log('install success...');
									setTimeout(function() {
										plus.runtime.restart();
									}, 500);
								}, function(e) {
									console.error('install fail...');
									uni.showToast({
										title: this.$t('homepage.updateFailContact'),
										icon: "none"
									});
								});
							}
						},
						complete: () => {

						}
					});
					that.downloadTask.onProgressUpdate(function(res) {
						uni.hideLoading();
						that.is_line = true;
						if (res.progress - that.percent > 10) {
							that.percent = res.progress;
						}
					});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	@font-face {
		font-family: 'ZhengQing';
		src: url('../assets/font/ZhengQing/ZhengQingKeLengKuTi-2.ttf');
	}

	.updatePopup {
		position: fixed;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.5);
		top: 0px;
		left: 0px;

		.up_logo {
			width: 205rpx;
			height: 216rpx;
		}

		.mask_top_back {
			width: 520rpx;
			height: 190rpx;
			background: url('/static/homepage/top_bg2.png');
			@include backImg;

			.mask_top_back_content {
				margin-top: 65rpx;

				p {
					padding-right: 150rpx;
					text-align: center;
					//background: red;
				}

				P:nth-child(1) {
					font-size: 56rpx;
					font-family: 'ZhengQing', sans-serif;
				}

				P:nth-child(2) {
					font-size: 20rpx;
					font-family: KaiTi, KaiTi;
					font-weight: 400;
					margin-top: 20rpx;
					color: #999999;
					letter-spacing: 8rpx;
				}

			}
		}

		.mask_box {
			position: relative;
			width: 560rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			//padding: 45rpx 66rpx;
			padding: 60rpx 45rpx 40rpx;
			box-sizing: border-box;
		}

		.line_box {
			width: 0;
			height: 100rpx;
			border: 1px solid #FFFFFF;
		}

		.close {}

		/deep/.u-icon {
			margin-top: -10rpx;
		}

		.up_btn {
			margin-top: 20rpx;
			width: 100%;
			height: 80rpx;
			background: #222222;
			// background-image: linear-gradient(to right, #82D7C3, #48C6A8);
			border-radius: 10rpx;

			.up_t {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		.browser_dow {
			background: #fff;
			border: 1px solid #222222;

			.up_t {
				color: #222222;
			}
		}


		.mask_title {
			font-size: 26rpx;
			//font-family: PingFang SC, PingFang SC;
			color: #333333;
			letter-spacing: 2rpx;
			// margin: 22rpx 0rpx;
		}

		.mask_version {
			margin-top: 24rpx;
			font-size: 24rpx;
			//font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			color: #666666;
			letter-spacing: 2rpx;
			// letter-spacing: 4rpx;
		}

		.mask_content {
			margin-top: 10rpx;
			font-size: 26rpx;
			//font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			line-height: 50rpx;
			color: #666666;
		}

		.content {
			font-size: 26rpx;
			//font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		/* #ifdef APP-PLUS */
		align-items: center;
		/* #endif */
		flex-wrap: wrap;
		flex-direction: row !important;
		/* #ifdef H5 */
		align-content: center !important;
		align-items: center !important;
		/* #endif */
	}

	.flex-start {
		display: flex;
		justify-content: flex-start;
		/* #ifdef APP-PLUS */
		align-items: center;
		/* #endif */
		flex-wrap: wrap;
		flex-direction: row !important;
		/* #ifdef H5 */
		align-content: center !important;
		align-items: center !important;
		/* #endif */
	}

	.flex-end {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: row !important;
	}

	.flex-colum {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* #ifdef APP-PLUS */
		align-items: center;
		/* #endif */
		/* #ifdef H5 */
		align-content: center !important;
		align-items: center !important;
		/* #endif */

	}

	.flex-colum-start {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;


	}

	.flex-colum-end {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;

	}

	.flex-between {
		display: flex;
		justify-content: space-between;
		/* #ifdef APP-PLUS */
		align-items: center;
		/* #endif */
		flex-wrap: wrap;
		flex-direction: row !important;
		/* #ifdef H5 */
		align-content: center !important;
		align-items: center !important;
		/* #endif */
	}

	.flex-around {
		display: flex;
		justify-content: space-around;
		/* #ifdef APP-PLUS */
		align-items: center;
		/* #endif */
		flex-wrap: wrap;
		flex-direction: row !important;
		/* #ifdef H5 */
		align-content: center !important;
		align-items: center !important;
		/* #endif */
	}
</style>