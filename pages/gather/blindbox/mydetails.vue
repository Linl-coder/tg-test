<template>
	<view class="collectdeatils" :style="bg_style">
		<view class="header " id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="navbar flex-between">
				<u-icon name="arrow-left" :bold="true" color="#fff" size="25" @tap="toback"></u-icon>
				<view class="title" v-if="loading == 4">{{ info.box.title }}</view>
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
			<!-- <view class="title-box">
				<view class="title">{{ info.box.title }}</view>
				<view class="tips flex-start">
					<view class="tips-box flex-center">
						<view class="tips-left flex-center">限量</view>
						<view class="tips-right flex-center">{{ info.box.num }}</view>
					</view>
					<view class="tips-box flex-center">
						<view class="tips-left flex-center">流通</view>
						<view class="tips-right flex-center">{{ info.box.circulate }}</view>
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
				
					<!-- 盲盒描述 -->
				<block v-if="info.box.content">
						<u-divider text="盲盒详情"></u-divider>
					<view class="rich-box">
						<view class="u-content"><u-parse :content="info.box.content"></u-parse></view>
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

			<view class="lian-box flex-center">
				<image :src="appInfo.hash_qrcode" class="icon" mode=""></image>
			</view>

			<view class="flex-between btn-group" id="btn-group" v-show="info.status==1">
				<!-- <view class="btn_item flex-center" @tap="to_giving()">
					
					<text class="t">转赠</text>
				</view> -->
				<!-- <view class="btn_item btn_item1 flex-center" @tap="to_consignment">

					<text class="t" v-show="info.status == 2">撤销</text>
					<text class="t" v-show="info.status == 1">寄售</text>
				</view> -->
				<view class="btn_item flex-center" @tap="openBox">

					<text class="t">开盒</text>
				</view>
			</view>
		</view>

		<iloading :result="loading"></iloading>

		<!-- 开盒 -->
		<u-popup :show="openbox_show" mode="center">
			<view class="openbox" :style="openbox_style">
				<image src="/static/Gather/blindbox/mh.png" class="gif" mode=""></image>
			</view>
		</u-popup>

		<u-popup :show="show" mode="center" round="8" @close="show = false">
			<view class="flex-colum">
				<view style="border-radius: 16rpx 16rpx 0rpx 0rpx;overflow: hidden;">
					<u--image :showLoading="true" mode="widthFix" class="icon" :src="syninfo.cover" width="500rpx"
						height=""></u--image>
				</view>
				<text class="" style="margin: 36rpx 0rpx;">恭喜获得 {{ syninfo.title }}</text>
				<view class="btnsee flex-center" @tap="(show = false), toredirect('gather/collect/mycollect')">去查看
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import collectimg from '@/pages/gather/collect/components/collectImg.vue';
	export default {
		components: {
			collectimg
		},
		data() {
			return {
				syninfo: {},
				show: false,
				openbox_show: false,
				info: {},
				id: '',
				loading: 1,
				bg_style: {},
				openbox_style: {},
				imgInfo: {
					img: '',
					mode_type: '', //1 大图 2 小图 3 视频
					max_img: '',
					min_img: '',
					table_img: ''
				},
				content: '',
				richText:''
			};
		},
		onLoad(query) {
			this.id = query.id;
			this.collect_boxGetMyInfo();
			this.public_getPactInfo();
		},
		computed: {
			appInfo() {
				return this.$store.getters.get_appInfo;
			},
		},
		methods: {
			async public_getPactInfo(){
				uni.ajax.public_getPactInfo({
					type:6
				}).then(res=>{
					this.richText = res.data
				})
			},
			to_giving() { //转赠
				let info = {
					id: this.info.id,
					name: this.info.box.title,
					img: this.info.box.cover.show_src,
					buy_type: 2
				}
				uni.setStorage({
					key: 'giving_info',
					data: info,
					success: () => {
						this.topage('gather/giving');
					}
				});
			},
			to_consignment() { //寄售
				this.info.pool = this.info.box;
				uni.setStorage({
					key: 'collect_consignment_info',
					data: this.info,
					success: () => {
						this.topage('gather/collect/consignment?buy_type=2');
					}
				});
			},
			async collect_follow() {
				let res = await uni.ajax.collect_follow({
					goods_id: this.info.box.id,
					buy_type: 2
				});
				if (res) {
					this.info.is_follow_count = this.info.is_follow_count == 1 ? 0 : 1;
				}
			},
			async openBox() {
				this.openbox_show = true;
				let res = await uni.ajax.collect_openBox({
					id: this.info.id
				})
				if (res) {
					this.syninfo = res.data;
					await uni.utils.sleep(2000);
					this.openbox_show = false;
					this.show = true;
					this.info.status = 6;
				} else {
					await uni.utils.sleep(1000);
					this.openbox_show = false;
				}
			},
			async collect_boxGetMyInfo() {
				let res = await uni.ajax.collect_boxGetMyInfo({
					id: this.id
				});
				if (res) {
					this.info = res.data;
					this.set_imginfo();
					this.loading = 4;
					this.$nextTick(() => {
						this.setnavbar();
					});
				} else {
					this.loading = 3;
				}
			},

			async set_imginfo() {
				//设置图片展现形式
				let system = await uni.pro.getSystemInfo();
				let imgheight = parseFloat(uni.utils.set_imgh(this.info.box.cover.width, this.info.box.cover.height,
					system.windowWidth)).toFixed(2) + 'px';
				this.imgInfo = {
					img: this.info.box.cover.show_src,
					mode_type: 1,
					table_img: "",
					height: imgheight
				};
			},
			async setnavbar() {
				let header = await uni.utils.info_distance('header');
				let btn_group = await uni.utils.info_distance('btn-group');
				this.bg_style = {
					'padding-top': header.height + 'px',
					'padding-bottom': btn_group.height + 'px'
				};
				let system = await uni.pro.getSystemInfo();
				this.openbox_style = {
					'width': system.windowWidth + 'px',
					'height': system.windowHeight + 'px'
				}
			}
		}
	};
</script>

<style lang="scss">
	.collectdeatils {
		.openbox {
			position: relative;
			z-index: 100;
			background: rgba(0, 0, 0, 0.5);

			.gif {
				width: 100%;
				height: 100%;
			}
		}

		.btnsee {
			min-width: 320rpx;
			background: url('@/static/else/old01.png') no-repeat 100%;
			height: 88rpx;
			border-radius: 16rpx;
			box-sizing: border-box;
			color: #fdf6ec;
			margin-bottom: 24rpx;
		}

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
				margin: 0rpx 16rpx;
				box-sizing: border-box;
				height: 96rpx;
				// background: url('@/static/else/old01.png') no-repeat 100%;
				background: var(--linear-gradient-theme);
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #ffffff;
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
.img-box{
		background-color: #332B45;
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
			background-color: #332B45;

			padding: 0rpx 32rpx;
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;

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
	.content{
		padding: 24rpx 32rpx;
		.info{
			border-radius: 12rpx;
			background-color: #fff;
			padding: 32rpx;
			margin-bottom: 24rpx;
			.pri{
				margin-bottom: 12rpx;
				font-size: 20rpx;
				font-family: HarmonyOS Sans-Bold, HarmonyOS Sans;
				font-weight: bold;
				color: #222222;
				text{
					font-size: 32rpx;
					font-family: HarmonyOS Sans-Medium, HarmonyOS Sans;
					font-weight: bold;
				}
			}
			.remark{
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
		
			}
		}
	}
</style>