<template>
	<view class="index">
		<view class="container">
			<view class="title">
				{{$t('gemProduct.what')}}
			</view>
			<view class="title_content">
				{{$t('gemProduct.tip1')}}
			</view>
			<view class="">
				<view style="margin-top: 80rpx;">
					<table class="jiantui">
						<tr>
							<th>{{$t('gemProduct.tip2')}}</th>
							<!-- <th>代理可获收益</th> -->
							<th>{{$t('gemProduct.tip3')}}</th>
							<th>{{$t('gemProduct.tip4')}}</th>
						</tr>
						<tr>
							<td>
								< 2.5{{$t('gemProduct.yi')}} </td>
							<td>
								< 50% </td>
							<td>
								100%
							</td>
						</tr>
						<tr>
							<td>2.5{{$t('gemProduct.yi')}}</td>
							<td>50%</td>
							<td>50%</td>
						</tr>
						<tr>
							<td>3.75{{$t('gemProduct.yi')}}</td>
							<td>75%</td>
							<td>25%</td>
						</tr>
						<tr>
							<td>4.75{{$t('gemProduct.yi')}}</td>
							<td>87.5%</td>
							<td>12.5%</td>
						</tr>
						<tr>
							<td>4.6875{{$t('gemProduct.yi')}}</td>
							<td>93.75%</td>
							<td>6.25%</td>
						</tr>

						<tr>
							<td>4.84375{{$t('gemProduct.yi')}}</td>
							<td>96.875%</td>
							<td>3.125%</td>
						</tr>

						<tr>
							<td>4.921875{{$t('gemProduct.yi')}}</td>
							<td>98.4375%</td>
							<td>1.5625%</td>
						</tr>
						<tr>
							<td>4.9609375{{$t('gemProduct.yi')}}</td>
							<td>99.21875%</td>
							<td>0.78125%</td>
						</tr>

						<tr>
							<td>{{$t('gemProduct.tip5')}}</td>
							<td>...</td>
							<td>...</td>
						</tr>

						<tr>
							<td>5{{$t('gemProduct.yi')}}</td>
							<td>100%</td>
							<td>0</td>
						</tr>


					</table>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {


		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#000',

			})

			uni.setNavigationBarTitle({
				title: this.$t('gemProduct.title')
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.index {
		width: 100%;
		min-height: 100vh;
		background: #000;

		.container {
			color: #fff;
			padding: 50rpx;

			.title {
				font-size: 44rpx;
				font-weight: bold;
			}

			.title_content {
				margin-top: 40rpx;
				font-size: 26rpx;
				color: #999;
			}

			.jiantui {

				border-collapse: collapse;
				font-size: 22rpx;

				/* 合并边框，使相邻单元格的边框重叠 */
				td,
				th {
					border: 1px solid #ccc;
					/* 设置单元格的边框为1像素实线黑色边框 */
					height: 100rpx;
				}

				td,
				th {
					width: 260rpx;
					text-align: center;
				}
			}
		}
	}
</style>