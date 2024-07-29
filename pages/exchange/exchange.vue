<template>
	<view class="exchange">
		<view class="tab df alc apb">
			<view class="df acl jc" style="width: 70%;">
				<view class="" style="width: 90%;">
					<u-subsection activeColor="rgb(109, 79, 207)" inactiveColor="#fff" :list="tablist" mode="button"
						:current="current" @change="sectionChange"></u-subsection>
				</view>
			</view>
			<view class="pr df " style="justify-content: flex-end;flex: 1;">
				<view class="df alc" @click="country_show=!country_show">
					<u-icon :name="country_icon" size="16"></u-icon>
					<text class="c_w" style="margin: 0 10rpx 0 4rpx;">{{country_name}}</text>
					<u-icon name="/static/exchange/down_triangle.png" size="14"></u-icon>
				</view>
				<view class="type_list" style="backgroundColor:#f5f5f5;color:#000;height: 500rpx;"
					v-show="country_show">
					<view class="type_item df alc jc" v-for="item in country_list" :key="item.code"
						@click="countryChoose(item)">
						<u-icon :name="item.icon" size="16" style="margin-right: 4rpx;"></u-icon>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="df alc spb">
			<u-tabs style="margin-bottom:20rpx" :list="menuList" @click="clickMenu" lineColor="#fff"
				:activeStyle="activeStyle" :inactiveStyle='inactiveStyle'></u-tabs>
			<view class="pr">
				<view class="df alc" @click="currency_show=!currency_show">
					<u-icon :name="sort_type==1?'/static/exchange/usdt.png':'/static/exchange/price_icon.jpg'"
						size="16"></u-icon>
					<text class="c_w" style="margin: 0 10rpx 0 4rpx;">{{currency_name}}</text>
					<u-icon name="/static/exchange/down_triangle.png" size="14"></u-icon>
				</view>
				<view class="type_list" style="backgroundColor:#f5f5f5;color:#000" v-show="currency_show">
					<view class="type_item " v-for="item in currency_list" :key="item.code"
						@click="currencyChoose(item)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="menu_list">
			<view class="menu_list_item pr" :class="(i==0&&uuid===item.uuid)?'border_red':''" v-for="(item,i) in list">
				<u-swipe-action v-if="i==0&&uuid===item.uuid">
					<u-swipe-action-item :options="options1" @click="delGoods(item.id)">
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<view class="up_conent df alc">
									<view class="up_conent_left ">
										<view class=" df alc ">
											<u-avatar :src="item.avatar" size='30'></u-avatar>
											<view class="df fdc ml-20">
												<text style="font-weight:bold">{{item.merchant_name}}</text>
												<text
													style="font-size: 24rpx;font-weight:bold">{{item.user_code}}</text>
											</view>
										</view>
										<view class="up_middle df" style="margin-top: 20rpx;">
											<view class="" style="">
												<!-- <text>{{$t('exchange.price')}}:</text> -->
												<view class="df alc up_middle_bottom">
													<u-icon name="/static/exchange/price_icon.jpg" size="20"></u-icon>
													<text style="margin-left: 4rpx;">{{item.region_coin_price}}</text>
													<text>/PSC</text>
												</view>
												<view class="df alc up_middle_bottom"><u-icon
														name="/static/exchange/usdt.png" color="rgb(235, 179, 241)"
														size="20"></u-icon>
													<text style="margin-left: 4rpx;">{{item.usdt_price}}</text>
													<text>/PSC</text>
												</view>
											</view>
										</view>
									</view>
									<view class="mine fw" v-show="uuid===item.uuid">
										{{$t('exchange.mine')}}
									</view>
									<view class="up_right df alc" style="justify-content: flex-end;">
										<view class="" style="margin-bottom: 10rpx;">
											<text>{{$t('exchange.num')}}:</text>
											<text>{{item.tradet_num}}</text>
										</view>
										<view class="up_right_btn">
											<view class="" @click="releaseBtn(2)" v-if="uuid===item.uuid">
												{{$t('exchange.modify')}}
											</view>
											<view class="" @click="exchange(item)" v-else>{{$t('exchange.transaction')}}
											</view>
										</view>
									</view>
								</view>
								<view class="down_conent df">
									<view class="down_conent_left df alc">
										<text>{{$t('exchange.NumberOfPledgedGemstones')}}：</text><text>{{item.pledge_food}}</text>
									</view>
									<view class="down_conent_right df alc">
										<text>{{$t('exchange.AccumulatedTransactionQuantity')}}：</text><text>{{item.transfer_food_num}}</text>
									</view>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
				<view class="" v-else>
					<view class="up_conent df alc">
						<view class="up_conent_left ">
							<view class=" df alc ">
								<u-avatar :src="item.avatar" size='30'></u-avatar>
								<view class="df fdc ml-20">
									<text style="font-weight:bold">{{item.merchant_name}}</text>
									<text style="font-size: 24rpx;font-weight:bold">{{item.user_code}}</text>
								</view>
							</view>
							<view class="up_middle df" style="margin-top: 20rpx;">
								<view class="" style="">
									<!-- <text>{{$t('exchange.price')}}:</text> -->
									<view class="df alc up_middle_bottom">
										<u-icon name="/static/exchange/price_icon.jpg" size="20"></u-icon>
										<text style="margin-left: 4rpx;">{{item.region_coin_price}}</text>
										<!-- <text>/{{item.tradet_type==2?$t('exchange.set'):$t('exchange.individual')}}</text> -->
										<text>/PSC</text>
									</view>
									<view class="df alc up_middle_bottom"><u-icon name="/static/exchange/usdt.png"
											color="rgb(235, 179, 241)" size="20"></u-icon>
										<text style="margin-left: 4rpx;">{{item.usdt_price}}</text>
										<text>/PSC</text>
									</view>
								</view>
							</view>
						</view>
						<view class="mine fw" v-show="uuid===item.uuid">
							{{$t('exchange.mine')}}
						</view>
						<view class="up_right df alc" style="justify-content: flex-end;">
							<view class="" style="margin-bottom: 10rpx;">
								<text>{{$t('exchange.num')}}:</text>
								<text>{{item.tradet_num}}</text>
							</view>
							<view class="up_right_btn">
								<view class="" @click="releaseBtn(2)" v-if="uuid===item.uuid">{{$t('exchange.modify')}}
								</view>
								<view class="" @click="exchange(item)" v-else>{{$t('exchange.transaction')}}</view>
							</view>
						</view>
					</view>
					<view class="down_conent df">
						<view class="down_conent_left df alc">
							<text>{{$t('exchange.NumberOfPledgedGemstones')}}：</text><text>{{item.pledge_food}}</text>
						</view>
						<view class="down_conent_right df alc">
							<text>{{$t('exchange.AccumulatedTransactionQuantity')}}：</text><text>{{item.transfer_food_num}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="show" :title="title1" :showConfirmButton=false>
			<view class="release_goods">
				<view class="df alc release_goods_item">
					<text style="margin-right: 10rpx;">{{$t('exchange.merchat')}}：</text>
					<input v-model="merchant_name" :maxlength="20" class="release_goods_ipt"
						:placeholder="$t('exchange.merchantName')" type="text" />
				</view>
				<view class="df alc   release_goods_type">
					<text style="margin-right: 10rpx;">{{$t('exchange.goodsName')}}：</text>
					<text @click="showType" style="padding-left: 20rpx;">{{goodsType}}</text>
					<!-- <u-icon v-show="isAgent&&direction==='right'" @click="showType" name="arrow-right" color="#aaa"
						size="20"></u-icon> -->
					<!-- <u-icon v-show="isAgent&&direction==='down'" @click="direction='right'" name="arrow-down"
						color="#aaa" size="20"></u-icon> -->
					<!-- <view class="type_list" v-show="direction==='down'">
						<view class="type_item" v-for="item in type_list" :key="item.name" @click="chooseType(item)">
							{{item.name}}
						</view>
					</view> -->
				</view>
				<view class="">
					<view class="df alc release_goods_item">
						<text style="margin-right: 10rpx;">{{$t('exchange.num')}}：</text>
						<input v-model="tradet_num" @blur='Blur' :maxlength="4" class="release_goods_ipt"
							:placeholder="$t('exchange.EnterSalesQuantity')" type="number" />
					</view>
					<view class="df alc release_goods_item">
						<text
							style="margin-right: 10rpx;">{{companyCode==60?$t('exchange.MYR'):$t('exchange.VND')}}：</text>
						<input v-model="region_coin_price" class="release_goods_ipt" @blur="regionBlur"
							:placeholder="companyCode==60?$t('exchange.EnterMalaysianCurrencyAmount'):$t('exchange.EnterVNDAmount')"
							type="text" />
					</view>
					<view class="df alc release_goods_item">
						<text style="margin-right: 10rpx;">USDT：</text>
						<input v-model="usdt_price" class="release_goods_ipt" @blur="usdtBlur"
							:placeholder="$t('exchange.EnterUSDTAmount')" type="text" />
					</view>
				</view>
				<view class="release_btn" @click="notSubmit"
					v-if="usdt_price===''||region_coin_price===''||tradet_num===''||tardet_type_===''||merchant_name===''">
					{{$t('exchange.submit')}}
				</view>
				<view class="release_btn is_click" v-else @click="release">
					{{$t('exchange.submit')}}
				</view>
				<view class="close_icon">
					<u-icon @click="show=false" name="close" style="border: 2rpx solid #ccc; border-radius: 50%;"
						color="#aaa" size="20"></u-icon>
				</view>
			</view>
		</u-modal>
		<u-modal :show="application_show" :title="title2" :showConfirmButton=false>
			<view class="release_goods">
				<view class="df alc spb  release_goods_type">
					<view class="">
						<text>{{$t('exchange.NumberOfPledgedGemstones')}}：
							<text style="font-size: 30rpx;color: rgb(235, 179, 241);">{{pledge_food_num}}</text>
						</text>
					</view>
					<view class="">
						<u-number-box integer v-model="pledge_food_num" :max="100000" :min="min_gem"
							@change="valChange"></u-number-box>
					</view>
				</view>
				<view class="df alc "
					style="background-color: #fff;margin: 10rpx 0;border-radius: 10rpx;padding:0 10rpx;">
					<image src="/static/myInfo/2_1.png" mode="heightFix" style="width: 50rpx;height: 50rpx;"></image>
					<u--input class="release_goods_ipt" v-model="mobile" style="border: none;"
						:placeholder="$t('exchange.enterContactInformation')" border="surround" clearable></u--input>
				</view>
				<view class="release_btn" v-if="mobile===''">
					{{$t('exchange.submit')}}
				</view>
				<view class="release_btn is_click" v-else @click="applicationRelease">
					{{$t('exchange.submit')}}
				</view>
				<view class="close_icon">
					<u-icon @click="application_show=false" name="close"
						style="border: 2rpx solid #ccc; border-radius: 50%;" color="#aaa" size="20"></u-icon>
				</view>
			</view>
		</u-modal>
		<u-modal :show="setting_show" :title="title3" :showConfirmButton=false>
			<view class="release_goods">
				<view class="df alc release_goods_item">
					<text style="margin-right: 10rpx;">{{$t('exchange.merchat')}}：</text>
					<input v-model="merchant_name" :maxlength="20" class="release_goods_ipt"
						:placeholder="$t('exchange.EnterSalesQuantity')" type="text" />
				</view>
				<view class="df alc spb  release_goods_type">
					<view class="">
						<text>{{$t('exchange.ModifyContactInformation')}}</text>
					</view>
					<view class="change_btn" @click="topage('general/myInfo/myInfo')">
						{{$t('exchange.GoAndModify')}}
					</view>
				</view>
				<view class="pr df alc release_goods_item">
					<text>{{companyCode==60?$t('exchange.MYR'):$t('exchange.VND')}}：</text>
					<input v-model="region_coin_price" :disabled="!is_change_region" @blur="regionBlur"
						class="release_goods_ipt"
						:placeholder="companyCode==60?$t('exchange.changeMYRAmount'):$t('exchange.changeVNDAmount')"
						type="number" />
					<view class="right_icon df alc">
						<u-icon name="/static/exchange/change.png" v-show="!is_change_region"
							@click="is_change_region=true" color="rgb(235, 179, 241)" size="20"></u-icon>
						<view class="change_btn" v-show="is_change_region" @click="changeComplete('region')">
							{{$t('exchange.complite')}}
						</view>
					</view>
				</view>
				<view class="pr df alc release_goods_item">
					<text>USDT：</text>
					<input v-model="usdt_price" :disabled="!is_change_usdt" class="release_goods_ipt"
						:placeholder="$t('exchange.changeUSDTAmount')" @blur="usdtBlur" type="text" />
					<view class="right_icon df alc">
						<u-icon name="/static/exchange/change.png" v-show="!is_change_usdt" @click="is_change_usdt=true"
							color="rgb(235, 179, 241)" size="20"></u-icon>
						<view class="change_btn" v-show="is_change_usdt" @click="changeComplete('usdt')">
							{{$t('exchange.complite')}}
						</view>
					</view>
				</view>
				<view class="pr df alc release_goods_item">
					<text>{{$t('exchange.num')}}：</text>
					<input v-model="tradet_num" @blur='Blur' :disabled="!is_change_num" class="release_goods_ipt"
						:placeholder="$t('exchange.ChangeSalesQuantity')" type="number" />
					<view class="right_icon  df alc">
						<u-icon name="/static/exchange/change.png" v-show="!is_change_num" @click="is_change_num=true"
							color="rgb(235, 179, 241)" size="20"></u-icon>
						<view class="change_btn" v-show="is_change_num" @click="changeComplete('num')">
							{{$t('exchange.complite')}}
						</view>
					</view>
				</view>
				<view class="close_icon">
					<u-icon @click="closeSetting" name="close" style="border: 2rpx solid #ccc; border-radius: 50%;"
						color="#aaa" size="20"></u-icon>
				</view>
			</view>
		</u-modal>
		<u-modal class="relieve_modal" :show="relieve_show" :title="title4" :showConfirmButton=false
			:showCancelButton=false>
			<view class="">
				<view class="relieve">
					{{$t('exchange.relieveNotice')}}
				</view>
				<view class="df jc alc spb" style="width: 100%;">
					<view class="relieve_confirm" @click="relieveConfirm">
						{{$t('exchange.confirm')}}
					</view>
					<view class="relieve_cancel" @click="relieve_show=false">
						{{$t('exchange.cancel')}}
					</view>
				</view>
			</view>
		</u-modal>
		<u-popup :show="transaction_show" :round='20' mode="bottom" @close="transaction_show=false">
			<view class="transaction">
				<view class="transaction_title">
					{{$t('exchange.tradingGoods')}}
				</view>
				<view class="menu_list_item">
					<view class="up_conent df alc">
						<view class="up_conent_left df ">
							<view class="up_left">
								<u-avatar :src="exchangeData.avatar" size='40'></u-avatar>
							</view>
							<view class="up_middle spb">
								<text
									class="fw">{{tradet_type==2?$t('exchange.monkeyCard'):$t('exchange.gemstone')}}</text>
								<view class=" jc alc " style="margin-top: 10rpx;">
									<text>{{companyCode==60?$t('exchange.MYR'):$t('exchange.VND')}}：</text>
									<text>{{exchangeData.region_coin_price}}</text>
									<text>/PSC</text>
								</view>
								<view class=" jc alc">
									<text>USDT：</text>
									<text>{{exchangeData.usdt_price}}</text>
									<text>/PSC</text>
								</view>
							</view>
						</view>
						<!-- <view class=" df alc" style="justify-content: flex-end;">
							<view class="" v-if="exchangeData.tradet_type==2">
								{{$t('exchange.num')}}：{{exchangeData.num}}
							</view>
							<view class="df alc jc" v-else>
								<text>{{$t('exchange.num')}}：</text>
								<u-number-box v-model="exchangeData.num" :min="1" :max="exchangeData.tradet_num"
									@change="transactionChange" integer></u-number-box>
							
							</view>
						</view> -->
					</view>
					<view class="down_conent df">
						<view class="down_conent_left df alc ">
							<text>{{$t('exchange.NumberOfPledgedGemstones')}}：</text><text>{{exchangeData.pledge_food}}个</text>
						</view>
						<view class="down_conent_right df alc ">
							<text>{{$t('exchange.AccumulatedTransactionQuantity')}}：</text><text>{{exchangeData.transfer_food_num}}</text>
						</view>
					</view>
				</view>
				<!-- <view class="fw " style="margin: 10rpx 0 30rpx;">
					{{$t('exchange.paymentRequired')}}：
					USDT：{{exchangeData.totalUsdt}}/
					{{companyCode==60?$t('exchange.MYR'):$t('exchange.VND')}}：{{exchangeData.totalRegion}}

				</view> -->
				<view class="df spb alc">
					<view class="df alc" @click="copy('telegram',exchangeData.telegram)">
						<image style="width: 60rpx;height: 60rpx;" src="/static/myInfo/3.png" mode="heightFix"></image>
						<view class="copy" style="background-color: rgb(54,174,226);">
							{{exchangeData.telegram}}
						</view>
					</view>
					<view class="df alc" @click="copy('whatsapp',exchangeData.whatsapp)">
						<image style="width: 60rpx;height:60rpx;" src="/static/myInfo/4.png" mode="heightFix"></image>
						<view class="copy" style="background-color: rgb(37,211,102);">
							{{exchangeData.whatsapp}}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<view class="web3_modal df alc jc c_w tc" v-show="web3_show">
			<view class="modal_content df fdc alc pr jc">
				<text>Welcome to the</text>
				<text>world of</text>
				<text>WEB3.0</text>
				<text>Global data is</text>
				<view class="bottom fw">Opening Soon</view>
				<u-icon class="close_btn" name="close-circle" color="#fff" size="30" @click="web3_show=false"></u-icon>
			</view>
		</view>
		<view class="footer df">
			<view class="not_on_list" v-show="!isOnlist&&!audit">
				<button class="footer_bth" @click="application_show=true">{{$t('exchange.ApplyOnList')}}</button>
			</view>
			<view class="not_on_list" v-show="audit&&!isOnlist">
				<button class="footer_bth" @click="auditing">{{$t('exchange.audit')}}</button>
			</view>
			<view class="on_list df alc" v-show="isOnlist&&!audit">
				<view class="on_list_item">
					<button class="footer_bth relieve" @click="relieve">{{$t('exchange.Unbind')}}</button>
				</view>
				<view class="on_list_item">
					<button class="footer_bth" @click="releaseBtn(1)">{{$t('exchange.PublishProducts')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options1: [{
					text: 'del',
					style: {
						backgroundColor: '#f56c6c',
					}
				}],
				web3_show: false,
				country_show: false,
				country_name: 'MY',
				country_icon: '/static/exchange/MY.jpg',
				country_list: [{
						icon: '/static/exchange/AU.png',
						name: 'AU'
					},
					{
						icon: '/static/exchange/BO.jpg',
						name: 'BO'
					},
					{
						icon: '/static/exchange/BX.png',
						name: 'BR'
					},
					{
						icon: '/static/exchange/cn.png',
						name: 'CN'
					},
					{
						icon: '/static/exchange/KH.png',
						name: 'KH'
					},
					{
						icon: '/static/exchange/cl.png',
						name: 'CL'
					},
					{
						icon: '/static/exchange/IN.png',
						name: 'IN'
					},
					{
						icon: '/static/exchange/ID.png',
						name: 'ID'
					},
					{
						icon: '/static/exchange/KE.jpg',
						name: 'KE'
					},
					{
						icon: '/static/exchange/LA.jpg',
						name: 'LA'
					},
					{
						icon: '/static/exchange/MY.jpg',
						name: 'MY'
					},
					{
						icon: '/static/exchange/MM.jpg',
						name: 'MM'
					},
					{
						icon: '/static/exchange/NG.jpg',
						name: 'NG'
					},
					{
						icon: '/static/exchange/PH.jpg',
						name: 'PH'
					},
					{
						icon: '/static/exchange/RW.png',
						name: 'RW'
					},
					{
						icon: '/static/exchange/SG.png',
						name: 'SG'
					},
					{
						icon: '/static/exchange/TZ.jpg',
						name: 'TZ'
					},
					{
						icon: '/static/exchange/TH.png',
						name: 'TH'
					},
					{
						icon: '/static/exchange/UG.png',
						name: 'UG'
					},
					{
						icon: '/static/exchange/VN.png',
						name: 'VN'
					},
					{
						icon: '/static/exchange/ZM.jpg',
						name: 'ZM'
					}
				],
				isApply: false,
				show: false,
				application_show: false,
				setting_show: false,
				transaction_show: false,
				relieve_show: false,
				transaction_value: 1,
				title1: this.$t('exchange.PublishProducts'),
				title2: this.$t('exchange.ApplyOnList'),
				title3: this.$t('exchange.setting'),
				title4: this.$t('exchange.tips'),
				direction: 'right',
				goodsType: this.$t('exchange.gemstone'),
				mobile: '',
				value: 200,
				inactiveStyle: {
					color: "#aaa"
				},
				activeStyle: {
					color: "#fff"
				},
				tablist: [
					this.$t('exchange.onsale'),
					this.$t('exchange.processOfPurchasing')
				],
				list: [],
				menuList: [
					// {
					// 		name: this.$t('exchange.monkeyCard'),
					// 		tradet_type: 2
					// 	},
					{
						name: this.$t('exchange.gemstone'),
						tradet_type: 1
					},
				],
				type_list: [
					// {
					// 		name: this.$t('exchange.monkeyCard'),
					// 		tradet_type: 2
					// 	},
					{
						name: this.$t('exchange.gemstone'),
						tradet_type: 1
					},
				],
				currency_list: [{
						name: 'USDT',
						sort_type: 1,
						companyCode: 25
					},
					{
						name: this.$t('exchange.MYR'),
						sort_type: 2,
						companyCode: 60
					},
				],
				sort_type: 1,
				current: 0,
				type: 1,
				tradet_type: 1,
				menu_list_current: 0,
				id: '',
				merchant_name: '',
				region_coin_price: '',
				usdt_price: '',
				tradet_num: '',
				type_: '',
				tardet_type_: 1,
				telegram: '',
				whatsapp: '',
				mobile: '',
				min_gem: uni.getStorageSync('min_gem'),
				pledge_food_num: uni.getStorageSync('min_gem'),
				isOnlist: false,
				exchangeData: {},
				avatar: '',
				is_change_usdt: false,
				is_change_region: false,
				is_change_num: false,
				isCancel: false,
				uuid: '',
				btn_type: 'release',
				exchangeStep: 1,
				exchangeMin: 1,
				companyCode: 60,
				page: 1,
				limit: 10,
				canReachBottom: true,
				currency_show: false,
				currency_name: '',
				isAgent: true,
				temp: 0,
				audit: false,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('colleHome.exchange')
			})
			let userInfo = uni.getStorageSync('user_info')
			if (userInfo.company_id) this.companyCode = userInfo.company_id
			this.currency_name = this.currency_list.find(item => item.sort_type == this.sort_type).name
			if (userInfo.id) this.uuid = userInfo.id
			this.isAgent = userInfo.is_agent == 1 ? true : false
			if (userInfo.avatar) this.avatar = userInfo.avatar
			if (userInfo.mobile) this.mobile = userInfo.mobile
			if (userInfo.whatsapp) this.whatsapp = userInfo.whatsapp
			if (userInfo.telegram) this.telegram = userInfo.telegram
			this.getExchangeList()
			this.getMyExchangeMemberInfo()
			this.getMyExchangeInfo()
			this.getCancelExchangeMemberApply()
		},
		onReachBottom() {
			if (this.canReachBottom) {
				this.page++
				this.getExchangeList()
			}
		},
		methods: {
			// 发布商品 有input为空时
			notSubmit() {
				if (this.usdt_price === '' || this.region_coin_price === '' || this.tradet_num === '' || this
					.merchant_name === '') {
					this.$u.toast(this.$t('exchange.require'))
				}
			},
			// 选择国家
			countryChoose() {
				this.web3_show = true
				this.country_show = false
			},
			// 点击审核状态按钮
			auditing() {
				uni.$u.toast(this.$t('exchange.auditing'), 3000)
			},
			// 删除上架商品
			delGoods(id) {
				let _this = this
				uni.showModal({
					content: _this.$t('exchange.delTips'),
					cancelText: _this.$t('exchange.cancel'),
					confirmText: _this.$t('exchange.confirm'),
					success: function(res) {
						if (res.confirm) {
							_this.delExchangeInfo(id)
						}
					}
				})
			},
			// 货币选择
			currencyChoose(data) {
				this.sort_type = data.sort_type
				this.currency_name = data.name
				this.page = 1
				this.getExchangeList()
				this.getMyExchangeInfo()
				this.currency_show = false
			},
			// 复制联系方式
			copy(type, data) {
				if (typeof data != 'undefined') {
					let _this = this
					uni.setClipboardData({
						data: data,
						success: () => {
							uni.showToast({
								title: _this.$t('utils.copySuccess'),
								icon: "none"
							})
						}
					})
				} else {
					return
				}
				if (type === 'telegram') {
					// #ifdef H5
					window.open("https://t.me/" + data, '_blank');
					// #endif
					// #ifdef APP-PLUS
					plus.runtime.openURL("https://t.me/" + data, function(e) {
						alert("Open system default browser failed: " + e.message);
					});
					// #endif
				} else {
					// whatsapp
					// #ifdef H5
					window.open("https://api.whatsapp.com/send?phone=" + data, '_blank');
					// #endif
					// #ifdef APP-PLUS
					plus.runtime.openURL("https://api.whatsapp.com/send?phone=" + data, function(e) {
						alert("Open system default browser failed: " + e.message);
					});
					// #endif
				}
			},
			// 顶部开关切换
			sectionChange(index) {
				this.current = index
				this.type = index + 1
				// if (this.type == 2) {
				// 	if (this.tradet_type == 2) {
				// 		this.temp = 2
				// 	} else {
				// 		this.temp = 0
				// 	}
				// 	this.menuList = [{
				// 		name: this.$t('exchange.gemstone'),
				// 		tradet_type: 1
				// 	}]
				// 	this.type_list = [{
				// 		name: this.$t('exchange.gemstone'),
				// 		tradet_type: 1
				// 	}]
				// 	this.tradet_type = 1
				// } else {
				// 	this.menuList = [{
				// 			name: this.$t('exchange.monkeyCard'),
				// 			tradet_type: 2
				// 		},
				// 		{
				// 			name: this.$t('exchange.gemstone'),
				// 			tradet_type: 1
				// 		},
				// 	]
				// 	this.type_list = [{
				// 			name: this.$t('exchange.monkeyCard'),
				// 			tradet_type: 2
				// 		},
				// 		{
				// 			name: this.$t('exchange.gemstone'),
				// 			tradet_type: 1
				// 		}
				// 	]
				// 	this.tradet_type = this.temp == 2 ? 2 : 1
				// }
				this.page = 1
				this.getMyExchangeInfo()
				this.getExchangeList()
			},
			// 选项卡切换
			clickMenu(item) {
				this.tradet_type = item.tradet_type
				this.page = 1
				this.getExchangeList()
				this.getMyExchangeInfo()
			},
			// 下拉框展示
			showType() {
				if (this.isAgent) {
					this.direction = 'down'
				}
			},
			// 选择下拉框内容
			chooseType(item) {
				this.goodsType = item.name
				this.tradet_type_ = item.tradet_type
				this.direction = 'right'
			},
			// 失焦事件
			usdtBlur() {
				if (!Number(this.usdt_price)) {
					this.$u.toast(this.$t('exchange.onlyNum'))
					this.usdt_price = ''
					return
				}
				if (Number(this.usdt_price) < 0) {
					this.$u.toast(this.$t('exchange.notInput'))
					this.usdt_price = Math.abs(this.usdt_price)
				}
				if (Number(this.usdt_price > 10000)) {
					this.$u.toast(this.$t('exchange.maxInput'))
					this.usdt_price = ''
				}
				// 将输入值限制为最多两位小数
				const regex = /^\d*\.?\d{0,2}$/;
				if (!regex.test(this.usdt_price)) {
					let index = String(this.tradet_num).indexOf('.')
					this.usdt_price = this.usdt_price.slice(0, index + 3);
				}
			},
			regionBlur() {
				if (!Number(this.region_coin_price)) {
					this.$u.toast(this.$t('exchange.onlyNum'))
					this.region_coin_price = ''
				}
				if (Number(this.region_coin_price > 10000)) {
					this.$u.toast(this.$t('exchange.maxInput'))
					this.region_coin_price = ''
				}
				if (Number(this.region_coin_price) < 0) {
					this.$u.toast(this.$t('exchange.notInput'))
					this.region_coin_price = Math.abs(this.region_coin_price)
				}
				// 将输入值限制为最多两位小数
				const regex = /^\d*\.?\d{0,2}$/;
				if (!regex.test(this.region_coin_price)) {
					let index = String(this.tradet_num).indexOf('.')
					this.region_coin_price = this.region_coin_price.slice(0, index + 3);
				}
			},
			Blur() {
				if (this.tradet_num <= 0) {
					this.$u.toast(this.$t('exchange.least1'))
					this.tradet_num = 1
				}
				if (this.tradet_type_ == 2) {
					if (this.tradet_num % 7 != 0) {
						this.$u.toast(this.$t('exchange.only7'))
						this.tradet_num = 7
					}
				} else {
					if (String(this.tradet_num).includes('.')) {
						this.$u.toast(this.$t('exchange.onlyInt'))
						let index = String(this.tradet_num).indexOf('.')
						this.tradet_num = String(this.tradet_num).substr(0, index)
					}
				}
			},
			// 发布商品提交
			release() {
				if (!this.region_coin_price) {
					return
				}
				if (!this.usdt_price) {
					return
				}
				if (String(this.tradet_num).includes('.')) {
					let index = String(this.tradet_num).indexOf('.')
					this.tradet_num = Number(String(this.tradet_num).substr(0, index))
					this.tradet_num = String(this.tradet_num).slice(0, 1)
				}
				this.publishExchangeList()
				this.page = 1
				this.getExchangeList()
				this.show = false
			},
			// 点击解绑按钮
			relieve() {
				if (this.isCancel) {
					this.$u.toast(this.$t('exchange.unRelease'), 5000)
					return
				}
				this.relieve_show = true
			},
			// 点击确认解绑按钮
			relieveConfirm() {
				this.applyCancelExchangeMember()
				this.relieve_show = false
			},
			// 发布/修改按钮事件
			releaseBtn(num) {
				if (this.isCancel) {
					this.$u.toast(this.$t('exchange.onReview'))
					return
				}
				// if (this.type == 2) {
				// 	this.type_list = [{
				// 		name: this.$t('exchange.gemstone'),
				// 		tradet_type: 1
				// 	}]
				this.tradet_type = 1
				this.tradet_type_ = 1
				// 	this.getMyExchangeInfo()
				// } else {
				// 	if (this.isAgent) {
				// 		this.type_list = [{
				// 				name: this.$t('exchange.monkeyCard'),
				// 				tradet_type: 2
				// 			},
				// 			{
				// 				name: this.$t('exchange.gemstone'),
				// 				tradet_type: 1
				// 			},
				// 		]
				// 		this.getMyExchangeInfo()
				// 	} else {
				// 		this.type_list = [{
				// 			name: this.$t('exchange.gemstone'),
				// 			tradet_type: 1
				// 		}]
				// 		this.tradet_type = 1
				// 		this.tradet_type_ = 1
				// 	}
				// }
				this.getMyExchangeInfo()
				this.show = true
			},
			// 点击交易按钮
			async exchange(data) {
				let res = await uni.ajax.getItemApplyInfo({
					uuid: data.uuid
				})
				if (Object.keys(res.data).length != 0) {
					this.$u.toast(this.$t('exchange.transtionTips'), 3000)
					return
				}
				this.exchangeData = data
				if (this.exchangeData.tradet_type == 2) { //猴卡
					this.$set(this.exchangeData, 'num', 7)
					this.$set(this.exchangeData, 'totalRegion', (this.exchangeData.num / 7) * this.exchangeData
						.region_coin_price).toFixed(2);
					this.$set(this.exchangeData, 'totalUsdt', (this.exchangeData.num / 7) * this.exchangeData
							.usdt_price)
						.toFixed(2);
				} else {
					this.$set(this.exchangeData, 'num', 1)
					this.$set(this.exchangeData, 'totalRegion', this.exchangeData.num * this.exchangeData
						.region_coin_price).toFixed(2);
					this.$set(this.exchangeData, 'totalUsdt', this.exchangeData.num * this.exchangeData.usdt_price)
						.toFixed(2);
				}
				this.transaction_show = true
			},
			// 点击完成按钮
			changeComplete(type) {
				this.publishExchangeList()
				switch (type) {
					case 'region':
						this.is_change_region = false
						break;
					case 'usdt':
						this.is_change_usdt = false
						break;
					case 'num':
						this.is_change_num = false
						break;
					default:
						break;
				}
			},
			// 关闭设置弹窗
			closeSetting() {
				this.setting_show = false
				this.modalData = {}
			},
			// 申请上榜提交
			applicationRelease() {
				if (this.whatsapp === '' || this.telegram === '') {
					let _this = this
					uni.showModal({
						content: _this.$t('exchange.releaseTips'),
						confirmText: _this.$t('exchange.GoAndModify'),
						cancelText: _this.$t('exchange.cancel'),
						success: function(res) {
							if (res.confirm) {
								_this.topage('general/myInfo/myInfo')
							} else if (res.cancel) {

							}
						}
					})
				} else if (this.pledge_food_num < uni.getStorageSync('min_gem')) {
					this.$u.toast(this.$t('exchange.atLeast'))
					this.pledge_food_num = uni.getStorageSync('min_gem')
					return
				} else {
					this.applyExchangeMember()
					this.application_show = false
				}
			},
			// 质押宝石步进器
			valChange(e) {
				this.pledge_food_num = e.value
				if (String(this.pledge_food_num).includes('.')) {
					this.$u.toast(this.$t('exchange.onlyInt'))
					let index = String(this.pledge_food_num).indexOf('.')
					this.pledge_food_num = Number(String(this.pledge_food_num).substr(0, index))
					e.value = this.pledge_food_num
				}
			},
			// 交易步进器
			transactionChange(e) {
				this.exchangeData.num = e.value
				if (this.exchangeData.num == 0) {
					e.value = this.exchangeData.num = 1
				}
				this.exchangeData.totalRegion = (this.exchangeData.num * this.exchangeData.region_coin_price)
					.toFixed(
						2)
				this.exchangeData.totalUsdt = (this.exchangeData.num * this.exchangeData.usdt_price).toFixed(2)
			},
			// 获取交易列表
			async getExchangeList() {
				let res = await uni.ajax.public_getExchangeList({
					type: this.type,
					tradet_type: this.tradet_type,
					page: this.page,
					limit: this.limit,
					sort_type: this.sort_type
				});
				if (Object.keys(res.data).length != 0) {
					if (res.data.list.length < this.limit) this.canReachBottom = false
					if (this.page == 1) {
						this.list = res.data.list
					} else {
						this.list = this.list.concat(res.data.list)
					}
					if (res.data.show_deny_join_member_popbox == 1) {
						let _this = this
						uni.showModal({
							title: _this.$t('exchange.applyResult'),
							showCancel: false,
							content: _this.$t('exchange.refuse'),
							success: function(res) {
								if (res.confirm) {
									_this.$u.toast(_this.$t('backendRespon.msg118'), 3000)
								}
							}
						})
					}
					if (res.data.show_allow_join_member_popbox == 1) {
						let _this = this
						uni.showModal({
							title: _this.$t('exchange.applyResult'),
							showCancel: false,
							content: res.data.apply_starus == 1 ? _this.$t('exchange.auditing') : _this.$t(
								'exchange.isMerchant'),
							success: function(res) {
								if (res.confirm) {}
							}
						})
					}
					if (res.data.show_allow_cancel_member_popbox == 1) {
						let _this = this
						uni.showModal({
							title: _this.$t('exchange.UnbindingResult'),
							showCancel: false,
							content: _this.$t('exchange.notMerchant'),
							success: function(res) {
								if (res.confirm) {

								}
							}
						})
					}
				}
			},
			// 申请上榜
			async applyExchangeMember() {
				let res = await uni.ajax.public_applyExchangeMember({
					pledge_food_num: this.pledge_food_num,
					contact_telephone: this.mobile
				});
				if (res.msg === 'success') {
					this.audit = true
					let _this = this
					uni.showModal({
						title: _this.$t('exchange.releaseProcess'),
						showCancel: false,
						content: _this.$t('exchange.processContent'),
						success: function(res) {
							if (res.confirm) {
								uni.showToast({
									icon: 'none',
									title: _this.$t('exchange.releaseSuccess'),
									duration: 5000,
								})
							}
						}
					})
				}
			},
			// 发布修改交易信息
			async publishExchangeList() {
				if (!Number(this.region_coin_price) || !Number(this.usdt_price)) {
					return
				}
				let data = {
					id: this.id,
					merchant_name: this.merchant_name,
					region_coin_price: this.region_coin_price,
					usdt_price: this.usdt_price,
					tradet_num: this.tradet_num,
					type: this.type,
					tradet_type: this.tradet_type_
				}
				if (data.id === '') delete(data.id)
				let res = await uni.ajax.public_publishExchangeList({
					...data
				});
				if (res) {
					uni.$u.toast(this.$t('exchange.successfullyPublished'))
					this.getMyExchangeInfo()
					this.page = 1
					this.getExchangeList()
				} else {

				}
			},
			// 获取当前用户上榜信息
			async getMyExchangeMemberInfo() {
				let res = await uni.ajax.public_getMyExchangeMemberInfo();
				if (Object.keys(res.data).length !== 0) {
					if (res.data.apply_status == 2) {
						this.isOnlist = true
						this.audit = false
					} else {
						this.isOnlist = false
						this.audit = true
					}
				} else {
					this.audit = false
					this.isOnlist = false
				}
			},
			// 获取我发布的交易信息
			async getMyExchangeInfo() {
				let res = await uni.ajax.public_getMyExchangeInfo({
					type: this.type,
					tradet_type: this.tradet_type
				});
				if (Object.keys(res.data).length !== 0) {
					this.id = res.data.id
					this.merchant_name = res.data.merchant_name
					this.region_coin_price = res.data.region_coin_price
					this.usdt_price = res.data.usdt_price
					this.tradet_num = res.data.tradet_num
					this.tradet_type_ = res.data.tradet_type
					this.btn_type = 'change'
				} else {
					this.id = ''
					this.region_coin_price = ''
					this.usdt_price = ''
					this.tradet_num = ''
					this.tradet_type_ = 1
					// if (this.isAgent) {
					// 	this.tradet_type_ = ''
					// 	this.goodsType = this.$t('exchange.gemstone')
					// } else {
					// 	this.tradet_type_ = 1
					// 	this.goodsType = this.$t('exchange.gemstone')
					// }
					this.btn_type = 'release'
				}
			},
			// 下架商品
			async delExchangeInfo(id) {
				let res = await uni.ajax.public_delExchangeInfo({
					id: id
				});
				if (res.msg === 'success') {
					this.$u.toast('del success')
					this.getExchangeList()
				}
			},
			// 获取取消上榜信息
			async getCancelExchangeMemberApply() {
				let res = await uni.ajax.public_getCancelExchangeMemberApply();
				if (Object.keys(res.data).length !== 0) {
					this.isCancel = true
				} else {
					this.isCancel = false
				}
			},
			// 申请取消上榜
			async applyCancelExchangeMember() {
				let res = await uni.ajax.public_applyCancelExchangeMember();
				if (res) {
					this.$u.toast('Cancel Success')
					this.getCancelExchangeMemberApply()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			// padding: 25rpx 0;

			&__text {
				font-size: 15px;
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}

	.exchange {
		width: 100%;
		min-height: 100%;
		padding: 20rpx 20rpx 0;
		color: #000;
		background-color: rgb(54, 53, 87);

		.web3_modal {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 100;
			background-color: rgba(0, 0, 0, 0.5);
			font-size: 60rpx;
			line-height: 100rpx;

			.modal_content {
				width: 80%;
				min-height: 50%;
				background: url('/static/exchange/web3_bg.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: center;
				padding: 100rpx 40rpx;

				.bottom {
					font-size: 72rpx;
					background-color: #fff;
					color: #002da9;
					border-radius: 10rpx;
				}

				.close_btn {
					position: absolute;
					top: -70rpx;
					right: 0;
				}
			}
		}




		/deep/ .u-fade-enter-to {
			z-index: 800 !important;
		}

		/deep/ .u-fade-zoom-enter-to {
			z-index: 805 !important;
		}

		/deep/ .u-modal__content {
			padding: 20rpx 0 0;
		}

		/deep/ .u-popup__content {
			overflow: hidden;
		}

		/deep/ .u-number-box__input {
			width: 100rpx !important;
		}

		.border_red {
			border: 4rpx solid red;
		}

		.relieve_modal {
			/deep/ .u-popup__content {
				background-color: #ccc !important;
				padding: 20rpx !important;
			}

			.relieve {
				padding: 60rpx 20rpx;
				border-radius: 20rpx;
				margin-bottom: 40rpx;
				background-color: #fff;
			}

			.relieve_confirm {
				text-align: center;
				width: 45%;
				padding: 30rpx 30rpx;
				border-radius: 60rpx;
				border: 4rpx solid rgb(109, 79, 207);
				// background-color: #fff;
				font-size: 40rpx;
				color: rgb(109, 79, 207);
			}

			.relieve_cancel {
				text-align: center;
				width: 45%;
				padding: 30rpx 30rpx;
				border-radius: 60rpx;
				font-size: 40rpx;
				color: #fff;
				background-color: rgb(109, 79, 207);
			}
		}

		.close_icon {
			position: absolute;
			right: 10rpx;
			top: 10rpx;

			/deep/ .u-icon__icon {
				border: 2rpx solid #ccc !important;
				border-radius: 50%;
				color: #ccc;
			}
		}

		.copy {
			line-height: 60rpx;
			padding: 0 20rpx;
			border-radius: 10rpx;
			margin-left: 10rpx;
			color: #fff;
		}

		.fdc {
			flex-direction: column;
		}

		.ml-20 {
			margin-left: 20rpx;
		}

		.mb-20 {
			margin-bottom: 20rpx;
		}

		.fw {
			font-weight: bold;
		}

		.pr {
			position: relative;
		}

		.type_list {
			width: 200rpx;
			padding: 10rpx;
			border-radius: 20rpx;
			overflow-y: scroll;
			background-color: #ccc;
			position: absolute;
			z-index: 100;
			top: 60rpx;
			right: 0;

			.type_item {
				width: 100%;
				text-align: center;
				padding: 20rpx 0;
				border-bottom: 2rpx solid #ccc;
			}
		}

		.right_icon {
			position: absolute;
			right: 20rpx;
			top: 0rpx;
			height: 100rpx;
		}

		.change_btn {
			background-color: rgb(100, 201, 75);
			padding: 10rpx 20rpx;
			color: #fff;
			border-radius: 20rpx;
		}

		.df {
			display: flex;
		}

		.jc {
			justify-content: center;
		}

		.alc {
			align-items: center;
		}

		.spb {
			justify-content: space-between;
		}

		.transaction {
			padding: 20rpx;
			background-color: #f5f5f5;

			.transaction_title {
				text-align: center;
				line-height: 100rpx;
				font-weight: bold;
				font-size: 40rpx;
			}
		}

		.tab {
			width: 100%;
			margin: 0 auto;

			/deep/ .u-subsection--button {
				height: 100rpx;
				font-size: 50rpx;
				border-radius: 50rpx;
				background-color: rgb(109, 79, 207) !important;
			}

			/deep/ .u-subsection--button__bar {
				border-radius: 60rpx !important;
			}


			/deep/ .u-subsection__item__text {
				font-size: 30rpx !important;
			}
		}

		.menu_list {
			padding-bottom: 150rpx;
		}

		.menu_list_item {
			border-radius: 20rpx;
			overflow: hidden;
			background-color: #fff;
			margin-bottom: 20rpx;

			.mine {
				position: absolute;
				left: 40%;
				top: 40%;
				color: red;
				transform: rotate(315deg);
				opacity: 0.2;
			}

			.up_conent {
				width: 100%;
				padding: 20rpx;
				justify-content: space-between;

				.up_conent_left {
					width: 60%;

					.up_left {
						margin-right: 20rpx;
					}

					.up_middle {
						align-items: flex-start;
						font-size: 28rpx;

						.up_middle_bottom {
							padding-right: 8rpx;
							margin: 4rpx 0;
						}
					}
				}

				.up_right {
					flex: 1;
					flex-direction: column;
					color: rgb(235, 179, 241);

					.up_right_btn {
						margin-top: 40rpx;
						padding: 0 50rpx;
						color: #fff;
						height: 60rpx;
						line-height: 60rpx;
						border-radius: 60rpx;
						background: linear-gradient(to right, rgb(105, 222, 240), rgb(141, 126, 253));
					}
				}
			}

			.down_conent {
				background-color: rgb(109, 79, 207);
				width: 100%;
				padding: 10rpx;
				color: #fff;
				font-size: 26rpx;
				text-align: center;

				.down_conent_left {
					width: 45%;
					flex-direction: column;
					padding: 10rpx 0;
					border-right: 2rpx solid #fff;
				}

				.down_conent_right {
					flex: 1;
					padding: 10rpx 0;
					flex-direction: column;
				}
			}
		}

		.release_goods {
			width: 100%;
			background-color: #eee;
			padding: 20rpx;

			.release_goods_type {
				position: relative;
				background-color: #fff;
				padding: 20rpx;
				border-radius: 10rpx;

				text {
					width: 30%;
				}
			}

			.release_goods_item {
				margin: 40rpx 0;
				padding: 0 20rpx;
				background-color: #fff;
				border-radius: 10rpx;

				text {
					width: 30%;
				}
			}

			.release_goods_ipt {
				flex: 1;
				background-color: #fff;
				padding: 20rpx;
				height: 100rpx;
				border-radius: 10rpx;
			}

			.release_btn {
				width: 100%;
				text-align: center;
				background-color: #ccc;
				line-height: 100rpx;
				border-radius: 20rpx;
				color: #fff;
				font-weight: bold;
				font-size: 40rpx;
			}

			.is_click {
				background-color: rgb(109, 79, 207);
			}
		}

		.footer {
			position: fixed;
			z-index: 10;
			width: 100%;
			border-radius: 20rpx 20rpx 0 0;
			padding: 20rpx;
			bottom: 0;
			left: 0;
			background-color: #fff;

			.not_on_list {
				width: 100%;
			}

			.on_list {
				width: 100%;
				justify-content: space-between;

				.on_list_item {
					width: 48%;
				}
			}

			.footer_bth {
				padding: 0 20rpx;
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 100rpx;
				font-weight: bold;
				color: #fff;
				font-size: 40rpx;
				margin: 0;
				background-color: rgb(2, 224, 231);
				border: none !important;

				::after {
					content: '';
				}
			}

			.relieve {
				background-color: transparent;
				color: rgb(2, 224, 231);
				border: 4rpx solid rgb(2, 224, 231) !important;
			}
		}


	}
</style>