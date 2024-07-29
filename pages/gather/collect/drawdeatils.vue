<template>
	<view class="collectdeatils" :style="bg_style">
		<view class="header " id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="navbar flex-between">
				<u-icon name="arrow-left" :bold="true" size="25" @tap="toback"></u-icon>
				<view class="title">{{ loading == 4 ? info.title : '详情' }}</view>
				<view class="icon-box flex-end">
					<image src="/static/Gather/i4.png" v-if="info.is_follow_count == 1" class="icon" mode=""
						@tap="collect_follow"></image>
					<image src="/static/Gather/i3.png" v-else class="icon" mode="" @tap="collect_follow"></image>
					<!-- <u-icon name="share-fill" color="#000" style="margin-left: 8rpx;" size="25"
						@tap="openshare()"></u-icon> -->
				</view>
			</view>
		</view>
		<view class="" v-if="loading == 4">
			<!-- 图片信息 -->
			<view class="img-box">
				<collectimg :imgInfo="imgInfo"></collectimg>
			</view>
			<!-- 标题信息 -->
			<view class="title-box">
				<view class="title">{{ info.title }}</view>
				<view class="a_b_b">
					<view class="f_b">
						<view>数量</view>
						<view>{{ info.num }}份</view>
					</view>
					<view class="f_b">
						<view>人数</view>
						<view>{{ info.draw_count }}人</view>
					</view>
				</view>
			</view>

			<!-- 专辑信息 -->
			<view class="album-box">
				<view class="title flex-start">专辑信息</view>
				<view class="album-desc flex-start">
					<text class="t1">所属专辑</text>
					<view class="flex-start t2">
						<text>{{ info.album.title }}</text>
					</view>
				</view>

				<!-- <view class="album-desc flex-start">
					<text class="t1">合约地址</text>
					<view class="flex-start t2">
						<text>0x0FD5D01D51F0522164dsaf</text>
						<image src="/static/else/copy.png" class="copy" mode=""></image>
					</view>
				</view> -->
				<view class="album-desc flex-start">
					<text class="t1">抽签时间</text>
					<view class="flex-start t2">
						<text>{{info.draw_start_time}}</text>
					</view>
				</view>
				<view class="album-desc flex-start">
					<text class="t1">结束时间</text>
					<view class="flex-start t2">
						<text>{{info.draw_end_time}}</text>
					</view>
				</view>
				<view class="album-desc flex-start">
					<text class="t1">开签时间</text>
					<view class="flex-start t2">
						<text>{{info.open_time}}</text>
					</view>
				</view>
				<view class="album-desc flex-start">
					<text class="t1">购买时间</text>
					<view class="flex-start t2">
						<text>{{info.start_time}}</text>
					</view>
				</view>
				<view class="album-desc flex-start">
					<text class="t1">品牌方</text>
					<view class="flex-between t2">
						<text>{{info.brand.name}}</text>
						<view class="flex-end" @tap="topage('gather/collect/brand?brand_id='+info.brand.id)">
							<!-- <text class="t3">品牌方主页</text> -->
							<image :src="info.brand.headInfo.show_src" class="avatar" mode=""></image>
							<u-icon name="arrow-right" size="20" color="#999999"></u-icon>
						</view>
					</view>
				</view>
				<view class="album-desc flex-start" @tap="topage('gather/collect/author?author_id='+info.author.id)">
					<text class="t1">创作者</text>
					<view class="flex-between t2">
						<text>{{info.author.nickname}}</text>
						<view class="flex-end">
							<!-- <text class="t3">Ta的主页</text> -->
							<image :src="info.author.avatars.show_src" class="avatar" mode=""></image>
							<u-icon name="arrow-right" size="20" color="#999999"></u-icon>
						</view>
					</view>
				</view>
			</view>

			<!-- 卡牌描述 -->

			<view class="rich-box">
				<view class="title flex-start">卡牌描述</view>
				<view class="u-content">
					<u-parse :content="info.content"></u-parse>
				</view>
			</view>

			<!-- 购买须知 -->
			<view class="buy-desc">
				<view class="title flex-start">购买须知</view>
				<view class="desc">
					<u-parse :content="richText" :tagStyle="{span:'white-space:normal'}"></u-parse>
				</view>
			</view>

			<view class="lian-box flex-center">
				<image :src="appInfo.hash_qrcode" class="icon" mode="widthFix"></image>
			</view>

			<!-- 购买 -->
			<view class="buy-box flex-between" id="buy-box">
				<view class="price-box">{{ info.price>0?'￥'+info.price:'' }}</view>
				<view class="flex-end">
					<!-- <view class="buy-btn flex-center" @tap="popupshow=true" v-if="info.timeInfo.is_time == 2&&info.stock>0">批量购买</view> -->
					<view class="buy-btn flex-center" @tap="createorder()"
						v-if="info.timeInfo.is_time == 2&&info.stock>0">立即购买</view>

					<view class="buy-btn flex-center" @tap="collect_draw()"
						v-if="info.timeInfo.is_time == 4&&info.is_draw_count<=0">立即抽签</view>

					<view class="buy-btn flex-center"
						v-if="info.timeInfo.is_time == 4&&info.is_draw_count>=1&&info.open_type==2">待开签</view>

					<view class="buy-btn flex-center"
						v-if="info.is_draw_count>=1&&info.open_type==1&&info.user_draw==1">已中签</view>
				</view>
				<view class="buy-btn buy-btn-gray flex-center" v-if="info.timeInfo.is_time == 2&&info.stock<=0">已售罄
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

		<iloading :result="loading"></iloading>

		<!-- 提示实名 -->
		<open_realname ref="open_realname"></open_realname>
		<!-- 提示开户 -->
		<open_account ref="open_account"></open_account>

		<u-popup :show="popupshow" @close="close" round="18" @open="open" :closeable="true" mode="center">
			<view class="popup-box">
				<view class="title flex-center">批量下单</view>
				<view class="form-box">
					<view class="i-box flex-between">
						<view class="i-label">下单数量</view>
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

		<view class="share-box" v-if="showshare">
			<share ref="share" @close="closeshare" :share_bg="info.img.show_src" :qrcode="qrcode"></share>
		</view>

	</view>
</template>

<script>
	import share from './components/share.vue';
	import QR from "@/basic_toys/getQrcode.js";
	import collectimg from './components/collectImg.vue';
	export default {
		components: {
			collectimg,
			share
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
				richText: ""
			};
		},
		onLoad(query) {
			this.id = query.id;
			this.collect_getDetail();
			this.public_getPactInfo();
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			appInfo() {
				return this.$store.getters.get_appInfo;
			}
		},
		async mounted() {
			this.system = await uni.pro.getSystemInfo();
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
				let img = QR.createQrCodeImg(uni.conf.baseUrl + '#/pages/general/register/index?user_code=' + this.user_info
					.user_code, {
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
				let now_time = new Date().getTime();
				let draw_end_time = new Date(this.info.draw_end_time.replace(/-/g, '/')).getTime();
				if (draw_end_time < now_time) {
					this.info.timeInfo.is_time = 2;
				} else {
					this.set_time();
				}
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
					this.set_time();
					this.set_imginfo();
					this.loading = 4;
					this.$nextTick(() => {
						this.setnavbar();
					});
				} else {
					this.loading = 3;
				}
			},
			set_time() { //计算抽签倒计时
				let now_time = new Date().getTime();
				let start_time = new Date(this.info.start_time.replace(/-/g, '/')).getTime();
				let draw_start_time = new Date(this.info.draw_start_time.replace(/-/g, '/')).getTime();
				let draw_end_time = new Date(this.info.draw_end_time.replace(/-/g, '/')).getTime();
				if (draw_start_time > now_time) { //未开始抽签
					this.info.timeInfo = {
						timestamp: draw_start_time - now_time,
						is_time: 1
					};
					return false;
				}
				if (draw_end_time > now_time && draw_start_time <= now_time) { //抽签中
					this.info.timeInfo = {
						timestamp: draw_start_time - now_time,
						is_time: 4
					};
					return false;
				}

				this.info.timeInfo = uni.utils.FormDataEndTime(this.info.start_time, this.info.end_time);
			},
			async collect_draw() {
				if (this.user_info.cert_id <= 0) { //提示实名弹框
					this.$refs.open_realname.open();
					return false;
				}
				if (this.user_info.is_open != 1 && uni.is_online) {
					this.$refs.open_account.open();
					return false;
				}
				let res = await uni.ajax.collect_draw({
					id: this.info.id
				});
				if (res) {
					this.info.is_draw_count = 1;
					this.info.draw_count += 1;
				}
			},
			async createorder() {
				if (this.user_info.cert_id <= 0) { //提示实名弹框
					this.$refs.open_realname.open();
					return false;
				}
				//确认订单
				let res = await uni.ajax.collect_buy({
					id: this.info.id,
					num: this.number
				});
				if (res) {
					if (this.number > 1) {
						this.close();
					}
					this.time_fn();
				} else {
					uni.hideLoading();
				}
			},
			time_fn() {
				this.collect_getStayPayOrderInfo();
				this.time = setInterval(() => {
					if (this.count < 10) {
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
							this.topage('gather/wallet/collectpay?buy_type=1&is_mark=1&number=' + this
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
				if (this.info.mode_type == 1) {
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
				let buybox = await uni.utils.info_distance('buy-box');
				this.bg_style = {
					'padding-top': header.height + 'px',
					'padding-bottom': buybox.height + 'px'
				};
			}
		}
	};
</script>

<style lang="scss">
	.collectdeatils {
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
				height: 100rpx;
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
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
			}

			.buy-btn {
				min-width: 152rpx;
				padding: 0rpx 32rpx;
				border-radius: 24rpx;
				margin-left: 16rpx;
				height: 96rpx;
				background: url("@/static/else/old01.png") no-repeat 100%;
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #ffffff;
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
			padding: 0rpx 32rpx;

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
				font-size: 48rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #000000;
			}

			.a_b_b {
				display: flex;
				align-items: center;
				padding: 10rpx 0rpx;

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

		.header {
			background-color: #fff;

			padding: 0rpx 32rpx;
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;
			background: url('@/static/else/old02.png') no-repeat center;
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
					color: #000000;
					width: 60%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					text-align: center;
				}
			}
		}
	}
</style>