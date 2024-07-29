<template>
	<view class="message">
		<view class="info">
			<u-form labelPosition="top" labelWidth="auto" :labelStyle="{fontSize:'32rpx',color:'#222',fontWeight:600}">
				<u-form-item class="form-item" label="telegram" leftIcon="/static/Continent/tg.jpg"
					v-show="showParam=='telegram'" leftIconStyle="width:64rpx;height:64rpx;">
					<view class="df alc"
						style="border: 2rpx solid #222;border-radius:12rpx;width: 100%;padding-left: 20rpx;">
						<text style="font-size: 40rpx;margin-right: 10rpx;">@</text>
						<u-input v-model="form.telegram" class="u-input" maxlength='20'
							style="border: none !important;padding-left: 0 !important;"
							:placeholder="$t('setmessage.plsInputTgNum')"></u-input>
					</view>
				</u-form-item>
				<u-form-item class="form-item" label="whatsapp" leftIcon="/static/Continent/wa.jpg"
					leftIconStyle="width:64rpx;height:64rpx;" v-show="showParam=='whatsapp'">
					<view class="df alc"
						style="border: 2rpx solid #222;border-radius:12rpx;width: 100%;padding-left: 20rpx;">
						<text style="font-size: 40rpx;margin-right: 10rpx;color: red;">{{company_code==60?60:84}}</text>
						<u-input v-model="form.whatsapp" class="u-input" maxlength='20'
							style="border: none !important;padding-left: 0 !important;"
							:placeholder="$t('setmessage.plsInputWaNum')"></u-input>
					</view>
				</u-form-item>
				<u-form-item class="form-item" label="facebook" leftIcon="/static/Continent/fb.png"
					leftIconStyle="width:64rpx;height:64rpx;" v-show="showParam=='facebook'">
					<u-input v-model="form.facebook" class="u-input" maxlength='20'
						:placeholder="$t('setmessage.plsInputFbNum')"></u-input>
				</u-form-item>
				<u-form-item class="form-item" label="zalo" leftIcon="/static/Continent/zalo.png"
					leftIconStyle="width:64rpx;height:64rpx;" v-show="showParam=='zalo'">
					<u-input v-model="form.zalo" class="u-input"
						:placeholder="$t('setmessage.plsInputZaloNum')"></u-input>
				</u-form-item>
				<u-form-item class="form-item" label="address" leftIcon="/static/myInfo/5.png"
					v-show="showParam=='address'" leftIconStyle="width:64rpx;height:64rpx;">
					<u-input v-model="form.address" class="u-input" maxlength="150"
						:placeholder="$t('index.plsInputYourAd')"></u-input>
				</u-form-item>

				<u-form-item class="form-item" :label="$t('index.contactPhone')" leftIcon="/static/myInfo/2_1.png"
					v-show="showParam=='contact_telephone'" leftIconStyle="width:56rpx;height:64rpx;">
					<u-input v-model="form.contact_telephone" class="u-input" maxlength="11"
						:placeholder="$t('index.plsInputContactPhone')"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="save_btn flex-center" @click="confirmUse">
			{{$t('utils.sumbit')}}
		</view>
	</view>
</template>

<script>
	import {
		userinfo
	} from "@/common/mixins/index.js";
	import debounce from 'lodash/debounce';
	export default {
		mixins: [userinfo],
		data() {
			return {
				form: {
					facebook: '',
					zalo: '',
					telegram: '',
					whatsapp: '',
					address: '',
					contact_telephone: ''
				},
				is_agent: 0,
				showParam: '',
				company_code: uni.getStorageSync('CompanyCode')
			}
		},
		onLoad(option) {
			this.form.facebook = this.$store.state.user.user_info.facebook;
			this.form.zalo = this.$store.state.user.user_info.zalo;
			this.form.telegram = this.$store.state.user.user_info.telegram;
			this.form.whatsapp = this.$store.state.user.user_info.whatsapp;
			this.form.address = this.$store.state.user.user_info.agent_address;
			this.form.contact_telephone = this.$store.state.user.user_info.contact_telephone;
			this.is_agent = this.$store.state.user.user_info.is_agent;
			// console.log("option", option);
			if (option.param) {
				this.showParam = option.param;
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('setmessage.setSocialMsg')
			})
		},
		methods: {
			confirmUse: debounce(function() {
				// 要实现的业务逻辑
				this.save();
			}, 2000, {
				leading: true,
				trailing: false
			}),
			async save() {
				if (this.form.telegram !== '') {
					this.form.telegram = '@' + this.form.telegram
				} else if (this.form.whatsapp !== '') {
					if (uni.conf.companycode == 60) {
						this.form.whatsapp = '60' + this.form.whatsapp
					} else if (uni.conf.companycode == 25)
						this.form.whatsapp = '84' + this.form.whatsapp
				}
				let result = await uni.ajax.shop_setUserqqWechat(this.form);
				if (result) {
					console.log("修改个人信息结果====>", result)
					this.get_user_info();
					// uni.$u.toast(this.$t('utils.operateSuccess'))
					uni.showToast({
						title: this.$t('utils.operateSuccess'),
						duration: 2000,
						icon: 'loading'
					});
					await uni.utils.sleep(500);
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.message {
		padding: 24rpx 32rpx;

		.info {
			border-radius: 12rpx;
			background-color: #fff;
			padding: 40rpx 32rpx;
			margin-bottom: 24rpx;

			.u-input {
				height: 108rpx;
				border: 2rpx solid #222 !important;
				padding: 0 32rpx !important;
				border-radius: 12rpx;
			}

			.possess {
				font-size: 24rpx;
				//font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;

				text {
					font-size: 32rpx;
					font-weight: 600;
					color: var(--theme);
				}
			}
		}

		.save_btn {
			height: 96rpx;
			// background: var(--linear-gradient-theme);
			// border-radius: 8rpx;
			// box-shadow: inset 0px 1px 2px 0px #A4D585, 0px 1px 0px 0px rgba(0, 0, 0, 0.25);
			background: url('/static/btn/nick_edit.png');
			@include backImg;
			font-size: 32rpx;
			//font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
	}
</style>