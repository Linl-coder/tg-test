<template>
	<view class="record">
		<u-sticky>
			<u-subsection :list="list" :current="curNow" @change="confirmUse"></u-subsection>
			<!-- <view class="menu_tab df alc">
				<view v-for="(item,index) in list" :key="item" @click="confirmUse(index)" class="menu_item tc"
					:class="curNow==index?'active':''">
					{{item}}
				</view>
			</view> -->
		</u-sticky>
		<view class="record_item " v-for="item in dataList" :key="item.id">
			<!-- 获得记录 -->
			<view class="" v-if="curNow==0">
				<view style="color: #999;font-size: 24rpx;margin-bottom: 8rpx;" class="flex-start">
					{{findRecordResponseKey(item.remark)}}
				</view>
				<view class="flex-between">
					<view class="time">
						{{item.add_time | date('mm-dd hh:MM:ss')}}
					</view>

					<view style="flex: 4;" class="flex-end">
						<u-icon :name=" type == 'cereal' ? '/static/btn/gem-icon1.png' : '/static/Continent/i10.png'"
							width="40rpx" height="40rpx" :label="item.amount" labelColor="#69954D"
							labelSize="24rpx"></u-icon>
					</view>
				</view>
			</view>
			<!-- 消耗记录 -->
			<view class="" v-if="curNow==1">
				<view style="color: #999;font-size: 24rpx;margin-bottom: 8rpx;" class="flex-start">
					{{findRecordResponseKey(item.remark)}}
				</view>
				<view class="flex-between">
					<view class="time">
						{{item.add_time | date('mm-dd hh:MM:ss')}}
					</view>
					<view style="flex: 4;" class="flex-end">
						<u-icon :name=" type == 'cereal' ? '/static/btn/gem-icon1.png' : '/static/Continent/i10.png'"
							width="40rpx" height="40rpx" :label="item.amount" labelColor="#69954D"
							labelSize="24rpx"></u-icon>
					</view>
				</view>
			</view>
			<!-- 赠送记录 -->
			<view class="" v-if="curNow==2">
				<view style="color: #999;font-size: 24rpx;margin-bottom: 8rpx;" class="flex-start"
					v-show="item.is_commission==0">
					<!-- {{item.user.nickname?item.user.nickname:''}} -->
					{{$t('myAssets_record.transferOutUser')}}: {{item.user?item.user.nickname?item.user.nickname:'':''}}
				</view>

				<view style="color: #999;font-size: 24rpx;margin-bottom: 8rpx;" class="flex-start"
					v-show="item.is_commission==1">
					<!-- {{item.user.nickname?item.user.nickname:''}} -->
					{{$t('myAssets_record.shouxu')}}
				</view>

				<view class="flex-between">
					<view class="time">
						{{item.create_at | date('mm-dd hh:MM:ss')}}
					</view>

					<view style="flex: 4;" class="flex-end">
						<u-icon :name=" type == 'cereal' ? '/static/btn/gem-icon1.png' : '/static/Continent/i10.png'"
							width="40rpx" height="40rpx" :label="item.type==1?'-'+item.num:'+'+item.num"
							labelColor="#69954D" labelSize="24rpx"></u-icon>
					</view>
				</view>
			</view>
			<!-- 被赠送记录 -->
			<view class="" v-if="curNow==3">
				<view style="color: #999;font-size: 24rpx;margin-bottom: 8rpx;" class="flex-start">
					<!-- {{'来自用户: '+item.user.nickname?item.user.nickname:' '+' 的转入'}} -->
					{{$t('myAssets_record.formUser')}} {{item.user?item.user.nickname?item.user.nickname:'':''}}
					{{$t('myAssets_record.transferIn')}}
				</view>

				<view class="flex-between">
					<view class="time">
						{{item.create_at | date('mm-dd hh:MM:ss')}}
					</view>

					<view style="flex: 4;" class="flex-end">
						<u-icon :name=" type == 'cereal' ? '/static/btn/gem-icon1.png' : '/static/Continent/i10.png'"
							width="40rpx" height="40rpx" :label="item.type==1?'-'+item.num:'+'+item.num"
							labelColor="#69954D" labelSize="24rpx"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	import localeData from '@/locale/zh-CN.json'
	import throttle from 'lodash/throttle';
	export default {
		data() {
			return {
				type: 'cereal',
				limit: 18,
				loading: 1,
				dataList: [],
				list: [
					this.$t('myAssets_record.get'),
					this.$t('myAssets_record.consume'),
					this.$t('myAssets_record.give'),
					this.$t('myAssets_record.beGived')
				],
				curNow: 0,
				page: 1

			}
		},
		onLoad(option) {
			this.type = option.type
			if (option.type == 'cereal') {
				// 金币记录
				this.shop_foodLogList(2)
			} else {
				// 金币记录
				this.shop_userGoldList()
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('myAssets_record.gemRecord')
			})
		},
		onReachBottom() {
			if (this.loading == 4) {
				this.loading = 1;
				this.page = this.page + 1;
				const type = this.curNow === 2 ? 1 : (this.curNow === 0 ? 2 : 1);
				if (this.curNow > 1) {
					this.shop_mineGivLog(type);
				} else {
					this.shop_foodLogList(type);
				}
			}
		},
		methods: {
			findRecordResponseKey(value) {
				for (const key in localeData.record_response) {
					if (localeData.record_response[key] === value) {
						return this.$t('record_response' + '.' + key)
					}
				}
				return null; // 如果没有找到匹配的项，则返回null或者其他自定义的默认值
			},
			confirmUse: throttle(function(index) {
				// 要实现的业务逻辑
				this.sectionChange(index);
			}, 100, {
				leading: true,
				trailing: false
			}),
			sectionChange(index) {
				if (this.curNow !== index) {
					this.page = 1;
					this.curNow = index;
					this.dataList = [];
					this.loading = 1;
					let type;
					if (this.curNow == 1 || this.curNow == 2) {
						type = 1
					} else {
						type = 2
					}
					if (index > 1) {
						this.shop_mineGivLog(type);
					} else {
						this.shop_foodLogList(type);
					}
				}

			},
			async shop_mineGivLog(type) {
				await this.fetchData(type, 'shop_mineGivLog');
			},

			async shop_foodLogList(type) {
				await this.fetchData(type, 'shop_userFoodList');
			},

			async fetchData(type, apiMethod) {
				let result;
				if (apiMethod === 'shop_mineGivLog') {
					result = await uni.ajax.shop_mineGivLog({
						limit: this.limit,
						page: this.page,
						type
					});
				} else if (apiMethod === 'shop_userFoodList') {
					result = await uni.ajax.shop_userFoodList({
						limit: this.limit,
						page: this.page,
						type
					});
				}
				if (result && result.data) {
					if (this.page == 1) this.dataList = []
					this.dataList = this.dataList.concat(result.data.list);
					this.loading = uni.utils.loading_result(this.page, result.data.list, this.limit);
				}
			},
			async shop_userGoldList() {
				let {
					data: result
				} = await uni.ajax.shop_userGoldList({
					limit: this.limit,
					page: this.page
				});
				if (result) {
					this.setPagedata('', 'dataList', result.data, 'shop_userGoldList', false, this.limit)
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.record {
		padding: 24rpx 32rpx;

		.menu_tab {
			padding: 4rpx;
			margin-bottom: 10rpx;
			background-color: #EEEEEF;
			font-size: 24rpx;

			.menu_item {
				width: 25%;
				padding: 10rpx 0;
				border-radius: 8rpx;
			}

			.active {
				background-color: #fff;
			}
		}

		.record_item {
			padding: 16rpx 16rpx;
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
				flex: 3;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				white-space: nowrap;

			}
		}
	}
</style>