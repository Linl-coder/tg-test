<template>
	<div class="task">
		<u-navbar leftText="返回" title="签到" :fixed="true" leftIconColor="#000" :titleStyle="{ color: '#000' }"
			:bgColor="navbar_bg" :autoBack="true"></u-navbar>
		<image src="/static/bg.png" class="bg_top" mode="widthFix"></image>

		<div class="header flex-between	">
			<div class="info">
				<div class="t_box">
					<text class="t1">{{ user_info.integral||100 }}</text>
					<text class="t2">积分</text>
				</div>
				<text class="t3">当前可用积分</text>
				<div class="t_btn flex-center" @tap="href('market/Integralbills?integral=100')">积分明细</div>
			</div>
			<image src="/static/General/i34.png" class="icon" mode=""></image>
		</div>

		<div class="content">
			<div class="card">
				<div class="card_title flex-colum-start">
					<div class="flex-start">
						<text class="t1">签到进度{{ user_info.signDay ? user_info.signDay : '0' }}/7天</text>
					</div>
				</div>
				<div class="card_box flex-between">
					<div class="card_item flex-colum" v-show="index <= 5" @tap="signIn(index)"
						:class="{ 'card_item_active': user_info.signDay >= index + 1 }"
						v-for="(item, index) in sign_list" :key="index">
						<text class="t1">第{{ index + 1 }}天</text>
						<image src="/static/General/i36.png" class="icon" mode=""></image>
						<text class="t2">{{ item.score }}积分</text>
						<image src="/static/shop/i17.png" v-show="user_info.signDay >= index + 1 " class="ok" mode="">
						</image>
					</div>

					<div class="card_end " v-if="sign_list.length > 0">
						<text class="t">第7天</text>
						<text class="t2">神秘大礼包</text>
						<text class="t1">{{ sign_list[6].day }}积分</text>
						<image src="/static/General/i35.png" class="icon" mode=""></image>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card_title flex-colum-start">
					<div class="flex-start">
						<text class="t1">日常任务</text>
						<!-- <image src="/static/index/i22.png" class="icon" mode=""></image> -->
					</div>
					<!-- <text class="t2">做任务获取积分</text> -->
				</div>
				<div class="card_list flex-between" v-for="(item, index) in task_list" :key="index">
					<div class="card_left flex-start">
						<div class="icon_box flex-center">
							<image :src="item.icon" class="icon" mode=""></image>
						</div>
						<div class="flex-colum-start">
							<text class="t">{{ item.name }}</text>
							<text class="t1">{{ item.desc }}</text>
						</div>
					</div>
					<div class="btn flex-center" @tap="href(item.src)"><text class="t">去完成</text></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				task_list: [{
						name: '邀请好友',
						desc: '这是一段任务简介，这是一段任务...',
						icon: '/static/General/i37.png',
						src: 'index/invitation'
					},
					{
						name: '积分抽奖',
						desc: '这是一段任务简介，这是一段任务...',
						icon: '/static/General/i38.png',
						src: 'gather/lottery'
					},
					{
						name: '其他任务',
						desc: '这是一段任务简介，这是一段任务...',
						icon: '/static/General/i39.png',
						src: 'index/hot_active'
					}
				],
				result: 1,
				page: 1,
				sign_list: [{
						score: 10
					},
					{
						score: 10
					},
					{
						score: 10
					},
					{
						score: 10
					},
					{
						score: 10
					},
					{
						score: 10
					},
					{
						score: 10
					}
				],
				sign_count: 0,
				navbar_bg: 'transparent'
			};
		},
		onLoad() {
			this.getUserIsSign();
			this.get_user_info();
		},
		onPageScroll(e) {
			if (e.scrollTop < 50) {
				this.navbar_bg = 'transparent';
			} else {
				this.navbar_bg = '#fff';
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		methods: {
			async getUserIsSign() {
				let res = await uni.ajax.getData({
					name: 'sign'
				});
				if (res) {
					let index = 1;
					for (let key in res) {
						if (key == "day" + index) {
							index = index + 1;
							let obj = {
								day: res[key]
							};
							this.sign_list.push(obj);
						}

					}
				}
			},
			async get_user_info() {
				//获取个人信息
				let res = await uni.ajax.get_user_info();
				if (res) {
					uni.setStorageSync('user_info', res);
					this.$store.commit('set_user_info', res);
				}
			},
			to_task(item) {
				uni.setStorage({
					key: 'task_details',
					data: item,
					success: () => {
						this.href('index/task_details?id=' + item.id);
					}
				});
			},
			change_tab(e) {
				this.current = e.index;
			},
			async signIn(index) {
				let res = await uni.ajax.signIn();
				if (res) {
					let obj = this.sign_list[this.user_info.signDay];
					uni.set_userInfo({
						integral: Number(this.user_info.integral) + Number(obj.day),
						signDay: Number(this.user_info.signDay) + 1
					});

				}
			},
			async commitUserTask() {
				let res = await uni.ajax.taskInfo({
					page: this.page,
					limit: 100,
					type: 2
				});
				if (res) {
					this.ip_list = res;
					this.result = uni.utils.loading_result(this.page, res);
				} else {
					this.result = 3;
				}
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.task {
		/* #ifdef H5 */
		padding-top: 88rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		padding-top: 160rpx;

		/* #endif */
		.header {
			// background: url('@/static/bg.png') no-repeat;
			z-index: 10;
			position: relative;
			height: 360rpx;
			width: 100%;
			background-size: 100%;
			padding: 32rpx 32rpx 0rpx 32rpx;
			box-sizing: border-box;

			.info {
				position: relative;
				z-index: 2;
				flex: 1;

				.t1 {
					font-size: 80rpx;
					font-family: Tahoma-Bold, Tahoma;
					font-weight: bold;
					color: #000000;
					line-height: 94rpx;
				}

				.t2 {
					font-size: 28rpx;
				}

				.t3 {
					font-size: 22rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 26rpx;
				}

				.t_btn {
					width: 180rpx;
					height: 72rpx;
					border-radius: 50rpx;
					background: #0092f5;
					font-size: 28rpx;
					color: #fff;
					margin-top: 16rpx;
				}
			}

			.icon {
				width: 420rpx;
				height: 360rpx;
				right: 0rpx;
				position: absolute;
			}
		}

		/deep/.u-count-down__text {
			color: #fff;
			font-size: 26rpx;
		}

		.tab {
			border-bottom: 1rpx solid #141414;
		}

		.banner_box {
			position: absolute;

			.icon {
				width: 100%;
				height: 186rpx;
			}
		}

		.content {
			padding: 24rpx 32rpx;

			.ip_box {
				margin-bottom: 24rpx;
				position: relative;
				width: 686rpx;
				height: 336rpx;
				border-radius: 24rpx;
				overflow: hidden;

				.tips {
					position: absolute;
					right: 16rpx;
					top: 16rpx;
					height: 44rpx;
					background: rgba(0, 0, 0, 0.5);
					border-radius: 16rpx;
					padding: 0rpx 16rpx;

					.t {
						font-size: 22rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #ffffff;
						line-height: 26rpx;
					}
				}

				.info {
					position: absolute;
					bottom: 0rpx;
					height: 120rpx;
					width: 100%;
					padding: 0rpx 32rpx;
					box-sizing: border-box;
					background: rgba(0, 0, 0, 0.5);

					.infoleft {
						flex: 1;
						position: relative;

						.avatar {
							width: 88rpx;
							height: 88rpx;
							border-radius: 100%;
						}

						.t {
							font-size: 28rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: bold;
							color: #ffffff;
							line-height: 33rpx;
						}

						.t1 {
							font-size: 22rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #ffffff;
							line-height: 26rpx;
							margin-top: 8rpx;
						}

						.line_ {
							position: absolute;
							width: 40%;
							left: 42%;
							bottom: 15%;
						}
					}

					.right {
						.t {
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #ffffff;
							line-height: 28rpx;
						}
					}
				}

				.bg {
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0rpx;
					top: 0rpx;
				}
			}

			.card {
				margin-bottom: 24rpx;
				height: 524rpx;
				background: #ffffff;
				box-shadow: 0px 2rpx 24rpx 0px rgba(0, 0, 0, 0.04);
				border-radius: 24rpx;
				padding: 0rpx 32rpx 0rpx 32rpx;
				box-sizing: border-box;

				.card_box {
					.card_end {
						margin: 10rpx 0rpx;
						width: 308rpx;
						height: 172rpx;
						background: #e6e6e6;
						border-radius: 32rpx;
						position: relative;

						.t {
							font-size: 28rpx;
							font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 600;
							color: #000;
							line-height: 33rpx;
							position: absolute;
							left: 24rpx;
							top: 24rpx;
						}

						.t1 {
							font-size: 32rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: bold;
							color: #000;
							line-height: 28rpx;
							position: absolute;
							left: 24rpx;
							bottom: 24rpx;
						}

						.t2 {
							font-size: 22rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #000;
							line-height: 28rpx;
							position: absolute;
							left: 24rpx;
							top: 58rpx;
						}

						.icon {
							width: 114rpx;
							height: 118rpx;
							position: absolute;
							right: 24rpx;
							bottom: 12rpx;
						}
					}

					.card_item {
						margin: 10rpx 0rpx;
						width: 144rpx;
						height: 172rpx;
						border-radius: 24rpx;
						background: #e6e6e6;
						position: relative;

						.ok {
							position: absolute;
							width: 40rpx;
							height: 40rpx;
							right: -10rpx;
							top: -10rpx;
						}

						.t1 {
							font-size: 24rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 500;
							color: #000;
							line-height: 28rpx;
						}

						.icon {
							width: 50rpx;
							height: 58rpx;
							margin: 10rpx 0rpx;
						}

						.t2 {
							font-size: 24rpx;
							font-family: Tahoma-Bold, Tahoma;
							font-weight: bold;
							color: #000;
							line-height: 28rpx;
						}
					}

					.card_item_active {
						background: #0092f5;

						.t1,
						.t2 {
							color: #FFFFFF;
						}
					}
				}

				.card_title {
					height: 120rpx;

					.t1 {
						font-size: 32rpx;
						font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 600;
						color: #000;
						margin-bottom: 8rpx;
					}

					.icon {
						margin-left: 8rpx;
						width: 34rpx;
						height: 34rpx;
					}

					.t2 {
						font-size: 24rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}

				.card_list {
					height: 125rpx;
					// border-bottom: 2rpx solid #F0F0F0;

					.card_left {
						.t {
							font-size: 28rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: bold;
							color: #000;
							margin-bottom: 8rpx;
						}

						.t1 {
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}

						.icon_box {
							box-sizing: border-box;
							width: 70rpx;
							height: 70rpx;
							border-radius: 100%;
							margin-right: 24rpx;

							.icon {
								width: 70rpx;
								height: 70rpx;
							}
						}

						.icon_box1 {
							background: #fdf3bd;
						}

						.icon_box2 {
							background: #dfedfa;
						}
					}

					.btn {
						width: 124rpx;
						height: 58rpx;
						background: #df1717;
						border-radius: 92rpx;
						opacity: 1;

						.t {
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #fff;
						}
					}
				}

				.card_list:last-child {
					border: 0rpx;
				}
			}
		}
	}
</style>