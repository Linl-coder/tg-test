<template>
	<view class="record">

		<view class="header flex-start">
			<view style="flex:2.5">赠送对象</view>
			<view style="flex:">赠送时间</view>
			<view style="flex:5">赠送卡牌</view>
		</view>

		<view class="record_item flex-start" v-for="item in dataList" :key="item.id">
			<view class="flex-start" style="flex: 2.5;">
				<!-- <u-avatar :src="item.userInfo.show_src" size="68rpx"></u-avatar> -->
				<view class="name">{{item.mobile | cut_out}}</view>
			</view>
			<view class="time">
				{{new Date(item.create_time).valueOf() | date('mm-dd hh:MM')}}
			</view>
			<view style="flex: 5;font-size: 24rpx;" class="flex-end">
				<!-- <u-icon :name="item.poolInfo."></u-icon> -->
				{{item.title}} X{{item.num}}
			</view>
		</view>

		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	import {
		pages
	} from "@/common/mixins/index.js";
	export default {
		mixins: [pages],
		data() {
			return {
				guild_id: '',
				loading: 1,
				dataList: []
			}
		},
		onLoad(option) {
			this.guild_id = option.guild_id;
			this.shop_givGroupRecord()
		},
		methods: {
			async shop_givGroupRecord() {
				let result = await uni.ajax.shop_givGroupRecord({
					limit: 20,
					page: this.page
				})
				console.log(result)
				if (result) {
					this.setPagedata('', 'dataList', result.data.list, 'shop_givGroupRecord', false, this.limit)
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.record {
		padding: 24rpx 32rpx;

		.header {
			height: 88rpx;

			>view {
				font-size: 28rpx;
				color: #222;
				text-align: center;
			}
		}

		.record_item {
			padding: 26rpx 32rpx;
			// border-bottom: 2rpx solid #F5F5F5;
			background-color: #fff;
			border-radius: 12rpx;
			margin-bottom: 24rpx;

			.name {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
				padding-left: 8rpx;
			}

			.time {
				// flex: 1;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
	}
</style>