<template>
	<view class="orderlist">

		<u-navbar auto-back placeholder>
			<u-tabs slot="center" :current="0" :list="typeList" lineWidth="0"
				activeStyle="color:var(--theme);font-weight:bold;font-size:32rpx"
				inactiveStyle="color:#ccc;font-wiight:400;font-size:28rpx" @click="tabsChange"></u-tabs>
		</u-navbar>

		<view class="itab-box flex-center">
			<itab :tab_list="tab_list" :type="2" :current="current" @change="change_fn"></itab>
		</view>
		<view class="order-box">
			<order v-for="(item,index) in list" :key="index" :info="item"></order>
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
						name: '全部',
						status: ""
					},
					{
						name: '待支付',
						status: 1
					},
					{
						name: '已完成',
						status: 2
					},
					{
						name: '已取消',
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
			console.log(option)
			if (option.status) {
				this.status = option.status
				this.current = option.status * 1
			}
		},
		onShow() {
			this.page = 1;
			this.loading = 1;
			this.list = [];
			clearOrderlist();
			this.collect_orderList();
			this.orderlist = orderlist;
		},
		methods: {
			tabsChange(e) {
				console.log(e)
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
				let index = e;
				this.list = [];
				this.page = 1;
				this.loading = 1;
				this.current = index;
				this.status = this.tab_list[index].status;
				clearOrderlist();
				this.orderlist = orderlist;
				if (this.status == 10) {
					this.getMyAirdropList()
				} else {
					this.collect_orderList();
				}
			},
			async collect_orderList() {
				let res = await uni.ajax.collect_orderList({
					page: this.page,
					limit: uni.conf.limit,
					is_mark: "",
					buy_type: "",
					status: this.status
				})
				if (res) {
					let now_time = new Date().getTime();
					res.data.list.forEach(item => {
						if (item.status == 1) {
							item.endtime = Number(item.end_time * 1000) - now_time;
						}
						if (item.goods instanceof Array) {
							item.is_batch = true;
						} else {
							item.is_batch = false;
						}
					})
					this.setPagedata("list", 'orderlist', res.data.list, 'collect_orderList');
				}
			},
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