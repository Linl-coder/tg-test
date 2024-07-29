<template>
	<view class="orderlist">

		<u-navbar placeholder @leftClick="leftClick">
			<itab slot="center" :language='language' :tab_list="tab_list" :type="2" :current="current"
				@change="change_fn">
			</itab>
			<!-- <u-tabs slot="center" :current="0" :list="typeList" lineWidth="0"
				activeStyle="color:var(--theme);font-weight:bold;font-size:32rpx"
				inactiveStyle="color:#ccc;font-wiight:400;font-size:28rpx" @click="tabsChange"></u-tabs> -->
		</u-navbar>
		<!-- fdfd 33-->
		<!-- <view class="itab-box flex-center">
			<itab :tab_list="tab_list" :type="2" :current="current" @change="change_fn"></itab>
		</view> -->
		<view class="order-box">
			<order :info="list" @reloadList="handleReloadList"></order>
			<!-- {{item}}--2222 -->
			<iloading :result="loading"></iloading>
		</view>
	</view>
</template>

<script>
	import {
		pages
	} from "@/common/mixins/index.js";
	import itab from "@/components/itab.vue";
	import order from "./components/order.vue";
	import {
		orderlist,
		clearOrderlist
	} from "./list.js";
	export default {
		components: {
			order,
			itab
		},
		mixins: [pages],
		data() {
			return {
				language: uni.getStorageSync('locale') ? uni.getStorageSync('locale') : this._i18n.locale,
				typeList: [{
						name: '虚拟订单',
						type: 'virtual'
					},
					{
						name: '实物订单',
						type: 'in_kind'
					},
				],

				loading: 1,
				current: 0,
				tab_list: [{
						name: this.$t('orderList.totol'),
						status: ""
					},
					{
						name: this.$t('orderList.waitPay'),
						status: 1
					},
					{
						name: this.$t('orderList.havePay'),
						status: 2
					},
					{
						name: this.$t('orderList.haveCancel'),
						status: 3
					},
					// {
					// 	name:'空投',
					// 	status:10
					// }
				],
				list: [],
				status: ""
			}
		},
		onLoad(option) {
			//console.log("orderlist_option==>", option)
			if (option.status) {
				this.status = option.status
				this.current = option.status * 1
			}
		},
		onShow() {
			this.page = 1;
			this.loading = 1;
			this.collect_orderList();
			// this.list = [];
			// clearOrderlist();
			// this.orderlist = orderlist;
		},
		methods: {
			handleReloadList(value) {
				if (value == "isReload") {
					//console.log("handleReloadList=====》");
					this.collect_orderList();
				}
			},
			leftClick() {
				//console.log("32423");
				this.totab('gather/home/index')
			},
			tabsChange(e) {
				//console.log(e)
				if (e.type == "in_kind") {
					uni.redirectTo({
						url: '/pages/market/order/list?current=0'
					})
				}
			},
			reback() {
				uni.switchTab({
					url: '/pages/gather/home/index'
				})
			},
			change_fn(e) {
				if (this.current == e) {
					return
				}
				this.list = [];
				this.page = 1;
				this.loading = 1;
				this.current = e;
				this.status = this.tab_list[e].status;
				clearOrderlist();
				this.orderlist = orderlist;
				if (this.status == 10) {
					this.getMyAirdropList()
				} else {
					this.collect_orderList();
				}
			},
			async collect_orderList() {
				let res = await uni.ajax.getOrderList({
					page: this.page,
					limit: uni.conf.limit,
					status: this.status
				})
				if (res) {
					// let now_time = new Date().getTime();
					// res.data.list.forEach(item => {
					// 	if (item.status == 1) {
					// 		item.endtime = Number(item.end_time * 1000) - now_time;
					// 	}
					// 	if (item.goods instanceof Array) {
					// 		item.is_batch = true;
					// 	} else {
					// 		item.is_batch = false;
					// 	}
					// })
					//this.setPagedata("list", 'orderlist', res.data.list, 'collect_orderList');
					this.loading = 0;
					this.list = res.data.list;
					//console.log("list", this.list);
				}
			},
			// async collect_orderList() {
			// 	let res = await uni.ajax.collect_orderList({
			// 		page: this.page,
			// 		limit: uni.conf.limit,
			// 		is_mark: "",
			// 		buy_type: "",
			// 		status: this.status
			// 	})
			// 	if (res) {
			// 		let now_time = new Date().getTime();
			// 		res.data.list.forEach(item => {
			// 			if (item.status == 1) {
			// 				item.endtime = Number(item.end_time * 1000) - now_time;
			// 			}
			// 			if (item.goods instanceof Array) {
			// 				item.is_batch = true;
			// 			} else {
			// 				item.is_batch = false;
			// 			}
			// 		})
			// 		this.setPagedata("list", 'orderlist', res.data.list, 'collect_orderList');
			// 	}
			// },
			async getMyAirdropList() {
				let res = await uni.ajax.getMyAirdropList({
					page: this.page,
					limit: uni.conf.limit,
					type: 7,
					pool_id: 1
				})
				if (res) {
					let now_time = new Date().getTime();
					res.data.list.forEach(item => {
						item.is_batch = false;
						item.mark = 10;
						item.goods = item.pool;
						item.num = item.num || 1,
							item.buy_type = 1,
							item.status = 10
					})
					this.setPagedata("list", 'orderlist', res.data.list, 'getMyAirdropList');
				}
			}
		}
	}
</script>

<style lang="scss">
	// /deep/.u-icon__icon span {
	// 	font-family: uicon-iconfont !important;
	// }

	.orderlist {
		.itab-box {
			background: #fff;
			padding: 24rpx 0rpx;

			/deep/.tab_item {
				background-color: #fff;
			}
		}

		.order-box {
			padding: 24rpx;
		}
	}

	.nav_c {
		display: flex;
		align-items: center;

		.nav_c_list {
			margin: 0 20rpx;
			font-size: 32rpx;
			color: #999;
		}

		.nav_c_list_active {
			font-weight: bold;
			color: #000000;
		}
	}
</style>