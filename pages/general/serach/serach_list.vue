<template>
	<div class="serach_list" :class="{'serach_list_active':type==2}">
		<view class="card">
			<view class="card_item flex-between" @tap="topage('gather/collect/deatils?id=' + item.id)" v-for="(item, index) in list" :key="index" >
				<view class="icon-box"><u--image :showLoading="true" :src="item.cover.show_src" width="168rpx" height="168rpx"></u--image></view>
				<view class="f-box">
					<view class="title">{{ item.title }}</view>
					<view class="desc" v-if="item.author">
						<text class="desc-text">{{item.author.nickname}}</text>
						<!-- <text class="desc-author">创作者</text> -->
					</view>
					<view class="price-box flex-between">
						<view class="tips-box flex-center">
							<view class="tips-left flex-center">流通</view>
							<view class="tips-right flex-center">{{ item.circulate }}</view>
						</view>
						<text class="price">￥{{ item.price }}</text>
					</view>
				</view>
			</view>
			<iloading :result="loading"></iloading>
		</view>
		
		
	</div>
</template>

<script>
	import collect from './components/serachHistory.vue';
	
	export default {
		components: {
			collect,
		},
		data() {
			return {
				type: "",
				loading: 1,
				list: [],
				page: 1,
				title:""
			}
		},
		onLoad(option) {
			this.type = option.type;
			this.title=option.title;
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.search_();
		},
        onReachBottom() {
        	if(this.result==4){
        		this.result=1;
        		this.page=this.page+1;
        		this.search_();
        	}
        },
		methods: {
			async search_(){
				let res=await uni.ajax.collect_search({
					page: this.page,
					limit: uni.conf.limit,
					title:this.title
				})
				if(res){
					this.list=this.list.concat(res.data);
					this.loading=uni.utils.loading_result(this.page,res.data);
				}
			}
			
		}
	}
</script>

<style lang="scss">
	.serach_list {
		padding:0rpx 32rpx 24rpx 32rpx;
		.card {
			margin-top: 24rpx;
		
			.card_item {
				padding: 16rpx;
				background-color: #fff;
				border-radius: 16rpx;
				box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
				margin-bottom: 24rpx;
				width: 100%;
				box-sizing: border-box;
		
				.icon-box {
					width: 168rpx;
					height: 168rpx;
					background: #d9d9d9;
					border-radius: 24rpx;
					overflow: hidden;
				}
		
				.f-box {
					width: calc(100% - 168rpx);
					padding-left: 16rpx;
					box-sizing: border-box;
					.price-box {
						.price {
							font-size: 40rpx;
							font-weight: bold;
						}
					}
		
					.title {				
						font-size: 32rpx;
						font-weight: bold;
						color: #000000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 100%;
					}
		
					.tips-box {
						.tips-left {
							width: 72rpx;
							height: 48rpx;
							background: #1777FF;
							font-size: 24rpx;
							color: #ffffff;
							border-radius: 8rpx 0rpx 0rpx 8rpx;
						}
					
						.tips-right {
							height: 44rpx;
							min-width: 100rpx;
							padding: 0rpx 8rpx;
							border: 2rpx solid #1777FF;
							font-size: 24rpx;
							border-radius: 0rpx 8rpx 8rpx 0rpx;
						}
					}
		
					.desc {
						margin: 16rpx 0rpx;
						white-space: pre-wrap;
		
						.desc-text {
							font-size: 28rpx;
							color: #000000;
							font-weight: 500;
							margin-right: 24rpx;
						}
		
						.desc-author {
							padding: 4rpx 12rpx;
							border-radius: 4rpx;
							font-size: 22rpx;
							background: rgba(7, 235, 254, 0.15);
						}
					}
				}
			}
		}
	}
	
</style>
