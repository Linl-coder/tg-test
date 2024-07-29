<template>
	<view class="car">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<u-checkbox-group v-model="checkboxValue1" @change="checkboxGroupChange" style="flex-wrap: wrap;">
			<view class="list flex-start" v-for="(item,index) in list" :key="index">
				<view class="left flex-center">
					<u-checkbox :name="item.id+','+item.pool.id" label-size="0">
					</u-checkbox>
				</view>
				<view class="right flex-start">
					<view class="img_box">
						<image :lazy-load="true" :src="item.pool.cover.show_src" mode=""></image>
					</view>
					<view class="des flex-colum-start">
						<view class="title">
							{{item.pool.title}}
						</view>
						<view class="price">
							#{{item.no}}/{{item.pool.num}}
						</view>
					</view>
					<!-- <view class="delete flex-center">
						<u-icon name="trash" color="#333333" size="30"></u-icon>
					</view> -->
				</view>
			</view>
		</u-checkbox-group>
		<iloading :result="loading"></iloading>
		<!-- 提交栏 -->
		<view class="submit_tab flex-center">
	
			<view class="submit_tab_box flex-center" @tap="submit(0)">
				<view class="btn flex-center">
					合成
				</view>
			</view>
		</view>

		<u-popup :show="show"  mode="center" round="8" @close="show=false">
			<view class="flex-colum">
				<view  style="border-radius: 16rpx 16rpx 0rpx 0rpx;overflow: hidden;">
					<u--image :showLoading="true"  mode="widthFix" class="icon" :src="syninfo.cover" width="500rpx"  height=""></u--image>
				</view>
				<text class="" style="margin: 36rpx 0rpx;">恭喜获得 {{syninfo.title}}</text>				
				<view class="btnsee flex-center" @tap="toredirect('gather/collect/mycollect')">
					去查看
				</view>
		    </view>
		</u-popup>
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
				show:false,
				list: [],
				with_id: "",
				loading: 1,
				checkboxValue1: [],
				syninfo:{}
				
			}
		},
		computed: {
			total_price() { //计算商品总价格
				let price = 0;
				if (this.list.length != 0) {
					this.list.forEach(item => {
						if (item.checked) {
							price += item.price
						}
					})
					return price.toFixed(2);
				} else {
					return price.toFixed(2);
				}
			},
		},
		onLoad(query) {
			this.with_id = query.with_id;
			this.collect_getUserGoodByFuseId();
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			is_login() {
				return this.$store.getters.is_login;
			}
		},
		methods: {
			async collect_getUserGoodByFuseId() {
				let res = await uni.ajax.collect_synPoolList({
					with_id: this.with_id,
					page: this.page,
					limit: uni.conf.limit,	
				})
				if (res) {				
					this.setPagedata("", 'list', res.data, 'collect_getUserGoodByFuseId', false);
				}
			},
			async submit(type) {
				let pool = [];
				if (type == 0) {
					if (this.checkboxValue1.length > 0) {
						this.checkboxValue1.forEach((item) => {
							pool.push({
							 user_pool_id: item.split(',')[0],
							 goods_id: item.split(",")[1]
							})
						})
					} else {
						uni.showToast({
							title: "请选择合成材料",
							icon: "none"
						})
						return false;
					}
				}
				let res = await uni.ajax.collect_syn({
					pool: pool,
					with_id: this.with_id,
					num:1
				})
				if (res) {
					this.syninfo=res.data;
					this.show=true;
				}
			},
			checkboxGroupChange(e) { //当商品全部选择全选勾选
				e.length == this.list.length ? this.all_checked = true : this.all_checked = false;
			},



		}
	}
</script>

<style lang="scss">
	page {

		background-color: #f6f6f6;
	}
	.btnsee{
		min-width: 320rpx;
		background: url('@/static/else/old01.png') no-repeat 100%;
		height: 88rpx;
		border-radius: 16rpx;
		box-sizing: border-box;
		color: #FDF6EC;
		margin-bottom: 24rpx;
	}

	.car {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow: hidden;
		position: relative;
		padding: 20rpx 30rpx 144rpx 30rpx;
		box-sizing: border-box;

		.submit_tab {
			position: fixed;
			padding: 0rpx 30rpx;
			box-sizing: border-box;
			width: 100%;
			left: 0rpx;
			height: 144rpx;
			background-color: #FFFFFF;
			z-index: 10;
			bottom: 0rpx;

			.submit_tab_box {
				width: 90%;
				background: url('@/static/else/old01.png') no-repeat 100%;
				height: 88rpx;
				border-radius: 16rpx;
				box-sizing: border-box;
				color: #FDF6EC;

				.price {
					flex: 1;
					border-right: 1rpx solid #F1F1F1;
				}

				.btn {
					width: 50%;
				}
			}
		}

		.list {
			background-color: #FFFFFF;
			border-radius: 10rpx;
			height: 220rpx;
			width: 100%;
			margin-bottom: 20rpx;

			.left {
				width: 10%;
				height: 100%;

				/deep/.u-checkbox__label {
					margin: 0rpx !important;
				}
			}

			.right {
				flex: 1;
				height: 100%;

				.img_box {
					image {
						width: 150rpx;
						height: 150rpx;
						background-color: #f6f6f6;
					}
				}

				.des {
					padding-left: 20rpx;
					height: 60%;
					justify-content: space-around;
					box-sizing: border-box;
					flex: 1;

					.title {
						color: #333333;
						font-size: 28rpx;
						width: 100%;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.price {
						color: #000;
						font-weight: bold;
					}
				}

				.delete {
					width: 10%;
				}
			}
		}
	}
</style>
