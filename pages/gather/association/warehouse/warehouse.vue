<template>
	<view class="warehouse">
		<view class="header flex-between">
			<!-- <view class="box"> -->
			<view>
				<view class="flex-start">
					<text class="allnum">{{count}}</text>
					<text class="unit">张</text>
				</view>
				<view class="">
					<text class="unit">公会资源</text>
				</view>
			</view>
			<view class="btn flex-center" @click="giv_card">转赠公会成员</view>
			<!-- </view> -->
		</view>
		<view class="content" :style="{'--height':height+'px'}">
			<scroll-view class="scroll" scroll-y>
				<u-radio-group v-model="user_group_id" placement="column" active-color="var(--theme)">

					<u-row style="flex-wrap: wrap;" gutter="12rpx">
						<u-col span="3" v-for="item,index in dataList" :key="item.id">
							<view class="box" :style="{width: '100%',filter: `grayscale(${item.status == 2 ? 1 : 0})`}">
								<u-radio class="radio_box" :name="item.id" :disabled="item.status == 2"></u-radio>
								<u-image :src="item.picture" width="100%" height="auto" mode="widthFix"></u-image>
								<view class="num flex-center">{{item.num}}张</view>
							</view>
						</u-col>
					</u-row>
				</u-radio-group>
				<iloading :result="result"></iloading>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				guild_id: '',
				height: 0,
				dataList: [],
				page: 1,
				result: 1,
				count: 0,
				user_group_id: ""
			}
		},
		onLoad(option) {
			if (option.guild_id) {
				this.guild_id = option.guild_id
			}
			this.shop_guildPropList()
		},
		onReady() {
			let system = uni.getSystemInfoSync()
			this.height = system.windowHeight
		},
		onNavigationBarButtonTap() {
			console.log('点击记录')
			this.topage(`gather/association/warehouse/record?guild_id=${this.guild_id}`)
		},
		methods: {
			async shop_guildPropList() {
				let res = await uni.ajax.shop_guildPropList({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {
					this.count = res.data.count
					this.dataList = this.dataList.concat(res.data.list);
					this.result = uni.utils.loading_result(this.page, res.data.list);

				}
			},
			giv_card() {
				if (!this.user_group_id) {
					return uni.$u.toast('请选择需要赠送的卡牌')
				}
				uni.navigateTo({
					url: `/pages/gather/association/warehouse/giv_card?guild_id=${this.guild_id}&user_group_id=${this.user_group_id}`,
					events: {
						giv_card: () => {
							console.log('刷新')
							this.dataList = [];
							this.page = 1;
							this.status = 'loadmore';
							this.empty = false;
							this.count = 0;
							this.shop_guildPropList()
						}
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F4F4F4;
	}
</style>
<style lang="scss" scoped>
	.warehouse {
		.header {
			height: 300rpx;
			padding: 0 32rpx;

			.allnum {
				font-size: 96rpx;
				font-family: DIN-Medium, DIN;
				font-weight: 500;
				color: #000;
				line-height: 112rpx;
				margin-right: 10rpx;
			}

			.unit {
				font-size: 40rpx;
				font-family: DIN-Bold, DIN;
				font-weight: bold;
				color: #000;
				line-height: 46rpx;
			}

			.btn {
				width: 256rpx;
				height: 84rpx;
				font-size: 32rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				border-radius: 8rpx;

				background: linear-gradient(90deg, #A070CF 0%, #A070CF 100%);

				box-shadow: 0px 2px 0px 0px #3866A9;

			}

		}

		.content {
			height: calc(var(--height) - 300rpx);
			background: #FFFFFF;
			border-radius: 24rpx 24rpx 0 0;
			padding: 32rpx;
			box-sizing: border-box;
			overflow: hidden;

			.scroll {
				height: 100%;
			}

			.box {
				position: relative;
				background: var(--theme);
				border-radius: 16rpx;
				overflow: hidden;
				margin-bottom: 20rpx;

				.radio_box {
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					z-index: 10;
				}

				.num {
					height: 38rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}
	}
</style>