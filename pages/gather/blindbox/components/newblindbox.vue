<template>
	<view class="newblindbox">
		<view class="blindbox">
			<view class="blindbox_title">
				{{box_title}}
			</view>
			<swiper class="swiper" :current="current" @change="currentChange">
				<swiper-item v-for="item,index in list" class="swiper-item" :key="item.id">
					<u-image :src="item.cover.show_src" width="242rpx" height="368rpx"></u-image>
				</swiper-item>
			</swiper>
		</view>
		<!-- <image class="box_buy_btn" src="/static/box_buy_btn.png"></image> -->
		<view v-if="buy_btn.is_time == 2 && buy_btn.stock>0" class="box_buy_btn" @click="todetail">
			￥{{buy_btn.price}} 购买盲盒
		</view>
		<view v-else-if="buy_btn.is_time == 2 && buy_btn.stock<=0" class="box_buy_btn" style="filter: grayscale(1);"
			@click="todetail">
			已售罄
		</view>
		<view v-else-if="buy_btn.is_time == 3" class="box_buy_btn" style="filter: grayscale(1);" @click="todetail">
			已结束
		</view>
		<view v-else-if="buy_btn.is_time == 1" class="box_buy_btn " @click="todetail">
			待发售：{{`${timer.days*24+timer.hours}:${timer.minutes<10?'0'+timer.minutes:timer.minutes}:${timer.seconds<10?'0'+timer.seconds:timer.seconds}`}}
		</view>

		<view style="height: 100rpx;"></view>
		<u-count-down style="opacity: 0;" @finish="time_end" :time="buy_btn.timestamp" @change="onChange"
			format="HH:mm:ss"></u-count-down>
	</view>
</template>

<script>
	// import { blindboxdata_list } from '@/pages/gather/list.js';
	export default {
		data() {
			return {
				timer: {},
				current: 0,
				page: 1,
				list: [],
				isnomore: false
			}
		},
		computed: {
			box_title() {
				return this.list[this.current]?.title
			},
			buy_btn() {
				return this.list[this.current]
			}
		},
		created() {
			// this.list = blindboxdata_list;	
			this.collect_blindboxGetList()

		},
		methods: {
			todetail() {
				this.topage('gather/blindbox/details?id=' + this.buy_btn.id)
			},
			onChange(e) {
				// console.log(e)
				this.timer = e
			},
			currentChange(e) {
				console.log(e)
				this.current = e.detail.current;
				if (this.list.length - e.detail.current <= 2 && !this.isnomore) {
					this.collect_blindboxGetList()
				}
			},
			async collect_blindboxGetList() {
				//盲盒列表
				let res = await uni.ajax.collect_blindboxGetList({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {
					console.log(res)
					if (res.data.list.length > 0) {
						res.data.list.forEach((item, index) => {
							//处理活动时间 1未开始2进行中3已结束
							let timeInfo = uni.utils.FormDataEndTime(item.start_time, item.end_time);
							item.is_time = timeInfo.is_time;
							item.timestamp = timeInfo.timestamp;
							if (res.data.list.length - 1 == index) {
								this.list = [...this.list, ...res.data.list]
								this.$nextTick(() => {
									if (this.list.length >= res.data.count) this.isnomore = true
								})
								// this.setPagedata('blindboxdata', 'blindboxdata_list', res.data.list, 'collect_blindboxGetList');
							}
						});
					} else {
						// this.setPagedata('blindboxdata', 'blindboxdata_list', res.data.list, 'collect_blindboxGetList');
					}

				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.newblindbox {

		.blindbox {
			width: 100%;
			height: 656rpx;
			// background-color: red;
			background: url('/static/else/old_box_bg.png') no-repeat;
			background-size: 100% 100%;
			position: relative;

			.blindbox_title {
				width: 100%;
				position: absolute;
				top: 44rpx;
				left: 0;
				text-align: center;
				z-index: 10;
			}

			.swiper {
				height: 100%;
				position: absolute;
				inset: 0;
			}

			.swiper-item {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.box_buy_btn {
			width: 580rpx;
			height: 94rpx;
			margin: -8rpx 85rpx 0;
			// background: url('/static/box_buy_btn.png') no-repeat;
			background-size: 100% 100%;
			position: relative;
			z-index: 5;
			text-align: center;
			line-height: 64rpx;
			font-size: 38rpx;
			font-family: Alimama ShuHeiTi-Bold, Alimama ShuHeiTi;
			font-weight: bold;
			color: #FFFFFF;
			// line-height: 20px;
			-webkit-text-stroke: 2rpx #6A9660;
			text-stroke: 2rpx #6A9660;
			// -webkit-background-clip: text;
			// -webkit-text-fill-color: transparent;
		}
	}
</style>