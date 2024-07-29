<template>
	<div class="collectOrderdetails">

		<view class="" v-if="loading==4">
			<view class="header flex-center">
				<div class="flex-colum">
					<u--image :showLoading="true" :src="set_status(info.order_status).icon" width="110rpx"
						height="110rpx" radius="6"></u--image>
					<view class="t1">
						<text>{{ set_status(info.order_status).desc }}</text>
					</view>
					<!-- <view class="t2 flex-center" v-if="info.status == 1">
						支付剩余时间
						<u-count-down @finish="time_end()" :time="info.end_time * 1000 - now_time" format="HH:mm:ss" autoStart millisecond @change="onChange">
							<view class="time">
								<view class="time__custom">
									<text class="time__custom__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
								</view>
								<text class="time__doc">:</text>
								<view class="time__custom">
									<text class="time__custom__item">{{ timeData.minutes }}</text>
								</view>
								<text class="time__doc">:</text>
								<view class="time__custom">
									<text class="time__custom__item">{{ timeData.seconds }}</text>
								</view>
							</view>
						</u-count-down>
					</view> -->
				</div>
			</view>
			<div class="content">
				<view>
					<div class="list flex-start" v-for="(item,index) in info.goods_list" :key="index">
						<u--image :showLoading="true" :src="handleImgUrl(item.img_url)" width="132rpx" height="132rpx"
							radius="6"></u--image>
						<div class="info flex-colum-start">
							<text class="t1">{{ item.goods_name }}</text>
							<view class="flex-start">
								<text class="t2">{{$t('orderDetails.goodNum')}}X</text>
								<text class="t3">{{ item.goods_number }}</text>
							</view>
						</div>
					</div>
				</view>
				<!-- <div class="list flex-start" v-else>
					<u--image :showLoading="true" :src="info.goods.cover.show_src" width="132rpx" height="132rpx" radius="6"></u--image>
					<div class="info flex-colum-start">
						<text class="t1">{{ info.goods.title }}</text>
						<view class="flex-start">
							<text class="t2">数量：X</text>
							<text class="t3">{{ info.num }}</text>
						</view>
					</div>
				</div> -->
				<view class="list-item-box">
					<view class="title flex-start">{{$t('orderDetails.orderDetails')}}</view>
					<div class="list_item flex-between">
						<text class="t1">{{$t('orderDetails.orderPrice')}}</text>
						<text class="t2"><text style="font-size:24rpx;margin-right: 4rpx;color: red;"
								v-show="goods_price_type==='USD'">$</text>
							<u-icon name="/static/btn/gem-icon1.png" size='16'
								v-show="goods_price_type!=='USD'"></u-icon>{{ info.order_amount }}</text>
					</div>
					<div class="list_item flex-between">
						<text class="t1">{{$t('orderDetails.UsingGemstones')}}</text>
						<text class="t2">{{ info.use_food_num }}</text>
					</div>
					<div class="list_item flex-between">
						<text class="t1">{{$t('orderDetails.DiscountAmount')}}</text>
						<text class="t2"><text style="font-size:24rpx;margin-right: 4rpx;color: red;"
								v-show="goods_price_type==='USD'">$</text>
							<u-icon name="/static/btn/gem-icon1.png" size='16'
								v-show="goods_price_type!=='USD'"></u-icon>{{ info.deduct_amount }}</text>
					</div>
					<div class="list_item flex-between">
						<text class="t1">{{$t('orderDetails.createTime')}}</text>
						<text class="t2">{{ info.create_time }}</text>
					</div>
					<div class="list_item flex-between">
						<text class="t1">{{$t('orderDetails.orderSn')}}</text>
						<text class="t2">{{ info.order_sn }}</text>
					</div>
					<!-- <div class="list_item flex-between" v-show="info.status == 2">
						<text class="t1">支付时间</text>
						<text class="t2">{{ info.pay_time }}</text>
					</div>
					<div class="list_item flex-between" v-if="info.status == 2">
						<text class="t1">支付方式</text>
						<text class="t2" v-if="info.pay_type=='balance'">余额支付</text>
						<text class="t2" v-if="info.pay_type=='yipay'">易宝支付</text>
					</div> -->
				</view>

				<!-- <view class="desx-box">
					<view class="desc">说明：</view>
					<view class="desc">1.账号下有待支付订单时，不允许继续购买其他卡牌。</view>
					<view class="desc">2.同一个账号一段时间内累计取消3次订单，将会被限购一段时间。</view>
				</view> -->
			</div>
			<view class="f-box flex-end" v-if="info.order_status<2">
				<view class="btn btn-cancel flex-center" @tap="cannel_order">{{$t('orderDetails.cancelOrder')}}</view>
				<!-- <view class="btn btn-pay flex-center" @tap="topay()">去支付</view> -->
			</view>
		</view>
		<iloading :result="loading"></iloading>
		<!-- <modal ref="modal" :content="'确认取消订单?'" @confirm="cannel"></modal> -->
		<u-modal :show="showModal" :content="$t('orderDetails.confirmCacelOrder')" :showCancelButton='true'
			:cancelText="$t('utils.cancel')" :confirmText="$t('utils.confirm')" @cancel="closeModal"
			@confirm="cannel"></u-modal>
	</div>
</template>

<script>
	let now_time = new Date().getTime();
	export default {
		data() {
			return {
				goods_price_type: uni.getStorageSync('goods_price_type'),
				showModal: false,
				info: {},
				order_id: '',
				timeData: {},
				now_time: now_time,
				loading: 1
			};
		},
		onLoad(query) {
			this.order_id = query.order_id;
			this.collect_orderDetail();
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('orderDetails.orderDetails')
			})
		},
		methods: {
			closeModal() {
				this.showModal = false;
			},
			set_status(status) {
				let str = '';
				let img = '';
				switch (status) {
					case 1:
						str = this.$t('orderDetails.waitPay');
						img = '/static/Gather/time.png';
						break;
					case 2:
						str = this.$t('orderList.havePay');
						img = '/static/Gather/success.png';
						break;
					case 3:
						str = this.$t('orderList.haveCancel');
						img = '/static/Gather/cannel.png';
						break;
					default:
						break;
				}
				return {
					desc: str,
					icon: img
				};
			},
			time_end() {
				this.info.status = 3;
				this.cannel();
			},
			cannel_order(order_id) {
				// this.$refs.modal.open();
				this.showModal = true;
			},
			async cannel() {
				let res = await uni.ajax.handleCancelOrder({
					order_id: this.info.id
				});
				if (res) {
					uni.navigateBack();
					// this.info.status = 3;
				}
			},
			// async cannel() {
			// 	let res = await uni.ajax.collect_orderCannel({
			// 		order_id: this.info.order_id
			// 	});
			// 	if (res) {
			// 		this.info.status = 3;
			// 	}
			// },
			onChange(e) {
				this.timeData = e;
			},
			topay() {
				if (this.info.is_mark == 3) {
					this.info.title = this.info.goods[0].goods.title;
					this.info.img = this.info.goods[0].goods.cover;
					this.info.orderList = this.info.goods;
					this.info.goodsInfo = this.info.goods[0].goods;
				} else {
					this.info.img = this.info.goods.cover;
					this.info.title = this.info.goods.title;
					if (this.info.buy_type == 1) {
						this.info.goodsInfo = this.info.goods;
					}
				}
				uni.setStorage({
					key: 'collect_payinfo',
					data: this.info,
					success: () => {
						this.topage('gather/wallet/collectpay?buy_type=' + this.info.buy_type + '&is_mark=' +
							this.info.is_mark + "&number=" + this.info.num);
					}
				});
			},
			async collect_orderDetail() {
				let res = await uni.ajax.getOrderDetails({
					order_id: this.order_id
				});

				if (res) {
					this.info = res.data;
					this.loading = 4;
				} else {
					this.loading = 3;
				}
			}
			// async collect_orderDetail() {
			// 	let res = await uni.ajax.collect_orderDetail({
			// 		order_id: this.order_id
			// 	});

			// 	if (res) {
			// 		this.info = res.data;		
			// 		this.loading=4;
			// 	}else{
			// 		this.loading=3;
			// 	}
			// }
		}
	};
</script>

<style lang="scss">
	/deep/ .u-modal__content {
		text-align: center;
	}

	.collectOrderdetails {
		padding-bottom: 170rpx;

		.f-box {
			position: fixed;
			width: 100%;
			padding: 32rpx;
			box-sizing: border-box;
			background-color: #ffffff;
			left: 0rpx;
			bottom: 0rpx;

			.btn {
				background: #ffffff;
				border-radius: 24rpx;
				opacity: 1;
			}

			.btn-cancel {
				width: 256rpx;
				height: 96rpx;
				border: 2rpx solid var(--theme);
				color: var(--theme);
			}

			.btn-pay {
				// background: url('@/static/else/old01.png') no-repeat 100%;
				background: var(--linear-gradient-theme);
				height: 96rpx;
				flex: 1;
				color: #ffffff;
				margin-left: 24rpx;
			}
		}

		.header {
			width: 100%;
			background-color: #ffffff;
			height: 350rpx;

			.icon {
				width: 132rpx;
				height: 132rpx;
			}

			.t1 {
				margin-top: 24rpx;
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
			}

			.t2 {
				margin-top: 32rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
		}

		.content {
			padding: 32rpx 20rpx 0rpx 20rpx;

			.desx-box {
				margin-top: 24rpx;

				.desc {
					text-align: justify;
					line-height: 26px;
					font-size: 22rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
				}
			}

			.list-item-box {
				background-color: #ffffff;
				padding: 24rpx 32rpx;
				border-radius: 32rpx;

				.title {
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
					margin-bottom: 24rpx;
				}

				.list_item {
					margin-bottom: 24rpx;

					.t1 {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
					}

					.t2 {
						font-size: 28rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #000000;
					}
				}
			}

			.list {
				margin-bottom: 24rpx;
				border-radius: 24rpx;
				width: 100%;
				height: 188rpx;
				background: #ffffff;
				padding: 24rpx;
				box-sizing: border-box;
				box-shadow: 0px 2rpx 24rpx 0px rgba(0, 0, 0, 0.04);

				.info {
					padding-left: 14rpx;
					height: 140rpx;
					width: calc(100% - 140rpx);
					box-sizing: border-box;
					justify-content: space-between;

					.t1 {
						font-size: 32rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: bold;
						color: #000000;
					}

					.t2 {
						font-size: 30rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
					}

					.t3 {
						font-size: 30rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #666666;
					}
				}

				.icon {
					width: 140rpx;
					height: 140rpx;
					border-radius: 14rpx;
				}
			}
		}
	}

	.time {
		@include flex;
		align-items: center;
		padding-left: 16rpx;

		&__custom {
			width: 22px;
			height: 22px;
			border: 2rpx solid #e5e5e5;
			background: #f5f5f5;
			border-radius: 4px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #fe3333;
				font-size: 12px;
				text-align: center;
			}
		}

		&__doc {
			color: $u-primary;
			padding: 0px 4px;
		}

		&__item {
			color: #606266;
			font-size: 15px;
			margin-right: 4px;
		}
	}
</style>