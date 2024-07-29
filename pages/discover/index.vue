<template>
	<view class="find">
		<view class="a">
			<view class="a_list" @tap="change(index)" :class="current == index ? 'a_list_active':''"
				v-for="(item,index) in tab_list" :key="index">
				{{item}}
			</view>
		</view>
		<view class="b">
			<scroll-view scroll-x="true" class="b_scroll">
				<view class="b_list" :class="{'b_list_active':typeIndex == index}" v-for="(item,index) in typeList"
					:key="index" @click="changeType(item,index)">
					{{item.name}}
				</view>
			</scroll-view>
		</view>
		<u-loading-icon :show="loading" style="margin-top:100rpx"></u-loading-icon>
		<view class="c" v-if="list.length > 0">
			<view class="c_list" v-for="(item,index) in list" :key="index"
				@tap="topage('/pages/general/message/details?id='+item.id+'&type='+Number(current+1))">
				<view class="c_a" v-if="current==0">
					<u--image mode="scaleToFill" width="246rpx" height="176rpx" :src="item.file.show_src"></u--image>
				</view>
				<view class="c_a" v-if="current==1">
					<u--image mode="scaleToFill" width="246rpx" height="176rpx" :src="item.picture"></u--image>
				</view>
				<view class="c_r">
					<view class="c_r_a u-line-2">{{item.title}}</view>
					<view class="c_r_b">
						<view>{{item.cateInfo.name}}</view>
						<view>{{item.add_time}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="empty" v-else-if="list.length < 1 && !loading">
			<Empty desc="没有更多数据了" icon="/static/else/nodata.png"></Empty>
		</view>
	</view>
</template>

<script>
	import Empty from "@/components/emptyData.vue"
	export default {
		components: {
			Empty
		},
		data() {
			return {
				tab_list: ['平台公告', '新闻发声'],
				current: 0,
				typeList: [],
				typeIndex: 0,
				list: [],
				loading: false,
			}
		},
		onLoad() {
			this.getCate()
		},
		methods: {
			getCate() {
				uni.ajax.getCate().then(res => {
					this.typeList = res.data
					this.typeList.unshift({
						id: '',
						name: '全部'
					})

					if (this.typeList.length > 0) {
						this.list = []
						this.getCateList()
					}
				})
			},
			getCateList() {
				let params = {
					cate_id: this.typeList[this.typeIndex].id,
					// ...this.page
				}
				this.loading = true;
				uni.ajax.getCateList(params).then(res => {
					setTimeout(() => {
						this.loading = false;
						this.list = res.data.list;
					}, 500)
				})
			},
			getNewsCate() {
				uni.ajax.getNewsCate().then(res => {
					this.typeList = res.data.map(item => {
						return {
							id: item.value,
							name: item.label
						}
					})
					this.typeList.unshift({
						id: '',
						name: '全部'
					})
					if (this.typeList.length > 0) {
						this.list = []
						this.getNewsList()
					}
				})
			},
			getNewsList() {
				let params = {
					id: this.typeList[this.typeIndex].id,
				}
				this.loading = true;
				uni.ajax.getNewsList(params).then(res => {
					setTimeout(() => {
						this.loading = false;
						this.list = res.data.list;
					}, 500)
				})
			},
			change(index) {
				this.current = index;
				if (index == 0) {
					this.getCate()
				} else {
					this.getNewsCate()
				}
			},
			changeType(row, index) {
				this.typeIndex = index;
				this.list = [];
				if (this.current == 0) {
					this.getCateList()
				}
				if (this.current == 1) {
					this.getNewsList();
				}

			},
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style scoped lang="scss">
	.find {}

	.c {
		padding: 0rpx 32rpx;

		.c_list {
			padding: 24rpx;
			background: #Fff;
			border-radius: 24rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 24rpx;

			.c_a {
				width: 246rpx;
				height: 176rpx;
				border-radius: 16rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 16rpx;
				}
			}

			.c_r {
				flex: 1;
				padding-left: 24rpx;
				height: 176rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.c_r_a {
					font-size: 28rpx;
					font-weight: 500;
					color: #000000;
					line-height: 33rpx;
				}

				.c_r_b {
					display: flex;
					align-items: center;
					justify-content: space-between;

					view:nth-child(1) {
						background: #6085FC;
						border-radius: 8rpx 8rpx 8rpx 8rpx;
						padding: 8rpx 12rpx;
						font-weight: 400;
						color: #FFFFFF;
						font-size: 22rpx;
					}

					view:nth-child(2) {
						font-size: 22rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
					}
				}
			}
		}
	}

	.b {
		padding: 24rpx 32rpx;

		.b_scroll {
			width: 100%;
			white-space: nowrap;
		}

		.b_list {
			display: inline-block;
			margin-right: 48rpx;
			font-size: 28rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
		}

		.b_list_active {
			font-weight: 600;
			color: #6085FC;
			font-size: 32rpx;
		}
	}

	.a {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 22rpx 0;

		.a_list {
			font-size: 32rpx;
			font-weight: 400;
			color: #666666;
			margin: 0 24rpx;
		}

		.a_list_active {
			font-weight: 600;
			color: #000000;
			position: relative;

			&::after {
				content: "";
				position: absolute;
				left: 0;
				width: 100%;
				bottom: -10rpx;
				height: 6rpx;
				border-radius: 12rpx;
				background: #6085FC;
			}
		}
	}
</style>