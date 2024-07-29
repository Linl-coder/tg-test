const uploadUrl = 'https://upload-z2.qbox.me';
const downAppurl = "";
const downAppurlios = "";
const proxyApi = "/api/";
const limit = 16;
const version = 1; //安卓版本号
const versionios = 1; //ios 版本号
const debug = false; //是否开启本地代理模式
const formalBack = 'https://tech.ptejj.com/'; //https://tech.phattai88.net/
const formalWs = 'wss://tech.phattai88.net:9501/'; //wss://tech.phattai88.net:9501/  wss://tech.ptejj.com:9501/
const testBack = 'https://space.yygogogo.com/';
const testWs = 'wss://space.yygogogo.com:9501/';
// const staticCdnUrl = 'https://cdn.internalver.phattai88.net';
const staticCdnUrl = 'https://cdn.internalver.ptejj.com';
let baseUrl = "";
let pageUrl = "";
let ws = "";
uni.is_online = false; //true正式服  false为测试服 
const appPackageName = "ma"; //app包名0
let default_expire;
let companycode;
let areaCode;
if (appPackageName === "ma") {
	default_expire = 60;
	companycode = 60;
	areaCode = "60"; //默认区号
} else if (appPackageName === 'vn') {
	default_expire = 25;
	companycode = 25;
	areaCode = "84"; //默认区号
}
if (uni.is_online) {
	baseUrl = debug ? proxyApi : formalBack;
	pageUrl = formalBack;
	ws = formalWs
} else {
	baseUrl = debug ? proxyApi : testBack;
	pageUrl = testBack;
	ws = testWs
}
//#ifdef H5
import VConsole from "./vConsole.js"
if (debug) {

}
//#endif 
const autoRemoveCache = {
	count: 100000,
	size: 100000
}

uni.conf = {
	areaCode,
	appPackageName,
	staticCdnUrl,
	pageUrl,
	uploadUrl,
	debug,
	baseUrl,
	version,
	default_expire,
	autoRemoveCache,
	limit,
	downAppurl,
	companycode,
	downAppurlios,
	versionios,
	ws
}