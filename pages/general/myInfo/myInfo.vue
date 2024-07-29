<template>
	<view class="index">
		<view class="info_item myInfo flex-colum-evenly">
			<view class="avatar_box flex-center">
				<image :src="user_info.avatar?user_info.avatar:'/static/else/avatar.png'" mode=""></image>
			</view>
			<view class="userInfo_box flex-colum-evenly">
				<view class="flex-between">
					<view class="left flex-center">
						<image src="/static/myInfo/1.png" mode="heightFix"></image>
						<text>{{user_info.nickname}}</text>
					</view>
					<view class="right flex-center color_w">
						<p @click="goEditPage('nickname')">{{$t('index.edit')}}</p>
					</view>
				</view>
				<!-- <view class="flex-between" v-if="user_info.is_agent==1 && !isOnlineExam">
					<view class="left flex-center">
						<image src="/static/user_func1/dl.png" mode="heightFix"></image>
						<text>{{$t('index.agentLevel')}}</text>
					</view>
					<view class="right flex-center color_w" style="margin-right: 20rpx;color: #000;font-weight: bold;">
						<text>{{myAgentLevel}}</text>
					</view>
				</view> -->
				<view class="flex-between">
					<view class="left flex-center">
						<image src="/static/myInfo/2.png" mode="heightFix"></image>
						<text>{{user_info.mobile}}</text>
					</view>
					<view class="right flex-center color_w">
						<!-- <p>修改</p> -->
						<!-- <p @click="goEditPage('mobile')">{{$t('index.edit')}}</p> -->
					</view>
				</view>
				<view class="flex-between">
					<view class="left flex-center">
						<image src="/static/myInfo/2_1.png" mode="heightFix"></image>
						<text>{{user_info.contact_telephone||'****'}}</text>
					</view>
					<view class="right flex-center color_w">
						<!-- <p>修改</p> -->
						<p @click="goEditPage('contact_telephone')">{{$t('index.edit')}}</p>
					</view>
				</view>
				<view class="flex-between">
					<view class="left flex-center">
						<image src="/static/myInfo/3.png" mode="heightFix"></image>
						<text>{{user_info.telegram||'****'}}</text>
					</view>
					<view class="right flex-center color_w">
						<p @click="goEditPage('telegram')">{{$t('index.edit')}}</p>
					</view>
				</view>
				<view class="flex-between">
					<view class="left flex-center">
						<image src="/static/myInfo/4.png" mode="heightFix"></image>
						<text>{{user_info.whatsapp||'****'}}</text>
					</view>
					<view class="right flex-center color_w">
						<p @click="goEditPage('whatsapp')">{{$t('index.edit')}}</p>
					</view>
				</view>
				<view class="flex-between" v-show="user_info.is_agent==1">
					<view class="left flex-center">
						<image src="/static/myInfo/5.png" mode="heightFix"></image>
						<text>{{user_info.agent_address||'****'}}</text>
					</view>
					<view class="right flex-center color_w">
						<p @click="goEditPage('address')">{{$t('index.edit')}}</p>
					</view>
				</view>
			</view>
		</view>
		<view class="info_item myUpGradeInfo" v-if='showAgent'>
			<view class="title bold">
				{{$t('index.parentInfo')}}
			</view>
			<view class="avatar_box flex-start">
				<image :src="parentInfo.avatar?parentInfo.avatar:'/static/else/avatar.png'  " mode=""></image>
				<text>{{parentInfo.nickname}}</text>
			</view>
			<view class="userInfo_box flex-colum-evenly">
				<view class="flex-between">
					<view class="left flex-center">
						<image src="/static/myInfo/2_1.png" mode="heightFix"></image>
						<text>{{parentInfo.contact_telephone||"****"}}</text>
					</view>
					<view class="right flex-center color_w">
						<p @click="copy(parentInfo.contact_telephone)">{{$t('index.copy')}}</p>
					</view>
				</view>
				<view class="flex-between">
					<view class="left flex-center">
						<image src="/static/myInfo/3.png" mode="heightFix"></image>
						<text>{{parentInfo.telegram||'****'}}</text>
					</view>
					<view class="right flex-center color_w">
						<p @click="copy(parentInfo.telegram)">{{$t('index.copy')}}</p>
					</view>
				</view>
				<view class="flex-between">
					<view class="left flex-center">
						<image src="/static/myInfo/4.png" mode="heightFix"></image>
						<text>{{parentInfo.whatsapp||'****'}}</text>
					</view>
					<view class="right flex-center color_w">
						<p @click="copy(parentInfo.whatsapp)">{{$t('index.copy')}}</p>
					</view>
				</view>
			</view>
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
				isOnlineExam: uni.getStorageSync('isOnlineExam'),
				parentInfo: {
					nickname: '',
					avatar: '',
					mobile: '', //注册的手机号(真实)
					telegram: '',
					whatsapp: '',
					user_code: '',
					contact_telephone: '', //虚拟的手机号(给别人看的)
					myAgentLevel: '',
					showAgent: false
				}
			};
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			is_login() {
				return this.$store.getters.is_login;
			}
		},
		onShow() {
			if (!this.isOnlineExam) {
				this.showAgent = true
			}
			if (this.is_login) {
				this.get_user_info();
				this.public_getmyParentInfo();
			}
			if (uni.getStorageSync('myAgentLevel')) {
				this.myAgentLevel = uni.getStorageSync('myAgentLevel')
			}
			uni.setNavigationBarTitle({
				title: this.$t('index.myInfo')
			})
		},
		methods: {
			async public_getmyParentInfo() {
				let res = await uni.ajax.public_getmyParentInfo();
				if (res.code == 200) {
					this.parentInfo = res.data;
				}
			},
			goEditPage(param) {
				// console.log("param", param);
				if (param != 'nickname') {
					this.topage('gather/mainland/rankingList/setmessage?param=' + param)
				} else {
					this.topage('general/userinfo/setuserinfo?type=' + 1)
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		width: 100%;
		min-height: calc(100vh - 100rpx);
		//background: red;
		padding: 20rpx 40rpx;

		.info_item {
			width: 100%;
			// height: 550rpx;
			border-radius: 20rpx;
			background: #fff;
			margin-bottom: 40rpx;
		}

		.myInfo {
			padding: 20rpx 0;
			//background: red;
			// height: 750rpx;

			.avatar_box {
				width: 100%;
				height: 120rpx;
				//background: red;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}


			}


		}

		.myUpGradeInfo {
			// padding: 20rpx;

			.title {
				padding: 20rpx 30rpx;
				font-size: 40rpx;
			}

			.avatar_box {
				width: 100%;
				height: 100rpx;
				padding: 0 30rpx;
				//background: red;

				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}

				text {
					margin-left: 30rpx;
					font-size: 36rpx;
					color: #333333;
				}
			}
		}


		.userInfo_box {
			width: 100%;
			margin-top: 20rpx;
			// height: 470rpx;
			padding: 0 30rpx;
			//background: yellow;

			>view {
				width: 100%;
				height: 80rpx;
				background: #EBEBEB;
				padding: 0 20rpx;
				border-radius: 12rpx;
				margin-bottom: 30rpx;

				.left {

					// height: 60rpx;
					image {
						height: 60rpx;
					}

					text {
						margin-left: 20rpx;
					}
				}

				.right {
					p {
						width: unset;
						padding: 10rpx 20rpx;
						background: #64CB4B;
						border-radius: 12rpx;
					}
				}


			}
		}
	}
</style>