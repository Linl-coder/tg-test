<template>
	<view class="web_view">
		<div class="statusBarHeight" :style="statusBarHeight_style" style="background: #fff;"></div>
		<web-view v-if="src!=''" ref="webview" :webview-styles="webviewStyles" :fullscreen="false" :src="src"
			:style="w_style" class="webview" @message="handlePostMessage">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				w_style: {},
				id: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				statusBarHeight_style: {},
				back_style: {},
				versionText: ''
			};
		},
		computed: {
			globalLogin() {
				return this.$store.state.user.login;
			}
		},
		watch: {

		},
		onShow() {
			// #ifdef APP-PLUS 
			uni.setKeepScreenOn({
				keepScreenOn: true
			});
			// let pages = getCurrentPages();
			// let page = pages[pages.length - 1];
			// let currentWebview = page.$getAppWebview()
			// currentWebview.setStyle({
			// 	popGesture: 'none'
			// })
			// let currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			// currentWebview.setStyle({ popGesture: 'none' })
			// #endif
		},

		onLoad(option) {
			// #ifdef APP-PLUS
			const webview = plus.webview.currentWebview(); //获取窗口
			// eslint-disable-next-line no-undef
			// plus.key.addEventListener('backbutton', function() {
			// 	//监听返回事件
			// 	console.log('进到了backbutton', 123123);
			// 	webview.canBack(function(e) {
			// 		console.log('webview.canBack', e);
			// 		if (e.canBack) {
			// 			webview.back(); //返回上一页
			// 		} else {
			// 			webview.back();
			// 			// uni.switchTab({
			// 			//   url: '/pages/home/home'
			// 			// });
			// 			// webview.close(); //关闭应用
			// 		}
			// 	});
			// });
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.versionText = res.appVersion;
				},
			});
			if (option.src) {
				this.src = decodeURIComponent(option.src);
			} else {
				this.src = uni.getStorageSync("pay_url") + "&device=app" + "&ver=" + this.versionText
				console.log(new Date())
				console.log(this.src)
				if (this.src.includes("fish")) {
					// 如果包含 "fish" 字符串时的逻辑
					// #ifdef APP-PLUS
					plus.screen.unlockOrientation();
					plus.screen.lockOrientation("landscape-primary");
					// #endif
				}
			}
			this.getMsg();
		},
		onBackPress(options) {
			if (options.from === 'backbutton') {
				return true
			}
			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary");
			// #endif
		},
		onUnload() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif
		},
		mounted() {
			uni.$on('logout', () => {
					console.log('退出登录')
				}),
				uni.getSystemInfo({
					success: res => {
						this.w_style = {
							height: res.windowHeight - res.statusBarHeight + "px",
							width: res.windowWidth + 'px'
						}
						this.statusBarHeight_style = {
							height: res.statusBarHeight + 'px'
						};
						this.back_style = {
							bottom: res.windowHeight / 2 + 'px'
						}
					}
				})
		},
		methods: {
			getMsg() {
				window.addEventListener('message', (msg) => {
					// console.log('H5与webview之间的通信2==>', msg, msg.data.data.arg?.fun)
					if (msg?.data?.data?.arg?.fun == "game_out") {
						this.tohome();
					}
				})
			},
			tohome: function() {
				uni.$emit('queryGame', {
					reload: 1
				});
				// #ifdef APP-PLUS
				uni.setKeepScreenOn({
					keepScreenOn: false
				});
				// #endif
				uni.switchTab({
					url: '/pages/gather/mainland/index',
				});
			},
			toNiu() {
				this.totab('game/capsuleToys/capsuleToys');
			},
			handlePostMessage(data) {
				// 解析数据为 JavaScript 对象
				const eventObj = JSON.parse(JSON.stringify(data));
				// 获取 "fun" 的值
				const funValue = eventObj.detail.data[0].fun;
				if (funValue == "game_out") {
					// #ifdef APP-PLUS
					plus.screen.lockOrientation("portrait-primary");
					// #endif
					this.tohome();
				}
				if (funValue == "backNiu") {
					console.log("返回扭蛋牛.......");
					this.toNiu();
				}
				if (funValue == "landscape") {
					console.log("捕鱼已经开始加载.......");
				}
				if (funValue.type == 5) {
					console.log("手机震动.......");
					// #ifdef APP-PLUS
					if (uni.getSystemInfoSync().platform == "ios") {
						plus.device.vibrate();
						plus.device.beep();
					} else if (uni.getSystemInfoSync().platform == "android") {
						// 震动
						plus.device.vibrate(funValue.time);
					}
					// #endif
				}
			},
			// 调用 webview 内部逻辑
			evalJs: function(resulet) {
				if (this.id == 7) {}
			}
		}
	};
</script>

<style lang="scss">
	.web_view {
		.webview {
			width: 750rpx;
		}

		.backbtn {
			z-index: 9999;
			width: 140rpx;
			height: 50rpx;
			position: absolute;
			bottom: 40rpx;
			right: 30rpx;
			top: 60rpx;
			// background-image: url(../../../static/btn/btn.png);
			// background-color: transparent;
			// border: none;

			.t1 {
				color: #fff;
				font-size: 30rpx;
			}
		}

		.box {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			background-color: aqua;
			position: absolute;
			right: 50rpx;
			bottom: 100rpx;
		}
	}
</style>