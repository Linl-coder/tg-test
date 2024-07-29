<template>
	<view class="base_container">
		<view class="download_container  flex-colum">
			<!-- <view class="download_url flex-center">
				<p>{{`${baseUrl}/space.apk`}}</p>
				<image src="/static/else/copy.png" @tap="copy(`${baseUrl}/space.apk`)" class="copy" mode=""></image>
			</view> -->
			<!-- 网页测试邀请关系时使用  实际应该生成二维码下载apk后绑定邀请关系-->
			<view class="download_url1 flex-center">
				<p>{{`https://****?user_code=${user_code}`}}</p>
				<li class="flex-center" @tap="copy(`${h5Url}#/pages/general/register/index?user_code=${user_code}`)">
					{{$t('download.copyInviteUrl')}}
				</li>
				<!-- <image src="/static/else/copy.png"
					@tap="copy(`${h5Url}/#/pages/general/register/index?user_code=${user_code}`)" class="copy" mode="">
				</image> -->
			</view>
			<view class="download-item flex-center">
				<a :href="`${baseUrl}/PTE.apk`" class="download-link flex-center">
					<image src="../../../static/else/apk.png" alt="APK Icon" mode="" class="download-icon"></image>
					<span class="download-text">Android {{$t('download.download')}}</span>
				</a>
			</view>
			<view class="download-item flex-center">
				<a :href="`${baseUrl}/PTE.mobileconfig`" class="download-link flex-center">
					<image src="../../../static/else/apple-logo.png" alt="APK Icon" mode="" class="download-icon">
					</image>
					<span class="download-text">ios {{$t('download.download')}}</span>
				</a>
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
				baseUrl: "",
				h5Url: "",
				user_code: ""
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			is_login() {
				return this.$store.getters.is_login;
			},

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('download.downloadPage')
			})
			this.baseUrl = uni.conf.baseUrl;
			console.log("baseUrl", this.baseUrl);
			this.h5Url = uni.is_online ? 'https://internalver.phattai88.net/' : 'https://h5vn.yygogogo.com/';
			if (this.is_login) {
				this.user_code = this.user_info.user_code;
				console.log("inviteCode", this.inviteCode);
			} else {
				console.log("邀请好友页面 未登录===>");
				this.topage('general/login/index');
			}
		}

	}
</script>

<style lang="scss" scped>
	.base_container {
		.download_container {
			width: 100%;
			height: 400rpx;
			gap: 40rpx;
			//background: red;

			.download_url {
				p {
					font-size: 28rpx;
				}

				.copy {
					margin-left: 20rpx;
					width: 24rpx;
					height: 24rpx;
				}
			}

			.download_url1 {
				p {
					font-size: 26rpx;
				}

				// button {
				// 	font-size: 26rpx;
				// 	height: 60rpx;
				// 	margin-left: 8rpx;
				// 	color: #fff;
				// 	background: #000;
				// }
				li {
					font-size: 26rpx;
					height: 60rpx;
					margin-left: 8rpx;
					color: #fff;
					background: #000;
					padding: 0 10rpx;
					border-radius: 10rpx;
				}

				.copy {
					margin-left: 20rpx;
					width: 24rpx;
					height: 24rpx;
				}
			}

			.download-item {
				width: 370rpx;
				//background: blue;

				.download-link {
					width: 100%;
					padding: 10rpx;
					text-decoration: none;
					color: #333;
					border-radius: 8px;
					box-shadow: 0 2px 4px rgba(16, 13, 13, 0.2);


					image {
						width: 60rpx;
						height: 65rpx;
					}


				}
			}



		}
	}
</style>