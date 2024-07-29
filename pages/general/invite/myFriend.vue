<template>
	<view class="my_friend">
		<u-subsection :list="list" :current="current" activeColor="#fff" inactiveColor="#222"
			@change="currentChange"></u-subsection>
		<view class="content">
			<view class="friend_item flex-between" v-for="item in dataList" :key="item.id">
				<view class="user_info flex-start">
					<u-avatar :src="item.user.show_src" size="80rpx"></u-avatar>
					<view class="info flex-colum-start">
						<text class="name ">{{item.user.nickname | cut_out}}</text>
						<text class="time">{{new Date(item.user.add_time).valueOf() | date('mm-dd hh:MM')}}</text>
					</view>
				</view>
				<!-- <view class="state">
					{{item.cert_id>=1? '已实名' :'未实名'}}
				</view> -->
				<!-- <view class="food flex-end">
					<u-icon name="/static/btn/gem-icon1.png " width="48rpx" height="48rpx" :label="item.user.total"
						label-size="24rpx" label-color="#222"></u-icon>
				</view> -->
			</view>
			<iloading :result="result"></iloading>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				list: [{
						name: this.$t('myFriend.level1'),
						levels: 1
					},
					{
						name: this.$t('myFriend.level2'),
						levels: 2
					},
					{
						name: this.$t('myFriend.level3'),
						levels: 3
					}
				],
				dataList: [],
				levels: 1,
				page: 1,
				result: 1,
				count: 0
			}
		},
		onLoad() {
			this.shop_getUserList(1);
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('myFriend.myFriend')
			})
		},
		onReachBottom() {
			if (this.result == 4) {
				this.page = this.page + 1;
				this.shop_getUserList()
			}
		},
		methods: {
			currentChange(e) {
				if (this.current == e) return;
				this.current = e
				this.page = 1;
				this.dataList = [];
				this.result = 4;
				this.levels = this.list[e].levels;
				this.$nextTick(() => {
					this.shop_getUserList(this.levels)
				})
			},
			async shop_getUserList(levels) {
				let {
					data: result
				} = await uni.ajax.shop_getUserList({
					limit: uni.conf.limit,
					page: this.page,
					levels: levels
				});
				if (result) {
					this.count = result.count;
					this.dataList = this.dataList.concat(result.list);
					this.result = uni.utils.loading_result(this.page, result.list);
					switch (levels) {
						case 1:
							this.list[0].name = this.$t('myFriend.level1') + `(${this.count})`;
							break;
						case 2:
							this.list[1].name = this.$t('myFriend.level2') + `(${this.count})`;
							break;
						case 3:
							this.list[2].name = this.$t('myFriend.level3') + `(${this.count})`;
							break;
						default:
							break;
					}

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-subsection--button {
		border-radius: 100px !important;
	}

	/deep/.u-subsection--button__bar {
		background: var(--theme);
		border-radius: 100px !important;
	}

	.my_friend {
		padding: 24rpx 32rpx;

		.content {
			padding: 24rpx 0rpx;

			.friend_item {
				padding: 32rpx;
				background-color: #fff;
				border-radius: 12rpx;

				.user_info {
					width: 360rpx;

					.info {

						padding-left: 16rpx;

						.name {
							font-size: 32rpx;
							font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 600;
							color: #222222;
							margin-bottom: 8rpx;
							line-height: 36rpx;
							width: 200rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.time {
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}

				}

				.state {
					flex: 3;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					text-align: center;
				}

				.food {
					flex: 5;

				}
			}
		}

	}
</style>