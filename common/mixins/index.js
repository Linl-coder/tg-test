/**
 * uview上传文件
 */
export const uploadimg = {
	methods: {
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
					message: '上传中'
				})
			})
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].url)
				let item = this[`fileList${event.name}`][fileListLen]
				this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result.src,
					id: result.id
				}))
				fileListLen++
			}
		},
		async uploadFilePromise(url) {
			let Folder = "";
			return new Promise(async (resolve, reject) => {
				let time = new Date().getTime();
				uni.uploadFile({
					url: uni.conf.baseUrl + "api/upload/uploadImage",
					filePath: url,
					header: {
						'token': uni.getStorageSync("jwt"),
						'company-code': uni.conf.companycode
					},
					formData: {
						time: time,
					},
					name: 'file',
					success: async (data) => {
						let info = JSON.parse(data.data);
						resolve(info.data)
					},

				});

			})
		},
	}
}
/**
 * 获取个人信息
 */
export const userinfo = {
	methods: {
		async get_user_info() { //获取个人信息
			let res = await uni.ajax.public_getUserInfo();
			if (res) {
				uni.setStorageSync("user_info", res.data);
				this.$store.commit("set_user_info", res.data);
			}
		}
	}
}
/**
 * 分页
 */
export const pages = {
	data() {
		return {
			page: 1,
			fn: ""
		}
	},
	onReachBottom() {
		if (this.loading == 4) {
			this.loading = 1;
			this.page = this.page + 1;
			this[this.fn]();
		}
	},
	methods: {
		/**
		 * @param {String} arr 循环组件的数组
		 * @param {string} list 列表数据源
		 * @param {Array} data 接口返回的数据
		 * @param {string} fn 触底加载需要执行的函数名称
		 *  @param {boolean} is_componentsfor 是否开启长列表优化
		 */
		setPagedata(arr, list, data, fn, is_componentsfor = true, limit) {
			let limit_ = limit || uni.conf.limit;

			try {
				if (data.length > 0) {
					this[list].push(...data);
				}
			} catch (e) {
				//TODO handle the exception
			}
			if (is_componentsfor) {
				this[arr].push({
					begin: this[list].length - data.length,
					end: this[list].length
				})
			}

			setTimeout(() => {
				this.loading = uni.utils.loading_result(this.page, data, limit_);
			}, 200)
			this.fn = fn;
		}
	}
}
/**
 * uview无网络提升
 */
export const network = {
	methods: {
		disconnected() { //"重试"后，无网络触发	
		},
		connected() { //"重试"后，有网络触发		
			this.init_fn();
		},
		retry() { //用户点击页面的"重试"按钮时触发
		}
	}
}

/**
 * 微信登录
 */
export const wxlogin = {
	methods: {
		wx_login() { //微信登录
			return new Promise((resolve, reject) => {
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (loginRes) => {
									resolve(loginRes)
								},
								fail: function(res) {
									uni.showToast({
										title: "微信获取用户信息失败",
										icon: "none"
									})
									reject();
								}
							})
						}
					},
					fail(err) {
						uni.showToast({
							title: err,
							icon: "none"
						})
						reject();
					}
				});
			})
		}
	}
}

/**
 * 微信app支付
 */
export const wxpay = {
	methods: {
		wx_pay(orderInfo) {
			return new Promise((reslove, reject) => {
				uni.requestPayment({
					"provider": "wxpay",
					"orderInfo": JSON.stringify(orderInfo),
					success(res) {
						reslove(true);
					},
					fail(e) {
						reslove(false);
					}
				})
			})
		},
	}
}
/**
 * 支付宝 app 支付
 */
export const zfbpay = {
	methods: {
		zfb_pay(orderInfo) {
			return new Promise((reslove, reject) => {
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: orderInfo, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
					success: res => {
						reslove(true);
					},
					fail(err) {
						reslove(false);
					}
				});
			})

		},
	}
}