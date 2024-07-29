<template>
	<view class="collect-list" :id="'collect-list' + current">
		<view
			v-if="show"
			v-for="(item, index) in list"
			:key="index"
			class="list-one"
			@tap="topage('gather/collect/drawdeatils?id=' + item.id)"
			:class="{ 'list-one-active': current == 0 &&index==0}"
		>
			<view class="icon-box">
				<view class="collect-img" :style="{'height':item.cover.imgheight}">
					<u--image :showLoading="true" :src="item.cover.show_src" width="100%" :height="item.cover.imgheight" ></u--image>
					<!-- 已结束 -->
					<view class="mask flex-center" v-if="item.is_time==3" >
						<image src="/static/Gather/i2.png" class="mask-icon" mode=""></image>
					</view>
				</view>
				<!-- 卡牌标识 -->
				<view class="icon-tips flex-start">
					<template v-if="item.is_time==2&&item.stock>0">
						<image src="/static/else/hot.png" class="icon" mode=""></image>
						<text class="t1" >发售中</text>
					</template>
					<template v-if="item.is_time==2&&item.stock<=0">
						<image src="/static/end2.png" class="icon" mode=""></image>
						<text class="t1" >已售罄</text>
					</template>
					<template v-if="item.is_time==3">
						<image src="/static/end2.png" class="icon" mode=""></image>
						<text class="t1" >已售罄</text>
					</template>
<!-- 					<image src="/static/end.png" class="icon" mode=""></image>
					<text class="t1" v-if="item.is_time==2&&item.stock>0">开售</text>
					<text class="t1" v-if="item.is_time==2&&item.stock<=0">已售罄</text>
					<text class="t1" v-if="item.is_time==3">已结束</text> -->
					
					<view class="time flex-start"  v-if="item.is_time==1">
						<text class="t1">待发售:</text>
						<u-count-down  @finish="time_end(index)"  :time="item.timestamp" format="HH:mm:ss"></u-count-down>
					</view>
				</view>
			</view>
			<view class="f-box">
				<view class="title">{{ item.title }}</view>
				<view class="f_b">
					<view>限量</view>
					<view>{{ item.num }}份</view>
				</view>
				<view class="f_c">
					<view class="f_c_a" v-if="item.author">
						<view></view>
						<view>{{ item.author.nickname }}</view>
					</view>
					<view class="f_c_b">￥{{ item.price }}</view>
				</view>
			<!-- 	<view class="desc" v-if="item.author">
					<text class="desc-text">{{ item.author.nickname }}</text>
					<text class="desc-author">创作者</text>
				</view>
				<view class="desc" v-else>
					<text class="desc-text">暂无创作者</text>
					<text class="desc-author">创作者</text>
				</view>
				<view class="price-box flex-between">
					<view class="tips-box flex-center">
						<view class="tips-left flex-center">限量</view>
						<view class="tips-right flex-center">{{ item.num }}</view>
					</view>
					<text class="price" v-if="item.price>0">￥{{ item.price }}</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import { drawdata_list } from '@/pages/gather/list.js';
export default {
	props: {
		current: {
			type: Number,
			default: 0
		},
		info: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			show: false,
			list: []
		};
	},
	created() {
		this.list = drawdata_list.slice(this.info.begin, this.info.end);		
	},
	async mounted() {
		let img_info = await uni.utils.info_distance('collect-list' + this.current);
		this.list.forEach((item, index) => {
			item.cover.imgheight = img_info.width * 0.94+"px";
			// item.cover.imgheight = uni.utils.set_imgh(item.cover.width, item.cover.height, img_info.width * 0.94) + 'px';
			if (this.list.length - 1 == index) {
				this.$nextTick(() => {
					this.show = true;
				});
			}
		});
	},
	methods:{
		time_end(index){
			this.list[index].is_time=2;
		},
	}
};
</script>

<style lang="scss" scoped>
	.f_c{
		margin-top: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.f_c_a{
			display: flex;
			align-items: center;
			view{
				font-size: 22rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				&:nth-child(2){
					margin-left: 6rpx;
				}
			}
		}
		.f_c_b{
			font-size: 40rpx;
			font-family: Tahoma-Bold, Tahoma;
			font-weight: bold;
			color: #000000;
		}
	}
	.f_b{
		margin-top: 16rpx;
		display:flex;
		align-items: center;
		view:nth-child(1){
			padding: 4rpx 14rpx;
			background: #1777FF;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-size: 22rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #ffffff;
		}
		view:nth-child(2){
			padding: 4rpx 14rpx;
			background: #EBF3FF;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-size: 22rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #1777FF;
			margin-left: 8rpx;
		}
	}
.collect-list {
	width: 100%;
	.list-one {
		background-color: #ffffff;
		// padding: 3%;
		box-sizing: border-box;
		width: 100%;
		border-radius: 24rpx;
		box-shadow: 0px 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.04);
		overflow: hidden;
		margin-bottom: 24rpx;
		.f-box {
			// padding-top: 12rpx;
			padding: 24rpx 32rpx;
			.price-box {
				.price {
					font-size: 40rpx;
					font-weight: bold;
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
			.title {
				// margin-top: 12rpx;
				font-size: 36rpx;
				font-weight: bold;
				color: #000000;
			}
			.desc {
				margin: 16rpx 0rpx;
				white-space: pre-wrap;
				.desc-text {
					font-size: 28rpx;
					color: #000000;
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
		.icon-box {
			box-sizing: border-box;
			width: 100%;
			position: relative;
			.collect-img {
				border-radius: 24rpx;
				width: 100%;
				overflow: hidden;
				position: relative;
				-webkit-backface-visibility: hidden;
				-webkit-transform: translate3d(0, 0, 0);
				.mask{
					position: absolute;
					left: 0rpx;
					top: 0rpx;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.4);
					.mask-icon{
						width: 300rpx;
						height: 300rpx;
					}
				}
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
					margin-right: 16rpx;
				}
				.t1 {	
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 28rpx;
					color:#fff;
				}
				.time{
					
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
	.list-one-active {
		border-radius: 0rpx 24rpx 24rpx 24rpx;
	}
}
</style>
