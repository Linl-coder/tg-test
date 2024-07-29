import Vue from 'vue';
import App from './App';
import './basic_toys/bootstrap.js';
import "./common/api/index.js"
import store from './store';
import uView from "uview-ui";
import iloading from '@/components/iloading';
import modal from '@/components/modal';
import open_realname from '@/components/open_realname';
import open_account from '@/components/open_account';
import VueParticles from 'vue-particles'



Vue.use(VueParticles)

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)


import VueI18n from 'vue-i18n';
import messages from './locale/index.js';
Vue.use(VueI18n);
const lang = 'en-US';

const i18n = new VueI18n({
	locale: uni.getStorageSync('locale') || lang, // 默认选择的语言
	messages,
	silentTranslationWarn: true
});
Vue.prototype._i18n = i18n; //作为属性挂载

Vue.component('iloading', iloading); //加载
Vue.component('modal', modal); //弹框
Vue.component('open_realname', open_realname); //弹框
Vue.component('open_account', open_account); //弹框
Vue.use(uView);
Vue.prototype.$store = store;
Vue.config.productionTip = false;
// #ifdef APP-PLUS
uni.addInterceptor('switchTab', {
	success: uni.device.prepare
})
// #endif

Vue.prototype.handleImgUrl = (input) => {
	if (uni.is_online) {
		// 定义处理单个图片URL的函数
		const processSingleUrl = (imgUrl) => {
			if (!imgUrl || typeof imgUrl !== 'string') {
				console.error('Invalid imgUrl');
				return '';
			}
			const parts = imgUrl.split('//');
			if (parts.length < 2) {
				return imgUrl;
			}
			const rightPart = parts[2]
			return `https://cdn.tech.ptejj.com//${rightPart}`;
		};

		// 处理单个图片URL的情况
		if (typeof input === 'string') {
			return processSingleUrl(input);
		}

		// 处理图片URL数组的情况
		else if (Array.isArray(input)) {
			return input.map(imgUrl => processSingleUrl(imgUrl));
		}

		// 如果输入既不是字符串也不是数组，则返回错误信息
		else {
			console.error('Invalid input type. It must be a string or an array of strings.');
			return input; // 或者根据需要返回null或其他标识错误的值
		}
	} else {
		return input;

	}
}

Vue.prototype.topage = (url, option) => {
	uni.pro.navigateTo(url, option);
}
Vue.prototype.kfz = (url, option) => {
	uni.showToast({
		title: i18n.t('utils.notYetOpen'),
		icon: "none"
	})
}
Vue.prototype.totab = (url, option) => {
	uni.pro.switchTab(url);
}
Vue.prototype.toback = (delta) => {
	if (getCurrentPages().length <= 1) {
		// uni.pro.switchTab("collect/index");
		uni.pro.switchTab("gather/homepage");
	} else {
		uni.navigateBack({
			delta: delta || 1
		})
	}
}

Vue.prototype.copy = (str) => {
	if (typeof str != 'undefined') {
		if (str.length > 0) {
			uni.setClipboardData({
				data: str,
				success: () => {
					uni.showToast({
						title: i18n.t('utils.copySuccess'),
						icon: "none"
					})
				}
			})
		}
	}
}

Vue.prototype.toredirect = (url, option) => {
	uni.pro.redirectTo(url, option)
}

Vue.filter('cut_out', val => {
	return val;
})

App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App,
})

app.$mount()