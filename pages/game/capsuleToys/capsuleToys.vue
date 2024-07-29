<template>
	<view class="capsule_container">
		<web-view class="webview" :src="src" full-screen="false" :webview-styles="webviewStyles"
			@message="handlePostMessage"></web-view>
		<tabbar :pageSrc="'pages/game/capsuleToys/capsuleToys'" :tabList='tabList' :lang='language' :isShow="showTab">
		</tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar.vue';
	import {
		created
	} from 'uview-ui/libs/mixin/mixin';
	import {
		userinfo
	} from "@/common/mixins/index.js";
	export default {
		mixins: [userinfo],
		components: {
			tabbar
		},
		data() {
			return {
				language: '',
				src: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					},
					width: "100%",
					height: "100%",
					bottom: '50px'
				},
				height: '100%',
				isHideTab: '',
				showTab: false,
				isGoHome: false,
				tabList: [],
				link_list: [],
				isOnlineExam: false,
			};
		},
		onLoad() {
			// #ifdef H5
			// H5端不隐藏tabbar
			this.showTab = true;
			// #endif
			this.start();
		},
		onUnload() {

		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info
			},
		},
		onShow() {
			uni.hideTabBar();
			const token = uni.getStorageSync('jwt');
			const code = uni.conf.areaCode;
			this.getCompanyCode(code);
			this.public_getExamConfig();
			this.language = uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n.locale;
			const puid = uni.getStorageSync('user_info').third_uid
			// #ifdef H5
			// 1 音频 2 登录成功 3 切换语言 4 TOKEN
			if (token.length != 0) {
				this.webSendMsg({
					type: 2,
					v: "haveLogged"
				});
			}
			this.webSendMsg({
				type: 3,
				v: this.language
			});

			this.webSendMsg({
				type: 1,
				v: "musicOn"
			});

			this.webSendMsg({
				type: 4,
				v: {
					t: token,
					p: puid
				}
			});
			// #endif

			// #ifdef APP-PLUS
			// 1 音频 2 登录成功 3 切换语言 4 TOKEN
			if (token.length != 0) {
				this.webSendMsg({
					type: 2,
					v: "haveLogged"
				});
			}
			this.sendMusicOff({
				type: 3,
				v: this.language
			});

			this.sendMusicOff({
				type: 1,
				v: "musicOn"
			});

			this.sendMusicOff({
				type: 4,
				v: {
					t: token,
					p: puid
				}
			});
			// #endif
		},
		onHide() {
			const platform = uni.getSystemInfoSync().platform;
			// #ifdef H5
			this.webSendMsg({
				type: 1,
				v: "musicOff"
			});
			// #endif
			// #ifdef APP-PLUS
			this.sendMusicOff({
				type: 1,
				v: "musicOff"
			});
			// #endif
		},
		created() {

		},
		mounted() {},
		methods: {
			async public_getExamConfig() {
				let res;
				if (uni.getStorageSync('jwt').length != 0) {
					res = await uni.ajax.public_getExamInfo();
				} else {
					res = await uni.ajax.public_getExamConfig();
				}
				if (res) {
					this.isOnlineExam = res.data.apple_examine_switch == 1 ? true : false
					this.link_list = res.data.link_list
				}
				uni.setStorageSync('isOnlineExam', this.isOnlineExam)
				if (uni.getStorageSync('tabList').length != 0) {
					this.tabList = uni.getStorageSync('tabList');
				} else {
					const tabList = [{
							iconPath: "/static/tab_current/home.png",
							selectedIconPath: "/static/tab_active/home_active.png",
							text: this.$t('tabbar.tabbar1'),
							pagePath: "pages/gather/homepage"
						},
						{
							iconPath: "/static/tab_current/card.png",
							selectedIconPath: "/static/tab_active/card_active.png",
							text: this.$t('tabbar.tabbar2'),
							pagePath: "pages/gather/mainland/index"
						},
						{
							iconPath: "/static/tab_current/niu.png",
							selectedIconPath: "/static/tab_active/niu_active.png",
							text: this.$t('tabbar.tabbar3'),
							pagePath: "pages/game/capsuleToys/capsuleToys"
						},
						{
							iconPath: "/static/tab_current/ship.png",
							selectedIconPath: "/static/tab_active/ship_active.png",
							text: this.$t('tabbar.tabbar4'),
							pagePath: "pages/gather/association/myGuild/myGuild"
						},
						{
							iconPath: "/static/tab_current/my.png",
							selectedIconPath: "/static/tab_active/my_active.png",
							text: this.$t('tabbar.tabbar5'),
							pagePath: "pages/gather/home/index"
						}
					];
					this.tabList = [...tabList]
					uni.setStorageSync('tabList', this.tabList)
				}
				this.handleFirstLoad()
			},
			webSendMsg(obj) {
				let dom = window.document.getElementsByTagName("body")[0];
				if (!dom) {
					dom = window.document;
				}

				let iframe = dom.getElementsByTagName("iframe");
				iframe = iframe[iframe.length - 1];
				const message = obj;
				try {
					if (iframe) {
						iframe = iframe.contentWindow;
						iframe.postMessage(message, '*'); // 使用确切的origin，而不是'*'
					}
				} catch (e) {
					console.log("error==>", e);
				}
			},
			sendMusicOff(msg) {
				const _funName = 'msgFromUniapp'
				const _data = {
					msg
				};
				const currentWebview = this.$scope.$getAppWebview().children()[0];
				currentWebview.evalJS(`${_funName}(${JSON.stringify(_data)})`);
			},
			handleFirstLoad() {
				// 设置样式
				let height = 0;
				let statusbar = 0;
				uni.getSystemInfo({
					success: sysinfo => {
						statusbar = sysinfo.statusBarHeight;
						height = sysinfo.windowHeight;
					}
				});
				const isHideTab = uni.getStorageSync('isHideTab');
				let currentWebview = this.$scope.$getAppWebview();
				setTimeout(() => {
					const _this = this;
					var wv = currentWebview.children()[0];
					if (!isHideTab && typeof isHideTab == 'string') {
						// 审核状态 不隐藏tabbar
						if (_this.isOnlineExam) {
							_this.showTab = true;
							wv.setStyle({
								bottom: uni.upx2px(100),
								height: height - statusbar - uni.upx2px(65),
								scalable: false,
							});
							return
						}
						// 非审核状态 则初始化一下扭蛋牛 再去登录页
						wv.setStyle({
							bottom: 0,
							height: height,
							scalable: false,
						});
					} else if (typeof isHideTab == 'boolean') {
						this.sendMusicOff({
							type: 2,
							v: "haveLogged"
						});
						_this.showTab = true;
						wv.setStyle({
							bottom: uni.upx2px(100),
							height: height - statusbar - uni.upx2px(65),
							scalable: false,
						});
					}
				}, 50);
			},
			findCompanyCode(number, array) {
				for (let item of array) {
					if (item.tel_area_code_list.includes(number.toString())) {
						return item.company_code;
					}
				}
				return null;
			},
			async getCompanyCode(code) {
				let res = await uni.ajax.public_getCompanyCode({
					package_name: uni.conf.appPackageName
				});
				// let result = this.findCompanyCode(code, res.data.list);
				uni.conf.companycode = res.data.list[0].company_code;
				uni.setStorageSync('CompanyCode', uni.conf.companycode);
			},
			tohomePage() {
				this.sendMusicOff("musicOff");
				this.totab('gather/homepage')
			},
			toLogin() {
				this.sendMusicOff("musicOff");
				console.log('从扭蛋牛跳转===>')
				uni.redirectTo({
					url: "/pages/general/login/index"
				});
			},
			getclientType() {
				let system = uni.getSystemInfoSync();
				let os = '';
				if (system.platform == 'ios') {
					os = 'I';
				}
				if (system.platform == 'android') {
					os = 'A';
				}
				if (system.platform == 'windows') {
					os = 'W';
				}
				return os;
			},
			handlePostMessage(data) {
				const token = uni.getStorageSync('jwt');
				const eventObj = JSON.parse(JSON.stringify(data));
				// 获取 "fun" 的值
				const funValue = eventObj.detail.data[0].fun;
				const nickname = this.user_info.nickname;
				const os = this.getclientType();
				const puid = uni.getStorageSync('user_info').third_uid
				if (funValue === "rabbit_loaded") {
					uni.setStorageSync('isHideTab', false);
					// #ifdef APP-PLUS
					// 审核状态下,不需要跳转至首页
					if (this.isOnlineExam || uni.getStorageSync('first') == 2) {
						return
					}
					uni.setStorageSync('first', 2)
					//非审核状态 加载完启动图之后跳转至初始页面login
					if (token.length == 0) {
						this.toLogin();
					} else {
						console.log(1)
						this.tohomePage();
					}
					// #endif
					// #ifdef H5
					if (token.length == 0) {
						this.toLogin();
					}
					// #endif
				}
				if (funValue == "goBattleGame") {
					const lang = uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n.locale;
					const avatar = this.user_info.avatar
					let gameUrl;
					let go = this.link_list.findIndex(item => item.link.includes('dataosha') || item.link.includes(
						'dataosha-ma'))
					if (uni.is_online) {
						if (go == -1) {
							return
						}
						if (uni.conf.companycode == '60') {
							gameUrl = 'https://cdn.dataosha-ma.ptejj.com/index.html';
						} else {
							gameUrl = 'https://cdn.dataosha.ptejj.com/index.html';
						}
					} else {
						if (go == -1) {
							return
						}
						gameUrl = 'https://dataosha.yygogogo.com/';
					}
					let versionText;
					uni.getSystemInfo({
						success: (res) => {
							versionText = res.appVersion;
						},
					});
					uni.setStorage({
						key: "pay_url",
						data: `${gameUrl}?token=` + uni.getStorageSync(
								'jwt') +
							'&company_code=' + uni.conf.companycode + '&lang=' + lang + '&nickname=' +
							nickname +
							'&avatar=' + avatar + '&os=' + os + '&backNiu=' + "1" + '&puid=' + puid + '&ver=' +
							versionText,
						success: () => {
							this.topage("general/web/index");
						}
					})
				}
			},
			start() {
				this.initSrc();
			},
			initSrc() {
				let versionText;
				uni.getSystemInfo({
					success: (res) => {
						versionText = res.appVersion;
					},
				});
				console.log("初次加载扭蛋牛==========>");
				let cattleUrl;
				if (uni.is_online) {
					if (uni.conf.companycode == '60') {
						cattleUrl = 'https://cdn.niudantu-ma.ptejj.com/index.html';
					} else {
						cattleUrl = 'https://cdn.niudantu.ptejj.com/index.html';
					}
				} else {
					cattleUrl = 'https://niudantu.yygogogo.com/';
				}
				const os = this.getclientType();
				const puid = uni.getStorageSync('user_info').third_uid
				uni.setStorageSync('isHideTab', '');
				const lang = uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n.locale;
				this.src = `${cattleUrl}?token=` + uni.getStorageSync('jwt') +
					'&company_code=' + uni.conf.companycode + '&puid=' + puid + '&lang=' + lang + '&os=' + os +
					'&musicOn=1' + '&ver=' +
					versionText;
				console.log(this.src)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-position: center;
	}

	@mixin centerFlex {
		display: flex;
		justify-content: space-between;

	}

	@import url('https://fonts.googleapis.com/css2?family=Lora&family=Ma+Shan+Zheng&family=Noto+Sans+SC&family=Open+Sans&display=swap');

	.capsule_container {
		height: calc(100% - 100rpx);
		overflow: auto;
	}

	.webview {
		background: #000;
	}

	/* #ifdef H5 */
	.webview {
		bottom: 50px;
	}

	/* #endif */
</style>