<template>
	<view class="index">
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="status_bar" style="position: sticky;top: 0;"></view> -->
		<!-- #endif -->
		<view class="topBg_color">
		</view>
		<view style="margin: 0rpx 32rpx 32rpx 32rpx;">
			<!-- 个人信息 -->
			<uheader :bradgeNum="bradgeNum"></uheader>
			<!-- 资产 -->
			<!-- <view class="assets-box">
			<assets :list="assetsList"></assets>
		    </view> -->
		</view>
		<!-- 菜单 -->
		<view class="imenu-box">
			<view class="imenu">
				<pmenu @click="clickmenu" :list="menuList" :type="1" :title="$t('colleHome.myOrder')" iconSize="54rpx"
					space="20rpx">
				</pmenu>
			</view>
		</view>
		<!-- 邀请好友 -->
		<view class="invite" v-if="isShowInviteBtn">
			<view class="invite_top">
				<view class="flex-between">
					<view class="flex-start invite_title">
						<text>{{$t('colleHome.inviteFriends')}}</text>
					</view>
					<view class="invite_detail flex-center" @click="topage('general/invite/share')">
						{{$t('colleHome.detail')}}<uni-icons type="right" size="14"></uni-icons>
					</view>
				</view>
				<view class="invite_hint">{{$t('colleHome.inviteTip')}}</view>
			</view>
		</view>
		<view class="explain flex-between" v-if="isShowInviteBtn">
			<view>
				<view class="explain_num">{{user_info.invitedCount || '--'}}</view>
				<view class="explain_hint">{{$t('colleHome.friendNum')}}</view>
			</view>
			<!-- v-show="language === 'zh-CN'||language === 'zh-Hk'" -->
			<view class="invite_btn flex-center" @click="goToShare">
				{{$t('colleHome.inviteFriends')}}
			</view>
		</view>
		<!-- 菜单 -->
		<view class="imenu-box">
			<view class="imenu">
				<pmenu @click="clickmenu" :list="is_login?user_info.is_agent==0?notAgentMenuList:menuList2:notLoginList"
					space="20rpx" :type="1" :title="$t('colleHome.commonUseFunction')" iconSize="50rpx">
				</pmenu>
			</view>
		</view>
		<!-- 标志 -->
		<!-- <view class="lian-box flex-center">
			<image :src="appInfo.hash_qrcode" class="icon" mode=""></image>
		</view> -->
		<!-- 实名认证提示 暂时注释 -->
		<!-- <view class="realname-box" v-show="is_login&&user_info.cert_id<1">
			<realname></realname>
		</view> -->
		<!-- 店长弹窗 -->
		<u-modal :show="store_show" :title="$t('colleHome.notice')" :show-title="false"
			:confirm-text="$t('utils.confirm')" cancel-color="#999999" @confirm="store_show=false">
			<view class="slot-content"><text class="t">{{notice_content}}</text></view>
		</u-modal>
		<tabbar :pageSrc="'pages/gather/home/index'" :tabList='tabList' :lang='language'>
		</tabbar>
	</view>
</template>

<script>
	import uheader from './components/header.vue';
	import assets from './components/assets.vue';
	import pmenu from "@/components/pmenu/pmenu.vue";
	import tabbar from '@/components/tabbar.vue';
	import {
		userinfo
	} from "@/common/mixins/index.js";
	export default {
		mixins: [userinfo],
		components: {
			uheader,
			pmenu,
			assets,
			tabbar
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			is_login() {
				return this.$store.getters.is_login;
			},
			appInfo() {
				return this.$store.getters.get_appInfo;
			}
		},
		data() {
			return {
				store_show: false,
				isShowInviteBtn: true,
				language: '',
				showmodal: false,
				bgstyle: {},
				assetsList: [{
						title: '我的卡牌',
						link: 'gather/collect/mycollect',
						icon: '/static/Gather/home/i1.png',
						kfz: false
					},
					{
						title: '我的' + getApp().globalData.balanceNmae,
						link: 'gather/wallet/index',
						icon: '/static/Gather/home/i14.png',
						kfz: false
					},
				],
				agentMenuList: [],
				notAgentMenuList: [],
				menuList2: [],
				menuList: [],
				notLoginList: [],
				os: '',
				ver: '',
				shareLink: '',
				customerServiceLink: '',
				tabList: [],
				bradgeNum: 0,
				notice_content: ""
			}
		},
		async created() {
			uni.hideTabBar();
		},
		onLoad() {
			this.getclientType();
			this.getVersion();
		},
		onShow() {
			this.menuList = [{
				title: this.$t('colleHome.myOrder'),
				link: "gather/order/orderListNew?status=",
				icon: '/static/user_order1/1.png',
				kfz: false
			}, {
				title: this.$t('colleHome.waitPay'),
				link: 'gather/order/orderListNew?status=1',
				icon: '/static/user_order1/2.png',
				kfz: false
			}, {
				title: this.$t('colleHome.haveComplete'),
				link: 'gather/order/orderListNew?status=2',
				icon: '/static/user_order1/3.png',
				kfz: false
			}, {
				title: this.$t('colleHome.haveCancel'),
				link: 'gather/order/orderListNew?status=3',
				icon: '/static/user_order1/4.png',
				kfz: false
			}]
			uni.hideTabBar();
			this.language = uni.getStorageSync('locale');
			this.getPageUrl();
			this.public_getExamConfig();
			if (this.is_login) {
				console.log(this.store_show)
				this.isManager()
				this.get_user_info();
			}
		},
		methods: {
			// 判断是否成为店长
			async isManager() {
				let res = await uni.ajax.getBeGiveGem({
					is_need_popbox_info: 1
				})
				if (res && res.data) {
					let store_show = false
					if (res.data.show_become_agent_popbox === 1) {
						this.notice_content = this.$t('colleHome.isStoreManager')
						store_show = true
					} else if (res.data.show_not_agent_popbox === 1) {
						this.notice_content = this.$t('colleHome.notStoreManager')
						store_show = true
					}
					this.store_show = store_show
					console.log(this.store_show)
				}
			},
			// 获取未读消息数
			async getCateList() {
				let res = await uni.ajax.public_adgetCateList()
				if (res.data.length > 0) {
					this.bradgeNum = res.data.reduce((acc, curr) => acc + curr.unread_num, 0)
				}
			},
			getPageUrl() {
				// 从本地存储中获取保存的对象
				let pageWebUrl = uni.getStorageSync('pageWebUrl');
				// 获取本地url
				this.shareLink = pageWebUrl.share_link;
				this.customerServiceLink = pageWebUrl.customer_service_link;
			},
			async public_getExamConfig() {
				let res;
				if (uni.getStorageSync('is_login')) {
					res = await uni.ajax.public_getExamInfo();
				} else {
					res = await uni.ajax.public_getExamConfig();
				}
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
				this.menuList2 = [{
						title: this.$t('colleHome.shipAddress'),
						link: 'market/address',
						icon: '/static/user_func1/3.png',
						kfz: false
					},
					{
						title: this.$t('colleHome.accountSecurity'),
						link: 'general/userinfo/accountsSecurity',
						icon: '/static/user_func1/4.png',
						kfz: false
					},
					{
						title: this.$t('colleHome.myCoustomer'),
						link: 'gather/customer/customer',
						icon: '/static/user_func1/7.png',
						kfz: false
					},
					{
						title: this.$t('index.myInfo'),
						link: 'general/myInfo/myInfo',
						icon: '/static/user_func1/10.png',
						kfz: false
					},
					// {
					// 	title: this.$t('colleHome.FlashcardRecord'),
					// 	link: 'gather/home/flash_record',
					// 	icon: '/static/user_func1/2.png',
					// 	kfz: false
					// }
				]
				this.notAgentMenuList = [...this.menuList2]
				if (res) {
					this.isShowInviteBtn = res.data.my_page_show_invite_button == 1 ? true : false;
					let isOnlineExam = res.data.apple_examine_switch == 1 ? true : false
					this.initText(isOnlineExam)
				}
			},
			initText(isOnlineExam) {
				if (!isOnlineExam) {
					let arr = [{
							title: this.$t('myAssets_record.gemRecord'),
							link: 'gather/mainland/myAssets/record?type=cereal',
							icon: '/static/else/gem.png',
							kfz: false
						}, {
							title: this.$t('colleHome.storeManCenter'),
							link: 'gather/storeManage/storeManage',
							icon: '/static/user_func1/8.png',
							is_agent: 1,
							kfz: false
						},
						{
							title: this.$t('colleHome.myCard'),
							link: 'gather/collect/mycollect',
							icon: '/static/user_func1/1.png',
							kfz: false
						},
						{
							title: this.$t('colleHome.transferRecord'),
							link: 'gather/mainland/sendOut/sendOutRecord',
							icon: '/static/user_func1/2.png',
							kfz: false
						},
						{
							title: this.$t('colleHome.aboutUs'),
							link: 'general/article/index?type=4&pagetype=about',
							icon: '/static/user_func1/5.png',
							kfz: false
						},
						{
							title: this.$t('colleHome.messageBoard'),
							link: 'gather/message_borad/message_borad',
							icon: '/static/user_func1/11.png',
							kfz: false
						}
					]
					if (!this.menuList2.find(item => item.link === 'gather/storeManage/storeManage')) {
						this.menuList2.push(...arr)
						let is_show_exchange = uni.getStorageSync('is_show_exchange')
						if (is_show_exchange) {
							this.menuList2.push({
								title: this.$t('colleHome.exchange'),
								link: 'exchange/exchange',
								icon: '/static/exchange/exchange.png',
								kfz: false
							})
						}
						const isAgent = this.user_info.is_agent == 1 ? true : false
						if (isAgent) {
							this.menuList2.push({
								title: this.$t('setProxy.setProxy'),
								link: 'gather/setProxy/setProxy',
								icon: '/static/user_func1/8.png',
								kfz: false
							})
						}
					}
					this.isAgent()
				} else {
					this.notAgentMenuList = this.menuList2
				}
			},
			isAgent() {
				//不是代理
				this.notAgentMenuList = this.menuList2.filter(item => {
					return !item.is_agent
				})
				this.notAgentMenuList.push({
					title: this.$t('proxyApl.proxyApplic'),
					link: 'gather/ProxyApplica/ProxyApplica',
					icon: '/static/user_func1/8.png',
					kfz: false
				}, );
			},
			getclientType() {
				let system = uni.getSystemInfoSync();
				let os = '';
				if (system.uniPlatform === 'web') {
					os = 'W';
				} else {
					if (system.platform == 'ios') {
						os = 'I';
					}
					if (system.platform == 'android') {
						os = 'A';
					}
				}
				this.os = os;
			},
			getVersion() {
				const sysInfo = uni.getSystemInfoSync();
				// #ifdef H5
				this.ver = sysInfo.appVersion;
				// #endif
				// #ifdef APP-PLUS
				this.ver = sysInfo.appWgtVersion;
				// #endif
			},
			goToShare() {
				const lang = uni.getStorageSync('locale') ? uni.getStorageSync('locale') :
					this._i18n.locale;
				const user_code = this.user_info.user_code;
				if (!uni.is_online) {
					if (uni.conf.companycode == 60) {
						this.shareLink = 'https://h5vn02.yygogogo.com/share.html'
					} else {
						this.shareLink = 'https://h5vn.yygogogo.com/share.html'
					}
				}
				let companycode = uni.getStorageSync('CompanyCode')
				uni.setStorage({
					key: "pay_url",
					data: `${this.shareLink}?token=` + uni.getStorageSync(
							'jwt') +
						'&company_code=' + companycode + '&lang=' + lang + '&user_code=' +
						user_code,
					success: () => {
						this.topage("general/web/index");
					}
				})
			},
			// pmenu 子组件触发 并传递Link参数
			clickmenu(link) {
				const lang = uni.getStorageSync('locale') ? uni.getStorageSync('locale') :
					this._i18n.locale;
				if (!uni.is_online) {
					if (uni.conf.companycode == 60) {
						this.customerServiceLink = 'https://h5vn02.yygogogo.com/customer.html'
					} else {
						this.customerServiceLink = 'https://h5vn.yygogogo.com/customer.html'
					}
				}
				if (link.includes('customer')) {
					let companycode = uni.getStorageSync('CompanyCode')
					uni.setStorage({
						key: "pay_url",
						data: `${this.customerServiceLink}?token=` + uni.getStorageSync(
								'jwt') +
							'&company_code=' + companycode + '&lang=' + lang + '&ver=' + this
							.ver +
							'&os=' + this.os,
						success: () => {
							this.topage("general/web/index");
						}
					})
				}
			},
			cancel() {
				this.showmodal = false;
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

	.index {
		padding-bottom: 100rpx;

		.topBg_color {
			width: 100%;
			height: 530rpx;
			position: fixed;
			top: 0;
			z-index: -3;
			background: url('/static/General/b_top.png');
			@include backImg;
			filter: blur(0px);
		}


		.imenu-box {
			width: 100%;
			padding: 32rpx 32rpx;
		}

		.assets-box {
			width: 100%;
			box-sizing: border-box;
			padding: 32rpx 0 0;
		}

		.invite {
			box-sizing: border-box;
			margin: auto;
			width: 686rpx;
			background-color: #fff;
			padding: 32rpx;
			padding-bottom: 20rpx;
			border-radius: 24rpx 24rpx 0 0;

			.invite_top {
				width: 100%;

				.invite_title {
					text {
						margin-right: 10rpx;
						font-size: 32rpx;
						font-weight: 600;
						color: #222222;
					}

					>image {
						width: 124rpx;
						height: 44rpx;
					}
				}

				.invite_detail {
					font-size: 24rpx;
				}

				.invite_hint {
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 10rpx;
				}
			}
		}

		.explain {
			box-sizing: border-box;
			margin: auto;
			width: 686rpx;
			// height: 150rpx;
			padding: 32rpx;
			background-color: #EFEDE1;
			border-radius: 0 0 20rpx 20rpx;

			.explain_num {
				font-size: 32rpx;
				font-weight: 600;
				color: #222222;
			}

			.explain_hint {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
			}

			.invite_btn {
				height: 76rpx;
				background: #030104;
				padding: 0 30rpx;
				border-radius: 8rpx;
				font-size: 26rpx;
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	}
</style>