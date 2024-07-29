<template>
	<view class="synthesis-box">
		<view class="synthesis-list flex-start" v-for="(item,index) in list" :key="index" @tap="to_deatils(item)">
			<view class="icon-box">
				<image :src="item.cover.show_src" class="icon" mode=""></image>
			</view>
			<view class="info">
				<view class="t1">
					{{item.title}}
				</view>
				<view class="time">
					活动时间：{{item.start_time}} - {{item.end_time}}
				</view>
				<view class="flex-end btn-box" style="margin-top: 12rpx;">
					<view class="btn flex-center " :class="{'btn_gray':item.status==3}">
						<text v-if="item.status==1">立即参与</text>
						<text v-if="item.status==2">未开始</text>
						<text v-if="item.status==3">已结束</text>
					</view>
				</view>
			</view>
			<!-- <view class="tips">
				{{set_status(item.goodFuseStatus)}}
			</view> -->
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
			}
		},
		data() {
			return {

			}
		},

		methods: {
			to_deatils(item){
				if(item.status!=3){
					this.topage('gather/synthesis/synthesisdetails?id='+item.id+'&with_id='+item.with_id)
				}								
			},
			set_status(status) {
				let str = "";
				switch (status) {
					case 0:
						str = "未开始";
						break;
					case 1:
						str = "进行中";
						break;
					case 2:
						str = "已过期";
						break;
					case 3:
						str = "下线";
						break;
					case 4:
						str = "已售罄";
						break;
					default:
						break;
				}
				return str;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.synthesis-box {
		margin-top: 32rpx;
		
		width: 100%;
		
		box-sizing: border-box;
		border-radius: 32rpx;
		box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);

		.title {
			height: 88rpx;
			font-size: 32rpx;
			font-family: "YouSheBiaoTiHei-2";
			position: relative;
		}

		.title::after {
			content: "";
			background: linear-gradient(90deg, #0092F5 0%, rgba(217, 217, 217, 0) 100%);
			height: 16rpx;
			width: 50rpx;
			position: absolute;
			bottom: 25rpx;
		}

		.synthesis-list {
			padding: 24rpx 22rpx 24rpx 22rpx;
			margin-bottom: 24rpx;
			width: 100%;
			border-radius: 24rpx;
			// border: 2rpx solid #E6E6E6;
			// padding: 16rpx;
			box-sizing: border-box;
			position: relative;
			background: #FFFFFF;
			.tips {
				position: absolute;
				background: #D9D9D9;
				border-radius: 0px 24rpx 0px 24rpx;
				right: 0rpx;
				top: 0rpx;
				color: #000000;
				padding: 8rpx 16rpx;
				font-size: 26rpx;
			}

			.icon-box {
				width: 160rpx;
				height: 160rpx;
				overflow: hidden;
				border-radius: 16rpx;

				.icon {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				width: calc(100% - 160rpx);
				// height: 160rpx;
				padding-left: 24rpx;
				box-sizing: border-box;

				.t1 {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					width: 80%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.time {
					margin-top: 12rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}

				.btn-box {
					.btn {
						width: 148rpx;
						height: 52rpx;
						// background: #73BCFF;
						background: url("@/static/else/old01.png") no-repeat;
						background-size:100% ;
						border-radius: 48rpx;
						color: #FFFFFF;
						font-size: 24rpx;
					}
					.btn_gray{
						background: #cccccc;
					}
				}

			}
		}

		.synthesis-list:last-child {
			margin-bottom: 0rpx;
		}
	}
</style>
