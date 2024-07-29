<template>
	<view class="index">
		<view class="head_bg_box flex-center">
			<view class="top_bg flex-start">
				<view class="totolSign_gem flex-center">
					<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
					<text class="bold">{{amount}}</text>
				</view>
			</view>
		</view>
		<view class="bottom_content">
			<view class="record_box">
				<view class="title">
					{{$t('signRecord.gemSignDetail')}}
				</view>
				<view class="record_details">
					<view v-for="(item,index) in recordList" :key="index">
						<view class="record_item flex-between">
							<view class="record_item_text flex-colum-evenly">
								<p>{{$t('signRecord.seeVideoIncome')}}</p>
								<p>{{item.create_time}}</p>
							</view>
							<view class="record_item_income flex-center">
								<text>+{{ Number(item.food).toFixed(1) }}</text>
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
							</view>
						</view>
					</view>
				</view>
				<iloading :result="loading"></iloading>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: 0,
				recordList: [],
				loading: 1,
				page: 1
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('signRecord.title')
			})
			this.public_getUserSignRecord();
		},
		onReachBottom() {
			if (this.loading == 4) {
				this.loading = 1;
				this.page = this.page + 1;
				this.public_getUserSignRecord();
			}
		},
		methods: {
			async public_getUserSignRecord() {
				let res = await uni.ajax.public_getUserSignRecord({
					limit: uni.conf.limit,
					page: this.page
				});
				console.log("用户签到记录===>", res);
				if (res.code == 200) {
					this.amount = res.data.amount;
					this.recordList = this.recordList.concat(res.data.list);
					this.loading = uni.utils.loading_result(this.page, res.data.list);
				}

			},
		}
	}
</script>

<style scoped lang="scss">
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.index {
		width: 100%;
		min-height: calc(100vh - 100rpx);
		// padding: 20rpx 40rpx;
	}

	.head_bg_box {
		width: 100%;
		height: 200rpx;
		//background: red;
		padding: 10rpx;

		.top_bg {
			width: 100%;
			height: 180rpx;
			padding-left: 40rpx;
			background: url('/static/else/recordBg.png');
			@include backImg();

			.totolSign_gem {

				image {
					height: 60rpx;
				}

				text {
					font-size: 60rpx;
					margin-left: 20rpx;

				}
			}
		}


	}

	.bottom_content {
		width: 100%;
		padding: 0 20rpx;
	}

	.record_box {
		width: 100%;
		// height: 800rpx;
		/* #ifdef H5 */
		min-height: calc(100vh - 100rpx - 200rpx);
		/* #endif */
		/* #ifdef APP-PLUS */
		min-height: calc(100vh - 100rpx - 100rpx);
		/* #endif */
		background: #fff;
		border-radius: 30rpx 30rpx 0 0;
		padding: 40rpx;
		color: #333333;
		font-weight: bold;


		.record_details {
			width: 100%;
			// height: 400rpx;
			margin-top: 20rpx;
			//background: red;


			.record_item {
				width: 100%;
				height: 160rpx;
				//background: yellow;
				border-bottom: 1px solid #DDDDDD;
				// margin-bottom: 20rpx;

				.record_item_text {
					height: 100rpx;
					letter-spacing: 1rpx;
					//background: blue;

					p:nth-child(1) {
						color: #333333;
						font-size: 28rpx;

					}

					p:nth-child(2) {
						color: #999999;
						font-size: 20rpx;

					}
				}

				.record_item_income {
					text {
						font-size: 28rpx;
					}

					image {
						margin-left: 10rpx;
						height: 40rpx;
					}
				}

			}

		}
	}
</style>