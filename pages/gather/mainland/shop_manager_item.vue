<template>
	<view class="shop_manager_item">
		<view class="goods_box_item" v-for="(item,index) in agent_list" :key="index">
			<view class="address flex-between">
				<text class="address_name">{{item.address||' ' }}</text>
			</view>
			<!-- <view class="df alc" style="justify-content: flex-end;font-size: 28rpx;">
				{{$t('mainland.nowHave')}}：xxx x7
			</view> -->
			<view class="shop_manager flex-start" v-if="item.user!=null">
				<u-avatar :src="item.user.avatar"></u-avatar>
				<view class="label_wid">{{$t('mainland.storeMana')}}</view>
				<u-icon name="/static/Continent/agent_icon.png" size="40rpx" :label="item.user.nickname"
					label-color="#999" label-size="28rpx"></u-icon>
			</view>
			<view class="contact_information">
				<view class="label_wid flex-center">
					{{$t('mainland.contactHe')}}
				</view>
				<!-- v-if="item.facebook||item.zalo||item.telegram||item.whatsapp" -->
				<view class="contact_list " v-if="item.telegram">
					<!-- <view class="contact_information_list">
						<view class="contact_information_item " style="margin-right: 14rpx;" v-show="item.facebook">
							<u-icon name="/static/Continent/fb.png" width="36rpx" height="36rpx"></u-icon>
							<view class="number">{{item.facebook}}</view>
							<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
								@click="copy(item.facebook)"></u-icon>
						</view>
						<view class="contact_information_item" v-show="item.zalo">
							<u-icon name="/static/Continent/zalo.png" width="36rpx" height="36rpx"></u-icon>
							<view class="number">{{item.zalo}}</view>
							<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
								@click="copy(item.zalo)"></u-icon>
						</view>
					</view> -->
					<view class="contact_information_list">
						<view class="contact_information_item " style="margin-right: 14rpx;" v-show="item.telegram">
							<u-icon name="/static/Continent/tg.jpg" width="36rpx" height="36rpx"></u-icon>
							<view class="number">{{item.telegram}}</view>
							<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
								@click="contact('telegram',item.telegram)"></u-icon>
						</view>
						<!-- <view class="contact_information_item" v-show="item.whatsapp">
							<u-icon name="/static/Continent/wa.jpg" width="36rpx" height="36rpx"></u-icon>
							<view class="number">{{item.whatsapp}}</view>
							<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
								@click="copy(item.whatsapp)"></u-icon>
						</view> -->
					</view>
				</view>
				<view class="contact_list" v-else>
					{{$t('utils.notSetContact')}}
				</view>
			</view>
		</view>
		<iloading :result="result"></iloading>
	</view>
</template>

<script>
	import {
		pages
	} from "@/common/mixins/index.js";
	export default {
		mixins: [pages],
		data() {
			return {
				shop_list: [],
				result: 4,
				count: 0,
				page: 1,
				limit: 6,
				agent_list: []
			}
		},
		onShow() {
			if (this.result == 4) {
				this.page = 1;
				this.getAgentList();
			}
			uni.setNavigationBarTitle({
				title: this.$t('mainland.allManager')
			})
		},
		onReachBottom() {
			if (this.result == 4) {
				this.result = 1;
				this.page = this.page + 1;
				this.getAgentList();
			}
		},
		methods: {
			contact(type, data) {
				if (typeof data != 'undefined') {
					let _this = this
					uni.setClipboardData({
						data: data,
						success: () => {
							uni.showToast({
								title: _this.$t('utils.copySuccess'),
								icon: "none",
								duration: 2000
							})
							if (type === 'telegram') {
								// #ifdef H5
								window.open("https://t.me/" + data, '_blank');
								// #endif
								// #ifdef APP
								plus.runtime.openURL("https://t.me/" + data, function(e) {
									alert("Open system default browser failed: " + e.message);
								});
								// #endif
							}
						}
					})
				} else {
					return
				}
				// else if (type === 'whatsapp') {
				// 	// whatsapp
				// 	// #ifdef H5
				// 	window.open("https://api.whatsapp.com/send?phone=" + data, '_blank');
				// 	// #endif
				// 	// #ifdef APP
				// 	plus.runtime.openURL("https://api.whatsapp.com/send?phone=" + data, function(e) {
				// 		alert("Open system default browser failed: " + e.message);
				// 	});
				// 	// #endif
				// } else {
				// 	this.copy(data)
				// }
			},
			//获取代理列表
			async getAgentList() {
				let res = await uni.ajax.shop_getApiList({
					page: this.page,
					limit: this.limit,
				})
				if (res) {
					this.count = res.data.count;
					this.agent_list = this.agent_list.concat(res.data.list);
					this.result = uni.utils.loading_result(this.page, res.data.list, this.limit);
				}
			},
			// shop_getApiList() { //店长列表
			// 	uni.getLocation({
			// 		type: 'gcj02',
			// 		success: (res) => {
			// 			uni.chooseLocation({
			// 				latitude: res.latitude,
			// 				longitude: res.longitude,
			// 				success: async (gps) => {
			// 					let result = await uni.ajax.shop_getApiList({
			// 						page: this.page,
			// 						limit: uni.conf.limit,
			// 						lat: gps.latitude,
			// 						lng: gps.latitude
			// 					})
			// 					if (result) {
			// 						this.setPagedata('', 'shop_list', result.data.list,
			// 							'shop_getApiList', false);
			// 					}
			// 				},
			// 				fail: () => {
			// 					this.loading = 3;
			// 				}
			// 			});
			// 			c
			// 		},
			// 		fail: (err) => {
			// 			this.loading = 3;
			// 		}
			// 	});
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.shop_manager_item {
		padding: 24rpx;

		.goods_box_item {
			box-sizing: border-box;
			width: 100%;
			background-color: #fff;
			border-radius: 16rpx;
			padding: 34rpx 28rpx;
			margin-bottom: 24rpx;

			.address {
				margin-bottom: 30rpx;

				.address_name {
					color: #000;
					//font-family: PingFang SC;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 700;
				}
			}

			.shop_manager {
				margin-bottom: 30rpx;
				display: flex;

				.label_wid {
					// width: 230rpx;
					margin-left: 10rpx;
					text-align: right;
					color: #999;
					//font-family: PingFang SC;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
				}
			}

			.contact_information {
				width: 100%;
				height: 100rpx;
				display: flex;
				//background: red;

				.label_wid {
					flex-shrink: 0;
					width: 140rpx;
					text-align: right;
					color: #999;
					//font-family: PingFang SC;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
				}

				.contact_list {
					height: 100rpx;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					//background: blue;

					.contact_information_list {
						flex: 1;
						display: flex;

						.contact_information_item {
							width: 240rpx;
							height: 40rpx;
							display: flex;
							align-items: center;
							border-radius: 6rpx;
							border: 1rpx solid #E0E0E0;
							background: #F7F7F7;
							padding: 0 12rpx;

							.number {
								width: 0rpx;
								flex: 1;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								font-size: 22rpx;
								margin-left: 8rpx;
								//background: red;
							}
						}
					}
				}

			}
		}
	}
</style>