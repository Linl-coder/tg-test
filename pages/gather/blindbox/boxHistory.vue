<template>
	<view class="markethistory">
		<view class="order-box" v-if="item.goods" v-for="(item, index) in list" :key="index">
			<view class="order-t flex-between">
				<text class="t1">{{item.box.title}}</text>
				<text class="t2">已开启</text>
			</view>
			<view class="order-c flex-between" >
				<view class="icon-box"><u--image :showLoading="true" :src="item.goods.picture" width="152rpx"
						height="152rpx"></u--image></view>
				<view class="info">
					<view class="t-box flex-between">
						<view class="title">{{ item.goods.title }}</view>
						<view class="num">x{{ 1 }}</view>
					</view>
					<view class="order-no">已获得</view>
					<view class="time-box">开盒时间：{{ item.open_time }}</view>
				</view>
			</view>			
		</view>
		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	import { pages } from '@/common/mixins/index.js';
	export default{
		mixins:[pages],
		data(){
			return{
				list:[],
				loading:1,
				box_id:""
			}
		},
		onLoad(query) {
			this.box_id=query.box_id;
			this.collect_openBoxLog();
		},
		methods:{
			async collect_openBoxLog(){
				let res = await uni.ajax.collect_openBoxLog({
					page: this.page,
					limit: uni.conf.limit,
					box_id:this.box_id,
					open_type:1
				});
				if(res){
					this.setPagedata("","list",res.data.list,"collect_openBoxLog",false);
				}
			}
		}
	}
</script>

<style lang="scss">
	.markethistory{
		padding: 32rpx;
		.order-box {
			margin-bottom: 24rpx;
			padding: 24rpx;
			border-radius: 24rpx;
			background: #ffffff;
			box-shadow: 0rpx 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
		
			.f-box {
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
					height: 152rpx;
		
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