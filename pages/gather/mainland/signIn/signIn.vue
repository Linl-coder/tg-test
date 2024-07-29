<template>
	<view class="container">
		<view class="head_gemNum_box flex-between">
			<view class="signGem_num flex-between">
				<image src="/static/else/gem1.png" mode="heightFix"> </image>
				<text>{{userSignInfo.food_num}}</text>
			</view>
			<view class="sign_record" @tap="topage('gather/mainland/signIn/signRecord')">
				{{$t('signIn.record')}}
			</view>
		</view>
		<view class="sign_middle_box flex-colum-evenly">
			<view class="signGetGem_box flex-center">
				<view class="signGetGem_box_inner flex-center">
					<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
					<text class="bold">{{is_valid_user==1?ad_sign_gem_num:free_ad_sign_food_num}}</text>
				</view>
			</view>
			<view class="sign_btn_box flex-center">
				<view class="sign_btn flex-center color_w gray_bg"
					v-if="user_sign_num>=free_ad_take_day_num && is_valid_user!=1">
					<text>{{$t('signIn.isLimit')}}</text>
				</view>
				<view class="" v-else>
					<view :class="['sign_btn', 'flex-center', 'color_w',  'orange_bg' ]"
						v-if="!userSignInfo.today_is_sign">
						<p v-if="userSignInfo.today_view_ad_num<maxSee" @click="openVideo" class="flex-center">
							{{$t('signIn.seeAds')}}（{{userSignInfo.today_view_ad_num}}/{{is_valid_user==1?sign_view_ad_times_num:free_sign_view_ad_times_num}}）
							{{$t('signIn.getSignReward')}}
						</p>
						<p v-else class="flex-center" @click="confirmUse">{{$t('signIn.getSignRewardNow')}}</p>
					</view>
					<view :class="['sign_btn', 'flex-center', 'color_w',  'gray_bg' ]" v-else>
						<text>{{$t('signIn.todayHaveSigned')}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="haveSignInfo_box flex-center">
			<view v-for="(item,index) in avatatList" :key="index">
				<view class="imgItem">
					<image :src="item.avatar?handleImgUrl(item.avatar):'/static/else/avatar.png'"></image>
				</view>
			</view>
			<view class="haveSignNum flex-center">
				<text v-show="userSignInfo.today_is_sign">{{$t('signIn.todayHaveSign')}}</text>
			</view>
		</view>
		<view class="sign_rules flex-colum-evenly">
			<view class="title flex-start">
				<text>{{$t('signIn.signRulesIntro')}}</text>
			</view>
			<view class="list flex-colum-evenly">
				<li>{{$t('signIn.rule1')}}</li>
				<li>{{$t('signIn.rule2')}}</li>
				<li>{{$t('signIn.rule3')}}</li>
			</view>
		</view>
	</view>
</template>

<script>
	import debounce from 'lodash/debounce';
	export default {
		data() {
			return {
				userSignInfo: {
					food_num: '',
					today_view_ad_num: 0,
					today_sign_people_num: 0,
					today_is_sign: 2
				},
				is_valid_user: 1,
				user_sign_num: '',
				free_ad_take_day_num: "",
				ad_sign_gem_num: '',
				sign_view_ad_times_num: 3,
				free_sign_view_ad_times_num: 3,
				free_ad_sign_food_num: '',
				avatatList: [],
				free_videoList: [],
				videoList: [],
				lastTime: '',
				maxSee: ''
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('signIn.signInTitle')
			})
			this.public_getUserSignInfo();
			// this.public_getSignConfig();
		},
		methods: {
			confirmUse: debounce(function() {
				// 要实现的业务逻辑
				this.getSignReward();
			}, 2000, {
				leading: true,
				trailing: false
			}),
			testToast() {
				// #ifdef APP-PLUS
				plus.nativeUI.toast("<font style=\"color:#FFFFFF;font-size:18px;\">" + this.$t('signIn.todaySignSuccess') +
					"</font>", {
						type: 'richtext',
						duration: 'long',
						verticalAlign: 'center',
						background: '#333333',
						richTextStyle: {
							align: 'center'
						}
					});
				// #endif
			},
			async public_getSignConfig() {
				let res = await uni.ajax.public_getSignConfig();
				if (res.code == 200) {
					this.ad_sign_gem_num = res.data.ad_sign_food_num;
					this.free_ad_sign_food_num = res.data.free_ad_sign_food_num
					this.sign_view_ad_times_num = res.data.sign_view_ad_times_num
					this.free_sign_view_ad_times_num = res.data.free_sign_view_ad_times_num
					this.free_ad_take_day_num = res.data.free_ad_take_day_num
					this.videoList = JSON.stringify(res.data.sign_view_ad_resource_list)
					this.free_videoList = JSON.stringify(res.data.free_sign_view_ad_resource_list)
					this.maxSee = this.is_valid_user == 1 ? res.data.sign_view_ad_times_num : res.data
						.free_sign_view_ad_times_num
				}
			},
			async public_getUserSignInfo() {
				let res = await uni.ajax.public_getUserSignInfo();
				if (res.code == 200) {
					this.userSignInfo.food_num = res.data.food_num;
					this.userSignInfo.today_view_ad_num = res.data.today_view_ad_num;
					this.userSignInfo.today_sign_people_num = res.data.today_sign_people_num;
					this.userSignInfo.today_is_sign = res.data.today_is_sign;
					this.avatatList = res.data.today_sign_user_list;
					this.user_sign_num = res.data.user_sign_num
					this.is_valid_user = res.data.is_valid_user
					this.public_getSignConfig()
					while (this.avatatList.length < 10) {
						this.avatatList.push({
							avatat: '/static/else/avatar.png'
						});
					}
				}
			},
			async getSignReward() {
				let res = await uni.ajax.public_hanleSignIn();
				if (res.code == 200) {
					// #ifdef H5
					uni.showToast({
						title: this.$t('signIn.todaySignSuccess'),
						icon: 'success'
					})
					// #endif
					// #ifdef APP-PLUS
					plus.nativeUI.toast("<font style=\"color:#FFFFFF;font-size:18px;\">" + this.$t(
							'signIn.todaySignSuccess') +
						"</font>", {
							type: 'richtext',
							duration: 'long',
							verticalAlign: 'center',
							background: '#333333',
							richTextStyle: {
								align: 'center'
							}
						});
					// #endif
					this.userSignInfo.food_num = this.userSignInfo.food_num + this.ad_sign_gem_num
					this.public_getUserSignInfo();
				}
			},
			openVideo() {
				let list = []
				if (this.is_valid_user == 1) {
					list = this.videoList
				} else {
					list = this.free_videoList
				}
				this.topage(
					`gather/mainland/video?index=${this.userSignInfo.today_view_ad_num}&videoList=${list}`);
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 隐藏标题栏 */
	.uni-page {
		padding-top: 0 !important;
	}

	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.container {
		width: 100%;
		min-height: calc(100vh - 100rpx);
		padding: 20rpx 40rpx;
		//background: red;
	}

	.head_gemNum_box {
		.signGem_num {
			width: unset;
			padding: 10rpx 10rpx;
			border-radius: 30rpx;
			background: #313131;

			image {
				height: 45rpx;
			}

			text {
				color: #fff;
				font-size: 30rpx;
			}
		}
	}

	.sign_middle_box {
		width: 100%;
		height: 400rpx;
		background: #fff;
		margin-top: 40rpx;

		.signGetGem_box {

			.signGetGem_box_inner {
				width: 250rpx;
				height: 120rpx;
				background: url('/static/else/signGem_bg.png');
				@include backImg();
				gap: 10rpx;

				image {

					height: 60rpx;
				}

				text {
					font-size: 62rpx;
					color: #333333;
				}
			}
		}

		.sign_btn_box {
			.sign_btn {
				width: 630rpx;
				height: 105rpx;
				// background: url('/static/btn/sign_btn.png');
				// @include backImg();

				border-radius: 60rpx;
				font-size: 34rpx;
				font-weight: bold;
				letter-spacing: 1rpx;

				p {
					width: 100%;
					height: 100%;
					//background: blue;
				}
			}

			.gray_bg {
				background: linear-gradient(to right, #ececec 0%, #b1b1b1 100%);
			}

			.orange_bg {
				background: linear-gradient(to right, #FD904D 30%, #FD6939 100%);
			}

		}


	}



	.haveSignInfo_box {
		width: 100%;
		height: 200rpx;
		background: #fff;
		margin-top: 30rpx;

		.imgItem {
			//background: red;

			image {
				width: 58rpx;
				height: 56rpx;
				border-radius: 50%;
				margin-right: -10rpx;
			}
		}


		.haveSignNum {
			width: 100%;
			/* #ifdef H5 */
			margin-top: 20rpx;
			/* #endif */
			/* #ifdef APP-PLUS */
			margin-top: -40rpx;
			/* #endif */
			font-size: 26rpx;
			//background: blue;
		}

	}

	.sign_rules {
		width: 100%;
		height: 300rpx;
		margin-top: 30rpx;
		//background: red;

		.title {
			color: #333333;
			font-weight: 500;

		}

		.list {
			width: 100%;
			height: 240rpx;
			font-size: 26rpx;
			color: #666666;
			letter-spacing: 1rpx;
			//background: yellow;
		}
	}
</style>