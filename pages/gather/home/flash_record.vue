<template>
	<view class="send_out_record">
		<view class="headline">
			<view>{{$t('sendRecord.card')}}</view>
			<view>{{$t('sendRecord.useTime')}}</view>
			<view>{{$t('sendRecord.num')}}</view>
		</view>
		<scroll-view class="scroll" scroll-y :style="scrollHeight" @scrolltolower="scrolltolower">
			<view class="record_item flex-start" v-for="item in dataList" :key="item.id">
				<!-- {{curNow}}--curNow -->
				<view class="flex-start" style="flex: 5;" v-if="curNow==1">
					<view class="name">{{item.getUser?item.getUser.nickname:"******"}}
					</view>
				</view>
				<view class="flex-start" style="flex: 5;" v-if="curNow==0">
					<view class="name">{{item.sendUser.nickname }}</view>
				</view>
				<view class="time">
					{{new Date(item.add_time).valueOf() | date('mm-dd hh:MM')}}
				</view>
				<view style="flex: 5;" class="flex-end">
					<u-icon name="" width="40rpx" height="40rpx" :label="item.goods.title+' x'+item.num"
						labelColor="#69954D" labelSize="24rpx"></u-icon>
				</view>
			</view>
			<iloading :result="result"></iloading>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '',
				scrollHeight: {},
				dataList: [],
				page: 1,
				result: 1,
				curNow: 0,
				limit: 20
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('colleHome.FlashcardRecord')
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
			sectionChange(index) {
				this.curNow = index;
				this.dataList = [];
				this.result = 4;
				this.page = 1
				if (this.curNow == 1) {
					this.type = 2;
				} else {
					this.type = 1;
				}
				this.shop_givRecord();
			},
			scrolltolower() {
				console.log('触底')
				if (this.result == 4) {
					this.page++
					this.shop_givRecord()
				}
			},
			async shop_givRecord() {
				this.result = 1
				let {
					data: result
				} = await uni.ajax.shop_givRecord({
					page: this.page,
					limit: this.limit,
					type: this.type
				})
				if (result) {
					this.dataList = this.dataList.concat(result.list);
					this.result = uni.utils.loading_result(this.page, result.list, this.limit)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.send_out_record {

		.headline {
			display: flex;
			height: 88rpx;
			padding: 0 32rpx;
			align-items: center;
			justify-content: space-between;

			>view {
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;
			}
		}

		.scroll {
			width: 100%;
			padding: 0 32rpx;
			box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
			border-radius: 12rpx;
			background-color: #fff;
			box-sizing: border-box;

			.record_item {
				padding: 26rpx 0;
				border-bottom: 2rpx solid #F5F5F5;

				.name {
					font-size: 28rpx;
					font-weight: 400;
					color: #222222;
					padding-left: 8rpx;
				}

				.time {
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
</style>