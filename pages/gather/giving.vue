<template>
	<view class="giving">
		<view class="header flex-colum">
			<view class="icon_box flex-center">
				<u--image :showLoading="true" :src="handleImgUrl(giving_info.img)" width="300rpx"
					height="300rpx"></u--image>
			</view>
			<text class="name">{{ giving_info.name }}</text>
		</view>

		<view class="desc_box">
			<view class="desc_title">
				<!-- <text class="t">转赠{{ giving_info.buy_type == 1 ? '卡牌' : '盲盒' }}</text> -->
				<text class="t">{{$t('giving.transferCard')}}</text>
			</view>
			<view class="desc">
				<text class="t">{{$t('giving.loginPhone')}}: {{ mobile }}</text>
			</view>
		</view>

		<view class="form_box">
			<view class="df alc" v-show="user_show">
				<!-- 转赠对象 -->
				<text style="margin-right: 20rpx;">{{$t('giving.transferName')}}:</text>
				<u-avatar :src="user.avatar" size='40'></u-avatar>
				<text style="margin-left: 20rpx;">{{user.nickname}}</text>
			</view>
			<view class="form_input flex-between" style="margin: 20rpx 0;">
				<u--input :placeholder="$t('giving.inputOtherId')" maxlength='8' fontSize="32rpx" color="#999999"
					type="number" :clearable="true" border="none" style="padding-right: 10rpx;" v-model="user_code"
					@input="Input"></u--input>
			</view>

			<view class="form_input flex-between" style="margin-bottom: 20rpx;">
				<u--input :placeholder="$t('giving.inputTranfeiNum')" fontSize="32rpx" color="#999999" type="digit"
					:clearable="true" border="none" v-model="num" style="padding-right: 10rpx;"
					@input="handleInput"></u--input>
			</view>
			<view class="form_desc flex-between">
				<text class="t">
					{{$t('giving.haveCardNum')}}: {{this.cardTotolNum}}
				</text>
				<text class="t" @click="topage('gather/mainland/sendOut/sendOutRecord')">
					{{$t('sendRecord.transferRecord')}}>
				</text>
			</view>
			<!-- <view class="form_desc"><text class="t">信息安全保障中，信息仅用于身份确认</text></view> -->
			<view class="form_btn flex-center" @tap="open_modal()"><text class="t">{{$t('giving.submit')}}</text></view>
			<!-- <view class="form_desc">
				<text class="t">注：根据法律法规要求，实名信息须与注册手机号持有人相符，且年满21周岁。信息安全保障中，以下信息仅用于身份确认，未经您同意不会用于其他用途。</text>
			</view> -->
		</view>

		<!-- 当被转增方不是代理时弹出提示框 -->
		<u-modal :show="showTipModal" @cancel="showTipModal=false" @confirm="openKeyboard"
			:confirmText="$t('utils.confirm')" :cancelText="$t('utils.cancel')" :showCancelButton="true"
			:content="$t('index.notAgentConfirmGive')"></u-modal>

		<!-- 支付键盘 -->
		<keyboard ref="Keyboard" @confirm="confirmUse"></keyboard>

	</view>
</template>

<script>
	import Keyboard from '@/components/Keyboard/Keyboard.vue';
	import {
		pages
	} from '@/common/mixins/index.js';
	import debounce from 'lodash/debounce';
	export default {
		components: {
			Keyboard
		},
		mixins: [pages],
		data() {
			return {
				content: this.$t('giving.sureToTransfer'),
				mobile: '',
				phone: '',
				user_code: '',
				num: "7",
				giving_info: {
					img: '',
					name: ''
				},
				time: null,
				count: 1,
				index: '',
				cardTotolNum: '',
				showTipModal: false,
				user: {},
				user_show: false
			};
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onShow() {
			this.collect_saleGetMyList();
			uni.setNavigationBarTitle({
				title: this.$t('giving.transfer')
			})
		},
		onLoad(option) {
			this.mobile = uni.utils.hide_phone(this.user_info.mobile);
			this.giving_info = uni.getStorageSync('giving_info');
			this.index = option.index;
		},
		onHide() {
			clearInterval(this.time);
			this.time = null;
			this.count = 1;
		},
		destroyed() {
			clearInterval(this.time);
			this.time = null;
		},
		methods: {
			confirmUse: debounce(function(pwd) {
				// 要实现的业务逻辑
				this.giving(pwd);
			}, 2000, {
				leading: true,
				trailing: false
			}),
			Input() {
				if (this.user_code.length == 8) {
					this.getUserInfoByUcode(this.user_code)
				}
			},
			async getUserInfoByUcode(user_code) {
				let res = await uni.ajax.getUserInfoByUcode({
					user_code
				})
				if (res) {
					this.user = res.data
					this.user_show = true
				} else {
					this.user_show = false
				}
			},
			handleInput(event) {
				const inputText = event;
				this.num = inputText.replace(/[^\d]/g, "")
			},
			async collect_saleGetMyList() {
				try {
					let res = await uni.ajax.collect_saleGetMyList({
						limit: uni.conf.limit,
						page: this.page,
						title: '',
						data_type: 2
					});
					if (res) {
						this.cardTotolNum = res.data.list[this.index].think_count;
					}
				} catch (error) {
					console.error(error);
				}
			},
			async public_getAgentInfo() {
				let res = await uni.ajax.public_getAgentInfo({
					user_code: this.user_code
				});
				if (Object.keys(res.data).length == 0 && this.num > 7) {
					this.showTipModal = true;
				} else {
					this.$refs.Keyboard.open();
				}

			},
			openKeyboard() {
				this.$refs.Keyboard.open();
				this.showTipModal = false;
			},
			async open_modal() {
				if (this.count != 1) {
					return false;
				}
				await uni.utils.is_null(this.user_code, this.$t('giving.plsInputOtherId'));
				await uni.utils.is_null(this.num, this.$t('giving.plsInputTransNum'));
				if (this.num == 0) {
					uni.$u.toast(this.$t('giving.transfeuNumError'))
					return false;
				}

				if (!this.isPositiveInteger(this.num, this.giving_info.think_count)) {
					uni.$u.toast(this.$t('giving.plsInputCorrectNum'))
					return false;
				}
				this.public_getAgentInfo();

				// await uni.utils.is_null(this.phone, '请输入对方手机号');


				//this.$refs.Keyboard.open();
			},
			isPositiveInteger(num, maxNum) {
				return num % 1 === 0 && num > 0 && num <= maxNum && !/^0/.test(num.toString());
			},
			async collect_getTransferEnd() {
				let res = await uni.ajax.collect_getTransferEnd({
					pool_id: this.giving_info.pool_id,
					user_pool_id: this.giving_info.id
				});
				if (!uni.utils.isArray(res.data) && typeof(res.data) == 'object') {
					uni.hideLoading();
					clearInterval(this.time);
					this.totab('gather/home/index');
				}
			},
			async giving(pwd) {
				// console.log("触发转增接口");
				let res = null;
				if (this.giving_info.buy_type == 1) {
					res = await uni.ajax.collect_giv({
						// phone: this.phone,
						user_code: this.user_code,
						pay_password: pwd,
						pool_id: this.giving_info.pool_id,
						num: this.num
					});
				}
				if (res.code == 200) {

					this.cardTotolNum = this.cardTotolNum - this.num;
					uni.$u.toast(this.$t('giving.transferSuccess'));
					this.user_code = '';
					this.num = '';

					//this.collect_saleGetMyList();

				}

			},
			time_fn() {
				uni.showLoading({
					title: this.$t('giving.transfering')
				})
				this.count = 2;
				this.collect_getTransferEnd();
				this.time = setInterval(() => {
					if (this.count < 15) {
						this.collect_getTransferEnd();
						this.count = this.count + 1;
					} else {
						this.count = 1;
						clearInterval(this.time);
						uni.hideLoading();
					}
				}, 500)
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.giving {
		padding: 24rpx 32rpx;

		.header {
			height: 400rpx;
			margin-bottom: 32rpx;

			.icon_box {
				margin-bottom: 14rpx;
				width: 336rpx;
				height: 336rpx;
				background: url('@/static/Gather/i54.png') no-repeat;
				background-size: 100% 100%;
				border-radius: 30rpx;

				.icon {
					width: 300rpx;
					height: 300rpx;
					background-color: #dadada;
					border-radius: 16rpx;
				}
			}

			.name {
				font-size: 32rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000;
				line-height: 38rpx;
			}
		}

		.form_box {
			margin-top: 32rpx;

			.form_input {
				height: 88rpx;
				background: #f5f5f5;
				border-radius: 24rpx;
				padding-left: 32rpx;
				margin-bottom: 24rpx;
			}

			.form_desc {
				.t {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 28rpx;
				}
			}
		}

		.form_btn {
			margin-top: 72rpx;
			height: 96rpx;
			// background: url('@/static/else/old01.png') no-repeat 100%;
			background-image: linear-gradient(to right, #16222A 0%, #3A6073 51%, #16222A 100%);
			border-radius: 16rpx;

			.t {
				font-size: 28rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 33rpx;
			}
		}

		.desc_box {
			.desc_title {
				margin-bottom: 16rpx;

				.t {
					font-size: 48rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000;
					line-height: 56rpx;
				}
			}

			.desc {
				.t {
					font-size: 26rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
				}
			}
		}
	}
</style>