<template>
	<view class="blindboxdeatils" :style="bg_style">
		<view class="header " id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="navbar flex-between">
				<u-icon name="arrow-left" :bold="true" color="#fff" size="25" @tap="toback"></u-icon>
				<view class="title">{{ loading == 4 ? info.title : '详情' }}</view>
				<!-- <view class="icon-box">
					<image src="/static/Gather/i4.png" v-if="info.is_follow_count == 1" class="icon" mode=""
						@tap="collect_follow"></image>
					<image src="/static/Gather/i3.png" v-else class="icon" mode="" @tap="collect_follow"></image>
				</view> -->
			</view>
		</view>

		<view class="" v-if="loading == 4">
			<!-- 图片信息 -->
			<view class="img-box"><u--image :showLoading="true" class="icon" :src="info.cover.show_src" width="100%"
					:height="info.cover.imgheight"></u--image></view>
			<!-- 标题信息 -->
			<!-- <view class="a">
				<view class="a_a"> 
					<view class="a_a_a"><text>￥</text> {{info.price}}</view>
					<view class="a_a_b"  @tap="topage('gather/blindbox/boxHistory?box_id='+info.id)">
						开盒记录
						<u-icon name="arrow-right" color="#Fff" size="16"></u-icon>
					</view>
				</view>
				<view class="a_b">
					<view class="a_b_a">{{ info.title }}</view>					
					<view class="a_b_b">
						<view class="f_b">
							<view>限量</view>
							<view>{{ info.num }}份</view>
						</view>
						<view class="f_b">
							<view>流通量</view>
							<view>{{ info.circulate }}份</view>
						</view>
					</view>
				</view>
			</view> -->

			<!-- 			<view class="album-box"  @tap="topage('gather/blindbox/boxHistory?box_id='+info.id)">
				<view class="title flex-between" style="border-bottom: 0rpx;">开盒记录
				<u-icon name="arrow-right" color="#000000" size="20"></u-icon>
				</view>
			</view> -->
			<!-- 开放时间 -->
			<!-- <view class="album-box">
				<view class="title flex-between">发售时间

				</view>
				<view class="album-desc flex-start">
					<text class="t1">开始时间</text>
					<view class="flex-end t2">
						<text>{{ info.start_time }}</text>
					</view>
				</view>
				<view class="album-desc flex-start">
					<text class="t1">结束时间</text>
					<view class="flex-end t2">
						<text>{{ info.end_time }}</text>
					</view>
				</view>

			</view> -->

			<view class="content">
				<view class="info">
					<view class="pri">
						￥
						<text>{{info.price.split('.')[0]}}.</text>
						{{info.price.split('.')[1]}}
					</view>
					<view class="remark">
						{{info.remark}}
					</view>
				</view>

				<!-- 开放时间 -->
				<view class="album-box">
					<view class="title flex-between">发售时间

					</view>
					<view class="album-desc flex-start">
						<text class="t1">开始时间</text>
						<view class="flex-end t2">
							<text>{{ info.start_time }}</text>
						</view>
					</view>
					<view class="album-desc flex-start">
						<text class="t1">结束时间</text>
						<view class="flex-end t2">
							<text>{{ info.end_time }}</text>
						</view>
					</view>

				</view>

				<!-- 盲盒描述 -->
				<block v-if="info.content">
					<u-divider text="盲盒详情"></u-divider>
					<view class="rich-box">
						<view class="u-content"><u-parse :content="info.content"></u-parse></view>
					</view>
				</block>

				<!-- 购买须知 -->
				<block class="richText">
					<u-divider text="购买须知"></u-divider>
					<view class="buy-desc">
						<view class="desc">
							<u-parse :content="richText" :tagStyle="{span:'white-space:normal'}"></u-parse>
						</view>
					</view>
				</block>
			</view>




			<!-- 购买 -->
			<view class="buy-box flex-between" id="buybox">
				<!-- <view class="price-box">￥{{ info.price }}</view> -->
				<view class="flex-end">
					<!-- <view class="buy-btn flex-center" @tap="popupshow=true"  v-if="info.timeInfo.is_time == 2">
						立即购买</view> -->
					<view class="buy-btn flex-center" @tap="createorder()"
						v-if="info.timeInfo.is_time == 2&&info.stock>0">
						立即购买</view>
					<view class="buy-btn buy-btn-gray flex-center" v-if="info.timeInfo.is_time == 2&&info.stock <=0">已售罄
					</view>
				</view>

				<view class="buy-btn buy-btn-gray flex-center" v-if="info.timeInfo.is_time == 3">已结束</view>
				<view class="buy-btn flex-center" v-if="info.timeInfo.is_time == 1">
					<u-count-down @finish="time_end()" :time="info.timeInfo.timestamp" format="HH:mm:ss" autoStart
						millisecond @change="onChange">
						<view class="time">
							<text class="time__item" v-show="timeData.days > 0">{{ timeData.days }}&nbsp;天</text>
							<text
								class="time__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}&nbsp;时</text>
							<text class="time__item">{{ timeData.minutes }}分</text>
							<text class="time__item">{{ timeData.seconds }}秒</text>
						</view>
					</u-count-down>
				</view>

			</view>
		</view>
		<!-- 批量下单弹框 -->
		<u-popup :show="popupshow" @close="close" round="18" @open="open" :closeable="true" mode="center">
			<view class="popup-box">
				<view class="title flex-center">批量下单</view>
				<view class="form-box">
					<view class="i-box flex-between">
						<view class="i-label">购买数量</view>
						<view class="i-input flex-end">
							<u-number-box button-size="36"
								:max="this.info.limit_num>0?this.info.limit_num:this.info.num" color="#ffffff"
								bgColor="#b9b9b9" iconStyle="color: #fff" v-model="number" :min="0"></u-number-box>
						</view>
					</view>
					<view class="btn flex-center" style="margin-top: 32rpx;" @tap="createorder">确定</view>
				</view>
			</view>
		</u-popup>

		<iloading :result="loading"></iloading>
		<!-- 提示实名 -->
		<open_realname ref="open_realname"></open_realname>
		<!-- 提示开户 -->
		<open_account ref="open_account"></open_account>
	</view>
</template>

<script>
	import collectimg from '@/pages/gather/collect/components/collectImg.vue';
	export default {
		components: {
			collectimg
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
		},
		data() {
			return {
				popupshow: false,
				loading: 1,
				id: '',
				info: {
					title: ''
				},
				bg_style: {},
				imgInfo: {
					img: '/static/Gather/market/i1.png',
					mode_type: 1
				},
				number: 1,
				timeData: {},
				time: null,
				count: 1,
				content: ``,
				richText: ""
			};
		},
		onLoad(query) {
			this.id = query.id;
			this.collect_blindboxGetDetail();
			this.public_getPactInfo();
		},
		onHide() {
			clearInterval(this.time);
			this.time = null;
			this.count = 1;
		},
		destroyed() {
			clearInterval(this.time);
			this.time = null;
		},
		methods: {
			async public_getPactInfo() {
				uni.ajax.public_getPactInfo({
					type: 6
				}).then(res => {
					this.richText = res.data
				})
			},
			close() {
				this.popupshow = false;
			},
			open() {
				this.popupshow = true;
			},
			time_end() {
				this.info.timeInfo.is_time = 2;
			},
			onChange(e) {
				this.timeData = e;
			},
			async collect_blindboxGetDetail() {
				let res = await uni.ajax.collect_blindboxGetDetail({
					id: this.id
				});
				if (res) {
					this.info = res.data;
					this.info.timeInfo = uni.utils.FormDataEndTime(this.info.start_time, this.info.end_time);
					this.set_imginfo();
					this.loading = 4;
					this.$nextTick(async () => {
						this.setnavbar();
					});
				} else {
					this.loading = 3;
				}
			},
			async createorder() {
				if (this.user_info.cert_id <= 0) { //提示实名弹框
					this.$refs.open_realname.open();
					return false;
				}
				if (this.user_info.is_open != 1 && uni.is_online) {
					this.$refs.open_account.open();
					return false;
				}
				if (this.count != 1) {
					return false;
				}
				//确认订单
				let res = await uni.ajax.collect_blincboxbuy({
					id: this.info.id,
					num: this.number
				});
				if (res) {
					if (this.number > 1) {
						this.close();
					}
					this.info.img = this.info.cover;
					this.time_fn();
				} else {
					uni.hideLoading();
				}
			},
			time_fn() {
				uni.showLoading({
					title: "下单中..."
				})
				this.count = 2;
				this.collect_getStayPayOrderInfo();
				this.time = setInterval(() => {
					if (this.count < 15) {
						this.collect_getStayPayOrderInfo();
						this.count = this.count + 1;
					} else {
						this.count = 1;
						clearInterval(this.time);
						uni.hideLoading();
					}
				}, 500)
			},
			async collect_getStayPayOrderInfo() {
				let res = await uni.ajax.collect_getStayPayOrderInfo();
				if (!uni.utils.isArray(res.data) && typeof(res.data) == 'object') {
					uni.hideLoading();
					clearInterval(this.time);
					uni.setStorage({
						key: 'collect_payinfo',
						data: this.info,
						success: () => {
							this.topage('gather/wallet/collectpay?buy_type=2&is_mark=1&number=' + this
								.number);
						}
					});
				}
			},
			async collect_follow() {
				let res = await uni.ajax.collect_follow({
					goods_id: this.id,
					buy_type: 2
				});
				if (res) {
					this.info.is_follow_count = this.info.is_follow_count == 1 ? 0 : 1;
				}
			},
			async set_imginfo() {
				//设置图片展现形式
				let system = await uni.pro.getSystemInfo();
				this.info.cover.imgheight = parseFloat(uni.utils.set_imgh(this.info.cover.width, this.info.cover
					.height, system.windowWidth)).toFixed(2) + 'px';
			},
			async setnavbar() {
				let header = await uni.utils.info_distance('header');
				let buybox = await uni.utils.info_distance('buybox');
				this.bg_style = {
					'padding-top': header.height + 'px',
					'padding-bottom': buybox.height + 10 + 'px'
				};
			}
		}
	};
</script>

<style lang="scss">
	page {
		// background: #fff;
	}

	.img-box {
		background-color: #332B45;
	}

	.a {
		border-radius: 40rpx 40rpx 60rpx 60rpx;
		background: url('/static/else/old01.png') no-repeat;
		background-size: 100% 100%;
		margin: 20rpx 30rpx;
		height: 200rpx;

		.a_a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12rpx 30rpx 12rpx 48rpx;

			.a_a_a {
				letter-spacing: 2px;
				font-size: 56rpx;
				font-weight: 500;
				color: #fff;

				text {
					font-size: 16px;
				}
			}

			.a_a_b {
				font-size: 26rpx;
				color: #FFF;
				display: flex;
				align-items: center;
			}
		}

		.a_b {
			border-radius: 40rpx;
			// background: url('/static/018.png') no-repeat;
			background-size: 100% 100%;
			height: 200rpx;

			.a_b_a {
				font-size: 40rpx;
				color: #000;
				padding: 30rpx 0 20rpx 32rpx;
				font-weight: 500;
			}

			.a_b_b {
				display: flex;
				align-items: center;
				padding: 10rpx 32rpx 0;

				.f_b {
					margin-top: 16rpx;
					display: flex;
					align-items: center;

					view:nth-child(1) {
						padding: 4rpx 14rpx;
						background: #1777FF;
						border-radius: 8rpx 8rpx 8rpx 8rpx;
						font-size: 22rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #ffffff;
						margin-right: 16rpx;
					}

					view:nth-child(2) {
						padding: 4rpx 14rpx;
						background: #EBF3FF;
						border-radius: 8rpx 8rpx 8rpx 8rpx;
						font-size: 22rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #1777FF;
						margin-right: 16rpx;
					}
				}
			}
		}
	}

	.blindboxdeatils {
		.popup-box {
			width: 90vw;
			background: #ffffff;
			border-radius: 24rpx;

			.form-box {
				padding: 30rpx;

				.i-box {
					height: 100rpx;

					.i-label {
						font-size: 30rpx;
						color: #000;
						font-weight: bold;
					}

					.i-input {
						font-size: 30rpx;
						color: #000;
						font-weight: bold;

						/deep/input {
							border: 1rpx solid #ccc;
							width: 25%;
							text-align: center;
							border-radius: 6rpx;
							margin: 0rpx 16rpx;
							height: 66rpx;
						}
					}
				}

				.btn {
					margin: auto;
					background: url('@/static/else/old01.png') no-repeat 100%;
					border-radius: 24rpx;
					font-size: 32rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					height: 88rpx;
					width: 100%;
				}
			}

			.title {
				font-size: 30rpx;
				font-weight: bold;
				height: 60rpx;
			}
		}

		.buy-box {
			padding: 0rpx 32rpx;
			box-sizing: border-box;
			position: fixed;
			height: 130rpx;
			width: 100%;
			left: 0rpx;
			bottom: 0rpx;
			background: #ffffff;

			.price-box {
				font-size: 40rpx;
				//font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
			}

			.buy-btn {
				width: 686rpx;
				// padding: 0rpx 32rpx;
				border-radius: 8rpx;
				// margin-left: 16rpx;
				height: 96rpx;
				// background: url("@/static/else/old01.png") no-repeat 100%;
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				background: var(--linear-gradient-theme);
				box-shadow: var(--btn-shadow);
			}

			.buy-btn-gray {
				background: #ccc;
			}

			.time {
				@include flex;
				align-items: center;

				&__item {
					color: #fff;
					font-size: 32rpx;
					text-align: center;
				}
			}
		}

		.buy-desc {
			margin-bottom: 24rpx;
			padding: 24rpx 32rpx;
			background: #ffffff;
			border-radius: 12rpx;

			.title {
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
				height: 100rpx;
			}

			.desc {
				color: #666666;
				font-size: 28rpx;
				text-align: justify;
			}
		}

		.rich-box {
			margin-bottom: 24rpx;
			padding: 24rpx 32rpx;
			background: #ffffff;
			border-radius: 12rpx;

			.title {
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
				height: 100rpx;
				border-bottom: 1rpx solid #f0f0f0;
			}

			.u-content {
				padding: 24rpx 0rpx;
			}
		}

		.album-box {
			// margin-top: 120rpx;
			padding: 0rpx 32rpx;
			background: #ffffff;
			border-radius: 12rpx;

			.title {
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
				height: 100rpx;
				border-bottom: 1rpx solid #f0f0f0;
			}

			.album-desc {
				height: 88rpx;

				.t1 {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					width: 150rpx;
					display: inline-block;
				}

				.t3 {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}

				.t2 {
					width: calc(100% - 150rpx);
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;

					.copy {
						width: 24rpx;
						height: 24rpx;
						margin-left: 8rpx;
					}
				}
			}
		}

		.title-box {
			background: #fff;
			padding: 24rpx 32rpx;
			box-sizing: border-box;
			width: 100%;

			.title {
				align-items: flex-start;

				.t1 {
					font-size: 48rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
					display: inline-block;
					width: calc(100% - 200rpx);
				}

				.arrorder {
					width: 200rpx;
					text-align: right;
					font-size: 32rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}

			.tips {
				width: 100%;
				margin-top: 16rpx;

				.tips-box {
					margin-right: 24rpx;

					.tips-left {
						width: 72rpx;
						height: 48rpx;
						background: #000000;
						font-size: 24rpx;
						color: #ffffff;
						border-radius: 8rpx 0rpx 0rpx 8rpx;
					}

					.tips-right {
						height: 48rpx;
						min-width: 100rpx;
						box-sizing: border-box;
						padding: 0rpx 8rpx;
						border: 1rpx solid #000;
						font-size: 24rpx;
						border-radius: 0rpx 8rpx 8rpx 0rpx;
					}
				}
			}
		}

		.header {
			// background: #73BCFF;

			padding: 0rpx 32rpx;
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;
			// background: url('@/static/017.png') no-repeat center;
			background-color: #332B45;
			background-size: 100%;

			.navbar {
				height: 88rpx;

				.icon-box {
					.icon {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.title {
					position: absolute;
					left: 20%;
					font-size: 32rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #fff;
					width: 60%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					text-align: center;
				}
			}
		}
	}

	.content {
		padding: 24rpx 32rpx;

		.info {
			border-radius: 12rpx;
			background-color: #fff;
			padding: 32rpx;
			margin-bottom: 24rpx;

			.pri {
				margin-bottom: 12rpx;
				font-size: 20rpx;
				font-family: HarmonyOS Sans-Bold, HarmonyOS Sans;
				font-weight: bold;
				color: #222222;

				text {
					font-size: 32rpx;
					font-family: HarmonyOS Sans-Medium, HarmonyOS Sans;
					font-weight: bold;
				}
			}

			.remark {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;

			}
		}
	}
</style>