<template>
	<view class="poster">
		<canvas style="width: 340px;height: 600px;position: fixed;left:9999px;" canvas-id="firstCanvas"
			id="firstCanvas"></canvas>
		<image class="poster_img" :src="canvas_src" mode="" @longpress="longpress"></image>
	</view>
</template>

<script>
	import QR from "@/basic_toys/getQrcode.js";
	export default {
		data() {
			return {
				qrcode: '',
				width: 340,
				height: 600,
				canvas_src: '',
				is_wx: false
			}
		},
		onLoad() {
			this.set_jscode();
			// #ifdef H5
			this.is_wx = uni.utils.is_wx();
			// #endif
		},
		onReady() {
			this.drawStart()
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			get_appInfo() {
				return this.$store.getters.get_appInfo;
			},
		},
		methods: {
			longpress() {
				// #ifdef APP-PLUS
				uni.saveImageToPhotosAlbum({
					filePath: this.canvas_src,
					success: function() {
						uni.showToast({
							title: '已保存至相册',
							icon: 'none'
						});
					}
				});
				// #endif
				// #ifdef H5
				try {
					if (plus) {
						this.down_png(this.canvas_src)
					}
				} catch (e) {
					//TODO handle the exception
					uni.downloadFile({
						url: this.canvas_src, //仅为示例，并非真实的资源
						success: ele => {
							if (ele.statusCode === 200) {
								var link = document.createElement('a');
								link.download = 'download.png';
								link.href = ele.tempFilePath;
								document.body.appendChild(link);
								link.click();
								link.remove();
							}
						}
					});
				}
				// #endif
			},
			// 生成分享二维码
			set_jscode() {
				let img = QR.createQrCodeImg(uni.conf.pageUrl + '#/pages/general/register/index?user_code=' + this.user_info
					.user_code, {
						size: parseInt(300) //二维码大小
					});
				this.qrcode = img;
			},
			// 获取照片信息
			async getImageInfo(src) {
				return await new Promise((resolve, reject) => {
					console.log(src, '')
					uni.getImageInfo({
						src: src,
						success: res => {
							resolve(res.path)
						},
						fail: err => {
							reject(err)
						}
					})
				})
			},
			async drawStart() {
				uni.showLoading({
					title: '生成中'
				})
				if (this.canvas_src) return
				let ctx = uni.createCanvasContext('firstCanvas', this);
				// console.log(ctx)
				// ctx.setFillStyle('#4782C7'); //绘制背景
				// ctx.fillRect(0, 0, this.width, this.height);
				let bgImg = await this.getImageInfo('/static/else/share_bg.png');
				ctx.drawImage(bgImg, 0, 0, this.width, this.height); //参数 图片地址 x坐标y坐标  宽度 高度

				ctx.setFillStyle('#fff');
				this.drawRoundedRect(this.Rect(0, 504, 340, 96), 8, ctx, '#fff', true);
				ctx.fill(); // 开始填充

				// console.log(this.get_appInfo.logo,'---------------')
				// let logo = await this.getImageInfo(this.get_appInfo.logo);
				let logo = await this.getImageInfo('/static/logo.png');
				ctx.drawImage(logo, 12, 523, 58, 58); //参数 图片地址 x坐标y坐标  宽度 高度


				ctx.setFillStyle('#222'); // 文字颜色
				ctx.font = `${16}px bold PingFang`; // 文字类型
				ctx.fillText(`邀请码：${this.user_info.user_code}`, 78, 542); //参数 文字 left top
				// this.drawRoundedRect(this.Rect(130, 381, 56, 19), 9, ctx, '#fff', false)
				ctx.font = '12px PingFang'
				ctx.fillText('邀请好友一起组队挖宝石！', 78, 568);

				this.drawRoundedRect(this.Rect(228, 465, 100, 100), 8, ctx, '#fff', true);

				let qrCode = await this.getImageInfo(this.qrcode)
				ctx.drawImage(qrCode, 236, 473, 85, 85);
				ctx.setFillStyle('#222'); // 文字颜色
				ctx.fillText('微信扫一扫下载', 236, 575);

				ctx.draw(true, () => {
					setTimeout(() => {
						console.log('画图完毕')
						this.createPoster('firstCanvas', (res) => {
							uni.hideLoading()
							console.log('地址', res)
							this.canvas_src = res;
							if (!res) {
								uni.$u.toast('生成失败，请稍后再试')
							}
						})
					}, 300)
				})
			},
			Point(x, y) {
				return {
					x: x,
					y: y
				}
			},
			drawRoundedRect(rect, r, ctx, color = '#000', isFill = true) {

				var ptA = this.Point(rect.x + r, rect.y);
				var ptB = this.Point(rect.x + rect.width, rect.y);
				var ptC = this.Point(rect.x + rect.width, rect.y + rect.height);
				var ptD = this.Point(rect.x, rect.y + rect.height);
				var ptE = this.Point(rect.x, rect.y);

				ctx.beginPath();

				ctx.moveTo(ptA.x, ptA.y);
				ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r)
				ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r)
				ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r)
				ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r)

				ctx.setFillStyle(color)

				if (isFill) {
					ctx.fill()
				} else {
					ctx.strokeStyle = color;
				}
				// ctx.stroke();

			},
			Rect(x, y, w, h) {
				return {
					x: x,
					y: y,
					width: w,
					height: h
				}
			},
			//生成海报图片(分享所需图片)
			createPoster(canvasId, callback) {
				var that = this;
				// let scaleRatio= uni.getSystemInfoSync().scaleRatio
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					// width: winWidth * scaleRatio,
					// height: Math.round(winHeight * scaleRatio),
					// destWidth: winWidth * scaleRatio,
					// destHeight: Math.round(winHeight) * scaleRatio,
					canvasId: canvasId,
					fileType: 'png',
					quality: 1,
					success: function(res) {
						callback && callback(res.tempFilePath)
					},
					fail(err) {
						console.log(err)
						callback && callback(false)
					}
				})
			},
			down_png(base64) {
				var bitmap = new plus.nativeObj.Bitmap("test");
				let that = this;
				bitmap.loadBase64Data(base64, function() {
					bitmap.save("_doc/" + new Date().getTime() + ".jpg", {
						overwrite: true,
						quality: 1
					}, function(i) {
						that.savePicture(i.target)
					}, function(e) {
						uni.showToast({
							title: "下载失败"
						});
					});
				}, function(e) {
					uni.showToast({
						title: "下载失败"
					});
				});
			},
			savePicture(tempFilePath) {
				plus.gallery.save(tempFilePath, function(e) {
					uni.showToast({
						title: "下载成功，请到相册查看"
					});
				}, function(e) {
					uni.showToast({
						title: "下载失败"
					});

				})
			}
		}
	}
</script>

<style>
	page {
		background: #161616;
	}
</style>
<style scoped lang="scss">
	.poster {
		padding: 24rpx 36rpx;

		.poster_img {
			width: 680rpx;
			height: 1200rpx;
		}
	}
</style>