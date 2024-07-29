<template>
	<view class="list" id="list">
		<div class="list-box-one" v-for="(item, index) in list" :key="index" @tap="to_giving(item,index)">
			<view class="icon-box">
				<u--image :showLoading="true" :src="handleImgUrl(item.pool.cover.show_src)" width="100%"
					height="350rpx"></u--image>
			</view>
			<view class="f-box">
				<view class="">
					<view class="f-title">{{ item.pool.title }}</view>
				</view>
				<view class="price-box fw">
					<!-- <text class="t1">共{{ item.think_count || 0 }}个</text> -->
					<text class="t1 "><span>{{$t('storeManage.transferable')}}</span>: {{ item.think_count || 0 }}
					</text>
				</view>
				<!-- <view class="f-num flex-start">
					<image  v-if="item.pool.author.avatars" :src="item.pool.author.avatars.show_src" class="avatar"></image>
					<text class="t1">{{ item.pool.author.nickname }}</text>
				</view> -->
				<!-- <view class="" style="font-size: 20rpx;color: #aaa;">
					<view class="">
						{{$t("confirmOrder.mining")}}：
					</view>
					<view class="">
						{{$t("confirmOrder.Transferable")}}：
					</view>

				</view> -->
			</view>

		</div>

		<card ref="card"></card>


	</view>
</template>

<script>
	let img_info = null;
	import card from './card.vue';
	export default {
		components: {
			card
		},
		props: {
			list: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		async mounted() {
			img_info = await uni.utils.info_distance('list');
		},
		methods: {
			to_giving(item, index) {
				//只有代理才能点进去转赠卡牌页面
				if (this.user_info.is_agent == 1) {
					let info = {
						id: item.id,
						pool_id: item.pool_id,
						name: item.pool.title,
						img: item.pool.cover.show_src,
						think_count: item.think_count,
						buy_type: 1
					}
					uni.setStorage({
						key: 'giving_info',
						data: info,
						success: () => {
							this.topage(`gather/giving?index=${index}`);
						}
					});
				}

			},
			setimgh(width, height) {
				return uni.utils.set_imgh(width, height, img_info.width) + 'px';
			},

		}
	};
</script>

<style lang="scss" scoped>
	.list {
		.list-box-one {
			margin-bottom: 24rpx;
			box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
			background-color: #ffffff;
			border-radius: 24rpx;
			overflow: hidden;
			-webkit-backface-visibility: hidden;
			-webkit-transform: translate3d(0, 0, 0);

			.icon-box {
				width: 100%;

				.icon {
					width: 100%;
				}
			}

			.f-box {
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;

				.f-title {
					font-size: 28rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.f-num {
					height: 50rpx;
					margin-top: 12rpx;

					.avatar {
						width: 50rpx;
						height: 50rpx;
						margin-right: 8rpx;
						border-radius: 100%;
					}

					.t1 {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
					}

					.t2 {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.t3 {
						margin: 0rpx 8rpx;
					}
				}

				.price-box {

					.t1 {
						font-size: 24rpx;
					}

					.t2 {
						font-size: 32rpx;
						color: #fe3333;
					}
				}
			}
		}
	}
</style>