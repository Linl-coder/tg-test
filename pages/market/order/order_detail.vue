<template>
	<div class="collectOrderdetails">

		<view class="" v-if="loading==4">
			<view class="header flex-center">
				<div class="flex-colum">
					<u--image :showLoading="true" :src="set_status(info.status).icon" width="110rpx" height="110rpx"
						radius="6"></u--image>
					<view class="t1">
						<text>{{ set_status(info.status).desc }}</text>
					</view>
					<view class="t2 flex-center" v-if="info.status == 0 ">
						支付剩余时间
						<u-count-down @finish="time_end()" :time="info.end_time * 1000 - now_time" format="HH:mm:ss"
							autoStart millisecond @change="onChange">
							<view class="time">
								<view class="time__custom">
									<text
										class="time__custom__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
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
					</view>
				</div>
			</view>
			<div class="content">

				<div class="list flex-start">
					<u--image :showLoading="true" :src="info.product?info.product.picture:''" width="132rpx" height="132rpx"
						radius="6"></u--image>
					<div class="info flex-colum-start">
						<text class="t1 u-line-2">{{info.product? info.product.title:'--' }}</text>
						<view class="flex-start">
							<text class="t2">数量：X</text>
							<text class="t3">{{ info.total_num }}</text>
						</view>
					</div>
				</div>
				<view class="list-item-box">
					<view class="title flex-start">订单详情</view>
					<div class="list_item flex-between">
						<text class="t1">订单金额</text>
						<view class="flex-start">
							<text class="connect" v-if="info.pay_price*1">￥</text>
							<text class="price" v-if="info.pay_price*1">{{info.pay_price}}</text>
							<text class="connect" v-if="info.integral*1 && info.pay_price*1">+</text>
							<text class="integral" v-if="info.integral*1"><text
									style="font-size: 32rpx;">{{info.integral}}</text>积分</text>
						</view>
					</div>
					<div class="list_item flex-between">
						<text class="t1">创建时间</text>
						<text class="t2">{{ info.add_time }}</text>
					</div>
					<div class="list_item flex-between">
						<text class="t1">订单编号</text>
						<text class="t2">{{ info.order_sn }}</text>
					</div>
					<div class="list_item flex-between" v-if="info.status != 0">
						<text class="t1">支付时间</text>
						<text class="t2">{{ info.pay_time }}</text>
					</div>
					<!-- <div class="list_item flex-between" v-if="info.status == 2">
						<text class="t1">支付方式</text>
						<text class="t2" v-if="info.pay_type=='balance'">余额支付</text>
						<text class="t2" v-if="info.pay_type=='yipay'">易宝支付</text>
					</div> -->
				</view>

			</div>
			<view class="f-box flex-between" v-if="[0,2].includes(info.status)">
				<view class="btn btn-cancel flex-center" v-if="info.status == 0" @tap="cannel_order">取消订单</view>
				<view class="btn btn-pay flex-center" v-if="info.status == 0" @tap="$u.debounce(topay,500)">去支付</view>
				<view class="btn btn-pay flex-center" style="margin-left: 0;" v-if="info.status == 2" @tap="setFinish()">确定收货</view>
			</view>
		</view>
		
		<!-- 支付方式 -->
		<view class="pay-box" v-if="info.status == 0">
			<view class="title">选择支付方式</view>
			<u-radio-group iconPlacement="right" placement="colum" active-color="var(--theme)" v-model="paytype" >
				<view class="pay-conetnt flex-between" v-for="(item, index) in payList" :key="index">
					<view class="flex-start">
						<image v-if="item.cover" :src="item.cover.show_src" class="icon" mode=""></image>
						<text class="t1">{{ item.name }}</text>
						<text class="t2">{{ item.desc }}</text>
					</view>
					<u-radio :name="item.type" @change="radioChange"></u-radio>
				</view>
			</u-radio-group>
		</view>

		<iloading :result="loading"></iloading>

		<modal ref="modal" :content="'确认取消订单?'" @confirm="cannel"></modal>
		
		<!-- 支付键盘 -->
		<Keyboard_ ref="Keyboard" @confirm="buy" ></Keyboard_>
	</div>
</template>

<script>
	let now_time = new Date().getTime();
	import Keyboard_ from '@/components/Keyboard/Keyboard.vue';
	export default {
		components:{
			Keyboard_
		},
		data() {
			return {
				info: {},
				order_id: '',
				timeData: {},
				now_time: now_time,
				loading: 1,
				paytype:'',
				payList: [],
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'order_detail',
				success: res => {
					this.info = JSON.parse(res.data)
					this.loading = 4;
				},
				fail: err => {
					this.loading = 3
				}
			})
			this.payList = uni.getStorageSync("payList");
			if (this.payList.length > 0) {
				this.paytype = this.payList[0].type;
			}
		},
		methods: {
			set_status(status) {
				let str = '';
				let img = '';
				switch (status) {
					case 0:
						str = '待支付';
						img = '/static/Gather/time.png';
						break;
					case 4:
						str = '已完成';
						img = '/static/Gather/success.png';
						break;
					case 5:
						str = '已取消';
						img = '/static/Gather/cannel.png';
						break;
					case 1:
						str = '待发货';
						img = '/static/Gather/time.png';
						break;
					case 2:
						str = '待收货';
						img = '/static/Gather/time.png';
						break;

					default:
						break;
				}
				return {
					desc: str,
					icon: img
				};
			},

// 收货
			setFinish() {
				uni.showModal({
					title:"提示",
					content:"确认是否收货？",
					success:async res=>{
						if(res.confirm){
							let result = await uni.ajax.shop_setFinish({id:this.info.id});
							if(result){
								this.info.status = 4
							}
						}
					}
				})
			},
			time_end() {
				// this.info.status = 3;
				this.cannel();
			},
			cannel_order(order_id) {
				this.$refs.modal.open();
			},
			async cannel() {
				let result = await uni.ajax.shop_setCancel({
					id:this.info.id
				})
				console.log(result)
				if(result){
					this.info.status = 5
				}
			},
			onChange(e) {
				this.timeData = e;
			},
			topay() {
				console.log('哈哈')
				if (this.paytype == 'balance') {
					this.$refs.Keyboard.open();
				} else {
					this.buy();
				}
			},
			async collect_orderDetail() {
				let res = await uni.ajax.collect_orderDetail({
					order_id: this.order_id
				});

				if (res) {
					this.info = res.data;
					this.loading = 4;
				} else {
					this.loading = 3;
				}
			},
			// 支付
			async buy(pwd){
				uni.showLoading({
					title:'获取支付中'
				})
				let res = await uni.ajax.shop_addPayment({
					type:this.paytype,
					password:pwd || ''
				})
				
				if(res){
					switch(this.paytype){
						case 'balance':
							// this.toredirect('shopping/order/list?current=2')
							let eventChannel = this.getOpenerEventChannel();
							eventChannel.emit('unpaid',this.info.order_sn)
							uni.navigateBack()
						break;
						case 'fuyou':
						uni.$u.toast('待接入')
						break;
						default:
						uni.hideLoading();
						break;
					}
				}else{
					// this.$refs.Keyboard.cancel()
				}
			}
		}
	};
</script>

<style lang="scss">
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
			z-index: 10;

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
			padding: 32rpx 32rpx 0rpx 32rpx;

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
	.pay-box {
		background: #fff;
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		width: 686rpx;
		border-radius: 24rpx;
		margin: 24rpx 32rpx 0;
	
		.pay-conetnt {
			height: 100rpx;
	
			.icon {
				width: 56rpx;
				height: 56rpx;
				margin-right: 16rpx;
			}
	
			.t1 {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
	
			.t2 {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
			}
		}
	
		.title {
			font-size: 32rpx;
			//font-family: font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: bold;
			color: #000000;
			margin-bottom: 24rpx;
		}
	}
</style>