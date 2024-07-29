<template>
	<div class="pay_pwd">
		<div class="desc_box">
			<div class="desc_title">
				<text class="t">{{set_title()}}</text>
			</div>
			<div class="desc">
				<text class="t">
					{{$t('setPwd.nowLoginPhone')}}:{{phone}}
				</text>
			</div>
			<div class="desc" v-show="type!=4">
				<text class="t">
					{{set_desc()}}
				</text>
			</div>
		</div>

		<div class="form_box" v-if="type==1||type==2">
			<view class="form_input flex-between" style="margin-bottom: 20rpx;padding-right: 20rpx;">
				<u--input v-model="form.vcode" type="number" :placeholder="$t('foget.plsInputVertCode')" border="none"
					color="#999" placeholderStyle="color: #CCCCCC;font-size: 28rpx;">
				</u--input>
				<getcode :device_sn="form.device_sn" :type="type==2?3:4" :color="color" :tel="form.tel"></getcode>
			</view>
			<!-- <view class="form_input flex-between" style="margin-bottom: 20rpx;padding-right: 16rpx;">
				<u--input v-show="type==1" :placeholder="$t('backendRespon.msg13')" fontSize="32rpx" color="#999999"
					:clearable="true" border="none" v-model="form.password"></u--input>
				<u--input v-show="type==2" :placeholder="$t('backendRespon.msg13')" fontSize="32rpx" color="#999999"
					:clearable="true" border="none" v-model="form.ori_password"></u--input>
			</view> -->
			<view class="form_input flex-between" style="margin-bottom: 20rpx;" v-show="type==1">
				<u--input :placeholder="$t('backendRespon.msg57')" fontSize="32rpx" color="#999999" type="number"
					:clearable="true" border="none" @blur="passBlur" v-model="form.pay_password"
					maxlength="6"></u--input>
			</view>
			<view class="form_input flex-between" style="margin-bottom: 20rpx;" v-show="type==2">
				<u--input :placeholder="$t('setPwd.inputNewPsw')" fontSize="32rpx" color="#999999" type="password"
					:clearable="true" border="none" v-model="form.password"></u--input>
			</view>
			<view class="form_input flex-between" style="margin-bottom: 20rpx;">
				<u--input :placeholder="type==1?$t('index.plsINputPayPswAgain'):$t('setPwd.confirmNewPsw')"
					@blur="repassBlur" fontSize="32rpx" color="#999999" :type="type==1?'number':'password'"
					:maxlength="type==1?6:20" :clearable="true" border="none" v-model="form.repassword"></u--input>
			</view>
			<view class="set-desc ">
				<image style="width: 40rpx;height: 40rpx;" src="/static/General/notice_icon1.png" mode="heightFix">
				</image>
				<text class="">{{type==1?$t('regis.plsInputAllNumPsw'):$t('foget.pswNeed')}}</text>
			</view>
			<!-- <div class="form_desc">
				<text class="t">信息安全保障中，信息仅用于身份确认</text>
			</div> -->
			<div class="form_btn flex-center" @tap="setPayPwd">
				<text class="t">{{$t('utils.sumbit')}}</text>
			</div>
		</div>
		<div class="form_box" v-if="type==4">
			<view class="form_input flex-between" style="margin-bottom: 20rpx;padding-right: 16rpx;">
				<u--input :placeholder="$t('regis.plsInputPhone')" fontSize="32rpx" color="#999999" type="number"
					:clearable="true" border="none" v-model="deleteForm.mobile"></u--input>
			</view>
			<view class="form_input flex-between" style="margin-bottom: 20rpx;">
				<u--input :placeholder="$t('login.plsInputPsd')" fontSize="32rpx" color="#999999" type="password"
					:clearable="true" border="none" v-model="deleteForm.password"></u--input>
			</view>
			<view class="form_input flex-between" style="margin-bottom: 20rpx;">
				<u--input :placeholder="$t('login.plsInputPswAgain')" fontSize="32rpx" color="#999999" type="password"
					:clearable="true" border="none" v-model="deleteForm.repassword"></u--input>
			</view>
			<!-- <div class="form_desc">
				<text class="t">信息安全保障中，信息仅用于身份确认</text>
			</div> -->
			<div class="form_btn flex-center" @tap="deleteAccount">
				<text class="t">{{$t('utils.sumbit')}}</text>
			</div>
		</div>
		<div class="form_box" v-if="type==3">
			<view class="form_input flex-between" style="margin-bottom: 20rpx;padding-right: 16rpx;">
				<u--input :placeholder="$t('setPwd.inputVertifyCode')" fontSize="32rpx" color="#999999" type="number"
					:clearable="true" border="none" v-model="form.vcode"></u--input>
				<getcode :device_sn="form.device_sn" :type="3" :mobile="user_info.mobile"></getcode>
			</view>
			<!-- <div class="form_desc">
				<text class="t">信息安全保障中，信息仅用于身份确认</text>
			</div> -->
			<div class="form_btn flex-center" @tap="setPayPwd">
				<text class="t">{{$t('utils.sumbit')}}</text>
			</div>
		</div>
		<!-- 确认注销账号弹框 -->
		<u-modal :show="show" :title="title" :showCancelButton="true" :confirmText="$t('utils.confirm')"
			:cancelText="$t('utils.cancel')" @confirm="confirmCancelAccount" @cancel="cancelModal"
			:content='content'></u-modal>
	</div>
</template>

<script>
	/**
	 * type 1 修改支付密码
	 */
	import getcode from "@/components/getcode.vue";
	export default {
		components: {
			getcode
		},
		data() {
			return {
				color: "white",
				type: 1,
				phone: "",
				time: 60,
				time_out: null,
				form: {
					repassword: "",
					password: "",
					vcode: "",
					tel: "",
					pay_password: '',
					ori_password: ''
				},
				show: false,
				title: this.$t('setPwd.logOffAccount'),
				content: 'Bạn có chắc muốn hủy tài khoản này?',
				deleteForm: {
					mobile: '',
					password: "",
					repassword: "",
				},
				captcha_img: "", //图形验证码图片
				captcha: "", //图形验证码
				uniqid: "",
				show_time: false, //是否显示倒计时
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onShow() {
			if (uni.getStorageSync('user_info')) {
				this.form.tel = uni.getStorageSync('user_info').mobile
			}
			if (this.type != 4) {
				uni.setNavigationBarTitle({
					title: this.$t('setPwd.setPsw')
				})
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('setPwd.logOffAccount')
				})
			}
			this.getDeviceInfo()
		},
		onLoad(query) {
			this.type = query.type;
			this.phone = uni.utils.hide_phone(this.user_info.mobile);
		},
		methods: {
			// 失焦事件
			passBlur(e) {
				if (this.type == 1) {
					if (!Number(this.form.pay_password)) {
						this.$u.toast(this.$t('setPwd.plsInputNumPsw'))
					}
				}
			},
			repassBlur(e) {
				if (this.type == 1) {
					if (!Number(this.form.repassword)) {
						this.$u.toast(this.$t('setPwd.plsInputNumPsw'))
					}
				}
			},
			// 获取设备信息
			getDeviceInfo() {
				uni.getSystemInfo({
					success: (res) => {
						// 如果没有 deviceId，则生成随机数
						this.form.device_sn = res.deviceId || this.generateUniqueRandomNumber();
						this.form.device_info = res.model + " " + res.system || res.browserName + " " + res
							.browserVersion
						// 将数据存储到本地缓存中
						uni.setStorage({
							key: 'PhoneID',
							data: {
								PhoneID: this.form.device_sn,
							},
							success: () => {}
						});
					},
					fail: (err) => {
						console.error('获取设备信息失败：', err);
					}
				});
			},
			generateRandomString(length) {
				const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				let randomString = '';
				for (let i = 0; i < length; i++) {
					const randomIndex = Math.floor(Math.random() * characters.length);
					randomString += characters.charAt(randomIndex);
				}
				return randomString;
			},
			generateUniqueRandomNumber() {
				const generatedNumbers = new Set();
				let randomNumber = '';
				do {
					// 生成随机数长度，范围为 10 至 30
					const length = Math.floor(Math.random() * 21) + 10;
					randomNumber = this.generateRandomString(length);
				} while (generatedNumbers.has(randomNumber)); // 检查是否已存在于 Set 中
				generatedNumbers.add(randomNumber); // 将唯一的随机数添加到 Set 中
				return randomNumber;
			},
			//确认注销账号
			async confirmCancelAccount() {
				//console.log("点击删除账号按钮.....");
				//console.log('deleteform===>', this.deleteForm);
				let res = await uni.ajax.public_cancelAccount();
				console.log("删除结果.....", res);
				if (res.code == 200) {
					uni.$u.toast('Tài khoản này đã bị hủy!');
					console.log("注销账号跳转===>");
					this.topage('general/login/index');
				}
			},
			cancelModal() {
				this.show = false;
			},
			//删除账号
			async deleteAccount() {
				await uni.utils.is_null(this.deleteForm.mobile, this.$t('backendRespon.msg3'));
				await uni.utils.is_null(this.deleteForm.password, this.$t('login.plsInputPsd'));
				await uni.utils.is_null(this.deleteForm.repassword, this.$t('login.plsInputPswAgain'));
				if (this.deleteForm.repassword != this.deleteForm.password) {
					uni.showToast({
						title: this.$t('regis.pswNotSame'),
						icon: "none"
					})
					return false;
				}
				this.show = true;
			},
			set_title() {
				let str = "";
				switch (this.type) {
					case "1":
						str = this.$t('setPwd.setPayPsw');
						break;
					case "2":
						str = this.$t('setPwd.setLoginPsw');
						break;
					case "3":
						str = this.$t('setPwd.changePhone');
						break;
					case "4":
						str = this.$t('setPwd.logOffAccount');
						break;
					default:
						break;
				}
				return str;
			},
			set_desc() {
				let str = "";
				switch (this.type) {
					case "1":
						str = this.$t('setPwd.tip1');
						break;
					case "2":
						str = this.$t('setPwd.tip2');
						break;
					case "3":
						str = this.$t('setPwd.tip3');
						break;
					default:
						break;
				}
				return str;
			},
			async setPayPwd() {
				await uni.utils.is_null(this.form.vcode, this.$t('foget.plsInputVertCode'));
				if (this.type == 1) {
					var reg = new RegExp("^[0-9]*$");
					// await uni.utils.is_null(this.form.sms_code, this.$t('setPwd.plsInputVerCode'));
					await uni.utils.is_null(this.form.pay_password, this.$t('setPwd.plsInputNumPsw'));
					let _this = this
					if (!reg.test(this.form.pay_password) || this.form.pay_password.length != 6) {
						uni.showToast({
							title: _this.$t('setPwd.plsInputNumPsw'),
							icon: "none"
						})
						return
					}
				}
				if (this.type == 2) {
					// await uni.utils.is_null(this.form.sms_code, this.$t('setPwd.plsInputVerCode'));
					var reg_pwd = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
					if (!reg_pwd.test(this.form.password)) {
						uni.showToast({
							title: this.$t('setPwd.pswConNumAndLetter'),
							icon: 'none'
						});
						return false;
					}
					if (this.form.password != this.form.repassword) {
						uni.showToast({
							title: this.$t('setPwd.pswNotSame'),
							icon: "none"
						})
						return false;
					}
				}
				uni.$u.debounce(async () => {
					let res = null;
					if (this.type == 1) { //二级
						// this.form.pay_password = this.form.password;
						res = await uni.ajax.public_modifyLoginPayPassword(this.form);
					}
					if (this.type == 2) { //登录
						console.log("this.form====》", this.form);
						res = await uni.ajax.public_modifyLoginPassword(this.form);
					}
					if (res) {
						uni.showToast({
							title: this.$t('utils.operateSuccess'),
							icon: "none"
						})
						await uni.utils.sleep(500);
						if (this.type == 2) {
							this.topage('general/login/index')
						} else {
							this.toback();
						}
					}
				}, 200)
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.set-desc {
		display: flex;
		align-items: center;
		margin-left: 20rpx;
	}

	.pay_pwd {
		padding: 24rpx 32rpx;

		.captcha {
			width: 140rpx;
			height: 60rpx;
			margin-right: 15rpx;
		}

		.form_box {
			margin-top: 100rpx;

			.form_input {
				height: 88rpx;
				background: #F5F5F5;
				border-radius: 24rpx;
				padding-left: 32rpx;
				margin-bottom: 24rpx;
				color: #000 !important;
			}

			.form_desc {
				.t {
					font-size: 24rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 28rpx;
				}
			}
		}

		.form_btn {
			margin-top: 72rpx;
			width: 100%;
			height: 96rpx;
			// background: url('@/static/else/old01.png') no-repeat 100%;
			background: url('/static/General/set_btn.png');
			@include backImg;
			border-radius: 16rpx;

			.t {
				font-size: 28rpx;
				//font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 33rpx;
			}
		}

		.desc_box {
			.desc_title {
				margin-bottom: 16rpx;

				.t {
					font-size: 48rpx;
					//font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 56rpx;
				}
			}

			.desc {
				.t {
					font-size: 26rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
				}
			}
		}
	}
</style>