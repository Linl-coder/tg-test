<template>
	<view class="Refuterumors">
		<view class="hot_dynamic">
			<view class="hot_dynamic_box" @tap="topage('general/Refuterumors/details?id='+item.id)" v-for="(item,index) in list"
				:key="index">
				<view class="user_info flex-start">
					<image 
						:src="'/static/else/avatar.png'" class="avatar" mode=""></image>
		
					<view class="info flex-colum-start">
						<view class="flex-start">
							<text class="name">匿名用户</text>
						</view>
					</view>
		
					<view class="share-box flex-end">
						{{item.add_time}}
					</view>
				</view>
		
				<view class="content">
					<view class="desc_box">
						<view class="desc">{{item.title}}</view>
					</view>
		
					<view class="img_box flex-start">
						<view class="icon-box flex-center" v-for="(itm,idx) in item.files" :key="idx">
							<u--image :showLoading="true" radius="8rpx" :src="itm" width="166rpx"
								height="166rpx"></u--image>
						</view>
						<!-- <view class="icon-box flex-center">
							<u--image :showLoading="true" radius="8rpx" src="/static/i1.png" width="166rpx"
								height="166rpx"></u--image>
						</view>
						<view class="icon-box flex-center">
							<u--image :showLoading="true" radius="8rpx" src="/static/i1.png" width="166rpx"
								height="166rpx"></u--image>
						</view> -->
					</view>
				</view>
		
				<!-- 官方回复 -->
		
				<view class="replay flex-start">
					<image
						:src="'/static/logo.png'" class="avatar" mode=""></image>
					<view class="info flex-colum-start">
						<view class="flex-start">
							<text class="name">官方回复：{{item.replay_text || '暂未回复'}}</text>
						</view>
					</view>
					<view class="" style="position: absolute;right: 0;margin-right: 20rpx;top: 10%;">
						<image v-if="item.rumou_type==2" src="/static/Gather/1.png" mode="widthFix" style="width: 172rpx;"></image>
						<image v-if="item.rumou_type==1" src="/static/Gather/2.png" mode="widthFix" style="width: 172rpx;"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 添加 -->
		<view class="addRefuterumors flex-center" @tap="topage('general/Refuterumors/addRefuterumors')">
			<u-icon name="plus" bold color="#fff"></u-icon>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			list: {
				type: Array,
				default: 0
			},
		},
		
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.Refuterumors {
		.addRefuterumors{
			background: #A754FF;
			width: 136rpx;
			height: 136rpx;
			border-radius: 100%;
			position: fixed;
			right: 30rpx;
			bottom: 110rpx;
		}
		.hot_dynamic {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.hot_dynamic_box {
				position: relative;
				margin-bottom: 24rpx;
				background: #FFFFFF;
				box-shadow: 0px 4rpx 32rpx 0px rgba(0, 0, 0, 0.08);
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				border-radius: 16rpx;
				.content {
					padding-left: 80rpx;
					width: 100%;
					box-sizing: border-box;
					.img_box {
						margin-top: 24rpx;
						display: grid;
						grid-template-columns: 1fr 1fr 1fr;

						.icon {
							width: 196rpx;
							height: 196rpx;
							background-color: #f5f5f5;
							margin-bottom: 24rpx;
						}
					}

					.desc_box {
						margin-top: 24rpx;

						.desc {
							width: 100%;
							font-size: 28rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: bold;
							color: #000000;
						}

						.desc_active {
							color: #0092F5;

						}
					}
				}


				.title_box {
					margin-top: 16rpx;

					.title {
						font-size: 28rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: bold;
						color: #55aaff;
						line-height: 33rpx;
					}
				}
				
				.replay{
					padding-top: 24rpx;
					border-top: 2rpx solid #E0E0E0;
					margin-top: 34rpx;
					.avatar {
						width: 72rpx;
						height: 72rpx;
						border-radius: 100%;
						overflow: hidden;
						background-color: #f5f5f5;
					}

					.info {
						width: calc(100% - 72rpx);
						padding-left: 16rpx;
						box-sizing: border-box;
					
						/deep/.u-tag--mini {
							height: auto;
							padding: 6rpx 8rpx;
						}
					
						.name {
							margin-bottom: 4rpx;
							font-size: 30rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: bold;
							color: #000000;
							margin-right: 8rpx;
						}
					
					}
				}

				.user_info {
					position: relative;

					.avatar {
						width: 72rpx;
						height: 72rpx;
						border-radius: 100%;
						overflow: hidden;
						background-color: #f5f5f5;
					}

					.share-box {
						position: absolute;
						right: 10rpx;
						font-size: 28rpx;
						color: #666666;
					}

					.info {
						width: calc(100% - 72rpx);
						padding-left: 16rpx;
						box-sizing: border-box;

						/deep/.u-tag--mini {
							height: auto;
							padding: 6rpx 8rpx;
						}

						.name {
							margin-bottom: 4rpx;
							font-size: 28rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 500;
							color: #000000;
							margin-right: 8rpx;
						}

					}
				}
			}


		}
	}
</style>