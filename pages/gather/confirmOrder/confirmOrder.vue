<template>
	<view class="basic_wrap">
		<view class="basic_wrap_top">
			<!-- address info-->
			<view class="title" v-if="isOnlineExam">
				Gemstones can be used to offset the price of goods, with each one capable of offsetting 0.1 US dollars.
				The maximum offset is 50%. The current quantity of gemstones is
				<text class="fw"> {{userInfo.food}}</text>
			</view>
			<view class="title" @click="showGemModal=true" v-if="isOnlineExam">
				Click here to set up gemstone offset
			</view>
			<view class="address_info_box bg_w">
				<!-- user have write address -->
				<view class="address_info flex-between" v-for="(item,index) in addressInfo" :key="index"
					v-show="userInfo&&userInfo.is_exists_address==1&&addressInfo">
					<view class="address_detail ">
						<p>
							<text style="font-size: 24rpx;">{{item.name}}</text> <text
								style="margin-left: 15rpx;font-size: 28rpx;">{{item.phone}}</text>
						</p>
						<p style="font-size: 28rpx;margin-top:4rpx;">
							{{item.province}}{{item.city}}{{item.area}}{{item.address}}
						</p>
					</view>
					<view class="address_detail ">
						<text v-show="userInfo.is_exists_address==0">{{$t('confirmOrder.plsWriteShipAddress')}}</text>
						<text v-show="addressInfo.length==0">{{$t('confirmOrder.plsSetDefaultAd')}}</text>
					</view>
					<view class="address_icon" @click="topage('market/address?order=1')">
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>

				<!-- user do not write address -->
				<view class="address_info flex-between ">
					<view class="address_detail ">
						<text v-show="!Object.keys(userInfo).length">{{$t('confirmOrder.plsWriteShipAddress')}}</text>
						<text v-show="userInfo.is_exists_address==0">{{$t('confirmOrder.plsWriteShipAddress')}}</text>
						<text
							v-show="userInfo.is_exists_address==1&&addressInfo.length==0">{{$t('confirmOrder.plsSetDefaultAd')}}</text>
					</view>
					<view class="address_icon" @click="topage('market/address?order=1')" v-show="addressInfo.length==0">
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
			<!-- goods info-->
			<view class="goods_info_box flex-between bg_w">
				<view class="goods_info_box_item goods_img_box flex-center">
					<view class="imgBox flex-center">
						<image :src="handleImgUrl(imgList[0])" mode="heightFix"></image>
					</view>
				</view>
				<view class="goods_info_box_item goods_right_box flex-colum-around">
					<view class="goods_name">
						<text>{{goodsDetail.goods_name}}</text>
					</view>
					<view class="goods_priceNum flex-between">
						<view class=" goods_price bold df alc ">
							<text style="color: red;font-size:24rpx;margin-right: 4rpx;"
								v-show="goods_price_type==='USD'">$</text>
							<u-icon name="/static/btn/gem-icon1.png" size='16'
								v-show="goods_price_type!=='USD'"></u-icon> <span>{{goodsDetail.goods_price}}</span>
							<span style="color: red;" v-show="gems!==''||gems!=0">({{-(gems*0.1)}})</span>
						</view>
						<view class="goods_num">
							<u-number-box integer v-model="value" :min="1" :max="100" button-size="28"
								@change="valChange"></u-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- BUY NOW BTN -->
		<view class="buyNow_box flex-between bg_w">
			<view class="totolPrice df alc">
				{{$t('confirmOrder.totol')}}
				<text style="color: red;font-size:24rpx;margin-right: 4rpx;" v-show="goods_price_type==='USD'">$</text>
				<u-icon name="/static/btn/gem-icon1.png" size='16' v-show="goods_price_type!=='USD'"></u-icon>
				<span>{{totolPrice}}</span>
			</view>
			<view class="buy_btn">
				<text class="flex-center color_w" @click="payNow">{{$t('confirmOrder.buyNow')}}</text>
			</view>
		</view>
		<u-popup :show="showGemModal" :round='20' mode="bottom" @close="showGemModal=false">
			<view class="GemModal ">
				<view class="fw tc">Use gemstones to offset</view>
				<view class="GemModal_content">
					<input class="GemModal_ipt" v-model="modalGems" type="number"
						placeholder="number of gemstones used" />
					<view class="df alc spb tc">
						<view class="GemModal_btn">
							cancel
						</view>
						<view class="GemModal_btn confirm" @click="confirm">
							Confirm use
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
	import {
		pages
	} from "@/common/mixins/index.js";
	import goodsData from '@/common/goodsData/goodsData.js';
	import time from '@/common/utils/time.js';
	import orderNum from '@/common/utils/orderNum.js';
	//排序签名
	import genSignParams from '@/common/utils/signSortParams.js';

	//Md5加密
	import md5 from "md5";

	import qs from 'qs'

	import axios from "axios";

	export default {
		mixins: [pages],
		components: {
			uniIcons
		},
		data() {
			return {
				isOnlineExam: uni.getStorageSync('isOnlineExam'),
				goods_price_type: uni.getStorageSync('goods_price_type'),
				showGemModal: false,
				value: 1,
				num: 1,
				addressInfo: [],
				userInfo: {},
				imgSrc: "",
				goodsId: 0,
				gems: '',
				goodsPrice: "",
				goodsName: "",
				goodsDetail: {},
				imgList: [],
				timer: null, //下单的定时器
				address_id: '',
				modalGems: '',
			};
		},
		computed: {
			// user_info() {
			// 	return this.$store.getters.get_user_info
			// },
		},
		onShow() {
			this.page = 1;
			uni.$once('update', (query) => {
				this.addressInfo[0] = query
				this.address_id = this.addressInfo[0].id
			})
			if (this.is_login) {
				this.get_user_info();
				if (this.addressInfo.length == 0) this.getAddress();
			}

			this.getGoodDetails();

			uni.setNavigationBarTitle({
				title: this.$t('confirmOrder.confirmOrder')
			})
			//this.initData()
		},
		onLoad(options) {
			console.log("确认订单id===>", options.id);
			this.goodsId = options.id;
		},
		computed: {
			totolPrice() {
				// return (this.num * this.goodsPrice).toFixed(2);
				return (this.num * (this.goodsDetail.goods_price - (this.gems * 0.1)));
			},
			is_login() {
				return this.$store.getters.is_login;
			},
		},
		methods: {
			confirm(e) {
				if (this.modalGems.includes('.')) {
					this.$u.toast('Quantity can only be entered as an integer')
					let index = this.modalGems.indexOf('.')
					this.modalGems = this.modalGems.substr(0, index)
					return
				} else if (Number(this.modalGems) > Number(this.userInfo.food)) {
					// console.log(typeof(this.modalGems), typeof(this.userInfo.food))
					this.$u.toast('Cannot be greater than the number of holdings')
					let index = this.userInfo.food.indexOf('.')
					this.modalGems = this.userInfo.food.substr(0, index)
					return
				}
				this.gems = this.modalGems
				this.showGemModal = false

			},
			//获取商品详情
			async getGoodDetails() {
				let res = await uni.ajax.getGoodsDetailsList({
					id: this.goodsId
				})
				//console.log("商品详情列表", res);
				this.imgList = res.data.img_list;
				this.goodsDetail = res.data;
			},
			payNow() {
				//this.requestPay();
				//console.log("addressInfo", this.addressInfo);
				if (this.userInfo.is_exists_address == 0) {
					uni.showToast({
						title: this.$t('confirmOrder.plsSetAddressFirst'),
						icon: "none"
					})
					return;
				}
				if (this.addressInfo.length == 0) {
					uni.showToast({
						title: this.$t('confirmOrder.plsSetDefaultAdrFirst'),
						icon: "none"

					})
					return;
				}
				//console.log("去银行卡信息页面");

				// this.debounce(this.placeOrder, 1000);

				// 如果存在定时器，则清除之前的定时器
				if (this.timer) {
					clearTimeout(this.timer);
				}
				// 创建新的定时器，延迟一定时间后执行下单操作
				this.timer = setTimeout(() => {
					this.placeOrder();
				}, 500); // 设置延迟时间（单位：毫秒）

			},
			//下单操作
			async placeOrder() {
				let res = await uni.ajax.placeOrder({
					goods_id: this.goodsId,
					num: this.num,
					address_id: this.address_id,
					use_food_num: this.gems * this.num
				})
				//console.log("下单结果", res);
				if (res.code == 200) {
					//uni.$u.toast('下单成功!')
					const bankInfo = {
						goodsName: this.goodsDetail.goods_name,
						price: this.totolPrice
					}
					this.topage(`gather/bankInfo/bankInfo?bankInfo=${JSON.stringify(bankInfo)}`);
				}
			},
			//防抖函数
			// debounce(fn, time) {
			// 	let timer = null;
			// 	return function(...args) {
			// 		let _this = this;
			// 		if (timer) {
			// 			clearTimeout(timer);
			// 		}
			// 		timer = setTimeout(() => {
			// 			fn.apply(_this, args);
			// 		}, time)
			// 	}
			// },
			//第三方支付
			async questPay() {
				let res = await uni.ajax.addSunpay4vi({
					id: this.goodsId,
					goods_price: "50000",
					pay_type: "022",
					bank_code: "VPB",
					typeStr: "sunPay"
				});
				//console.log("调用结果-->", res);
				if (res.code == 200) {
					console.log("调用成功-->");
					console.log("res_success==>", res.data.payInfo);

					uni.setStorage({
						key: "pay_url",
						data: res.data.payInfo,
						success: () => {
							this.topage("general/web/index");
						}
					})
					uni.showToast({
						title: res.data.tradeMsg
					})
				} else {
					console.log("res_error==>", res);
					uni.showToast({
						title: res.data.tradeMsg
					})
				}
			},
			//本地模拟 银行卡支付
			requestPay() {
				console.log("time", time());
				console.log("orderNum", orderNum(this.goodsId));
				let params = {
					mch_id: "101001002",
					notify_url: 'http://localhost:8002/#/',
					page_url: "http://localhost:8002/#/",
					pay_type: "022",
					trade_amount: "50000",
					bank_code: "VPB",
					goods_name: "test_good",
					mch_return_msg: this.goodsId,
					mch_order_no: orderNum(this.goodsId),
					order_date: time(),
					version: "1.0"

				}
				// params.sign_type= "MD5",
				let params2 = genSignParams(params, "d76276295d6f43c49d9e450327af4d2f")
				console.log("params2==", params2);
				let sign = md5(params2)
				// console.log("sign==", sign);
				// params.sign = sign
				// params.sign_type = "MD5"
				let params3 = {
					bank_code: params.bank_code,
					goods_name: params.goods_name,
					mch_id: params.mch_id,
					mch_order_no: params.mch_order_no,
					mch_return_msg: this.goodsId,
					notify_url: params.notify_url,
					order_date: params.order_date,
					page_url: params.page_url,
					pay_type: params.pay_type,
					sign: sign,
					sign_type: "MD5",
					trade_amount: params.trade_amount,
					version: params.version

				}
				let params4 = qs.stringify(params3)
				console.log("params4==", params4);

				const config = {
					headers: {
						// 添加请求头
						"Content-Type": "application/x-www-form-urlencoded"
					}
				};
				return new Promise((resolve, reject) => {
					axios
						.post(
							"/api2/pay/web",
							params4,
							config
						)
						.then(res => {
							console.log("越南付款==>", res.data);
							if (res.data.tradeResult == 1 && res.data.payInfo) {
								window.location.href = res.data.payInfo
								Toast(res.data.tradeMsg)

							} else {
								Toast(res.data.tradeMsg)
							}

						})
						.catch((err) => {
							// reject();
							console.log("error==>", err);
						});
				});
			},
			initData() {
				const goodInfo = goodsData.filter((item) => {
					return item.id == this.goodsId;
				})
				this.imgSrc = goodInfo[0].cover.show_src;
				this.goodsPrice = goodInfo[0].price;
				this.goodsName = goodInfo[0].title;
				//console.log("goodsPrice", this.goodsPrice);
			},
			//改变商品数量
			valChange(e) {
				//console.log('当前值为: ' + e.value)
				this.num = e.value;

			},
			//获取地址列表
			async getAddress() {
				var res = await uni.ajax.shop_addressGetlist({
					page: this.page,
					limit: uni.conf.limit,
					type: 1
				});
				//console.log("addressInfo", res.data.list);
				this.addressInfo = res.data.list;
				this.address_id = this.addressInfo.length > 0 ? this.addressInfo.filter((item) => item.type === 1)[0]
					.id : null;
				//console.log("address_id", this.address_id);
			},
			// get_user_info() { //获取个人信息
			// 	this.userInfo = uni.getStorageSync("user_info");
			// 	//console.log("userInfo", userInfo);
			// },
			async get_user_info() { //获取个人信息
				let res = await uni.ajax.public_getUserInfo();
				console.log("user==========res", res.data);
				this.userInfo = res.data;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.basic_wrap {
		width: 100%;
		box-sizing: border-box;
		color: #000;

		.title {
			background-color: #fff;
			color: red;
			padding: 20rpx;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
		}

		// padding: 20rpx;
		.basic_wrap_top {
			padding: 20rpx;
		}

		.address_info_box {
			width: 100%;
			height: 120rpx;
			border-radius: 15rpx;
			padding: 20rpx;
			//background: red;

			.address_info {
				width: 100%;
				height: 100%;
				//background: yellow;
			}
		}

		.goods_info_box {
			width: 100%;
			height: 220rpx;
			border-radius: 15rpx;
			padding: 20rpx;
			margin-top: 25rpx;
			//background: red;

			.goods_info_box_item {
				height: 100%;
				//background: yellow;
			}

			.goods_img_box {
				flex: 1;
				// padding: 10rpx;
				//background: blue;

				.imgBox {
					width: 200rpx;
					height: 190rpx;
					background: #fff;
					border-radius: 15rpx;

					image {
						height: 150rpx;
					}
				}
			}

			.goods_right_box {
				flex: 2;
				//background: blue;

				.goods_name {
					font-size: 34rpx;
					color: #000;
				}

				.goods_priceNum {
					.goods_price {
						span:nth-child(1) {
							font-size: 24rpx;
						}

						span:nth-child(2) {
							font-size: 28rpx;

						}
					}
				}

				//background: blue;
			}
		}

		.buyNow_box {
			width: 100%;
			height: 120rpx;
			background: #fff;
			position: fixed;
			bottom: 0;
			padding: 0 20rpx;
			color: #000;
			//background: red;

			.totolPrice {
				span:nth-child(1) {
					font-size: 24rpx;
				}

				span:nth-child(2) {
					font-size: 36rpx;
					font-weight: 600;
				}
			}

			.buy_btn {
				letter-spacing: 4rpx;
				font-family: Source Han Sans CN, Source Han Sans CN;
				background: #333333;
				border-radius: 10rpx;
				//background: #000;

				text {
					padding: 15rpx 30rpx;
				}
			}
		}

		.GemModal {
			// height: 300rpx;
			padding: 20rpx;
			background-color: #f5f5f5;
			border-radius: 40rpx 40rpx 0 0;

			.GemModal_content {
				margin-top: 20rpx;
				padding: 20rpx;

				.GemModal_ipt {
					background-color: #fff;
					height: 100rpx;
					line-height: 100rpx;
					padding: 0 20rpx;
					border-radius: 20rpx;
				}

				.GemModal_btn {
					width: 45%;
					margin-top: 40rpx;
					line-height: 80rpx;
					font-size: 30rpx;
					border-radius: 40rpx;
					background-color: #fff;
				}

				.confirm {
					background-color: #5392FB;
					color: #fff;
				}
			}
		}
	}
</style>