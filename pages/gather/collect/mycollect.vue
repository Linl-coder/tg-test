<template>
	<view class="index">
		<view class="serach-box">
			<u-search :showAction="true" @clear="clear" @change="changesearch" @custom="serach" @search="serach"
				bgColor="#F5F5F5" :placeholder="$t('myCard.searchCard')" :action-text="$t('utils.search')"
				v-model="keyword">
			</u-search>
		</view>
		<!-- <view class="itab-box flex-center">
			<itab :tab_list="tab_list" :type="3" width="235rpx" lineColor_="var(--theme)" :current="current" @change="change_fn"></itab>
		</view> -->
		<!-- {{buy_type}} -->
		<view class="order-box" v-if="buy_type == 1">
			<mycollectlist ref="mycollectlist" :buy_type="buy_type"></mycollectlist>
		</view>
		<!-- <view class="order-box" v-if="buy_type == 2">
			<myblindboxlist ref="myblindboxlist" :buy_type="buy_type"></myblindboxlist>
		</view> -->
		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	import {
		pages
	} from '@/common/mixins/index.js';
	import itab from '@/components/itab.vue';
	import mycollectlist from './components/mycollectlist.vue';
	import myblindboxlist from '@/pages/gather/blindbox/components/myblindboxlist.vue';
	export default {
		components: {
			itab,
			mycollectlist,
			myblindboxlist,
		},
		mixins: [pages],
		data() {
			return {
				keyword: "",
				current: 0,
				tab_list: [{
						name: this.$t('myCard.card')
					},
					{
						name: this.$t('myCard.blindBox')
					},
					// {
					// 	name: '已售出'
					// }
				],
				list: [],
				loading: 1,
				buy_type: 1
			};
		},
		onNavigationBarButtonTap() {
			this.topage('gather/collect/regift')
		},
		// mounted() {
		// 	this.collect_saleGetMyList();
		// },
		onBackPress() {
			this.totab("gather/home/index");
			return true;
		},
		onPullDownRefresh() {
			this.init_fn(true);
		},
		onShow() {
			this.init_fn(true);
			uni.setNavigationBarTitle({
				title: this.$t('myCard.myCard')
			})
		},
		methods: {
			change_fn(e) {
				this.current = e.index;
				this.buy_type = e.index + 1;
				this.init_fn();
			},
			init_fn(is_onPullDownRefresh) {
				this.list = [];
				this.loading = 1;
				this.page = 1;
				this.$nextTick(async () => {
					if (this.buy_type == 1) {
						this.$refs.mycollectlist.init_fn();
						this.collect_saleGetMyList(is_onPullDownRefresh);
					} else {
						this.$refs.myblindboxlist.init_fn();
						this.collect_boxGetMyList(is_onPullDownRefresh);
					}
				});
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
						title: this.$t('myCard.plsInputSearchContent'),
						icon: "none"
					})
				}
			},
			async collect_saleGetMyList(is_onPullDownRefresh) {
				//卡牌
				let res = await uni.ajax.collect_saleGetMyList({
					limit: uni.conf.limit,
					page: this.page,
					title: this.keyword,
					data_type: 2
				});
				if (res) {
					this.FormData_null(res.data.list);
					this.$refs.mycollectlist.setData(res.data.list);
					this.setPagedata('', 'list', res.data.list, 'collect_saleGetMyList', false);
					if (is_onPullDownRefresh) {
						await uni.utils.sleep(500);
						uni.stopPullDownRefresh();
					}
				}
			},
			async collect_boxGetMyList(is_onPullDownRefresh) {
				//盲盒
				let res = await uni.ajax.collect_boxGetMyList({
					limit: uni.conf.limit,
					page: this.page,
					title: this.keyword
				});
				if (res) {
					this.FormData_null(res.data.list);
					this.$refs.myblindboxlist.setData(res.data.list);
					this.setPagedata('', 'list', res.data.list, 'collect_boxGetMyList', false);
					if (is_onPullDownRefresh) {
						await uni.utils.sleep(500);
						uni.stopPullDownRefresh();
					}
				}
			},
			FormData_null(arr) {

				arr.forEach((item, index) => {
					if (this.current == 1) {

						if (!item.box) {
							item.box = {
								cover: {
									show_src: "",
									width: 658,
									height: 658
								},
								title: this.$t('utils.noData'),
								id: 0
							};
						}

						if (!item.box.cover) {
							item.box.cover = {
								show_src: "",
								width: 658,
								height: 658
							}
						}
					}

					if (this.current == 0) {

						if (!item.pool) {
							item.pool = {
								cover: {
									show_src: "",
									width: 658,
									height: 658
								},
								title: this.$t('utils.noData'),
								id: 0,
								author: {
									nickname: "暂无",
								}
							};
						}
					}


				});
			},
		}
	};
</script>

<style lang="scss">
	/deep/.u-search__action {
		width: 110rpx !important;
	}

	.index {
		.serach-box {
			background-color: #fff;
			//background: red;
			padding: 24rpx 24rpx 24rpx 24rpx;
		}

		.itab-box {
			background: #fff;
			padding: 24rpx 0rpx;
		}

		.order-box {
			padding: 24rpx 24rpx 0rpx 24rpx;
		}
	}
</style>