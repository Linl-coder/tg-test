<template>
	<div class="accountsSecurity">
		<div class="header">
			<div class="t_box flex-colum-start">
				<text class="t1">Hi</text>
				<text class="t2">欢迎来到我的客服,服务让生活更简单</text>
			</div>
		</div>
		
		<div class="title flex-start">
			<text>猜你问题</text>
		</div>
		
		<div class="" >
			<div class="tabs" v-if="loading!=1&&first==2">
				<itab :tab_list="tab_list" width="135rpx" lineColor_="#000" @change="change_tab" :type="3" :current="current"></itab>
			</div>
			<div class="list_box" v-if="loading!=1">
				<div class="list_item flex-between" v-for="(item,index) in list" :key="index" @tap="to_details(item)">
					<div class="flex-start">
						<text class="l_t">{{item.title}}</text>
					</div>
					<div class="flex-end">
						<text class="l_t">{{info.email}}</text>
						<u-icon name="arrow-right" color="#000" size="20"></u-icon>
					</div>
				</div>
			</div>
			<iloading :result="loading"></iloading>
		</div>
		
		
		<!-- <div class="btn flex-center" >
			在线服务电话 : 13590123453
		</div> -->

	</div>
</template>

<script>
	import itab from "@/components/itab.vue"
	export default{
		components:{
			itab
		},
		data(){
			return{
				info:{},
				tab_list: [],
				current:0,
				list:[],
				loading:1,
				first:1
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onLoad() {
			this.getCustomerCate();
		},
		methods:{
			change_tab(e){
				this.current=e.index;
				this.list=[];
				this.loading=1;
				this.getCustomerList();
			},
			async getCustomerCate() {
				let res = await uni.ajax.public_faqgetCate();				
				if (res) {
					if(res.data.length>0){
						res.data.list.forEach(item=>{
							let obj={
								name:item.name,
								id:item.id
							}
							this.tab_list.push(obj);
						})
						this.first=2;
						this.getCustomerList();
					}else{
						this.loading=3;
					}
				}
			},
			async getCustomerList() {
				let res = await uni.ajax.public_faqgetFaqList({
					page:1,
					limit:100,
					cate_id:this.tab_list[this.current].id,
					keywords:""
				});
				
				if (res) {
					this.list=res.data.list;
					this.loading=4;
				}
			},
			to_details(item) {
				this.topage('general/article/index?pagetype=kefu&id='+item.id)
			},
			
		}
	}
</script>

<style lang="scss">
	.accountsSecurity{
		padding-bottom: 88rpx;
		.title{
			height: 100rpx;
			font-size: 30rpx;
			font-weight: bold;
			padding-left: 32rpx;
		}
			.header{
				height: 200rpx;
				background-color: #242424;
				position: relative;
				.t_box{
					position: absolute;
					left: 30rpx;
					bottom: 30rpx;
					.t1{
						font-size: 36rpx;
						font-weight: bold;
						color: #fff;
					}
					.t2{
						font-size: 28rpx;
						color: #fff;
					}
				}
			}
			.btn{
				height: 88rpx;
				border-radius: 8rpx;
				box-shadow: 0px 2rpx 24rpx 0px rgba(0, 0, 0, 0.04);
				
				background: #fff;
				color: #000;
				font-size: 30rpx;
				position: fixed;
				bottom: 0rpx;
				width: 100%;
				left: 0rpx;
				box-sizing: border-box;
			}
			.list_box{
				box-shadow: 0px 2rpx 24rpx 0px rgba(0, 0, 0, 0.04);
				margin: 32rpx;
				background: #fff;
				border-radius: 16rpx;
				.avatar{
					width: 60rpx;
					height: 60rpx;
					border-radius: 100%;
					margin-right: 10rpx;
				}
				
				.author_box{
					height: 48rpx;
					border-radius: 8rpx;
					padding: 0rpx 15rpx;
					border: 2rpx solid  rgba(105, 255, 96, 1) ;
					
					.auth_icon{
						width: 28rpx;
						height: 28rpx;
					}
					.auth_t{
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						line-height: 28px;
						background: linear-gradient(180deg, #69FF60 0%, #0C9D5B 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
		
				.list_item{
					height: 118rpx;
					padding: 0rpx 32rpx;
					.icon{
						width: 35rpx;
						height: 35rpx;
						margin-right: 21rpx;
					}
					.l_t{
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000;
						
					}
				}
			}
			
			.list_item_end{
				border: 0rpx;
			}
		
	}
</style>