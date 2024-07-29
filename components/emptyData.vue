<template>
	<div class="empty flex-colum">
		<image :src="icon" class="icon" mode=""></image>
		<text class="desc">{{desc}}</text>
	</div>
</template>

<script>
	export default {
		props:{
			
			icon:{
				type:String,
				default:""
			},
			desc:{
				type:String,
				default:""
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
    .empty{
		height: 500rpx;
		.icon{
			width: 500rpx;
			height: 500rpx;
		}
		.desc{
			margin-top: 26rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}
</style>