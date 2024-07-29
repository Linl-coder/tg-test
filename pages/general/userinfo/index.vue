<template>
	<view class="index">
		<view class="avatar-box flex-colum">
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1">
				<view class="flex-colum">
					<image :src="user_info.avatar?handleImgUrl(user_info.avatar):'/static/else/avatar.png'"
						class="avatar" mode="">
					</image>
					<text class="t1">{{$t('userInfo.changeAvatar')}}</text>
				</view>
			</u-upload>

		</view>
		<view class="list-box">
			<view class="list flex-between" @tap="topage('general/userinfo/setuserinfo?type=1')">
				<text class="t1">{{$t('userInfo.nickName')}}</text>
				<view class="flex-end">
					<text class="t2">{{user_info.nickname}}</text>
					<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
				</view>
			</view>
			<!-- #ifdef APP -->
			<view class="list flex-between" @tap="clearStorage">
				<text class="t1">{{$t('userInfo.clearCache')}}</text>
				<view class="flex-end">
					<text class="t2">{{fileSize | formatSize}}</text>
					<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
				</view>
			</view>
			<!-- #endif -->
			<view class="list flex-between">
				<text class="t1">version</text>
				<view class="flex-end">
					<text class="t2">V{{versionText}}</text>
				</view>
			</view>
		</view>
		<view class="logOut flex-center" @click="showmodal = true">
			{{$t('userInfo.logout')}}
		</view>
		<!-- 退出登录 -->
		<u-modal :show="showmodal" :title="$t('userInfo.notice')" :show-title="false" @cancel="showmodal = false"
			:asyncClose="true" :cancel-text="$t('utils.cancel')" :confirm-text="$t('utils.confirm')"
			:show-confirm-button="true" :show-cancel-button="true" cancel-color="#999999" confirm-color="var(--theme)"
			@confirm="logOut()">
			<view class="slot-content"><text class="t">{{$t('userInfo.confirmLogout')}}</text></view>
		</u-modal>
	</view>
</template>

<script>
	import CryptoJS from "crypto-js";
	export default {
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		data() {
			return {
				showmodal: false,
				fileList1: [],
				versionText: "",
				fileSize: ""
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('userInfo.personalInfo')
			})
			// #ifdef APP-PLUS
			this.getFormatSize()
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.versionText = res.appVersion;
				},
			});
		},
		filters: {
			formatSize(data) {
				if (data == 0) {
					data = 0 + "B"
				} else if (data < 1024) {
					data = data + "B"
				} else if (data < 1048576) {
					data = (data / 1024).toFixed(2) + "KB"
				} else if (data < 1073741824) {
					data = (data / 1048576).toFixed(2) + "MB"
				} else {
					data = (data / 1073741824).toFixed(2) + "GB"
				}
				return data
			}
		},
		methods: {
			// 获取缓存数据大小
			async getFormatSize() {
				let that = this
				await plus.cache.calculate(function(size) {
					let sizeCacle = parseInt(size)
					that.fileSize = sizeCacle
				})
			},
			// 清除缓存按钮
			clearStorage() {
				let that = this
				uni.showModal({
					title: that.$t('userInfo.clearCache'),
					content: that.$t('userInfo.isConfirm'),
					success: function(res) {
						if (res.confirm) {
							that.clearCache()
						}
					}

				})
			},
			// 清理缓存
			clearCache() {
				let that = this
				let os = plus.os.name
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity()
					let sdRoot = main.getCacheDir()
					let files = plus.android.invoke(sdRoot, 'listFiles')
					let len = files.length
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) {
									uni.showToast({
										icon: "none",
										title: that.$t('userInfo.clearSuccess'),
										duration: 2000
									})
								}, function(e) {
									console.log(e.message)
								})
								that.getFormatSize()
							}
						}, function(e) {
							console.log('文件路径读取失败')
						})
					}
				} else {
					plus.cache.clear(function() {
						uni.showToast({
							icon: "none",
							title: '缓存清理完成',
							duration: 2000
						})
						that.getFormatSize()
					})
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url);
					let public_modifyAvatar = await uni.ajax.public_modifyAvatar({
						avatar: result
					})
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// 上传图片
			async uploadFilePromise(url) {
				let Folder = "";
				const {
					sign,
					timestamp
				} = this.getSignAndTimestamp();
				return new Promise(async (resolve, reject) => {
					let time = new Date().getTime();
					uni.uploadFile({
						url: uni.conf.baseUrl + "api/upload/uploadImage",
						filePath: url,
						header: {
							'token': uni.getStorageSync("jwt"),
							'company-code': uni.conf.companycode,
							'sign': sign,
							'timestamp': timestamp
						},
						formData: {
							time: time,
						},
						name: 'file',
						success: async (data) => {
							let info = JSON.parse(data.data);
							uni.set_userInfo({
								avatar: info.data.src
							})
							resolve(info.data.src)
						},
					});
				})
			},
			// 生成签名和时间戳的函数
			getSignAndTimestamp() {
				const signKey = "dO68iTifXJnQafE8XhLtpM4iSJCudHCg";
				const timestampInSeconds = Math.floor(Date.now() / 1000);
				const str = signKey + timestampInSeconds;
				const sign = CryptoJS.SHA1(str).toString();

				return {
					sign: sign,
					timestamp: timestampInSeconds
				};
			},
			async public_userLogout() {
				await uni.ajax.public_userLogout();
			},
			logOut() {
				this.public_userLogout();
				uni.pro.clearLoginInfo();
				this.showmodal = false;
				// this.$store.dispatch('close');
				uni.setStorageSync('logout', 1);
				console.log("退出登录跳转===>");
				uni.setStorageSync('is_login', false)
				this.topage('general/login/index');
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.index {
		.list-box {
			padding: 0rpx 32rpx;

			.list {
				height: 100rpx;
				border-bottom: 1rpx solid #F0F0F0;

				.t1 {
					font-size: 28rpx;
					color: #000000;
				}

				.t2 {
					color: #999999;
					font-size: 28rpx;
				}

				.copy {
					width: 28rpx;
					height: 28rpx;
					margin-left: 16rpx;
				}
			}

			.version_text {
				margin-top: 20rpx;
			}
		}

		.avatar-box {
			padding: 32rpx 0rpx;
			height: 280rpx;
			box-sizing: border-box;

			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 100%;
				margin-bottom: 16rpx;
			}

			.t1 {
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
			}
		}

		.logOut {
			width: 686rpx;
			height: 96rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
			border-radius: 8rpx;
			box-shadow: var(--btn-shadow);
			background: var(--linear-gradient-theme);
			margin: 204rpx 32rpx 0;

		}
	}
</style>