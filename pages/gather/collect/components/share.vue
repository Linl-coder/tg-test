<template>
	<view class="flex-center share-box" :style="bg_style">
		<div class="share flex-center">
			<div class="share_box flex-center" :style="{ width: width + 'px', height: img_height + 'px' }">
				<canvas :style="{ width: width + 'px', height: img_height + 'px' }" canvas-id="firstCanvas" id="firstCanvas"></canvas>
				<image :src="share_img" v-if="is_wx" mode="" class="canvas-img" :style="{ width: width + 'px', height: img_height + 'px' }"> </image>
			</div>
			<div class="flex-around btn_group_" v-show="img_height != ''">
				<div class="btn_item flex-colum" @tap="close()">
					<div class="btn_box flex-center"><u-icon name="close" color="#fff" size="20"></u-icon></div>
					<text class="t">关闭</text>
				</div>
				<div class="btn_item flex-colum" @tap="save_img">
					<div class="btn_box flex-center"><u-icon name="download" size="20" color="#fff"></u-icon></div>
					<text class="t">{{ is_wx ? '长按保存' : '保存图片' }}</text>
				</div>
			</div>

			<!-- <div class="close_box flex-center" @tap="close"><image src="/static/market/close.png" class="close" mode=""></image></div> -->
		</div>
	</view>
</template>

<script>
export default {
	props: {
		qrcode: {
			type: String,
			default: ''
		},
		share_bg: {
			type: String,
			default: '/static/General/invite.png'
		}
	},
	computed: {
		is_login() {
			return this.$store.getters.is_login;
		},
		user_info() {
			return this.$store.getters.get_user_info;
		}
	},
	data() {
		return {
			width: 0,
			is_wx: false,
			img_height: '',
			bg_style: {},
			share_img:""
		};
	},
	async mounted() {
		this.getElInfo();
	},
	methods: {
		async getElInfo() {
			let system = await uni.pro.getSystemInfo();
			this.bg_style = {
				height: system.windowHeight + 'px',
				width: system.windowWidth + 'px'
			};
			this.width = system.windowWidth * 0.9;
		},
		async create_share() {
			// #ifdef H5
			this.is_wx = uni.utils.is_wx();
			// #endif
			this.draw();
		},
		close() {
			this.$emit('close');
		},
		copy(type) {
			let copy_data = null;
			if (type == 1) {
				copy_data = uni.conf.baseUrl + '#/pages/general/register?user_code=' + this.user_info.user_code;
			}
			if (type == 2) {
				copy_data = this.user_info.user_code;
			}
			uni.setClipboardData({
				data: copy_data,
				success: function() {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					});
				}
			});
		},

		draw() {
			this.show = true;
			uni.showLoading({
				title: '海报生成中'
			});

			uni.getImageInfo({
				src: this.share_bg,
				success: res => {
					let imgh = null;
					this.img_height = (this.width * res.height) / res.width+150;
					imgh = this.img_height-150;
					this.$nextTick(() => {
						let ctx = uni.createCanvasContext('firstCanvas', this);

						ctx.setFillStyle('#fff'); //绘制背景
						ctx.fillRect(0, 0, this.width, this.img_height);
						ctx.drawImage(res.path, 0, 0, this.width, imgh); //参数 图片地址 x坐标y坐标  宽度 高度
						ctx.fill();

						// ctx.drawImage(require('@/static/Gather/i56.png'), 16, this.img_height - 180, this.width - 30, 140); //参数 图片地址 x坐标y坐标  宽度 高度
						// ctx.fill();
						/**
						 * 绘制邀请码
						 */

						ctx.setFillStyle('#000000'); // 文字颜色
						ctx.font = `${14}px PingFang`; // 文字类型
						ctx.fillText('我的邀请码: ' + this.user_info.user_code, 30, this.img_height - 125); //参数 文字 left top
						ctx.font = `${12}px PingFang`; // 文字类型
						ctx.fillText('嗨，我是' + this.user_info.nickname, 30, this.img_height - 95); //参数 文字 left top
						ctx.fillText('① 微信/浏览器扫码，', 30, this.img_height - 75); //参数 文字 left top
						ctx.fillText('② 下载'+getApp().globalData.appName+' APP', 30, this.img_height - 55); //参数 文字 left top
						ctx.fillText('③ 手机号登录', 30, this.img_height - 35); //参数 文字 left top
						ctx.fill();

						/**
						 * 绘制底部信息
						 */

						ctx.setFillStyle('#fff'); //绘制背景
						// ctx.fillText("扫码下载，超多卡牌等你来哦~", 24, 475); //参数 文字 left top
						// ctx.fillRect(this.width / 2 - 96 / 2, this.height - 162, 96, 96); //参数 x坐标y坐标  宽度 高度
						ctx.drawImage(this.qrcode, this.width - 120, this.img_height - 123, 90, 90); //参数 图片地址 x坐标y坐标  宽度 高度
						ctx.fill();

						/**
						 * 绘制邀请码
						 */
						ctx.setFillStyle('#fff');
						ctx.setFillStyle('#000'); // 文字颜色
						// ctx.font = `${12}px PingFang`; // 文字类型
						// ctx.fillText("长按识别二维码 ", this.width-117, this.height - 50); //参数 文字 left top
						// ctx.fill();
						setTimeout(() => {
							ctx.draw();
							uni.hideLoading();
							if (this.is_wx) {
								setTimeout(() => {
									this.save_img();
								}, 200);
							}
						}, 200);
					});
				}
			});
		},
		save_img() {
			// #ifdef APP-PLUS
			uni.showLoading({
				title: this.is_wx ? '海报生成中' : '保存中...'
			}); 
			// #endif
			uni.canvasToTempFilePath({
				fileType: 'png',
				canvasId: 'firstCanvas',
				success: res => {
					
					// #ifdef H5
					if (this.is_wx) {
						this.share_img = res.tempFilePath;

						return false;
					}
					// #endif
					uni.hideLoading();
					// #ifdef APP-PLUS
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function() {
							uni.showToast({
								title: '已保存至相册',
								icon: 'none'
							});
						}
					});
					// #endif
					// #ifdef H5

					uni.downloadFile({
						url: res.tempFilePath, //仅为示例，并非真实的资源
						success: ele => {
							if (ele.statusCode === 200) {
								console.log('下载成功');
								var link = document.createElement('a');

								link.href = ele.tempFilePath;

								link.download = 'download.png';

								link.click();
								link.remove();
							}
						}
					});

					// #endif
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.share-box {
	
	.share {
		.share_box {
			position: relative;
			border-radius: 24rpx;
			overflow: hidden;			
			.canvas-img{
				position: absolute;
				top: 0rpx;
				left: 0rpx;
			}
		}

		.share_desc {
			margin-top: 30rpx;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 33rpx;
		}

		.close_box {
			.close {
				width: 64rpx;
				height: 64rpx;
			}
		}

		.btn_group_ {
			margin-top: 30rpx;
			width: 100%;

			.btn_item {
				.btn_box {
					width: 92rpx;
					height: 92rpx;
					border-radius: 100%;
					background: url('@/static/else/old01.png') no-repeat 100%;

					margin-bottom: 15rpx;

					.icon {
						width: 48rpx;
						height: 48rpx;
					}
				}

				.t {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
