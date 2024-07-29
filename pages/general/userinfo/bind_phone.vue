<template>
	<div class="pay_pwd">
		<div class="desc_box">
			<div class="desc">
				<text class="t">
					{{$t('setPwd.bindPhone')}}
				</text>
			</div>
		</div>
		<div class="form_box">
			<view class="form_input flex-between" style="margin-bottom: 20rpx;">
				<view class="country-selector flex-evenly" @click="toggleCountryDropdown">
					<image :src="selectedCountry.flag" mode="heightFix"></image>
					<text>{{selectedCountry.code}}</text>
					<text :class="{ 'arrow-down': !showDropdown, 'arrow-up': showDropdown }">&#9662;</text>
				</view>
				<u--input :placeholder="$t('regis.plsInputPhone')" fontSize="32rpx" color="#999999" type="number"
					:clearable="true" border="none" v-model="form.tel" maxlength="20"></u--input>
			</view>
			<transition name="fade">
				<view v-show="showDropdown" :class="{ 'dropdown-active': showDropdown, 'dropdown': !showDropdown }">
					<view v-for="(country, index) in countries" :key="index" @click="selectCountry(country)"
						class="dropdown-item flex-between">
						<view class="flex-center">
							<image :src="country.flag" mode="heightFix"></image>
							<text>{{ country.name }}</text>
						</view>
						<view class="code">
							<text>{{'+'+country.code }}</text>
						</view>
					</view>
				</view>
			</transition>
			<view class="form_input flex-between" style="margin-bottom: 20rpx;padding-right: 20rpx;">
				<u--input v-model="form.vcode" type="number" :placeholder="$t('foget.plsInputVertCode')" border="none"
					color="#999" placeholderStyle="color: #CCCCCC;font-size: 28rpx;">
				</u--input>
				<getcode :device_sn="form.device_sn" :type="5" :color="color" :tel="form.tel"></getcode>
			</view>
			<view class="set-desc ">
				<image style="width: 40rpx;height: 40rpx;" src="/static/General/notice_icon1.png" mode="heightFix">
				</image>
				<text class="">{{$t('foget.needCorrectPhone')}}</text>
			</view>
			<div class="form_btn flex-center" @tap="bindPhone">
				<text class="t">{{$t('utils.sumbit')}}</text>
			</div>
		</div>
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
				color: "black",
				type: 1,
				phone: "",
				time: 60,
				time_out: null,
				form: {
					vcode: "",
					tel: "",
					device_sn: ''
				},
				show: false,
				content: 'Bạn có chắc muốn hủy tài khoản này?',
				deleteForm: {
					mobile: '',
					password: "",
					repassword: "",
				},
				show_time: false, //是否显示倒计时
				selectedCountry: {
					name: '',
					code: '',
					lang: '',
					flag: ''
				},
				showDropdown: false,
				countries: [

					// 其他国家...
				],
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('setPwd.bindPhone')
			})
			if (uni.conf.appPackageName === 'ma') {
				this.countries = [{
					name: 'Malaysia',
					code: '60',
					lang: 'ms-MS',
					flag: '/static/else/my.png'
				}]
				this.selectedCountry = this.countries[0]
			} else if (uni.conf.appPackageName === 'vn') {
				this.countrise = [{
					name: 'Việt Nam',
					code: '84',
					lang: 'vi-VN',
					flag: '/static/else/vn.png'
				}, ]
				this.selectedCountry = this.countries[0]
			}
			this.getDeviceInfo()
		},
		onLoad(query) {
			this.type = query.type;
			this.phone = uni.utils.hide_phone(this.user_info.mobile);
		},
		methods: {
			toggleCountryDropdown() {
				this.showDropdown = !this.showDropdown;
			},
			selectCountry(country) {
				this.selectedCountry = country;
				this.showDropdown = false;
			},
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
			async bindPhone() {
				await uni.utils.is_phone(this.form.tel, this.$t('regis.plsInputPhone'));
				if (this.form.vcode === '') {
					uni.showToast({
						title: this.$t('setPwd.plsInputVerCode'),
						icon: "none"
					})
					return false;
				}
				uni.$u.debounce(async () => {
					let res = null;
					res = await uni.ajax.public_bindTel(this.form);
					if (res) {
						uni.showToast({
							title: this.$t('foget.bindSuccess'),
							icon: "none"
						})
						await uni.utils.sleep(500);
						this.totab("gather/homepage");
					}
				}, 200)

			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.country-selector {
		width: 140rpx;
		height: 96rpx;
		color: red;

		image {
			height: 30rpx;
		}

		.arrow-down,
		.arrow-up {
			transition: transform 0.5s ease;
		}

		.arrow-up {
			transform: rotateX(180deg);
		}
	}

	.dropdown {
		overflow: hidden;
		transition: max-height 0.5s ease-in-out;
		max-height: 0;
		position: absolute;
		left: 60rpx;
		z-index: 10;
		width: 290rpx;
		background-color: #fff;
		/* 初始为0，即默认隐藏 */
	}

	.dropdown-active {
		max-height: 500rpx;
		position: absolute;
		left: 60rpx;
		z-index: 10;
		width: 290rpx;
		background-color: #fff;
		margin-right: 340rpx;
	}

	.dropdown-item {
		padding: 10px;
		border-bottom: 1px solid #eee;
		font-size: 26rpx;


		image {
			height: 30rpx;
		}

		.code {
			align-self: flex-end;
		}
	}

	.dropdown-item:last-child {
		border-bottom: none;
	}


	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
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
				position: relative;
				background: #F5F5F5;
				border-radius: 24rpx;
				padding-left: 32rpx;
				margin-bottom: 24rpx;
				display: flex;
				align-items: center;
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