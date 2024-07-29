<template>
	<view class="consignment">
		<view class="card">
			<view class="title"><text class="t">收款账户</text></view>
			<view class="desc"><text class="t">我的钱包</text></view>
			<view class="desc"><text class="t1">寄售收入将在卡牌售出后立即到账</text></view>
		</view>

		<view class="card">
			<view class="title"><text class="t">寄售商品</text></view>
			<view class="shop_box flex-start" v-if="buy_type == 1">
				<view class="imgbox"><u--image :showLoading="true" :src="info.pool.img.show_src" width="120rpx"
						height="120rpx"></u--image></view>
				<view class="info flex-colum-start">
					<text class="t t1">{{ info.pool.title }}</text>
					<view class="flex-start">
						<text class="t t2">{{ info.order_no }}</text>
						<text class="t t3">#{{ info.no }}/{{ info.pool.num }}</text>
					</view>
					<text class="t t3" style="word-break: break-all;">链上标识：{{hash(info.nft_id)}}</text>
				</view>
			</view>

			<view class="shop_box flex-start" v-if="buy_type == 2">
				<view class="imgbox"><u--image :showLoading="true" :src="info.box.cover.show_src" width="120rpx"
						height="120rpx"></u--image></view>
				<view class="info flex-colum-start" style="justify-content: flex-start;">
					<text class="t t1">{{ info.box.title }}</text>
				</view>
			</view>

		</view>

		<view class="card ">
			<view class="flex-between">
				<view class="title" style="margin-bottom: 0rpx;"><text class="t">设置售价</text></view>
				<view class="price_box flex-end">
					<text class="t1">您的买入价：￥{{ info.price }}</text>

				</view>
			</view>
			<!-- <text class="t1" >该卡牌目前最高限价：￥5000</text> -->
			<view class="price_box flex-end" style="margin-top: 24rpx;">
				<view class="input flex-center">
					<u--input :placeholder="info.pool.max_price>0?'目前最高限价：￥'+info.pool.max_price:'请输入寄售价格'"
						inputAlign="center" fontSize="28rpx" color="#000" type="number" :clearable="true" border="none"
						v-model="form.price" @input="input" maxlength="5"></u--input>
				</view>
			</view>
		</view>

		<view class="card card_i">
			<view class="title"><text class="t">总价</text></view>
			<view class="desc flex-between">
				<text class="t">总售价</text>
				<text class="t2">￥{{ form.price || 0 }}</text>
			</view>
			<view class="desc flex-between">
				<view class="flex-start">
					<text class="t">平台服务费</text>
					<!-- <text class="t1 t3">（{{ this.rate }}%）</text> -->
				</view>
				<text class="t2" v-if="form.price>0">￥{{ serve_price>min_lv?serve_price:min_lv }}</text>
				<text class="t2" v-else>￥0</text>
			</view>
			<view class="desc flex-between"
				style="border-top: 1rpx solid #f5f5f5;margin-top: 20rpx;padding-top: 15rpx;">
				<text class="t">预计收入</text>
				<text class="t2"
					v-if="form.price>0">￥{{ parseFloat(form.price - (serve_price>min_lv?serve_price:min_lv)).toFixed(2) }}</text>
				<text class="t2" v-else>￥0</text>
			</view>
		</view>

		<view class="card">
			<view class="title"><text class="t">寄售规则</text></view>
			<view class="desc"><text class="t">1.商品未经购买前，可取消寄售。一经购买，无法取消寄售</text></view>
			<view class="desc">
				<text class="t">2.您将获得除平台服务费之外的所有寄售收入</text>
			</view>
			<view class="desc">
				<text class="t">3.目前平台服务费为{{rate}}%，平台的最低服务费为{{min_lv}}元</text>
			</view>
		</view>

		<view class="form_btn flex-center" @tap="show_uKeyboard_fn" v-if="info.status == 1"><text class="t">确认寄售</text>
		</view>

		<!-- 支付键盘 -->
		<keyboard ref="Keyboard" @confirm="mark_sell"></keyboard>

	</view>
</template>

<script>
	import Keyboard from '@/components/Keyboard/Keyboard.vue';
	export default {
		components: {
			Keyboard
		},
		data() {
			return {
				form: {
					price: '',
					password: ''
				},
				info: {},
				buy_type: 1, //1 卡牌 2盲盒
				rate: 0,
				min_lv: 0,
				certification_standard: getApp().globalData.certification_standard
			};
		},
		computed: {
			serve_price() {
				return ((this.form.price * this.rate) / 100).toFixed(2);
			}
		},
		onLoad(option) {
			this.buy_type = option.buy_type;
			this.info = uni.getStorageSync('collect_consignment_info');

			this.getAbout();
		},
		methods: {
			async getAbout() {
				let res = await uni.ajax.public_getProgramConfig({});
				this.rate = res.data.market.lv * 100;
				this.min_lv = res.data.market.min_lv;
			},
			async mark_sell(pwd) {
				this.form.password = pwd;
				await uni.utils.is_null(this.form.password, '请输入支付密码');
				let res = await uni.ajax.collect_sale({
					buy_type: this.buy_type,
					price: this.form.price,
					sell_id: this.info.id,
					pay_password: this.form.password,
				});
				if (res) {
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					});
					setTimeout(() => {
						this.topage('gather/collect/mycollect');
					}, 500);
				}
			},
			async show_uKeyboard_fn() {
				await uni.utils.is_null(this.form.price, '请输入价格');
				if (Number(this.form.price) > Number(this.info.pool.max_price)) {
					uni.showToast({
						title: "寄售价格不能大于最高限价",
						icon: "none"
					})
					return false;
				}
				this.$refs.Keyboard.open();
			},
			confirm(e) {
				this.cancel();
			},
			input(e) {
				if (e.toString().includes(".")) {
					this.$nextTick(() => { //限制输入整数
						this.form.price = Math.floor(this.form.price);
					})
					// this.form.price = this.form.price.replace( //限制输入小数点后两位
					// 	/^(-)*(\d+)\.(\d\d).*$/,
					// 	"$1$2.$3"
					// ); 
				}
			}

		}
	};
</script>

<style lang="scss">
	.consignment {
		padding: 32rpx;

		padding: 24rpx 32rpx;

		.form_btn {
			background: url('@/static/else/old01.png') no-repeat 100%;
			width: 100%;
			border-radius: 24rpx;
			height: 88rpx;
			color: #ffffff;
		}

		.i_input {
			margin-bottom: 16rpx;

			.select_box {
				background: #f4f5f7;
				border-radius: 4rpx;
				width: 160rpx;
				height: 160rpx;
				margin-right: 8rpx;
				margin-top: 16rpx;
			}
		}

		.card {
			margin-bottom: 24rpx;
			width: 686rpx;
			border-radius: 12rpx;
			background: #ffffff;
			box-shadow: 0px 4rpx 32rpx 0px rgba(0, 0, 0, 0.08);
			padding: 24rpx;
			box-sizing: border-box;

			.price_box {
				.t1 {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 28px;
				}

				.input {
					margin-left: 15rpx;
					padding-left: 15rpx;
					box-sizing: border-box;
					width: 100%;
					text-align: center;
					height: 70rpx;
					background: #f5f5f5;
					border-radius: 8rpx;
				}
			}

			.shop_box {
				.imgbox {
					.icon {
						width: 120rpx;
						height: 120rpx;
					}
				}
			}

			.info {
				height: 120rpx;
				padding-left: 20rpx;
				justify-content: space-around;

				.t {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000;
					line-height: 33rpx;
				}

				.t2 {
					font-size: 24rpx;
				}

				.t3 {
					font-size: 24rpx;
					color: #999999;
				}
			}

			.title {
				margin-bottom: 16rpx;

				.t {
					font-size: 32rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					line-height: 38rpx;
					color: #000;
				}
			}

			.desc {
				.t {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000;
					line-height: 28rpx;
				}

				.t1 {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 28rpx;
				}

				.t2 {
					font-size: 28rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000;
					line-height: 33rpx;
				}

				.t3 {
					color: #999999;
				}
			}
		}

		.card_i {
			.desc {
				height: 60rpx;
			}
		}
	}
</style>