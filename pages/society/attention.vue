<template>
	<view class="attention">
		<view class="list flex-start" v-for="(item,index) in list" :key="index">
			<view class="icon-box">
				<image :src="item.follow.avatars?item.follow.avatars.show_src:'/static/else/avatar.png'" class="icon" mode=""></image>
			</view>
			<view class="userinfo flex-between">
				<view class="info flex-colum-start">
					<text class="t1">{{item.follow.nickname}}</text>
					<text class="t2">ID：{{item.follow.user_code}}</text>
				</view>
				<view class="btn flex-center" @tap="community_zan(index,item.follow.id)">
					取消关注
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
			this.community_mygetFollow();
		},
		methods:{
			async community_mygetFollow() {
				let res = await uni.ajax.community_mygetFollow({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {
					let arr=[];
					res.data.list.forEach(item=>{
						if(item.follow){
							arr.push(item)
						}
					})
					this.setPagedata('', 'list',arr, 'community_mygetFollow', false);
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
					this.list.splice(index,1);
					if(this.list.length<=0){
						this.loading=3;
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
					width: 138rpx;
					height: 52rpx;
					background: #E1E2E7;
					border-radius: 52rpx;
					font-size: 28rpx;
				}
				.info{
					width: calc(100% - 138rpx);
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