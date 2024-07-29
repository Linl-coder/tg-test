<template>
	<view class="">
		<u-popup :show="show" round="16">
			<view class="menu flex-start">
				<view class="menu_item flex-colum" @tap="click(1)">
					<image src="/static/community/i3.png" class="icon" mode=""></image>
					<text class="t1">分享好友</text>
				</view>
				<view class="menu_item flex-colum" @tap="click(2)">
					<image src="/static/community/i4.png" class="icon" mode=""></image>
					<text class="t1">分享朋友圈</text>
				</view>
				<view class="menu_item flex-colum" @tap="click(3)">
					<image src="/static/community/i5.png" class="icon" mode=""></image>
					<text class="t1">群聊</text>
				</view>
				<view class="menu_item flex-colum" @tap="copy_link()">
					<image src="/static/community/i6.png" class="icon" mode=""></image>
					<text class="t1">复制链接</text>
				</view>
				<view class="menu_item flex-colum" @tap="community_zan">
					<image src="/static/community/i7.png" class="icon" mode=""></image>
					<text class="t1">{{this.isFollow==1?'已关注':'关注'}}</text>
				</view>
				<!-- <view class="menu_item flex-colum" @tap="click(5)">
					<image src="/static/community/i8.png" class="icon" mode=""></image>
					<text class="t1">举报</text>
				</view> -->
			</view>
			<view class="btn flex-center" @tap="close">
				<text class="btn_t">关闭</text>
			</view>
		</u-popup>

		<view class="share-box" v-if="showshare">
			<share ref="share" @close="closeshare" :share_text="share_text" :qrcode="qrcode"></share>
		</view>

	</view>
</template>

<script>
	import QR from "@/basic_toys/getQrcode.js";
	import share from '@/pages/society/components/share.vue';
	export default {
		components: {
			share
		},
		data() {
			return {
				show: false,
				id: "",
				article_id: "",
				showshare: false,
				qrcode: "",
				share_text: "",
				isFollow: 0
			}
		},
		methods: {
			openshare() {
				this.showshare = true;
				this.$nextTick(() => {
					this.$refs.share.create_share();
				})
			},
			closeshare() {
				this.showshare = false;
			},
			set_jscode() {
				this.show = false;
				let img = QR.createQrCodeImg(uni.conf.baseUrl + '#/pages/society/deatils?id=' + this.article_id +
					'&type=share', {
						size: parseInt(300) //二维码大小
					});
				this.qrcode = img;
				this.openshare();
			},
			copy_link() {
				this.copy(uni.conf.baseUrl + '#/pages/society/deatils?id=' + this.article_id + '&type=share');
			},
			click() {
				this.set_jscode();
			},
			close() {
				this.show = false;
			},
			open(item) {
				this.id = item.uuid;
				this.article_id = item.id;
				this.share_text = item.desc.replace("\n", "");
				this.isFollow = item.user.isFollow;
				this.show = true;
			},
			async community_zan(index) {
				let res = await uni.ajax.community_zan({
					forum_id: this.id,
					type: 2
				})
				if (res) {
					uni.showToast({
						title: "操作成功",
						icon: "none"
					})

				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.share-box {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0rpx;
		top: 0rpx;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.5);
	}

	.menu {
		padding-top: 30rpx;
		flex-wrap: wrap;
		border-radius: 24rpx 24rpx 0rpx 0rpx;

		.menu_item {
			margin: 16rpx 0rpx;
			width: 25%;
			border: 0rpx;
			padding: 0rpx;

			.icon {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 24rpx;
			}

			.t1 {
				font-size: 28rpx;

			}
		}
	}

	.btn {
		margin-top: 30rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		height: 100rpx;

		.btn_t {
			font-size: 30rpx;
		}
	}
</style>