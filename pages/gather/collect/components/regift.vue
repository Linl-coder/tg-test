<template>
	<view class="order">
		<view class="order-box"  v-for="(item, index) in list" :key="index" >
			<view class="order-t flex-between" v-if="current==0">
				<text class="t1">{{item.to_uuid==user_info.id?'转入':'转出'}}卡牌</text>			
			</view>
			<view class="order-t flex-between" v-if="current==1">
				<text class="t1">{{item.to_uuid==user_info.id?'转入':'转出'}}盲盒</text>			
			</view>
			<view class="order-t flex-between" v-if="current==2">
				<text class="t1">{{set_status(item.status)}}</text>			
			</view>
			
			<view class="order-c flex-between" v-if="current==1||current==0">
				<view class="icon-box"><u--image :showLoading="true" :src="item.goods.cover.show_src" width="152rpx" height="152rpx"></u--image></view>
				<view class="info">
					<view class="t-box flex-between">
						<view class="title">{{ item.goods.title }}</view>
						<view class="num">x1</view>
					</view>
					
					<view class="order-no">接收人：{{ item.getUser.nickname}}</view>
					<view class="time-box">创建时间：{{ item.add_time }}</view>
				</view>
			</view>
			<view class="order-c flex-between" v-if="current==2">
				<view class="icon-box"><u--image :showLoading="true" :src="item.pool.cover.show_src" width="152rpx" height="152rpx"></u--image></view>
				<view class="info">
					<view class="t-box flex-between">
						<view class="title">{{ item.pool.title }}</view>
						<view class="num">x1</view>
					</view>
					<view class="order-no" v-if="item.buy_type==1">卡牌编号：#{{item.no}}/{{ item.pool.num}}</view>
					<view class="order-no">寄售价格：&yen;{{ item.price}}</view>
					<view class="time-box">创建时间：{{ item.add_time }}</view>
				</view>
				<view class="f-box flex-end" v-if="item.status==1">
					<view class="btn-pay flex-center" @tap="mark_undo(item.id,index)">
						取消寄售
					</view>
				</view>
			</view>
			<view class="order-c flex-between" v-if="current==3">
				<view class="icon-box"><u--image :showLoading="true" :src="item.synInfo.goods.cover.show_src" width="152rpx" height="152rpx"></u--image></view>
				<view class="info">
					<view class="t-box flex-between">
						<view class="title">{{ item.synInfo.goods.title }}</view>
						<view class="num">x1</view>
					</view>
					
					<view class="order-no">合成结果:成功</view>
					<view class="time-box">创建时间：{{ item.add_time }}</view>
				</view>
			</view>
				
		</view>

		
	</view>
</template>
<script>

import { orderlist } from './../list.js';
export default {
	data() {
		return {
			list: [],
			order_id: '',
			index:0
		};
	},
	props: {
		info: {
			type: Object,
			default() {
				return {};
			}
		},
		current:{
			type:Number,
			default:0
		}
	},
	created() {
		this.list = orderlist.slice(this.info.begin, this.info.end);
	},
	computed: {
		user_info() {
			return this.$store.getters.get_user_info;
		},
		is_login() {
			return this.$store.getters.is_login;
		}
	},
	methods: {
		set_status(status) {
			let str = '';
			switch (status) {
				case 1:
					str = '寄售中';
					break;
				case 2:
					str = '已完成';
					break;
				case 3:
					str = '付款中';
					break;
				case 4:
					str = '已取消';
					break;
				default:
					break;
			}
			
			return str;
		},
		async mark_undo(id,index) {
			let res = await uni.ajax.collect_cannel({
				id: id
			});
			if (res) {
				uni.showToast({
					title: '操作成功',
					icon: 'none'
				});
				this.list[index].status=4;
			}
		},
		
	}
};
</script>

<style lang="scss" scoped>
.order {
	.order-box {
		margin-bottom: 24rpx;
		padding: 24rpx;
		border-radius: 24rpx;
		background: #ffffff;
		box-shadow: 0rpx 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
		.f-box {
			width: 100%;
			margin-top: 24rpx;
			.time {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}
			.btn-pay {
				width: 144rpx;
				height: 60rpx;
				background: #000000;
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
		.price-box {
			.price {
				font-size: 28rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
			}
		}
		.order-c {
			margin-top: 24rpx;
			.info {
				width: calc(100% - 152rpx);
				padding-left: 16rpx;
				box-sizing: border-box;
				min-height: 152rpx;
				.time-box {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
				.order-no {
					margin: 8rpx 0rpx 24rpx 0rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
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
				font-family: PingFang SC-Regular, PingFang SC;
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
