<template>
	<view class="orderList">
		<u-navbar auto-back placeholder>
			<u-tabs slot="center" :current="1" :list="typeList" lineWidth="0"
				activeStyle="color:var(--theme);font-weight:bold;font-size:32rpx"
				inactiveStyle="color:#ccc;font-wiight:400;font-size:28rpx" @click="tabsChange"></u-tabs>
		</u-navbar>
		<view class="tabs">
			<u-tabs :list="tabList" :current='current' lineHeight="0" :scrollable="true"
				:activeStyle="{color:'var(--theme)',fontWeight:600,fontSize:'32rpx'}"
				:inactiveStyle="{color:'#999',fontWeight:400,fontSize:'32rpx'}" @click="tap_tab"></u-tabs>
		</view>
		<view class="list">
			<block v-for="item,index in dataList" :key="item.id">
				<view class="order_item" @click="to_order_detail(item)">
					<view class="order-t flex-between">
						<!-- <view class="t1">{{item.product.product_type | product_type}}</view> -->
						<view class="t2">{{item.status | status}}</view>
					</view>
					<view class="order-info">
						<view class="order-img">
							<u-image :src="item.product? item.product.picture:''" width="152rpx" height="152rpx"
								radius="12rpx" mode="aspectFill"></u-image>
						</view>
						<view class="order-details">
							<view class="goods-title u-line-2">{{item.product?item.product.title:'--'}}</view>
							<view class="order-no">订单编号：{{item.order_sn}}</view>
							<view class="order-time">下单时间：{{item.add_time}}</view>
						</view>
						<view class="order-num">
							{{item.total_num}}
						</view>
					</view>
					<view class="price-box flex-end">
						<view class="price">
							<text v-show="item.status==0">应付款：</text>
							<text v-show="item.status!=0">订单金额：</text>
							<view class="flex-start">
								<text class="connect">￥</text>
								<text class="price">{{item.product.price}}</text>
								<!-- <text class="connect" v-if="item.integral*1 && item.pay_price*1">+</text>
								<text class="integral" v-if="item.integral*1"><text
										style="font-size: 32rpx;">{{item.integral}}</text>积分</text> -->
							</view>
						</view>
					</view>
					<view v-if="[0,2].includes(item.status)" class="f-box flex-between">
						<view class="count-dowm flex-start">
							<block v-if="item.end_time*1000 > new Date().getTime() && item.status == 0">
								剩余时间：
								<u-count-down @finish="time_end(item,index)"
									:time="item.end_time*1000 - new Date().getTime()" format="HH:mm:ss"></u-count-down>

							</block>
						</view>
						<view class="f-btn">
							<view v-if="item.status == 0" class="btn-cancel flex-center"
								@tap.stop="cannel_order(item,index)">取消订单</view>
							<view v-if="item.status == 0" class="btn-pay flex-center" @tap.stop="to_order_detail(item)">
								去支付</view>
							<view v-if="item.status == 2" class="btn-pay flex-center" @tap.stop="setFinish(item,index)">
								确定收货
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>

		<u-loadmore v-if="!empty" :status="status" />
		<u-empty mode="list" :show="empty" icon="/static/else/nodata1.png"></u-empty>

	</view>
</template>

<script>
	export default {
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
				tabList: [{
						name: '全部',
						status: ''
					},
					{
						name: '待支付',
						status: 0
					},
					{
						name: '待发货',
						status: 1
					},
					{
						name: '待收货',
						status: 2
					},
					{
						name: '已完成',
						status: 4
					},
					{
						name: '已取消',
						status: 5
					}
				],
				current: 0,
				page: 1,
				dataList: [],
				// 操作订单的id、下标
				order_id: '',
				index: '',
				status: 'loadmore',
				empty: false
			}
		},
		filters: {
			status(status) {
				let type = null;
				switch (status) {
					case 0:
						type = '待支付';
						break;
					case 1:
						type = '待发货';
						break;
					case 2:
						type = '待收货';
						break;
					case 3:
						type = '待评价';
						break;
					case 4:
						type = '已完成';
						break;
					case 5:
						type = '已取消';
						break;
				}
				return type;
			},
			// product_type(val) {
			// 	let type = null
			// 	switch (val) {
			// 		case 1:
			// 			type = '实物';
			// 			break;
			// 		case 2:
			// 			type = '卡牌';
			// 			break;
			// 		case 3:
			// 			type = '盲盒';
			// 			break;
			// 	}
			// 	return type
			// }
		},
		onReachBottom() {
			if (this.status == 'loadmore') {
				this.page += 1
				this.get_order_list()
			}
		},
		onLoad(option) {

			this.current = option.current * 1

			this.$nextTick(() => {
				this.get_order_list()

			})


		},
		methods: {
			tabsChange(e) {
				console.log(e)
				if (e.type == "virtual") {
					uni.redirectTo({
						url: '/pages/gather/order/orderlist?static='
					})
				}
			},
			tap_tab(e) {
				if (this.current == e.index) return;

				this.dataList = []
				this.empty = false
				this.page = 1
				this.current = e.index
				console.log(e)

				this.get_order_list()
			},
			async get_order_list() {

				this.status = 'loading';
				let {
					data: result
				} = await uni.ajax.shop_getOrderList({
					page: this.page,
					limit: uni.conf.limit,
					status: this.tabList[this.current].status
				})
				console.log(result)
				if (result) {
					this.dataList = [...this.dataList, ...result.list]
					if (this.dataList.length == 0) this.empty = true
					if (result.count > this.dataList.length) {
						this.status = 'loadmore'
					} else {
						this.status = 'nomore'
					}
				}

			},
			// 收货
			setFinish(val, i) {
				uni.showModal({
					title: "提示",
					content: "确认是否收货？",
					success: async res => {
						if (res.confirm) {
							let result = await uni.ajax.shop_setFinish({
								id: val.id
							});
							if (result) {
								this.dataList[i].status = 4
							}
						}
					}
				})
			},
			// 取消
			cannel_order(val, i) {
				this.order_id = val.id;
				this.index = i
				uni.showModal({
					title: '提示',
					content: '确认取消订单？',
					success: res => {
						if (res.confirm) {
							this.shop_setCancel()
						}
					}
				})
			},
			// 倒计时结束 执行取消订单操作
			time_end(val, i) {
				this.order_id = val.id;
				this.index = i
				this.shop_setCancel()
			},
			// 取消订单
			async shop_setCancel() {
				let result = await uni.ajax.shop_setCancel({
					id: this.order_id
				})
				console.log(result)
				if (result) {
					this.dataList[this.index].status = 5
				}
			},
			to_order_detail(val) {
				uni.setStorage({
					key: 'order_detail',
					data: JSON.stringify(val),
					success: res => {
						// this.topage('market/order/order_detail')
						uni.navigateTo({
							url: '/pages/market/order/order_detail',
							events: {
								unpaid: res => {
									console.log(res)

									for (let val of this.dataList) {
										if (val.order_sn == res) {
											val.status = 1
										}
									}


								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderList {
		.tabs {
			position: sticky;
			top: 0;
			/* #ifdef H5 */
			top: var(--window-top);
			/* #endif */
			z-index: 10;
			background-color: #fff;
		}

		.list {
			padding: 24rpx 32rpx;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);

			.order_item {
				padding: 24rpx;
				border-radius: 24rpx;
				background-color: #fff;
				margin-bottom: 24rpx;

				.order-t {
					padding-bottom: 24rpx;

					.t1 {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #1a1a1a;
					}

					.t2 {
						font-size: 28rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: var(--theme);
					}
				}

				.order-info {
					display: flex;

					.order-img {
						width: 152rpx;
					}

					.order-details {
						padding-left: 12rpx;
						flex: 1;
						width: 0;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.goods-title {
							font-size: 28rpx;
							font-weight: bold;
							// overflow: hidden;
							// text-overflow: ellipsis;
							// white-space: nowrap;
						}

						.order-no {
							// margin: 8rpx 0rpx 24rpx 0rpx;
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #1a1a1a;
						}

						.order-time {
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}

					.order-num {
						width: 60rpx;
						font-size: 30rpx;
						text-align: center;
					}
				}

				.price-box {
					margin-top: 12rpx;

					.price {
						display: flex;
						font-size: 28rpx;
						font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: bold;
						color: #000000;
					}
				}

				.f-box {
					padding-top: 12rpx;

					.count-dowm {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.f-btn {
						display: flex;

						.btn-pay {
							width: 144rpx;
							height: 60rpx;
							background: var(--linear-gradient-theme);
							border-radius: 48rpx;
							color: #ffffff;
							font-size: 28rpx;
							margin-left: 16rpx;
						}

						.btn-cancel {
							width: 144rpx;
							height: 60rpx;
							border: 2rpx solid #999999;
							border-radius: 48rpx;
							color: #999999;
							font-size: 28rpx;
						}
					}
				}
			}

		}
	}
</style>