<template>
	<view class="announcement">
		<view class="announcement-one" v-if="type==1">
			<view class="a_a">
				<image mode="aspectFit" src="/static/else/old01.png"></image>
			</view>
			<!-- <u-notice-bar direction="row" icon="" bgColor="" :text="descText.text" speed="50" color="#000" padding="0rpx 0rpx" :url="'/pages/general/message/details?id='+descText.id"></u-notice-bar> -->

			<u-notice-bar direction="row" icon="" @click="click" bgColor="" :text="descText.text" speed="50"
				color="#000" padding="0rpx 0rpx"></u-notice-bar>

			<view class="a_c">
				<!-- <image mode="widthFix" src="@/static/list.png"></image> -->
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				direction: "row",
				notice: [],
				descArry: [],
				descText: {
					id: "",
					text: ""
				},
				info: [{
						title: '测试1',
						id: 1,
					},
					{
						title: '测试2',
						id: 2,
					}
				]
			}
		},
		props: {
			type: {
				type: Number,
				default: 1
			}
		},
		created() {
			this.init_fn(this.info)
		},
		methods: {
			click(e) {
				this.topage("general/message/details?id=" + this.notice[e].id)
			},
			init_fn(info) {
				this.notice = info;
				if (this.direction === 'row') { //纵向滚动
					if (this.notice.length > 0) {
						this.descText.text = this.notice[0].title;
						this.descText.id = this.notice[0].id;
					}
				}
				if (this.direction === 'column') { //横向滚动
					this.notice.forEach((item) => {
						this.descArry.push(item.title)
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.announcement {
		.announcement-one {
			width: 100%;
			// height: 124rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 32rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 24rpx;
			padding: 20rpx 24rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.a_c {
				width: 40rpx;

				image {
					width: 40rpx;
				}
			}

			.a_a {
				width: 90rpx;
				height: 56rpx;
				position: relative;

				&::after {
					content: "";
					position: absolute;
					right: 0;
					height: 60%;
					width: 2px;
					background: #F0F0F0;
					top: 50%;
					transform: translateY(-50%);
				}

				image {
					width: 56rpx;
					height: 56rpx;
				}
			}

			.icon {
				width: 44rpx;
				height: 44rpx;
				margin-right: 16rpx;
			}

			.icon1 {
				width: 116rpx;
				height: 24rpx;
			}

			/deep/.u-notice-bar {
				padding: 0rpx 32rpx 0rpx 32rpx;
			}

		}
	}
</style>