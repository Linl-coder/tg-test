import md5 from './md5'
import Vue from 'vue';
/**  
 * 转换对象为x-www-form-urlencoded
 * @author NanQi
 * @param {Object} obj  
 * @return {String}  
 */
let transformRequest = obj => {
	let query = ''
	let name, value, fullSubName, subName, subValue, innerObj, i

	for (name in obj) {
		value = obj[name]

		if (value instanceof Array) {
			for (i = 0; i < value.length; ++i) {
				subValue = value[i]
				fullSubName = name + '[' + i + ']'
				innerObj = {}
				innerObj[fullSubName] = subValue
				query += transformRequest(innerObj) + '&'
			}
		} else if (value instanceof Object) {
			for (subName in value) {
				subValue = value[subName]
				fullSubName = name + '[' + subName + ']'
				innerObj = {}
				innerObj[fullSubName] = subValue
				query += transformRequest(innerObj) + '&'
			}
		} else if (value !== undefined && value !== null) {
			query += encodeURIComponent(name) + '=' +
				encodeURIComponent(value) + '&'
		}
	}

	return query.length ? query.substr(0, query.length - 1) : query
}

let timestamp = function() {
	return Date.parse(new Date()) / 1000
}

let isNavigating = false
let isNavigate = () => {
	if (isNavigating) {
		return true
	} else {
		isNavigating = true
		setTimeout(() => {
			isNavigating = false
		}, 2000)
		return false
	}
}

let guid = (function() {
	let counter = 0

	return function(prefix) {
		let guid = new Date().getTime().toString(32),
			i

		for (i = 0; i < 5; i++) {
			guid += Math.floor(Math.random() * 65535).toString(32)
		}

		return (prefix || '') + guid + (counter++).toString(32)
	}
}())

let sortTransform = (obj) => {
	var objKeys = Object.keys(obj)
	objKeys = objKeys.sort()

	var ret = {}
	for (var i = 0; i < objKeys.length; i++) {
		let objVal = obj[objKeys[i]]
		ret[objKeys[i]] = objVal
	}

	return transformRequest(ret)
}

function isArray(v) { //是否是数组
	return toString.apply(v) === '[object Array]'
}

function isFunction(v) { //是否是函数
	return typeof v === 'function'
}

function isEmptyObject(v) { //是否是空对象
	return Object.keys(v).length == 0
}

function sleep(time) { //静默多少毫秒执行
	return new Promise((resolve) => setTimeout(resolve, time))
}

const throttle = function(func, wait = 200, options) { //节流
	/* options的默认值
	 *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
	 *  options.leading = true
	 * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
	 *  options.trailing = true 
	 * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
	 */
	var context, args, result
	var timeout = null
	var previous = 0
	if (!options) options = {
		leading: true,
		trailing: false
	}
	var later = function() {
		previous = options.leading === false ? 0 : new Date().getTime()
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}
	return function() {
		var now = new Date().getTime()
		if (!previous && options.leading === false) previous = now
		// 计算剩余时间
		var remaining = wait - (now - previous)
		context = this
		args = arguments
		// 当到达wait指定的时间间隔，则调用func函数
		if (remaining <= 0 || remaining > wait) {
			// 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			result = func.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			// options.trailing=true时，延时执行func函数
			timeout = setTimeout(later, remaining)
		}
		return result
	}
}

const debounce = function(func, wait, immediate) { //防抖
	// immediate默认为false
	var timeout, args, context, timestamp, result
	var later = function() {
		// 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
		var last = new Date().getTime() - timestamp

		if (last < wait && last >= 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function() {
		context = this
		args = arguments
		timestamp = new Date().getTime()
		// 第一次调用该方法时，且immediate为true，则调用func函数
		var callNow = immediate && !timeout
		// 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}

Promise.prototype.finally = function(callback) {
	let P = this.constructor
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => {
			throw reason
		})
	)
}

const getCurrentPage = function() { //获取路由信息
	const pages = getCurrentPages();
	return pages[pages.length - 1];
}

const getCurrentRoute = function() { //获取路由
	return '/' + getCurrentPage().route
}

const updateApp = function() {
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		uni.downloadFile({
			url: uni.updateUrlApp,
			success: (downloadResult) => {
				if (downloadResult.statusCode === 200) {
					plus.runtime.install(downloadResult.tempFilePath, {
						force: false
					}, function() {
						console.log('install success...');
						plus.runtime.restart();
					}, function(e) {
						console.error('install fail...');
					});
				}
			}
		});
	});
}

const info_distance = function(e) { //获取元素信息
	return new Promise((resolve, reject) => {
		uni.createSelectorQuery().select(`#${e}`).boundingClientRect(res => {
			resolve(res)
		}).exec();
	})
}

const is_null = function(parmas, title) { //判断为空
	return new Promise((reslove, reject) => {
		if (parmas == null || parmas == "") {
			uni.showToast({
				title: title,
				icon: "none"
			})
			reject();
		} else {
			reslove();
		}
	})
}
const is_phone = function(parmas, title, tips) { //判断手机号
	return new Promise((reslove, reject) => {
		if (parmas === null || parmas === "") {
			uni.showToast({
				title: title,
				icon: "none"
			})
			reject();
		} else if (parmas.length > 10 || parmas.length < 8) {
			uni.showToast({
				title: title,
				icon: "none"
			})
			reject();
		} else if (uni.conf.companycode == 60 && (parmas[0] == 0 || parmas[0] == 6)) {
			uni.showToast({
				title: tips,
				icon: "none"
			})
			reject();
		} else if (uni.conf.companycode == 25 && (parmas[0] + '' + parmas[1] == '84')) {
			uni.showToast({
				title: tips,
				icon: "none"
			})
			reject();
		} else {
			reslove()
		}
	})
}

const loading_result = function(page, arr, limit) { //计算是否最后一页
	let result = null;
	let limit_ = limit || uni.conf.limit;

	if (page == 1 && arr.length < limit_) {
		if (arr.length <= 0) {
			result = 3;
		} else {
			result = 2;
		}
	} else if (page > 1 && arr.length < limit_) {
		result = 2;
	} else {
		result = 4;
	}

	return result;
}

const hide_phone = function(phone) { //手机号中间*
	phone = "" + phone;
	var newTel = phone.substr(0, 3) + "****" + phone.substr(7)
	return newTel;
}

const hide_name = function(name) { //字符串中间*
	var newStr;
	if (name.length === 2) {
		newStr = name.substr(0, 1) + '*';
	} else if (name.length > 2) {
		var char = '';
		for (let i = 0, len = name.length - 2; i < len; i++) {
			char += '*';
		}
		newStr = name.substr(0, 1) + char + name.substr(-1, 1);
	} else {
		newStr = name;
	}
	return newStr;
}

const upFile = function(Folder_p, count = 1) { //上传文件
	let Folder = "";
	if (Folder_p) {
		Folder = Folder_p + "/"
	}
	return new Promise((reslove, reject) => {
		uni.chooseImage({
			count: count,
			success: async (chooseImageRes) => {
				const path = chooseImageRes.tempFilePaths[0];
				uni.showLoading({
					title: "上传中请稍后..."
				})
				// 可以在此上传到服务端
				let res = await uni.ajax.get_qiniu_token();
				let time = new Date().getTime();

				uni.uploadFile({
					url: uni.conf.uploadUrl,
					filePath: path,
					formData: {
						token: res.token,
						key: Folder + time + uni.guid
					},
					name: 'file',
					success: async (data) => {
						let info = JSON.parse(data.data);
						let url = "https://" + res.url + info.key;
						reslove(url);
						uni.hideLoading();
					},
					fail() {
						uni.hideLoading();
					}
				});
			}
		});
	})
}

const turnhtml = (str) => { //转义html
	var arrEntities = {
		lt: "<",
		gt: ">",
		nbsp: "&nbsp;",
		amp: "&",
		quot: '"'

	};
	return str.replace(/&(lt|gt|nbsp|amp|quot|p);/gi, function(all, t) {
		return arrEntities[t];
	});
}

const Rad = function(d) {
	return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}

const GetDistance = function(lat1, lng1, lat2, lng2) { //计算2个经纬距离
	var radLat1 = Rad(lat1);
	var radLat2 = Rad(lat2);
	var a = radLat1 - radLat2;
	var b = Rad(lng1) - Rad(lng2);
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137; // EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000; //输出为公里
	s = s.toFixed(2);
	return s;
}
const get_source = function(src) { //获取图片资源信息			
	return new Promise((reslove, reject) => {
		uni.getImageInfo({
			src: src,
			success: res => {
				reslove(res);
			},
			fail: err => {
				reject(err);
			}
		});
	});
}

const is_wx = function() { //判断是否在微信浏览器中打开
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true; // 微信中打开
	} else {
		return false; // 普通浏览器中打开
	}
}

/**
 * @param {string} w 图片原宽度
 * @param {string} h 图片原高度
 * @param {string} p_w 图片在页面的宽度
 * @return {string} p_h 图片在页面的高度
 */
const set_imgh = function(w, h, pw) {
	let p_h = null;
	p_h = pw * h / w;
	return p_h;
}

const formdatatime = function(hisTime, nowTime) {
	if (!arguments.length) return '';
	var arg = arguments,
		now = arg[1] ? arg[1] : new Date().getTime(),
		diffValue = now - arg[0],
		result = '',
		minute = 1000 * 60,
		hour = minute * 60,
		day = hour * 24,
		halfamonth = day * 15,
		month = day * 30,
		year = month * 12,
		_year = diffValue / year,
		_month = diffValue / month,
		_week = diffValue / (7 * day),
		_day = diffValue / day,
		_hour = diffValue / hour,
		_min = diffValue / minute;

	if (_year >= 1) result = parseInt(_year) + '年前';
	else if (_month >= 1) result = parseInt(_month) + '个月前';
	else if (_week >= 1) result = parseInt(_week) + '周前';
	else if (_day >= 1) result = parseInt(_day) + '天前';
	else if (_hour >= 1) result = parseInt(_hour) + '个小时前';
	else if (_min >= 1) result = parseInt(_min) + '分钟前';
	else result = '刚刚';
	return result;
}
/**
 * @param {Object} start_time_
 * @param {Object} end_time_
 * @returns {object} is_time 1未开始 2进行种 3已结束
 */
const FormDataEndTime = function(start_time_, end_time_) {
	let timestamp = null;
	let is_time = null;
	let now_time = new Date().getTime();
	let start_time = new Date(start_time_.replace(/-/g, '/')).getTime();
	let end_time = new Date(end_time_.replace(/-/g, '/')).getTime();
	if (now_time < start_time) {
		is_time = 1;
		timestamp = start_time - now_time;
	} else {
		if (now_time >= end_time) {
			is_time = 3;
		} else {
			is_time = 2;
		}
	}
	return {
		is_time: is_time,
		timestamp: timestamp
	}
}

const a = new Vue();

function returnMsg(code, msg) {
	const responseCode = [
		1201,
		1202,
		1301,
		1302,
		1303,
		1304,
		1305,
		1306,
		1307,
		1308,
		1309,
		1310,
		1311,
		1312,
		1313,
		1314,
		1315,
		1316,
		1317,
		1318,
		1319,
		1320,
		1321,
		1322,
		1323,
		1324,
		1325,
		1326,
		1327,
		1328,
		1329,
		1330,
		1331,
		1332,
		1333,
		1334,
		1335,
		1336,
		1337,
		1338,
		1339,
		1340,
		1341,
		1342,
		1343,
		1344,
		1345,
		1346,
		1347,
		1348,
		1349,
		1350,
		1351,
		1352,
		1353,
		1354,
		1355,
		1356,
		1357,
		1358,
		1359,
		1360,
		1361,
		1362,
		1363,
		1365,
		1366,
		1367,
		1368,
		1369,
		1370,
		1371,
		1372,
		1373,
		1374,
		1375,
		1376,
		1377,
		1378,
		1379,
		1380,
		1381,
		1382,
		1383,
		1384,
		1385,
		1386,
		1387,
		1388,
		1389,
		1390,
		1391,
		1392,
		1393,
		1394,
		1399,
		1403,
		1404,
		1405,
		1406,
		1407,
		1408,
		1409,
		1410,
		1411,
		1412,
		1413,
		1414,
		1415,
		1416,
		1417,
		1418,
		1419,
		1420,
		1421,
		1422,
		1424,
		1425,
		1426,
		1427,
		1428,
		1429,
		1430,
		1431,
		1432,
		1433

	];
	const i = responseCode.indexOf(code);
	if (i != -1) {
		if (i != 97) {
			uni.showToast({
				title: a.$i18n.t(`backendRespon.msg${i+1}`),
				icon: 'none'
			});
		} else {
			uni.showToast({
				title: a.$i18n.t(`backendRespon.msg${i+1}`),
				icon: 'none',
				duration: 1000
			});
			setTimeout(function() {
				uni.redirectTo({
					url: '/pages/general/userinfo/setpwd?type=1'
				});
			}, 1000); // 设置与消息显示时间一致的延迟时间
		}
	} else {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
		return;
	}
}


export function loginToast() {
	return a.$i18n.t('index.loginToast')
}

export function handleResponseCode(code, msg) {
	returnMsg(code, msg);
}

uni.utils = {
	FormDataEndTime,
	formdatatime,
	set_imgh,
	is_wx,
	get_source,
	GetDistance,
	is_null,
	is_phone,
	md5,
	transformRequest,
	sortTransform,
	timestamp,
	isNavigate,
	guid,
	isArray,
	sleep,
	isFunction,
	isEmptyObject,
	throttle,
	debounce,
	getCurrentPage,
	getCurrentRoute,
	updateApp,
	info_distance,
	loading_result,
	hide_phone,
	hide_name,
	upFile,
	turnhtml
}