<template>
	<view class="basic_wrap">
		<!-- custom navbar -->
		<view class="custome_nav ">
			<u-icon name="arrow-leftward" color="#ffffff" size="20" @click="toback()"></u-icon>
			<u-subsection fontSize="15" bgColor="#1A1D22" inactiveColor="#989BA0" activeColor="#ffffff" :list="list"
				@change="sectionChange" :current="current" mode="button"></u-subsection>
		</view>
		<!--selected different content -->
		<view class="initial_content" v-show="current==0">
			<section>
				{{$t('intro.curOne0')}}
			</section>
			<!-- <section>
				<li>{{$t('intro.curOne1')}}</li>
				<li>{{$t('intro.curOne2')}}</li>
				
			</section>
			<section>
				<li>{{$t('intro.curOne3')}}</li>
				<li>{{$t('intro.curOne4')}}</li>
			</section> -->

			<section>
				<li>{{$t('intro.curOne12')}}</li>
				<li>{{$t('intro.curOne13')}}</li>
				<!-- <p>{{$t('intro.curOne7')}}</p> -->
			</section>

			<section>
				<li>{{$t('intro.curOne14')}}</li>
				<li>{{$t('intro.curOne15')}}</li>
				<!-- <p>{{$t('intro.curOne7')}}</p> -->
			</section>

			<section>
				<li>{{$t('intro.curOne5')}}</li>
				<li>{{$t('intro.curOne6')}}</li>
				<p>{{$t('intro.curOne7')}}</p>
			</section>


			<section v-show="true">
				<li>{{$t('intro.curOne8')}}</li>
				<li>{{$t('intro.curOne9')}}</li>
				<li></li>
				<view class="">
					<table>
						<tr>
							<th>{{$t('intro.curOne10')}}</th>
							<th>{{$t('intro.curOne11')}}</th>
						</tr>
						<tr>
							<td>{{"1"+' '+$t('utils.ticket')}}</td>
							<td>
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
								<text>0.166666</text>
							</td>
						</tr>
						<tr>
							<td>{{"7"+' '+$t('utils.ticket')}}</td>
							<td>
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
								<text>1.102451</text>
							</td>
						</tr>
						<tr>
							<td>{{"10"+' '+$t('utils.ticket')}}</td>
							<td>
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
								<text>1.273975</text>
							</td>
						</tr>
						</tr>
						<tr>
							<td>{{"20"+' '+$t('utils.ticket')}}</td>
							<td>
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
								<text>1.607309</text>
							</td>
						</tr>
						<tr>
							<td>{{"50"+' '+$t('utils.ticket')}}</td>
							<td>
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
								<text>1.905179</text>
							</td>
						</tr>
						<tr>
							<td>{{"100"+' '+$t('utils.ticket')}}</td>
							<td>
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
								<text>2.381285</text>
							</td>
						</tr>


					</table>
				</view>

			</section>
		</view>


		<view class="initial_content" v-show="current==1">
			<section>
				{{$t('intro.curTwo0')}}
			</section>
			<section>
				<li>{{$t('intro.curTwo1')}}</li>
				<li>
					{{$t('intro.curTwo2')}}

					{{$t('intro.curTwo3')}}

					<!-- 	{{$t('intro.curTwo4')}}

					{{$t('intro.curTwo5')}} -->
				</li>
				<!-- 	<li></li>
				<li>注:新用户好友加入可免费挖矿30天</li> -->

				<view class="">
					<table>
						<tr>
							<th>{{$t('playMthodIntro.tip8')}}</th>
							<!-- <th>代理可获收益</th> -->
							<th>{{$t('intro.curTwo6')}}</th>
							<th>{{$t('intro.curTwo7')}}</th>
						</tr>
						<tr>
							<td>Level 1</td>
							<td>{{$t('intro.curTwo8')}}</td>
							<td>{{$t('intro.curTwo9')}}</td>
						</tr>


					</table>
				</view>

				<view>{{$t('intro.curTwo10')}}</view>

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
							<td>25%</td>
							<td>15%</td>
						</tr>


					</table>
				</view>

			</section>
		</view>



		<view class="initial_content" v-show="current==2">
			<!-- 	<section>
				{{$t('intro.curTwo0')}}
			</section> -->
			<section>
				<li>{{$t('intro.curTwo1')}}</li>
				<li>{{$t('intro.curTwo2')}}</li>
				<li>{{$t('intro.curThree6')}}</li>
				<view style="margin-top: 80rpx;">
					<table class="jiantui">
						<tr>
							<th>{{$t('playMthodIntro.tip8')}}</th>
							<!-- <th>代理可获收益</th> -->
							<th>{{$t('intro.curTwo6')}}</th>
							<th>{{$t('intro.curTwo7')}}</th>
						</tr>
						<tr>
							<td>Level 2</td>
							<td>{{$t('intro.curThree7')}}</td>
							<td>{{$t('intro.curThree8')}}
							</td>
						</tr>
						<tr>
							<td>Level 3</td>
							<td>{{$t('intro.curThree9')}}</td>
							<td>{{$t('intro.curThree10')}}</td>
						</tr>
						<tr>
							<td>Level 4</td>
							<td>{{$t('intro.curThree11')}}</td>
							<td>{{$t('intro.curThree12')}}</td>
						</tr>
						<tr>
							<td>Level 5</td>
							<td>{{$t('intro.curThree13')}}</td>
							<td>{{$t('intro.curThree14')}}</td>
						</tr>


					</table>
				</view>

				<view style="margin-top: 30rpx;">{{$t('intro.curTwo10')}}</view>

				<view class="">
					<table>
						<tr>
							<th>{{$t('playMthodIntro.tip8')}}</th>
							<!-- <th>代理可获收益</th> -->
							<th>{{$t('playMthodIntro.tip9')}}</th>
							<th>{{$t('playMthodIntro.tip10')}}</th>
						</tr>
						<tr>
							<td>Level 2</td>
							<td>7%</td>
							<td>5%</td>
						</tr>
						<tr>
							<td>Level 3</td>
							<td>1%</td>
							<td>0.6%</td>
						</tr>
						<tr>
							<td>Level 4</td>
							<td>1%</td>
							<td>0.6%</td>
						</tr>
						<tr>
							<td>Level 5</td>
							<td>1%</td>
							<td>0.6%</td>
						</tr>


					</table>
				</view>

			</section>

			<section>
				<li>{{$t('intro.curThree15')}}</li>
				<li></li>
			</section>




			<!-- <section>
				<li>{{$t('intro.curThree0')}}</li>
				<li>
					{{$t('intro.curThree1')}}

					{{$t('intro.curThree2')}}
				</li>
			</section>

			<section>
				<li>{{$t('intro.curThree3')}}</li>
				<li>
					{{$t('intro.curThree4')}}

					{{$t('intro.curThree5')}}
				</li>
			</section> -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 0,
				incomeInfo: {}
			};
		},
		onLoad(option) {
			//console.log('option---222:', option);
			this.current = option.type - 1;

		},
		onShow() {
			this.getMineIncomeInfo();
			this.list = [
				this.$t('intro.curOneIntro'),
				this.$t('intro.curTwoIntro'),
				this.$t('intro.curThreeIntro')
			]
		},
		methods: {
			async getMineIncomeInfo() {
				let res = await uni.ajax.public_getMineIncomeInfo();
				//console.log("income", res);
				if (res.code == 200) {
					this.incomeInfo = res.data;
				}
			},
			sectionChange(index) {
				this.current = index;
			}
		}

	}
</script>

<style lang="scss" scoped>
	/deep/ .u-subsection {
		width: 80%;
		border-radius: 25rpx;

		.u-subsection__bar {
			//width: 32% !important;
			background-color: #262B31;
			border-radius: 25rpx !important;
		}
	}

	/deep/ .u-icon {
		// position: absolute;
		// left: 20rpx;
	}




	.basic_wrap {
		width: 100%;
		min-height: 100vh;
		padding: 20rpx 0rpx 20rpx 30rpx;
		background: #262B31;

		.custome_nav {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;

			position: relative;
			gap: 32rpx;
			//background-color: red;
			/* #ifndef H5 */
			margin-top: 40rpx;
			/* #endif */
		}

		.initial_content {
			width: 100%;
			// height: 200rpx;
			padding-right: 30rpx;
			// padding: 0 30rpx;
			//background: red;

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
					font-size: 24rpx;
					//background: red;


					/* 控制第一列居中对齐 */
					td:first-child,
					th:first-child {
						width: 150rpx;
						text-align: center;

					}

					td:nth-child(2),
					th:nth-child(2) {
						width: 260rpx;
						text-align: center;
						//background: red;
					}

					/* 控制第二列靠右对齐 */
					td:nth-child(3),
					th:nth-child(3) {
						text-align: center;
						//background: blue;
					}

					td:nth-child(4),
					th:nth-child(4) {
						text-align: center;
						//background: blue;
					}

					td:nth-child(5),
					th:nth-child(5) {
						text-align: center;
						//background: blue;
					}

					tr {
						// margin-top: 10rpx;
						height: 60rpx;
						font-weight: bold;
						// font-size: 22rpx;
						//background-color: red;
					}

					tr:nth-child(1) {
						font-size: 24rpx;
						color: #8A8D92;

					}

					td {
						//background: red;

						image {
							height: 24rpx;
						}
					}
				}

				.jiantui {

					border-collapse: collapse;
					font-size: 22rpx;

					/* 合并边框，使相邻单元格的边框重叠 */
					td,
					th {
						padding: 0 10rpx;
						border: 1px solid #ccc;
						/* 设置单元格的边框为1像素实线黑色边框 */
						height: 110rpx;
					}

					// td:nth-child(2),
					// th:nth-child(2) {
					// 	width: 260rpx;
					// }
				}

			}
		}
	}
</style>