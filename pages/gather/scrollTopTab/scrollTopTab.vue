<template>
	<view>
		<!-- 顶部banner图 -->
		<view class="ding">banner</view>

		<!-- tab 滑动 -->
		<view :class="{'st':true,'sticky-fixed':isF}">
			<!-- tab部分 -->
			<swiper class="ct_tab">
				<swiper-item :class="{ 'ct_active': index == tabCur }" v-for="(item, index) in tabList" :key="index"
					class="ct_item" @click="clickCtTab(index)">
					<text v-text="item.title"></text>
				</swiper-item>
			</swiper>
		</view>

		<!-- 内容 -->
		<view class="xiala">
			<!-- 内容信息 -->
			<view class="" v-for="(item,index) in pages " :key="index">
				<view class="page_item" v-if="tabCur===index" @touchstart="onTouchStart" @touchmove="onTouchMove"
					@touchend="onTouchEnd">
					{{item.text}}
				</view>
			</view>


		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 下拉固定
				yuanH: uni.upx2px(200),
				isF: false,
				// 滑动tab
				tabCur: 0,
				pages: [{
						text: "全部信息"
					},
					{
						text: "水果"
					}
				],
				tabList: [{
					title: '全部',
				}, {
					title: '水果',
				}],
				startX: "",
				index: 0

			};
		},
		onPageScroll(e) {
			//#ifdef H5
			this.isF = true
			// #endif
			// #ifndef H5
			if (this.yuanH > e.scrollTop) {
				this.isF = false
			} else {
				this.isF = true
			}
			// #endif
		},
		methods: {
			onTouchStart(event) {
				// 记录触摸开始时的横向位置
				this.startX = event.touches[0].clientX;
				//console.log("startX", this.startX);
			},
			onTouchMove(event) {
				// console.log('index', index);
				// let index = 0;
				const currentX = event.touches[0].clientX;
				if (currentX - this.startX > 0) {
					console.log('向右滑动');
					//this.clickCtTab(0);


				} else {
					console.log('向左滑动');
					//this.clickCtTab(1);

				}
			},
			onTouchEnd(event) {
				// 清除起始位置信息
				this.startX = null;
			},
			clickCtTab(ctCur) {
				this.tabCur = ctCur
				console.log('点击了--->' + this.tabCur)
			},
			handleSwiperChange(e) {
				const currentIndex = e.detail.current; // 当前显示页面的索引

			}
		},

	};
</script>
<style lang='scss' scoped>
	/deep/.uni-swiper-item {
		background: yellow;
	}

	/* 顶部 banner */
	.ding {
		height: 100rpx;
		background-color: aquamarine;
	}

	.st {
		height: 90rpx;
		width: 750rpx;
		background-color: #fff;
		z-index: 999;
		/* top: 300upx; */
	}

	.sticky-fixed {
		/* #ifdef H5 */
		position: sticky;
		top: 44px;
		/* #endif */
		/* #ifndef H5 */
		position: fixed;
		top: 0;
		/* #endif */
		z-index: 999;
	}

	.xiala {
		width: 100%;
		height: 1500px;
		background: red;
		/* background-color: #eee; */
		/* padding-top: 100rpx; */

	}

	.page_item {
		height: 500rpx;
		background: yellowgreen;
	}





	/* 滑动tab */
	.ct_tab {
		width: 698upx;
		height: 90rpx;
		margin: 0 auto;
		/* padding: 30upx 0; */
		font-size: 28upx;
		/* font-weight: bold; */
		color: #c0c8d0;
		white-space: nowrap;
		display: flex;
		overflow: hidden;
	}

	.ct_item {
		width: 150upx;
		padding: 20upx 0;
		display: inline-block;
	}

	.ct_item text {
		padding: 20upx 0;
	}

	.ct_active {
		color: #007AFF;
		font-weight: bold;
	}

	.ct_active text {
		border-bottom: 2px solid #007AFF;
	}

	swiper {
		width: 100%;
	}

	swiper-item {
		width: 150upx !important;
	}
</style>