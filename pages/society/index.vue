<template>
	<view class="index" :style="bg_style">
		<view class="header" id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="tab-box flex-center">
				<view class="tab tab-active">
					论坛
				</view>
				<view class="tab" @tap='kfz'>
					消息
				</view>
			</view>
			<view class="tab-box flex-center">
				<view class="tab-item tab-border " @tap="change_fn(1)" :class="{'tab-item-active':current==1}">
					推荐
				</view>
				<view class="tab-item tab-border"  @tap="change_fn(2)" :class="{'tab-item-active':current==2}">
					关注
				</view>
				<view class="tab-item"  @tap="change_fn(3)" :class="{'tab-item-active':current==3}">
					最新
				</view>
			</view>
		</view>
		<view class="dynamic-box">
			<dynamic @openShare="openShare" v-for="(item, index) in communitydata" :key="index" :info="item"></dynamic>
			<iloading :result="loading"></iloading>
		</view>

		<div class="release flex-center" @tap="topage('society/release')">
			<image src="/static//community/edit.png" class="icon" mode=""></image>
			<text class="t">发布</text>
		</div>
		<sharepopup ref="sharepopup" ></sharepopup>
	</view>
</template>

<script>
	import sharepopup from "@/components/sharepopup.vue";
	import dynamic from './components/dynamic.vue';
	import {pages} from '@/common/mixins/index.js';
	import {community_list,clearcommunity_list} from './list.js';
	export default {
		mixins: [pages],
		components: {
			dynamic,
			sharepopup,		
		},
		data() {
			return {
				current:3,
				bg_style: {},
				communitydata: [],
				loading:1
			}
		},
		onLoad() {
			this.set_init_list();
		},
		onPullDownRefresh() {
			this.pull_init(true)
		},
		created() {
			this.community_getList();
		},
		mounted() {
			this.setnavbar();
		},
		onShow() {
			if (uni.getStorageSync('new_Topic') == true) {
				this.page = 1;
				this.community_getList();
			}	
			
		},
		methods: {
			change_fn(e){
				this.current=e;
				this.pull_init(true);
			},
			pull_init(is_onPullDownRefresh) {
				this.loading=1;	
				this.page=1;
				if(is_onPullDownRefresh){
					clearcommunity_list();
					this.set_init_list();
					this.communitydata=[];
				}
				this.community_getList(is_onPullDownRefresh);	
			},
			set_init_list() {
				this.community_list = community_list;
			},
			async community_getList(is_onPullDownRefresh=false) {
				let ajaxName="community_getSwitch";
				switch (this.current){
					case 1:
					   ajaxName="community_getSwitch"
						break;
					case 2:
					   ajaxName="community_getFollow"
						break;
					case 3:
					   ajaxName="community_getList"
						break;
					default:
						break;
				}
				let res = await uni.ajax[ajaxName]({
					page: this.page,
					limit: uni.conf.limit
				})
				if (res) {
					let nowtime=new Date().getTime();
					res.data.list.forEach(item=>{
						let hisTime=new  Date(item.add_time).getTime();
						item.add_time=uni.utils.formdatatime(hisTime,nowtime)
					})
					if (uni.getStorageSync('new_Topic') == true) {
						clearcommunity_list();
						this.set_init_list();
						this.communitydata=[];
						uni.removeStorageSync('new_Topic');
					}
					this.setPagedata('communitydata', 'community_list', res.data.list, 'community_getList');
					
					if (is_onPullDownRefresh) {
						await uni.utils.sleep(500);
						uni.stopPullDownRefresh();
					}
					
				}

			},
			openShare(item) {
				this.$refs.sharepopup.open(item);
			},
			async setnavbar() {
				let header = await uni.utils.info_distance("header");
				this.bg_style = {
					'padding-top': header.height + "px"
				}
			},
			change() {

			}
		}
	}
</script>

<style lang="scss">
	.index {
		.dynamic-box {
			padding: 32rpx;
		}

		.release {
			position: fixed;
			width: 240rpx;
			height: 88rpx;
			left: 255rpx;
			/* #ifdef H5 */
			bottom: 156rpx;
			/* #endif */
			/* #ifdef APP-PLUS */
			bottom: 30rpx;
			/* #endif */
			border-radius: 110rpx;
			background: url('@/static/else/old01.png') no-repeat 100%;
			box-shadow: 0px 8rpx 8rpx 0px rgba(0, 0, 0, 0.15);

			.icon {
				width: 48rpx;
				height: 48rpx;
				margin-right: 10rpx;
			}

			.t {
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #ffffff;
				line-height: 38px;
			}
		}

		.header {
			background-color: #fff;
			position: fixed;
			width: 100%;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;

			.tab-box {
				height: 88rpx;

				.tab {
					font-size: 32rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					width: 120rpx;
					text-align: center;
				}

				.tab-active {
					font-weight: bold;
					font-size: 44rpx;
					position: relative;
				}

				.tab-active::after {
					content: "";
					height: 4px;
					background-color: #000000;
					width: 30%;
					position: absolute;
					bottom: -10rpx;
					border-radius: 40rpx;
					left: 35%;
				}

				.tab-item {
					flex: 1;
					text-align: center;
					font-size: 28rpx;
					color: #999999;
				}

				.tab-item-active {
					color: #000000;
					font-weight: bold;
				}

				.tab-border {
					border-right: 2rpx solid #F0F0F0;
				}
			}
		}
	}
</style>