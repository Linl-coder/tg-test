<template>
	<view class="downapp" :style="bg_style">
		<view class="df alc spb">
			<view class="logo-btn flex-center " :class='current ==index ? "active":""' v-for="(item,index) in tabList"
				@tap="clickTab(index)">
				{{item}}
			</view>
		</view>
		<view class="middle">
			<view class="content_item df fdc alc jc" v-show="current==0">
				<image class="content_img" src="/static/downLoad/Android_p.png" mode=""></image>
				<view class="down_item df alc jc" @click="downLoad('Android')">
					<image class="down_item_img" src="/static/downLoad/apk.png" mode=""></image>
					<text>Android</text>
				</view>
			</view>
			<view class="content_item df fdc alc jc" v-show="current==1">
				<image class="content_img" src="/static/downLoad/iPhone.png" mode=""></image>
				<view class="down_item df alc jc" @click="downLoad('AppStore')">
					<image class="down_item_img" src="/static/downLoad/ios.png" mode=""></image>
					<text>iOS</text>
				</view>
			</view>
		</view>
		<view class="copy df alc jc" @click="copy">
			<image class="copy_img" src="/static/downLoad/fuzhi.png" mode=""></image>
			<text>{{$t('regis.CopyDownloadLink')}}</text>
		</view>
		<view class="bottom_btn flex-center" @click="toBrowser">
			<image class="bottom_img" src="/static/downLoad/link.png" mode=""></image>
			<text>{{$t('regis.VisitNow')}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bg_style: {},
				tabList: [
					'Android', 'IOS'
				],
				current: 0,
				appName: getApp().globalData.appName
			}
		},
		props: {
			from: {
				type: String,
				default: ""
			},
			href: {
				type: String,
				default: ""
			},
			company_code: {
				type: String,
				default: "60"
			}
		},
		async created() {
			this.bg_style = await uni.pro.systeminfo();

		},
		methods: {
			// 切换
			clickTab(index) {
				this.current = index
			},
			// 复制下载链接
			copy() {
				let data;
				let _this = this
				if (this.current == 0) {
					if (this.company_code == '60') {
						if (uni.is_online) {
							data = 'https://inter-ma-resource.ptejj.com/JJhub.apk'
						} else {
							data = 'https://h5vn02.yygogogo.com/JJhub.apk'
						}
					} else {
						if (uni.is_online) {
							data = 'https://inter-resource.ptejj.com/JJhub.apk'
						} else {
							data = 'https://h5vn.yygogogo.com/JJhub.apk'
						}
					}
				} else {
					if (uni.is_online) {
						data = 'https://apps.apple.com/app/6503039295'
					} else {
						data = ''
					}
				}
				uni.setClipboardData({
					data: data,
					success: () => {
						uni.showToast({
							title: _this.$t('utils.copySuccess'),
							icon: "none",
							duration: 1500
						})
					}
				})
			},
			// 下载
			downLoad(type) {
				// Android
				let data;
				if (this.current == 0) {
					if (this.company_code == '60') {
						if (uni.is_online) {
							data = 'https://inter-ma-resource.ptejj.com/JJhub.apk'
						} else {
							data = 'https://h5vn02.yygogogo.com/JJhub.apk'
						}
					} else {
						if (uni.is_online) {
							data = 'https://inter-resource.ptejj.com/JJhub.apk'
						} else {
							data = 'https://h5vn.yygogogo.com/JJhub.apk'
						}
					}
					// #ifdef H5
					window.open(data, '_blank');
					// #endif
					// #ifdef APP
					plus.runtime.openURL(data, function(e) {
						alert("Open system default browser failed: " + e.message);
					});
					// #endif
				} else {
					// ios
					window.open("https://apps.apple.com/app", '_blank');
				}
			},
			// 打开浏览器 https://cdn.internalver.ptejj.com/
			toBrowser() {
				// #ifdef H5
				window.open(this.href);
				// #endif
				// #ifdef APP
				plus.runtime.openURL(this.href, function(e) {
					alert("Open system default browser failed: " + e.message);
				});
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.downapp {
		width: 100%;
		padding: 120rpx 50rpx 0;
		box-sizing: border-box;

		.logo-btn {
			width: 45%;
			height: 100rpx;
			font-size: 30rpx;
			color: #000;
			border-radius: 10rpx;
			position: relative;
			margin-bottom: 24rpx;
			background-color: #FFFFFF;
		}

		.active {
			color: #fff;
			background: var(--linear-gradient-theme);
		}

		.middle {
			margin: 80rpx 0 0;

			.content_item {
				.content_img {
					width: 60%;
					height: 800rpx;
				}

				.down_item {
					width: 80%;
					height: 100rpx;
					margin: 40rpx 0;
					background-color: #fff;
					border-radius: 20rpx;
					color: #000;

					.down_item_img {
						width: 50rpx;
						height: 50rpx;
						margin-right: 20rpx;
					}
				}

			}
		}

		.copy {
			color: #fff;

			.copy_img {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}

		.bottom_btn {
			width: 100%;
			height: 100rpx;
			margin-top: 80rpx;
			border-radius: 20rpx;
			color: #fff;
			background-color: #C9B4FF;

			.bottom_img {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>