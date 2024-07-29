<template>
	<view class="activity" :style="bg_style">
		<view class="header" id="filtration">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<image class="header-logo" src="/static/logo_icon.png" mode=""></image>
			<view class="swiper-box">
				<iswiper :list="swiperlist"></iswiper>
			</view>
			<view class="serach-box flex-between">
				<u-search :showAction="true" @clear="clear" @change="changesearch" @search="serach" placeholder="活动搜索"
					v-model="keyword"></u-search>
				<view class="filtration-right flex-between">
					<view class="filtration-item flex-end" :class="{'filtration-itemactive':type==1}" @tap="choose(1)">
						<text class="t1" v-if="active_type==''">分类</text>
						<text class="t1" v-if="active_type==1">合成</text>
						<text class="t1" v-if="active_type==2">抽奖</text>
						<text class="t1" v-if="active_type==3">兑换</text>
						<text class="t1" v-if="active_type==4">公告</text>
						<text class="t1" v-if="active_type==5">投票</text>
						<u-icon name="arrow-down-fill" :bold="type==1" size="10"></u-icon>
					</view>
					<view class="filtration-item flex-end" :class="{'filtration-itemactive':type==3}" @tap="choose(3)">
						<text class="t1" v-if="sort==''">排序</text>
						<text class="t1" v-if="sort==1">升序</text>
						<text class="t1" v-if="sort==2">降序</text>
						<u-icon name="arrow-down-fill" :bold="type==3" size="10"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="activity-box">
			<activity :list="activitylist"></activity>
			<iloading :result="loading"></iloading>
		</view>
		<choosecard :top="choosecard_top" :list="list" :current="current" @choose_fn="choose_fn"
			:show="choosecard_show"></choosecard>
	</view>
</template>

<script>
	import choosecard from './components/choosecard.vue';
	import iswiper from '@/components/pswiper.vue';
	import activity from './components/activity.vue';
	import {
		pages
	} from '@/common/mixins/index.js';
	export default {
		mixins: [pages],
		components: {
			iswiper,
			activity,
			choosecard
		},
		data() {
			return {
				keyword: '',
				swiperlist: [],
				activitylist: [],
				loading: 1,
				choosecard_top: 0,
				choosecard_show: false,
				current: 0,
				list: [],
				type: "", //1分类 2 排序
				active_type: "",
				sort: "",
				bg_style: {}
			};
		},
		created() {
			this.public_activeGetList();
			this.getSlider();
		},
		mounted() {
			this.setnavbar();
		},
		methods: {
			async choose(type) {
				this.type = type;
				if (this.type != type) {
					this.current = 0;
				}
				if (this.type == type && this.choosecard_show) {
					this.choosecard_show = false;
					this.type = "";
					return false;
				}
				this.list = [];
				this.current = 0;
				switch (type) {
					case 1:
						this.list = [{
								name: '全部',
								type: ''
							},
							{
								name: '公告',
								type: "4"
							},
							{
								name: '投票',
								type: "5"
							},
							{
								name: '合成',
								type: "1"
							},
							{
								name: '抽奖',
								type: "2"
							},
							{
								name: '兑换',
								type: "3"
							},
						];
						this.set_current("active_type");
						break;
					case 3:
						this.list = [{
								name: '时间降序',
								type: "2"
							},
							{
								name: '时间升序',
								type: "1"
							},
						];
						this.set_current("sort");
						break;
					default:
						break;
				}
				this.$nextTick(() => {
					this.$emit("choose_fn", {
						type: this.type
					});

				});
				this.choosecard_show = true;
			},
			set_current(type) {
				if (type != '') {
					this.current = this.list.findIndex((item, index) => {
						return item.type == this[type];
					})
				}
			},
			async setnavbar() {
				let header = await uni.utils.info_distance('header');
				let filtrationinfo = await uni.utils.info_distance('filtration');
				this.choosecard_top = filtrationinfo.height + 5;
				this.bg_style = {
					"padding-top": filtrationinfo.height + "px"
				};

			},
			choose_fn(info) {
				if (this.type == 1) {
					this.active_type = info.info.type;
				}
				if (this.type == 3) {
					this.sort = info.info.type;
				}

				this.current = info.index;
				this.choosecard_show = false;
				this.init_fn();
			},
			changesearch(e) {
				if (!e) {
					this.init_fn();
				}
			},
			clear() {
				this.keyword = "";
			},
			serach(e) {
				if (e.trim()) {
					this.init_fn();
				} else {
					uni.showToast({
						title: "请输入搜索内容",
						icon: "none"
					})
				}

			},
			init_fn() {
				this.activitylist = [];
				this.page = 1;
				this.loading = 1;
				this.public_activeGetList();
			},
			async getSlider() { //获取轮播图数据
				let res = await uni.ajax.public_getlist({
					site_id: 9,
					page: 1,
					limit: 15
				})
				if (res) {
					try {
						this.swiperlist = res.data.list.map(item => {
							return {
								image: item.file.show_src,
								title: item.site_name,
								src: item.open_url,
								open_type: item.open_type
							}
						})
					} catch (e) {
						//TODO handle the exception
					}
				}
			},
			async public_activeGetList() {
				let res = await uni.ajax.public_activeGetList({
					page: this.page,
					limit: uni.conf.limit,
					active_type: this.active_type,
					sort: this.sort,
					keywords: this.keyword
				});
				if (res) {
					if (res.data.list.length > 0) {
						res.data.list.forEach((item, index) => { //处理活动时间 1未开始2进行中3已结束
							let timeInfo = uni.utils.FormDataEndTime(item.start_time, item.end_time);
							item.is_time = timeInfo.is_time;
							item.timestamp = timeInfo.timestamp;
							if (res.data.list.length - 1 == index) {
								this.setPagedata('', 'activitylist', res.data.list, 'public_activeGetList',
									false);
							}
						})
					} else {
						this.setPagedata('', 'activitylist', res.data.list, 'public_activeGetList', false);
					}
				}
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.activity {
		.activity-box {
			padding: 32rpx;
		}

		.header {
			z-index: 2;
			background: #ffffff;
			width: 100%;
			box-sizing: border-box;
			padding: 24rpx 32rpx;
			position: fixed;
			top: 0rpx;
			left: 0rpx;

			.swiper-box {
				margin-top: 24rpx;
			}

			.serach-box {
				padding: 24rpx 0rpx 0rpx 0rpx;

				.filtration-right {
					margin-left: 100rpx;

					.t1 {
						color: #999999;
						font-size: 28rpx;
					}

					.filtration-item {
						width: 100rpx;
					}

					.filtration-itemactive {
						.t1 {
							color: #000;
							font-weight: bold;
						}
					}
				}
			}

			.header-logo {
				width: 178rpx;
				height: 40rpx;
				margin-right: 24rpx;
			}
		}

	}
</style>