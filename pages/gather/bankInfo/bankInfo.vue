<template>
	<view class="bank_container">
		<!-- 中间银行卡信息部分 -->
		<view class="bankCard_info">
			<view class="bankCard_info_content">
				<ul>
					<li>
						<view>
							{{ $t('bankInfo.bank') }}
						</view>
						<view>
							<p class="flex-start">{{ bankInfo.bank_name }}</p>
							<!-- <p v-clipboard:copy="bankInfo.bank_name" v-clipboard:success="firstCopySuccess"
								v-clipboard:error="firstCopyError"> {{ $t('bankInfo.clickCopy') }}</p> -->

							<p @tap="copy(bankInfo.bank_name)">{{ $t('bankInfo.clickCopy') }}
							</p>

						</view>
					</li>
					<li>
						<view>
							{{ $t('bankInfo.bankNum') }}
						</view>
						<view>
							<p class="flex-start">{{ bankInfo.bankCode }}</p>
							<!-- <p v-clipboard:copy="bankInfo.bankCode" v-clipboard:success="firstCopySuccess"
								v-clipboard:error="firstCopyError">{{ $t('bankInfo.clickCopy') }}
							</p> -->
							<p @tap="copy(bankInfo.bankCode)">{{ $t('bankInfo.clickCopy') }}
							</p>

						</view>
					</li>
					<!-- <li>
                        <view>
                              {{ $t('bankInfo.accountOwner') }}
                        </view>
                        <view>
                            <p>{{ bankInfo.platOwnerName }}</p>
                            <p v-clipboard:copy="bankInfo.platOwnerName" v-clipboard:success="firstCopySuccess"
                                v-clipboard:error="firstCopyError">{{ $t('bankInfo.clickCopy') }}
                            </p>

                        </view>
                    </li> -->
					<li>
						<view>
							{{ $t('bankInfo.price') }}
						</view>
						<view>
							<p class="flex-start">
								<text style="font-size:24rpx;margin-right: 4rpx;"
									v-show="goods_price_type==='USD'">$</text>
								<u-icon name="/static/btn/gem-icon1.png" size='16'
									v-show="goods_price_type!=='USD'"></u-icon>
								{{bankInfo.price}}
							</p>
							<!-- 	<p v-clipboard:copy="bankInfo.price" v-clipboard:success="firstCopySuccess"
								v-clipboard:error="firstCopyError">{{ $t('bankInfo.clickCopy') }}
							</p> -->
							<p @tap="copy(bankInfo.price)">{{ $t('bankInfo.clickCopy') }}
							</p>

						</view>
					</li>
					<li>
						<view>
							{{ $t('bankInfo.notesNeed') }}
						</view>
						<view>
							<p class="flex-start">{{ bankInfo.goodsName}}</p>
							<!-- <p v-clipboard:copy="bankInfo.goodsName" v-clipboard:success="firstCopySuccess"
								v-clipboard:error="firstCopyError">
								{{ $t('bankInfo.clickCopy') }}
							</p> -->
							<p @tap="copy(bankInfo.goodsName)">{{ $t('bankInfo.clickCopy') }}
							</p>
						</view>
					</li>
				</ul>
			</view>
		</view>

		<!-- go to myOrderList -->
		<view class="bottom_btn_box flex-center">
			<button class="color_w bold"
				@tap="topage('gather/order/orderListNew?status=')">{{ $t('bankInfo.toSeeOrder') }}</button>
		</view>

		<!-- 底部的提示 -->
		<!-- <div class="bankInfo_notice">
            <ul>
                <li>
                    <div>Danh mục chú ý</div>
                    <div>Các bạn nhớ nhập nội dung ghi chú chuyển khoản, nếu không sẽ không thể nạp tiền thành công</div>

                </li>
                <li>
                    <div>Lời nhắc nhở ấm áp</div>
                    <div>Vui lòng xác nhận lại thông tin tài khoản ngân hàng của bạn, điền và thanh toán trong thời gian còn
                        hiệu lực. Nếu hết thời gian hiệu lực, vui lòng tạo mới lại đơn hàng</div>
                </li>
            </ul>
        </div> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: "",
				bank: "",
				bankInfo: {

				},
				goods_price_type: uni.getStorageSync('goods_price_type')
			}
		},
		mounted() {
			// const bankInfo = JSON.parse(this.$route.query.bankInfo);
			// const bankInfo1 = {
			// 	bank_name: "VP BANK",
			// 	bankCode: "54154154415451541444"
			// }
			// //console.log("bankInfo", bankInfo)
			// this.bankInfo = Object.assign(bankInfo, bankInfo1)
			// console.log("bankInfo", this.bankInfo)
			//this.bankInfo = bankInfo;
		},
		onLoad(option) {
			console.log("option===>", option);
			const bankInfo = JSON.parse(option.bankInfo);
			const bankInfo1 = {
				bank_name: "VP BANK",
				bankCode: "54154154415451541444"
			}
			//console.log("bankInfo", bankInfo)
			this.bankInfo = Object.assign(bankInfo, bankInfo1)
			console.log("bankInfo", this.bankInfo)

		},
		methods: {
			// finish() {
			//     this.$router.go(-1)
			// },
			// back() {
			//     this.$router.go(-1)
			// },
			//复制成功
			firstCopySuccess(e) {
				//console.log("copy arguments e:", e);
				// Toast("复制成功!");
				//Toast(this.$t('order.copySuccess'));

				uni.$u.toast(this.$t('utils.copySuccess'));

			},
			// 复制失败
			firstCopyError(e) {
				//console.log("copy arguments e:", e);
				// Toast("复制失败!");
				uni.$u.toast(this.$t('utils.copyFailed'));
			},
		}
	}
</script>

<style scoped lang='scss'>
	.bank_container {
		width: 100%;
		min-height: 100vh;
		background: #F1F2F4;

		.bankCard_info {
			height: 1000rpx;
			padding: 9px 3px 0px 3px;
			/* border: 1px solid red; */

			.bankCard_info_content {
				height: 700rpx;
				background: #fff;
				border-radius: 20rpx;
				/* border: 1px solid blue; */

				ul {
					padding: 18rpx;
					height: 100%;
					/* background: red; */

					li {
						margin-top: 30rpx;
						height: 120rpx;
						/* background: yellow; */

						& view:first-child {
							font-weight: bold;
							font-size: 28rpx;
							color: #AFADB5;
						}

						& view:last-child {
							display: flex;
							justify-content: space-between;
							margin-top: 10rpx;

							p:first-child {
								width: 60%;
								padding-left: 16rpx;
								border-radius: 20rpx;
								font-weight: bold;
								font-size: 24rpx;
								color: #1B1C21;
								background: #F3F4FD;
							}

							p:last-child {
								width: 35%;
								height: 50rpx;
								line-height: 50rpx;
								text-align: center;
								border-radius: 20rpx;
								font-weight: bold;
								font-size: 24rpx;
								color: #fff;
								box-shadow: -4px 4px 4px 0 #A4B0F0;
								background: #566ee4;
							}
						}
					}
				}
			}
		}

		.bottom_btn_box {
			width: 100%;
			height: 100rpx;
			position: fixed;
			bottom: 0;
			//background: red;

			button {
				width: 95%;
				border-radius: 16rpx;
				background: #A4B0F0;
			}
		}

		/* .bankInfo_notice {
			height: 7rem;
			border-radius: 8px;
			padding: 8px;
			background: #fff;

			//border: 1px solid red;
			ul {
				li {
					margin-top: 5px;
					// height: 3rem;

					//border: 1px solid red;

					& div:first-child {
						font-size: 15px;
						font-weight: bold;
						color: #AFADB5;
						margin-left: 10px;
					}

					& div:last-child {
						font-weight: bold;
						color: #1B1C21;
						padding: 8px;
						border-radius: 8px;
						margin-top: 8px;
						font-size: 16px;
						letter-spacing: 1px;
						background: #F3F4FD;
					}
				}

			}
		} */
	}
</style>