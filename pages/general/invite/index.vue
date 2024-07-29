<template>
	<view class="invite">
		<view class="a" id="htmlCanvas">
			<view id="app">
				<view class="btn_box">
					<!-- 导航栏菜单 -->
					<button :class="{ active: selectedTab === 'android' }"
						@click="selectedTab = 'android'"><span>Android</span></button>
					<button :class="{ active: selectedTab === 'ios' }"
						@click="selectedTab = 'ios'"><span>iOS</span></button>
				</view>

				<view class="content_1">
					<!-- 根据选择显示内容 -->
					<view v-if="selectedTab === 'android'">
						<view class="androidBox">
							<view style="display: flex; justify-content: center;">
								<image src="/static/else/Android_p.png" mode="widthFix"
									style="width: 50%; height: auto;"></image>
							</view>
							<view class="downloadBtn">
								<!-- <button style="background-color:black; display: flex; justify-content: space-between; align-items: center;">
								    <img style="width: 25px; height: 25px; margin-right: 10px;" src="../../../static/else/APKS.png" alt="Icon">
								    <span>Android APK</span>
								</button> -->
								<a :href="apkDownUrl" class="download-link flex-center">
									<div
										style="background-color:black; display: flex; justify-content: center; align-items: center; padding: 5px 10px; border-radius: 5px; width: 250px; height: 45px; ">
										<image style="width: 25px; height: 25px; margin-right: 10px;"
											src="/static/else/APKS.png" alt="Icon">
											<span>Android APK</span>
									</div>
								</a>
							</view>
						</view>
					</view>
					<view v-else-if="selectedTab === 'ios'">
						<view class="iosBox">
							<view style="display: flex; justify-content: center;">
								<image src="/static/else/iPhone.png" mode="widthFix" style="width: 50%; height: auto;">
								</image>
							</view>
							<view class="downloadBtn">
								<a href="https://apps.apple.com/us/app/p-t-e-f/id6477137277"
									class="download-link flex-center">
									<div
										style="background-color:black; display: flex; justify-content: center; align-items: center; padding: 5px 10px; border-radius: 5px;height: 42px;">
										<image style="width: 25px; height: 25px; margin-right: 10px;"
											src="/static/else/ios.png" alt="Icon">
											<span>App Store</span>
									</div>
								</a>

								<a :href="iosLight" class="download-link flex-center">
									<div
										style="background-color:black; display: flex; justify-content: center; align-items: center; padding: 5px 10px; border-radius: 5px;height: 42px;">
										<image style="width: 25px; height: 25px; margin-right: 10px;"
											src="/static/else/ios.png" alt="Icon">
											<span>iOS Light</span>
									</div>
								</a>

							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <image mode="aspectFill" src="@/static/else/share_pos.png" class="a_back"></image> -->

			<view class="slogn color_w ">
				<!-- 	Your phone,
				your ATM! -->
			</view>
			<view class="a_a ">
				<image mode="widthFix" src="@/static/else/old_back.png" @tap="toback()"></image>
				<text class="color_w">{{$t('invite.shareTo')}}</text>
				<!-- <view @tap="topage('/pages/general/Luckydraw/catch_rule')">邀请规则</view> -->
			</view>
			<!-- 	<view class="a_b">
				<image mode="widthFix" src="@/static/else/invite.png"></image>
			</view> -->

			<view>
				<button @click="targetUrl" style="background-color: #A9F8F8;"><span style="color: #333333;">Access
						Now</span>
				</button>
			</view>

			<view class="code-box flex-between" style="margin-top: 10px; border-radius: 5px;">

				<view class="info ">
					<view class="title">
						<!-- {{$t('invite.myInviteCode')}} -->
						{{$t('invite.myInviteCode')}}: {{user_info.user_code}}
					</view>
					<view class="invite-code">
						<!-- 	<view class="">
							<text class="t1">{{$t('invite.myInviteCode')}}: {{user_info.user_code}}</text>
						
						</view> -->
						<view class="flex-end">
							<text>{{$t('invite.teamToDigGem')}}</text>
						</view>
					</view>

					<!-- <view class="invite-btn flex-center" @tap="openshare">
						立即邀请
					</view> -->
				</view>
				<view class="">
					<view style="display: flex;align-items: center;" @tap="copy_link()">
						<image style="width: 15px;height: 15px;" mode="widthFix" src="@/static/else/save.png"></image>
						<text class="t" style="margin-left: 10px;">{{$t('invite.copyLink')}}</text>
					</view>
					<view style="display: flex;align-items: center; margin-top: 10px;" @tap="copy(user_info.user_code)">
						<image style="width: 15px;height: 15px;" mode="widthFix" src="@/static/else/save.png"></image>
						<text class="t" style="margin-left: 10px;">{{$t('invite.saveInviteCode')}}</text>
					</view>
				</view>

				<view class="icon-box">
					<image :src="qrcode" class="icon" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 		<image src="/static/General/back.png" @tap="toback()" mode="widthFix" class="public_back"></image>
		<view class="bg-box">
			<image src="/static/General/invite.png" class="icon" mode=""></image>
		</view> -->
		<view class="content">
			<!-- 邀请吗 -->
			<!-- <view class="code-box flex-between">
				<view class="icon-box">
					<image :src="qrcode" class="icon" mode=""></image>
				</view>
				<view class="info">
					<view class="title">
						我的邀请码
					</view>
					<view class="invite-code">
						<text class="t1">{{user_info.user_code}}</text>
						<image src="/static/else/copy.png" @tap="copy(user_info.user_code)" class="copy" mode="">
						</image>
					</view>
					<view class="invite-btn flex-center" @tap="openshare">
						立即邀请
					</view>
				</view>
			</view> -->

			<!-- 邀请列表 -->

			<!-- <view class="invite-list">
				<invitelist></invitelist>
			</view> -->

			<!-- 			<view class="lian-box flex-center">
				<image src="/static/lian.png" class="icon" mode=""></image>
			</view> -->
			<!-- 下载 -->
			<!-- <view class="download flex-between">
				<view class="download-item flex-center">
					<a :href="`${baseUrl}/PTE.apk`" class="download-link flex-center">
						<image src="/static/else/apk.png" alt="APK Icon" mode="" class="download-icon"></image>
						<span class="download-text">Android Downlaod</span>
					</a>
				</view>
				<view class="download-item flex-center">
					<a href="https://apps.apple.com/us/app/p-t-e-f/id6477137277" class="download-link flex-center">
						<image src="/static/else/apple-logo.png" alt="APK Icon" mode="" class="download-icon">
						</image>
						<span class="download-text">ios Downlaod</span>
					</a>
				</view>
			</view> -->




			<!-- <view class="f-btn flex-between" style="margin-top: -50px;">
				<view class="f-btn-box flex-center" @tap="copy_link()">
					<image mode="widthFix" src="@/static/else/save.png"></image>
					<text class="t">{{$t('invite.copyLink')}}</text>
				</view>
				<view class="f-btn-box flex-center" @tap="copy(user_info.user_code)">
					<image mode="widthFix" src="@/static/else/save.png"></image>
					<text class="t">{{$t('invite.saveInviteCode')}}</text>
				</view>
			</view> -->

		</view>

		<view class="share-box" v-if="showshare">
			<share ref="share" @close="closeshare" :qrcode="qrcode"></share>
		</view>

	</view>
</template>

<script>
	import share from './components/share.vue';
	import invitelist from "./components/inviteList.vue";
	import QR from "@/basic_toys/getQrcode.js";
	export default {
		components: {
			invitelist,
			share
		},
		data() {
			return {
				selectedTab: 'android',
				showshare: false,
				qrcode: "",
				baseUrl: "",
				apkDownUrl: '',
				iosLight: '',
				h5Url: ''
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			is_login() {
				return this.$store.getters.is_login;
			}
		},
		onShow() {
			// this.baseUrl = uni.conf.baseUrl;
			this.initUrl();
			// console.log("1111 => ", `${this.baseUrl}PTE.apk`);
			// console.log("2222", `itms-services://?action=download-manifest&url=${this.baseUrl}master/manifest.plist`);
		},
		created() {
			this.set_jscode();
		},
		methods: {
			initUrl() {
				this.baseUrl = uni.conf.baseUrl;
				if (uni.conf.companycode == '60') {
					this.apkDownUrl = `${this.baseUrl}JJhub.apk`;
					this.iosLight =
						`itms-services://?action=download-manifest&url=${this.baseUrl}master/manifest_ma.plist`;
					this.h5Url = uni.is_online ? 'https://cdn.internalver-ma.ptejj.com/' : 'https://h5vn02.yygogogo.com/'
				} else {
					this.apkDownUrl = `${this.baseUrl}PTE.apk`;
					this.iosLight = `itms-services://?action=download-manifest&url=${this.baseUrl}master/manifest.plist`;
					this.h5Url = uni.is_online ? 'https://cdn.internalver.ptejj.com/' : 'https://h5vn.yygogogo.com/'
				}
			},
			copy_link() {
				this.copy(this.h5Url + '#/pages/general/register/index?user_code=' + this.user_info.user_code);
			},
			targetUrl() {
				const systemInfo = uni.getSystemInfoSync();
				console.log("当前设备环境：", systemInfo.platform)
				let baseUrl;
				if (uni.conf.companycode == '60') {
					if (systemInfo.platform == "android" || systemInfo.platform == "ios") {
						baseUrl = 'https://cdn.internalver-ma.ptejj.com/'
						plus.runtime.openURL(baseUrl);
					} else {
						window.open(baseUrl)
					}
				} else if (uni.conf.companycode == '25') {
					if (systemInfo.platform == "android" || systemInfo.platform == "ios") {
						baseUrl = 'https://cdn.internalver.ptejj.com/'
						plus.runtime.openURL(baseUrl);
					} else {
						window.open(baseUrl)
					}
				}


			},
			openshare() {
				// this.showshare = true;
				// this.$nextTick(() => {
				// 	this.$refs.share.create_share();
				// })
				//console.log("222222zx");
			},
			receiveRenderData(val) {
				uni.showLoading({
					title: this.$t('invite.downloading')
				})
				let that = this
				let base64 = val
				const bitmap = new plus.nativeObj.Bitmap("test");
				bitmap.loadBase64Data(base64, function() {
					const url = "_doc/" + new Date().getTime() + ".png"; // url为时间戳命名方式
					bitmap.save(url, {
						overwrite: true, // 是否覆盖
						// quality: 'quality'  // 图片清晰度
					}, (i) => {
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								uni.hideLoading()
								uni.showToast({
									title: this.$t('invite.picSaveSuccess'),
									icon: 'none'
								})
								bitmap.clear()
							}
						});
					}, (e) => {
						uni.hideLoading()
						uni.showToast({
							title: this.$t('invite.picSaveFail'),
							icon: 'none'
						})
						bitmap.clear()
					});
				}, (e) => {
					uni.hideLoading()
					uni.showToast({
						title: this.$t('invite.picSaveFail'),
						icon: 'none'
					})
					bitmap.clear()
				});
			},
			closeshare() {
				this.showshare = false;
			},
			set_jscode() {
				// let pageHeader = uni.is_online ? 'https://cdn.internalver.ptejj.com/' : 'https://h5vn.yygogogo.com/';
				let img = QR.createQrCodeImg(this.h5Url + '#/pages/general/register/index?user_code=' + this
					.user_info
					.user_code, {
						size: parseInt(300) //二维码大小
					});
				this.qrcode = img;
			},




		}
	}
</script>



<script module="renderScript" lang="renderjs">
	import html2canvas from 'html2canvas';
	export default {
		data() {
			return {}
		},
		mounted() {},
		methods: {
			// 发送数据到逻辑层
			emitData(e, ownerVm) {
				const dom = document.getElementById('htmlCanvas');

				// 设置图片元素的跨域属性
				const img = dom.querySelector('img');
				img.setAttribute("crossOrigin", "Anonymous");

				html2canvas(dom, {
					width: dom.clientWidth, //dom 原始宽度
					height: dom.clientHeight,
					scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
					scrollX: 0,
					dpi: 300,
					useCORS: true, //支持跨域，但好像没什么用
					allowTaint: false
				}).then((canvas) => {
					// 将生产的canvas转为base64图片3
					ownerVm.callMethod('receiveRenderData', canvas.toDataURL('image/png'))
				});

			}
		}
	};
</script>


<style lang="scss">
	.a {
		position: relative;
		width: 100%;
		height: 1300rpx;
		//padding: 60rpx 40rpx;

		padding: 0 40rpx 0 40rpx;
		/* #ifdef H5 */
		padding-top: 120rpx;
		/* #endif */

		/* #ifdef APP-PLUS */
		padding-top: 180rpx;
		/* #endif */


		//background: red;

		.a_back {
			width: 100%;
			height: 900rpx;
			//background: blue;
		}

		.slogn {
			position: absolute;
			top: 300rpx;
			left: 60rpx;
			font-size: 55rpx;
			font-weight: bold;
			//font-family: PingFang SC-Regular, PingFang SC;
			font-family: 'Roboto Slab', sans-serif;
			color: #E6DDB6;

		}

		.a_a {
			position: absolute;
			top: var(--status-bar-height);
			padding: 24rpx 32rpx;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			// justify-content: space-between;

			image {
				width: 40rpx;
			}

			text {
				font-size: 32rpx;
				margin-left: 30rpx;
				letter-spacing: 2rpx;
			}

			view {
				font-size: 28rpx;
				//font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				letter-spacing: 1px;
			}
		}

		.code-box {
			width: 100%;
			background-color: #010101;
			color: #fff;
			margin-top: -20rpx;
			//border-radius: 32rpx;
			//box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
			padding: 32rpx;
			box-sizing: border-box;

			.icon-box {
				width: 140rpx;
				height: 140rpx;

				.icon {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				width: calc(100% - 150rpx);
				box-sizing: border-box;
				// padding-left: 32rpx;

				.title {
					// width: 300rpx;
					font-size: 24rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					background: #323232;
					border-radius: 20rpx;
					//color: #000000;
				}

				.invite-code {
					width: 100%;
					padding: 8rpx 20rpx;
					// background: #323232;
					// border-radius: 20rpx;
					margin-top: 20rpx;
					// margin-right: 70rpx;
					font-size: 24rpx;
					//margin-top: 80rpx;


					.t1 {
						// font-size: 36rpx;
						//font-family: PingFang SC-Semibold, PingFang SC;
						//font-weight: bold;
						//color: #000000;
					}

					.copy {
						width: 28rpx;
						height: 28rpx;
						margin-left: 16rpx;
					}
				}

				.invite-btn {
					width: 220rpx;
					height: 68rpx;
					background: var(--theme);
					border-radius: 8rpx;
					color: #fff;
					font-size: 28rpx;
				}
			}
		}

		.a_b {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 462rpx;

			image {
				width: 100%;
			}
		}
	}

	.invite {
		width: 100%;
		min-height: 100vh;
		background-color: #222222;

		.share-box {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;
			background: rgba(0, 0, 0, 0.2);
		}

		.content {
			width: 100%;
			position: relative;
			z-index: 9;
			margin-top: 10px;

			.download {
				width: 100%;
				margin: 40rpx 0;
				padding: 0 20rpx;
				//background: blue;

				.download-item {
					width: 350rpx;
					//background: blue;

					.download-link {
						width: 100%;
						//padding: 10rpx;
						text-decoration: none;
						color: #fff;
						//background: #fff;
						//border-radius: 8px;
						//box-shadow: 0 2px 4px rgba(16, 13, 13, 0.2);


						image {
							width: 50rpx;
							height: 45rpx;
						}

						.download-text {
							border-bottom: 1px solid #fff;
						}

					}


					/* 当用户点击下载链接时的样式 */
					.download-link:active {
						//background-color: #ccc; /* 改变背景颜色 */
						color: #333;
						/* 改变文本颜色 */
					}
				}
			}


			.f-btn {
				width: 100%;
				height: 96rpx;
				// position: fixed;
				margin-top: 50rpx;
				border-radius: 24rpx;
				//background: var(--theme);
				flex-wrap: nowrap;
				//margin-top: 36rpx;
				//background: red;

				.f-btn-border {
					width: 1rpx;
					height: 50%;
					background-color: #fff;
				}

				.f-btn-box {
					width: 50%;
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
					}

					.t {
						font-size: 28rpx;
						color: #fff;
						margin-left: 16rpx;
					}
				}
			}

			.invite-list {
				margin-top: 32rpx;
			}

			.lian-box {
				height: 100rpx;

				.icon {
					width: 280rpx;
					height: 74rpx;
				}
			}

			.code-box {
				width: 100%;
				background-color: #fff;
				//border-radius: 32rpx;
				box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
				padding: 32rpx;
				box-sizing: border-box;

				.icon-box {
					width: 200rpx;
					height: 200rpx;

					.icon {
						width: 100%;
						height: 100%;
					}
				}

				.info {
					width: calc(100% - 200rpx);
					box-sizing: border-box;
					padding-left: 32rpx;

					.title {
						font-size: 24rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #000000;
					}

					.invite-code {
						margin: 16rpx 0rpx;

						.t1 {
							font-size: 36rpx;
							font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: bold;
							color: #000000;
						}

						.copy {
							width: 28rpx;
							height: 28rpx;
							margin-left: 16rpx;
						}
					}

					.invite-btn {
						width: 220rpx;
						height: 68rpx;
						background: var(--theme);
						border-radius: 8rpx;
						color: #fff;
						font-size: 28rpx;
					}
				}
			}
		}

		.btn_box {
			width: 100%;
			display: flex;
			background-color: rgb(34, 34, 34);
			justify-content: space-between;

			button {
				width: 170px;
			}

			.active {
				background: linear-gradient(to right, #F49CFB, #FFE372);

				span {
					color: #4D3211;
				}
			}
		}

		.androidBox {
			width: 95%;
			border-radius: 5px;
			background-color: #ffffff;
			margin: 10px;
			padding: 20px;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

			.downloadBtn {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 15px;

				span {
					color: white
				}

			}
		}

		.iosBox {
			width: 95%;
			border-radius: 5px;
			background-color: #ffffff;
			margin: 10px;
			padding: 20px;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

			.downloadBtn {
				display: flex;
				justify-content: space-around;
				margin-top: 15px;

				span {
					color: white
				}

				.downloadBtn>div {
					display: flex;
					align-items: center;
					/* 垂直居中 */
					background-color: black;
					padding: 5px 10px;
					border-radius: 5px;
					height: 42px;

					.downloadBtn>div img {
						width: 25px;
						height: 25px;
						margin-right: 10px;

						.downloadBtn>div span {
							color: white;
						}
					}
				}

			}
		}


		.bg-box {
			width: 100%;
			height: 1134rpx;
			position: absolute;
			top: 0rpx;
			left: 0rpx;

			.icon {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>