uni.mixin = {
	// 上拉加载页面
	pull: {
		onLoad() {
			const initData = this.$options.initData
			if (uni.utils.isFunction(initData)) {
				initData.call(this);
			}
		},
	},
	//分页
	paging: {
		data() {
			return {
				is_end: false,
				url: "",
				is_loading: true,
			}
		},
		onReachBottom() {
			if (!this.is_end) {
				this.is_loading = true;
				this.pullLoading(this.url);
			}
		},
		created() {
			this.pullInit();
		},
		methods: {
			pullInit() {
				uni.meta={};
				this.pullLoading();	
			},
			async pullLoading() {
				let res = null;	
				res = await this.api[this.url](uni.meta);
				uni.meta = res.meta;
				this.is_end = uni.meta.is_end;
				if (this.pagFn) {
					this.pagFn(res.data);
					this.is_loading=false;
				} else {
					console.log("缺少pagFn方法")
				}
			},
			 
		}
	},
	// 对话框页面
	modal: {
		__pageName__: '',
		__modalResult__: {},
		methods: {
			closeModal(extras, confirm = true) {
				this.__modalResult__ = {
					extras,
					confirm
				}
				uni.pro.navigateBack()
			}
		},
		onLoad() {
			const route = uni.utils.getCurrentRoute()
			this.__pageName__ = uni.url.getPageName(route)
			this.__modalResult__ = {
				confirm: false,
				extras: {}
			}
		},
		onUnload() {
			uni.modal.close(this.__pageName__, this.__modalResult__.extras, this.__modalResult__.confirm);
		}
	}
}
