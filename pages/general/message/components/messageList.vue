<template>
	<view class="">
		<view class="c_list" v-for="(item,index) in list" :key="index" @tap="topage('general/message/details?id='+item.id+'&type='+type)">
			<view class="c_a" v-if="type==1">
				<u--image mode="aspectFill" :showLoading="true" width="246rpx" height="176rpx" :src="item.file ? item.file.show_src:''"></u--image>
			</view>
			<view class="c_a" v-if="type==2">
				<u--image mode="aspectFill" :showLoading="true" width="246rpx" height="176rpx" :src="item.picture"></u--image>
			</view>
			<view class="c_r">
				<view class="c_r_a u-line-2">{{item.title}}</view>
				<view class="c_r_b">
					<view v-if="item.cateInfo">{{item.cateInfo.name}}</view>
					<view>{{item.start_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			type:{
				type:Number,
				default:1
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.c_list{
		padding: 24rpx;
		background: #Fff;
		border-radius: 24rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 24rpx;
		.c_a{
			width: 246rpx;
			height: 176rpx;
			border-radius: 16rpx;
			image{
				width: 100%;
				height:100%;
				border-radius: 16rpx;
			}
		}
		.c_r{
			flex: 1;
			padding-left: 24rpx;
			height: 176rpx;
			display: flex;
			flex-direction:column;
			justify-content: space-between;
			.c_r_a{
				font-size: 28rpx;
				font-weight: 500;
				color: #000000;
				line-height: 33rpx;
			}
			.c_r_b{
				display: flex;
				align-items: center;
				justify-content: space-between;
				view:nth-child(1){
					background: #6085FC;
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					padding: 8rpx 12rpx;
					font-weight: 400;
					color: #FFFFFF;
					font-size: 22rpx;
				}
				view:nth-child(2){
					font-size: 22rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
				}
			}
		}
	}
	.list-box {
		padding: 24rpx;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 24rpx;
		box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
		margin-bottom: 24rpx;

		.f-box {
			margin-top: 24rpx;
			border-top: 2rpx solid #F0F0F0;
			;
			padding-top: 24rpx;

			.time {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}

		}

		.top-box {
			width: 100%;

			.info-box {
				height: 154rpx;
				width: calc(100% - 240rpx);

				.title {
					font-size: 32rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					// margin: 24rpx 0rpx 12rpx 0rpx;
				}

				.desc {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.tips {
					.t {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
					}
					.t1 {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #000;
					}

					.dot {
						width: 16rpx;
						height: 16rpx;
						background: #FE3333;
						border-radius: 100%;
						margin-left: 10rpx;
					}
				}
			}

			.icon-box {
				width: 240rpx;
				height: 154rpx;

				.icon {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
