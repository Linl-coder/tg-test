<template>
	<view class="container">
		<view class="a">
			<view class="a_list" v-for="(item,index) in list" :key="index" @tap="topage('/pages/gather/collect/brand?brand_id='+item.id)">
				<view class="a_a">
					<image mode="aspectFill" :src="item.picture"></image>
				</view>
				<view class="a_box">
					<view class="a_c">
						<image mode="aspectFit" :src="item.head_img ? item.head_img :'/static/else/avatar.png'"></image>
					</view>
					<view class="a_b">{{item.name}}</view>
					<view class="a_d"> <u-parse :content="item.content"></u-parse>  </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				list:[]
			}
		},
		onLoad(){
			this.getList()
		},
		methods:{
			getList(){
				uni.ajax.getBrandList().then(res=>{
					this.list = res.data.list;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.a{
		padding: 0 32rpx 30rpx;
		.a_list{
			width: 100%;
			margin: 30rpx 0 0;
			.a_a{
				width: 100%;
				height: 320rpx;
				background: #dddddd;
				border-radius: 30rpx 30rpx 0 0;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.a_box{
				background: #fff;
				border-radius:0 0 30rpx 30rpx;
				padding: 0 32rpx 32rpx 32rpx;
			}
			.a_c{
				width: 136rpx;
				height: 136rpx;
				margin: 0 auto;
				border-radius: 50%;
				margin-top: -68rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.a_b{
				font-size: 28rpx;
				font-weight: 600;
				color: #000;
				text-align: center;
				margin-top: 16rpx;
			}
			.a_d{
				margin-top: 24rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
				line-height: 30rpx;
			}
		}
	}
</style>