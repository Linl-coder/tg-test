<template>
	<view class="announcement">
		<view class="" style="margin-bottom: 30rpx;" v-for="item in annouce_list" :key="item.id">
			<view class="time">
				{{item.publish_time}}
			</view>
			<view class="" @click="topage('general/userinfo/announce_detail?id=' + item.id)">
				<Card :is_annouce="is_annouce" :data='item'></Card>
			</view>
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
				annouce_list: [],
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
				title: this.$t('msgCenter.platNotice')
			})
			this.getannounceList()
		},
		onReachBottom() {
			if (this.result == 4) {
				this.page = this.page + 1;
				this.getannounceList()
			}
		},
		methods: {
			async getannounceList() {
				let res = await uni.ajax.public_adgetList({
					cate_id: this.cate_id,
					page: this.page,
					limit: this.limit
				})
				if (res.data.list.length > 0) {
					this.annouce_list = res.data.list
					this.result = uni.utils.loading_result(this.page, res.data.list, this.limit);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.announcement {
		padding-top: 20rpx;

		.time {
			text-align: center;
			color: #ccc;
			margin-bottom: 30rpx;
			font-size: 28rpx;
		}
	}
</style>