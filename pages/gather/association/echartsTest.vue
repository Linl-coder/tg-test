<template>
	<view id="myCharts">

	</view>
</template>

<script>
	import * as echarts from 'echarts';
	// 引入柱状图图表，图表后缀都为 Chart
	import {
		LineChart
	} from 'echarts/charts';
	// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
	import {
		TitleComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent
	} from 'echarts/components';
	// 标签自动布局、全局过渡动画等特性
	import {
		LabelLayout,
		UniversalTransition
	} from 'echarts/features';
	// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
	import {
		CanvasRenderer
	} from 'echarts/renderers';
	echarts.use([
		TitleComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent,
		LineChart,
		LabelLayout,
		UniversalTransition,
		CanvasRenderer
	]);


	export default {
		data() {
			return {

			};
		},
		onShow() {
			// 注册必须的组件
			// this.initEcharts()
		},
		mounted() {
			this.$nextTick(() => {
				this.initEcharts()
			});
		},
		methods: {
			initEcharts() {
				let chartNode = document.querySelector('#myCharts')
				console.log(chartNode)
				let myChart = echarts.init(chartNode);
				// 绘制图表
				myChart.setOption({
					title: {
						text: '全平台宝石数量',
						subtext: '副标题                     dsad',
						left: 0,
						textStyle: {
							color: '#fff',
							fontSize: 'italic',
							fontWeight: 'normal'
						},
						subtextStyle: {
							color: 'red', // 设置副标题文本颜色
							fontSize: 16, // 设置副标题字体大小
							fontStyle: 'italic', // 设置副标题字体样式
							align: 'right'
						}
					},
					tooltip: {},

					xAxis: {
						data: ['衬衫', '羊衫', '雪衫', '裤子', '高鞋', '袜子']
					},
					yAxis: {
						// name: '宝石总数量',
						splitLine: {
							show: false // 设置为false即可隐藏背景的横线
						}
					},
					series: [{
						name: '销量',
						type: 'line',
						data: [5, 20, 36, 10, 10, 20]
					}]
				});
			}
		}
	}
</script>

<style lang="scss">
	#myCharts {
		width: 100%;
		height: 500rpx;
		// margin-left: 100rpx;
		background-color: #ccc;
	}
</style>