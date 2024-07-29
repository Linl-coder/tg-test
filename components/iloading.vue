<template>
	<view class="iloading " :style="{'background-color':bg_color}">
		<div class="flex-center" style="min-height: 100rpx;" v-if="result==1">
			<u-loading-icon text="" textSize="25"></u-loading-icon>
		</div>
		<div class="div flex-center" v-if="result==2&&desc" style="height: 100rpx;">
			<text class="desc">
				{{desc}}
			</text>
		</div>

		<view class="empty" v-if="result==3">
			<Empty v-if="type==2" :desc="$t('utils.noData')" icon="/static/else/nodata.png"></Empty>
		</view>

	</view>
</template>

<script>
	import Empty from "./emptyData.vue"
	export default {
		components: {
			Empty
		},
		/**
		 * result 
		 * 1 加载中
		 * 2 暂无更多数据
		 * 3 无数据
		 */
		props: {
			type: { //1暂无消息 2 暂无数据 3 网络不给力 4 页面找不到 5 暂无记录 6 开发中，敬请期待
				type: Number,
				default: 2
			},
			result: {
				type: Number,
				default: 1
			},
			bg_color: {
				type: String,
				default: ""
			},
			desc: {
				type: String,
				default: ' '
			}
		},
	}
</script>

<style lang="scss">
	.iloading {
		.desc {
			font-size: 30rpx;
			color: #999999;
			letter-spacing: 2rpx;
		}
	}
</style>