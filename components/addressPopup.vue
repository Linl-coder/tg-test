<template>
	<view class="addressPopup">
		<u-popup :show="show" round="24rpx" mode="center" @close="close">
			<view class="addr">
				<view class="title">
					选择地址
				</view>
				<scroll-view class="scroll" scroll-y @scrolltolower="scrolltolower">
					<view :class="['addr_item',current == index ? 'active' : '']" v-for="item,index in addressList"
						:key="item.id" @click="select_addr(item,index)">
						<view class="flex-start">
							<text class="address_title flex-center">{{item.name}}</text>
							<text class="phone">{{item.phone}}</text>
							<view class="tab flex-center" v-if="item.type==1">
								默认
							</view>
						</view>
						<view class="des">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</view>
					</view>
					<u-loadmore v-if="!is_empty" :status="status" />
					<u-empty :show="is_empty" mode="address">
						<u-button type="primary" @click="add_address">添加收货地址</u-button>
					</u-empty>
				</scroll-view>
				<view class="submit" @click="to_buy">
					<view>提交</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "addressPopup",
		data() {
			return {
				current: -1,
				show: false,
				page: 1,
				addressList: [],
				is_empty: false,
				status: 'loadmore'
			};
		},
		methods: {
			open() {
				this.show = true;
				if (!this.addressList.length) {
					this.is_empty = false
					this.status = 'loadmore'
					this.getAddressList()
				}
				this.$emit('open');
			},
			close() {
				this.show = false;
				this.$emit('close')
			},
			async getAddressList() {
				this.status = 'loading'
				let {
					data: res
				} = await uni.ajax.shop_addressGetlist({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {
					console.log(res)
					this.addressList = [...this.addressList, ...res.list];
					if (!res.list.length && this.page == 1) {
						this.is_empty = true
					}
					this.$nextTick(() => {
						if (this.addressList.length >= res.count) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
							this.page += 1
						}
					})
				}
			},
			scrolltolower() {
				console.log('触底')
				if (this.status == 'loadmore') {
					this.getAddressList()
				}
			},
			select_addr(val, i) {
				// console.log(i,this.current)
				// console.log(val,i)
				this.current = i;
			},
			to_buy() {
				if (this.current == -1) {
					return uni.$u.toast('请选择收货地址')
				}
				this.show = false;
				this.$emit('buy', {
					id: this.addressList[this.current].id
				})
			},
			add_address() {
				this.topage('market/edit_address');
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addressPopup {
		.addr {
			width: 686rpx;
			min-height: 700rpx;
			max-height: 800rpx;
			border-radius: 24rpx;
			overflow: hidden;

			.title {
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.scroll {
				// width: 100%;
				padding: 0 24rpx;
				box-sizing: border-box;
				height: calc(100% - 100rpx - 88rpx);

				.addr_item {
					padding: 24rpx;
					border-radius: 16rpx;
					margin-bottom: 24rpx;
					// box-shadow: 0rpx 6rpx 8rpx #ccc;
					border: 2rpx solid #ccc;

					.address_title {
						font-size: 30rpx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: #000;
					}

					.phone {
						color: #000;
						font-size: 26rpx;
						margin: 0rpx 10rpx;
					}

					.tab {
						width: 60rpx;
						height: 36rpx;
						border-radius: 8rpx;
						opacity: 1;
						border: 2rpx solid var(--theme);
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: var(--theme);
					}

					.des {
						margin-top: 10rpx;
						width: 80%;
						font-size: 26rpx;
						font-family: PingFang-SC-Regular, PingFang-SC;
						font-weight: 400;
						color: #000;
						text-align: justify;

						text {
							margin-right: 15rpx;
						}

					}
				}

				.active {
					border-color: var(--theme);
				}
			}

			.submit {
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				// background-color: red;
				>view {
					background: var(--linear-gradient-theme);
					padding: 12rpx 48rpx;
					border-radius: 100px;
					color: #fff;
				}
			}
		}
	}
</style>