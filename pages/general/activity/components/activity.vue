<template>
	<view class="activity" id="activity">
		<view class="list-box" v-for="(item, index) in list" :key="index" @tap="to_details(item)">
			<view class="icon-box"   :style="{'height':setimgh(item.cover.width, item.cover.height)}">
				<u--image :showLoading="true" :src="item.cover.show_src" width="100%" :height="setimgh(item.cover.width, item.cover.height)"></u--image>
				<!-- 活动标识 -->
				<view class="icon-tips flex-start">
					<image src="/static/Gather/i1.png" class="icon" mode="widthFix"></image>
					<text class="t1" v-if="item.is_time==2">进行中</text>
					<text class="t1" v-if="item.is_time==3">已结束</text>
					<view class="time">
						<u-count-down  v-if="item.is_time==1" @finish="time_end(index)"  :time="item.timestamp" format="HH:mm:ss"></u-count-down>
					</view>				
				</view>
			</view>
			<view class="f-box">
				<view class="title">{{ item.title }}</view>
				<view class="desc">活动时间</view>
				<view class="time-box flex-between">
					<text class="time">{{ item.start_time }} — {{ item.end_time }}</text>
					<view class="flex-end">
						<text class="t1">查看</text>
						<u-icon name="arrow-right" size="20"></u-icon>
					</view>
				</view>
			</view>
			
			<!-- <view  v-if="item.active_type==5">
				<view class="vote-b">
					<vote :list="item.vote"></vote>
				</view>
				<view class="f-box">
					<view class="title">{{ item.title }}</view>
					<view class="desc">投票时间</view>
					<view class="time-box flex-between">
						<text class="time">{{ item.start_time }} — {{ item.end_time }}</text>		
					</view>
				</view>
			</view> -->
			
		</view>
	</view>
</template>

<script>
let img_info = null;
import vote from '@/pages/society/components/vote.vue'
export default {
	components:{
		vote
	},
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {};
	},
	async mounted() {
		img_info = await uni.utils.info_distance('activity');
	},
	methods: {
		time_end(index){
			this.list[index].is_time=2;
		},
		setimgh(width, height) {
			return uni.utils.set_imgh(width, height, img_info.width) + 'px';
		},
		to_details(item) {
			switch (item.active_type) {
				case 1: //合成
					this.topage('gather/synthesis/synthesisdetails?id=' + item.id+'&with_id='+item.with_id+"&start_time="+item.start_time+"&end_time="+item.end_time);
					break;
				case 2: //抽奖
					this.topage('general/Luckydraw/catch?id=' + item.id+'&with_id='+item.with_id);
					break;
				case 3: //兑换
				    this.topage('market/exchangeshop/index?id=' + item.id+'&with_id='+item.with_id+"&start_time="+item.start_time+"&end_time="+item.end_time);
					break;
				case 4: //普通活动
					this.topage('general/activity/details?id=' + item.id+'&with_id='+item.with_id);
					break;
				case 5: //投票
					this.topage('general/activity/voteDetails?id=' + item.id+'&with_id='+item.with_id);
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.activity {
	.list-box {
		margin-bottom: 24rpx;
		width: 100%;
		background-color: #ffffff;
		border-radius: 32rpx;
		overflow: hidden;
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		.vote-b{
			padding: 0rpx 32rpx;
			width: 100%;
			box-sizing: border-box;
		}
		.f-box {
			padding: 24rpx 32rpx;
			width: 100%;
			box-sizing: border-box;
			.title {
				font-size: 32rpx;
				font-weight: bold;
			}
			.desc {
				margin-top: 16rpx;
				font-size: 28rpx;
			}
			.time-box {
				.time {
					font-size: 24rpx;
				}
				.t1 {
					font-size: 26rpx;
				}
			}
		}
		.icon-box {
			width: 100%;
			position: relative;
			.icon {
				width: 100%;
			}
			.icon-tips {
				position: absolute;
				left: 0rpx;
				top: 0rpx;
				background: rgba(0, 0, 0, 0.5);
				padding: 16rpx 24rpx;
				border-radius: 24rpx 0rpx 24rpx 0rpx;
				.icon {
					width: 32rpx;
					height: 32rpx;
				}
				.t1 {
					padding-left: 16rpx;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 28rpx;
					background: linear-gradient(180deg, #07ebfe 0%, #4daffe 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
				.time{
					padding-left: 16rpx;
					/deep/.u-count-down__text{
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						line-height: 28rpx;
						background: linear-gradient(180deg, #07ebfe 0%, #4daffe 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}
		}
	}
}
</style>
