<template>
	<view class="index">
		<downapp @downapp="down" :from="from" :href='href' :company_code="company_code"></downapp>
		<!-- 微信环境下引导用户打开默认浏览器下载app -->
		<openBrowser v-if="is_wx"></openBrowser>
	</view>
</template>

<script>
	import openBrowser from "@/components/openBrowser.vue";
	import downapp from "./components/down.vue";
	export default {
		components: {
			downapp,
			openBrowser
		},
		data() {
			return {
				is_wx: false,
				system: {},
				from: "",
				downAppurl: "",
				downAppurlios: "",
				href: '',
				company_code: '60',
			}
		},
		created() {
			this.system = uni.getSystemInfoSync();
			// #ifdef H5
			this.is_wx = uni.utils.is_wx();
			// #endif	
		},
		onLoad(query) {
			if (query.lang) {
				this._i18n.locale = query.lang || 'en-US';
				this.company_code = query.company_code
			}
			this.href = location.origin
			console.log(this.href)
		},
		methods: {
			down() {
				// #ifdef APP-PLUS
				if (this.system.platform == "ios") {
					plus.runtime.openURL(this.downAppurlios);
				} else {
					plus.runtime.openURL(this.downAppurl);
				}
				// #endif
				// #ifdef H5
				if (this.system.platform == "ios") {
					window.location.href = this.downAppurlios;
				} else {
					window.location.href = this.downAppurl;
				}
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.index {
		width: 100%;
		min-height: 100vh;
		background: url('/static/downLoad/bg.png');
		@include backImg;
		overflow: auto;
	}
</style>