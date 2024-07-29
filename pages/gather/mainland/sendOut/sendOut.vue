<template>
	<view class="send_out">
		<view class="header">
			<view class="back ">
				<view class="flex-between">
					<u-icon name="arrow-left" bold color="#fff" size="44rpx"
						@click="totab('gather/mainland/index?cur=1')"></u-icon>
					<view class="color_w" @click="topage('gather/mainland/myAssets/record?type=cereal')">
						{{$t('myAssets.gemRecord')}}
					</view>
				</view>
				<view class="text">
					<p> {{$t('sendOut.gemGive')}}</p>
					<p>{{$t('sendOut.gemGiveTip')}}</p>
				</view>
			</view>
		</view>
		<view class="conntent">
			<view class="info">
				<u-form labelPosition="top" labelWidth="auto"
					:labelStyle="{fontSize:'32rpx',color:'#222',fontWeight:600}">
					<u-form-item class="form-item" :label="$t('sendOut.receiveId')"
						leftIcon="/static/Continent/user.png" leftIconStyle="width:64rpx;height:64rpx;">
						<u-input v-model="form.user_code" class="u-input" @input="Input" maxlength="8" type="number"
							@blur="rateBlur" :placeholder="$t('sendOut.plsInputReceId')"></u-input>
					</u-form-item>
					<u-form-item class="form-item" :label="$t('sendOut.giveNum')"
						leftIcon="/static/Continent/currency.png" leftIconStyle="width:64rpx;height:64rpx;">
						<u-input v-model="form.num" type="number" @blur="Blur" :maxlength="maxLen" class="u-input"
							@input="handleInput" :placeholder="$t('sendOut.plsInputGiveNum')"></u-input>
					</u-form-item>
				</u-form>
				<view class="possess">
					{{$t('sendOut.haveGem')}} <text>{{user_info.food}}</text>
				</view>
			</view>
			<view class="hint" v-if="form.user_code&&form.num">
				<view class="service_charge" v-show="user_info.is_food_agent!=1">
					{{$t('sendOut.destroyNum')}} {{rate}}% {{$t('sendOut.asService')}}
				</view>
				<!-- <view class="gem_tip" v-show="user_info.is_food_agent==1">
					{{$t('sendOut.tip')}}
				</view> -->
				<view class="df alc">
					<!-- 转赠对象 -->
					<text style="margin-right: 20rpx;">{{$t('giving.transferName')}}:</text>
					<u-avatar :src="user.avatar" size='40'></u-avatar>
					<text style="margin-left: 20rpx;">{{user.nickname}}</text>
				</view>
				<view class="flex-between">
					<text>{{$t('sendOut.giveGemNum')}}</text>
					<text>{{form.num || 0}}</text>
				</view>
				<view class="flex-between">
					<text>{{$t('sendOut.serviceCharge')}}</text>
					<text style="color: #222;">{{service_charge*1}}</text>
				</view>
				<view class="flex-between">
					<text style="color: #222;">{{$t('sendOut.totol')}}</text>
					<text style="color:var(--theme)"
						v-if="user_info.is_food_agent!=1">{{(form.num*1 + service_charge*1).toFixed(2)}}</text>
					<text style="color:var(--theme)" v-else>{{(form.num*1 ).toFixed(2)}}</text>
				</view>
			</view>
			<view class="hint" v-else>

			</view>
			<view :class="['submit_btn','flex-center',!form.user_code || !form.num ? 'gray' : '']" @click="open_modal">
				{{$t('sendOut.give')}}
			</view>
		</view>
		<!-- 未填写上级邀请码时弹出提示去设置邀请码 -->
		<u-modal :show="showSetIvCode" @cancel="showSetIvCode=false" @confirm="goSetIvCode"
			:confirmText="$t('utils.confirm')" :cancelText="$t('utils.cancel')" :showCancelButton="true"
			:content="$t('index.notSetIvPlsGoSet')"></u-modal>
		<view class="code_modal df alc jc" v-if="code_modal_show">
			<view class="code_box ">
				<view class="popup_title flex-center">
					<view class="title flex-colum">
						<text>{{$t('keyBoard.plsInputPsw')}}</text>
						<text
							class="t">{{$t('keyBoard.plsInput')}}{{appName}}{{$t('keyBoard.payPsw')}},{{$t('keyBoard.toVerify')}}</text>
					</view>
					<view class="close flex-center" @tap="close"><u-icon name="close" color="#000" size="20"></u-icon>
					</view>
				</view>
				<view class="code_box_title flex-between"></view>
				<view class="flex-center ">
					<u-code-input :dot="true" v-model="password" :focus="focus" @finish="confirmUse">
					</u-code-input>
				</view>
				<view class="code_box_title flex-end" style="border: 0rpx;">
					<text class="t" style="color: #0092F5;"
						@tap="topage('general/userinfo/setpwd?type=1')">{{$t('keyBoard.forgetPsw')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userinfo
	} from "@/common/mixins/index.js";
	import Decimal from 'decimal.js'
	import debounce from 'lodash/debounce';
	export default {
		mixins: [userinfo],
		data() {
			return {
				form: {
					mobile: '',
					num: '',
					pay_password: '',
					user_code: ""
				},
				password: '',
				rate: 0,
				maxLen: 1,
				showSetIvCode: false, //是否弹出设置上级邀请码弹框
				stop: false,
				appName: getApp().globalData.appName,
				code_modal_show: false,
				focus: false,
				user: {},
				invalid_give_gem: uni.getStorageSync('invalid_give_gem'),
				is_valid_user: 0
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info
			},
			/* 服务费 */
			service_charge() {
				return (this.form.num * (this.rate / 100)).toFixed(2)
			}
		},
		onLoad: function(options) {
			if (options.setSuccess) {
				this.showSetIvCode = false;
			}
		},
		watch: {
			'form.user_code': {
				immediate: true, // 立即执行一次
				handler(newVal, oldVal) {}
			}
		},
		onShow() {
			this.getUserStatus();
			this.integerPartLength();
		},
		methods: {
			confirmUse: debounce(function() {
				// 要实现的业务逻辑
				this.submit();
			}, 2000, {
				leading: true,
				trailing: false
			}),
			close() {
				this.code_modal_show = false
				this.password = ''
			},
			// 获取别人赠送给自己的宝石数据
			async getUserStatus() {
				let res = await uni.ajax.getBeGiveGem({});
				if (res) {
					this.is_valid_user = res.data.is_valid_user;
				}
			},
			Blur() {
				if (this.is_valid_user == 0 && Number(this.form.num) < Number(this.invalid_give_gem)) {
					this.$u.toast(this.$t('sendOut.min_gem') + this.invalid_give_gem, 3000)
				} else {
					this.stop = false
				}
			},
			rateBlur() {
				if (!this.form.user_code) {
					return
				}
				if (this.form.user_code.length != 8) {
					this.$u.toast(this.$t('sendOut.correctTip'));
					return
				}

			},
			async Input() {
				if (this.form.user_code.length == 8) {
					this.getUserInfoByUcode(this.form.user_code)
					let res = await uni.ajax.getRateInfo({
						user_code: this.form.user_code
					})
					if (!res) {
						this.stop = true
					} else {
						this.rate = Number(res.data.rate)
						this.stop = false
					}
				}
			},
			async getUserInfoByUcode(user_code) {
				let res = await uni.ajax.getUserInfoByUcode({
					user_code
				})
				if (res) {
					this.user = res.data
				}
			},
			goSetIvCode() {
				this.topage('general/setInviteCode/setInviteCode?from=' + 2);
			},
			integerPartLength() {
				let strNum = this.user_info.food?.toString();
				this.maxLen = strNum.indexOf('.') !== -1 ? strNum.indexOf('.') : strNum.length;
			},
			handleInput(event) {
				const inputText = event;
				this.form.num = inputText.replace(/[^\d]/g, "");
			},
			isPositiveInteger(num) {
				return num > 0;
			},
			async open_modal() {
				if (this.form.user_code.length != 8) {
					this.$u.toast(this.$t('sendOut.correctTip'), 2000);
					return
				}
				if (this.is_valid_user == 0 && Number(this.form.num) < Number(this.invalid_give_gem)) {
					this.$u.toast(this.$t('sendOut.min_gem') + this.invalid_give_gem, 3000)
					return
				}
				await uni.utils.is_null(this.form.user_code, this.$t('sendOut.plsInputReceId'));
				await uni.utils.is_null(this.form.num, this.$t('sendOut.plsInputGiveGemNum'));
				if (!this.isPositiveInteger(this.form.num)) {
					uni.$u.toast(this.$t('sendOut.tip2'));
					return false;
				}
				this.code_modal_show = true
				this.focus = true
			},
			async submit() {
				this.form.pay_password = this.password;
				let result = await uni.ajax.shop_givFood(this.form);
				if (result) {
					if (result.data.show_invite_code_popbox == 1) {
						if (!uni.getStorageSync('isOnlineExam')) {
							this.showSetIvCode = result.data.show_invite_code_popbox == 1 ? true : false;
							return;
						}
					}
					if (result.data) {
						this.$u.toast(this.$t('sendOut.giveSuccess'), 3000)
						this.form.user_code = "";
						this.form.mobile = '';
						this.form.num = '';
						this.form.pay_password = "";
						this.password = "";
						this.code_modal_show = false
						this.focus = false
						this.get_user_info();
					}

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes rainbow {
		0% {
			background-position: 0% 50%;
		}

		100% {
			background-position: 100% 50%;
		}
	}

	.send_out {
		.header {
			width: 750rpx;
			height: 490rpx;
			background: url('/static/Continent/sendOut_bg.png') no-repeat;
			background-size: 100% 100%;
			padding-top: var(--status-bar-height);
			box-sizing: border-box;

			.back {
				height: 88rpx;
				padding: 32rpx;

				.text {
					margin-top: 60rpx;

					p:nth-child(1) {
						font-size: 66rpx;
						font-weight: bold;
						color: #fff;
					}

					p:nth-child(2) {
						margin-top: 40rpx;
						color: #bbbbbb;
						letter-spacing: 1rpx;
					}
				}
			}
		}

		.conntent {
			padding: 44rpx 32rpx;

			.info {
				border-radius: 12rpx;
				background-color: #fff;
				padding: 40rpx 32rpx;

				.u-input {
					height: 108rpx;
					border: 2rpx solid #222 !important;
					padding: 0 32rpx !important;
					border-radius: 12rpx;
				}

				.possess {
					font-size: 24rpx;
					font-weight: 400;
					color: #222222;

					text {
						font-size: 32rpx;
						font-weight: 600;
						color: var(--theme);
					}
				}
			}

			.hint {
				font-size: 28rpx;
				color: #999;
				padding: 14rpx 32rpx;

				>view {
					margin-bottom: 36rpx;
				}

				.service_charge {
					font-size: 24rpx;
					font-weight: 400;
					color: var(--theme);
				}

				.gem_tip {
					font-size: 24rpx;
					background: linear-gradient(90deg, #ff0000, #ff8000, #00ff80, #0080ff, #8000ff, );
					background-clip: text;
					-webkit-background-clip: text;
					color: transparent;
				}

			}

			.submit_btn {
				height: 96rpx;
				border-radius: 8rpx;
				background: var(--linear-gradient-theme);
				font-size: 32rpx;
				margin-top: 50rpx;
				font-weight: 600;
				color: #FFFFFF;
				box-shadow: var(--btn-shadow);
			}

			.gray {
				filter: grayscale(1);
			}
		}

		.code_modal {
			width: 100%;
			min-height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.code_box {
			width: 90%;
			border-radius: 24rpx;
			padding: 30rpx 0rpx;
			background: #ffffff;

			.code_box_title {
				border-top: 1rpx solid #f0f0f0;
				padding-top: 30rpx;

				.t {
					font-size: 28rpx;
					color: #808080;

					padding: 0rpx 30rpx;
				}
			}

			.popup_title {
				margin-bottom: 30rpx;
				position: relative;

				.title {
					font-size: 30rpx;
					font-weight: bold;

					.t {
						color: #c1c1c1;
						font-weight: 500;
						font-size: 24rpx;
					}
				}

				.close {
					position: absolute;
					right: 10rpx;
					top: -20rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>