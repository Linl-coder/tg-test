<template>
	<view class="index" :style="bg_style">
		<view class="header" id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="flex-between">
				<image class="header-logo" src="/static/logo_icon.png" mode=""></image>
				<view class="serach-box" @tap="topage('general/serach/index?type=1')">
					<u-search :showAction="false" :disabled="true" bgColor="#f5f5f5"
						placeholder="搜索商品、盲盒、系列" v-model="keyword">
					</u-search>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bg_style:{},
				keyword:""
			}
		},
		mounted() {
			this.setnavbar();
		},
		methods:{
			async setnavbar(){//设置导航栏
				let header=await uni.utils.info_distance("header");
				 this.bg_style={
					 'padding-top':header.height+"px"
				 }
			},
		}
	}
</script>

<style lang="scss">
	.index{
		.header {
			width: 100%;
			box-sizing: border-box;
			padding: 24rpx 32rpx;
			position: fixed;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;
			background-color: #fff;
			.header-logo {
				width: 178rpx;
				height: 40rpx;
				margin-right: 24rpx;
			}
		
			.serach-box {
				flex: 1;
			}
		}
	}
</style>
