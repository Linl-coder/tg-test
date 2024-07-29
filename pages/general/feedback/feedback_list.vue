<template>
	<div class="feedback_list">
		<view class="pd box" v-for="(item,index) in list" :key="index">
			<text class="time">{{item.add_time}}</text>
			<view class="flex-between">
				<text class="t1">{{item.text}}</text>
			</view>
			<view class="img_box flex-start" v-if="item.cover.length>0">
				<u--image :showLoading="true" style="margin-right: 8rpx;" :src="k.show_src" v-for="(k,i) in item.cover"
					:key="i" width="210rpx" height="210rpx"></u--image>
			</view>
			<view class="" style="margin: 15upx 0upx;">
				<text class="t2" v-if="item.replay_text==null">等待回复</text>
				
				<text class="t2" v-else style="color: red;">官方回复 : {{item.replay_text}}</text>
			</view>
		</view>

		<iloading :result="loading"></iloading>

	</div>
</template>

<script>
	import {pages} from "@/common/mixins/index.js";
	export default {
		mixins: [pages],
		data() {
			return {
				list: [],
				loading: 1,
			}
		},
		onLoad() {
			this.message_list();
		},

		methods: {
			async message_list() {
				let res = await uni.ajax.public_pushGetList({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {

					this.setPagedata('', 'list', res.data.list, 'message_list', false);

				}
			}
		}
	}
</script>

<style lang="scss">
	.feedback_list {
		padding-top: 24rpx;

		.box {
			border-radius: 14rpx;
			margin: 0rpx 24rpx 24rpx 24rpx;
			background-color: #fff;
			padding: 20rpx;

			.time,
			.t1,
			.t2 {
				color: #000;
				font-size: 28rpx;
			}

			.img_box {
				padding-top: 20rpx;

				.icon {
					width: 100rpx;
					height: 100rpx;
					margin-right: 10rpx;
				}
			}

		}
	}
</style>