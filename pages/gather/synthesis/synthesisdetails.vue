<template>
	<view class="synthesisdetails">
		<view class="" v-if="loading == 4">
			<view class="header-box" :style="{'height':info.info.cover.imgheight}">
				<u--image :showLoading="true" mode="widthFix" class="icon" :src="info.info.cover.show_src" width="100%"
					:height="info.info.cover.imgheight"></u--image>
			</view>
			<view class="content">
				<view class="desc-box">
					<view class="title">
						<text class="t1">{{ info.data.title }}</text>
					</view>
					<view class="desc-t">活动时间:{{ info.info.start_time }}--{{ info.info.end_time }}</view>
					<view class="tips">*寄售中的卡牌无法参与合成</view>
				</view>
				<!-- 合成材料 -->
				<view class="desc-box">
					<view class="title"><text class="t1">合成材料</text></view>

					<view class="card-box flex-start">
						<view class="card-info" v-for="(item, index) in info.list.material" :key="index">
							<view class="icon-box">
								<u--image :showLoading="true" class="icon" :src="item.goods.cover.show_src"
									width="140rpx" height="140rpx"></u--image>
								<!-- <view class="mask flex-center">
									<image src="/static/Gather/lock.png" class="lock" mode=""></image>
								</view> -->
							</view>
							<view class="t1 flex-center">{{ item.goods.title }}</view>
							<view class="t2 flex-center">{{ item.num }}/{{item.ownNum}}</view>
						</view>
					</view>
				</view>
				<view class="desc-box">
					<view class="title"><text class="t1">合成卡牌</text></view>
					<view class="t2 flex-center" v-show="info.syn_type == 1">随机合成以下卡牌</view>
					<view class="card-box flex-start">
						<view class="card-info" v-for="(item, index) in info.list.target" :key="index">
							<view class="icon-box">
								<u--image :showLoading="true" class="icon" :src="item.goods.cover.show_src"
									width="140rpx" height="140rpx"></u--image>
								<!-- <view class="mask flex-center">
									<image src="/static/Gather/lock.png" class="lock" mode=""></image>
								</view> -->
							</view>
							<view class="t1 flex-center">{{ item.goods.title }}</view>
							<view class="t2 flex-center" v-show="info.syn_type == 2">{{ item.probability }}%</view>
						</view>
					</view>
				</view>
				<!-- 合成规则 -->
				<view class="desc-box">
					<view class="title"><text class="t1">卡牌合成内容</text></view>
					<view class="desc-t" style="color: #000;"><u-parse :content="info.info.content"></u-parse></view>
				</view>
			</view>

			<!-- 合成 -->
			<view class="f-box flex-around" v-if="is_time == 2">
				<!-- <view class="btn flex-center " :class="{'btn_gray':info.data.num<=0}" @tap="open(1)">批量合成</view> -->
				<view class="btn flex-center " :class="{'btn_gray':info.data.num<=0}" @tap="open(2)">立即合成</view>
				<!-- <view class="btn flex-center" @tap="topage('gather/synthesis/car?with_id=' + with_id + '&id=' + id)">选择合成</view> -->
			</view>

			<view class="f-box flex-center" v-if="is_time == 1">
				<view class="time-box flex-center" v-if="is_time == 1">
					<div class="flex-colum">
						<view class="t2 flex-center">
							活动开始剩余时间 :
							<u-count-down @finish="time_end()" :time="timestamp" format="HH:mm:ss" autoStart millisecond
								@change="onChange">
								<view class="time">
									<view class="time__custom">
										<text
											class="time__custom__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
									</view>
									<text class="time__doc">:</text>
									<view class="time__custom">
										<text class="time__custom__item">{{ timeData.minutes }}</text>
									</view>
									<text class="time__doc">:</text>
									<view class="time__custom">
										<text class="time__custom__item">{{ timeData.seconds }}</text>
									</view>
								</view>
							</u-count-down>
						</view>
					</div>
				</view>
			</view>
		</view>

		<iloading :result="loading"></iloading>

		<view v-if="show" class="reward-mask"  bgColor="transparent">
			<view class="flex-colum iswiper-box" v-for="(item,index) in syninfo" :key="index" v-if="index==0">
				<view style="border-radius: 16rpx 16rpx 0rpx 0rpx;overflow: hidden;padding-top: 24rpx;">
					<u--image :showLoading="true" mode="widthFix" class="icon" :src="item.cover.show_src" width="400rpx"
						height=""></u--image>
				</view>
				<text class="" style="margin: 36rpx 0rpx;">恭喜获得{{item.title}} X{{number}}</text>
				<view class="btnsee flex-center" @tap="(show = false), topage('gather/collect/mycollect')">去查看</view>
			</view>
		</view>

		<!-- 缤纷合成 -->
		<u-popup :show="binshow" @close="close" round="18" :closeable="false" mode="center">
			<view class="bin-box">
				<view class="list-item flex-between">
					<view class="list-item-t flex-center">
						名称
					</view>
					<view class="list-item-t flex-center">
						数量
					</view>
				</view>
				<scroll-view scroll-y="true" class="bin-scroll">
					<view class="list-item flex-between" v-for="(item,index) in syninfo" :key="index">
						<view class="list-item-t list-item-t1 ">
							{{item.title}}
						</view>
						<view class="list-item-t flex-center">
							X{{item.num}}
						</view>
					</view>
				</scroll-view>
				<view class="flex-between" style="padding: 32rpx 32rpx 0rpx 32rpx">
					<view class="btnsee flex-center" style="min-width: 45%;"
						@tap="binshow = false">关闭</view>
					<view class="btnsee flex-center" style="min-width: 45%;"
						@tap="(binshow = false), totab('gather/collect/mycollect')">去查看</view>
				</view>

			</view>
		</u-popup>


		<u-popup :show="popupshow" @close="close" round="18" :closeable="true" mode="center">
			<view class="popup-box">
				<view class="title flex-center">批量下单</view>
				<view class="form-box">
					<view class="i-box flex-between">
						<view class="i-label">下单数量</view>
						<view class="i-input flex-end">
							<u-number-box button-size="36" :max="info.info.buy_num" color="#ffffff" bgColor="#b9b9b9"
								iconStyle="color: #fff" v-model="number" :min="0"></u-number-box>
						</view>
					</view>
					<view class="btn flex-center" style="margin-top: 32rpx;" @tap="syn">确定</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				binshow: false,
				id: '',
				loading: 1,
				with_id: '',
				show: false,
				syninfo: [],
				info: {
					info: {
						buy_num: 0
					}
				},
				start_time: '',
				end_time: '',
				timestamp: 0,
				timeData: {},
				popupshow: false,
				number: 1,
				max_num: 100000,
				count: 1,
				time: null,
				no:""
			};
		},
		onHide() {
			clearInterval(this.time);
			this.time=null;
			this.count=1;
		},
		destroyed() {
			clearInterval(this.time);
			this.time=null;
		},
		onLoad(query) {
			this.id = query.id;
			if (query.with_id) {
				this.with_id = query.with_id;
			}
			this.collect_getFuseListById();
		},
		methods: {
			FormDataEndTime() {
				let timeInfo = uni.utils.FormDataEndTime(this.start_time, this.end_time);
				this.is_time = timeInfo.is_time;
				this.timestamp = timeInfo.timestamp;
			},
			time_end() {
				this.time_end = 2;
			},
			onChange(e) {
				this.timeData = e;
			},
			close() {
				this.popupshow = false;
			},
			open(type) {
				if(type==1){
					this.popupshow = true;
				}else{
					this.number=1;
					this.collect_synQueue();
				}
			},
			async collect_getFuseListById() {
				let res = await uni.ajax.collect_synGetDetail({
					with_id: this.with_id,
					id: this.id
				});
				if (res) {
					this.info = res.data;
					this.FormData_null(res.data.list.target);
					this.FormData_null(res.data.list.material);
					this.start_time = this.info.info.start_time;
					this.end_time = this.info.info.end_time;
					this.number = res.data.info.buy_num;
					this.FormDataEndTime();
					this.set_imginfo();
					this.info.info.start_time = this.FormDataTime(this.info.info.start_time);
					this.info.info.end_time = this.FormDataTime(this.info.info.end_time);
				} else {
					this.loading = 3;
				}
			},
			FormDataTime(time) {
				let newtime = null;
				let timestamp = new Date(time).getTime();

				newtime = uni.$u.timeFormat(timestamp, 'mm-dd hh:MM');

				return newtime;
			},
			FormData_null(arr) {
				arr.forEach((item, index) => {
					if (!item.goods) {
						item.goods = {
							cover: {
								height: 0,
								id: 0,
								show_src: '',
								width: 0
							},
							file_id: '',
							id: '',
							title: '暂无数据'
						};
					}
				});
			},
			async set_imginfo() {
				//设置图片展现形式
				let system = await uni.pro.getSystemInfo();
				this.info.info.cover.imgheight = parseFloat(uni.utils.set_imgh(this.info.info.cover.width, this.info
					.info.cover.height, system.windowWidth)).toFixed(2) + 'px';
				this.$nextTick(() => {
					this.loading = 4;
				})
			},
			async collect_fastOneSyn() {
				let res = await uni.ajax.collect_fastOneSyn({
					with_id: this.with_id,
					id: this.id,
				});
				if (res) {
					this.close();
					this.syninfo = res.data;
					this.show = true;
				}
			},
			async syn() {
				let res = await uni.ajax.collect_synFastSyn({
					with_id: this.with_id,
					id: this.id,
					num: this.number
				});
				if (res) {
					this.close();
					
					if(this.info.data.syn_type==2&&this.number>1){
						let arr=[];
						res.data.forEach(item=>{
							let index=arr.indexOf(item);
							if(index==-1){
								item.num=1;
								arr.push(item)
							}else{
								arr[index].num=arr[index].num+1;
							}
						})
						this.syninfo = arr;
						this.binshow = true;
					}else{
					   this.syninfo = res.data;
					   this.show = true;	
					}
					
					this.collect_getFuseListById();
					
				}
			},
			
			/**
			 * 队列合成
			 */
			time_fn(type) {
				uni.showLoading({
					title: "合成中..."
				})
				this.collect_synGet();
				this.count=2;
				this.time = setInterval(() => {
					if (this.count < 15) {
						this.collect_synGet();
						this.count=this.count+1;
					}else{
						this.count=1;
						clearInterval(this.time);
						uni.hideLoading();
					}
				}, 500)
			},
			async collect_synQueue() {
				if(this.count!=1){
					return false;
				}
				this.syninfo=[];
				let res = await uni.ajax.collect_synQueue({
					with_id: this.with_id,
					id: this.id,
					num:this.number
				});
				if (res) {
					this.no=res.data.no;
					this.time_fn();
				}
			},
			async collect_synGet(){
				let res=await uni.ajax.collect_synGet({
					no:this.no
				});
				if (!uni.utils.isArray(res.data)&&typeof(res.data)=='object') {
					uni.hideLoading();
					clearInterval(this.time);
					this.syninfo.push(res.data.synInfo.goods);
					this.show = true;
					this.no="";
					this.count=1;
				}
			},
			
		}
	};
</script>

<style lang="scss">
	.synthesisdetails {
		padding-bottom: 144rpx;

		.bin-box {
			.list-item {
				padding: 0rpx 32rpx;
				border-bottom: 1rpx solid #F0F0F0;
				height: 88rpx;
				flex: 1;

				.list-item-t {
					font-size: 24rpx;
					color: #000000;
				}
				.list-item-t1{
					width: 400rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}

			.bin-scroll {

				width: 600rpx;
				height: 600rpx;


			}
		}


		.btnsee {
			min-width: 320rpx;
			background: url('@/static/else/old01.png') no-repeat 100%;
			height: 88rpx;
			border-radius: 16rpx;
			box-sizing: border-box;
			color: #fdf6ec;
			margin-bottom: 24rpx;
		}

		.reward-mask {
			z-index: 99;
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0rpx;
			top: 0rpx;
			background: rgba(0, 0, 0, 0.5);
			overflow: hidden;
			overflow-x: scroll;
			flex-wrap: nowrap;

			.iswiper-box {
				background: #FFFFFF;
				border-radius: 24rpx;
				margin: 0rpx 16rpx;
			}

			animation: mask 1s ease;
		}

		@keyframes mask {
			0% {
				opacity: 0;
				/*从0度开始*/
			}

			100% {
				opacity: 1;
			}


		}

		.popup-box {
			width: 90vw;
			background: #ffffff;
			border-radius: 24rpx;

			.form-box {
				padding: 30rpx;

				.i-box {
					height: 100rpx;

					.i-label {
						font-size: 30rpx;
						color: #000;
						font-weight: bold;
					}

					.i-input {
						font-size: 30rpx;
						color: #000;
						font-weight: bold;

						/deep/input {
							border: 1rpx solid #ccc;
							width: 25%;
							text-align: center;
							border-radius: 6rpx;
							margin: 0rpx 16rpx;
							height: 66rpx;
						}
					}
				}

				.btn {
					margin: auto;
					background: url('@/static/else/old01.png') no-repeat 100%;
					border-radius: 24rpx;
					font-size: 32rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					height: 88rpx;
					width: 100%;
				}

			}

			.title {
				font-size: 30rpx;
				font-weight: bold;
				height: 100rpx;
			}
		}

		.header-box {
			width: 100%;

			.icon {
				width: 100%;
			}
		}

		.f-box {
			background-color: #fff;
			position: fixed;
			bottom: 0rpx;
			height: 144rpx;
			width: 100%;
			padding: 0rpx 32rpx;
			box-sizing: border-box;
			left: 0rpx;
			box-shadow: 0px -4rpx 32rpx 0px rgba(0, 0, 0, 0.08);

			.btn {
				flex: 1;
				height: 96rpx;
				border-radius: 24rpx;
				background: url('@/static/else/old01.png') no-repeat 100%;
				color: #fff;
				font-size: 30rpx;
			}

			.btn_gray {
				background: #cccccc;
			}

			.time-box {
				.icon {
					width: 300rpx;
					height: 300rpx;
				}

				.time {
					@include flex;
					align-items: center;
					padding-left: 16rpx;

					&__custom {
						width: 22px;
						height: 22px;
						border: 2rpx solid #e5e5e5;
						background: #f5f5f5;
						border-radius: 4px;
						/* #ifndef APP-NVUE */
						display: flex;
						/* #endif */
						justify-content: center;
						align-items: center;

						&__item {
							color: #fe3333;
							font-size: 12px;
							text-align: center;
						}
					}

					&__doc {
						color: $u-primary;
						padding: 0px 4px;
					}

					&__item {
						color: #606266;
						font-size: 15px;
						margin-right: 4px;
					}
				}

				.t1 {
					margin-top: 24rpx;
					font-size: 32rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
				}

				.t2 {
					margin-top: 32rpx;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				}
			}
		}

		.content {
			padding: 24rpx 32rpx;
			width: 100%;
			box-sizing: border-box;

			.desc-box {
				margin-bottom: 24rpx;
				background-color: #fff;
				border-radius: 32rpx;
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.04);

				.card-box {
					width: 100%;
					margin-top: 24rpx;

					.card-info {
						width: 22%;
						margin-right: 3%;
						margin-bottom: 24rpx;

						.icon-box {
							width: 140rpx;
							height: 140rpx;
							border-radius: 24rpx;
							overflow: hidden;
							position: relative;

							.icon {
								width: 100%;
								height: 100%;
							}

							.mask {
								position: absolute;
								width: 100%;
								height: 100%;
								left: 0rpx;
								top: 0rpx;
								background: rgba(0, 0, 0, 0.4);

								.lock {
									width: 60rpx;
									height: 60rpx;
								}
							}
						}

						.t1 {
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-top: 8rpx;
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
						}

						.t2 {
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
						}
					}
				}

				.title {
					.t1 {
						font-size: 32rpx;
						font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: bold;
						color: #000000;
					}
				}

				.desc-t {
					margin-top: 8rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					text-align: justify;
				}

				.tips {
					margin-top: 16rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #fe3333;
				}
			}
		}
	}
</style>