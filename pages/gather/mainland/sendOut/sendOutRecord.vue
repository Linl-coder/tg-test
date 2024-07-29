<template>
	<view class="send_out_record">
		<view class="" style="margin-bottom: 24rpx;">
			<u-subsection :list="list" :current="curNow" @change="confirmUse"></u-subsection>
		</view>
		<view class="headline">
			<view>{{$t('sendRecord.giveUsers')}}</view>
			<view>{{$t('sendRecord.giveTime')}}</view>
			<view>{{$t('sendRecord.giveNum')}}</view>
		</view>
		<scroll-view class="scroll" scroll-y :style="scrollHeight" @scrolltolower="scrolltolower">
			<view class="record_item flex-start" v-for="item in dataList" :key="item.id">
				<!-- {{curNow}}--curNow -->
				<view class="flex-start" style="flex: 5;" v-if="curNow==1">
					<view class="name">{{item.getUser?item.getUser.nickname:"******"}}
					</view>
				</view>
				<view class="flex-start" style="flex: 5;" v-if="curNow==0">
					<view class="name">{{item.sendUser?item.sendUser.nickname:"******" }}</view>
				</view>
				<view class="time">
					{{new Date(item.add_time).valueOf() | date('mm-dd hh:MM')}}
				</view>
				<view style="flex: 5;" class="flex-end">
					<u-icon name="" width="40rpx" height="40rpx" :label="item.goods.title+' x'+item.num"
						labelColor="#69954D" labelSize="24rpx"></u-icon>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import throttle from 'lodash/throttle';
	export default {
		data() {
			return {
				windowHeight: '',
				scrollHeight: {},
				dataList: [],
				page: 1,
				result: 1,
				type: 1,
				list: [this.$t('sendRecord.getRecord'), this.$t('sendRecord.transferRecord')],
				curNow: 0,
				limit: 20
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('sendRecord.transferRecord')
			})
		},
		onLoad() {
			let system = uni.getSystemInfoSync();
			this.scrollHeight = {
				height: 'calc(' + system.windowHeight + 'px - 88rpx)'
			};
			this.shop_givRecord()
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		methods: {
			confirmUse: throttle(function(index) {
				// 要实现的业务逻辑
				this.sectionChange(index);
			}, 100, {
				leading: true,
				trailing: false
			}),
			sectionChange(index) {
				if (this.curNow !== index) {
					this.curNow = index;
					this.page = 1;
					this.type = (this.curNow === 1) ? 2 : 1;
					this.dataList = [];
					this.result = 4;
					this.shop_givRecord();
				}
			},

			scrolltolower() {
				if (this.result === 4) {
					this.page++;
					this.shop_givRecord();
				}
			},

			async shop_givRecord() {
				try {
					let res = await uni.ajax.shop_givRecord({
						page: this.page,
						limit: this.limit,
						type: this.type
					});
					if (res && res.data && res.data.list) {
						this.dataList = this.page === 1 ? res.data.list : this.dataList.concat(res.data.list);
						this.result = uni.utils.loading_result(this.page, res.data.list, this.limit);
					} else {
						// 处理请求数据为空的情况
						this.result = 1; // 或者其他适当的处理
					}
				} catch (error) {
					// 处理请求错误的情况
					console.error('shop_givRecord error:', error);
					// 可以根据实际情况添加错误处理逻辑
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.send_out_record {
		padding: 0rpx 32rpx;

		.headline {
			display: flex;
			height: 88rpx;
			padding: 0 32rpx;
			align-items: center;
			justify-content: space-between;

			>view {
				font-size: 24rpx;
				font-weight: 400;
				color: #000;
			}
		}

		.scroll {
			width: 100%;
			padding: 0 32rpx;
			box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
			border-radius: 12rpx;
			background-color: #fff;

			.record_item {
				padding: 26rpx 0;
				border-bottom: 2rpx solid #F5F5F5;

				.name,
				.time {
					font-weight: 400;
				}

				.name {
					font-size: 28rpx;
					color: #222;
					padding-left: 8rpx;
				}

				.time {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
</style>