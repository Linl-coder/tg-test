<template>
	<view class="tabbar flex-evenly" v-show="isShow">
		<!-- {{tabList}}--tabList -->
		<view class="tabbar-item " v-for="(item,index) in tabList" :key="index" @click="changeTab(index)">
			<view class="flex-colum-between" v-show="pageSrc == item.pagePath">
				<view class="imgBox">
					<image class="img" :src="item.selectedIconPath"></image>
				</view>
				<view class="text active ">{{item.text}}</view>
			</view>
			<view class="flex-colum-between" v-show="pageSrc != item.pagePath">
				<view class="imgBox">
					<image class="img" :src="item.iconPath"></image>
				</view>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props: {
			lang: String,
			pageSrc: String,
			isShow: {
				type: Boolean,
				default: true
			},
			tabList: {
				type: Array,
				default: []
			}
		},
		created() {},
		data() {
			return {}
		},
		created() {},
		mounted() {},
		onLoad() {},
		onShow() {},
		methods: {
			changeTab(e) {
				uni.switchTab({
					url: '/' + this.tabList[e].pagePath,
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabbar {
		width: 100vw;
		height: 120rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		background: #fff;
	}

	.tabbar-item {
		text-align: center;
		height: 100rpx;

		.imgBox {
			width: 100%;
			height: 44rpx;
		}
	}

	.img {
		width: 44rpx;
		height: 44rpx;
	}

	.text {
		width: 130rpx;
		margin-top: 10rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #999999;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.text.active {
		color: #222222;
	}
</style>