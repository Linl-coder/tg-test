<template>
	<view class="my_friend">
		<!-- 我的好友只有1队 -->
		<u-subsection :list="list" :current="current" activeColor="#333" inactiveColor="#222"
			@change="currentChange"></u-subsection>

		<!-- <button @tap="topage('general/invite/myFriend_all')">跳转总的好友页面</button> -->
		<view class="teamOneMember_conatiner flex-colum-evenly">
			<view class="member">
				<p class="bold">{{$t('myFriend2.digMineForMe')}} Level {{level}} {{$t('myFriend2.teammate')}}</p>
			</view>
			<view class="haveDig flex-between">
				<p>{{$t('myFriend2.nickname')}}</p>
				<p>{{$t('myFriend2.haveMineMe')}}</p>
			</view>
		</view>
		<view class="content">
			<view class="friend_item flex-evenly" v-for="item in dataList" :key="item.id">
				<view class="user_info flex-start">
					<u-avatar :src="item.avatar?item.avatar:'/static/else/avatar.png'" size="80rpx"></u-avatar>
					<view class="info flex-colum-start">
						<text class="name ">{{item.nickname | cut_out}}</text>
						<text class="time">{{new Date(item.add_time).valueOf() | date('mm-dd hh:MM')}}</text>
					</view>
				</view>
				<!-- <view class="state">
					{{item.cert_id>=1? '已实名' :'未实名'}}
				</view> -->
				<view class="food flex-end">
					<u-icon name="/static/btn/gem-icon1.png " width="48rpx" height="48rpx" :label="item.income_food"
						label-size="24rpx" label-color="#222"></u-icon>
				</view>
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
						name: this.$t('myFriend2.all'),
						type: 0
					},
					{
						name: this.$t('myFriend2.effective'),
						type: 1
					},
					{
						name: this.$t('myFriend2.invalid'),
						type: 2
					}
				],
				dataList: [],
				type: 0,
				page: 1,
				result: 1,
				count: 0,
				level: 1
			}
		},
		onLoad(option) {
			this.getHelpMyFriendList(0);
			this.level = option.level;
			// this.shop_getUserList(2);
			// this.shop_getUserList(3);
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('myFriend2.title')
			})
		},
		onReachBottom() {
			if (this.result == 4) {
				this.page = this.page + 1;
				this.getHelpMyFriendList()
			}
		},
		methods: {
			currentChange(e) {
				if (this.current == e) return;
				this.current = e
				this.page = 1;
				this.dataList = [];
				this.result = 4;
				this.type = this.list[e].type;
				this.$nextTick(() => {
					this.getHelpMyFriendList(this.type)
				})
			},
			async getHelpMyFriendList(type) {
				let {
					data: result
				} = await uni.ajax.getHelpMyFriendList({
					level: this.level,
					limit: uni.conf.limit,
					page: this.page,
					type: type,
					is_need_count_info: 1
				});
				if (result) {
					this.count = result.count;
					this.dataList = this.dataList.concat(result.list);
					this.result = uni.utils.loading_result(this.page, result.list);
					//this.myParentInfo = result.parent_user_info;
					switch (type) {
						case 0:
							this.list[0].name = this.$t('myFriend2.all') +
								`(${result.count_info.all_num})`;
							break;
						case 1:
							this.list[1].name = this.$t('myFriend2.effective') +
								`(${result.count_info.valid_num})`;
							break;

						case 2:
							this.list[2].name = this.$t('myFriend2.invalid') +
								`(${result.count_info.invalid_num})`;
							break;
						default:
							break;
					}

				}
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
							this.list[0].name = this.$t('myFriend2.all') + `(${this.count})`;
							break;
						case 2:
							this.list[1].name = this.$t('myFriend2.effective') + `(${this.count})`;
							break;
						case 3:
							this.list[2].name = this.$t('myFriend2.invalid') + `(${this.count})`;
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
		background: #fff;
		font-weight: bold;
		border-radius: 100px !important;
	}

	.my_friend {
		padding: 24rpx 32rpx;

		.teamOneMember_conatiner {
			width: 100%;
			height: 130rpx;
			//background: red;
			border-bottom: 1rpx solid #BBB;

			.member {
				font-size: 28rpx;
			}

			.haveDig {
				color: #666;

				p:nth-child(1) {
					font-size: 24rpx;
				}

				p:nth-child(2) {
					font-size: 26rpx;
				}
			}
		}






		.content {
			// padding: 24rpx 0rpx;

			.friend_item {
				padding: 32rpx;
				background-color: #fff;
				border-radius: 12rpx;

				.user_info {
					width: 300rpx;

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
							//font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}

				}

				.state {
					flex: 3;
					font-size: 24rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
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