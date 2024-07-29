<template>
	<view class="synthesisdetails">
		<view class="" v-if="loading == 4">
			<view class="header-box" :style="{'height':info.cover.imgheight}">
				<u--image :showLoading="true" mode="widthFix" class="icon" :src="info.cover.show_src" width="100%" :height="info.cover.imgheight"></u--image>
			</view>
			<view class="content">
				<view class="desc-box">
					<view class="title">
						<text class="t1">{{ info.title }}</text>
					</view>
					<view class="desc-t">活动时间:{{ info.start_time }}--{{ info.end_time }}</view>
					<view class="tips">*欢迎大家参与投票</view>
				</view>
				<!-- 合成材料 -->
				
				<view class="desc-box">
					<view class="title"><text class="t1">参与投票</text></view>
					<vote :list="info.vote"></vote>
				</view>
				<!-- 合成规则 -->
				<view class="desc-box">
					<view class="title"><text class="t1">卡牌合成内容</text></view>
					<view class="desc-t" style="color: #000;"><u-parse :content="info.content"></u-parse></view>
				</view>
			</view>

			
		</view>

		<iloading :result="loading"></iloading>

		
	</view>
</template>

<script>
	import vote from '@/pages/society/components/vote.vue'
export default {
	components:{
		vote
	},
	data() {
		return {
			id: '',
			loading: 1,
			with_id: '',
			show: false,
			syninfo: {},
			info: {},
			
		};
	},
	onLoad(query) {
		this.id = query.id;
		this.with_id = query.with_id;
		this.collect_getFuseListById();
	},
	methods: {
		
		
		async collect_getFuseListById() {
			let res = await uni.ajax.public_activeGetDetail({
				with_id: this.with_id,
				id: this.id
			});
			if (res) {
				this.info = res.data;
				this.set_imginfo();
			}else{
				this.loading = 3;
			}
		},
		FormData_null(arr) {
			arr.forEach((item, index) => {
				if (!item.goods) {
					item.goods = {
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
			});
		},
		async set_imginfo() {
			//设置图片展现形式
			let system = await uni.pro.getSystemInfo();
			this.info.cover.imgheight = parseFloat(uni.utils.set_imgh(this.info.cover.width, this.info.cover.height, system.windowWidth)).toFixed(2) + 'px';
		    this.$nextTick(()=>{
				this.loading = 4;
			})	
		},
		async syn() {
			let res = await uni.ajax.collect_synFastSyn({
				with_id: this.with_id,
				id: this.id
			});
			if (res) {
				this.syninfo = res.data;
				this.show = true;
			}
		}
	}
};
</script>

<style lang="scss">
.synthesisdetails {
	
	.btnsee {
		min-width: 320rpx;
		background: url('@/static/else/old01.png') no-repeat 100%;
		height: 88rpx;
		border-radius: 16rpx;
		box-sizing: border-box;
		color: #fdf6ec;
		margin-bottom: 24rpx;
	}
	.header-box {
		width: 100%;
		.icon {
			width: 100%;
		}
	}
	.f-box {
		background-color: #fff;
		position: fixed;
		bottom: 0rpx;
		height: 144rpx;
		width: 100%;
		padding: 0rpx 32rpx;
		box-sizing: border-box;
		left: 0rpx;
		box-shadow: 0px -4rpx 32rpx 0px rgba(0, 0, 0, 0.08);

		.btn {
			width: 48%;
			height: 96rpx;
			border-radius: 24rpx;
			background: url('@/static/else/old01.png') no-repeat 100%;
			color: #fff;
			font-size: 30rpx;
		}
		.time-box {
			.icon {
				width: 300rpx;
				height: 300rpx;
			}
			.time {
				@include flex;
				align-items: center;
				padding-left: 16rpx;
				&__custom {
					width: 22px;
					height: 22px;
					border: 2rpx solid #e5e5e5;
					background: #f5f5f5;
					border-radius: 4px;
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					justify-content: center;
					align-items: center;

					&__item {
						color: #fe3333;
						font-size: 12px;
						text-align: center;
					}
				}

				&__doc {
					color: $u-primary;
					padding: 0px 4px;
				}

				&__item {
					color: #606266;
					font-size: 15px;
					margin-right: 4px;
				}
			}

			.t1 {
				margin-top: 24rpx;
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
			}

			.t2 {
				margin-top: 32rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
		}
	}
	.content {
		padding: 24rpx 32rpx;
		width: 100%;
		box-sizing: border-box;
		.desc-box {
			margin-bottom: 24rpx;
			background-color: #fff;
			border-radius: 32rpx;
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);
			.card-box {
				width: 100%;
				margin-top: 24rpx;
				.card-info {
					width: 22%;
					margin-right: 3%;
					margin-bottom: 24rpx;
					.icon-box {
						width: 140rpx;
						height: 140rpx;
						border-radius: 24rpx;
						overflow: hidden;
						position: relative;
						.icon {
							width: 100%;
							height: 100%;
						}
						.mask {
							position: absolute;
							width: 100%;
							height: 100%;
							left: 0rpx;
							top: 0rpx;
							background: rgba(0, 0, 0, 0.4);
							.lock {
								width: 60rpx;
								height: 60rpx;
							}
						}
					}
					.t1 {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-top: 8rpx;
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
					}
					.t2 {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
					}
				}
			}
			.title {
				.t1 {
					font-size: 32rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
				}
			}
			.desc-t {
				margin-top: 8rpx;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				text-align: justify;
			}
			.tips {
				margin-top: 16rpx;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #fe3333;
			}
		}
	}
}
</style>
