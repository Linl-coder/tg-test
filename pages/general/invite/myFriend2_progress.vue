<template>
	<view class="my_friend">
		<!-- 下一级开启条件 -->
		<!-- 	<u-subsection :list="list" :current="current" activeColor="#333" inactiveColor="#222"
			@change="currentChange"></u-subsection> -->

		<view class="progree_box flex-colum-evenly" v-if="info.next_grade!=5">
			<view class="top flex-between">
				<view class="title color_w bold">
					Level
					{{info.next_grade-1}} {{$t('myFriend2_progress.digForMe')}}
					{{info.upgrade_need_food_num}}{{$t('myFriend2_progress.gemStone')}}
				</view>

				<view class="invite_btn bold flex-center" @tap="goToShare">
					<p>{{$t('myFriend2_progress.inviteFriend')}}</p>
				</view>
			</view>
			<view class="bottom flex-colum-between">
				<view class="progress_title bold color_w">
					{{$t('myFriend2_progress.haveDigForMe')}} {{info.income_food>0?info.income_food:0}} /
					{{info.upgrade_need_food_num}}
				</view>
				<view class="progress_main">
					<u-line-progress inactiveColor="#354151"
						:percentage="(info.income_food ? info.income_food : 0) / info.upgrade_need_food_num * 100"
						activeColor="#F8E6BF" height="12" :showText="false">

					</u-line-progress>
				</view>
			</view>
		</view>

		<view class="five_condiation flex-between color_w" v-else>
			<view class="condiation">
				LEVEL
				1{{$t('mainland.have')}}
				<span>{{info.upgrade_special_condition.friend_num}}</span>{{$t('mainland.teamMem')}}<span>{{info.upgrade_special_condition.friend_num}}</span>{{$t('mainland.teamTip1')}}
				<image src="/static/btn/gem-icon1.png" style="height: 26rpx;" mode="heightFix"></image>
				<span>{{info.upgrade_special_condition.food_num}}</span>{{$t('mainland.gemStone')}}{{$t('mainland.canOpenDig')}}
				<span>Level {{info.next_grade}}</span>
			</view>
			<view class="invite_btn bold flex-center" @tap="goToShare">
				<p>{{$t('myFriend2_progress.inviteFriend')}}</p>
			</view>
		</view>

		<!-- <button @tap="topage('general/invite/myFriend_all')">跳转总的好友页面</button> -->
		<view class="teamOneMember_conatiner flex-colum-around">
			<view class="member">
				<p class="bold">{{$t('myFriend2_progress.digMineForMe')}} Level
					{{info.next_grade-1}}{{$t('myFriend2_progress.teammate')}}
				</p>
			</view>
			<view class="haveDig flex-between">
				<p>{{$t('myFriend2.nickname')}}</p>
				<p>{{$t('myFriend2.haveMineMe')}}</p>
			</view>
		</view>
		<view class="content">
			<view class="friend_item flex-evenly" v-for="item in dataList" :key="item.id">
				<view class="user_info flex-start">
					<u-avatar :src="item.avatar?item.avatar:'/static/else/avatar.png'" size="75rpx"></u-avatar>
					<view class="info flex-colum-start">
						<text class="name ">{{item.nickname | cut_out}}</text>
						<text class="time">{{new Date(item.add_time).valueOf() | date('mm-dd hh:MM')}}</text>
					</view>
				</view>
				<!-- <view class="state">
					{{item.cert_id>=1? '已实名' :'未实名'}}
				</view> -->
				<view class="food flex-end">
					<u-icon name="/static/btn/gem-icon1.png " width="44rpx" height="44rpx" :label="item.income_food"
						label-size="24rpx" label-color="#222"></u-icon>
				</view>
			</view>
			<iloading :result="loading"></iloading>
		</view>
	</view>
</template>

<script>
	import {
		userinfo
	} from "@/common/mixins/index.js";
	export default {
		mixins: [userinfo],
		data() {
			return {
				current: 0,
				// list: [{
				// 		name: this.$t('myFriend2.all'),
				// 		type: 0
				// 	},
				// 	{
				// 		name: this.$t('myFriend2.effective'),
				// 		type: 1
				// 	},
				// 	{
				// 		name: this.$t('myFriend2.invalid'),
				// 		type: 2
				// 	}
				// ],
				dataList: [],
				type: 0,
				page: 1,
				loading: 1,
				count: 0,
				level: 1,
				info: {},
				shareLink: ''
			}
		},
		onLoad(option) {
			const query = JSON.parse(decodeURIComponent(option.info)); // 解析参数为对象
			//console.log(query); // 输出解析后的对象
			this.getHelpMyFriendList(0);
			this.info = query;
			this.level = this.info.next_grade - 1;
			// this.shop_getUserList(2);
			// this.shop_getUserList(3);
		},
		onShow() {
			this.getPageUrl();
			uni.setNavigationBarTitle({
				title: this.$t('myFriend2_progress.title')
			})
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
		},
		onReachBottom() {
			if (this.loading == 4) {
				this.loading = 1;
				this.page = this.page + 1;
				this.getHelpMyFriendList(0)
			}
		},
		methods: {
			getPageUrl() {
				// 从本地存储中获取保存的对象
				let pageWebUrl = uni.getStorageSync('pageWebUrl');

				// 获取具体的值
				this.shareLink = pageWebUrl.share_link;

			},
			goToShare() {
				const lang = uni.getStorageSync('locale') ? uni.getStorageSync('locale') :
					this._i18n.locale;
				const user_code = this.user_info.user_code;
				uni.setStorage({
					key: "pay_url",
					data: `${this.shareLink}page/share.html?token=` + uni.getStorageSync(
							'jwt') +
						'&company_code=' + uni.conf.companycode + '&lang=' + lang + '&user_code=' + user_code,
					success: () => {
						this.topage("general/web/index");
					}
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
					is_need_count_info: 0
				});
				if (result) {
					// this.count = result.count;
					this.count = result.count;
					this.dataList = this.dataList.concat(result.list);
					this.loading = uni.utils.loading_result(this.page, result.list);
					//this.myParentInfo = result.parent_user_info;

				}

			}
		},
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

		.progree_box {
			width: 100%;
			height: 250rpx;
			border-radius: 18rpx;
			padding: 10rpx 30rpx;
			background: #1A1B1F;

			.top {
				width: 100%;

				.title {
					font-size: 32rpx;
				}

				.invite_btn {
					color: #3C2119;
					font-size: 28rpx;
					padding: 10rpx 16rpx;
					border-radius: 10rpx;
					background: linear-gradient(to right, #F8E9C5, #F2CB89);
				}
			}

			.bottom {
				height: 80rpx;
				// background: red;

				.progress_title {
					font-size: 28rpx;
				}
			}


		}

		.five_condiation {
			width: 100%;
			height: 250rpx;
			border-radius: 18rpx;
			padding: 10rpx 30rpx;
			background: #1A1B1F;
			font-size: 30rpx;

			span {
				color: #F2CB89;
			}

			.condiation {
				width: 360rpx;
				gap: 20rpx;
			}

			.invite_btn {

				// align-self: flex-start;
				color: #3C2119;
				font-size: 28rpx;
				padding: 16rpx 30rpx;
				border-radius: 18rpx;
				background: linear-gradient(to right, #F8E9C5, #F2CB89);
			}
		}

		.teamOneMember_conatiner {
			width: 100%;
			height: 130rpx;
			//background: red;
			margin-top: 20rpx;
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
							font-size: 28rpx;
							//font-family: PingFang SC-Semibold, PingFang SC;
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
							font-size: 22rpx;
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