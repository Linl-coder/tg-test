<template>
	<view class="collectdeatils" :style="bg_style">
		<view class="header " id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="navbar flex-between">
				<u-icon name="arrow-left" :bold="true" color="#fff" size="25" @tap="toback"></u-icon>
				<view class="title">{{ loading == 4 ? info.title : '详情' }}</view>
				<!-- <view class="icon-box flex-end">
					<image src="/static/Gather/i4.png" v-if="info.is_follow_count == 1" class="icon" mode=""
						@tap="collect_follow"></image>
					<image src="/static/Gather/i3.png" v-else class="icon" mode="" @tap="collect_follow"></image>
					<u-icon name="share-fill" color="#000" style="margin-left: 8rpx;" size="25" @tap="openshare()"></u-icon>	
				</view> -->
			</view>
		</view>
		<view class="" v-if="loading == 4">
			<!-- 图片信息 -->
			<view class="img-box">
				<collectimg :imgInfo="imgInfo"></collectimg>
			</view>
			<!-- 标题信息 -->
			<!-- <view class="a">
				<view class="a_a"> <text>￥</text> {{info.price}}</view>
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
			<!-- <view class="b">
				<view class="b_box">
					<view class="b_l" @tap="toredirect('gather/collect/brand?brand_id='+info.brand.id)">
						<view class="b_a">品牌方</view>
						<view class="b_b">
							<u-avatar v-if="info.brand.headInfo" :src="info.brand.headInfo.show_src" mode="aspectFit"
								class="b_b_a"></u-avatar>
							<view class="u-line-1">{{info.brand.name}}</view>
							<image mode="widthFix" src="@/static/left.png" class="b_b_b"></image>
						</view>
					</view>
					<view class="b_l" @tap="topage('gather/collect/author?author_id='+info.author.id)">
						<view class="b_a">创作者</view>
						<view class="b_b">
							<u-avatar v-if="info.author.avatars" :src="info.author.avatars.show_src" mode="scaleToFill"
								class="b_b_a"></u-avatar>
							<view class="u-line-1">{{info.author.nickname}}</view>
							<image mode="widthFix" src="@/static/left.png" class="b_b_b"></image>
						</view>
					</view>
				</view>
			</view> -->
			<!-- <view class="c">
				<view class="c_box">
					<view class="c_a">
						<view>所属专辑</view>
						<view>{{ info.album.name }}</view>
					</view>
					<view class="c_a">
						<view>合约地址</view>
						<view>
							{{hash(info.hash)}}
							<image src="/static/else/coty2." mode="widthFix" @tap="copy(info.hash)"></image>
						</view>

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

				<view class="message">
					<view class="message_item flex-between">
						<view class="key">品牌方</view>
						<view class="value">{{info.brand.name}}</view>
					</view>
					<u-line color="#EBEBEB"></u-line>
					<view class="message_item flex-between">
						<view class="key">创作者</view>
						<view class="value">{{info.author.nickname}}</view>
					</view>
					<u-line color="#EBEBEB"></u-line>
					<view class="message_item flex-between">
						<view class="key">卡牌专辑</view>
						<view class="value">{{ info.album.name }}</view>
					</view>
				</view>

				<!-- 卡牌描述 -->
				<block v-if="info.content">
					<u-divider text="卡片详情"></u-divider>
					<view class="rich-box">
						<!-- <view class="title flex-start">卡牌描述</view> -->
						<view class="u-content">
							<u-parse :content="info.content"></u-parse>
						</view>
					</view>
				</block>

				<block v-if="richText">
					<!-- 购买须知 -->
					<u-divider text="购买须知"></u-divider>
					<view class="buy-desc">
						<view class="desc">
							<u-parse :content="richText" :tagStyle="{span:'white-space:normal'}"></u-parse>
						</view>
					</view>
				</block>


			</view>






			<view class="lian-box flex-center">
				<image :src="appInfo.hash_qrcode" class="icon" mode="widthFix"></image>
			</view>

			<!-- 购买 -->
			<view class="buy-box flex-between" id="buy-box">
				<!-- <view class="price-box"> <text>￥</text> {{ info.price>0?info.price:'' }}</view> -->
				<view class="flex-end">
					<!-- <view class="buy-btn flex-center" @tap="popupshow=true" v-if="info.timeInfo.is_time == 2&&info.stock>0">批量购买</view> -->
					<view class="buy-btn flex-center" @tap="createorder()" v-if="info.timeInfo.is_time == 2">立即购买</view>
				</view>
				<!-- <view class="buy-btn buy-btn-gray flex-center" v-if="info.timeInfo.is_time == 2">已售罄</view> -->
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

		<iloading :result="loading"></iloading>

		<!-- 提示实名 -->
		<open_realname ref="open_realname"></open_realname>
		<!-- 提示开户 -->
		<open_account ref="open_account"></open_account>

		<u-popup :show="popupshow" @close="close" round="18" @open="open" :closeable="true" mode="center">
			<view class="popup-box">
				<view class="title flex-center"></view>
				<view class="form-box">
					<view class="i-box flex-between">
						<view class="i-label">购买数量</view>
						<view class="i-input flex-end">
							<u-number-box button-size="36" :max="info.buy_num" color="#ffffff" bgColor="#b9b9b9"
								iconStyle="color: #fff" v-model="number" :min="1"></u-number-box>
						</view>
					</view>
					<view class="btn flex-center" style="margin-top: 32rpx;" @tap="createorder">确定</view>
				</view>
			</view>
		</u-popup>

		<view class="share-box" v-if="showshare">
			<share ref="share" @close="closeshare" :share_bg="info.img.show_src" :qrcode="qrcode"></share>
		</view>

		<address-popup ref="addressPopup" @buy="material_object_buy"></address-popup>

	</view>
</template>

<script>
	import share from './components/share.vue';
	import QR from "@/basic_toys/getQrcode.js";
	import collectimg from './components/collectImg.vue';
	import addressPopup from '@/components/addressPopup.vue'
	export default {
		components: {
			collectimg,
			share,
			addressPopup
		},
		data() {
			return {
				popupshow: false,
				info: {},
				id: '',
				loading: 1,
				bg_style: {},
				imgInfo: {
					img: '',
					mode_type: '', //1 大图 2 小图 3 视频
					max_img: '',
					min_img: '',
					table_img: ''
				},
				content: '',
				timeData: {},
				number: 1,
				showshare: false,
				qrcode: "",
				system: {},
				time: null,
				count: 1,
				richText: "",
				address: {},
			};
		},
		onLoad(query) {
			this.id = query.id;
			this.collect_getDetail();
			this.public_getPactInfo();
			this.system = uni.getSystemInfoSync();
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			appInfo() {
				return this.$store.getters.get_appInfo;
			}
		},
		mounted() {
			this.setnavbar();
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
			openshare() {
				this.showshare = true;
				this.$nextTick(() => {
					this.$refs.share.create_share();
				})
			},
			closeshare() {
				this.showshare = false;
			},
			set_jscode() {
				let img = QR.createQrCodeImg(uni.conf.baseUrl + '#/pages/general/register/index?user_code=' + this
					.user_info
					.user_code + "&pool_id=" + this.info.id, {
						size: parseInt(300) //二维码大小
					});
				this.qrcode = img;
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
			async collect_getDetail() {
				let res = await uni.ajax.collect_getDetail({
					id: this.id
				});
				if (res) {
					this.info = res.data;
					this.info.timeInfo = uni.utils.FormDataEndTime(this.info.start_time, this.info.end_time);
					// this.number=res.data.buy_num;
					this.set_imginfo();
					// #ifdef APP-PLUS
					await uni.utils.sleep(200);
					// #endif
					this.loading = 4;

				} else {
					this.loading = 3;
				}
			},
			pre_createorder() {
				if (this.user_info.cert_id <= 0) { //提示实名弹框
					this.$refs.open_realname.open();
					return false;
				}
				if (this.user_info.is_open != 1 && uni.is_online) { //开户弹框
					this.$refs.open_account.open();
					return false;
				}

				this.open();
			},
			async createorder() {
				//确认订单
				if (this.count != 1) {
					return false;
				}

				if (this.info.virtual == 1) {
					// 实体
					// 判断有无收货地址
					if (JSON.stringify(this.address) == '{}') {
						this.$refs.addressPopup.open()
					}

				} else {
					uni.showLoading({
						title: "下单中..."
					})
					// 虚拟
					let res = await uni.ajax.collect_buy({
						id: this.info.id,
						num: this.number
					});

					if (res) {
						if (this.number >= 1) {
							this.close();
						}
						this.time_fn();
					} else {
						uni.hideLoading();
					}
				}

			},
			time_fn() {

				uni.showLoading({
					title: "下单中"
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
							this.toredirect('gather/wallet/collectpay?buy_type=1&is_mark=1&number=' + this
								.number);
						}
					});
				}
			},
			async collect_follow() {
				let res = await uni.ajax.collect_follow({
					goods_id: this.id,
					buy_type: 1
				});
				if (res) {
					this.info.is_follow_count = this.info.is_follow_count == 1 ? 0 : 1;
				}
			},
			async set_imginfo() {
				//设置图片展现形式
				if (this.info.mode_type == 2) {
					if (this.info.back) {
						this.info.back.height = parseFloat(uni.utils.set_imgh(this.info.back.width, this.info.back
							.height, this.system.windowWidth)).toFixed(2);
					}
					this.imgInfo = {
						img: this.info.img.show_src,
						mode_type: this.info.mode_type,
						table_img: this.info.tableImg.show_src,
						bg_img: this.info.back ? this.info.back : ''
					};
				}
				if (this.info.mode_type == 1 || this.info.mode_type == 3) {
					let imgheight = parseFloat(uni.utils.set_imgh(this.info.img.width, this.info.img.height, this
						.system.windowWidth)).toFixed(2) + 'px';
					this.imgInfo = {
						img: this.info.img.show_src,
						mode_type: this.info.mode_type,
						height: imgheight
					};
				}
			},
			async setnavbar() {
				let header = await uni.utils.info_distance('header');

				this.bg_style = {
					'padding-top': header.height + 'px',
				};
			},
			// 实物购买
			async material_object_buy(e) {
				console.log(e)
				let result = await uni.ajax.shop_addOrder({
					id: this.info.id,
					address_id: e.id,
					num: this.number
				});
				console.log(result)
				if (result) {
					uni.setStorage({
						key: 'collect_payinfo',
						data: this.info,
						success: () => {
							this.toredirect('gather/wallet/collectpay?buy_type=1&is_mark=1&number=' + this
								.number + '&virtual=' + this.info.virtual); // virtual  1=>实物   2=>虚拟
						}
					});
				}

			}
		}
	};
</script>
<style>
	page {
		/* background: #fff; */
	}
</style>
<style lang="scss">
	.c {
		margin-top: 30rpx;
		padding: 0 32rpx;

		.c_box {
			border: 1px solid #ddd;
			border-radius: 20px;
			padding: 0 32rpx;
		}

		.c_a {
			padding: 26rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			view:nth-child(1) {
				color: #434343;
				font-size: 28rpx;
			}

			view:nth-child(2) {
				color: #000;
				font-size: 30rpx;

				image {
					width: 28rpx;
					margin-left: 8rpx;
				}
			}
		}
	}

	.b {
		margin-top: 130rpx;
		padding: 0 32rpx;

		.b_box {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}

		.b_l {
			width: 49%;
			padding: 16rpx 24rpx;
			border: 1px solid #ddd;
			border-radius: 20px;
			box-sizing: border-box;

			.b_a {
				color: #434343;
				font-weight: 600;
				font-size: 32rpx;
			}

			.b_b {
				margin-top: 12rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.b_b_a {
					border: 1px solid rgba(0, 0, 0, 0.1);
					width: 76rpx;
					height: 76rpx;
					border-radius: 50%;
				}

				.b_b_b {
					width: 24rpx;
					transform: rotateZ(180deg);
				}

				view {
					color: #434343;
					font-size: 28rpx;
					max-width: 128rpx;
				}
			}
		}
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
			letter-spacing: 2px;
			font-size: 56rpx;
			font-weight: 500;
			color: #fff;
			padding: 12rpx 0 12rpx 48rpx;

			text {
				font-size: 22px;
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

	.collectdeatils {
		padding-bottom: 130rpx;

		.share-box {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;
			background: rgba(0, 0, 0, 0.5);
		}

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
				font-size: 56rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;

				text {
					font-size: 36rpx;
				}
			}

			.buy-btn {
				width: 686rpx;
				// padding: 0rpx 32rpx;
				border-radius: 8rpx;
				// margin-left: 16rpx;
				height: 96rpx;
				// background: url("@/static/else/old01.png") no-repeat 100%;
				background: var(--linear-gradient-theme);
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				box-shadow: var(---btn-shadow);
			}

			.buy-btn-gray {
				background: #ccc
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
			margin-top: 24rpx;
			padding: 0rpx 32rpx;
			background: #ffffff;

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

				.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 100%;
					margin-right: 4rpx;
				}

				.t2 {
					width: calc(100% - 150rpx);
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: bold;
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
				font-size: 48rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #000000;
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

			padding: 0rpx 24rpx;
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

		.message {
			border-radius: 12rpx;
			background-color: #fff;
			padding: 0 32rpx;
			margin-bottom: 24rpx;

			.message_item {
				height: 88rpx;

				.key {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;
				}

				.value {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
</style>