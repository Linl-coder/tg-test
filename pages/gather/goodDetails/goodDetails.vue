<template>
	<view class="wrap">
		<u-swiper :list="imgList" @change="change" imgMode="aspectFit" height="320" :autoplay="false"
			indicatorStyle="right: 20px">
			<view slot="indicator" class="indicator-num flex-center">
				<text class="indicator-num__text flex-center">{{ currentNum}}/{{ imgList.length}}</text>

			</view>
		</u-swiper>
		<!-- goods price and details -->
		<view class="goodsDetails_box">
			<view class="goodsDetails_box_item ">
				<view class="goods_price bold df alc">
					<text style="color: red;font-size: 40rpx;margin-right: 4rpx;"
						v-show="goods_price_type==='USD'">$</text>
					<u-icon name="/static/btn/gem-icon1.png" size='16' v-show="goods_price_type!=='USD'"></u-icon>
					<span>{{goodsDetail.goods_price}}</span>
				</view>
				<view class="goods_details">
					{{goodsDetail.goods_name}}
				</view>
				<view class="goods_tip flex-between">
					<p>{{goodsDetail.goods_desc?goodsDetail.goods_desc:""}}</p>
					<p>{{$t('goodDetails.freeShipping')}}
						<text style="color: red;font-size: 20rpx;">({{$t('goodDetails.shippingTip')}})</text>
					</p>
				</view>
			</view>
		</view>
		<!-- give container-->
		<view class="give_box goodsDetails_box" v-show="index==0">
			<view class="give_box_item goodsDetails_box_item flex-colum-between">
				<view class="give_title flex-start">
					<view class="color">

					</view>
					<view class="text flex-center bold">
						{{$t('goodDetails.give')}}
					</view>
				</view>
				<view class="give_goods_box flex-start">
					<view class="good_img flex-center">
						<image src="/static/Continent/modal_moneky.png" mode="heightFix"></image>
					</view>
					<view class="good_content flex-colum-evenly bold">
						<p>{{$t('goodDetails.giveGoods')}}</p>
						<p class="flex-center">{{$t('goodDetails.starCard')}}</p>
					</view>
				</view>
			</view>
		</view>
		<!-- Return and exchange instructions cell-->
		<view class="returnIntro_box goodsDetails_box" v-show="index==0">
			<view class="returnIntro_box_item goodsDetails_box_item">
				<u-cell-group :border="false">
					<u-cell icon="setting-fill" :title="$t('goodDetails.returnIntro')" :isLink="true"
						@click="showModal=true"></u-cell>
				</u-cell-group>
			</view>
		</view>
		<!-- goods long picture -->
		<view class="goods_pic_box" v-show="index!=0">
			<view class="goods_pic_main">
				<view class="goods_pic_main_title flex-center">
					<p>{{$t('goodDetails.goodDetails')}}</p>
				</view>
				<view class="goods_pic_main_pic flex-center">
					<image :src="handleImgUrl(this.goodsDetail.detail_img_url)" mode="aspectFit"></image>
					<!-- <view class="content_box flex-colum-start" v-show="index==0">
						<view class="title color_w">
							<p>{{$t('goodDetails.ape')}}</p>
							<p>{{$t('goodDetails.flashCard')}}</p>
						</view>
						<view class="title_tip">
							{{$t('goodDetails.apeTip')}}
						</view>
					</view> -->
				</view>
				<!-- <view class="goods_pic_main_pic flex-center">
					<image :src="handleImgUrl(this.goodsDetail.detail_img_url)" mode="widthFix"></image>
				</view> -->
			</view>
		</view>
		<view class="seven_monkey_card_box" v-show="index==0">
			<view class="seven_monkey_card">
				<view class="seven_monkey_card_inner flex-colum-between">
					<view class="top">
						<view class="text">
							<p>APE CARDx7</p>
							<p>{{$t("goodDetails.canJoin")}}</p>
						</view>
						<view class="img">
							<image src="/static/homepage/sevenMonCard.png" mode="heightFix"></image>
						</view>
					</view>
					<view class="bottom ">
						<view class="title color_w">
							{{$t("goodDetails.goodsInfo")}}
						</view>

						<view class="content flex-between">
							<view class="left_card">
								<image src="/static/homepage/left_card.png" mode="heightFix"></image>
							</view>
							<view class="right_details">
								<p>
									<text>{{$t("goodDetails.label1")}} </text>
									<text> </text>
									<text> {{$t("goodDetails.text1")}}</text>
								</p>
								<p>
									<text>{{$t("goodDetails.label2")}}</text>
									<text></text>
									<text>PTE& {{$t("goodDetails.text2")}}</text>
								</p>
								<p>
									<text>{{$t("goodDetails.label3")}}</text>
									<text></text>
									<text>62*87mm</text>
								</p>
								<p>
									<text>{{$t("goodDetails.label4")}}</text>
									<text> </text>
									<text>350g{{$t("goodDetails.text4")}}</text>
								</p>
								<p>
									<text>{{$t("goodDetails.label5")}}</text>
									<text> </text>
									<text>2024{{$t("utils.year")}}3{{$t("goodDetails.text5")}}</text>
								</p>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="goods_info_box" v-show="index==0">
			<view class="goods_info">
				<view class="title">
					{{$t("goodDetails.goodsInfo")}}
				</view>
				<view class="content">
					<p>
						<text>{{$t("goodDetails.label1")}} </text>
						<text>:</text>
						<text> {{$t("goodDetails.text1")}}</text>
					</p>
					<p>
						<text>{{$t("goodDetails.label2")}}</text>
						<text>:</text>
						<text>PTE& {{$t("goodDetails.text2")}}</text>
					</p>
					<p>
						<text>{{$t("goodDetails.label3")}}</text>
						<text>:</text>
						<text>62*87mm</text>
					</p>
					<p>
						<text>{{$t("goodDetails.label4")}}</text>
						<text>: </text>
						<text>350g{{$t("goodDetails.text4")}}</text>
					</p>
					<p>
						<text>{{$t("goodDetails.label5")}}</text>
						<text>: </text>
						<text>2024{{$t("utils.year")}}3{{$t("goodDetails.text5")}}</text>
					</p>
				</view>
			</view>
		</view> -->
		<view class="b1_bg_box" v-show="index==0">
			<view class="b1_bg">
			</view>
		</view>
		<view class="b2_bg_box" v-show="index==0">
			<view class="b2_bg">
			</view>
		</view>
		<!-- Future planning -->
		<view class="future_box" v-show="index==0">
			<view class="future">
				<!-- <view class="title bold ">
					超级想象
				</view> -->
				<view class="plan_details">
					<view class="threePlan color_w">
						<p class="flex-center ">JJhub{{$t('goodDetails.threeYearsPlan')}}</p>
					</view>
					<!-- <view class="year_plan_box flex-start">
						<view class="steps">
							<cc-defineStep :colors="colors" :stepData="stepData"></cc-defineStep>
						</view>
					</view> -->
					<view class="plan_details_steps_bg ">
						<view class="step_left">
							<p>{{$t('goodDetails.step1')}}</p>
							<p>JJhub{{$t('goodDetails.step2')}}</p>
							<p>IP{{$t('goodDetails.step3')}}</p>
							<p>{{$t('goodDetails.step4')}}</p>
						</view>
						<view class="step_right">
							<p>{{$t('goodDetails.step5')}}</p>
							<p>{{$t('goodDetails.step6')}}</p>
							<p>JJhub{{$t('goodDetails.step7')}}</p>
							<p class="text4">JJhub {{$t('goodDetails.step9')}}</p>
							<p>{{$t('goodDetails.step10')}}</p>
						</view>
					</view>
				</view>
				<!-- <view class="flex-colum-evenly">
					<view class="year_plan flex-colum-evenly">
						<p>
							2024年
						</p>
						<p>预计销量突破5000万张</p>
					</view>
					<view class="year_plan flex-colum-evenly">
						<p>
							2025年
						</p>
						<p>陆续开放至50个国家</p>
						<p>合作100位主播及明星带货</p>
						<p>全系联名闪卡销量突破1亿张</p>
					</view>
					<view class="year_plan flex-colum-evenly">
						<p>
							2026年
						</p>
						<p>全系联名闪卡销量突破2亿张</p>
					</view>
				</view> -->
			</view>
		</view>
		<!-- buy goods button -->
		<view class="buyBtn_box flex-center bg_w" v-show="index!=0">
			<button class="flex-center bold" @click="buyNow">{{$t('goodDetails.buyNow')}}</button>
		</view>
		<!-- buy card button -->
		<view class="buyBtn_card_box flex-center bg_w" v-show="index==0">
			<view class="buyBtn  bold flex-center" @click="buy_popup = true">
				<view class="flex-colum-evenly">
					<p>{{$t('goodDetails.buyApeCard')}}</p>
					<p class="flex-center">{{$t('goodDetails.singleBuyOnce')}}</p>
				</view>
			</view>
		</view>
		<!-- 购买弹框 -->
		<u-popup :show="buy_popup" bgColor="transparent">
			<view class="buy_popup">
				<view class="buy_popup_top">
					<u-image :src="handleImgUrl(card_info.imgs[0])" width="212rpx" height="284rpx"
						radius="18rpx"></u-image>
					<view class="buy_name">
						<view>{{$t('mainland.spaceRabbitCard')}}</view>
						<view>
							<span>{{"$"}}</span>
							<span>{{card_info.price}}</span>
							<span>{{'('+$t('mainland.sigalBuyOnce')+')'}}</span>
						</view>
					</view>
					<u-icon name="close" @click="buy_popup = false" size="22"></u-icon>
				</view>

				<!-- 赠品 -->
				<!-- <view class="gift_box">
					<view class="gift_box_item flex-start">
						<view class="gift_moneky flex-center">
							<image src="/static/Continent/modal_moneky.png" mode="heightFix"></image>
						</view>
						<view class="gift_content bold flex-colum-between">
							<p>{{$t('mainland.boreCard')}}</p>
							<p>7{{$t('utils.ticket')}}</p>
						</view>
					</view>
				</view> -->
				<view class="buy_popup_num ">
					<view class="maximum_num flex-center" @click="current_quantity = 1">{{$t('index.plsSelectBuyNum')}}
					</view>
					<view class="number-box ">
						<view class="operate_btn flex-center"><u-icon name="minus" bold color="#030104"
								@click="operate('minus')"></u-icon></view>
						<view class="current_quantity flex-center">{{current_quantity}}</view>
						<view class="operate_btn flex-center"><u-icon name="plus" bold color="#030104"
								@click="operate('plus')"></u-icon></view>
					</view>
				</view>
				<view class="buy_popup_btn solo_out flex-center">
					<view class="buy_btn solo_out_btn bold flex-center" v-if="showOnlineBuyCard==0">
						<p>{{$t('mainland.onlineStoreBuy')}}</p>
						<p>
							<image src="/static/Continent/sold_out.png" mode="heightFix"></image>
						</p>
					</view>
					<view class="buy_btn online_buy bold flex-center" v-else>
						<p>{{$t('index.onlineBuy')}}</p>
					</view>
				</view>
				<view class="buy_popup_btn flex-center" @tap="topage('gather/mainland/shop_manager_item')">
					<view class="buy_btn bold flex-center">
						<!-- <text>立即购买</text>
						<text>限购5张,5张包邮</text> -->
						{{$t('mainland.findAgentBuy')}}
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 代理弹框 -->
		<view @touchmove.stop.prevent="preventHandler">
			<u-popup :show="show_agent_box" bgColor="transparent" round="40rpx" closeable
				@close="show_agent_box = false">
				<view class="goods_box">
					<view class="goods_box_title">
						{{$t('mainland.connectAgentBuy')}}
					</view>
					<view class="flex-between goods_list_all">
						<view class="all_shop_manager" @tap="topage('gather/mainland/shop_manager_item')">
							<u-icon name="arrow-right" color="#030104" size="24rpx" :label="$t('mainland.seeAllAgent')"
								label-color="#030104" label-size="24rpx" label-pos="left"></u-icon>
						</view>
						<!-- <u-icon @tap="shop_getApiList" name="/static/Continent/i40.png" color="#030104" width="36rpx"
			 				height="36rpx" size="28rpx" label="获取位置" label-size="28rpx" label-color="#030104"></u-icon> -->
					</view>
					<scroll-view scroll-y class="scroll">
						<view class="goods_box_item" v-for="(item,index) in agent_list" :key="index">
							<!-- {{item}} -->
							<view class="address flex-between">
								<text class="address_name">{{item.address||$t('mainland.noAddress')}}</text>
								<!-- <u-icon name="map" size="32rpx" color="#2C2C2C"
			 						:label="parseFloat(item.distance).toFixed(2)+'m'" labelSize="28rpx" labelColor="#00"
			 						labelPos="right"></u-icon> -->
							</view>
							<view class="shop_manager flex-start" v-if="item.user!=null">
								<u-avatar :src="item.user.avatar"></u-avatar>
								<view class="label_wid">{{$t('mainland.storeMana')}}</view>
								<u-icon name="/static/Continent/agent_icon.png" size="40rpx" :label="item.user.nickname"
									label-color="#999" label-size="28rpx"></u-icon>
							</view>
							<view class="contact_information">
								<view class="label_wid flex-center">
									{{$t('mainland.contactHe')}}
								</view>
								<view class="contact_list ">
									<view class="contact_information_list">
										<view class="contact_information_item " style="margin-right: 14rpx;">
											<u-icon name="/static/Continent/fb.png" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.facebook}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
												@click="copy(item.facebook)"></u-icon>
										</view>
										<view class="contact_information_item">
											<u-icon name="/static/Continent/zalo.png" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.zalo}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
												@click="copy(item.zalo)"></u-icon>
										</view>

									</view>
									<view class="contact_information_list">
										<view class="contact_information_item " style="margin-right: 14rpx;">
											<u-icon name="/static/Continent/tg.jpg" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.telegram}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
												@click="copy(item.telegram)"></u-icon>
										</view>
										<view class="contact_information_item">
											<u-icon name="/static/Continent/wa.jpg" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.whatsapp}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
												@click="copy(item.whatsapp)"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- <iloading :result="shop_result"></iloading> -->
						<!-- {{shop_result.length}} -->
						<u-empty v-show="!agent_list" mode="list">
						</u-empty>
					</scroll-view>
				</view>
			</u-popup>
		</view>

		<!-- 退换货说明弹框 -->
		<u-popup :show="showModal" :round="10" :closeable="true" mode="bottom" @close="close">
			<view class="exchangeIntro_box ">
				<view class="section_box flex-colum-evenly">
					<section>
						<view class="title bold">
							{{$t('goodDetails.introOne')}}
						</view>
						<view class="content">
							<li>{{$t('goodDetails.introOne_tip1')}}</li>
							<li>{{$t('goodDetails.introOne_tip2')}}</li>
							<!-- <li>·赠送方块兽超级充电器;预计12月底开始发货;</li> -->
						</view>
					</section>
					<section>
						<view class="title bold">
							{{$t('goodDetails.introTwo')}}
						</view>
						<view class="content">
							<li>{{$t('goodDetails.introTwo_tip1')}}</li>

						</view>
					</section>
					<!-- <section>
						<view class="title bold">
							{{$t('goodDetails.introThree')}}
						</view>
						<view class="content">
							<li>{{$t('goodDetails.introThree_tip1')}}
							</li>
						</view>
					</section> -->
				</view>
			</view>
			<view class="confirm_btn_box flex-center">
				<view class="btn flex-center" @click="showModal=false">
					{{$t('goodDetails.iKnow')}}
				</view>
			</view>
		</u-popup>
		<view class="bottom_intro" v-show="index==0">
			<view class="exchangeIntro_box ">

				<view class="section_box  ">
					<view class="intro_title bold">
						{{$t('goodDetails.returnIntro')}}
					</view>
					<section>
						<view class="title bold">
							{{$t('goodDetails.introOne')}}
						</view>
						<view class="content">
							<li>{{$t('goodDetails.introOne_tip1')}}</li>
							<li>{{$t('goodDetails.introOne_tip2')}}</li>
							<li>{{$t('goodDetails.introOne_tip3')}}</li>
							<!-- <li>·赠送方块兽超级充电器;预计12月底开始发货;</li> -->
						</view>
					</section>

					<section>
						<view class="title bold">
							{{$t('goodDetails.introTwo')}}
						</view>
						<view class="content">
							<li>{{$t('goodDetails.introTwo_tip1')}}</li>
						</view>
					</section>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsData from '@/common/goodsData/goodsData.js';
	export default {
		data() {
			return {
				list: [],
				currentNum: 1,
				goodsId: 0,
				goodsPrice: "",
				goodsName: "",
				backgroundImageUrl: "/static/else/old02.png",
				goodsDetail: {},
				goods_price_type: uni.getStorageSync('goods_price_type'),
				imgList: [],
				showModal: false,
				buy_popup: false, // 购买弹框
				show_agent_box: false, // 代理弹框
				index: '',
				card_info: {
					price: 0,
					imgs: []
				},
				agent_list: [],
				current_quantity: 7,
				colors: "#854CF0",
				//模拟后台返回的数据
				stepData: [{
						name: '2024' + ' ' + this.$t('utils.year'),
						time: this.$t('goodDetails.year1Tip'),
						isNow: 1,
						type: 1,
						// desc: '不想要了'
					},
					{
						name: '2025' + ' ' + this.$t('utils.year'),
						time: this.$t('goodDetails.year2Tip1'),
						time1: this.$t('goodDetails.year2Tip2'),
						time2: this.$t('goodDetails.year2Tip3'),
						isNow: 1,
						type: 1,
						//desc: '您的服务单已申请成功，待售后审核中'
					},
					{
						name: '2026' + ' ' + this.$t('utils.year'),
						time: this.$t('goodDetails.year3Tip1'),
						isNow: 1,
						type: 1,
						//desc: '您的售后单已收到，会在24小时与您联系。'
					},
				],
				showOnlineBuyCard: 0
			};
		},
		mounted() {
			//this.initImg();

		},
		onShow() {
			this.getGoodDetails();
			uni.setNavigationBarTitle({
				title: this.$t('goodDetails.goodDetails')
			})
			this.shop_getMinePool();
			// this.getAgentList();
		},
		onLoad(options) {
			console.log("商品详情id===>", options.id);
			this.goodsId = options.id;
			this.index = options.index;
			this.buy_popup = Boolean(options.showBuyModal);
			this.jugeShowOnlineCard();

		},
		computed: {
			totolPrice() {
				// return (this.num * this.goodsPrice).toFixed(2);
				return (this.current_quantity * 3);
			},

		},
		methods: {
			jugeShowOnlineCard() {
				this.showOnlineBuyCard = uni.getStorageSync('onlineBuyCard');
			},
			operate(type) {
				console.log(type);
				if (type == 'minus') {
					if (this.current_quantity > 1) {
						this.current_quantity -= 1
					}
				} else if (type == 'plus') {
					if (this.current_quantity < 10000) {
						this.current_quantity += 1
					}
				}
			},
			//获取代理列表
			async getAgentList() {
				let result = await uni.ajax.shop_getApiList({
					page: 1,
					limit: 30,
				})
				//console.log("result==>", result);
				if (result) {
					this.agent_list = result.data.list
				}
			},
			//获取卡牌信息
			async shop_getMinePool() {
				let res = await uni.ajax.shop_getMinePool()
				if (res) {
					this.card_info = {
						imgs: res.data.imgs.split(","),
						price: res.data.price
					}
				}
			},
			close() {
				this.showModal = false;
			},
			initImg() {
				const goodInfo = goodsData.filter((item) => {
					return item.id == this.goodsId;
				})
				//console.log("goodInfo", goodInfo);
				this.list.push(goodInfo[0].cover.show_src);
				this.goodsPrice = goodInfo[0].price;
				this.goodsName = goodInfo[0].title;
				//console.log("goodsPrice", this.goodsPrice);
			},
			//获取商品详情
			async getGoodDetails() {
				let res = await uni.ajax.getGoodsDetailsList({
					id: this.goodsId
				})
				if (Object.keys(res.data).length != 0) {
					console.log("商品详情列表", JSON.stringify(res.data.img_list));
					this.imgList = this.handleImgUrl(res.data.img_list);
					this.goodsDetail = res.data;
				}
			},
			buyNow() {
				uni.navigateTo({
					url: '/pages/gather/confirmOrder/confirmOrder?id=' + this.goodsId,
				})
			},
			change(index) {
				console.log("index", index);
				this.currentNum = index.current + 1;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-line {
		border: none !important;
	}

	.wrap {
		// padding: 20rpx 0;
		color: #000;
	}

	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.indicator-num {
		width: 100rpx;
		height: 48rpx;
		background: #000000;
		border-radius: 4px 4px 4px 4px;
		opacity: 0.4;
		//background: red;
	}

	.indicator-num__text {
		font-size: 32rpx;
		font-weight: 400;
		color: #FFFFFF;
		//background: transparent;
	}

	.bottom_intro {
		width: 100%;
		height: 900rpx;
		padding: 0 24rpx;
		//background: black;

		// margin-top: 200rpx;

		.exchangeIntro_box {
			width: 100%;
			height: 900rpx;
			// padding: 0 40rpx;
			background: #000;

			//padding: 20rpx 0 0 20rpx;
			.section_box {
				width: 100%;
				height: 800rpx;
				padding: 20rpx 20rpx 0 20rpx;

				section {
					margin-top: 40rpx;

					.title {
						color: #fff;
					}

					.content {
						color: #999;
					}
				}

				.intro_title {
					font-size: 36rpx;
					color: #fff;
				}
			}

		}
	}

	.exchangeIntro_box {
		width: 100%;
		height: 1200rpx;
		//padding: 80rpx 0 0 20rpx;

		.section_box {
			width: 100%;
			height: 900rpx;
			padding: 10rpx 0 0 20rpx;

			section {
				width: 100%;
				//height: 250rpx;
				letter-spacing: 1rpx;
				// margin-bottom: 60rpx;
				//background: red;

				.title {
					color: #333;
				}

				.content {
					margin-top: 20rpx;
					color: #666;
					font-size: 26rpx;
				}
			}
		}


	}

	.confirm_btn_box {
		width: 100%;
		height: 70rpx;
		padding: 0 20rpx;
		position: fixed;
		bottom: 60rpx;

		.btn {
			width: 100%;
			height: 70rpx;
			letter-spacing: 4rpx;
			color: #fff;
			border-radius: 30rpx;
			background: #333333;
		}
	}

	.goodsDetails_box {
		width: 100%;
		padding: 20rpx 24rpx;

		.goodsDetails_box_item {
			width: 100%;
			padding: 20rpx 32rpx 38rpx 30rpx;
			border-radius: 6px 6px 6px 6px;
			background: #fff;

			.goods_price {
				font-size: 52rpx;
				//font-family: Source Han Sans CN, Source Han Sans CN;
				font-weight: 800;
				color: #333333;

				span:nth-child(1) {
					font-size: 24rpx;
				}

				span:nth-child(2) {
					font-size: 44rpx;
					margin-left: 10rpx;
				}
			}

			.goods_details {
				margin-top: 10rpx;
				font-size: 32rpx;
				//font-family: Source Han Sans CN, Source Han Sans CN;
				font-weight: 500;
				color: #333333;
			}

			.goods_tip {
				//height: 60rpx;
				width: 100%;
				margin-top: 20rpx;
				//box-sizing: border-box;
				//background: yellow;

				p:nth-child(1) {
					width: fit-content;

					padding: 6rpx 15rpx;
					// width: 440rpx;
					height: 44rpx;
					background: #F6F6F6;
					border-radius: 2px 2px 2px 2px;
					font-size: 24rpx;
					font-weight: 500;
					color: #666666;
					//background: red;
				}

				p:nth-child(2) {
					//height: 100%;
					// margin-top: 20rpx;
					font-size: 24rpx;
					//font-family: Source Han Sans CN, Source Han Sans CN;
					font-weight: 500;
					color: #666666;
					//background: red;

				}
			}

		}
	}

	.give_box {
		padding-top: 0rpx;

		.give_box_item {
			height: 240rpx;
			// padding-bottom: 10rpx;

			.give_title {
				width: 100%;
				height: 38rpx;

				.color {
					width: 12rpx;
					height: 100%;
					background-color: #E7D9B7;
				}

				.text {
					height: 100%;
					margin-left: 12rpx;
					font-size: 32rpx;
				}
			}

			.give_goods_box {
				width: 100%;
				height: 130rpx;
				background: #F7F7F7;
				// padding: ;
				border-radius: 10rpx;

				>view {
					height: 100%;
					margin-left: 20rpx;
				}

				.good_img {
					image {
						height: 70rpx;
					}
				}

				.good_content {
					padding: 20rpx 0;

					P {
						gap: 20rpx;
					}

					p:nth-child(1) {
						font-size: 26rpx;
						letter-spacing: 1rpx;
					}

					// height: 100%;
					p:nth-child(2) {
						width: 160rpx;

						font-size: 22rpx;
						padding: 4rpx;
						border-radius: 6rpx;
						font-style: italic;
						color: #666;
						background: #C8C8C6;
					}
				}
			}
		}
	}

	.returnIntro_box {
		width: 100%;
		height: 100rpx;
		padding-top: 0rpx;
		//background: red;

		.returnIntro_box_item {
			height: 100%;
			padding-top: 0rpx;


		}


	}



	.goods_pic_box {
		width: 100%;
		//height: 300rpx;
		padding: 0 24rpx;

		// margin-top: 20rpx;
		//border-radius: 6px 6px 0px 0px;
		//background: #666666;
		.goods_pic_main {
			width: 100%;

			// background: #666666;

			.goods_pic_main_title {
				width: 100%;
				height: 90rpx;
				border-radius: 6px 6px 0px 0px;
				background: #FFFFFF;

				p {
					font-size: 28rpx;
					font-weight: bold;
				}
			}

			.goods_pic_main_pic {
				width: 100%;
				//min-height: 8500rpx;
				//min-height: 500rpx;
				height: 600rpx;
				padding: 40rpx;
				margin-bottom: 130rpx;
				background: #fff;
				//background: red;

				//@include backImg;
				image {
					height: 600rpx;
				}


				// image {
				// 	width: 100%;
				// 	height: 700rpx;
				// }
				.content_box {
					width: 100%;
					height: 400rpx;
					//font-family: PingFang SC;
					//background: red;

					.title {
						font-size: 86rpx;
						font-weight: bold;
						margin-bottom: 30rpx;
						background: linear-gradient(30deg, #DADAF6 20%, #FEFEFE 80%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;

					}

					.title_tip {
						font-size: 26rpx;
						color: #A8A6A9;
					}
				}
			}
		}
	}



	.seven_monkey_card_box {
		width: 100%;
		height: 600rpx;
		padding: 0 24rpx;
		//background-color: red;

		.seven_monkey_card {
			width: 100%;
			height: 100%;
			padding: 26rpx 34rpx;
			background-color: #000;

			.seven_monkey_card_inner {
				width: 100%;
				height: 100%;

				//background: red;
				.top {
					width: 100%;
					height: 160rpx;
					padding: 20rpx;
					display: flex;
					justify-content: space-between;
					background: url('/static/homepage/seven_bg.png');
					@include backImg;

					.text {
						align-self: center;

						p:nth-child(1) {
							font-size: 22rpx;
							color: #FFFFFF;
						}

						p:nth-child(2) {
							font-size: 18rpx;
							margin-top: 20rpx;
							color: #999999;
						}
					}

					.img {
						align-self: flex-end;
						//background: red;

						image {
							height: 90rpx
						}
					}


				}


				.bottom {
					width: 100%;
					height: 530rpx;
					//background: red;

					.title {
						margin: 40rpx 0;
						font-size: 35rpx;
						font-weight: bold;
					}

					.content {
						width: 100%;
						height: 240rpx;
						//background: yellow;

						.left_card {
							image {
								height: 230rpx;
							}
						}

						.right_details {
							width: 360rpx;

							p {
								margin-bottom: 14rpx;

								text:nth-child(1) {
									font-size: 28rpx;
									color: #fff;
								}

								text:nth-child(3) {
									font-size: 24rpx;
									color: #999;
								}
							}
						}

					}
				}


			}
		}
	}

	.goods_info_box {
		width: 100%;
		height: 360rpx;
		padding: 0 25rpx;

		.goods_info {
			width: 100%;
			height: 360rpx;
			background: url('/static/homepage/goodsInfo_bg.png');
			@include backImg;
			color: #fff;
			position: relative;
			padding-top: 20rpx;

			.title {
				font-size: 36rpx;
				font-weight: bold;
				margin-left: 30rpx;

			}

			.content {
				width: 360rpx;

				font-size: 26rpx;
				position: absolute;
				right: 10rpx;
				bottom: 50rpx;
				//background: red;

				p {
					margin-bottom: 14rpx;

					text:nth-child(1) {
						font-size: 26rpx;
					}

					text:nth-child(3) {
						font-size: 20rpx;
						color: #999;
					}
				}
			}
		}
	}

	.b1_bg_box {
		width: 100%;
		height: 760rpx;
		padding: 0 25rpx;

		.b1_bg {
			width: 100%;
			height: 760rpx;
			background: url('/static/homepage/b2.png');
			@include backImg;
		}

	}

	.b2_bg_box {
		width: 100%;
		height: 960rpx;
		padding: 0 25rpx;

		.b2_bg {
			width: 100%;
			height: 960rpx;
			background: url('/static/homepage/b1.jpg');
			@include backImg;
		}

	}


	.future_box {
		width: 100%;
		height: 1000rpx;
		padding: 40rpx 24rpx;
		padding-top: 0;
		//background: #000000;
		margin-bottom: 300rpx;
		position: relative;

		.future {
			width: 100%;
			height: 1300rpx;
			background-image: url('/static/homepage/futurePlan2.jpg');
			@include backImg;
			// padding: 0 30rpx;
			padding-top: 100rpx;


			.title {
				font-size: 72rpx;
				position: absolute;
				top: 0;
				color: #333;
				// margin-top: -60rpx;
			}

			.plan_details {
				width: 100%;
				height: 1200rpx;
				padding: 0 30rpx;
				//background: red;

				.plan_details_steps_bg {
					width: 100%;
					height: 1100rpx;
					background: url('/static/homepage/steps_bg.png');
					@include backImg;
					display: flex;
					font-size: 20rpx;

					.step_left {
						margin-top: 190rpx;
						margin-left: 30rpx;

						p:nth-child(2) {
							margin-top: 260rpx;
						}

						p:nth-child(3) {
							font-size: 18rpx;
							margin-top: 130rpx;
						}

						p:nth-child(4) {
							margin-right: 50rpx;
							margin-top: 260rpx;
							font-size: 16rpx;
						}
					}

					.step_right {
						margin-top: 130rpx;
						margin-left: 30rpx;

						p:nth-child(2) {
							margin-top: 120rpx;
						}

						p:nth-child(3) {
							margin-top: 264rpx;
						}

						.text4 {
							font-size: 18rpx;
							margin-right: 40rpx;
							margin-top: 120rpx;
						}

						p:nth-child(5) {
							margin-right: 30rpx;
							margin-top: 250rpx;
							font-size: 16rpx;
							// font-size: 16rpx;
						}
					}
				}







				.threePlan {
					//width: unset;

					p {
						width: 350rpx;
						padding: 10rpx;
						font-weight: bold;
						font-size: 50rpx;
						background: linear-gradient(to right, #585FF5, #804DF2);
					}
				}

				.year_plan_box {
					height: 600rpx;
					margin-top: 40rpx;
					//background: blue;

					.year_plan {
						height: 180rpx;
						//padding: 0 30rpx;
						//background: yellow;

						p {
							color: #BCB9E8;

							div {
								width: 30rpx;
								height: 30rpx;
								background: red;
							}
						}

						p:nth-child(1) {
							color: #fff;
						}


						// p:nth-child(2) {
						// 	color: #BCB9E8;
						// }
					}

					.year_plan:nth-child(2) {
						height: 240rpx;
					}
				}
			}

		}
	}


	.buyBtn_box {
		width: 100%;
		height: 120rpx;
		position: fixed;
		padding: 20rpx 20rpx;
		bottom: 0;


		button {
			width: 100%;
			height: 80rpx;
			color: #fff;
			font-size: 28rpx;
			letter-spacing: 4rpx;
			//font-family: Source Han Sans CN, Source Han Sans CN;
			background: #333333;

		}
	}

	.buyBtn_card_box {
		width: 100%;
		height: 160rpx;
		position: fixed;
		padding: 20rpx 20rpx;
		bottom: 0;


		.buyBtn {
			width: 100%;
			height: 110rpx;
			background-image: url('/static/btn/yuankabaoshi.png');
			@include backImg;
			//background: red;

			>view {
				height: 100%;
				letter-spacing: 1rpx;

				//background: blue;
				p:nth-child(1) {
					font-size: 32rpx;
					font-weight: bold;
				}

				p:nth-child(2) {
					font-size: 22rpx;
				}
			}

		}
	}

	.buy_popup {
		width: 750rpx;
		height: 640rpx;
		background: url('/static/Continent/pop_top.png');
		@include backImg;
		//background: red;

		.buy_popup_top {
			margin-top: -76rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			//background: red;

			.buy_name {
				padding: 0 0 10rpx 18rpx;
				margin-right: auto;
				align-self: flex-end;
				margin-bottom: 10rpx;

				>:nth-of-type(1) {
					color: #030104;
					font-size: 36rpx;
					font-weight: 600;
					//margin-top: 60rpx;

				}

				>:nth-of-type(2) {
					width: fit-content;
					margin-top: 10rpx;
					padding: 10rpx 0;
					border-radius: 4rpx;
					// background: #D8D8D8;
					color: #333;
					font-size: 24rpx;
					line-height: 22rpx;
					font-weight: 400;

					span:nth-child(1) {
						font-size: 22rpx;
						color: #333;
						font-weight: bold;
					}

					span:nth-child(2) {
						color: #333;
						margin-left: 5rpx;
						font-size: 34rpx;
						font-weight: bold;
					}

					span:nth-child(3) {
						margin-left: 20rpx;
						font-size: 22rpx;
					}
				}
			}
		}

		.gift_box {
			width: 100%;
			height: 130rpx;
			margin: 20rpx 0 10rpx 0;
			padding: 10rpx 20rpx;

			//background: red;
			.gift_box_item {
				width: 300rpx;
				height: 100%;
				background: #fff;
				padding: 0 10rpx;

				.gift_moneky {
					image {
						height: 65rpx;
					}
				}

				.gift_content {
					//background: red;
					height: 70rpx;

					margin-left: 10rpx;
					font-size: 26rpx;

					p:nth-child(1) {
						font-size: 24rpx;
					}

					p:nth-child(2) {
						font-size: 22rpx;
					}
				}
			}
		}

		.materials {
			margin-top: 20rpx;
			padding: 0 18rpx;
			display: flex;
			justify-content: space-between;

			.materials_item {
				padding: 0 20rpx;
				background-color: #fff;
				border-radius: 16rpx;
				width: 350rpx;
				height: 128rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				.materials_item_info {
					padding-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					color: #030104;
					//font-family: PingFang SC;
					font-size: 28rpx;
					font-weight: 600;
				}
			}
		}

		.buy_popup_num {
			margin-top: 30rpx;
			padding: 20rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;

			.number-box {
				width: 370rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.operate_btn {
					width: 60rpx;
					height: 60rpx;
					// border: 2rpx solid #ccc;
					border-radius: 8rpx;
				}

				.current_quantity {
					color: #333;
					width: 200rpx;
					height: 60rpx;
					//font-family: PingFang SC;
					// border: 2rpx solid #ccc;
					font-size: 40rpx;
					font-style: normal;
					// font-weight: 600;
					line-height: 40rpx;
					background: #F5F5F5;
				}
			}

			.maximum_num {
				width: 288rpx;
				height: 60rpx;
				// border: 2rpx solid #030104;
				border-radius: 8rpx;
				color: #000;
				//font-family: PingFang SC;
				font-size: 32rpx;
				font-weight: 400;
			}
		}

		.buy_popup_btn {
			margin-top: 30rpx;
			background-color: #fff;
			// padding: 48rpx 26rpx 76rpx;

			.buy_btn {
				display: flex;
				flex-direction: column;
				width: 698rpx;
				height: 106rpx;
				border-radius: 8rpx;
				letter-spacing: 1rpx;
				background-image: url('../../../static/btn/yuankabaoshi.png');
				@include backImg;
				font-size: 34rpx;
				//background: red;
				// background: var(--linear-gradient-theme);
				// box-shadow: var(--btn-shadow);
				position: relative;

				>text:nth-of-type(1) {
					color: #030104;
					//font-family: PingFang SC;
					font-size: 32rpx;
					font-style: normal;
					font-weight: 600;
				}

				>text:nth-of-type(2) {
					color: #030104;
					//font-family: PingFang SC;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
				}

				p:nth-child(1) {
					// font-size: 26rpx;
				}

				p:nth-child(2) {
					font-size: 24rpx;
					color: red;
				}
			}

			.solo_out_btn {
				background-image: url('../../../static/btn/sold_out_btn.png');
				@include backImg;
			}

			.online_buy {
				background-image: url('../../../static/btn/online_btn.png');
				@include backImg;
			}
		}

		.solo_out {
			.buy_btn {
				width: 676rpx;
				height: 96rpx;
				position: relative;

				// p:nth-child(1) {
				// 	color: #666;
				// }

				p:nth-child(2) {
					position: absolute;
					bottom: -10rpx;
					right: 145rpx;

					image {
						height: 120rpx;
					}
				}
			}

			.online_buy {
				width: 698rpx;
				height: 106rpx;
			}
		}

	}


	.goods_box {
		//background-color: red;
		border-radius: 40rpx 40rpx 0 0;
		padding-bottom: 80rpx;
		background-color: #F4F4F4;

		.goods_box_title {
			color: #030104;
			//font-family: Alimama ShuHeiTi;
			font-size: 40rpx;
			font-style: normal;
			font-weight: 700;
			line-height: 40rpx;
			/* 90% */
			padding: 40rpx 40rpx 48rpx 20rpx;
		}

		.goods_list_all {
			padding: 0 20rpx 36rpx;

			.all_shop_manager {
				padding: 10rpx 20rpx;
				border-radius: 6rpx;
				border: 0.5rpx solid #E0E0E0;
				background: #FFF;

			}
		}

		.scroll {
			height: 800rpx;
			padding: 0 20rpx;

			.goods_box_item {
				margin-bottom: 24rpx;
				box-sizing: border-box;
				width: 710rpx;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 34rpx 28rpx;

				.address {
					margin-bottom: 30rpx;

					.address_name {
						color: #000;
						font-family: PingFang SC;
						font-size: 28rpx;
						font-style: normal;
						font-weight: 700;
					}
				}

				.shop_manager {
					margin-bottom: 30rpx;
					display: flex;

					.label_wid {

						// width: 230rpx;
						text-align: right;
						margin-left: 10rpx;
						color: #999;
						//font-family: PingFang SC;
						font-size: 28rpx;
						font-style: normal;
						font-weight: 400;
					}
				}

				.contact_information {
					width: 100%;
					height: 100rpx;
					display: flex;
					//background: red;

					.label_wid {
						flex-shrink: 0;
						width: 140rpx;
						text-align: right;
						color: #999;
						//font-family: PingFang SC;
						font-size: 28rpx;
						font-style: normal;
						font-weight: 400;
					}

					.contact_list {
						height: 100rpx;
						display: flex;
						flex-wrap: wrap;
						align-items: center;
						//background: blue;

						.contact_information_list {
							flex: 1;
							display: flex;

							.contact_information_item {
								width: 240rpx;
								height: 40rpx;
								display: flex;
								align-items: center;
								border-radius: 6rpx;
								border: 1rpx solid #E0E0E0;
								background: #F7F7F7;
								padding: 0 12rpx;

								.number {
									width: 0rpx;
									flex: 1;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									font-size: 22rpx;
									//background: red;
								}
							}
						}
					}

				}
			}
		}
	}
</style>