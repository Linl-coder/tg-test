<template>
	<view class="collectdeatils" :style="bg_style">
		<view class="header " id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="navbar flex-between">
				<u-icon name="arrow-left" :bold="true" color="#fff" size="25" @tap="toback"></u-icon>
				<view class="title" v-if="loading == 4">{{ info.pool.title }}</view>
				<!-- <view class="icon-box">
					<image src="/static/Gather/i4.png" v-if="info.is_follow_count == 1" class="icon" mode=""
						@tap="collect_follow"></image>
					<image src="/static/Gather/i3.png" v-else class="icon" mode="" @tap="collect_follow"></image>
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
					<view class="a_b_a">{{ info.pool.title }}</view>
					<view class="a_b_b">
						<view class="f_b">
							<view>限量</view>
							<view>{{ info.pool.num }}份</view>
						</view>
						<view class="f_b">
							<view>流通量</view>
							<view>{{ info.pool.circulate }}份</view>
						</view>
					</view>
				</view>
			</view> -->

			<!-- <view class="b" >
				<view class="b_box">
					<view class="b_l" @tap="toredirect('gather/collect/brand?brand_id='+info.pool.brand.id)">
						<view class="b_a">品牌方</view>
						<view class="b_b">
							<u-avatar :src="info.pool.brand.headInfo?info.pool.brand.headInfo.show_src:''" mode="aspectFit" class="b_b_a"></u-avatar>
							<view class="u-line-1">{{info.pool.brand.name}}</view>
							<image mode="widthFix" src="@/static/left.png" class="b_b_b"></image>
						</view>
					</view>
					<view class="b_l" @tap="topage('gather/collect/author?author_id='+info.pool.author.id)">
						<view class="b_a">创作者</view>
						<view class="b_b">
							<u-avatar  :src="info.pool.author.avatars?info.pool.author.avatars.show_src:''" mode="scaleToFill" class="b_b_a">
							</u-avatar >
							<view class="u-line-1">{{info.pool.author.nickname}}</view>
							<image mode="widthFix" src="@/static/left.png" class="b_b_b"></image>
						</view>
					</view>
				</view>
			</view> -->

			<!-- <view class="c">
				<view class="c_box">
					<view class="c_a">
						<view>卡牌编号</view>
						<view>#{{info.no}}/{{info.pool.num}}</view>
					</view>
					<view class="c_a">
						<view>所属专辑</view>
						<view>{{ info.pool.album.name }}</view>
					</view>
					<view class="c_a">
						<view>合约地址</view>
						<view>
							{{hash(info.hash)}}
							<image src="/static/else/coty2." mode="widthFix" @tap="copy(info.hash)"></image>
						</view>
					</view>
					<view class="c_a">
						<view>链上标识</view>
						<view>
							{{hash(info.nft_id)}}
							<image src="/static/else/coty2." mode="widthFix" @tap="copy(info.nft_id)"></image>
						</view>
					</view>
					<view class="c_a">
						<view>拥有者</view>
						<view>
							{{user_info.nickname}}						
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
						<view class="value">{{info.pool.brand.name}}</view>
					</view>
					<u-line color="#EBEBEB"></u-line>
					<view class="message_item flex-between">
						<view class="key">创作者</view>
						<view class="value">{{info.pool.author.nickname}}</view>
					</view>
					<u-line color="#EBEBEB"></u-line>
					<view class="message_item flex-between">
						<view class="key">卡牌专辑</view>
						<view class="value">{{info.pool.album.name}}</view>
					</view>
				</view>

				<!-- 卡牌描述 -->
				<block v-if="info.pool.content">
					<u-divider text="卡片详情"></u-divider>
					<view class="rich-box">
						<!-- <view class="title flex-start">卡牌描述</view> -->
						<view class="u-content">
							<u-parse :content="info.pool.content"></u-parse>
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
				<image :src="appInfo.hash_qrcode" class="icon" mode=""></image>
			</view>

			<view v-if="false" class="flex-between btn-group" id="btn-group">
				<view class="btn_item flex-center" @tap="to_giving()">
					<text class="t">转赠</text>
				</view>
				<view class="btn_item btn_item1 flex-center" @tap="to_consignment">
					<!-- <image src="/static/Gather/i44.png" mode="" class="icon"></image> -->
					<text class="t" v-show="info.status == 2">撤销</text>
					<text class="t" v-show="info.status == 1">寄售</text>
				</view>
				<!-- <view class="btn_item flex-center" @tap="href('market/certificate')">
					<image src="/static/Gather/i60.png" mode="" class="icon"></image>
					<text class="t">证书</text>
				</view> -->
			</view>
		</view>

		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	import collectimg from './components/collectImg.vue';
	export default {
		components: {
			collectimg
		},
		data() {
			return {
				certification_standard: getApp().globalData.certification_standard,
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
				system: {},
				richText: ''
			};
		},
		onLoad(query) {
			this.id = query.id;
			this.collect_getMyInfo();
			this.system = uni.getSystemInfoSync();
			this.public_getPactInfo()
		},
		mounted() {
			this.setnavbar();
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			appInfo() {
				return this.$store.getters.get_appInfo;
			}
		},
		methods: {
			async public_getPactInfo() {
				uni.ajax.public_getPactInfo({
					type: 6
				}).then(res => {
					this.richText = res.data
				})
			},
			to_giving() {
				let info = {
					id: this.info.id,
					pool_id: this.info.pool_id,
					name: this.info.pool.title,
					img: this.info.pool.img.show_src,
					buy_type: 1
				}
				uni.setStorage({
					key: 'giving_info',
					data: info,
					success: () => {
						this.topage('gather/giving');
					}
				});
			},
			to_consignment() {
				uni.setStorage({
					key: 'collect_consignment_info',
					data: this.info,
					success: () => {
						this.topage('gather/collect/consignment?buy_type=1');
					}
				});
			},
			async collect_getMyInfo() {
				let res = await uni.ajax.collect_getMyInfo({
					id: this.id
				});
				if (res) {
					this.info = res.data;
					this.set_imginfo();
					// #ifdef APP-PLUS
					await uni.utils.sleep(200);
					// #endif
					this.loading = 4;
				} else {
					this.loading = 3;
				}
			},
			async collect_follow() {
				let res = await uni.ajax.collect_follow({
					goods_id: this.info.pool.id,
					buy_type: 1
				});
				if (res) {
					this.info.is_follow_count = this.info.is_follow_count == 1 ? 0 : 1;
				}
			},
			async set_imginfo() {
				//设置图片展现形式	
				try {
					let imgheight = null;
					if (this.info.pool.mode_type == 1) {
						imgheight = parseFloat(uni.utils.set_imgh(this.info.pool.img.width, this.info.pool.img.height,
							this.system.windowWidth)).toFixed(2) + 'px';
					}
					this.imgInfo = {
						img: this.info.pool.img.show_src,
						mode_type: this.info.pool.mode_type,
						height: imgheight
					};
					if (this.info.pool.mode_type == 2) {
						if (this.info.pool.back) {
							this.info.pool.back.height = parseFloat(uni.utils.set_imgh(this.info.pool.back.width, this
								.info.pool.back.height, this.system.windowWidth)).toFixed(2);
						}
						this.imgInfo.table_img = this.info.pool.tableImg.show_src;
						this.imgInfo.bg_img = this.info.pool.back ? this.info.pool.back : ''
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			async setnavbar() {
				let header = await uni.utils.info_distance('header');
				this.bg_style = {
					'padding-top': header.height + 'px',
				};
			}
		}
	};
</script>

<style lang="scss">
	page {
		// background: #fff;
	}

	.c {
		margin-top: 32rpx;
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
				font-size: 16px;
			}
		}

		.a_b {
			border-radius: 40rpx;
			// background: url('/static/018.png') no-repeat;
			background-size: 100% 100%;
			height: 200rpx;

			.a_b_a {
				font-size: 42rpx;
				color: #000;
				padding: 40rpx 0 20rpx 32rpx;
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

		.btn-group {
			width: 100%;
			position: fixed;
			left: 0rpx;
			bottom: 0rpx;
			background: #ffffff;
			height: 116rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.btn_item {
				flex: 1;
				padding: 0rpx 32rpx;
				border-radius: 24rpx;

				height: 96rpx;
				background: url("@/static/else/old01.png") no-repeat 100%;
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				border-radius: 96rpx;
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
			background-color: #fff;

			padding: 0rpx 32rpx;
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;
			// background: url('@/static/017.png') no-repeat;
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