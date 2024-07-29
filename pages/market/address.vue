<template>
	<view class="address">
		<u-radio-group placement="colum" v-model="value" @change="radioGroupChange" style="width: 100%;">
			<view class="list" v-for="(item,index) in addressArr" :key="index" @click="order_fn(item)">
				<view class="list_item  ">
					<view class="left flex-colum-start">
						<div class="flex-start">
							<text class="address_title flex-center">{{item.name}}</text>
							<text class="phone">{{item.phone}}</text>
							<view class="tab flex-center" v-if="item.type==1">
								{{$t('utils.default')}}
							</view>
						</div>
						<text class="des">
							{{item.province}}{{item.city}}{{item.area}}{{item.address}}
						</text>
						<image src="/static/btn/edit.png" @tap.stop="edit(item)" class="edit" mode=""></image>
					</view>
					<view class="right flex-end">
						<text class="delete" @tap.stop="delAddress(index)">
							{{$t('address.delete')}}
						</text>
					</view>
				</view>
			</view>
		</u-radio-group>
		<view class="addAddress_box flex-center">
			<button class="flex-center" @click="addAdress">+ {{$t('address.addShipAddress')}}</button>
		</view>
		<iloading :result="loading"></iloading>
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
				value: -1,
				addressArr: [],
				is_order: -1,
				loading: 1,
				isEmpty: false
			}
		},
		onShow() {
			this.page = 1;
			this.addressArr = [];
			this.loading = 1;
			this.isEmpty = false;
			this.getAddress();
			//console.log("123123");

			uni.setNavigationBarTitle({
				title: this.$t('address.shipAddress')
			})
		},
		onLoad(option) {
			this.is_order = option.order;
		},
		onNavigationBarButtonTap() {
			this.topage('market/edit_address');
		},
		methods: {
			addAdress() {
				this.topage('market/edit_address?empyList=' + this.isEmpty);
			},
			order_fn(item) {
				if (this.is_order == 1) {
					uni.$emit('update', item);
					uni.navigateBack({
						delta: 1
					})
				}
			},
			edit(item) {
				let _this = this
				uni.setStorage({
					key: "edit_address",
					data: item,
					success: () => {
						_this.topage('market/edit_address?type=edit')
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			//设置默认地址
			async radioGroupChange(e) {
				var res = await uni.ajax.edit_state({
					type: this.addressArr[e].type == 1 ? "1" : 0,
					code: this.addressArr[e].code
				});
				this.getAddress();
			},
			//获取地址列表
			async getAddress() {
				var res = await uni.ajax.shop_addressGetlist({
					page: this.page,
					limit: uni.conf.limit
				});
				//console.log("地址列表==>", res.data.list);
				if (res.data.list.length == 0) {
					this.isEmpty = true;
				}
				if (res) {
					this.setPagedata('', 'addressArr', res.data.list, 'getAddress', false);
				}
			},
			//页面跳转
			jump(url, type, otherNum = {}) {
				otherNum.status = type;
				uni.pro.navigateTo(url, otherNum)
			},
			//删除地址
			delAddress(index) {
				uni.showModal({
					title: this.$t('address.tip'),
					content: this.$t('address.sureDelAddress'),
					confirmText: this.$t('utils.confirm'),
					cancelText: this.$t('utils.cancel'),
					success: async res => {
						if (res.confirm) {
							let delStatus = await uni.ajax.shop_addressDel({
								id: this.addressArr[index].id
							});
							uni.showToast({
								title: this.$t('address.delSuccess'),
								icon: 'success'
							});
							this.addressArr.splice(index, 1);
							if (this.addressArr.length <= 0) {
								this.loading = 3;
								this.isEmpty = true;
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;

	}

	.addAddress_box {
		width: 100%;
		height: 120rpx;
		background: #fff;
		position: fixed;
		bottom: 0;

		button {
			width: 95%;
			height: 100rpx;
			color: #fff;
			font-size: 30rpx;
			font-weight: bold;
			background: #000;

		}
	}

	.address {

		// padding: 20rpx 25rpx;

		.btn {
			color: #FFFFFF;
			width: 100%;
			height: 100rpx;
			margin-top: 100rpx;
			background: url('@/static/else/old01.png') no-repeat 100%;
			border-radius: 100rpx;
		}

		.list {
			width: 100%;
			margin: 30rpx 0;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.06);
			height: 256rpx;
			border-radius: 10rpx;

			.list_item {
				height: 100%;
				padding: 0rpx 20rpx;
				border-radius: 10rpx;
				font-size: 30rpx;

				.left {
					height: 170rpx;
					width: 100%;
					border-bottom: 1rpx solid #f5f5f5;
					position: relative;

					.edit {
						position: absolute;
						width: 40rpx;
						height: 40rpx;
						right: 25rpx;
					}

					.address_title {
						font-size: 24rpx;
						font-family: PingFang-SC-Medium, PingFang-SC;
						font-weight: 500;
						color: #000;

					}

					.phone {
						color: #000;
						font-size: 32rpx;
						margin: 0rpx 15rpx;
					}

					.tab {
						// width: 60rpx;
						height: 36rpx;
						border-radius: 8rpx;
						padding: 4rpx 10rpx;
						opacity: 1;
						border: 2rpx solid #DBB36A;
						font-size: 20rpx;
						// font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #DBB36A;
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

				.right {
					height: 86rpx;

					.delete {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 28rpx;
					}
				}
			}

			.f {

				height: 33px;
				font-size: 24rpx;
				font-family: PingFang-SC-Regular, PingFang-SC;
				font-weight: 400;
				color: #666666;
				line-height: 33px;
			}
		}
	}
</style>