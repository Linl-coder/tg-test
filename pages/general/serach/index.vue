<template>
	<view class="serach">
		<view class="navbar " :class="{ 'navbar_active': show_navbar }">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="serach_box flex-between">
				<u-icon name="arrow-left" color="#000000" size="28" @tap="toback()"></u-icon>
				<u-search :showAction="true" @search="search" @custom="search" bgColor="#fff" placeholder="请输入关键词"
					v-model="keyword"></u-search>
			</view>
		</view>
		<view class="history" v-show="history_list.length>0">
			<view class="history_title flex-between">
				<text class="t1">搜索历史</text>
				<u-icon name="trash" color="#ccc" size="28" @tap="detlet_history"></u-icon>
			</view>
			<view class="history_card flex-start">
				<view class="history_item flex-center" @tap="search(item)" v-if="index<=10"
					v-for="(item,index) in history_list" :key="index">
					{{item}}
				</view>
			</view>
		</view>
		
		<!-- 热门搜索 -->	
		<view class="history-box">
			<history :list="hot_list" :result="result"></history>
		</view>
	
	</view>
</template>

<script>
	import history from './components/serachHistory.vue';
	export default {
		components:{
			history
		},
		data() {
			return {
				keyword: "",
				show_navbar: false,
				history_list: [],
				type: 1, //搜索类型
				result: 2,
				hot_list: [],

			}
		},
		onPageScroll(e) {
			if (e.scrollTop > 1) {
				this.show_navbar = true;
			} else {
				this.show_navbar = false;
			}
		},
		onLoad(query) {
			this.type = query.type;
			this.set_show_history();
			this.collect_getHot();
		},
		methods: {
			async collect_getHot() {
				let res = await uni.ajax.collect_getHot({
					flg: this.type
				})

				if (res) {
					this.hot_list = res.data.list;
					this.result = uni.utils.loading_result(1, res.data.list);
				} else {
					this.result = 3;
				}
			},
			search(e) {
				if (e.trim()) {
					this.set_history(e);
					uni.pro.navigateTo('general/serach/serach_list?type=' + this.type + "&title=" + e);
				} else {
					uni.showToast({
						title: "请输入搜索内容",
						icon: "none"
					})
				}

			},
			detlet_history() {
				let delete_name = "";
				if (this.type == 1) {
					delete_name = "search_history";
				} else {
					delete_name = "search_history_shop";
				}
				uni.removeStorage({
					key: delete_name,
					success: () => {
						this.history_list = [];
					}
				})
			},
			set_show_history() {
				let history_txt = this.get_history();
				if (typeof history_txt == 'object') {
					this.history_list = history_txt;
				}
			},
			get_history() {
				if (this.type == 1) {
					return uni.getStorageSync("search_history");
				} else {
					return uni.getStorageSync("search_history_shop");
				}
			},
			set_history(serach_txt) { //保存搜索历史
				let arr = [];
				let history_txt = this.get_history();
				if (typeof history_txt == 'object') {
					let index_of = history_txt.indexOf(serach_txt);
					if (index_of == -1) {
						history_txt.unshift(serach_txt);
					}
					arr = history_txt;
				} else {
					arr.push(serach_txt);
				}
				if (this.type == 1) {
					uni.setStorageSync("search_history", arr);
				} else {
					uni.setStorageSync("search_history_shop", arr);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.serach {
		.history-box{
			
		}
		.history {
			position: relative;
			z-index: 100;
			padding: 24rpx 32rpx;
			padding-bottom: 0rpx;
		
			.history_title {
				.t1 {
					font-size: 32rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
				}
		
				.t2 {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 28rpx;
				}
			}
		
			.history_card {
				margin-top: 14rpx;
		
				.history_item {
					background: #fff;
					height: 58rpx;
					padding: 1rpx 24rpx;
					border-radius: 102rpx;
					margin-bottom: 24rpx;
					margin-right: 10rpx;
				}
			}
		}

		.navbar {
			box-sizing: border-box;
			width: 100%;
			

			.serach_box {
				flex: 1;
				padding: 32rpx 16rpx;
			}
		}
	}
</style>
