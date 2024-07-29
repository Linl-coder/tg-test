<script>
	export default {
		onLaunch() {

			// #ifdef APP-PLUS
			uni.removeStorageSync("first");
			plus.screen.lockOrientation('portrait-primary');
			// #endif
			this.public_getExamConfig()
			//隐藏官方的tabBar
			uni.hideTabBar();
			getApp().globalData.language = this._i18n.locale;
			const lang = getApp().globalData.language;
			//运行时隐藏无聊猿tab(闪卡页面)
			const tabSwitch = getApp().globalData.isShowTab1;
			if (!tabSwitch) {
				uni.setTabBarItem({
					index: 1,
					visible: false
				})
			}
			/**
			 * 监听网络状态变化
			 */
			uni.onNetworkStatusChange(function(res) {
				if (!res.isConnected) {
					console.log(res)
				}
			});
			/**
			 * 判断当前有无token
			 */
			uni.pro.get_token = (type) => {
				return new Promise((reslove, reject) => {
					let token = uni.getStorageSync("jwt");
					if (token == false || token == '' || token == null) {
						uni.getStorageSync("firstOpenApp", true);
						this.$store.commit("set_login", false);
						reject();
					} else {
						this.$store.commit("set_user_info", uni.getStorageSync("user_info"))
						this.$store.commit("set_login", true);
						reslove(token);
					}
				})
			}
			/**
			 * 退出登录时清除登录相关信息
			 */
			uni.pro.clearLoginInfo = () => {
				this.$store.dispatch('close');
				this.$store.commit("set_login", false);
				uni.removeStorageSync("isHideTab");
				uni.removeStorageSync("isOnlineExam");
				uni.removeStorageSync("jwt");
				uni.removeStorageSync("user_info");
				uni.removeStorageSync("cur");
				uni.removeStorageSync("onlineBuyCard");
				uni.removeStorageSync("tabList");
				uni.removeStorageSync("is_login");
				uni.removeStorageSync("is_show_exchange");
				uni.removeStorageSync("pageWebUrl");
				uni.removeStorageSync("first");
				uni.removeStorageSync("isShowAnnouce");
				uni.removeStorageSync("annouce_id");
				uni.removeStorageSync('invalid_give_gem');
				uni.removeStorageSync('goods_price_type');
			}
			/**
			 * 设置缓存数据
			 */
			uni.set_userInfo = async (option) => {
				let storage = uni.getStorageSync("user_info");
				for (let key in option) {
					storage[key] = option[key];
					this.$store.commit('set_user_info_', {
						key: key,
						value: option[key]
					})
				}
				uni.setStorageSync("user_info", storage);
				return true;
			}
			uni.pro.get_token();
			/**
			 * 设置未登录可以访问的页面
			 */
			uni.pro.allowPage = (pageName) => {
				const pages = ['login', 'index', 'register', 'forget', 'message', 'capsuleToys'];
				if (pageName) {
					let is_allow = pages.filter(res => {
						return pageName.includes(res);
					})
					if (!this.$store.getters.is_login && is_allow.length <= 0) {
						console.log('APPvue页面===>')
						this.topage('general/login/index')
						return false;
					} else {
						return true;
					}
				} else {
					return false;
				}
			}
			/**
			 * 获取页面可用宽高
			 */
			uni.pro.systeminfo = async () => {
				let system = await uni.pro.getSystemInfo();
				return {
					'width': system.windowWidth + 'px',
					'height': system.windowHeight + 'px'
				}
			}
		},
		// 全局参数
		globalData: {
			appWidth: "",
			appHeight: "",
			isShowTab1: true,
			appName: "",
			language: '',
			platform: "",
			balanceNmae: '积分',
			certification_network: "",
			certification_standard: "",
			skRSAPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsYWp5UANmyoaXbhza0N23fzh2ciKYl/u2J30VhCzTFG4tldFTLaYOmTNFRWstUFPRaHp0vALjAW2espTuSpQQVawy2rqpQcIMcMS+W9cDtgvcVp/L3yFge2RdEQKXK3lxv7Iu8H4mA9SKfDRKjyb/pu2nVi4bcwdJidPW7NKnAZ+ejjiZesVAZ9/FWPseHg5w9qzGSY8arPJSGHzaeDSIq9oEZo0A3/N5xLyQEzp2a1jktuukCPZB2+9z9eGzAoD2vHK3WEypBbmg8jYVNPPWZ1p1of0h/2I+hTH7ZTW6jePvDHuGSU/U1Ql5DuBh2pmyqFN8FyTUfv12MihNzEwhwIDAQAB",
			aes: "1234123412ABCDEF",
			iv: "ABCDEF1234123412"
		},
		onShow: function() {
			// 启动或重启即时通讯
			if (this.$store.state.user.login) {
				// this.$store.dispatch('connectSocket');
			}
		},
		onHide: function() {
			// 断开即时通讯
			this.$store.dispatch('close');
		},
		methods: {
			async public_getExamConfig() {
				let res;
				if (uni.getStorageSync('is_login')) {
					res = await uni.ajax.public_getExamInfo();
				} else {
					res = await uni.ajax.public_getExamConfig();
				}
				if (res) {
					let isOnlineExam = res.data.apple_examine_switch == 1 ? true : false
					uni.setStorageSync('isOnlineExam', isOnlineExam)
					if (!isOnlineExam) {
						console.log('非审核状态')
						// #ifdef H5
						// 如果是H5端 有token说明已经登录 可能是网页刷新 ，所以在刷新后不执行任何跳转
						if (uni.getStorageSync('jwt').length != 0) {
							return
						}
						// #endif
						// #ifdef APP-PLUS
						// 如果是App端  需要初始加载扭蛋牛页面
						uni.reLaunch({
							url: '/pages/game/capsuleToys/capsuleToys',
							success() {
								// #ifdef APP-PLUS
								plus.navigator.closeSplashscreen()
								// #endif
							},
							fail(res) {
								console.log(res)
							}
						})
						// #endif
					} else {
						console.log('审核状态')
						// 审核状态下 如果是登录状态 跳转至首页 非登录状态则不执行任何操作去初始登录页即可
						if (uni.getStorageSync('jwt').length != 0) {
							uni.reLaunch({
								url: '/pages/gather/homepage',
								success() {
									// #ifdef APP-PLUS
									plus.navigator.closeSplashscreen()
									// #endif
								},
								fail(res) {
									console.log(res)
								}
							})
						}
						// #ifdef APP-PLUS
						plus.navigator.closeSplashscreen()
						// #endif
					}
				} else {
					uni.reLaunch({
						url: '/pages/general/login/index',
						success() {
							// #ifdef APP-PLUS
							plus.navigator.closeSplashscreen()
							// #endif
						},
						fail(res) {
							console.log(res)
						}
					})
				}

			}
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import './common/style/global.css';
	@import './common/style/flex.css';

	:root {
		--btn-shadow: 0px 2px 0px 0px #61309D;
		--linear-gradient-theme: linear-gradient(90deg, #61309D 0%, #F6B0E3 100%);
		--theme: #0670EC;
	}

	/deep/.u-icon__icon span {
		font-family: uicon-iconfont !important;
	}

	view {
		box-sizing: border-box;
	}

	image {
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}

	/* #ifdef H5 */
	// .uni-page-head__title {
	//   display: none;
	// }
	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		background-color: #f5f5f5;
		width: 100%;
		height: 100%;
		color: #000;
	}



	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	/* #endif */
	.pr {
		position: relative;
	}

	.tc {
		text-align: center;
	}

	.df {
		display: flex
	}

	.alc {
		align-items: center;
	}

	.jc {
		justify-content: center;
	}

	.spb {
		justify-content: space-between;
	}

	.fdc {
		flex-direction: column;
	}

	.fw {
		font-weight: bold;
	}

	.c_w {
		color: white;
	}

	.ml-20 {
		margin-left: 20rpx;
	}

	.bg_top {
		position: fixed !important;
		top: 0rpx;
		left: 0rpx;
		width: 750rpx;
	}

	.public_back {
		position: absolute;
		left: 30rpx;
		top: 65rpx;
		z-index: 10;
		width: 60rpx;
	}


	.lian-box {
		padding: 24rpx 0rpx;
		width: 100%;

		.icon {
			width: 198rpx !important;
			height: 74rpx;
		}
	}
</style>