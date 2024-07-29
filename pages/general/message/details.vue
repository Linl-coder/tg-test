<template>
	<view class="details">
		<view class="header " id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="navbar flex-between">
				<u-icon name="arrow-left" :bold="true" size="25" @tap="toback"></u-icon>
				<view class="title">{{ loading == 4 ? info.title : '详情' }}</view>
				<view class="icon-box">
					<image src="/static/Gather/i4.png" v-if="info.is_follow_count==1" class="icon" mode=""
						@tap="public_follow"></image>
					<image src="/static/Gather/i3.png" v-else class="icon" mode="" @tap="public_follow"></image>
				</view>
			</view>
		</view>
		<view class="content" v-show="loading!=1">
			<view class="title">
				{{info.title}}
			</view>
			<view class="time">
				{{info.add_time}}
			</view>
		</view>
		<view class="u-content" v-show="loading!=1">
			<u-parse :content="info.content"></u-parse>
		</view>
		<view style="padding: 0 32rpx 32rpx;" v-if="richText">
			<view style="margin: 20rpx 0; font-size: 32rpx;font-weight: 600;">*温馨提示:</view>
			<u-parse :content="richText"></u-parse>
		</view>
		<view
			style="padding: 10rpx 32rpx 32rpx;display: flex;flex-direction: column;align-items: flex-end;font-weight: 600;">
			<view>{{appInfo.sitename}}</view>
			<view style="margin-top: 6rpx;">{{info.add_time}}</view>
		</view>
		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				info: {
					content: "",
					add_time: ""
				},
				loading: 1,
				type: 1, //1公告2新闻
				richText: ""
			}
		},
		computed: {
			appInfo() {
				return this.$store.getters.get_appInfo;
			}
		},
		onLoad(query) {
			if (query.type) {
				this.type = query.type;
			}
			this.id = query.id;
			this.public_adgetDetail();
		},
		methods: {
			async public_getPactInfo() {
				uni.ajax.public_getPactInfo({
					type: 8
				}).then(res => {
					this.richText = res.data
				})
			},
			formatDateTime(obj) {
				if (obj == null) {
					return null
				}
				let date = new Date(obj);
				let y = 1900 + date.getYear();
				let m = "0" + (date.getMonth() + 1);
				let d = "0" + date.getDate();
				let h = "0" + date.getHours();
				let mm = "0" + date.getMinutes();
				let s = date.getSeconds();
				return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
			},
			async public_follow() {
				let res = await uni.ajax.public_follow({
					id: this.id
				})
				if (res) {
					this.info.is_follow_count = this.info.is_follow_count == 1 ? 0 : 1;
				}
			},
			async public_adgetDetail() {
				let res = null;
				if (this.type == 1) {
					res = await uni.ajax.public_adgetDetail({
						id: this.id
					})
					if (res) {
						this.info = res.data;
						this.loading = 4;
					} else {
						this.loading = 3;
					}
				}
				if (this.type == 2) {
					res = await uni.ajax.getNewsDetail(this.id)
					if (res) {
						this.info = res.data;
						this.info.content = uni.utils.turnhtml(res.data.content)
						this.loading = 4;
					} else {
						this.loading = 3;
					}
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.details {

		.header {
			background-color: #fff;
			padding: 0rpx 16rpx;
			box-sizing: border-box;
			width: 100%;

			.navbar {
				height: 88rpx;

				.icon-box {
					.icon {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.title {
					font-size: 32rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
					width: 60%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					text-align: center;
				}
			}
		}

		.u-content {
			padding: 24rpx;
		}

		.content {
			width: 100%;
			box-sizing: border-box;
			padding: 32rpx 32rpx 0rpx 32rpx;

			.title {
				font-size: 32rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: bold;
				color: #000000;
			}

			.time {
				margin-top: 32rpx;
				padding-bottom: 32rpx;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				border-bottom: 2rpx solid #F0F0F0;
			}
		}
	}
</style>