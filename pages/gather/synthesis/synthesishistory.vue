<template>
	<view class="synthesishistory">
		<view class="synthesis-list flex-start" v-for="(item,index) in 10" :key="index" @tap="topage('gather/synthesisdetails?id='+item.id)">
			<view class="icon-box">
				<image src="/static/market/i1.png" class="icon" mode=""></image>
			</view>
			<view class="info">
				<view class="t1">
					普通合成
				</view>
				<view class="time">
					合成时间：2023-02-28 11:52:10
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
	.synthesishistory{
		padding: 32rpx;
		.synthesis-list{
			margin-bottom: 24rpx;
			width: 100%;
			border-radius: 24rpx;
			box-shadow: 0px 2rpx 8rpx 0px rgba(0,0,0,0.04);
			background-color: #fff;
			padding: 16rpx;		
			box-sizing: border-box;
			position: relative;
			
			.icon-box{
				width: 160rpx;
				height: 160rpx;
				overflow: hidden;
				border-radius: 16rpx;
				.icon{
					width: 100%;
					height: 100%;
				}
			}
			.info{
				width: calc(100% - 160rpx);
				height: 160rpx;
				padding-left: 24rpx;
				box-sizing: border-box;
				.t1{
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					width: 80%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.time{
					margin-top: 16rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
				
				
			}
		}
	}
</style>