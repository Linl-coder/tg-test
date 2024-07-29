<template>
	<view class="index" :style="bg_style">
		<view class="header_tabs" style="text-align: right;" :class="{white_bg: show_navbar}" v-show="isShowItem">
			<!-- <p>{{$t('homepage.recommend')}}</p> -->
			<p @click="langSelect">{{langText?langText:defaultLangText}}</p>
		</view>
		<transition name="back_text1">
			<view class="back_text b1 flex-center" :style="{ backgroundImage: 'url(' + backgroundImageUrl1 + ')' }"
				v-show="swiperIndex==1">
				<view class="flex-colum-evenly" v-show="isShowItem">>
					<li>{{$t('homepage.ban1_card')}}</li>
					<li>{{$t('homepage.ban1_charger')}}</li>
					<li class="flex-center">
						<p v-show="false" @click="totab('gather/mainland/index')">
							{{$t('homepage.ban1_enter')}}
						</p>
					</li>
				</view>
			</view>
		</transition>
		<transition name="back_text2">
			<view class="back_text b2 flex-center" v-show="swiperIndex==0"
				:style="{ backgroundImage: 'url(' + backgroundImageUrl2 + ')' }">
				<view class="flex-colum-evenly" v-show="isShowItem">
					<li>WORLD PEACE</li>
					<li>{{$t('homepage.ban2_dove')}}</li>
					<li class="df alc jc">
						<p class="" @tap="totab('gather/mainland/index')">
							{{$t('homepage.ban2_buyNow')}} >
						</p>
					</li>
				</view>
			</view>
		</transition>
		<!-- 轮播 -->
		<view class="swiper-box">
			<iswiper :list="sliderlist" @change="handleSwiperChange" radius="0" height="588rpx" :is_3d="true"></iswiper>
		</view>
		<!-- 菜单 -->
		<!-- <view class="imenu-box">
			<pmenu :list="menuList" style="background: none!important;"></imenu>
		</view> -->
		<!-- 滚动广告 -->
		<!-- <view class="announcement-box">
			<broadcast ref="announcement"></broadcast>
		</view> -->
		<!-- 区域滚动 -->
		<view class="roll" v-show="isShowItem" style="overflow-x: hidden;">
			<view class="roll_area flex-colum-evenly">
				<view class="roll_area_item imgbox1">
					<view class="flex-center" v-for="(item,index) in bgIndexes" :key="index"
						:style="{ backgroundImage: 'url(' + rollbackHead+'lunbo'+item+'.png' + ')'}">
						<p>{{$t('homepage.boredApe')}} No.{{index}}</p>
					</view>
				</view>
				<view class="roll_area_item imgbox2">
					<view class="flex-center" v-for="(item,index) in bgIndexes2" :key="index"
						:style="{ backgroundImage: 'url(' + rollbackHead+'lunbo'+item+'.png' + ')'}">
						<p>{{$t('homepage.boredApe')}} No.{{index}}</p>
					</view>
				</view>
			</view>
			<view class="enter" :class="[language === 'zh-CN' ? 'enter-zh' : 'enter-else']">
				<p><strong>{{$t('homepage.settleIn')}}<span style="color: #f84e43;font-size: 50rpx;font-style:italic;
							font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">89</span>
						<span style="margin-left: 8rpx;">IP</span>
					</strong></p>
			</view>
		</view>
		<view class="menus_nav flex-between" v-show="isShowItem">
			<view class="menus_nav_item menus_nav_left" @click="isJumpCard?totab('gather/mainland/index'):''">
				<view class="menus_nav_left_text">
					<p>
						<span>{{$t('homepage.newHot')}}</span>
						<span>hot</span>
					</p>
					<p>{{$t('homepage.saleTip')}}</p>
				</view>
			</view>
			<view class="menus_nav_item menus_nav_right flex-colum-between">
				<view class="menus_nav_right_item " v-for="(item,index) in newGoodList" :key="index"
					:style="index==0? { backgroundImage: 'url(' + newBackUrl0 + ')'}:{ backgroundImage: 'url(' + newBackUrl1 + ')' }">
					<!-- @click="toDetails(item.id)" -->
					<view class="menus_nav_right_item_content flex-colum-start" v-show="index==0">
						<p>{{$t('homepage.fashionNew')}}</p>
						<p>{{$t('homepage.jointly')}}</p>
						<p>{{$t('homepage.limitSale')}}</p>
					</view>
					<view class="menus_nav_right_item_content flex-colum-start" v-show="index==1">
						<p>{{$t('homepage.rabbitT')}}</p>
						<p>{{$t('homepage.trendCustom')}}</p>
						<p>{{$t('homepage.sameStyle')}}</p>
					</view>
				</view>
			</view>
		</view>
		<!-- 魔法橱窗 -->
		<!-- <view class="menus">
			<view class="menus_left" @click="topage('general/invite/share')">
				<view class="menus_left_text1"> 爆款商品 </view>
				<view class="menus_left_text2">
					买! 买! 买!
				</view>
				<image src="/static/menus/img1.png" mode="widthFix"></image>
			</view>
			<view style="width: 24rpx;"></view>
			<view class="menus_right">
				<image @tap="to_dts" src="/static/menus/img2.png" mode=""></image>
				<image src="/static/menus/img3.png"
					@click="$u.route({url:'pages/gather/mainland/index',type:'switchTab'})" mode="" @tap="to_dts">
				</image>
			</view>
		</view> -->
		<!-- 数据列表 -->
		<!-- <view class="content">
			<view class="itab-box">
				<itab :tab_list="tab_list" @change="change_tab" :type="4" :current="current"></itab>
			</view>
			<view class="chaowan">
				热门推荐
			</view>

			<view class="" style="padding: 0 32rpx;" v-if="current == 0">
				<collectList :current="index" v-for="(item, index) in collectdata" :key="index" :info="item">
				</collectList>
			</view>
			<view class="" v-if="current == 1">
				<blindboxlist :current="index" v-for="(item, index) in blindboxdata" :key="index" :info="item">
				</blindboxlist>
				<newblindbox></newblindbox>
			</view>
			<view class="" v-if="current == 2">
				<drawlist :current="index" v-for="(item, index) in drawdata" :key="index" :info="item"></drawlist>
			</view>
			<iloading :result="loading" desc=""></iloading>
		</view> -->
		<!-- 在线人数滚动 -->
		<view class="">
			<u-notice-bar :text="text1" :speed="60"></u-notice-bar>
		</view>
		<!-- 数据列表 修改-->
		<view class="content">
			<view class="chaowan">
				{{$t('homepage.hotRecommend')}}
			</view>
			<view class="goods" style="padding:0 20rpx;" v-if="current == 0">
				<view v-for="(item, index) in goodsList" :key="item.id">
					<view class="goods_item flex-colum-evenly " @click="handleClick(item.id,index)"
						:class="{'first-item':index === 0 && isShowItem}">
						<view class="hot_icon flex-center" v-show="index==0 && isShowItem ">
							<p>hot</p>
						</view>
						<view class="goods_item_img flex-start">
							<u--image :src="handleImgUrl(item.img_url)" :width="index === 0 ? '200rpx' : '290rpx'"
								:height="index === 0 ? '270rpx' : '260rpx' " :style="{ 
								              marginLeft: index === 0 ? '40rpx' : '0', 
								              marginTop: index === 0 ? '20rpx' : '0' 
								          }" :lazy-load="true">
								<template v-slot:loading>
									<u-loading-icon color="#000"></u-loading-icon>
								</template>
							</u--image>
						</view>
						<view class="goods_item_name">
							{{item.goods_name}}
						</view>
						<view class="goods_item_price df">
							<text style="color: red;" v-show="index == 0||goods_price_type==='USD'">$</text>
							<u-icon name="/static/btn/gem-icon1.png" size='16'
								v-show="index !== 0&&goods_price_type!=='USD'"></u-icon>
							<text style="color: #000;">{{' '+item.goods_price}}
								<!-- / <text style="font-size: 24rpx;">{{item.goods_desc}}</text> -->
							</text>
						</view>
					</view>
				</view>
				<!-- <view class="mustBuy">
					<image class="photo" src="../../static/bimai.png" mode="widthFix"></image>
				</view> -->
			</view>
			<!-- 	<view class="" v-if="current == 1">
				<blindboxlist :current="index" v-for="(item, index) in blindboxdata" :key="index" :info="item">
				</blindboxlist>
				<newblindbox></newblindbox>
			</view>
			<view class="" v-if="current == 2">
				<drawlist :current="index" v-for="(item, index) in drawdata" :key="index" :info="item"></drawlist>
			</view> -->
			<iloading :result="loading" desc=""></iloading>
		</view>
		<!-- app更新弹框 -->
		<!-- #ifdef APP-PLUS -->
		<updatePopup @updateValue="updateValue" :info="appinfo" v-if="showupdata"></updatePopup>
		<view class="updateBox flex-center" v-show="showUpdataIcon" @click="showUpdatPop">
			<p>{{$t('homepage.updateVer')}}</p>
		</view>
		<!-- #endif -->
		<!-- 公告弹窗  -->
		<view class="annouce_modal" style="background:rgba(0,0,0,0.5);" v-if="annouceModal_show && !isOnlineExam">
			<view class="annouce_popup">
				<view class="annouce_popup_content pr">
					<view class="top_horn">
					</view>
					<view class="annouce_bg c_w fw tc" style="line-height: 220rpx;font-family: PingFang SC-Bold;">
						{{$t('index.NoticeAlert')}}
					</view>
					<view class="" style="max-height:600rpx;overflow-y: scroll;">
						<view class="title tc fw" style="color: #000;">
							{{annouce.title}}
						</view>
						<view class="" style="font-size: 28rpx;color: #000;">
							<u-parse :content="annouce.content"></u-parse>
						</view>
					</view>
					<view class="checkBox">
						<u-checkbox-group>
							<u-checkbox :label="$t('index.todayNotDisplay')" labelColor="#ffffff" :checked='isChecked'
								@change="checkboxChange" />
						</u-checkbox-group>
					</view>
					<view class="close df alc jc" @click="annouceModalClose">
						<u-icon name="/static/homepage/clos.png" color="#fff" size="20"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="notice_modal" v-if="noticeModal_show && !isOnlineExam">
			<view style="width: 100%;height: 100%;" class="df alc jc">
				<view style="width: 100%" class="pr">
					<u-notice-bar :text="text1" :speed="60"></u-notice-bar>
					<u-icon class="close_btn" name="close" color="#ffffff" size="14"
						@click="noticeModal_show=false"></u-icon>
				</view>
			</view>
		</view>
		<!-- 提示弹框 -->
		<modal :type="2" ref="modal" @confirm="close_tips" :content="warm_hint"></modal>
		<!-- 未填写上级邀请码时弹出提示去设置邀请码 -->
		<u-modal :show="showBindModal" :showCancelButton=true @confirm="goSetIvCode" @cancel="showBindModal=false"
			:confirmText="$t('index.goBind')" :cancelText="$t('index.cancel')"
			:content="$t('index.notSetPhone')"></u-modal>
		<!-- update rocket left fixed icon-->
		<u-picker :show="show" :showToolbar="true" :confirmText="$t('utils.confirm')" :cancelText="$t('utils.cancel')"
			:defaultIndex="defaultIndex" :columns="columns" @cancel="cancelLang" @confirm="confirmLang"></u-picker>
		<tabbar :pageSrc="'pages/gather/homepage'" :lang='language' :tabList='tabList?tabList:notLoginTabbar'>
		</tabbar>
	</view>
</template>
<script>
	import iswiper from '@/components/pswiper.vue';
	import pmenu from '@/components/pmenu/pmenu.vue';
	import broadcast from '@/components/broadcast/broadcast.vue';
	import collectList from '@/pages/gather/collect/components/collectlist.vue';
	import blindboxlist from '@/pages/gather/blindbox/components/blindboxlist.vue';
	import newblindbox from '@/pages/gather/blindbox/components/newblindbox.vue'
	import drawlist from '@/pages/gather/collect/components/drawlist.vue';
	import itab from '@/components/itab.vue';
	import iloading from '@/components/iloading.vue';
	import {
		pages,
		userinfo
	} from '@/common/mixins/index.js';
	import updatePopup from '@/components/updatePopup.vue';
	import tabbar from '@/components/tabbar.vue';
	import goodsData from '@/common/goodsData/goodsData.js';
	import {
		collectdata_list,
		blindboxdata_list,
		clearcollectdata_list,
		clearblindboxdata_list,
		drawdata_list,
		cleardrawdata_list
	} from '@/pages/gather/list.js';
	export default {
		mixins: [pages, userinfo],
		components: {
			iloading,
			iswiper,
			pmenu,
			broadcast,
			collectList,
			blindboxlist,
			drawlist,
			itab,
			updatePopup,
			newblindbox,
			tabbar
		},
		data() {
			return {
				noticeModal_show: false,
				annouce: {},
				annouceModal_show: false,
				showLogoutModal: this.$store.state.user.showLogoutModal,
				showBindModal: false,
				isJumpCard: getApp().globalData.isShowTab1,
				isChecked: false,
				language: '',
				show: false,
				columns: [
					['中文繁體', 'English']
				],
				defaultIndex: [0],
				defaultLangText: "",
				langText: "",
				bg_style: {},
				show_navbar: false,
				tab_list: [{
						name: '潮玩'
					},
					{
						name: '盲盒'
					},
				],
				notice: [],
				loading: 1,
				collectdata: [], //卡牌列表
				collectdata2: [], //模拟卡牌列表
				blindboxdata: [], //盲盒列表
				drawdata: [], //抽签列表
				current: 0,
				keyword: '',
				sliderlist: [], //轮播图数据
				sliderlist1: [{
					image: "https://x0.ifengimg.com/ucms/2021_15/C07C79FB23B3595CEF66EAD3F32ED03DE7E96048_size1874_w1422_h949.png",
					open_type: "current",
					src: "",
					title: "首页"
				}], //轮播图数据
				menuList: [{
						title: '官方公告',
						link: 'general/message/index',
						icon: '/static/Gather/index/i1.png',
						kfz: false
					},
					{
						title: '加入社群',
						link: 'general/pagecode/index',
						icon: '/static/Gather/index/i2.png',
						kfz: false
					},
					{
						title: '邀请好友',
						link: 'general/invite/index',
						icon: '/static/Gather/index/i3.png',
						kfz: false
					},
					{
						title: '下载APP',
						link: 'general/downapp/index',
						icon: '/static/Gather/index/i4.png',
						kfz: false
					}
				],
				appinfo: {
					is_apk: 1,
					download_url: ""
				},
				goods_price_type: 'USD',
				showupdata: false,
				showUpdataIcon: false,
				warm_hint: "",
				swiperIndex: 0,
				backgroundImageUrl1: "",
				backgroundImageUrl2: "",
				goodsList: [],
				newGoodList: [],
				newBackUrl0: "../../static/homepage/menu2.png",
				newBackUrl1: "../../static/homepage/menu3.png",
				lastY: "",
				// 初始化背景图索引数组
				bgIndexes: [],
				bgIndexes2: [],
				rollbackHead: "/static/homepage/lunbo/",
				isShowItem: true,
				text1: '',
				onlineNum: {
					app_online_people_num: '',
					game_online_people_num: ''
				},
				intervalId: '',
				device_sn: '',
				device_info: '',
				scrollList: [{
					thumb: "https://cdn.uviewui.com/uview/goods/1.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/2.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/3.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/4.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/5.jpg"
				}],
				showSetIvCode: false, //是否弹出设置上级邀请码弹框
				tabList: [],
				notLoginTabbar: [{
						iconPath: "/static/tab_current/home.png",
						selectedIconPath: "/static/tab_active/home_active.png",
						text: this.$t('tabbar.tabbar1'),
						pagePath: "pages/gather/homepage"
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
				],
				isOnlineExam: true,
				page: 1,
				limit: 10,
				dataList: [],
				result: 4
			};
		},
		watch: {
			language(newValue, oldValue) {
				this.tabList = [{
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
				]
				uni.setStorageSync('tabList', this.tabList)
			}
		},
		onLoad: function(options) {
			this.setDefaultLangText(); //设置默认语言
		},
		onShow() {
			this.page = 1
			this.dataList = []
			this.goodsList = []
			this.newGoodList = []
			if (uni.conf.appPackageName === 'ma') {
				if (this.columns[0].indexOf('Malay') == '-1') {
					// this.columns[0].push('Malay')
				}
			} else if (uni.conf.appPackageName === 'vn') {
				if (this.columns[0].indexOf('Vietnamese') == '-1') {
					this.columns[0].push('Vietnamese')
				}
			}
			uni.hideTabBar(); //隐藏tabbar
			this.public_getExamConfig(); //开关配置设置
			this.generDeviceId(); // 获取设备信息
			this.initBgIndexes(); //区域滚动背景索引
			this.initGoodsData(); //初始化商品数组
			this.getGoodsList(); //获取商品数组
			if (this.is_login) {
				this.public_getOnlineInfo(); //获取在线用户信息
			}
			this.getNewsad(); // 获取最新公告
		},
		computed: {
			appInfo() {
				return this.$store.getters.get_appInfo;
			},
			is_login() {
				return this.$store.getters.is_login;
			},
		},
		created() {
			// #ifdef H5
			const token = uni.getStorageSync('jwt');
			if (!token) {
				// 如果未登录跳转至登录页
				console.log('homepage页面 未登录===>')
				// this.topage('general/login/index')
			}
			// #endif
			this.init(true);
			// #ifdef APP-PLUS
			this.get_url();
			// #endif
		},
		beforeDestroy() {
			// 在组件销毁前清除定时器，避免内存泄漏
			if (this.intervalId) {
				clearInterval(this.intervalId);
			}
		},
		mounted() {
			this.warm_hint = this.appInfo.warm_hint;
			if (this.warm_hint) {
				this.$refs.modal.open();
			}
			this.setnavbar();
		},
		onHide() {
			this.page = 1
			this.dataList = []
			this.goodsList = []
			this.newGoodList = []
		},
		onReachBottom() {
			if (this.result == 4) {
				this.page = this.page + 1;
				this.getGoodsList()
			}
		},
		methods: {
			goSetIvCode() {
				// 绑定手机号
				this.topage('general/userinfo/bind_phone')
			},
			generateRandomString(length) {
				const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				let randomString = '';
				for (let i = 0; i < length; i++) {
					const randomIndex = Math.floor(Math.random() * characters.length);
					randomString += characters.charAt(randomIndex);
				}
				return randomString;
			},
			generateUniqueRandomNumber() {
				const generatedNumbers = new Set();
				let randomNumber = '';
				do {
					// 生成随机数长度，范围为 10 至 30
					const length = Math.floor(Math.random() * 21) + 10;
					randomNumber = this.generateRandomString(length);
				} while (generatedNumbers.has(randomNumber)); // 检查是否已存在于 Set 中
				generatedNumbers.add(randomNumber); // 将唯一的随机数添加到 Set 中
				return randomNumber;
			},
			generDeviceId() {
				uni.getStorage({
					key: 'PhoneID',
					success: (res) => {
						this.device_sn = res.data.PhoneID;
					},
					fail: (error) => {
						// 在这里可以进行失败处理，例如设置默认值或者提示用户
						this.device_sn = this.generateUniqueRandomNumber()
					}
				});
				uni.getSystemInfo({
					success: (res) => {
						// console.log(res)
						this.device_info = res.model + " " + res.system || res.browserName + " " +
							res.browserVersion // 将数据存储到本地缓存中
					},
					fail: (err) => {
						console.error('获取设备信息失败：', err);
					}
				});
				this.updateLoginTime(this.device_sn, this.device_info);
			},
			async public_getOnlineInfo() {
				let res = await uni.ajax.public_getOnlineInfo();
				const {
					app_online_people_num,
					game_online_people_num
				} = res.data;
				this.onlineNum.app_online_people_num = app_online_people_num;
				this.onlineNum.game_online_people_num = game_online_people_num;
				this.text1 = this.$t('homepage.currentOnlineNum') + ' ' + this.onlineNum
					.app_online_people_num +
					',' +
					this.$t('homepage.gameOnlineNum') + ' ' + this.onlineNum.game_online_people_num;
			},
			// 更新登录时间
			async updateLoginTime(device_sn, device_info) {
				try {
					let res = await uni.ajax.public_updateLoginTime({
						device_sn,
						device_info
					});
					if (res) {
						this.goods_price_type = res.data.goods_amount_symbol_type
						uni.setStorageSync('goods_price_type', res.data.goods_amount_symbol_type);
						uni.setStorageSync('onlineBuyCard', res.data.online_card_buy_switch);
						uni.setStorageSync('maxAgentLevel', res.data.agent_max_level);
						uni.setStorageSync('min_gem', res.data.exchange_pledge_food_min_num);
						uni.setStorageSync('invalid_give_gem', res.data.invalid_user_giv_food_min);
						let pageWebUrl = {
							share_link: res.data.share_link,
							customer_service_link: res.data.customer_service_link
						}
						uni.setStorageSync('pageWebUrl', pageWebUrl);
						this.showSetIvCode = res.data.show_invite_code_popbox == 1 ? true : false;
						this.showBindModal = res.data.show_bind_tel_popbox == 1 ? true : false;
						uni.setStorageSync('max_mine', res.data.develop_mine_machine_max_num);
						if (this.showSetIvCode && !this.isOnlineExam) {
							let _this = this
							uni.showModal({
								content: _this.$t('index.notSetIvPlsGoSet'),
								confirmText: _this.$t('utils.confirm'),
								cancelText: _this.$t('utils.cancel'),
								success: function(res) {
									if (res.confirm) {
										_this.topage('general/setInviteCode/setInviteCode?from=' + 1);
									} else {}
								},
							});
						}
					}
				} catch (error) {
					console.error('更新登录时间失败:', error);
				}
			},
			handleClick: function(id, index, type) {
				// 点击第一个商品时， 跳转到指定页面， 并传递 isShowBuyModal 参数为 1
				if (index == 0) {
					if (this.isOnlineExam) {
						uni.navigateTo({
							url: '/pages/gather/goodDetails/goodDetails?id=' + id
						});
						return
					}
					uni.$emit('openBuyModal', {
						isShow: 1
					});
					this.totab('gather/mainland/index');
				} else {
					// 点击其他商品时，跳转到商品详情页，并传递 item.id 参数
					uni.navigateTo({
						url: '/pages/gather/goodDetails/goodDetails?id=' + id
					});
				}
			},
			async public_getExamConfig() {
				let res;
				if (uni.getStorageSync('is_login')) {
					res = await uni.ajax.public_getExamInfo();
				} else {
					res = await uni.ajax.public_getExamConfig();
				}
				if (res) {
					this.isOnlineExam = res.data.apple_examine_switch == 1 ? true : false
					uni.setStorageSync('isOnlineExam', this.isOnlineExam)
					let is_show_exchange = res.data.link_list.find(item => item.title === 'mainland.game20')
					uni.setStorageSync('is_show_exchange', is_show_exchange ? true : false)
					this.isShowItem = res.data.index_page_show_ad == 1 ? true : false;
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
			},
			initBgIndexes() {
				const generateRandomArray = (length, min, max) => {
					return Array.from({
						length
					}, () => Math.floor(Math.random() * (max - min + 1)) + min);
				}
				this.bgIndexes = generateRandomArray(30, 0, 6)
				this.bgIndexes2 = generateRandomArray(30, 0, 6)
			},
			cancelLang() {
				this.show = false;
			},
			langSelect() {
				this.show = true;
				console.log("弹出选择");
			},
			// 回调参数为包含columnIndex、value、values
			confirmLang(e) {
				this.langText = e.value[0];
				let item = '';
				switch (e.value[0]) {
					case "中文简体":
						item = 'zh-CN';
						break;
					case "中文繁體":
						item = 'zh-HK';
						break;
					case "English":
						item = 'en-US';
						break;
					case "Malay":
						item = 'ms-MS';
						break;
					case "Vietnamese":
						item = 'vi-VN';
						break;
					default:
						item = uni.conf.areaCode == '60' ? 'en-US' : 'vi-VN';
				}
				this._i18n.locale = item;
				uni.setStorageSync('locale', item)
				this.language = uni.getStorageSync('locale');
				this.show = false;
			},
			// 设置默认语言
			setDefaultLangText() {
				this.language = uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n
					.locale;
				if (this.language == 'zh-CN') {
					this.defaultLangText = "中文简体"
				}
				if (this.language == 'zh-HK') {
					this.defaultLangText = "中文繁體"
				}
				if (this.language == 'en-US') {
					this.defaultLangText = "English"
				}
				if (this.language == 'ms-MS') {
					this.defaultLangText = "Malay"
				}
				if (this.language == 'vi-VN') {
					this.defaultLangText = "Vietnamese"
				}
			},
			updateValue(data) {
				// 这里可以拿到子组件传过来的数据
				if (data == 'close_modal') {
					this.showupdata = false;
				}
			},
			showUpdatPop() {
				this.showupdata = true;
			},
			//获取首页商品列表
			async getGoodsList() {
				let res = await uni.ajax.getGoodsList({
					page: this.page,
					limit: this.limit,
					is_examine: 0
				});
				this.dataList = this.dataList.concat(res.data.list);
				this.goodsList = this.dataList.filter((item) => {
					return item.is_new != 1;
				})
				this.newGoodList = this.dataList.filter((item) => {
					return item.is_new == 1;
				})
				this.result = uni.utils.loading_result(this.page, res.data.list, this.limit);
			},
			handleSwiperChange(currentIndex) {
				// 在这里处理从子组件传递过来的值
				this.swiperIndex = currentIndex;
				if (this.isShowItem) {
					if (currentIndex == 1) {
						this.backgroundImageUrl1 = "/static/homepage/bg1_1.png";
					} else {
						// this.backgroundImageUrl2 = "/static/homepage/bg2_2.png";
					}
				}
			},
			initGoodsData() {
				const bottomGoods = goodsData.filter(item => {
					return item.id <= 215;
				})
				this.collectdata2 = bottomGoods;
			},
			// 去商品详情页面
			toDetails(id, index) {
				uni.navigateTo({
					url: '/pages/gather/goodDetails/goodDetails?id=' + id + '&index=' + index,
				})
			},
			to_dts() {
				uni.$u.toast('待开发')
				return
			},
			async get_url() {
				let system = await uni.pro.getSystemInfo();
				let res = await uni.ajax.public_getUpdateConfig();
				if (res.data.can_upgrade == 1) {
					if (system.platform == 'ios') {
						this.showUpdataIcon = true;
						this.showupdata = true;
						this.appinfo = {
							is_apk: 2,
							download_url: res.data.download_link,
							is_force: res.data.force_upgrade,
							update_content: res.data.upinfo,
							ver: res.data.ver
						}
					} else {
						this.showUpdataIcon = true;
						this.showupdata = true;
						this.appinfo = {
							is_apk: 1,
							download_url: res.data.download_link,
							is_force: res.data.force_upgrade,
							update_content: res.data.upinfo,
							ver: res.data.ver
						}
					}
				}
			},
			set_init_list() {
				this.collectdata_list = collectdata_list;
				this.blindboxdata_list = blindboxdata_list;
				this.drawdata_list = drawdata_list;
			},
			init(is_onPullDownRefresh) {
				this.getSlider();
				this.pull_init(is_onPullDownRefresh);
			},
			pull_init(is_onPullDownRefresh) {
				this.loading = 1;
				this.page = 1;
				if (is_onPullDownRefresh) {
					clearcollectdata_list();
					clearblindboxdata_list();
					cleardrawdata_list();
					this.set_init_list();
					this.collectdata = [];
					this.blindboxdata = [];
					this.drawdata = [];
				}
				if (this.current == 0) {
					// this.collect_getList(is_onPullDownRefresh);
				}
				if (this.current == 1) {
					// this.collect_blindboxGetList(is_onPullDownRefresh);
				}
				if (this.current == 2) {
					// this.draw_getList(is_onPullDownRefresh);
				}
			},
			close_tips() {
				uni.setStorageSync('show_tips', 'true');
			},
			async collect_blindboxGetList(is_onPullDownRefresh = false) {
				//盲盒列表
				let res = await uni.ajax.collect_blindboxGetList({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {
					if (res.data.list.length > 0) {
						res.data.list.forEach((item, index) => {
							//处理活动时间 1未开始2进行中3已结束
							let timeInfo = uni.utils.FormDataEndTime(item.start_time, item
								.end_time);
							item.is_time = timeInfo.is_time;
							item.timestamp = timeInfo.timestamp;
							if (res.data.list.length - 1 == index) {
								this.setPagedata('blindboxdata', 'blindboxdata_list', res.data
									.list,
									'collect_blindboxGetList');
							}
						});
					} else {
						this.setPagedata('blindboxdata', 'blindboxdata_list', res.data.list,
							'collect_blindboxGetList');
					}
					if (is_onPullDownRefresh) {
						await uni.utils.sleep(500);
						uni.stopPullDownRefresh();
					}
				}
			},
			async draw_getList(is_onPullDownRefresh = false) {
				//抽签卡牌列表
				let res = await uni.ajax.collect_getList({
					page: this.page,
					limit: uni.conf.limit,
					get_type: 2
				});
				if (res) {
					if (res.data.list.length > 0) {
						res.data.list.forEach((item, index) => {
							//处理活动时间 1未开始2进行中3已结束
							let timeInfo = uni.utils.FormDataEndTime(item.start_time, item
								.end_time);
							item.is_time = timeInfo.is_time;
							item.timestamp = timeInfo.timestamp;
							if (res.data.list.length - 1 == index) {
								this.setPagedata('drawdata', 'drawdata_list', res.data.list,
									'draw_getList');
							}
						});
					} else {
						this.setPagedata('drawdata', 'drawdata_list', res.data.list, 'draw_getList');
					}
					if (is_onPullDownRefresh) {
						await uni.utils.sleep(500);
						uni.stopPullDownRefresh();
					}
				}
			},
			async collect_getList(is_onPullDownRefresh = false) {
				//卡牌列表
				let res = await uni.ajax.collect_getList({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {
					//console.log("222==>", res.data.list);
					if (res.data.list.length > 0) {
						this.setPagedata('collectdata', 'collectdata_list', res.data.list,
							'collect_getList');
					} else {
						this.setPagedata('collectdata', 'collectdata_list', res.data.list,
							'collect_getList');
					}
					if (is_onPullDownRefresh) {
						await uni.utils.sleep(500);
						uni.stopPullDownRefresh();
					}
				}
			},
			async getSlider() {
				//获取轮播图数据
				let res = await uni.ajax.public_getlist({
					site_id: 1,
					page: 1,
					limit: 15
				});
				if (res) {
					try {
						this.sliderlist = res.data.list.map(item => {
							return {
								image: this.handleImgUrl(item.file.show_src),
								title: item.site_name,
								src: item.open_url,
								open_type: item.open_type
							};
						});
					} catch (e) {
						//TODO handle the exception
					}
				}
			},
			// 勾选今日是否提示
			checkboxChange() {
				this.isChecked = !this.isChecked
			},
			// 关闭公告弹窗
			annouceModalClose() {
				this.annouceModal_show = false
				uni.setStorageSync('isShowAnnouce', this.isChecked)
				let time = this.getTimeUntilMidnight()
				if (this.isChecked) {
					let annouceTimer = setTimeout(() => {
						uni.removeStorageSync('annouce_id')
						this.isChecked = false
						uni.setStorageSync('isShowAnnouce', this.isChecked)
						clearTimeout(annouceTimer)
					}, time)
				}
			},
			getTimeUntilMidnight() {
				// 获取当前时间
				const now = new Date();
				// 获取当前时间的年份、月份和日期
				const year = now.getFullYear();
				const month = now.getMonth();
				const day = now.getDate();
				// 创建一个表示当天晚上12点（第二天的00:00）的日期对象
				const midnight = new Date(year, month, day + 1, 0, 0, 0);

				// 计算从当前时间到晚上12点的时间差（以毫秒为单位）
				const timeUntilMidnight = midnight.getTime() - now.getTime();
				return timeUntilMidnight;
			},
			async getNewsad() {
				//获取最新公告
				let res = await uni.ajax.public_getNewAnnouce();
				if (Object.keys(res.data).length != 0) {
					// 如果没有存annouce_id
					if (!uni.getStorageSync('annouce_id')) {
						uni.setStorageSync('annouce_id', res.data.id)
						this.annouceModal_show = true
						this.annouce = res.data
					} else {
						// 如果存了 但是未勾选，那么就再次显示
						if (!uni.getStorageSync('isShowAnnouce')) {
							this.annouceModal_show = true
							this.annouce = res.data
						} else {
							// 如果勾选了，判断是否是最新的公告
							// 如果是，则再次显示
							if (uni.getStorageSync('annouce_id') !== res.data.id) {
								uni.setStorageSync('annouce_id', res.data.id)
								this.annouceModal_show = true
								this.isChecked = false
								this.annouce = res.data
								return
							} else {
								// 如果不是最新的公告，那么不显示
								this.annouceModal_show = false
							}
						}
					}
				}
			},
			async setnavbar() {
				//设置导航栏
				let header = await uni.utils.info_distance('header');
				//console.log("header", header);
			},
			change_tab(e) {
				if (e.index == this.current) return false;
				this.current = e.index;
				if (this.current == 0) {
					this.pull_init(true);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* #ifdef H5 */

	/deep/.u-sticky {
		top: 0 !important;
	}

	/* #endif */

	/deep/.u-notice__content__text {
		align-items: center;
	}

	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.back_text1-enter-active,
	.back_text1-leave-active {
		transition: opacity 0.5s;
	}

	.back_text1-enter,
	.back_text1-leave-to {
		opacity: 0;
	}

	.back_text2-enter-active,
	.back_text2-leave-active {
		transition: opacity 0.5s;
	}

	.back_text2-enter,
	.back_text2-leave-to {
		opacity: 0;
	}

	page {
		background: #F2F2F2;

	}

	/* 修改 .uni-text 的字体 */
	/deep/.uni-text {
		font-family: "Microsoft YaHei", sans-serif;
		/* 这里使用微软雅黑作为示例 */
	}

	.notice_modal {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		z-index: 1000;

		.close_btn {
			position: absolute;
			bottom: -60rpx;
			left: 50%;
			border-radius: 100%;
			background-color: #EE9A3A;
			padding: 8rpx;
		}
	}

	.annouce_modal {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		z-index: 1000;

		.annouce_popup {
			width: 70%;
			margin: 400rpx auto 0;

			.annouce_popup_content {
				width: 100%;
				min-height: 300rpx;
				padding: 20rpx 40rpx;
				border-radius: 20rpx;
				background-color: #fff;

				.checkBox {
					position: absolute;
					bottom: -50rpx;
					right: 10rpx;
				}

				.close {
					position: absolute;
					top: -220rpx;
					right: 10rpx;
					width: 60rpx;
					height: 60rpx;
					border: 2rpx solid #fff;
					border-radius: 10rpx;
					background-color: rgba(0, 0, 0, 0.8);
					margin: -2rpx auto 0;
				}

				.top_horn {
					position: absolute;
					top: -250rpx;
					left: 35%;
					width: 180rpx;
					height: 180rpx;
					z-index: 10;
					background: url('/static/homepage/top_horn.png');
					@include backImg;
				}

				.annouce_bg {
					position: absolute;
					top: -150rpx;
					left: 0;
					width: 100%;
					height: 180rpx;
					z-index: -1;
					background: url('/static/homepage/annouce_bg.png');
					@include backImg;
				}

				.title {
					border-bottom: 2rpx solid #ccc;
					padding-bottom: 20rpx;
					margin-bottom: 20rpx;
				}
			}



		}


	}

	.index {
		position: relative;

		.header_tabs {
			width: 100%;
			position: absolute;
			top: 0;
			z-index: 12;
			/* #ifdef H5 */
			// height: 80rpx;
			padding: 0 40rpx;
			padding-top: 50rpx;
			padding-bottom: 20rpx;
			/* #endif */
			/* #ifdef APP-PLUS */
			padding-left: 40rpx;
			padding-right: 40rpx;
			padding-top: var(--status-bar-height);
			padding-bottom: 20rpx;
			/* #endif */

			font-size: 39rpx;
			font-weight: bold;
			color: #fff;
		}

		.white_bg {
			background-color: white;
			color: #000;
		}

		.back_text {
			width: 100%;
			height: 580rpx;
			position: absolute;
			z-index: 8;
			@include backImg;


			view {
				width: fit-content;
				height: 300rpx;
				text-align: center;
				//background: yellow;

				li {
					font-weight: bold;
					color: #fff;
				}

				li:nth-child(1) {
					font-size: 65rpx;
				}

				li:nth-child(2) {
					font-size: 26rpx;
					color: #B8A1E7;
				}

				li:nth-child(3) {
					margin-top: 20rpx;

					P {
						height: 55rpx;
						line-height: 50rpx;
						font-size: 22rpx;
						color: #333;
						background: #F0F0F0;
						padding: 0 10rpx;
					}

				}
			}
		}

		.b2 {
			view {
				li:nth-child(2) {
					color: #fff;
					font-weight: normal;
				}

				li:nth-child(3) {
					p {
						color: #fff;
						background: transparent;
						border-radius: 30rpx;
						border: 1px solid #fff;
						padding: 0 10rpx;
					}
				}
			}
		}

		.content {
			padding: 20rpx 0rpx 0rpx;

			.chaowan {
				padding: 0 20rpx 32rpx;
				color: #000;
				//font-family: Alimama ShuHeiTi;
				font-size: 32rpx;
				font-style: normal;
				font-weight: 700;
				line-height: 36rpx;
				/* 112.5% */
				letter-spacing: -0.165px;
			}

			.goods {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				gap: 20rpx;
				margin-bottom: 120rpx;

				.goods_item {
					// flex: 1;
					width: 345rpx;
					height: 450rpx;
					background: #fff;
					border-radius: 10rpx;
					padding: 20rpx;
					position: relative;

					.hot_icon {
						width: 80rpx;
						height: 30rpx;
						background: url('/static/homepage/hot.png');
						@include backImg;
						position: absolute;
						top: 10rpx;
						font-size: 20rpx;
						color: #fff;
						z-index: 23;

						p {
							margin-left: 25rpx;
						}
					}

					.goods_item_price,
					.goods_item_name {
						margin-top: 20rpx;
					}

					.goods_item_name {
						font-size: 26rpx;
						color: #202020;
					}

					.goods_item_price {
						margin-top: 10rpx;
						font-weight: bold;

						span {
							font-size: 22rpx;
						}
					}
				}



				.first-item {
					border: 4px solid;
					border-image: linear-gradient(to right, #8f41e9, #578aef) 1;
				}

				.mustBuy {
					position: absolute;
					top: 725px;
					left: 23px;

					.photo {
						width: 50px;
						height: 30px;
					}
				}
			}

			.version_info {
				line-height: 45rpx;
				font-size: 20rpx;
				text-align: justify;
				padding: 20rpx 0rpx;
			}
		}

		.imenu-box {
			padding: 24rpx 0rpx;
		}

		.announcement-box {
			padding: 16rpx 24rpx;
		}
	}

	.menus {
		display: flex;
		padding: 0 20rpx;
		justify-content: space-between;

		.menus_left {
			width: 300rpx;
			height: 370rpx;
			background-size: 100% 100%;
			position: relative;
			padding: 32rpx 32rpx;
			margin-right: 15rpx;

			.menus_left_text1 {
				font-size: 36rpx;
				font-weight: bolder;
				color: #000000;
			}

			.menus_left_text2 {
				margin-top: 10rpx;
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;
			}

			image {
				margin-top: 20rpx;
				width: 310rpx;
				height: 310rpx;
				animation: monkeyMove 2s linear infinite;
			}
		}

		.menus_right {
			// flex: 1;
			width: 358rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			>image {
				height: 204rpx;
				width: 100%;
			}
		}
	}

	.roll {
		width: 100%;
		height: 120rpx;
		position: relative;
		display: flex;

		.roll_area {
			height: 100%;

			.roll_area_item {
				display: flex;
				animation: move 80s linear infinite;

				view {
					width: 170rpx;
					height: 45rpx;
					margin-right: 24rpx;
					font-size: 18rpx;
					@include backImg;

					p {
						margin-left: 20rpx;
					}
				}
			}

			.imgbox2 {
				view {
					margin-right: 50rpx;
				}
			}
		}

		.enter-zh {
			width: 110px;

		}

		.enter-else {
			width: 140px;

		}


		.enter {
			height: 100%;
			background-color: #F2F2F2;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			position: absolute;
			right: 0;
			padding: 0 20rpx;

			p {
				font-size: 26rpx;
			}

			button {
				width: 100%;
				height: 50rpx;
				border: 1px solid black;
				background-color: transparent;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				text-align: center;
				font-size: 20rpx;
				font-weight: 600;
			}
		}
	}



	.menus_nav {
		width: 100%;
		padding: 20rpx;
		gap: 20rpx;

		.menus_nav_item {
			flex: 1;
			height: 400rpx;
		}

		.menus_nav_left {
			background: url('../../static/homepage/menu1.png');
			@include backImg;

			.menus_nav_left_text {
				width: 100%;
				color: #fff;
				font-weight: 600;
				padding: 30rpx 0 0 45rpx;

				p {
					margin-top: 10rpx;
				}

				p:first-child {
					font-size: 36rpx;

					span:first-child {
						padding-right: 10rpx;
					}

					span:last-child {
						font-size: 22rpx;
						color: #7B7BF5;
						background: #FEC96D;
						padding: 0 8rpx;
						border-radius: 30rpx;
					}
				}

				p:last-child {
					font-size: 26rpx;
				}
			}
		}

		.menus_nav_right {
			width: 100%;
			height: 100%;
			gap: 20rpx;

			.menus_nav_right_item {
				width: 100%;
				height: 188rpx;
				padding-left: 30rpx;
				@include backImg;

				.menus_nav_right_item_content {
					height: 100%;

					p {
						font-size: 24rpx;
						margin-bottom: 10rpx;
					}

					p:nth-child(1) {
						font-size: 28rpx;
						color: #000;
						font-weight: 600;
					}

					p:nth-child(2) {
						color: #ccc;
						font-size: 26rpx;
					}

					p:nth-child(3) {
						padding: 5rpx 10rpx;
						color: #C8736C;
						background: #FDF0EA;
					}
				}
			}
		}
	}

	.updateBox {
		width: 250rpx;
		height: 230rpx;
		position: fixed;
		left: -5rpx;
		bottom: 200rpx;
		z-index: 88;
		background-image: url('/static/homepage/rocket_bg2.png');
		@include backImg;

		P {
			width: 75rpx;
			font-size: 30rpx;
			font-weight: 800;
			color: #FFFFFF;
			text-align: center;
			margin-left: 30rpx;
			margin-top: 20rpx;
		}
	}

	@keyframes move {
		from {
			transform: translateX(-80%);
		}

		to {
			transform: translateX(0%);
		}
	}

	// @keyframes move {
	// 	from {
	// 		transform: translateX(0);
	// 	}

	// 	to {
	// 		transform: translateX(100%);
	// 	}
	// }

	@keyframes monkeyMove {
		0% {
			width: 200rpx;
			height: 200rpx;
			// transform: translateX(-36rpx);
		}

		49% {
			width: 260rpx;
			height: 260rpx;
			// transform: translateX(calc(100% + 36rpx));
		}

		50% {
			width: 200rpx;
			height: 200rpx;
			// transform: translateX(calc(100% + 36rpx)) rotateY(180deg);
		}

		51% {
			width: 100rpx;
			height: 100rpx;
			// transform: translateX(calc(100% + 36rpx)) rotateY(180deg);
		}

		100% {
			width: 290rpx;
			height: 290rpx;
			// transform: translateX(-36rpx) rotateY(180deg);
		}

	}
</style>