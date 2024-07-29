<template>
	<view class="share">
		<view class="header">
			<view class="back flex-start">
				<u-icon name="arrow-left" bold color="#fff" size="44rpx" :label="$t('share.shareTo')" label-color="#fff"
					label-size="32rpx" @click="toback()"></u-icon>

			</view>
			<view class="invite_tip">
				<p>{{$t('share.inviteTip1')}}</p>
				<p>{{$t('share.inviteTip2')}}</p>
			</view>
		</view>
		<view class="content">
			<view class="award">
				<view class="title flex-between">
					<text>{{$t('share.friendReward')}}</text>
					<u-icon name="arrow-right" color="#999" size="24rpx" :label="$t('share.detail')" label-color="#999"
						label-size="24rpx" label-pos="left" v-if="!isOnlineExam"
						@click="topage('general/article/index?pagetype=invite&type=9')"></u-icon>
				</view>
				<view class="hint" style="height: 4rpx;">
					<!-- {{$t('share.rewardTip')}} -->
				</view>
				<view class="awardList">
					<view class="award_item" style="margin-right: 80rpx;">
						<view class="award_num"><text>{{Todayfood || '0'}}</text></view>
						<view class="award_title">{{$t('share.todayReward')}}</view>
					</view>
					<view class="award_item">
						<view class="award_num"><text>{{hisFood || '0'}}</text></view>
						<view class="award_title">{{$t('share.totolReward')}}</view>
					</view>
				</view>
			</view>

			<view class="invite_entrance">
				<view class="flex-between">
					<view class="">
						{{$t('share.myFriend')}} {{user_info.invitedCount || '0'}}
					</view>
					<u-icon name="arrow-right" size="24rpx" color="#999" v-if="!isOnlineExam"
						@click="myFriend"></u-icon>
				</view>
				<!-- <view class="invite_btn flex-center" @click="topage('general/invite/poster')">
					邀请好友，获得丰厚奖励
				</view> -->
				<!-- general/invite/download   general/invite/index-->
				<view class="invite_btn flex-center" @click="goToShare">
					{{$t('share.inviteGetReward')}}
				</view>
			</view>


			<view class="myOneTeam flex-colum-evenly" v-show="parentInfo.user_code">
				<view class="oneTeamLeader flex-between">
					<p class="bold">{{$t('share.myParent')}}</p>
					<p @click="relation">{{$t('share.contactHe')}}</p>
				</view>
				<view class="avatar flex-start">
					<view class="flex-center">
						<image :src="parentInfo.avatar?parentInfo.avatar:'/static/else/avatar.png'">
						</image>
					</view>
					<view class="avatar_info flex-center">
						<P class="bold">{{parentInfo.nickname?parentInfo.nickname:'*******'}}</P>
						<!-- <P>
							<span>{{$t('share.heInvite')}}: </span>
							<span
								class="bold">{{parentInfo.parent_invite_people_num?' '+parentInfo.parent_invite_people_num:' '+0}}</span>
							<span>人</span>
						</P> -->
					</view>
				</view>
			</view>

		</view>

		<u-popup :show="userInfoPopup" mode="center" round="24rpx" @close="userInfoPopup = false">
			<view class="userInfoPopup">
				<!-- 关闭 -->
				<u-icon name="close-circle" size="36rpx" color="#CFCFCF" shop
					style="position: absolute;top: 32rpx;right: 32rpx;z-index: 5;"
					@click="userInfoPopup = false"></u-icon>
				<view class="userInfo">
					<u-avatar :src="parentInfo.avatar" size="96rpx"></u-avatar>
					<!-- <text>{{relationData.nickname}}</text>	 -->
				</view>

				<view class="user_code_box flex-center">
					<text>{{$t('index.inviteCode')}}: {{parentInfo.user_code}}</text>
					<image src="/static/else/copy.png" mode="heightFix" @tap="copy(parentInfo.user_code)"></image>
				</view>
				<view v-if="relationData.facebook||relationData.zalo||relationData.telegram||relationData.whatsapp">
					<view class="contact_way flex-between" v-show="relationData.facebook">
						<u-icon name="/static/Continent/fb.png" width="48rpx" height="48rpx"
							:label="relationData.facebook || '******'" label-size="28rpx" label-color="#222"></u-icon>
						<view class="copy flex-center" @click="copy(relationData.facebook)">Copy</view>
					</view>
					<view class="contact_way flex-between" v-show="relationData.zalo">
						<u-icon name="/static/Continent/zalo.png" width="48rpx" height="48rpx"
							:label="relationData.zalo || '******'" label-size="28rpx" label-color="#222"></u-icon>
						<view class="copy flex-center" @click="copy(relationData.zalo)">Copy</view>
					</view>
					<view class="contact_way flex-between" v-show="relationData.telegram">
						<u-icon name="/static/Continent/tg.jpg" width="48rpx" height="48rpx"
							:label="relationData.telegram || '******'" label-size="28rpx" label-color="#222"></u-icon>
						<view class="copy flex-center" @click="copy(relationData.telegram)">Copy</view>
					</view>
					<view class="contact_way flex-between" v-show="relationData.whatsapp">
						<u-icon name="/static/Continent/wa.jpg" width="48rpx" height="48rpx"
							:label="relationData.whatsapp || '******'" label-size="28rpx" label-color="#222"></u-icon>
						<view class="copy flex-center" @click="copy(relationData.whatsapp)">Copy</view>
					</view>
				</view>


				<view class="flex-center" v-else>
					{{$t('utils.notSetContact')}}
				</view>

				<!-- <view class="setUserInfo flex-center">
					<u-icon name="arrow-right" size="28rpx" color="#999" :label="$t('utils.setMySocialMsg')"
						labelColor="#999" labelSize="28rpx" label-pos="left"
						@click="topage('gather/mainland/rankingList/setmessage');userInfoPopup = false"></u-icon>
				</view> -->
			</view>
		</u-popup>
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
				isOnlineExam: uni.getStorageSync('isOnlineExam'),
				Todayfood: '',
				hisFood: '',
				parentInfo: {},
				userInfoPopup: false,
				relationData: {
					facebook: '',
					zalo: '',
					telegram: '',
					whatsapp: ''
				},
				shareLink: '',
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
		},
		onLoad() {
			this.shop_invitedNums()
		},
		onShow() {
			this.getPageUrl();
		},
		methods: {
			myFriend() {
				this.topage('general/invite/myFriend_all')
			},
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
				if (!uni.is_online) {
					if (uni.conf.companycode == 60) {
						this.shareLink = 'https://h5vn02.yygogogo.com/share.html'
					} else {
						this.shareLink = 'https://h5vn.yygogogo.com/share.html'
					}
				}
				let companycode = uni.getStorageSync('CompanyCode')
				uni.setStorage({
					key: "pay_url",
					data: `${this.shareLink}?token=` + uni.getStorageSync(
							'jwt') +
						'&company_code=' + companycode + '&lang=' + lang + '&user_code=' +
						user_code,
					success: () => {
						this.topage("general/web/index");
					}
				})
			},
			relation() {
				this.userInfoPopup = true
			},
			async shop_invitedNums() {
				let {
					data: result
				} = await uni.ajax.shop_invitedNums();
				if (result) {
					console.log(result)
					this.Todayfood = result.today;
					this.hisFood = result.total;
					this.parentInfo = result.parent_user_info;
					if (result.parent_user_info.agent_info && Object.keys(result.parent_user_info.agent_info).length >
						0) {
						const {
							facebook,
							zalo,
							telegram,
							whatsapp
						} = result.parent_user_info.agent_info;

						this.relationData = {
							facebook,
							zalo,
							telegram,
							whatsapp
						};
					}


				}
			}
		}
	}
</script>

<style lang="scss" scped>
	.share {
		.header {
			width: 750rpx;
			height: 460rpx;
			background: url('/static/Continent/topback2.png') no-repeat;
			background-size: 100% 100%;
			padding-top: var(--status-bar-height);
			box-sizing: border-box;

			.back {
				height: 88rpx;
				padding-left: 32rpx;
			}

			.invite_tip {
				font-size: 54rpx;
				padding-left: 40rpx;
				color: #E6DDB6;
				font-weight: bold;
				margin-top: 60rpx;
				//background: red;

				p {
					margin-top: 20rpx;
				}
			}
		}

		.content {
			padding: 24rpx 32rpx;

			.award {
				// height: 316rpx;
				padding: 32rpx;
				background-color: #fff;
				border-radius: 12rpx;
				box-sizing: border-box;
				margin-bottom: 24rpx;

				.title {
					margin-bottom: 20rpx;

					>text {
						font-size: 32rpx;
						//font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 600;
						color: #222222;
					}
				}

				.hint {
					font-size: 28rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-bottom: 32rpx;
				}

				.awardList {
					display: flex;

					.award_item {
						.award_num {
							font-size: 24rpx;
							//font-family: DIN-Medium, DIN;
							font-weight: 500;
							color: #222222;
							margin-bottom: 12rpx;
							// background: red;

							>text {
								font-size: 38rpx;
								line-height: 36rpx;
							}
						}

						.award_title {
							font-size: 30rpx;
							//font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}
				}
			}

			.invite_entrance {
				border-radius: 12rpx;
				background-color: #fff;
				padding: 32rpx;
				box-sizing: border-box;

				.my_friend {
					font-size: 32rpx;
					//font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #222222;
				}

				.invite_btn {
					height: 96rpx;
					background: var(--linear-gradient-theme);
					box-shadow: var(--btn-shadow);
					border-radius: 8rpx;
					font-size: 32rpx;
					//font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					margin-top: 32rpx;
				}
			}

			.myOneTeam {
				width: 100%;
				height: 160rpx;
				background: #fff;
				margin-top: 20rpx;
				border-radius: 10rpx;
				padding: 0 20rpx;
				border-bottom: none;

				.oneTeamLeader {
					font-size: 28rpx;

					p:nth-child(2) {
						font-size: 24rpx;
						color: #666;
					}
				}

				.avatar {
					width: 400rpx;
					height: 90rpx;
					//background: red;

					view {
						image {
							width: 70rpx;
							height: 70rpx;
							border-radius: 50%;
							margin-right: 10rpx;
						}
					}

					.avatar_info {
						width: unset;
						height: 75rpx;
						font-size: 24rpx;
						//background: blue;


						p:nth-child(1) {
							font-size: 24rpx;

						}

						p:nth-child(2) {
							font-size: 20rpx;
							color: #666;

							span:nth-child(2) {
								color: #333;
							}


						}

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
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #222222;
				}
			}

			.user_code_box {
				width: 100%;
				height: 60rpx;
				//background: red;
				margin-bottom: 40rpx;

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
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}

			}

			.setUserInfo {
				margin-top: 40rpx;
			}

		}
	}
</style>