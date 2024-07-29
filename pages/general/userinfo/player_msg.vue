<template>
	<view class="announcement">
		<view class="msg_content" style="margin-bottom: 20rpx;" v-for="(item,index) in msg_list" :key="index">
			<view class="time tc">
				{{'24.06.18 14：01'}}
			</view>
			<view class="" @click="topage('general/userinfo/player_msg_detail?id=' + item.id)">
				<Card :is_annouce="is_annouce" :data='item'></Card>
			</view>
		</view>
		<view class="df alc jc" style="width: 100%;height: 100%;" v-show="msg_list.length==0">
			<u-empty mode="message" width='200' height='200' :text="$t('msgCenter.noMsg')"
				icon="/static/else/no_msg.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
	import Card from './components/Card.vue'
	export default {
		components: {
			Card
		},
		data() {
			return {
				is_annouce: true,
				msg_list: [],
				cate_id: '',
				page: 1,
				limit: 10,
				result: 4,
			}
		},
		onLoad(options) {
			this.cate_id = options.id
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('msgCenter.playerMsg')
			})
			this.getUserMsgList()
		},
		onReachBottom() {
			if (this.result == 4) {
				this.page = this.page + 1;
				this.getUserMsgList()
			}
		},
		methods: {
			async getUserMsgList() {
				let res = await uni.ajax.public_getUserMsgList({
					page: this.page,
					limit: this.limit
				})
				if (res.data.list.length > 0) {
					this.msg_list = res.data.list
					this.result = uni.utils.loading_result(this.page, res.data.list, this.limit);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.announcement {
		width: 100%;
		height: 100%;

		.msg_content {
			padding: 20rpx;

			.time {
				text-align: center;
				color: #ccc;
				margin-bottom: 30rpx;
				font-size: 28rpx;
			}
		}
	}
</style>