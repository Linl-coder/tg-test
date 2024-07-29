<!-- 公会排行 -->
<template>
	<view class="ranking_list" :style="{height:height+'px'}">
		<scroll-view class="scroll" scroll-y @scrolltolower="scrolltolower">
			<!-- <view class="header flex-start">
				<text style="flex:2;text-align: left;">排名</text>
				<text style="flex:4;">公会名称</text>
				<text style="flex:3">成员人数</text>
				<text style="flex:3"></text>
			</view> -->
			<view class="ranking_list_item" v-for="item,index in dataList" :key="item.id">
				<view style="flex:2" class="ranking flex-start">
					<image v-if="index<3" class="serial" :src="`/static/association/paihang${index+1}.png`" mode="">
					</image>
					<view v-else class="serial flex-center">{{index+1}}</view>
				</view>
				<view style="flex:4" class="info">
					<u-avatar :src="item.guild_image" size="56rpx"></u-avatar>
					<text>{{item.guild_name | cut_out}}</text>
				</view>
				<view style="flex:3" class="num">
					{{item.guildCount}}
				</view>
				<view style="flex:3" class="flex-end">
					<view v-if="item.status == 2" class="join flex-center" @click="add_guild(item,index)">
						加入公会
					</view>
					<view v-else class="join flex-center">
						已加入
					</view>
				</view>
			</view>
			<iloading :result="result"></iloading>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				dataList: [],
				page: 1,
				result: 1,
			}
		},
		created() {
			this.guildList()
		},
		methods: {
			async guildList() {
				let res = await uni.ajax.shop_guildList({
					page: this.page,
					limit: uni.conf.limit
				});

				if (res) {
					this.dataList = this.dataList.concat(res.data.guildList);
					this.result = uni.utils.loading_result(this.page, res.data.guildList);
				}
			},
			scrolltolower() {
				console.log('触底')
				if (this.result == 4) {
					this.page = this.page + 1;
					this.guildList()
				}
			},
			async add_guild(val, i) {
				let result = await uni.ajax.shop_addGuild({
					guild_id: val.id,
				});
				if (result) {
					this.dataList[i].status = 1
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ranking_list {
		background: #F4F4F4;
		box-sizing: border-box;
		padding: 24rpx 32rpx;
		padding-bottom: calc(constant(safe-area-inset-bottom) + 24rpx);
		padding-bottom: calc(env(safe-area-inset-bottom) + 24rpx);

		.scroll {
			height: 100%;
		}

		.header {
			// position: sticky;
			// top: 0;
			// z-index: 100;
			padding: 0 30rpx;
			height: 72rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			//font-family: font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 0.6);

			>text {
				text-align: center;
			}
		}

		.ranking_list_item {
			display: flex;
			align-items: center;
			background: #FFFFFF;
			height: 80rpx;
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			border-radius: 16rpx 16rpx 16rpx 16rpx;

			.guild_name {
				color: #333333;
			}

			.ranking {
				.serial {
					width: 56rpx;
					height: 56rpx;
					font-size: 16px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}

			.info {
				display: flex;
				align-items: center;

				>text {
					padding-left: 8rpx;
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #000000;
				}
			}

			.num {
				font-size: 36rpx;
				font-family: PangMenZhengDao-Regular, PangMenZhengDao;
				font-weight: 400;
				color: #000000;
				text-align: center;
			}

			.join {
				width: 152rpx;
				height: 52rpx;
				background: #333333;
				border-radius: 98rpx 98rpx 98rpx 98rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	}
</style>