<template>
	<view class="attention">
		<view class="list flex-start" v-for="(item,index) in list" :key="index" >			
			<view class="icon-box" v-if="item.fans.avatars">
				<image :src="item.fans.avatars.show_src?item.fans.avatars.show_src:'/static/else/avatar.png'" class="icon" mode=""></image>
			</view>
			<view class="icon-box" v-else>
				<image src="/static/else/avatar.png" class="icon" mode=""></image>
			</view>
			<view class="userinfo flex-between">
				<view class="info flex-colum-start">
					<text class="t1">{{item.fans.nickname}}</text>
					<text class="t2">ID：{{item.fans.user_code}}</text>
				</view>
				<view class="btn flex-center" v-if="item.isFollow==1" @tap="community_zan(index,item.fans.id)">
					已关注
				</view>
				<view class="btn-add flex-center" v-else  @tap="community_zan(index,item.fans.id)">
					<image src="/static/community/add.png"  class="add" mode=""></image>
					<text class="t1">关注</text>
				</view>
			</view>
		</view>
		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	import {pages} from "@/common/mixins/index.js";
	export default{
		mixins: [pages],
		data(){
			return{
				list:[],
				loading: 1,
			}
		},
		created() {
			this.community_mygetFans();
		},
		methods:{
			async community_mygetFans() {
				let res = await uni.ajax.community_mygetFans({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {
					let arr=[];
					res.data.list.forEach(item=>{
						item.isFollow=1;
						if(item.fans){
							arr.push(item)
						}
					})
					this.setPagedata('', 'list', arr, 'community_mygetFans', false);
			
				}
			},
			async community_zan(index,id){
				let res=await uni.ajax.community_zan({
					forum_id:id,
					type:2
				})	
				if(res){
					uni.showToast({
						title:"操作成功",
						icon:"none"
					})	
					if(this.list[index].isFollow==1){
						this.list[index].isFollow=0;
					}else{
						this.list[index].isFollow=1;
					}	
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.attention{
		padding: 0rpx 32rpx 32rpx 32rpx;
		.list{
			width: 100%;
			margin-bottom: 32rpx;
			.icon-box{
				width: 120rpx;
				height: 120rpx;
				border-radius: 100%;
				overflow: hidden;
				position: relative;
				-webkit-backface-visibility: hidden;
				-webkit-transform: translate3d(0, 0, 0);
				.icon{
					width: 100%;
					height: 100%;
				}
			}
			.userinfo{
				width: calc(100% - 120rpx);
				padding-left: 16rpx;
				box-sizing: border-box;
				.btn{
					width: 128rpx;
					height: 52rpx;
					background: #E1E2E7;
					border-radius: 52rpx;
					font-size: 28rpx;
				}
				.btn-add{
					width: 128rpx;
					height: 52rpx;
					border: 2rpx solid #0092F5;
					box-sizing: border-box;
					border-radius: 52rpx;
					font-size: 28rpx;
					color: #0092F5;
					.add{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.info{
					width: calc(100% - 128rpx);
					.t1{
						font-size: 32rpx;
						font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: bold;
						color: #000000;
						margin-bottom: 8rpx;
					}
					.t2{
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}
			}
		}
	}
</style>