<template>
	<view class="send_out">
		<view class="header">
			<view class="back flex-between">
				<u-icon name="arrow-left" bold color="#fff" size="44rpx" @click="totab('gather/home/index')"></u-icon>
			</view>
		</view>
		<view class="conntent">

			<view class="info">
				<view class="title bold">
					<text>{{$t('proxyApl.applyCondition')}}</text>
				</view>
				<view class="section_box">
					<section class="flex-between">
						<view class="condition flex-colum-evenly">
							<p>{{$t('proxyApl.directNumConfig')}} {{conditionData.direct_push_num_config}}</p>
							<p>{{$t('proxyApl.Promoted')}}{{conditionData.direct_push_num}}{{$t('proxyApl.person')}}</p>
						</view>
						<view class="status bold flex-center"
							:class="{'status_green': conditionData.direct_push_num >=conditionData.direct_push_num_config}">
							<image
								:src="conditionData.direct_push_num>=conditionData.direct_push_num_config?'/static/else/correct.png':'/static/else/wrong.png'"
								mode="heightFix"></image>
							{{conditionData.direct_push_num>=conditionData.direct_push_num_config?$t('proxyApl.haveDone'):$t('proxyApl.inComplete')}}
						</view>
					</section>
					<section class="flex-between">
						<view class="condition flex-colum-evenly">
							<p>{{$t('proxyApl.intervalNumConfig')}} {{conditionData.interval_push_num_config}}</p>
							<p>{{$t('proxyApl.Promoted')}}{{conditionData.interval_push_num}}{{$t('proxyApl.person')}}
							</p>
						</view>
						<view class="status bold flex-center"
							:class="{'status_green': conditionData.interval_push_num >= conditionData.interval_push_num_config}">
							<image
								:src="conditionData.interval_push_num>=conditionData.interval_push_num_config?'/static/else/correct.png':'/static/else/wrong.png'"
								mode="heightFix"></image>
							{{conditionData.interval_push_num>=conditionData.interval_push_num_config?$t('proxyApl.haveDone'):$t('proxyApl.inComplete')}}
						</view>
					</section>
					<section class="flex-between">
						<view class="condition flex-colum-evenly">
							<p>{{$t('proxyApl.PromotedGemConfig')}} {{conditionData.promotion_food_num_config}}</p>
							<p>{{$t('proxyApl.PromotedIncome')}}{{conditionData.promotion_food_num}}</p>
						</view>
						<view class="status bold flex-center"
							:class="{'status_green': conditionData.promotion_food_num >= conditionData.promotion_food_num_config}">
							<image
								:src="conditionData.promotion_food_num>=conditionData.promotion_food_num_config?'/static/else/correct.png':'/static/else/wrong.png'"
								mode="heightFix"></image>
							{{conditionData.promotion_food_num>=conditionData.promotion_food_num_config?$t('proxyApl.haveDone'):$t('proxyApl.inComplete')}}
						</view>
					</section>
				</view>

				<!-- 
				<view class="possess">
					{{$t('sendOut.haveGem')}} <text>{{user_info.food}}</text>
				</view> -->
				<view class="apply_tip flex-center bold">
					<text>{{$t('proxyApl.tip')}}</text>
				</view>
				<view class="submit_btn flex-center" @click="goToApply">
					{{$t('proxyApl.applyNow')}}
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
				page: 1,
				conditionData: {}

			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info
			}

		},
		onShow() {
			this.getApplyAgentCondiation();
		},
		methods: {
			async goToApply() {
				let res = await uni.ajax.collect_applyAgent();
				console.log("申请结果", res);
				if (res.code == 200) {
					if (res.data.code == 0) {
						this.$u.toast(this.$t('proxyApl.applyFail1'))
					}
				} else {
					this.$u.toast(this.$t('proxyApl.applyFail2'))
				}
			},
			async getApplyAgentCondiation() {
				let res = await uni.ajax.collect_applyAgentCondiation({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res.code == 200) {
					//console.log("res", res);
					this.conditionData = res.data;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.send_out {
		.header {
			width: 750rpx;
			height: 490rpx;
			background: url('/static/Continent/topback.png') no-repeat;
			background-size: 100% 100%;
			padding-top: var(--status-bar-height);
			box-sizing: border-box;

			.back {
				height: 88rpx;
				padding: 0 32rpx;
			}
		}

		.conntent {
			padding: 44rpx 32rpx;

			.info {
				border-radius: 12rpx;
				background-color: #fff;
				padding: 40rpx 32rpx;

				.title {
					font-size: 34rpx;
					margin-bottom: 15rpx;
				}

				.section_box {
					width: 100%;
					//background: red;

					section {
						padding: 26rpx;
						border-radius: 10rpx;
						background: #F5F5F7;
						margin-top: 30rpx;

						.condition {
							height: 100rpx;
							font-weight: bold;
							//background: yellow;

							p:nth-child(1) {
								font-size: 30rpx;
							}

							p:nth-child(2) {
								color: #B3B3B5;
								font-size: 26rpx;
							}
						}

						.status {
							font-size: 28rpx;
							letter-spacing: 2rpx;
							// color: #57A242;
							color: red;

							image {
								height: 40rpx;
							}
						}

						.status_green {
							color: #57A242;

						}
					}
				}



				.possess {
					font-size: 24rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;

					text {
						font-size: 32rpx;
						font-weight: 600;
						color: var(--theme);
					}
				}
			}

			.hint {
				font-size: 28rpx;
				color: #999;
				padding: 24rpx 32rpx;

				>view {
					margin-bottom: 36rpx;
				}

				.service_charge {
					font-size: 24rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: var(--theme);
				}
			}

			.apply_tip {
				margin-top: 80rpx;
				font-size: 26rpx;
				color: #ccc;
			}

			.submit_btn {
				margin-top: 20rpx;
				height: 100rpx;
				border-radius: 8rpx;
				background: #303030;
				font-size: 30rpx;
				//font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}

			.gray {
				filter: grayscale(1);
			}
		}
	}
</style>