<template>
	<view class="iMenu" :style="{background: bgColor}">
		<!-- 格子2 -->
		<view class="card-box">
			<view class="x" v-if="type == 1">
				<view v-if="title" class="menu_title">
					<view class="title_">{{title}}</view>
					<u-icon v-if="moreText" name="arrow-right" :label="moreText" label-color="#999" label-size="28rpx"
						label-pos="left" size="28rpx" @click="topage(moreUrl)"></u-icon>
				</view>
				<u-grid :col="col" :border="false">
					<u-grid-item v-for="(item,index) in list" :key="index" style="margin-bottom: 40rpx;">
						<u-icon :name="item.icon" :label="item.title" :width="$u.addUnit(iconSize)"
							:height="$u.addUnit(iconSize)" label-pos="bottom" :space="$u.addUnit(space)"
							:label-color="textColor" :label-size="$u.addUnit(textSize)" @tap="click(item)"></u-icon>
					</u-grid-item>
				</u-grid>
			</view>
			<view v-if="type == 3" class="a">
				<view class="a_list" v-for="(item, index) in list" @click="click(item)" :key="index">
					<view class="a_l">
						<view class="a_l_img">
							<image mode="" :src="item.icon"></image>
						</view>
						<view class="a_l_a">{{ item.title }}</view>
					</view>
					<u-icon name="arrow-right" size="12" color="#333"></u-icon>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list-box" v-if="type == 2">
			<view class="list flex-between" :style="liststyle" v-for="(item, index) in list" @click="click(item)"
				:key="index">
				<view class="left flex-start">
					<image class="icon" v-show="item.icon" :src="item.icon" mode=""></image>
					<text class="title">{{ item.title }}</text>
				</view>
				<u-icon name="arrow-right" color="#000000" size="22"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * title  名称
	 * icon   图片
	 * link   跳转地址
	 * is_kfz    开发中
	 */
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			iconSize: {
				type: [Number, String],
				default: '32rpx'
			},
			textSize: {
				type: [Number, String],
				default: '28rpx'
			},
			// 图标与标题间距
			space: {
				type: [Number, String],
				default: '6rpx'
			},
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			type: {
				//菜单类型
				type: Number,
				default: 1
			},
			width: {
				type: String,
				default: '25%'
			},
			iconstyle: {
				type: Object,
				default () {
					return {};
				}
			},
			liststyle: {
				type: Object,
				default () {
					return {};
				}
			},
			moreText: {
				type: String,
				default: ''
			},
			moreUrl: {
				type: String,
				default: ''
			},
			col: {
				type: [String, Number],
				default: 4
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			textColor: {
				type: String,
				default: '#222'
			}
		},
		created() {
			if (this.type == 1 || this.type == 3) {
				// this.set_view();
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			is_login() {
				return this.$store.getters.is_login;
			}
		},
		methods: {
			set_view() {
				//自动补齐
				let num = null;
				switch (this.width) {
					case '25%':
						num = this.list.length % 4;
						break;
					case '20%':
						num = this.list.length % 5;
						break;
					default:
						break;
				}
				if (num == 0) return false;
				for (let i = 0; i < num; i++) {
					this.list.push({
						title: '',
						link: '',
						icon: '',
						kfz: false
					});
				}
			},
			click(item) {
				//console.log("item==>", item)
				if (item.kfz) {
					uni.showToast({
						title: '暂未开放',
						icon: 'none'
					});
					return false;
				}
				if (!this.is_login) {
					this.out_login();
					return false;
				}
				if (item.type == 'tab') {
					this.totab(item.link)
					return
				}
				if (item.type == 'authentication') {
					if (this.user_info.cert_id >= 1) {
						// 已认证
						this.topage('general/userinfo/authSuccess');
					} else {
						// 未认证
						this.topage('general/userinfo/certification');
					}
					return;
				}
				if (!item.link.includes('customer')) {
					this.topage(item.link);
				}
				this.$emit('click', item.link);

			},
			out_login() {
				uni.pro.clearLoginInfo();
				this.showmodal = false;
				uni.reLaunch({
					url: '/pages/general/login/index'
				});
			}
		}
	};
</script>

<style lang="scss">
	/deep/.u-icon__label {
		font-size: 24rpx !important;
	}

	/deep/.u-grid-item {
		text-align: center;
	}

	.x {
		padding: 32rpx 12rpx 0;

		/deep/.u-icon__label {
			height: 40rpx;
		}

		// display: flex;
		.menu_title {
			padding-bottom: 24rpx;
			padding-left: 16rpx;
			color: #191816;
			font-size: 32rpx;
			font-weight: 600;
			//font-family: PingFang SC-Semibold, PingFang SC;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.title_ {
				margin-right: auto;
				font-size: 32rpx;
				//font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #222222;
			}
		}

		// width: 100%;
		.x_list {
			// width: 24%;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.x_a {
				// width: 60%;
				border-radius: 30rpx;

				image {
					width: 88rpx;
					height: 88rpx;
				}
			}

			.x_b {
				font-size: 28rpx;
				color: #191816;
			}
		}
	}

	.iMenu {
		// background-color: #fff;
		border-radius: 24rpx;

		.card-box {
			.card-one {
				.card-one-box {
					width: 25%;

					.icon-box {
						margin-bottom: 20rpx;
						width: 84rpx;
						height: 84rpx;
						border-radius: 100%;

						.icon {
							width: 100%;
							height: 100%;
						}
					}

					.title {
						display: inline-block;
						width: 100%;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size: 28rpx;
						color: #000000;
						text-align: center;
					}
				}
			}

			.card-three {
				.card-one-box {
					width: 25%;
					margin: 24rpx 0rpx;

					.icon-box {
						margin-bottom: 16rpx;
						width: 60rpx;
						height: 60rpx;
						border-radius: 100%;
						background-color: #ffffff;

						.icon {
							width: 40rpx;
							height: 40rpx;
						}
					}

					.title {
						display: inline-block;
						width: 100%;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size: 28rpx;
						color: #000000;
						text-align: center;
					}
				}
			}
		}



		.list-box {
			overflow: hidden;

			.list {
				height: 100rpx;
				padding: 0rpx 30rpx;
				background-color: #ffffff;

				.icon {
					width: 40rpx;
					height: 40rpx;
				}

				.left {
					.title {
						font-size: 30rpx;
						margin-left: 15rpx;
					}
				}
			}
		}
	}

	.a {
		padding: 0 32rpx;

		.a_list {
			padding: 36rpx 0rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #f1f1f1;

			.a_l {
				display: flex;

				align-items: center;

				.a_l_a {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #0E0500;
					margin-left: 24rpx;
				}

				.a_l_img {
					width: 48rpx;
					height: 48rpx;

					image {
						width: 48rpx;
						height: 48rpx;
					}
				}

			}
		}
	}

	.b {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		height: 296rpx;

		.b_l {
			width: 49%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.b_r {
			width: 49%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;

			image {
				width: 100%;
				height: 49%;
			}
		}
	}
</style>