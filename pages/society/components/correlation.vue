<template>
	<view class="correlation-box">
		<view class="card">
			<view class="card_item flex-between">
				<view class="icon-box"><u--image :showLoading="true" :src="info.cover.show_src" width="168rpx" height="168rpx"></u--image></view>
				<view class="f-box">
					<view class="title flex-colum-start">
						<view class="tips">
							卡牌
						</view>
						<view class="t" style="margin-top: 24rpx;">
							{{info.title}}
						</view>
					</view>
					<!-- <view class="desc" >
						<text class="desc-text">编号#001413︱耳朵拾糖~持有</text>
						
					</view> -->
					<!-- <view class="price-box flex-between">
						<view class="tips-box flex-center">
							<view class="tips-left flex-center">流通</view>
							<view class="tips-right flex-center">{{ item.circulate }}</view>
						</view>
						<text class="price">￥{{ item.price }}</text>
					</view> -->
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			info:{
				type:Object,
				default(){
					return{}
				}
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.correlation-box{
		margin-top: 24rpx;
		.card {
			margin-top: 24rpx;
			.card_item {
				
				background: #F6F6F6;
				border-radius: 16rpx;
				box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);

				.icon-box {
					width: 168rpx;
					height: 168rpx;
					background: #d9d9d9;
					border-radius: 16rpx;
					overflow: hidden;
				}
		
				.f-box {
					flex: 1;
					padding-left: 16rpx;
		
					.price-box {
						.price {
							font-size: 40rpx;
							font-weight: bold;
						}
					}
		
					.title {
						
						.tips{
							padding: 0rpx 8rpx;
							margin-right: 8rpx;
							border-radius: 8rpx;
							background: #000;
							font-size: 28rpx;
							color: #FFBA34;
						}
						.t{
						   font-size: 30rpx;
						   color: #000000;
						   overflow: hidden;
						   text-overflow: ellipsis;
						   white-space: nowrap;
						}
					}
		
					.tips-box {
						.tips-left {
							width: 72rpx;
							height: 48rpx;
							background: #000000;
							font-size: 24rpx;
							color: #ffffff;
							border-radius: 8rpx 0rpx 0rpx 8rpx;
						}
		
						.tips-right {
							height: 48rpx;
							min-width: 100rpx;
							box-sizing: border-box;
							padding: 0rpx 8rpx;
							border: 1rpx solid #000;
							font-size: 24rpx;
							border-radius: 0rpx 8rpx 8rpx 0rpx;
						}
					}
		
					.desc {
						margin: 16rpx 0rpx;
						white-space: pre-wrap;
		
						.desc-text {
							font-size: 28rpx;
							color: #666666;
							font-weight: 500;
							margin-right: 24rpx;
						}
		
						.desc-author {
							padding: 4rpx 12rpx;
							border-radius: 4rpx;
							font-size: 22rpx;
							background: rgba(7, 235, 254, 0.15);
						}
					}
				}
			}
		}
	}
</style>