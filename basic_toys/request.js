import CryptoJS from "crypto-js";
import store from "./../store/index.js";

import {
	handleResponseCode,
	loginToast
} from './utils.js'

const preCacheKeyClearFetch = 'storage:clear:fetch:';

function encryptByAES(str) {
	let key = CryptoJS.enc.Utf8.parse(getApp().globalData.aes); // 密钥：一个常量，前后端协定后一个字符串即可
	let iv = CryptoJS.enc.Utf8.parse(getApp().globalData.iv); // 偏移量：一个常量，前后端协定后一个字符串，前后端一致即可

	let srcs = CryptoJS.enc.Utf8.parse(str);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC, // mode 与后台一致。有多个模式可选
		padding: CryptoJS.pad.Pkcs7, //
	});
	// 需要返回base64格式的加密结果，使用此句
	return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
	// 需要返回hex格式的加密结果，使用此句
	// return encrypted.ciphertext.toString().toUpperCase();
}

function Decrypt(str) {
	let key = CryptoJS.enc.Utf8.parse(getApp().globalData.aes); // 密钥：一个常量，前后端协定后一个字符串即可
	let iv = CryptoJS.enc.Utf8.parse(getApp().globalData.iv); // 偏移量：一个常量，前后端协定后一个字符串，前后端一致即可
	let base64 = CryptoJS.enc.Base64.parse(str);
	let src = CryptoJS.enc.Base64.stringify(base64);
	var decrypt = CryptoJS.AES.decrypt(src, key, {
		iv: iv,
		// mode: CryptoJS.mode.ECB,
		mode: CryptoJS.mode.CBC, // mode 与后台一致。有多个模式可选
		padding: CryptoJS.pad.Pkcs7
	});
	var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return JSON.parse(decryptedStr.toString());
}

function encryptor_fn(str) {
	const encryptor = new uni.$jsencrypt();
	const publicKey = getApp().globalData.skRSAPublicKey;
	encryptor.setPublicKey(publicKey);
	return encryptor.encrypt(str);
}

function getclientType() {
	let system = uni.getSystemInfoSync();
	let os = '';
	if (system.uniPlatform === 'web') {
		os = 'W';
	} else {
		if (system.platform == 'ios') {
			os = 'I';
		}
		if (system.platform == 'android') {
			os = 'A';
		}
	}
	return os;
}

function getVersion() {
	const sysInfo = uni.getSystemInfoSync();
	// #ifdef H5
	return sysInfo.appVersion
	// #endif

	// #ifdef APP-PLUS
	return sysInfo.appWgtVersion
	// #endif
}

//sha1 加密获得sign
// 生成签名和时间戳的函数
function getSignAndTimestamp() {
	const signKey = "dO68iTifXJnQafE8XhLtpM4iSJCudHCg";
	const timestampInSeconds = Math.floor(Date.now() / 1000);
	const str = signKey + timestampInSeconds;
	const sign = CryptoJS.SHA1(str).toString();

	return {
		sign: sign,
		timestamp: timestampInSeconds
	};
}

uni.pro.interceptor('request', {
	config(options) {
		let params = Object.assign({}, options.data);
		let header = options.header || {};
		header['company-code'] = uni.getStorageSync('CompanyCode') || uni.conf.companycode;
		header['token'] = uni.getStorageSync("jwt");
		header['os'] = getclientType();
		// getclientType()
		// 调用生成签名和时间戳的函数
		const {
			sign,
			timestamp
		} = getSignAndTimestamp();
		header['sign'] = sign;
		header['timestamp'] = timestamp;
		// getVersion()
		header['ver'] = getVersion();
		options.header = header;
		return options;
	}
})

function form_str(obj) { //加密传递数据
	if (uni.conf.debug == true) {
		console.log(obj)
	}
	obj.data.version = "1.0";
	let new_obj = {
		objEncrypt: encryptByAES(JSON.stringify(obj.data)),
		sign: encryptor_fn(obj.data)
	}
	if (obj.method == "GET") {
		return new_obj;
	} else {
		return JSON.stringify(new_obj);
	}
}
let can_show = true;
async function request(paramOptions) {
	let options = Object.assign({}, paramOptions)
	options.url = uni.conf.baseUrl + paramOptions.url;
	try {
		const res = await new Promise((resolve, reject) => {
			uni.getNetworkType({
				success: (res) => {
					const networkType = res.networkType;
					if (networkType === 'none') {
						reject({
							success: false,
							message: 'There seems to be a problem with your network, please check and try again!',
							code: '400'
						});
					} else {
						resolve(uni.pro.request(options));
					}
				},
				fail: () => {
					reject({
						success: false,
						message: 'Failed to get network type',
						code: '400'
					});
				}
			});
		});

		if (options.toast) {
			uni.pro.showLoading({
				title: "LOADING",
				mask: true
			});
		}
		if (res.statusCode == 200) {
			if (res.data.code == 200) {
				if (res.data.msg && options.toast &&
					!["success", "ok", "抽奖完成", "获取成功！", "查询成功！"].includes(res.data.msg)) {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					});
				}
				return res.data;
			} else if ([401, 1001, 1201, 1202].includes(res.data.code) || res.data.info == "登录认证TOKEN不能为空！") {
				if (res.data.code == 1001 && paramOptions.url.includes("examine-switch-")) {
					return false;
				}
				store.dispatch('actionSetLogin', false)
				if (can_show) {
					can_show = false;
					uni.showModal({
						content: loginToast(),
						showCancel: false,
						success: (modalRes) => {
							if (modalRes.confirm) {
								uni.pro.clearLoginInfo();
								uni.removeStorageSync('is_login');
								uni.setStorageSync('logout', 1);
								can_show = true;
								uni.$emit('logout');
								uni.reLaunch({
									url: "/pages/general/login/index"
								});
							}
						}
					});
				}
			} else if (res.data.code == 500) {
				return res.data;
			} else {
				handleResponseCode(res.data.code, res.data.msg);
				return false;
			}
		} else {
			handleResponseCode(res.data.code, res.data.msg);
			return false;
		}
	} catch (err) {
		throw err;
	} finally {
		if (options.toast) {
			uni.pro.hideLoading();
		}
	}
}

function isExpire(url) {
	return uni.cache.get(preCacheKeyClearFetch + url)
}
/**
 * 标记fetch过期，会重新请求
 * @author NanQi
 * @param {String} url 标记的URL 
 */
function markFetch(url) {
	uni.cache.set(preCacheKeyClearFetch + url, true)
}

/**
 * 拉取数据(get请求,带缓存)
 * @author NanQi
 * @param {String} url 请求的URL 
 * @param {Object} data 请求参数 
 * @param {Boolean} toast 是否显示toast
 * @param {Number} expire 缓存过期时间（秒）
 * @return {Promise} Promise对象
 */
async function fetch(url, data, toast = true, expire = uni.conf.default_expire) {
	let param = ''
	if (data) {
		param += ':' + uni.utils.md5(uni.utils.sortTransform(data));
	}
	const cacheKey = 'memory:fetch:' + url + param;
	const cacheVal = uni.cache.get(cacheKey);
	if (!isExpire(url) && cacheVal) {
		return Promise.resolve(cacheVal);
	} else {
		if (isExpire(url)) {
			uni.cache.remove(preCacheKeyClearFetch + url)
		}
		try {
			const res = await get(url, data, toast);
			uni.cache.remove(cacheKey);
			uni.cache.set(cacheKey, res, expire);
			return res;
		} catch (err) {
			const res = uni.cache.getStorageData(cacheKey);
			if (res) {
				return Promise.resolve(res);
			} else {
				throw err;
			}
		}
	}
}

/**
 * 获取数据(get请求,不带缓存)
 * @author NanQi
 * @param {String} url 请求的URL 
 * @param {Object} data 请求参数 
 * @param {Boolean} toast 是否显示toast
 * @return {Promise} Promise对象
 */
function get(url, data, toast = true, is_nat = false, method = 'GET') {
	return request({
		url,
		data,
		toast,
		is_nat,
		method,
		nat_url: url
	})
}


/**
 * post请求
 * @author NanQi
 * @param {String} url 请求的URL 
 * @param {Object} data 请求参数 
 * @param {Boolean} toast 是否显示toast
 * @param {String} method 请求方式,默认POST 
 * @return {Promise} Promise对象
 */
function post(url, data, toast = true, is_nat = false, method = 'POST') {
	return request({
		url,
		method,
		data,
		is_nat,
		toast,
		nat_url: url
	})
}

uni.api = {
	request,
	markFetch,
	fetch,
	get,
	post
}