<template>
	<view class="send_out">
		<view class="header">
			<view class="back flex-between">
				<u-icon name="arrow-left" bold color="#fff" size="44rpx" @click="toback()"></u-icon>
				<view class="">
					<!-- 赠送记录 -->
				</view>
			</view>
		</view>
		<view class="conntent">
			<view class="info">
				<u-form labelPosition="top" labelWidth="auto"
					:labelStyle="{fontSize:'32rpx',color:'#222',fontWeight:600}">
					<u-form-item class="form-item" label="接收人手机号" leftIcon="/static/Continent/user.png"
						leftIconStyle="width:64rpx;height:64rpx;">
						<u-input v-model="form.mobile" class="u-input" placeholder="请输入对方手机号"></u-input>
					</u-form-item>
					<u-form-item class="form-item" label="赠送数量" leftIcon="/static/Continent/currency.png"
						leftIconStyle="width:64rpx;height:64rpx;">
						<u-input v-model="form.num" type="number" class="u-input" placeholder="请输入赠送数量"></u-input>
					</u-form-item>
				</u-form>

			</view>

			<view :class="['submit_btn','flex-center',!form.mobile || !form.num ? 'gray' : '']" @click="open_modal">
				赠送
			</view>

		</view>

		<!-- 支付键盘 -->
		<keyboard ref="Keyboard" @confirm="submit"></keyboard>

	</view>
</template>

<script>
	import Keyboard from '@/components/Keyboard/Keyboard.vue';
	import {
		userinfo
	} from "@/common/mixins/index.js";
	export default {
		mixins: [userinfo],
		components: {
			Keyboard
		},
		data() {
			return {
				form: {
					mobile: '',
					num: '',
					pay_password: '',
					ware_id: ""
				}
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info
			},
			/* 服务费 */
			service_charge() {
				return (this.form.num * 0.05).toFixed(2)
			},

		},
		onLoad(query) {
			this.form.ware_id = query.user_group_id;
		},
		methods: {
			async open_modal() {
				await uni.utils.is_null(this.form.mobile, '请输入对方手机号');
				await uni.utils.is_null(this.form.num, '请输入转赠卡牌数量');
				this.$refs.Keyboard.open();
			},
			async submit(pwd) {
				this.form.pay_password = pwd;
				let result = await uni.ajax.shop_giv_card(this.form);
				if (result) {
					this.form.mobile = '';
					this.form.num = '';
					this.form.pay_password = "";
					this.get_user_info();
					uni.showToast({
						title: "操作成功",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.send_out {
		.header {
			width: 750rpx;
			height: 490rpx;
			// background: url('/static/Continent/i53.png') no-repeat;
			background-size: 100% 100%;
			padding-top: var(--status-bar-height);
			box-sizing: border-box;

			.back {
				height: 88rpx;
				padding: 0 32rpx;
			}
		}

		.conntent {
			padding: 44rpx 32rpx;

			.info {
				margin-bottom: 24rpx;
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
					font-family: PingFang SC-Regular, PingFang SC;
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
				padding: 24rpx 32rpx;

				>view {
					margin-bottom: 36rpx;
				}

				.service_charge {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: var(--theme);
				}
			}

			.submit_btn {
				height: 96rpx;
				border-radius: 8rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: #FFFFFF;
				background: linear-gradient(90deg, #A070CF 0%, #A070CF 100%);
			}

			.gray {
				filter: grayscale(1);
			}
		}
	}
</style>