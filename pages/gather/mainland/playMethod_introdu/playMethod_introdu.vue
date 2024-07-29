<template>
	<view class="basic_wrap">
		<section>
			<view class="backImg">
				<view class="title bold color_w">
					<text>{{$t('playMthodIntro.tip1')}}</text>
				</view>

				<view class="content1 flex-colum-evenly">
					<p>{{$t('playMthodIntro.tip2')}}</p>
					<p class="bold color_w">{{$t('playMthodIntro.tip3')}}</p>
				</view>
				<view class="content2  flex-colum-between">
					<p @tap="totab('gather/mainland/index')">APE CARDX7</p>
					<p @click="toDetails(84, 0)">{{$t('mainland.buyNow')}}</p>
				</view>
			</view>
		</section>

		<view class="initial_content">
			<section>
				<li>{{$t('playMthodIntro.tip4')}}</li>
				<li>{{$t('playMthodIntro.tip5')}}</li>
			</section>
			<section>
				<li>{{$t('playMthodIntro.tip6')}}</li>
				<li>{{$t('playMthodIntro.tip7')}}</li>
				<li></li>
				<view class="">
					<table>
						<tr>
							<th>{{$t('playMthodIntro.tip8')}}</th>
							<!-- <th>代理可获收益</th> -->
							<th>{{$t('playMthodIntro.tip9')}}</th>
							<th>{{$t('playMthodIntro.tip10')}}</th>
						</tr>
						<tr>
							<td>Level 1</td>
							<td>{{"25%"}}</td>
							<td>{{"15%"}}</td>
						</tr>
						<tr>
							<td>Level 2</td>
							<td>{{"7%"}}</td>
							<td>{{"5%"}}</td>
						</tr>
						</tr>
						<tr>
							<td>Level 3</td>
							<td>{{"1%"}}</td>
							<td>{{"0.6%"}}</td>
						</tr>
						<tr>
							<td>Level 4</td>
							<td>{{"1%"}}</td>
							<td>{{"0.6%"}}</td>
						</tr>
						<tr>
							<td>Level 5</td>
							<td>{{"1%"}}</td>
							<td>{{"0.6%"}}</td>
						</tr>
						<!-- <tr>
							<td>Level 6</td>
							<td>{{"1%"}}</td>
							<td>{{"0.6%"}}</td>
						</tr>
						<tr>
							<td>Level 7</td>
							<td>{{"1%"}}</td>
							<td>{{"0.6%"}}</td>
						</tr>
						<tr>
							<td>Level 8</td>
							<td>{{"1%"}}</td>
							<td>{{"0.6%"}}</td>
						</tr>
						<tr>
							<td>Level 9</td>
							<td>{{"1%"}}</td>
							<td>{{"0.6%"}}</td>
						</tr>
						<tr>
							<td>Level 10</td>
							<td>{{"1%"}}</td>
							<td>{{"0.6%"}}</td>
						</tr> -->

					</table>
				</view>

			</section>
		</view>

		<!-- 长图 -->
		<view class="play_intro_bg_box">
			<section class="part1 ">
				<view class="title">
					{{$t('playMthodIntro.bottomdTip1')}}
				</view>
				<view class="content">
					{{$t('playMthodIntro.bottomdTip2')}}
				</view>
			</section>
			<section class="part2">
				<view class="title">
					{{$t('playMthodIntro.bottomdTip3')}}
				</view>
				<view class="content flex-between ">
					<view class="left">
						{{$t('playMthodIntro.bottomdTip4')}}
					</view>
					<view class="right">
						{{$t('playMthodIntro.bottomdTip5')}}
					</view>
				</view>
			</section>
			<section class="part3 ">
				<view class="title">
					{{$t('playMthodIntro.bottomdTip6')}}
				</view>
				<view class="content flex-between ">
					<view class="left">
						{{$t('playMthodIntro.bottomdTip7')}}
					</view>
					<view class="right">
						{{$t('playMthodIntro.bottomdTip8')}}
					</view>
				</view>
			</section>

			<section class="part4">
				<view class="title">
					{{$t('playMthodIntro.bottomdTip9')}}
				</view>
				<view class="content flex-between ">
					<view class="left">
						{{$t('playMthodIntro.bottomdTip10')}}
					</view>
					<view class="right">
						{{$t('playMthodIntro.bottomdTip11')}}
					</view>
				</view>
			</section>
			<section class="part5">
				<view class="title">
					{{$t('playMthodIntro.bottomdTip12')}}
				</view>
				<view class="content ">
					<view class="content_inner">
						<p>{{$t('playMthodIntro.bottomdTip13')}}</p>

						<p>{{$t('playMthodIntro.bottomdTip14')}}</p>
					</view>
				</view>
			</section>
			<!-- <section class="part6">
				<view class="title">
					{{$t('playMthodIntro.bottomdTip15')}}
				</view>
				<view class="content flex-between ">
					<view class="left">
						{{$t('playMthodIntro.bottomdTip16')}}
					</view>
					<view class="right">
						{{$t('playMthodIntro.bottomdTip17')}}。
					</view>
				</view>
			</section>
			<section class="part7">
				<view class="title">
					{{$t('playMthodIntro.bottomdTip18')}}
				</view>
				<view class="content flex-center ">
					<view class="content_center">
						{{$t('playMthodIntro.bottomdTip19')}}
					</view>
				</view>
			</section> -->

			<view class="bottom_tip_box flex-center">
				<p>{{$t('playMthodIntro.bottomdTip20')}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('playMthodIntro.playMthodIntro')
			})
		},
		methods: {
			toDetails(id, index) {
				uni.navigateTo({
					url: '/pages/gather/goodDetails/goodDetails?id=' + id + '&index=' + index + '&showBuyModal=' +
						true,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.basic_wrap {
		width: 100%;
		min-height: 100vh;
		background: #1F222B;

		section {

			.backImg {
				width: 100%;
				height: 600rpx;
				background: url('/static/playIntro/1.png');
				@include backImg;
				position: relative;

				.title {
					height: 100rpx;
					padding-left: 20rpx;
					padding-top: 50rpx;
					font-size: 40rpx;
				}

				.content1 {
					width: 100%;
					height: 180rpx;
					margin-top: 100rpx;
					padding-left: 50rpx;
					letter-spacing: 2rpx;

					p:nth-child(1) {
						font-size: 24rpx;
						color: #99999B;
						font-weight: 550;
					}

					p:nth-child(2) {
						font-size: 28rpx;
						color: #DCDCDC;
					}
				}

				.content2 {
					position: absolute;
					bottom: 60rpx;
					right: 15rpx;
					width: 80%;
					height: 110rpx;
					text-align: center;
					color: #232121;

					p:nth-child(1) {
						font-size: 18rpx;
					}

					p:nth-child(2) {
						font-weight: bold;
					}
				}
			}
		}

		section:nth-child(1) {
			.content1 {
				margin-top: 60rpx;
				width: 340rpx;
				height: 240rpx;

				p:nth-child(1) {
					font-size: 20rpx;
				}

				p:nth-child(2) {
					font-size: 22rpx;
				}
			}
		}

		section:nth-child(2) {
			.backImg {
				height: 1100rpx;
				background: url('/static/playIntro/2.png');
				@include backImg;
				position: relative;

				.content1 {
					margin-top: 60rpx;
				}

				.tip {
					font-size: 24rpx;
					text-align: left;
				}

				.tip1 {
					width: 25%;
					height: 80rpx;
					line-height: 40rpx;
					margin-top: 50rpx;
					margin-left: 80rpx;
				}

				.bottom {
					height: 400rpx;
					margin-top: 120rpx;

					.left_content {
						flex: 2;
						height: 100%;

						.content1 {
							height: 120rpx;
						}

						.tip2 {
							width: 200rpx;
							margin-top: 100rpx;
							margin-left: 50rpx;
						}

					}

					.right_content {
						flex: 1;
						height: 100%;

						.tip3 {
							width: 120rpx;
							margin-top: 80rpx;
							margin-left: 90rpx;
						}
					}
				}

			}

		}

		section:nth-child(3) {
			.backImg {
				height: 1700rpx;
				background: url('/static/playIntro/3.png');
				@include backImg;
				position: relative;

				.content1 {
					height: 120rpx;
					padding-right: 20rpx;
				}

				.bottom {
					height: 440rpx;
					margin-top: 380rpx;


					.left_content {
						height: 100%;
						font-size: 34rpx;
						padding-left: 40rpx;
					}

					.right_content {
						width: 370rpx;
						height: 100%;
						display: flex;
						justify-content: space-between;

						view {
							width: 100rpx;
							font-size: 24rpx;
							text-align: left;
						}

						.tip4 {
							margin-left: 20rpx;
							margin-bottom: 30rpx;
							align-self: flex-end;
						}

						.tip5 {
							margin-top: 30rpx;
							margin-right: 10rpx;
						}
					}

					.last_tip {
						position: absolute;
						bottom: 100rpx;
						padding-left: 30rpx;
						height: 120rpx;
						color: #DDDDDD;

						p:nth-child(1) {
							font-size: 38rpx;
						}

						p:nth-child(2) {
							font-size: 46rpx;
						}

					}
				}
			}
		}

		.initial_content {
			width: 100%;
			padding: 0 30rpx;

			section {
				width: 100%;
				padding: 30rpx;
				background: #1A1D22;
				font-size: 28rpx;
				color: #fff;
				border-radius: 15rpx;
				margin-top: 20rpx;

				li {
					margin-bottom: 20rpx;
					white-space: pre-line;
				}

				li:nth-child(1) {
					font-size: 34rpx;
					font-weight: bold;
				}

				li:nth-child(3) {
					width: 100%;
					height: 1rpx;
					margin-top: 30rpx;
					background-color: #23262C;
				}

				li:nth-child(4) {
					font-size: 24rpx;
					color: #8A8D92;
				}

				table {
					width: 100%;

					/* 控制第一列居中对齐 */
					td:first-child,
					th:first-child {
						width: 220rpx;
						text-align: center;
					}

					td:nth-child(2),
					th:nth-child(2) {
						width: 200rpx;
						text-align: center;
					}

					/* 控制第二列靠右对齐 */
					td:nth-child(3),
					th:nth-child(3) {
						text-align: center;
					}

					tr {
						height: 60rpx;
						font-weight: bold;
					}

					tr:nth-child(1) {
						font-size: 24rpx;
						color: #8A8D92;

					}

					td {
						image {
							height: 24rpx;
						}
					}
				}

			}
		}

		.play_intro_bg_box {
			width: 100%;
			height: 2600rpx;
			background: url('/static/Continent/play_long1.png');
			@include backImg;

			section {
				width: 100%;
				height: 430rpx;
				padding: 60rpx 30rpx;

				.title {
					font-size: 40rpx;
					color: #FBDFB4;
					font-weight: bold;
				}

				.content {
					width: 340rpx;
					padding: 0 30rpx;
					margin-top: 80rpx;
					font-size: 24rpx;
					color: #D0D0D2;
				}
			}

			.part2 {
				margin-top: 20rpx;

				.content {
					width: 100%;
					height: 200rpx;
					color: #333;
					font-size: 20rpx;
					padding-bottom: 50rpx;

					.left {
						width: 220rpx;
						margin-left: 30rpx;
					}

					.right {
						width: 185rpx;
						padding-bottom: 20rpx;
						padding-left: 20rpx;
					}
				}
			}

			.part3 {
				margin-top: 20rpx;

				.content {
					width: 100%;
					height: 200rpx;
					color: #333;
					font-size: 20rpx;
					padding-bottom: 50rpx;

					.left {
						width: 220rpx;
						margin-left: 80rpx;
						padding-bottom: 60rpx;
					}

					.right {
						width: 205rpx;
						padding-bottom: 10rpx;
						margin-right: 60rpx;
						margin-top: 110rpx;
					}
				}
			}


			.part4 {
				margin-top: 150rpx;

				.content {
					width: 100%;
					height: 200rpx;
					color: #333;
					font-size: 20rpx;
					padding-bottom: 50rpx;

					.left {
						width: 220rpx;
					}

					.right {
						width: 235rpx;
						padding-bottom: 26rpx;
						padding-left: 45rpx;
					}
				}
			}

			.part5 {
				margin-top: 20rpx;

				.content {
					width: 100%;
					height: 200rpx;
					color: #333;
					font-size: 18rpx;

					.content_inner {
						p {
							margin-top: 15rpx;
						}

						P:nth-child(1) {
							font-size: 26rpx;
							color: #898C91;
						}

						P:nth-child(2) {
							font-size: 28rpx;
							color: #D7D7DE;
						}
					}
				}
			}


			.part6 {
				margin-top: 150rpx;

				.content {
					width: 100%;
					height: 200rpx;
					color: #333;
					font-size: 20rpx;
					padding-bottom: 50rpx;

					.left {
						width: 220rpx;
						margin-left: 30rpx;
					}

					.right {
						width: 200rpx;
						padding-left: 25rpx;
					}
				}
			}

			.part7 {
				margin-top: 20rpx;

				.content {
					width: 100%;
					height: 200rpx;
					color: #333;
					font-size: 18rpx;
					padding-bottom: 50rpx;

					.content_center {
						width: 300rpx;
						font-size: 20rpx;
						margin-right: 70rpx;
						margin-bottom: 20rpx;
					}
				}
			}

			.bottom_tip_box {
				margin-top: 160rpx;
				font-size: 20rpx;
				color: #444750;
			}
		}
	}
</style>