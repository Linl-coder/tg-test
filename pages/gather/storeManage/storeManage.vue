<template>
	<view class="basic_wrap">
		<!-- store manager info -->
		<view class="store_manager_info_box flex-center">
			<view class="">
				<view class="store_manager_avatar flex-center">
					<image :src="user_info.avatar?handleImgUrl(user_info.avatar):'/static/else/avatar.png'"
						mode="heightFix">
					</image>
					<text>{{user_info.nickname}}</text>
				</view>
				<!-- <view class="store_manager_name">
					<text>罗威@店长</text>
				</view> -->
			</view>
		</view>
		<!-- my goods stock -->
		<view class="my_card_box">
			<view class="my_card_box_title color_w bold">
				<p>{{$t('storeManage.myGoodsStock')}}</p>
			</view>
			<view class="">
				<u-tabs :list="list1" @click="click" lineColor="#E7D9BD"
					:activeStyle="{color: '#fff',fontWeight: 'bold',transform: 'scale(1.2)'}"
					:inactiveStyle="{color: '#fff'}"></u-tabs>
			</view>

			<!-- 内容 -->
			<view class="card_content_box color_w">
				<!-- 内容信息 -->
				<view class="">
					<!-- 当点击第一个tab的时候 -->
					<view class="page_item" v-if="tabCur===0">
						<view class="card_item flex-between" v-for="(item,index) in cardListAll" :key="index">
							<view class="card_item_img flex-center">
								<image :src="handleImgUrl(item.pool.cover.show_src)" mode="heightFix"></image>
							</view>
							<view class="card_item_price flex-colum-evenly">
								<p>{{item.pool.title}}</p>
								<!-- {{item.pool.price}} -->
								<p class="bold">${{item.pool.price}}/{{$t('utils.ticket')}}</p>
								<p style="font-size: 24rpx;color: #ccc;">{{$t('storeManage.stock')}}:
									{{item.think_count}}
								</p>
							</view>
							<!-- {{item}} -->
							<view class="card_item_btn flex-colum-evenly">
								<view class="btn flex-center">
									<p class="flex-center"
										@click="openUseModal(item.pool.cover.show_src,item.think_count,index)">
										{{$t('storeManage.use')}}
									</p>
								</view>
								<view class="btn flex-center">
									<p class="flex-center" @click="to_giving(index)">{{$t('storeManage.transfer')}}</p>
								</view>
							</view>
						</view>
						<u-empty v-show="cardListAll.length==0" text="No data..." mode="list"></u-empty>

					</view>
					<!-- 当点击第二个tab的时候 -->
					<view class="page_item" v-if="tabCur===1">
						<view class="card_item flex-between" v-for="(item,index) in cardListAll" :key="index">
							<view class="card_item_img flex-center">
								<image :src="handleImgUrl(item.pool.cover.show_src)" mode="heightFix"></image>
							</view>
							<view class="card_item_price flex-colum-evenly">
								<p>{{item.pool.title}}</p>
								<p class="bold">${{item.pool.price}}/{{$t('utils.ticket')}}</p>
								<p style="font-size: 24rpx;color: #ccc;">{{$t('storeManage.stock')}}:
									{{item.think_count}}
								</p>
							</view>
							<view class="card_item_btn flex-colum-evenly">
								<view class="btn flex-center">
									<p class="flex-center"
										@click="openUseModal(item.pool.cover.show_src,item.think_count,index)">
										{{$t('storeManage.use')}}
									</p>
								</view>
								<view class="btn flex-center">
									<p class="flex-center" @click="to_giving(index)">{{$t('storeManage.transfer')}}</p>
								</view>
							</view>
						</view>
						<u-empty v-show="cardListAll.length==0" text="No data..." mode="list"></u-empty>

					</view>


				</view>


			</view>
		</view>
		<!-- use card modal -->
		<u-modal :show="show" :showConfirmButton="false" :title="title" :closeOnClickOverlay="true" @close="closeModal">
			<view class="cancel_icon" @click="show=false">
				<u-icon name="close" color="#333333" size="22"></u-icon>
			</view>
			<view class="modal_box flex-colum-evenly">
				<view class="flex-evenly">
					<view class="cardImg_box flex-center">
						<image :src="handleImgUrl(cardImgUrl)" mode="heightFix"></image>
					</view>
					<view class="operate flex-colum-evenly">
						<p>{{$t('storeManage.totol')}}:{{cardTotolNum}} {{$t('utils.ticket')}}</p>
						<u-number-box button-size="25" integer :min="1" :max="cardTotolNum" v-model="value"
							@change="valChange"></u-number-box>
					</view>
				</view>
				<!-- <view class="stock_num">
					<text>25张</text>
				</view> -->

				<!-- 自定义按钮 -->
				<view class="confirmBtn flex-center">
					<button class="custom-button flex-center" @click="confirmUse">{{$t('storeManage.useNow')}}</button>
				</view>
			</view>
		</u-modal>

	</view>
</template>

<script>
	import {
		pages
	} from '@/common/mixins/index.js';
	import debounce from 'lodash/debounce';
	export default {
		mixins: [pages],
		data() {
			return {
				show: false,
				title: this.$t('storeManage.cardUse'),
				content: `空山新雨后<br>
									天气晚来秋`,
				tabCur: 0,
				list1: [{
					name: this.$t('storeManage.all'),
				}, {
					name: this.$t('storeManage.boredCard'),
				}],
				pages: [{
						text: "全部信息"
					},
					{
						text: "水果"
					}
				],
				cardListAll: [],
				cardListMonkey: [],
				cardImgUrl: "",
				value: 1,
				cardTotolNum: 0,
				index: ''
			};
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
		},
		onLoad(option) {},
		onShow() {
			this.collect_saleGetMyList();
			uni.setNavigationBarTitle({
				title: this.$t('storeManage.storeManage')
			})
		},
		// mounted() {
		// 	this.collect_saleGetMyList();
		// },
		methods: {
			async useCard() {
				uni.setStorageSync('cur', '3');
				let res = await uni.ajax.agentUseCard({
					card_num: this.value,
					pool_id: this.cardListAll[this.index].pool_id
				});
				console.log("使用卡片结果==>", res);
				if (res.code == 200) {
					// uni.showToast({
					// 	title: this.$t('storeManage.cardUseSuccess'),

					// })

					uni.$u.toast(this.$t('storeManage.cardUseSuccess'));
					this.show = false;
					this.collect_saleGetMyList();
				} else {
					this.show = false;
				}
			},
			closeModal() {
				this.show = false;
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
				this.value = e.value;
			},
			// confirmUse() {
			// 	//this.show = false;
			// 	this.useCard();
			// },
			confirmUse: debounce(function() {
				// 要实现的业务逻辑
				this.useCard();
			}, 2000, {
				leading: true,
				trailing: false
			}),
			//弹出使用卡片弹框
			openUseModal(cardImg, cardNum, index) {
				this.show = true;
				this.cardImgUrl = cardImg;
				this.cardTotolNum = cardNum;
				this.index = index;
				//console.log("cardImgUrl==>", this.cardImgUrl);

			},
			to_giving(index) { //转赠
				let info = {
					//id: this.cardListAll[index].pool.id,
					think_count: this.cardListAll[index].think_count,
					pool_id: this.cardListAll[index].pool_id,
					name: this.cardListAll[index].pool.title,
					img: this.cardListAll[index].pool.cover.show_src,
					buy_type: 1
				}
				uni.setStorage({
					key: 'giving_info',
					data: info,
					success: () => {
						this.topage(`gather/giving?index=${index}`);
					}
				});
			},
			async collect_saleGetMyList() {
				//卡牌
				let res = await uni.ajax.collect_saleGetMyList({
					limit: uni.conf.limit,
					page: this.page,
					title: '',
					data_type: 2
				});
				if (res) {
					// console.log("我的卡牌res==>", res);
					this.cardListAll = res.data.list;
					// this.FormData_null(res.data.list);
					// this.$refs.mycollectlist.setData(res.data.list);
					// this.setPagedata('', 'list', res.data.list, 'collect_saleGetMyList', false);
					// if (is_onPullDownRefresh) {
					// 	await uni.utils.sleep(500);
					// 	uni.stopPullDownRefresh();
					// }
				}
			},
			click(item) {
				//console.log('item', item);
				this.tabCur = item.index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-tabs__wrapper__nav {
		gap: 40rpx;
	}

	/deep/.u-number-box__input {
		width: 90rpx !important;
	}

	// /deep/.u-icon__icon span {
	// 	font-family: uicon-iconfont !important;
	// }
	/deep/.u-modal {
		position: relative;
	}

	.cancel_icon {
		//background: red;
		height: 36rpx;
		position: absolute;
		top: 40rpx;
		right: 40rpx;
	}

	.modal_box {
		width: 100%;
		height: 250rpx;
		//background: red;

		.cardImg_box {
			image {
				height: 110rpx;
			}
		}

		.operate {
			height: 110rpx;
			align-self: flex-end;
			// background: yellow;

			p {
				font-size: 24rpx;
			}
		}

		.stock_num {
			align-self: flex-end;
		}
	}

	.confirmBtn {}

	.custom-button {
		width: 450rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: #fff;
		background: #393939;
	}

	.basic_wrap {
		width: 100%;
		/* #ifdef APP-PLUS */
		min-height: calc(100vh - env(safe-area-inset-top));
		/* #endif */
		/* #ifdef H5 */
		min-height: calc(100vh - 44px - env(safe-area-inset-top));
		/* #endif */
		//height: 100vh;
		background: #393939;
		padding: 0 20rpx;

		.store_manager_info_box {
			width: 100%;
			// height: 300rpx;
			//background: red;

			view {
				width: 80%;
				// height: 100%;
				//background: yellow;

				.store_manager_avatar {
					width: 170rpx;
					// height: 200rpx;
					margin: 52rpx auto 0;
					//background: blue;

					image,
					text {
						display: block;
					}

					image {

						height: 140rpx;

					}

					text {
						margin-top: 20rpx;
						font-size: 30rpx;
						color: #fff;
					}
				}

				//.store_manager_name {}
			}
		}

		.my_card_box {
			width: 100%;
			margin-top: 72rpx;
			//background: yellow;

			.my_card_box_title {
				font-size: 32rpx;
			}

			.card_content_box {
				.card_item {
					width: 100%;
					height: 220rpx;
					//border-radius: 20rpx;
					padding: 0 17rpx;
					margin-top: 20rpx;
					background-color: rgba(255, 255, 255, 0.2);

					.card_item_img {
						width: 180rpx;
						//background: yellow;

						image {
							width: 160rpx;
							height: 140rpx;
							//background: red;
						}
					}

					.card_item_price {
						flex: 2;
						height: 140rpx;
						font-size: 28rpx;
						//background: red;
					}

					.card_item_btn {
						flex: 1.6;
						height: 200rpx;

						//background: red;

						.btn {
							width: 100%;
							height: 100%;
							font-size: 30rpx;
							//background: yellow;

							// button {
							// 	width: 206rpx;
							// 	height: 66rpx;
							// 	font-size: 28rpx;
							// }
							p {
								width: 100%;
								padding: 15rpx 20rpx;
								background: #fff;
								color: #000;
								border-radius: 10rpx;
							}
						}
					}
				}
			}

		}
	}
</style>