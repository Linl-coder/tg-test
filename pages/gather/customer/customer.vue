<template>
	<view class="index">
		<view class="middle_box  ">
			<view class="middle_box_top flex-colum">
				<view class="head_box ">
					<view class="head_box_inner flex-start">
						<view class="imgBox">
							<image src="/static/else/pte_icon.png" mode="heightFix"></image>
						</view>
						<view class="textBox flex-between">

							<text>{{arrList[0].code}}</text>
							<image src="/static/else/copy.png" @tap="copy(arrList[0].code)" class="copy" mode="">

								<!-- <p>群号:6268676667</p> -->
						</view>
					</view>
				</view>
				<view class="codeBox flex-center">
					<w-qrcode @press="longtap" v-for="(item,index) in arrList" :key="index" :options="item" ref="qrcode"
						@generate="hello"></w-qrcode>
				</view>
			</view>

			<view class="mailbox flex-center">
				<text>{{$t('index.customerAccount')}}：{{arrList[0].mailbox}}</text>
				<image src="/static/else/copy.png" @tap="copy(arrList[0].mailbox)" class="copy" mode="">
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				arrList: [{
					code: '',
					mailbox: '',
					size: 430, // 二维码大小
				}]
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('index.customerCenter')
			})
			this.public_getCustomerInfo();
		},
		methods: {
			longtap(e) {
				console.log(e)
			},
			async public_getCustomerInfo() {
				//console.log("appPackageName", uni.conf.appPackageName);
				let res = await uni.ajax.public_getCustomerInfo();
				//console.log("info==>", res);
				if (res.code == 200) {
					this.arrList[0].mailbox = res.data.customer_service_email;
					this.arrList[0].code = res.data.customer_service_link;
				}


			},
			hello(res) {
				try {
					// console.log(321, res)
				} catch (e) {}
			},
			async saveCode() { //手动触发获取图片
				const res = await this.$refs.qrcode.GetCodeImg();
				// console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		width: 100%;
		min-height: calc(100vh - 100rpx);
		//background: red;

		.middle_box {
			width: 600rpx;
			height: 700rpx;


			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.middle_box_top {
				width: 100%;
				height: 100%;
				border-radius: 40rpx;
				background: #fff;

				.head_box {
					width: 100%;
					height: 150rpx;
					//background: red;
					padding: 0 40rpx;


					.head_box_inner {
						width: 100%;
						height: 150rpx;
						gap: 20rpx;
						// background: red;
						border-bottom: 1px dashed #BBBBBB;

						.imgBox {

							image {
								height: 90rpx;
								border-radius: 50%;
							}
						}

						.textBox {
							width: 400rpx;
							height: 90rpx;

							text {
								font-size: 22rpx;
							}

							image {
								width: 24rpx;
								height: 24rpx;
								// border-radius: 50%;
							}

							//background: red;
							// p:nth-child(1) {
							// 	font-size: 32rpx;
							// 	color: #333333;
							// }

							// p:nth-child(2) {
							// 	font-size: 20rpx;
							// 	color: #999999;
							// }
						}
					}


				}

				.codeBox {
					width: 100%;
					height: 600rpx;
					//background: red;
				}
			}

			.mailbox {
				margin-top: 40rpx;
				font-size: 26rpx;
				gap: 20rpx;

				image {
					width: 24rpx;
					height: 24rpx;
				}
			}




		}




	}
</style>