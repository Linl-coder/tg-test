<template>
	<view class="step">
		<view class="step_box">
			<!-- 左侧进度线 -->
			<view class="step_left">
			</view>

			<view class="step_right">
				<view class="right_content" v-for="(item,index) in stepData" :key="index">
					<!-- 进度名称 -->
					<block v-if="item.isNow == 0">
						<p class="title" style="color: #fff;">{{item.name}}</p>
					</block>
					<block v-if="item.isNow == 1">
						<p class="title " style="color: #fff;">{{item.name}}</p>
					</block>
					<!-- 进度时间 -->
					<p class="times" v-if="item.type == 1">{{item.time}}</p>

					<p class="times" v-if="item.type == 1">{{item.time1}}</p>

					<p class="times" v-if="item.type == 1">{{item.time2}}</p>


					<!-- 进度详情备注 -->
					<p class="result" v-if="item.desc && item.desc !== ''"><text
							style="color: #202020;">{{item.desc}}</text></p>
					<!-- 右侧的进度点 -->
					<p class="status"
						:style="{background: item.isNow == 1?colors:'#ccc',borderColor: item.isNow == 1?colors:'#ccc'}">
						{{item.isNow == 1?"":''}}
					</p>
				</view>
			</view>
		</view>

	</view>
</template>


<script>
	export default {
		data() {
			return {};
		},
		props: {
			colors: {
				type: String
			},
			stepData: {
				type: Array
			}
		},
		methods: {
			jumpNext(item) {

				this.$emit("itemClick", item);
			}

		}
	};
</script>


<style lang="scss" scoped>
	.step {
		padding: 40rpx 0;
		margin-bottom: 20rpx;
	}

	.step_box {
		margin: 0 20rpx;
		margin-left: 20rpx;
		display: flex;

		.step_left {
			width: 2rpx;
			display: block;
			background-color: #DDDDDD;
			// margin-right: 40rpx;
			overflow: hidden;
		}

		.step_right {
			margin-left: 20rpx;
			margin-top: -10rpx;

			.right_content {
				position: relative;
				margin-bottom: 30rpx;

				.title {
					font-size: 32rpx;
					//font-family: Source Han Sans CN;
					font-weight: 500;
					color: #333333;
				}

				.times {
					font-size: 26rpx;
					margin-top: 30rpx;
					//font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 36rpx;
					color: #BCB9E8;
				}

				.status {
					width: 24rpx;
					height: 24rpx;
					// border-radius: 50%;
					//border: 2rpx solid #ccc;
					position: absolute;
					top: 10rpx;
					background-color: #ccc;
					left: -36rpx;
					color: white;
					line-height: 12px;
					font-size: 10px;
					text-align: center;
				}

				.result {
					padding: 10rpx 15rpx;
					background-color: #F6F6F6;
					font-size: 22rpx;
					margin-top: 10rpx;
					border: 1rpx dashed #ddd;
				}

				&:last-of-type {
					margin-bottom: 0;

					.status {
						top: 14rpx;
					}

					&::before {
						content: '';
						width: 1rpx;
						height: 100%;
						//background-color: #FFFFFF;
						position: absolute;
						top: 22rpx;
						left: -24rpx;
					}
				}
			}
		}
	}
</style>