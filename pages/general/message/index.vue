<template>
	<view class="message">
		<view class="header  ">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="flex-center">
				<itab :tab_list="heaser" @change="change_fn" :type="3" width="175rpx" :current="current"></itab>
			</view>
		</view>
		<view class="itab-box">
			<div class="tab_box" v-if="current==0">
				<u-tabs :list="tablist" lineColor="#000" :activeStyle="{
			         color: '#000',
					 fontSize:'32rpx',
					 
			     }" :inactiveStyle="{
			         color: '#999999', 
					 fontSize:'30rpx',
					 
			     }" :current="table" :itemStyle="{width: '175rpx',height:'88rpx',padding:'0rpx'}" @click="change_fn1"></u-tabs>
			</div>
			<div class="tab_box" v-if="current==1">
				<u-tabs :list="tablist" lineColor="#000" :activeStyle="{
			         color: '#000',
					 fontSize:'32rpx',
					 
			     }" :inactiveStyle="{
			         color: '#999999', 
					 fontSize:'30rpx',
					 
			     }" current="0" :itemStyle="{width: '175rpx',height:'88rpx',padding:'0rpx'}" @click="change_fn1"></u-tabs>
			</div>
			<!-- <itab :tab_list="tablist" @change="change_fn1" :type="3" width="175rpx" ></itab> -->
		</view>

		<!-- 数据列表 -->
		<view class="content">
			<messageList :list="list" v-if="current!=2" :type="current+1"></messageList>

			<Refuterumors v-if="current==2" :list="list" style="margin-top: 24rpx;"></Refuterumors>

			<iloading :result="loading"></iloading>
		</view>

	</view>
</template>

<script>
	import {
		pages
	} from "@/common/mixins/index.js";
	import itab from "@/components/itab.vue";
	import messageList from "./components/messageList.vue";
	import Refuterumors from "./../Refuterumors/index.vue";
	export default {
		components: {
			itab,
			messageList,
			Refuterumors
		},
		mixins: [pages],
		data() {
			return {
				current: 0,
				list: [],
				cate_id: '',
				loading: 1,
				tablist: [],
				tablistNews: [],
				heaser: [{
						name: "平台公告"
					},
					{
						name: "新闻发声"
					},
					{
						name: "辟谣墙"
					},
				],
				show_tab: true,
				table: 0,
			}
		},
		onShow() {
			this.public_adgetCate();
		},
		created() {},
		// onHide() {
		// 	this.init()
		// },
		methods: {
			init() {
				this.list = [];
				this.tablist = []
				this.cate_id = ''
			},
			change_fn(e) {
				this.page = 1;
				this.current = e.index;
				uni.setNavigationBarTitle({
					title: e.name
				})
				this.init()
				this.loading = 1;
				if (e.index == 0) {
					this.show_tab = true;
					this.public_adgetCate()
				} else if (e.index == 1) {
					this.show_tab = true;
					this.getNewsCate()
				} else {
					this.show_tab = false;
					this.getRumorList()
				}
			},
			change_fn1(e) {
				this.list = [];
				this.loading = 1;
				this.page = 1;
				this.cate_id = e.id;
				if (this.current == 0) {
					this.public_adgetCate();
				} else {
					this.getNewsCate()
				}
			},

			async public_adgetCate() { //获取公告分类
				let res = await uni.ajax.public_adgetCate();
				if (res) {
					this.tablist = res.data.map(item => {
						return {
							name: item.name,
							id: item.id
						}
					})
					this.tablist.unshift({
						name: "全部",
						id: ""
					})
					if (this.tablist.length > 0) {
						this.list = []
						this.public_adgetList();
					}
					// this.tablist.push({
					// 	name:"我的关注",
					// 	id:"follow"
					// })
				}
			},
			getNewsCate() {
				uni.ajax.getNewsCate().then(res => {
					this.tablist = res.data.map(item => {
						return {
							name: item.label,
							id: item.value
						}
					})
					this.tablist.unshift({
						id: '',
						name: '全部'
					})
					if (this.tablist.length > 0) {
						this.list = []
						this.getNewsList()
					}
				})
			},
			getNewsList() {
				let params = {
					cate_id: this.cate_id,
				}
				uni.ajax.getNewsList(params).then(res => {
					this.setPagedata("", "list", res.data.list, 'getNewsList', false);
				})
			},
			getRumorList() {
				uni.ajax.getRumorList().then(res => {
					this.setPagedata("", "list", res.data.list, 'getRumorList', false);
				})
			},
			async public_adgetList() { //获取公告列表
				let res = null;
				if (this.cate_id == "follow") {
					res = await uni.ajax.public_followgetLog({
						cate_id: this.cate_id,
						page: this.page,
						limit: uni.conf.limit
					});
					if (res) {
						let arr = [];
						res.data.list.forEach(item => {
							arr.push(item.affiche);
						})
						res.data.list = arr;
					}
				} else {
					res = await uni.ajax.public_adgetList({
						cate_id: this.cate_id,
						page: this.page,
						limit: uni.conf.limit
					});
				}

				if (res) {
					this.setPagedata("", "list", res.data.list, 'public_adgetList', false);

				} else {
					this.loading = 3;
				}
			}
		}
	}
</script>

<style lang="scss">
	.message {

		.content {
			padding: 0rpx 32rpx;
		}

		.header {
			padding-top: 24rpx;
			// background-color: #fff;
			// padding-bottom: 24rpx;


		}

		.itab-box {
			// padding-top: 24rpx;
			// background-color: #fff;
			padding-bottom: 24rpx;
		}
	}
</style>