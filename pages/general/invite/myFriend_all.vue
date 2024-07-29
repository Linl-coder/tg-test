<template>
	<view class="my_friend">
		<!-- 我的挖矿队友总的 -->
		<!-- 我的好友第二版 -->
		<u-subsection :list="list" :current="current" activeColor="#000" inactiveColor="#222"
			@change="currentChange"></u-subsection>

		<view class="myOneTeam flex-between" v-show="true">
			<view class="oneTeamLeader">
				<p class="bold">{{$t('myFriend_all.myHighLevel')}}</p>
			</view>
			<view class="avatar">
				<p class="flex-center" v-if="myParentInfo.nickname">
					<image :src="myParentInfo.avatar?myParentInfo.avatar:'/static/else/avatar.png'" mode="heightFix">
					</image>
					<text>{{myParentInfo.nickname?myParentInfo.nickname:"******"}}</text>
				</p>
				<p class="flex-center" v-else>
					<view class="">
						{{$t('myFriend_all.notSetParentCode')}}
					</view>
				</p>
			</view>
		</view>
		<view class="teamOneMember_conatiner ">
			<view class="oneTeamLeader">
				<p>{{$t('myFriend_all.nickname')}}</p>
			</view>
			<view class="avatar">
				<p class="flex-center">
					{{$t('myFriend_all.haveDigGem')}}
				</p>
			</view>
		</view>

		<view class="content">
			<view class="friend_item_box" v-for="(item,index) in dataList" :key="index">
				<view @click="openInfoModal(item)" class="friend_item flex-evenly">
					<view class="user_info flex-start">
						<view class="info flex-colum-start">
							<text class="name ">{{item.nickname | cut_out}}</text>
							<text class="time">{{new Date(item.add_time).valueOf() | date('mm-dd hh:MM')}}</text>
						</view>
					</view>
					<view class="state">
						{{item.income_food>0? $t('myFriend_all.effective') : $t('myFriend_all.invalid')}}
					</view>
					<view class="food flex-end">
						<u-icon name="/static/btn/gem-icon1.png " width="48rpx" height="48rpx" :label="item.income_food"
							label-size="24rpx" label-color="#222"></u-icon>
					</view>
				</view>
			</view>
			<iloading :result="loading"></iloading>
		</view>
		<u-popup :show="userInfoPopup" mode="center" round="24rpx" @close="userInfoPopup = false">
			<view class="userInfoPopup">
				<!-- 关闭 -->
				<u-icon name="close-circle" size="36rpx" color="#CFCFCF" shop
					style="position: absolute;top: 32rpx;right: 32rpx;z-index: 5;"
					@click="userInfoPopup = false"></u-icon>
				<view class="userInfo">
					<u-avatar :src="sonInfo.avatar" size="96rpx"></u-avatar>
				</view>

				<view class="user_code_box flex-center">
					<text>{{$t('index.inviteCode')}}: {{sonInfo.user_code}}</text>
					<image src="/static/else/copy.png" mode="heightFix" @tap="copy(sonInfo.user_code)"></image>
				</view>
				<view v-if="sonInfo.telegram||sonInfo.whatsapp||sonInfo.mobile">
					<view class="contact_way flex-between" v-show="sonInfo.telegram">
						<u-icon name="/static/Continent/tg.jpg" width="48rpx" height="48rpx"
							:label="sonInfo.telegram || '******'" label-size="28rpx" label-color="#222"></u-icon>
						<view class="copy flex-center" @click="copy(sonInfo.telegram)">Copy</view>
					</view>
					<view class="contact_way flex-between" v-show="sonInfo.whatsapp">
						<u-icon name="/static/Continent/wa.jpg" width="48rpx" height="48rpx"
							:label="sonInfo.whatsapp || '******'" label-size="28rpx" label-color="#222"></u-icon>
						<view class="copy flex-center" @click="copy(sonInfo.whatsapp)">Copy</view>
					</view>
					<view class="contact_way df alc spb" v-show="sonInfo.mobile">
						<u-icon name="/static/myInfo/2_1.png" width="48rpx" height="48rpx"
							:label="sonInfo.mobile || '******'" label-size="28rpx" label-color="#222"></u-icon>
						<view class="copy flex-center" @click="copy(sonInfo.mobile)">Copy</view>
					</view>
				</view>
				<view class="flex-center" v-else>
					{{$t('utils.notSetContact')}}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				list: [{
						name: this.$t('myFriend_all.team1OneMem'),
						type: 1
					},
					{
						name: this.$t('myFriend_all.otherMem'),
						type: 0
					}
				],
				dataList: [],
				type: 1,
				page: 1,
				count: 0,
				loading: 1,
				myParentInfo: {},
				userInfoPopup: false,
				sonInfo: {}

			}
		},
		onLoad() {
			this.getMyMineFriendList(1);
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('myFriend_all.title')
			})
		},
		onReachBottom() {
			if (this.loading == 4) {
				this.loading = 1;
				this.page = this.page + 1;
				this.getMyMineFriendList(this.type);
			}
		},
		methods: {
			openInfoModal(info) {
				if (this.type == 1) {
					this.sonInfo = info;
					this.userInfoPopup = true;
				}
			},
			currentChange(e) {
				if (this.current == e) return;
				this.current = e
				this.page = 1;
				this.dataList = [];
				this.loading = 1;
				this.type = this.list[e].type;
				this.$nextTick(() => {
					this.getMyMineFriendList(this.type)
				})
			},
			async getMyMineFriendList(type) {
				let result = await uni.ajax.getMyMineFriendList({
					limit: uni.conf.limit,
					page: this.page,
					is_teammate: type
				});

				if (result) {
					this.count = result.data.count;
					this.dataList = this.dataList.concat(result.data.list);
					this.loading = uni.utils.loading_result(this.page, result.data.list);
					if (this.page == 1 && type == 1) {
						this.myParentInfo = result.data.parent_user_info;
					}
					switch (type) {
						case 1:
							if (this.page == 1) {
								this.list[0].name = this.$t('myFriend_all.team1OneMem') +
									`(${result.data.count_info.my_teammate_num})`;
								break;
							}
						case 0:
							if (this.page == 1) {
								this.list[1].name = this.$t('myFriend_all.otherMem') +
									`(${result.data.count_info.other_teammate_num})`;
								break;
							}
						default:
							break;
					}
				}
			},
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
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #BBB;

			.oneTeamLeader {
				font-size: 28rpx;
				color: #666;
			}

			.avatar {
				p {
					color: #666;

					image {
						height: 70rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.myOneTeam {
			width: 100%;
			height: 130rpx;
			background: #fff;
			margin-top: 20rpx;
			border-radius: 10rpx;
			padding: 0 20rpx;
			border-bottom: none;

			.oneTeamLeader {
				font-size: 28rpx;
			}

			.avatar {
				p {
					font-size: 28rpx;
					font-weight: 600;

					image {
						height: 70rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.content {
			.friend_item_box {
				padding: 38rpx 15rpx;
				background-color: #fff;
				border-radius: 12rpx 12rpx 0 0;
			}

			.friend_item {

				.user_info {
					width: 260rpx;

					.info {

						padding-left: 16rpx;

						.name {
							font-size: 30rpx;
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
							font-weight: 400;
							color: #999999;
						}
					}

				}

				.state {
					flex: 3.8;
					font-size: 24rpx;
					margin-left: 20rpx;
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

	.userInfoPopup {
		width: 520rpx;
		padding: 32rpx;
		padding-top: 10rpx;
		box-sizing: border-box;
		position: relative;

		.userInfo {
			display: flex;
			flex-direction: column;
			align-items: center;
			transform: translateY(-80rpx);

			text {
				font-size: 28rpx;
				font-weight: 500;
				color: #222222;
			}
		}

		.user_code_box {
			width: 100%;
			margin-bottom: 40rpx;
			font-size: 26rpx;

			text {
				margin-right: 30rpx;
			}

			image {
				height: 30rpx;
			}
		}

		.contact_way {

			background: #EBEBEB;
			border-radius: 12rpx;
			height: 82rpx;
			margin-bottom: 24rpx;
			box-sizing: border-box;
			padding: 0 20rpx;

			.copy {
				width: 116rpx;
				height: 58rpx;
				border-radius: 12rpx;
				background-color: #93CA86;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
			}

		}

		.setUserInfo {
			margin-top: 40rpx;
		}

	}
</style>