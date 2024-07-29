<template>
	<view class="qy_card">

		<u-popup :show="popup_show" mode="bottom" :closeable="true" round="10" @close="close">
			<view class="mask">
				<view class="top-box" id="top-box">
					<view class="card_item flex-between" v-if="popup_show">
						<view class="icon-box"><u--image :showLoading="true" :src="info.pool.cover.show_src"
								width="168rpx" height="168rpx"></u--image></view>
						<view class="f-box flex-colum-start">
							<view class="title">{{ info.pool.title }}</view>
							<view class="t1">
								共 {{info.think_count}} 个
							</view>
						</view>
					</view>
					<view class="desc flex-end">
						<!-- <text class="t1">默认按编号排序</text> -->
						<text class="t1" style="color:red;font-weight:bold" v-if="list.length>0&&list[0].is_he.is_he==1"
							@tap="topage('gather/synthesis/synthesisdetails?id='+list[0].is_he.id+'&with_id='+list[0].is_he.with_id)">去合成</text>
					</view>
				</view>
				<scroll-view scroll-y="true" class="scroll" :style="scroll_h" @scrolltolower="scrolltolower">
					<view class="flex-start" style="width: 750rpx;">
						<view class="card" @tap="to_details(item)"
							:class="{'flex-end':(index+1)%3==0,'flex-center':(index)%3==1}" v-for="(item,index) in list"
							:key="index">
							<view class="card_box flex-colum">
								<text class="t2" v-if="item.price>0">&yen;{{item.price}}</text>
								<text class="t1">#{{item.no}}/{{item.pool.num}}</text>
								<!-- 提示 -->
								<view class="tips  flex-center" :class="{'tips_active':item.status==2}">
									<text class="t">{{set_status(item.status,item.is_he.is_he)}}</text>
								</view>
							</view>
						</view>
					</view>

					<iloading :result="loading"></iloading>
				</scroll-view>

			</view>

		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popup_show: false,
				list: [],
				loading: 1,
				page: 1,
				limit: 50,
				info: {},
				scroll_h: {},
				id: ""
			}
		},
		props: {
			buy_type: {
				type: Number,
				default: 1
			}
		},
		methods: {
			to_details(item) {
				this.popup_show = false;
				switch (item.status) {
					case 1:
						this.topage("gather/collect/mydetails?id=" + item.id)
						break;
					case 2:
						this.topage("gather/market/details?mark_id=" + item.mark.id + "&buy_type=" + this.buy_type)
						break;
					default:
						break;
				}
			},
			set_status(status, is_he) {
				let str = "";
				switch (status) {
					case 1:
						if (is_he == 1) {
							str = "可合成";
						} else {
							str = "持有";
						}
						break;
					case 2:
						str = "寄售";
						break;
					case 3:
						str = "卖出";
						break;
					case 4:
						str = "赠送";
						break;
					default:
						break;
				}
				return str;
			},
			open(id, info) {
				this.page = 1;
				this.list = [];
				this.info = info;
				this.id = id;
				this.popup_show = true;
				this.$nextTick(async () => {
					let topbox = await uni.utils.info_distance("top-box");
					this.scroll_h = {
						'top': topbox.height + "px"
					}
					this.get_data();
				})
			},
			async get_data() {
				let res = await uni.ajax.collect_getMyListInfo({
					pool_id: this.id,
					page: this.page,
					limit: this.limit,
				})
				if (res) {
					this.list = this.list.concat(res.data.list);
					this.loading = uni.utils.loading_result(this.page, res.data.list, this.limit);
				}
			},
			scrolltolower() {
				if (this.loading == 4) {
					this.loading = 1;
					this.page = this.page + 1;
					this.get_data();
				}
			},

			close() {
				this.popup_show = false
			},

		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		background-color: #fff;
		height: 926rpx;
		padding: 24rpx 32rpx;
		/* #ifdef H5 */
		box-sizing: border-box;
		/* #endif */
		border-radius: 34rpx 34rpx 0rpx 0rpx;

		.card_item {
			padding: 16rpx 0rpx;
			background-color: #fff;
			border-radius: 16rpx;

			.icon-box {
				width: 168rpx;
				height: 168rpx;
				background: #d9d9d9;
				border-radius: 24rpx;
				overflow: hidden;
			}

			.f-box {
				width: calc(100% - 168rpx);
				box-sizing: border-box;
				padding-left: 16rpx;
				height: 168rpx;
				justify-content: space-around;

				.title {
					width: calc(100% - 168rpx);
					font-size: 36rpx;
					font-weight: bold;
					color: #000000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.t1 {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;

				}

			}
		}

		.scroll {
			margin-top: 30rpx;
			height: 706rpx;
			position: absolute;
			bottom: 0rpx;
			left: 32rpx;
			width: 686rpx;
			padding-bottom: 100rpx;
			box-sizing: border-box;

			.card {
				width: 228rpx;
				margin-bottom: 24rpx;

				.card_box {
					width: 212rpx;
					height: 128rpx;
					background: #EEF4FF;
					border-radius: 16rpx;
					position: relative;

					.t1 {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 28rpx;
						margin-bottom: 5rpx;
					}

					.t2 {
						font-size: 24rpx;
						font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 600;
						color: #000;
						line-height: 28rpx;
						margin-bottom: 6rpx;
					}

					.tips {
						position: absolute;
						right: 0rpx;
						top: 0rpx;
						width: 80rpx;
						height: 30rpx;
						background: #77A2FF;
						border-radius: 0px 0px 0px 8rpx;

						.t {
							font-size: 22rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 26rpx;
						}
					}

					.tips_active {
						background: #F78980;
					}
				}
			}
		}

		.title {
			.t1 {
				font-size: 32rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000;
			}

			.t2 {
				font-size: 24rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				color: #999999;
			}
		}

		.desc {
			height: 60rpx;
			margin-bottom: 24rpx;

			.t1 {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;

			}
		}
	}
</style>