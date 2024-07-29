<template>
	<view class="orderlist">
		
		<!-- <view class="itab-box flex-center"><itab :tab_list="tab_list" :type="3" width="175rpx" :current="current" @change="change_fn"></itab></view> -->
		<view class="order-box">
			<regift v-for="(item, index) in list" :key="index" :info="item" :current="type"></regift>
			<iloading :result="loading"></iloading>
		</view>
	</view>
</template>

<script>
import { pages } from '@/common/mixins/index.js';
import itab from '@/components/itab.vue';
import regift from './components/regift.vue';
import { orderlist, clearOrderlist } from './list.js';
export default {
	components: {
		regift,
		itab
	},
	mixins: [pages],
	data() {
		return {
			loading: 1,
			current: 0,
			tab_list: [
				{
					name: '卡牌',
					type:0
				},
				{
					name: '盲盒',
					type:1
				},
				{
					name: '寄售',
					type:2
				},
				{
					name: '合成',
					type:3
				}
			],
			list: [],
			type:0
		};
	},
	onLoad(query) {
		if(query.type){
			this.type=Number(query.type);
			this.current=Number(query.type);
		}
		this.collect_GvLog();
		this.orderlist = orderlist;
		this.set_title();
	},
	methods: {
		reback(){
			uni.switchTab({
				url:'/pages/gather/home/index'
			})
		},
		change_fn(e) {
			let index = e.index;
			this.list = [];
			this.page = 1;
			this.loading = 1;
			this.current = index;
			this.type=this.tab_list[this.current].type;
			clearOrderlist();
			this.orderlist = orderlist;
			this.collect_GvLog();
			console.log(this.type)
			this.set_title();
		},
		set_title(){
			switch (this.type){
				case 0:
				    uni.setNavigationBarTitle({
				    	title:"转赠记录"
				    })
					break;
				case 1:
				    uni.setNavigationBarTitle({
				    	title:"转赠记录"
				    })
					break;
				case 2:
				    uni.setNavigationBarTitle({
				    	title:"寄售记录"
				    })
					break;
				case 3:
				    uni.setNavigationBarTitle({
				    	title:"合成记录"
				    })
					break;
				default:
					break;
			}
		},
		async collect_GvLog() {
			let res = null;
			let key="";
			switch (this.type) {
				case 0:
					res = await uni.ajax.collect_poolgGvLog({
						page: this.page,
						limit: uni.conf.limit
					});
					key="goods";
					break;
				case 1:
					res = await uni.ajax.collect_boxgGvLog({
						page: this.page,
						limit: uni.conf.limit
					});
					key="goods";
					break;
				case 2:
					res = await uni.ajax.collect_markgGvLog({
						page: this.page,
						limit: uni.conf.limit
					});
					key="pool";
					break;
				case 3:
					res = await uni.ajax.collect_synGetLog({
						page: this.page,
						limit: uni.conf.limit
					});
					key="synInfo";
					break;	
				default:
					break;
			}
			
			if (res) {
				this.FormData_null(key,res.data.list);
				this.setPagedata('list', 'orderlist', res.data.list, 'collect_GvLog');
			}
		},
		FormData_null(key,arr) {
			arr.forEach((item, index) => {
				
				if(this.type==3){	
					if (!item[key]) {
						item[key] = {
							goods:{
								cover: {
									height: 0,
									id: 0,
									show_src: '',
									width: 0
								},
								file_id: '',
								id: '',
								title: '暂无数据'
							}	
						};
					}
				}else{
					if (!item[key]) {
						item[key] = {
							cover: {
								height: 0,
								id: 0,
								show_src: '',
								width: 0
							},
							file_id: '',
							id: '',
							title: '暂无数据'
						};
					}
				}
			});
		},
	}
};
</script>

<style lang="scss">
	.nav_c{
		display: flex;
		align-items: center;
		.nav_c_list{
			margin: 0 20rpx;
			font-size: 32rpx;
			color: #999;
		}
		.nav_c_list_active{
			font-weight: bold;
			color: #000000;
		}
	}
.orderlist {
	.itab-box {
		background: #fff;
		padding: 24rpx 0rpx;

		/deep/.tab_item {
			background-color: #fff;
		}
	}

	.order-box {
		padding: 24rpx;
	}
}
</style>
