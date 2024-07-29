<template>
	<view class="my_assets">
		<view class="header" :style="header_bg">
			<view class="back flex-between">
				<u-icon name="arrow-left" bold color="#fff" size="44rpx" @click="toback()"></u-icon>
				<view class="record" v-if="type == 'cereal'"
					@click="topage('gather/mainland/myAssets/record?type=cereal')">
					{{$t('myAssets.gemRecord')}}
				</view>
				<view class="record" v-if="type =='gold'" @click="topage('gather/mainland/myAssets/record?type=gold')">
					{{$t('myAssets.gemRecord')}}
				</view>
			</view>
			<view class="assets ">
				<view class="assets_info">
					<!-- <text>我的{{type == 'cereal' ?'宝石(个)':'宝石'}}</text> -->
					<text>{{$t('myAssets.myGems')}}</text>
					<view class="flex-start" style="margin-top: 10rpx;">
						<!-- 	<u-icon :name=" type == 'cereal' ? '/static/Continent/i9.png' : '/static/Continent/i10.png'"
							width="65rpx" height="65rpx"></u-icon> -->
						<u-icon :name=" type == 'cereal' ? '/static/btn/gem-icon1.png' : '/static/Continent/i10.png'"
							width="40rpx" height="40rpx"></u-icon>

						<!-- <u-text bold color="#fff" size="48rpx"
							:text="type == 'cereal' ? user_info.food*1 : user_info.gold*1"></u-text> -->
						<u-count-to :start-val="0" :end-val="user_info.food ? user_info.food * 1 : 0" :duration="1000"
							:use-easing="false" :decimals="7" color="#fff" ref="countTo" bold></u-count-to>
					</view>
					<!-- <view class="beGiveGem color_w">
						<p>{{$t('myAssets.beGivenGem')}}<span class="bold">{{' '+beGivenGemNum+' '}}</span></p>
					</view> -->
					<view class="beGiveGem " style="color: #ccc;width: 70%;">
						<p>{{$t('myAssets.getGemTip3')}}</p>
						<p>{{$t('myAssets.getGemTip4')}}</p>
					</view>
				</view>
				<!-- @click="topage('gather/mainland/rankingList/rankingList')" -->
				<!-- <view class="gem_list_icon">
					<p class="flex-center">Gem List</p>
				</view> -->
			</view>
			<!-- 去赠送 -->
			<view class="send_out" v-if="type == 'cereal'" @click="topage('gather/mainland/sendOut/sendOut')">
				{{$t('myAssets.goGive')}}
			</view>
		</view>

		<view class="explain">
			<view class="explain_item" v-for="item in explainData" :key="item.id">
				<view class="explain_item_title">{{item.title}}</view>
				<view class="explain_item_content" v-html="item.content">

				</view>
			</view>
		</view>

		<view class="bottom_notice_tip">
			{{$t('myAssets.bottomTip')}}
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'cereal', // cereal=>宝石   gold=>宝石
				header_bg: "",
				explainData: [],
				cerealExplain: [{
						title: this.$t('myAssets.whatGem'),
						content: this.$t('myAssets.whatGemTip')
					},
					{
						title: this.$t('myAssets.getGem'),
						content: `<p>` + this.$t('myAssets.getGemTip1') + `</p>` + `<p>` + this.$t(
							'myAssets.getGemTip2') + `</p>`
					},
					// {
					// 	title: 'JJCOIN',
					// 	content: this.$t('myAssets.getGemTip5')
					// }
				],
				goldExplain: [{
						title: '宝石是什么',
						content: '宝石是园丁大陆我主要资源，可用于公会升级以及游戏使用，宝石的更多使用场景将陆续开放。'
					},
					{
						title: '获得宝石',
						content: '购买潮玩时会赠送少量宝石，宝石暂时没有产出方式。'
					}
				],
				beGivenGemNum: ''
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info
			}
		},
		onLoad(option) {
			if (option.type) {
				this.type = option.type
			}
			if (this.type == 'cereal') {
				this.header_bg = "--header-bg:url('/static/Continent/myassets_bg.png')"
				this.explainData = this.cerealExplain
			} else {
				this.header_bg = "--header-bg:url('/static/Continent/i19.png')"
				this.explainData = this.goldExplain
			}
		},
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}


	.my_assets {
		.header {
			width: 750rpx;
			height: 560rpx;
			background: var(--header-bg);
			@include backImg;
			//padding-top: var(--status-bar-height);
			padding: 0 32rpx;
			padding-top: var(--status-bar-height);
			// padding-top: 80rpx;
			//background: red;

			.back {
				height: 88rpx;
				// padding: 0 32rpx;

				.record {
					font-size: 28rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}

			.assets {
				margin-top: 20rpx;
				display: flex;
				align-items: flex-start;

				.assets_info {
					margin-right: auto;

					>text {
						font-size: 32rpx;
						//font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
						margin-bottom: 24rpx;
					}

					.beGiveGem {
						margin-top: 20rpx;
						font-size: 24rpx;

					}

				}

				.gem_list_icon {
					width: 100rpx;
					height: 100rpx;
					background: url('/static/Continent/gem_list.png');
					@include backImg;
					position: relative;

					p {
						position: absolute;
						bottom: 0;
						font-size: 24rpx;
						font-weight: bold;
						color: #fff;
						text-align: center;
					}
				}

			}

			.send_out {
				margin-top: 22rpx;
				width: fit-content;
				font-size: 36rpx;
				margin-right: 30rpx;
				//font-family: DIN-Medium, DIN;
				font-weight: 500;
				color: #fff;
				padding: 4rpx 28rpx;
				border: 2rpx solid #fff;
				border-radius: 8rpx;
			}
		}

		.explain {
			padding: 32rpx 32rpx 72rpx 32rpx;

			.explain_item {
				margin-bottom: 50rpx;

				.explain_item_title {
					width: fit-content;
					background: linear-gradient(90deg, #C7C9FF 0%, #4E80C9 100%);
					border-radius: 8rpx;
					padding: 10rpx 28rpx;
					font-size: 32rpx;
					//font-family: DIN-Medium, DIN;
					font-weight: 500;
					color: #FFFFFF;
					margin-bottom: 18rpx;
				}

				.explain_item_content {
					font-size: 28rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;
				}
			}
		}

		.bottom_notice_tip {
			position: fixed;
			bottom: 30rpx;
			font-size: 20rpx;
			padding: 0 20rpx;
			color: #666;


		}
	}
</style>