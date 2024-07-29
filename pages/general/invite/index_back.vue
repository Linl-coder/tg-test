<template>
	<view>
		<!-- 打卡完成的图片展示 -->
		<view class="share animated">
			<image class="image2" src="../../static/img/cha.png"></image>
			<view style="height: 180rpx;"></view>
			<!-- id为htmlCanvas是需要截取保存的图片 -->
			<view class="image" id="htmlCanvas">
				<view class="text">
					<view class="yanyu">落花人独立。微雨燕雙飞。</view>
				</view>
				<view class="author">燕子齐</view>
				<view style="width: 361rpx;"></view>
			</view>
			<!-- 下载图片 -->
			<image @click="renderScript.emitData" class="image3" src="../../static/img/xiazai.png"></image>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {}
		},
		methods: {
			// 关闭图片展示
			closedShare() {},
			receiveRenderData(val) {
				uni.showLoading({
					title: "下载中"
				})
				let that = this
				let base64 = val
				const bitmap = new plus.nativeObj.Bitmap("test");
				bitmap.loadBase64Data(base64, function() {
					const url = "_doc/" + new Date().getTime() + ".png"; // url为时间戳命名方式
					bitmap.save(url, {
						overwrite: true, // 是否覆盖
						// quality: 'quality'  // 图片清晰度
					}, (i) => {
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								uni.hideLoading()
								uni.showToast({
									title: '图片保存成功',
									icon: 'none'
								})
								bitmap.clear()
							}
						});
					}, (e) => {
						uni.hideLoading()
						uni.showToast({
							title: '图片保存失败',
							icon: 'none'
						})
						bitmap.clear()
					});
				}, (e) => {
					uni.hideLoading()
					uni.showToast({
						title: '图片保存失败',
						icon: 'none'
					})
					bitmap.clear()
				});
			},
		}
	}
</script>
<script module="renderScript" lang="renderjs">
	import html2canvas from '@/util/html2canvas.js';
	export default {
		data() {
			return {

			}
		},
		mounted() {},
		methods: {
			// 发送数据到逻辑层
			emitData(e, ownerVm) {
				const dom = document.getElementById('htmlCanvas')
				html2canvas(dom, {
					width: dom.clientWidth, //dom 原始宽度
					height: dom.clientHeight,
					scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
					scrollX: 0,
					dpi: 300,
					useCORS: true, //支持跨域，但好像没什么用
					allowTaint: false
				}).then((canvas) => {
					// 将生产的canvas转为base64图片3
					ownerVm.callMethod('receiveRenderData', canvas.toDataURL('image/png'))
				});

			}
		}
	};
</script>

<style lang="scss" scoped>
	.share {
		height: 100vh;

		display: flex;
		flex-direction: column;
		align-items: center;

		// position: absolute;
		// z-index: 999;
		.image {
			width: 722rpx;
			height: 552rpx;
			padding: 36rpx 36rpx;
			box-sizing: border-box;

			background: url('../../static/img/crad_img.png');
			background-size: 100% 100%;

			box-shadow: 0 6rpx 13rpx 0 rgba(0, 0, 0, 0.08);
			position: relative;
		}

		.m-t-88 {
			margin-top: 162rpx;
		}

		.image2 {
			position: absolute;
			top: 60rpx;
			right: 40rpx;
			width: 44rpx;
			height: 44rpx;
		}

		.image3 {
			position: absolute;
			left: 50%;
			bottom: 150rpx;
			transform: translate(-50%);
			width: 132rpx;
			height: 132rpx;
		}

		.flex-center {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.text {
			width: 361rpx;

			font-size: 32rpx;
			font-weight: 900;
			color: #414141;
			line-height: 50rpx;
			writing-mode: vertical-lr;
			letter-spacing: 6rpx;

			display: flex;
			flex-direction: column;

			.yanyu {
				height: 192rpx;
			}
		}

		.author {
			font-size: 32rpx;
			font-weight: 900;
			color: #414141;
			line-height: 50rpx;
			writing-mode: vertical-lr;
			letter-spacing: 6rpx;

			position: absolute;
			bottom: 36rpx;
			right: 53%;
		}
	}
</style>