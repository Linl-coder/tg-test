<template>
	<view class="index" :style="bg_style">

		<view v-if="false" class="header" id="header" :class="{ header_active: show_navbar }">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="flex-center">
				<image class="header-logo" :src="appInfo.icon" mode="widthFix"></image>
				<view class="serach-box" @tap="topage('general/serach/index?type=1')">
					<u-search :showAction="false" :disabled="true" :bgColor="show_navbar ? '#f5f5f5' : '#fff'"
						placeholder="请输入关键词" v-model="keyword"></u-search>
				</view>
			</view>
		</view>



		<!-- 轮播 -->
		<view class="swiper-box">
			<iswiper :list="sliderlist" radius="0" height="588rpx" :is_3d="true"></iswiper>
		</view>

		<!-- 菜单 -->
		<!-- <view class="imenu-box"><pmenu :list="menuList" style="background: none!important;"></imenu></view> -->

		<!-- 滚动广告 -->
		<!-- <view class="announcement-box"><announcement ref="announcement" ></announcement></view> -->

		<!-- 区域滚动 -->
		<!-- <view class="roll">
			<view class="roll_area">
				<view class="roll_area_item">
					<image v-for="item in 30" src="/static/game/Group 427318999.png" mode="heightFix"></image>
				</view>
				<view class="roll_area_item">
					<image v-for="item in 30" src="/static/game/Group 427318998.png" mode="heightFix"></image>
				</view>
			</view>
			<view class="roll_icon">
				<image src="/static/game/Frame 427320276.png" mode=""></image>
			</view>
		</view> -->

		<!-- 魔法橱窗 -->

		<view class="menus">
			<view class="menus_left" @click="topage('general/invite/share')">
				<view class="menus_left_text1"> 爆款商品 </view>
				<view class="menus_left_text2">
					买! 买! 买!
				</view>
				<image src="/static/menus/img1.png" mode="widthFix"></image>
			</view>
			<!-- <view style="width: 24rpx;"></view> -->
			<view class="menus_right">
				<!-- @tap="to_dts" 跳转大逃杀 -->
				<image @tap="to_dts" src="/static/menus/img2.png" mode=""></image>
				<!-- @click="$u.route({url:'pages/gather/mainland/index',type:'switchTab'})" -->
				<image src="/static/menus/img3.png" mode="" @tap="to_dts"></image>
			</view>
		</view>

		<!-- 数据列表 -->
		<view class="content">
			<!-- <view class="itab-box"><itab :tab_list="tab_list" @change="change_tab" :type="4" :current="current"></itab></view> -->
			<view class="chaowan">
				热门商品推荐
			</view>

			<view class="" style="padding: 0 32rpx;" v-if="current == 0">
				<collectList :current="index" v-for="(item, index) in collectdata" :key="index" :info="item">
				</collectList>
			</view>

			<view class="" v-if="current == 1">
				<!-- <blindboxlist :current="index" v-for="(item, index) in blindboxdata" :key="index" :info="item"></blindboxlist> -->
				<newblindbox></newblindbox>

			</view>

			<!-- <view class="" v-if="current == 2"><drawlist :current="index" v-for="(item, index) in drawdata" :key="index" :info="item"></drawlist></view> -->

			<iloading :result="loading" desc=""></iloading>


		</view>

		<!-- app更新弹框 -->
		<!-- #ifdef APP-PLUS -->
		<updatePopup :info="appinfo" v-if="showupdata"></updatePopup>
		<!-- #endif -->

		<!-- 提示弹框 -->
		<modal :type="2" ref="modal" @confirm="close_tips" :content="warm_hint"></modal>

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
	import {
		pages,
		userinfo
	} from '@/common/mixins/index.js';
	import updatePopup from '@/components/updatePopup.vue';
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
			iswiper,
			pmenu,
			broadcast,
			collectList,
			blindboxlist,
			drawlist,
			itab,
			updatePopup,
			newblindbox
		},
		data() {
			return {
				bg_style: {},
				show_navbar: false,
				tab_list: [{
						name: '潮玩'
					},
					{
						name: '盲盒'
					},
					// {
					// 	name: '抽签卡牌'
					// }
				],
				notice: [],
				loading: 1,
				collectdata: [], //卡牌列表
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
					android_url: ""
				},
				showupdata: false,
				warm_hint: ""
			};
		},
		onLoad() {
			this.set_init_list();
			if (this.is_login) {
				this.get_user_info();
			}
		},
		computed: {
			appInfo() {
				return this.$store.getters.get_appInfo;
			},
			is_login() {
				return this.$store.getters.is_login;
			},
		},
		onPageScroll(e) {
			if (e.scrollTop > 10) {
				this.show_navbar = true;
			} else if (e.scrollTop >= 1 && e.scrollTop <= 10) {
				this.show_navbar = false;
			}
		},
		onPullDownRefresh() {
			this.init(true)
		},
		created() {
			this.init(true);
			// #ifdef APP-PLUS
			this.get_url();
			// #endif			
		},
		mounted() {
			this.warm_hint = this.appInfo.warm_hint;
			if (this.warm_hint) {
				this.$refs.modal.open();
			}
			this.setnavbar();
		},
		methods: {
			to_dts() {
				uni.$u.toast('待开发')
				return
				// 	window.location.href='http://kill.sxqichuangkeji.com/172?token='+uni.getStorageSync('jwt')+'&company_code=19';


			},
			async get_url() {
				let system = await uni.pro.getSystemInfo();
				let res = await uni.ajax.public_getversionConfig();
				if (system.platform == 'ios') {
					if (res.data.ios.key > uni.conf.versionios) {
						uni.hideTabBar();
						this.showupdata = true;
						this.appinfo = {
							is_apk: 2,
							android_url: res.data.ios.down_url,
							is_force: 1,
							update_content: res.data.update.updatetext
						}
					}
				} else {
					if (res.data.andior.key > uni.conf.version) {
						uni.hideTabBar();
						this.showupdata = true;
						this.appinfo = {
							is_apk: 2,
							android_url: res.data.andior.down_url,
							is_force: 1,
							update_content: res.data.update.updatetext
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
				this.getNewsad();
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
					this.collect_getList(is_onPullDownRefresh);
				}
				if (this.current == 1) {
					// this.collect_blindboxGetList(is_onPullDownRefresh);
				}
				if (this.current == 2) {
					this.draw_getList(is_onPullDownRefresh);
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
							let timeInfo = uni.utils.FormDataEndTime(item.start_time, item.end_time);
							item.is_time = timeInfo.is_time;
							item.timestamp = timeInfo.timestamp;
							if (res.data.list.length - 1 == index) {
								this.setPagedata('blindboxdata', 'blindboxdata_list', res.data.list,
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
							let timeInfo = uni.utils.FormDataEndTime(item.start_time, item.end_time);
							item.is_time = timeInfo.is_time;
							item.timestamp = timeInfo.timestamp;
							if (res.data.list.length - 1 == index) {
								this.setPagedata('drawdata', 'drawdata_list', res.data.list, 'draw_getList');
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

					if (res.data.list.length > 0) {
						this.setPagedata('collectdata', 'collectdata_list', res.data.list, 'collect_getList');
					} else {
						this.setPagedata('collectdata', 'collectdata_list', res.data.list, 'collect_getList');
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
								image: item.file.show_src,
								title: item.site_name,
								src: item.open_url,
								open_type: item.open_type
							};
						});
						//console.log("轮播图", this.sliderlist)
					} catch (e) {
						//TODO handle the exception
					}
				}
			},
			async getNewsad() {
				//获取最新公告
				let res = await uni.ajax.public_adgetList({
					cate_id: "",
					page: this.page,
					limit: uni.conf.limit,
				});
				if (res) {
					res.data.list.forEach((item, index) => {
						if (index <= 2) {
							this.notice.push(item);
						}
						if (res.data.list.length - 1 == index) {
							this.$refs.announcement.init_fn(this.notice)
						}
					})

				}
			},
			async setnavbar() {

				//设置导航栏
				let header = await uni.utils.info_distance('header');
				//console.log("header", header);
				// this.bg_style = {
				// 	'padding-top': header.height + 'px'
				// };
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

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.index {
		.content {
			padding: 40rpx 0rpx 0rpx;

			.chaowan {
				padding: 0 20rpx 32rpx;
				color: #000;
				font-family: Alimama ShuHeiTi;
				font-size: 32rpx;
				font-style: normal;
				font-weight: 700;
				line-height: 36rpx;
				/* 112.5% */
				letter-spacing: -0.165px;
			}

			.version_info {
				line-height: 45rpx;
				font-size: 20rpx;
				text-align: justify;
				padding: 20rpx 0rpx;
			}
		}

		.header {
			width: 100%;
			box-sizing: border-box;
			padding: 24rpx 24rpx;
			position: fixed;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;

			.header-logo {
				width: 70px;
				height: 64rpx;
				margin-right: 24rpx;
			}

			.serach-box {
				flex: 1;
			}
		}

		.header_active {
			background-color: #fff;
		}

		.imenu-box {
			padding: 24rpx 0rpx;
		}

		.swiper-box {
			// padding: 24rpx 24rpx;
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
			// width: 374rpx;
			// flex: 1;
			height: 370rpx;
			// background: url('/static/menus/ExplosiveGoods.png') no-repeat;
			background-size: 100% 100%;
			position: relative;
			padding: 32rpx 32rpx;
			margin-right: 15rpx;

			.menus_left_text1 {
				font-size: 36rpx;
				font-family: PangMenZhengDao-Regular, PangMenZhengDao;
				font-weight: bolder;
				color: #000000;
			}

			.menus_left_text2 {
				margin-top: 10rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
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
		padding: 24rpx 24rpx 24rpx 0;
		display: flex;

		.roll_area {
			overflow: hidden;
			height: 100rpx;
			flex: 1;

			// background: #999;
			.roll_area_item {
				animation: move 45s linear infinite;
				display: flex;
				width: fit-content;

				image {
					height: 52rpx;
					margin-right: 24rpx;
				}
			}

		}

		.roll_icon {
			width: 156rpx;
			height: 100rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	@keyframes move {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(0);
		}
	}

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