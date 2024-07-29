<template>
	<view class="order">
		<!-- {{info}}--info -->
		<view class="order-box" v-if="item.goods_list" v-for="item,index in info" :key="index" @tap="todetails(item)">
			<view class="order-t flex-between">
				<!-- <text class="t1">{{item.buy_type==1?'卡牌':'盲盒'}}</text> -->
				<text class="t2">{{ set_status(item.order_status) }}</text>
			</view>

			<view>
				<view class="order-c flex-between" v-for="(k,i) in item.goods_list" :key="i">
					<view class="icon-box">
						<u--image :showLoading="true" :src="handleImgUrl(k.img_url)" width="152rpx"
							height="152rpx"></u--image>
					</view>
					<view class="info">
						<view class="t-box flex-between">
							<view class="title">{{ k.goods_name }}</view>
							<view class="num">x{{ k.goods_number ||1}}</view>
						</view>
						<view class="order_content  flex-colum-evenly">
							<view class="order-no">{{$t('orderList.orderSn')}} {{ item.order_sn }}</view>
							<view class="order-no">{{$t('orderList.goodPrice')}} {{ k.goods_price }}</view>
							<view class="order-no">{{$t('orderList.goodNum')}} {{ k.goods_number }}</view>
							<view class="time-box">{{$t('orderList.orderTime')}} {{ item.create_time }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="order-c flex-between">
				<view class="icon-box">
					<u--image :showLoading="true" :src="item.goods.cover.show_src" width="152rpx"
						height="152rpx"></u--image>
						</view>
				<view class="info">
					<view class="t-box flex-between">
						<view class="title">{{ k.goods_name }}</view>
						<view class="num">x{{ k.goods_number ||1}}</view>
					</view>
					<view class="order-no" v-if="item.mark!=10">订单编号：{{ item.order_sn }}</view>
					<view class="order-no" v-if="item.mark==10">卡牌编号：#{{item.no}}/{{ item.goods_number }}</view>
					<view class="time-box">下单时间：{{ item.create_time }}</view>
				</view>
			</view> -->
			<view class="price-box flex-end">
				<view class="price">
					<text v-show="item.order_status==1">{{$t('orderList.needPay')}}</text>
					<text v-show="item.order_status==2">{{$t('orderList.actualPay')}}</text>
					<text v-show="item.order_status==3">{{$t('orderList.orderPrice')}}</text>
					<text style="font-size:24rpx;margin-right: 4rpx;color: red;"
						v-show="goods_price_type==='USD'">$</text>
					<u-icon name="/static/btn/gem-icon1.png" size='16'
						v-show="goods_price_type!=='USD'"></u-icon>{{ item.order_amount }}
				</view>
			</view>
			<view class="f-box flex-end" v-if="item.order_status == 1">
				<!-- <view class="time flex-start">
					剩余时间：
					<u-count-down @finish="time_end(index)" time="item.endtime" format="HH:mm:ss"></u-count-down>
				</view> -->
				<view class="f-btn ">
					<view class="btn-cancel flex-center" @tap.stop="cannel_order(item.id,index)">
						{{$t('orderList.cancelOrder')}}
					</view>
					<!-- <view class="btn-pay flex-center" @tap.stop="topay(item)">去支付</view> -->
				</view>
			</view>
		</view>

		<!-- <modal ref="modal" :content="$t('orderList.cancelOrder')" @confirm="cannel"></modal> -->
		<u-modal :show="showModal" :content="$t('orderList.confirmCacelOrder')" :showCancelButton='true'
			:cancelText="$t('utils.cancel')" :confirmText="$t('utils.confirm')" @cancel="closeModal"
			@confirm="cannel"></u-modal>
		<!-- {{info.length}} -->
		<u-empty v-show="!info.length" marginTop="40" :text="$t('utils.noData')" mode="order">
		</u-empty>
	</view>
</template>
<script>
	let now_time = new Date().getTime();
	import {
		orderlist
	} from './../list.js';
	export default {
		data() {
			return {
				goods_price_type: uni.getStorageSync('goods_price_type'),
				showModal: false,
				list: [],
				now_time: now_time,
				order_id: '',
				index: 0
			};
		},
		props: {
			info: {
				type: Array,
				default () {
					return {};
				}
			}
		},
		created() {
			this.list = orderlist.slice(this.info.begin, this.info.end);
		},
		methods: {
			closeModal() {
				this.showModal = false;
			},
			todetails(item) {
				if (item.status != 10) {
					this.topage('gather/order/orderdetails?order_id=' + item.id)
				}
			},
			set_status(status) {
				let str = '';
				switch (status) {
					case 1:
						str = this.$t('orderList.waitPay');
						break;
					case 2:
						str = this.$t('orderList.havePay');
						break;
					case 3:
						str = this.$t('orderList.haveCancel');
						break;
					case 10:
						str = '空投';
						break;
					default:
						break;
				}
				return str;
			},
			cannel_order(order_id, index) {
				this.order_id = order_id;
				this.index = index;
				//this.$refs.modal.open();
				this.showModal = true;
			},
			async cannel() {
				let res = await uni.ajax.handleCancelOrder({
					order_id: this.order_id
				});
				if (res) {

					this.$emit('reloadList', 'isReload');
					this.showModal = false;
					// // 在需要刷新页面的地方
					// uni.reLaunch({
					// 	url: '/pages/gather/order/orderListNew'
					// })
					// this.list[this.index].status = 3;
				}
			},
			// async cannel() {
			// 	let res = await uni.ajax.collect_orderCannel({
			// 		order_id: this.order_id
			// 	});
			// 	if (res) {
			// 		this.list[this.index].status = 3;
			// 	}
			// },
			topay(item) {
				let info = item;
				if (item.is_mark == 3) {
					info.title = item.goods[0].goods.title;
					info.img = item.goods[0].goods.cover;
					info.orderList = info.goods;
					info.goodsInfo = info.goods[0].goods;
				} else {
					info.title = item.goods.title;
					info.img = item.goods.cover;
					if (info.buy_type == 1) {
						info.goodsInfo = info.goods;
					}
				}

				uni.setStorage({
					key: 'collect_payinfo',
					data: info,
					success: () => {
						this.topage('gather/wallet/collectpay?buy_type=' + info.buy_type + '&is_mark=' + info
							.is_mark + "&number=" + item.num);
					}
				});
			},
			time_end(index) {
				// this.list[index].status = 3;
				// this.order_id = this.list[index].order_id;
				// this.cannel();
			}
		}
	};
</script>

<style lang="scss" scoped>
	/deep/ .u-modal__content {
		text-align: center;
	}

	.order {
		.order-box {
			margin-bottom: 24rpx;
			padding: 24rpx;
			padding-bottom: 40rpx;
			border-radius: 24rpx;
			background: #ffffff;
			box-shadow: 0rpx 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);

			.f-box {
				margin-top: 24rpx;

				.time {
					font-size: 24rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}

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
					// width: 144rpx;
					padding: 8rpx 15rpx;
					// height: 60rpx;
					border: 2rpx solid #999999;
					border-radius: 48rpx;
					color: #999999;
					font-weight: 520;
					font-size: 28rpx;
				}
			}

			.price-box {
				// margin-top: 60rpx;

				.price {
					font-size: 28rpx;
					//font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
				}
			}

			.order-c {
				height: 260rpx;
				margin-top: 24rpx;
				//background: red;

				.icon-box {
					// flex: 1;
					//background: blue;
				}

				.info {
					width: 500rpx;
					// flex: 2.5;
					// width: calc(100% - 152rpx);
					// padding-left: 16rpx;
					//box-sizing: border-box;
					//background: yellow;
					// height: 152rpx;

					.time-box {
						font-size: 24rpx;
						//font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.order-no {
						// margin: 8rpx 0rpx 24rpx 0rpx;
						font-size: 26rpx;
						//font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #1a1a1a;

					}

					.t-box {
						.title {
							width: calc(100% - 60rpx);
							font-size: 28rpx;
							font-weight: bold;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.num {
							width: 60rpx;
							font-size: 30rpx;
						}
					}

					.order_content {
						// font-size: 32rpx;
						height: 180rpx;
						//background: blue;
					}
				}

				.icon-box {
					width: 152rpx;
					height: 152rpx;
					overflow: hidden;
					border-radius: 12rpx;

					.icon {
						width: 100%;
						height: 100%;
					}
				}
			}

			.order-t {
				.t1 {
					font-size: 28rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #1a1a1a;
				}

				.t2 {
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #fe3333;
				}
			}
		}
	}
</style>