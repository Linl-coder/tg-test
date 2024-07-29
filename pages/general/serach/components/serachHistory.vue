<template>
	<view class="history" v-show="list.length > 0">
		<view class="history_title flex-between"><text class="t1">热门搜索</text></view>
		<view class="card">
			<view class="card_item flex-between" @tap="topage('gather/collect/deatils?id=' + item.id)" v-for="(item, index) in list" :key="index" >
				<view class="icon-box"><u--image :showLoading="true" :src="item.cover.show_src" width="168rpx" height="168rpx"></u--image></view>
				<view class="f-box">
					<view class="title">{{ item.title }}</view>
					<view class="desc" v-if="item.author">
						<text class="desc-text">{{item.author.nickname}}</text>
						<!-- <text class="desc-author">创作者</text> -->
					</view>
					<view class="price-box flex-between">
						<view class="tips-box flex-center">
							<view class="tips-left flex-center">流通</view>
							<view class="tips-right flex-center">{{ item.circulate }}</view>
						</view>
						<text class="price">￥{{ item.price }}</text>
					</view>
				</view>
			</view>
			<iloading :result="result"></iloading>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		result: {
			type: Number,
			default: 2
		}
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.history {
	.card {
		margin-top: 24rpx;

		.card_item {
			padding: 16rpx;
			background-color: #fff;
			border-radius: 16rpx;
			box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
			margin-bottom: 24rpx;

			.icon-box {
				width: 168rpx;
				height: 168rpx;
				background: #d9d9d9;
				border-radius: 24rpx;
				overflow: hidden;
			}

			.f-box {
				flex: 1;
				padding-left: 16rpx;

				.price-box {
					.price {
						font-size: 40rpx;
						font-weight: bold;
					}
				}

				.title {
					font-size: 36rpx;
					font-weight: bold;
					color: #000000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.tips-box {
					.tips-left {
						width: 72rpx;
						height: 48rpx;
						background: #1777FF;
						font-size: 24rpx;
						color: #ffffff;
						border-radius: 8rpx 0rpx 0rpx 8rpx;
					}

					.tips-right {
						height: 44rpx;
						min-width: 100rpx;
						padding: 0rpx 8rpx;
						border: 2rpx solid #1777FF;
						font-size: 24rpx;
						border-radius: 0rpx 8rpx 8rpx 0rpx;
					}
				}

				.desc {
					margin: 16rpx 0rpx;
					white-space: pre-wrap;

					.desc-text {
						font-size: 28rpx;
						color: #000000;
						font-weight: 500;
						margin-right: 24rpx;
					}

					.desc-author {
						padding: 4rpx 12rpx;
						border-radius: 4rpx;
						font-size: 22rpx;
						background: rgba(7, 235, 254, 0.15);
					}
				}
			}
		}
	}
}
</style>
