<template>
	<view class="register">
		<NewRegister @submit="submit" :user_code="user_code" :lang='lang' :company_code="company_code"></NewRegister>
	</view>
</template>

<script>
	import NewRegister from "./components/new_register.vue";
	export default {
		components: {
			NewRegister
		},
		data() {
			return {
				user_code: "",
				lang: '',
				company_code: ""
			}
		},
		onLoad(query) {
			console.log(query)
			this.generDeviceId()
			if (query) {
				this.user_code = query.user_code;
				this.lang = query.lang
				this.company_code = query.company_code + ''
			}
		},
		methods: {
			async submit(data) { //注册
				let res = await uni.ajax.public_register({
					mobile: data.tel,
					password: data.password,
					user_code: data.user_code,
					pay_password: data.pay_password,
					tel_area_code: data.tel_area_code,
					nickname: data.nickname,
					device_sn: data.device_sn,
					device_info: data.device_info,
					vcode: data.vcode
				});
				if (res) {
					this.to_downapp()
				}
			},
			to_downapp() {
				this.topage("general/downapp/index?lang=" + this.lang + '&company_code=' + this.company_code)
			},
			generDeviceId() {
				uni.getStorage({
					key: 'PhoneID',
					success: (res) => {
						this.device_sn = res.data.PhoneID;
					},
					fail: (error) => {
						// 在这里可以进行失败处理，例如设置默认值或者提示用户
						this.device_sn = this.generateUniqueRandomNumber()
					}
				});
				uni.getSystemInfo({
					success: (res) => {
						// console.log(res)
						this.device_info = res.model + " " + res.system || res.browserName + " " +
							res
							.browserVersion // 将数据存储到本地缓存中
					},
					fail: (err) => {
						console.error('获取设备信息失败：', err);
					}
				});
				this.updateLoginTime(this.device_sn, this.device_info);
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
			async updateLoginTime(device_sn, device_info) {
				try {
					let res = await uni.ajax.public_updateLoginTime({
						device_sn,
						device_info
					});
					this.shareLink = res.data.share_link

				} catch (error) {
					console.error('更新登录时间失败:', error);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.register {
		height: 100vh;
		//background: linear-gradient(136deg, #6D30D8 0%, #0D090D 53%, #8746FF 100%);
		background-image: url('/static/General/login_bg3.png');
		@include backImg;
	}
</style>