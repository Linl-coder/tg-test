<template>
	<view class="mainland">
		<view class="buy_title" v-if="!isOnlineExam">
			<view class="buy_card">
				{{$t('mainland.title')}}
			</view>
		</view>
		<view class="buy_box flex-center" v-if="!isOnlineExam">
			<view class="card_box" v-if="!isOnlineExam">
			</view>
			<view class="lightBox" v-if="!isOnlineExam">
			</view>
			<view class="buy_container_bg" v-if="!isOnlineExam">
				<view class="buy_container">
					<view class="monekey_card_box flex-end">
						<view class="monekey_card_main flex-between" @click="toDetails(84, 0)">
							<view class="monekey">
							</view>
							<view class="monekey_text flex-center">
								<text>APE CARDx7</text>
							</view>
						</view>
					</view>
					<view class="buy_info_box buy_info2">
						<view class="buy_info_item  buy_btn_name">{{$t('mainland.boredCard')}}</view>
						<view class="buy_info_item buy_btn_pri">$ {{card_info.price}}/ 7{{$t('utils.ticket')}}
						</view>
					</view>
					<view class="buy_btn" @click="buy_popup = true">
						<view class="">
							{{$t('mainland.buyNow')}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="play_nav_box  bold flex-center" v-if="!isOnlineExam"
			@tap="topage('gather/mainland/playMethod_introdu/playMethod_introdu')">
			<view class="play_nav_box_bg">
				<div class="flex-colum-evenly">
					<p><span>{{$t('mainland.lookHere')}}</span> <span>>>></span> </p>
					<p>{{$t('mainland.loolTip')}}</p>
				</div>
			</view>
		</view>
		<!-- 游戏列表 -->
		<view style="background: #f5f5f5;border-radius: 40rpx;overflow: hidden;">
			<view class="card">
				<view class="card_title">{{$t('mainland.materialApp')}}</view>
				<u-grid col="5">
					<u-grid-item v-for="(item,index) in menuList" :key="index" @click="navigator(item)"
						class="u-icon--bottom">
						<view v-if="typeof(item.icon)==='string'"
							style="display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
							<u-icon :name="item.icon" :label="$t(item.title)" width="78rpx" height="78rpx"
								label-color="#121317" label-size="24rpx" label-pos="bottom" space="8rpx"></u-icon>
						</view>
						<view v-else style="display: flex;flex-direction: column;
							justify-content: center;align-items: center;text-align: center;">
							<u-icon v-for="(i,j) in item.icon" :class="j==currentFrame?'active_nav':'no_active_nav'"
								:name="i" :label="$t(item.title)" width="78rpx" height="78rpx" label-color="#121317"
								label-size="24rpx" label-pos="bottom" space="8rpx">
							</u-icon>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="gardener_box">
			<view class="gardener_text_box">
			</view>
			<view class="play_guild_box flex-center">
			</view>
		</view>
		<!-- 总资产 -->
		<view class="asset flex-center">
			<view class="asset_card" style="height: 135rpx;">
				<view class="asset_card_item" :style="{'--asset-card-bg':'url(/static/Continent/i33.png)'}"
					@click="assetAll">
					<view class="flex-start">
						<u-image src="/static/btn/gem-icon1.png" width="46rpx" height="46rpx"
							style="margin-right: 10rpx;"></u-image>
						<p class="asset_info_num" v-show="showCount==0">
							<u-count-to :start-val="parseFloat(fakeGemstoneOld)" :end-val="parseFloat(fakeFood)"
								:duration="2000" :use-easing="false" :decimals="8" color="#fff" ref="countTo"
								bold></u-count-to>
						</p>
						<p class="asset_info_num" v-show="showCount==1">
							<u-count-to :start-val="gemstoneOld ? parseFloat(gemstoneOld):parseFloat(user_info.food)"
								:end-val="parseFloat(user_info.food)" :duration="2000" :use-easing="false" :decimals="8"
								color="#fff" ref="countTo" bold></u-count-to>
						</p>
						<p class="asset_info_num" v-show="showCount==3">
							<text>{{gemstoneOld}}</text>
						</p>
					</view>
				</view>
			</view>
			<!-- 每日产量 -->
			<view class="gem_desc">
				<view class=" df alc" style="justify-content: flex-end;" @click="today_show=true">
					<u-image src="/static/btn/gem-icon1.png" width="24rpx" height="24rpx"
						style="margin-right: 4rpx;"></u-image>
					<span>{{totolDayRate}}</span>/{{$t('utils.day')}}
					<u-icon name="arrow-right" size="16" color="#fff"></u-icon>
				</view>
			</view>
		</view>
		<!-- 矿山选项卡 -->
		<view class="content">
			<view class="tabs">
				<view :class="['tabs_item',current == item.type ? 'active' : '']" v-for="(item,index) in tabs"
					:key="index" @click="currentChange(item)">
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="wrap">
				<block v-if="current == '1'" class="wrap1">
					<view class="my_property flex-evenly">
						<view class="my_property_item  my_friends" @tap="myFriend">
							<view class="imgBox">
								<image src="/static/Continent/my_friends.png" mode=""></image>
							</view>
							<view class="text flex-colum-evenly">
								<p>{{user_info.invitedCount}}</p>
								<p>{{$t('mainland.myFriends')}}</p>
							</view>
						</view>
						<view class="my_property_item my_card">
							<view class="imgBox">
								<image src="/static/Continent/my_monkey.png" mode=""></image>
							</view>
							<view class="text flex-colum-evenly">
								<p>{{user_info.countPool}}</p>
								<p>{{$t('mainland.myMonkey')}}</p>
							</view>
						</view>
					</view>
					<field :info="fieldList" :currentActive="currentActive" :food="user_info.food*1"
						v-if="fieldList_result==4" @upConfirm='upConfirm'></field>
					<view class="mineCave_level_box flex-between">
						<view class="level">
							{{$t('mainland.mineCave')}}Lv.{{fieldList.mine_grade}}
						</view>
						<view class="day_icome flex-center" v-show="fieldList.is_explore_status!=1">
							<image src="/static/btn/gem-icon1.png" mode="heightFix">
							</image>
							<text><span>{{fieldList.day_rate}}</span>/{{$t('utils.day')}}</text>
						</view>
						<view class="countDown flex-between" v-show="fieldList.is_explore_status==1">
							<p style="margin-top: -4rpx;">{{$t('mainland.lastExploreTime')}} </p>
							<u-count-down :time="fieldList.explore_surplus_time * 1000" format="HH:mm:ss"
								@finish="finishCount"></u-count-down>
						</view>
					</view>
					<view class="buy_btn buy_card" v-if="!isOnlineExam">
						<view class="explore flex-colum"
							v-if="fieldList.mine_cumulative_time/fieldList.mine_excavation_cycle_time>=1 || fieldList.mine_is_full==1"
							@click="explore_card_popup = true">
							<p>{{$t('mainland.upgMineImm')}}</p>
							<p>{{$t('mainland.upgradeRestore')}}</p>
						</view>
						<view class="" v-else @click="buy_popup = true">
							{{$t('mainland.buyCardDigGem')}}
						</view>

					</view>
					<view class="" style="height:20rpx;">
					</view>
					<view class="" v-for="(item,index) in friendList" :key="index">
						<field :friendInfo="item" :currentActive="currentActive" :to_other_page="to_other_page"
							:nextUpgrad="nextUpgrad" :type="2">
						</field>
					</view>
				</block>
				<!-- 宝石矿场 -->
				<block v-if="current == '2'" class="wrap2">
					<view class="monkey_box flex-center">
						<view class="monkey_content flex-between">
							<view class="myApe flex-between">
								<view class="myApe_box flex-start">
									<view class="myApe_img">
										<image src="/static/Continent/my_monkey.png" mode="heightFix"></image>
									</view>
									<view class="myApe_text">
										<text>{{$t('mainland.myMonkey')}}</text>
									</view>
								</view>
								<view class="num bold color_w">
									{{user_info.countPool}}
								</view>
							</view>
							<view class="buyApe_btn flex-center bold" v-if="!isOnlineExam" @click="buy_popup = true">
								{{$t('mainland.buyBoredApe')}}
							</view>
						</view>
					</view>
					<view class="add_field  df fdc alc jc pr">
						<!-- <view class="fw"
							style="padding: 10rpx;background-color: #fff;border-radius: 10rpx;margin-bottom: 20rpx;">
							{{$t('mainland.activated')}}:{{totalCount}}/{{max_mine}}
						</view> -->
						<view class="add_btn flex-center" @click="landLevel">
							<u-icon name="/static/Continent/i35.png" width="44rpx" height="44rpx"></u-icon>
							<text style="margin-left: 8rpx;">{{$t('mainland.openNewMine')}}</text>
						</view>
						<view class="day_rate flex-end">
							<text>{{$t('mainland.Traditional')}}</text>：
							<view class="flex-center">
								<image src="/static/btn/gem-icon1.png" mode="heightFix" style="height:24rpx;">
								</image>
								<text>
									<span>{{mine_field_food}}</span>/{{$t('utils.day')}}</text>
							</view>
						</view>
					</view>
					<view class="" v-for="item,index in fieldList2" :key="index">
						<field :info="item" :currentActive="currentActive">
						</field>
					</view>
				</block>
				<iloading :result="fieldList_result"></iloading>
			</view>
			<!-- open  higher condiation -->
			<view class="openHigher_box" v-show="current == '1'">
				<view class="field_title openHigher_title flex-between">
					<view class="name">
						Level {{nextUpgrad.next_grade}}
					</view>
					<view class="introduce" v-if="!isOnlineExam" @tap="to_js(3)">
						<u-icon name="arrow-right" size="24rpx" color="rgba(255, 255, 255,1)"
							:label="$t('utils.senior')+' '" labelSize="24rpx" label-color="rgba(255, 255, 255,1)"
							labelPos="left"></u-icon>
					</view>
				</view>
				<view class="openHigher_bg flex-start"
					@tap="topage('general/invite/myFriend2_progress?info='+JSON.stringify(nextUpgrad))">
					<view class="openHigher_condition flex-start bold">
						<view v-if="nextUpgrad.next_grade!=5" class="openHigher_condition_inner flex-colum-evenly">
							<p class="flex-start">
								{{$t('mainland.mining')}}1{{$t('mainland.team')}}{{$t('mainland.dig')}}
								<image src="/static/btn/gem-icon1.png" mode=""></image>
								{{nextUpgrad.next_grade==5?nextUpgrad.upgrade_special_condition.food_num: nextUpgrad.upgrade_need_food_num}}{{$t('mainland.canOpen')}}>
							</p>
							<p style="width: 320rpx;">
								<u-line-progress inactiveColor="#354151"
									:percentage="nextUpgrad.income_food/nextUpgrad.upgrade_need_food_num*100"
									activeColor="#9867DF" height="26" :showText="true">
									<template #default>
										<text class="progress_text" style="position: absolute; left: 0;">
											{{ nextUpgrad.income_food | toFixed2 }}/{{ nextUpgrad.upgrade_need_food_num }}
										</text>
									</template>
								</u-line-progress>
							</p>
						</view>
						<view class="five_condiation" v-else>
							<p>
								LEVEL1{{$t('mainland.have')}}
								<span>{{nextUpgrad.upgrade_special_condition.friend_num}}</span>
								{{$t('mainland.teamMem')}}
								<span>{{nextUpgrad.upgrade_special_condition.friend_num}}</span>{{$t('mainland.teamTip1')}}
								<image src="/static/btn/gem-icon1.png" style="height: 26rpx;" mode="heightFix"></image>
								<span>{{nextUpgrad.upgrade_special_condition.food_num}}</span>{{$t('mainland.gemStone')}}{{$t('mainland.canOpenDig')}}
								<span>Level {{nextUpgrad.next_grade}}</span>>
							</p>
						</view>
					</view>
				</view>
			</view>
			<!-- play  method -->
			<view class="play_method_box" v-show="current == '1'">
				<view class="play_method_text">
					{{$t('mainland.newMusLook')}}
				</view>
				<view class="play_method_bg">
					<view class="play_text1">
						<p style="color: #000;">{{$t('mainland.guild1')}}</p>
					</view>
					<view class="play_text2_mid flex-around">
						<view class="play_text2">
							<p style="color: #000;">{{$t('mainland.guild2')}}</p>
						</view>
						<view class="play_text3">
							<p style="color: #000;">{{$t('mainland.guild3')}}</p>
						</view>
					</view>
					<view class="play_text4 flex-center">
						<p style="color: #000;">{{$t('mainland.guild4')}}</p>
					</view>
				</view>
			</view>
			<!-- mine play method -->
			<view class="mine_intro  play_method_box" v-show="current == '2'">
				<view class="play_method_text">
					{{$t('mainland.gemMineMustSee')}}
				</view>
				<view class="play_method_bg">
					<view class="play_text1">
						<p style="color: #000;">{{$t('mainland.guild5')}}</p>
					</view>
					<view class="play_text2_mid flex-around">
						<view class="play_text2">
							<p style="color: #000;">{{$t('mainland.guild6')}}</p>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="today_modal df alc jc c_w" v-show="today_show">
			<view class="modal_content df fdc acl pr">
				<view class="title tc fw">
					{{$t('mainland.detail')}}
				</view>
				<view class="text_content">
					<view class="content">
						<view class="content_item">
							<text style="margin-right: 10rpx;">{{$t('mainland.MineOutput')}}:</text>
							<text>{{mine_hole_food}}</text>
						</view>
						<view class="content_item">
							<text style="margin-right: 10rpx;">{{$t('mainland.MiningMachineOutput')}}:</text>
							<text>{{mine_field_food}}</text>
						</view>
						<view class="content_item">
							<view style="margin-right: 10rpx;">
								{{$t('mainland.FriendsSupport')}}({{$t('mainland.MineAndminingMachine')}}):</text>
							</view>
							<text>{{rate2}}</text>
						</view>
					</view>
					<u-icon class="close_btn" name="close-circle" color="#fff" size="30"
						@click="today_show=false"></u-icon>
				</view>
			</view>
		</view>
		<u-popup :show="explore_card_popup" bgColor="#F0F0F0" :closeable="true" :round="10" mode="center"
			@close="close">
			<view class="uoGrade_box">
				<view class="title flex-center bold">
					<text>{{$t('mainland.upgradeMineNeed')}}
					</text>
					<view class="">
						<font style="color:#babb6c;margin-right: 4rpx;"> 7 </font> {{$t('utils.ticket')}}
						{{$t('mainland.boreCard')}}
					</view>
				</view>
				<view class="upgrade_good flex-colum-evenly">
					<p class="flex-start">
						<image src="/static/else/checkmark.png" mode="heightFix"></image>
						<text>{{$t('mainland.improvMiningEff')}}
							<!-- <image src="/static/else/up.png" mode="heightFix"></image> -->
						</text>
					</p>
					<p class="flex-start">
						<image src="/static/else/checkmark.png" mode="heightFix"></image>
						{{$t('mainland.mineIcomeAdd')}}+1%
					</p>
				</view>
				<view class="buyCard_btn flex-center color_w" @click="openBuyPop" v-if="user_info.countPool<7">
					{{$t('mainland.toBuyCard')}}
				</view>
				<view class="buyCard_btn flex-center color_w" @click="upgradeNow(fieldList.mine_id)" v-else>
					{{$t('mainland.upgradeNow')}}
				</view>
				<view class="canUsedCard flex-center">
					{{$t('mainland.canUsedCard')}}
					<font style="color:#babb6c;">{{user_info.countPool}}</font> {{$t('utils.ticket')}}
				</view>
			</view>
		</u-popup>
		<!-- 园丁弹框 -->
		<u-popup :show="firend_box_popup" mode="center">
			<view class="firend_box">
				<image src="/static/Continent/i31.png"></image>
				<view class="info">
					<view class="flex-start">
						<image src="/static/Continent/i20.png" mode=""></image>
						<text class="info_name">兔子：X{{user_info.gardener}}</text>
					</view>
					<!-- <text class="info_name info_name_">大师：X{{user_info.highGardener}}</text> -->
					<view class="btn flex-center" @click="firend_box_popup = false">
						确定
					</view>
				</view>
			</view>
		</u-popup>
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
							<span>{{totolPrice}}</span>
							<span>{{'('+$t('mainland.sigalBuyOnce')+')'}}</span>
						</view>
					</view>
					<u-icon name="close" @click="buy_popup = false" size="22"></u-icon>
				</view>
				<view class="buy_popup_num ">
					<view class="maximum_num flex-center">
						{{$t('index.plsSelectBuyNum')}}
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
					<view class="buy_btn solo_out_btn bold" v-if="showOnlineBuyCard==0">
						<p>{{$t('mainland.onlineStoreBuy')}}</p>
						<p>
							<image src="/static/Continent/sold_out.png" mode="heightFix"></image>
						</p>
					</view>
					<view class="buy_btn online_buy bold" v-else>
						<p>{{$t('index.onlineBuy')}}</p>
					</view>
				</view>
				<view class="buy_popup_btn flex-center" @click="toShopManager">
					<view class="buy_btn bold">
						{{$t('mainland.findAgentBuy')}}
					</view>
				</view>
			</view>
		</u-popup>
		<!-- @open="shop_getApiList" -->
		<view>
			<u-popup :show="show_goods_box" bgColor="transparent" round="40rpx" closeable
				@close="show_goods_box = false">
				<view class="goods_box">
					<view class="goods_box_title">
						{{$t('mainland.connectAgentBuy')}}
					</view>
					<view class="flex-between goods_list_all">
						<view class="all_shop_manager" @tap="topage('gather/mainland/shop_manager_item')">
							<u-icon name="arrow-right" color="#030104" size="24rpx" :label="$t('mainland.seeAllAgent')"
								label-color="#030104" label-size="24rpx" label-pos="left"></u-icon>
						</view>
					</view>
					<scroll-view scroll-y class="scroll" lower-threshold="50">
						<view class="goods_box_item" v-for="(item,index) in agent_list" :key="index">
							<!-- <view class="df alc have_card" style="justify-content: flex-end;">
								{{$t('mainland.nowHave')}}：xxx x7
							</view> -->
							<view class="address flex-between">
								<text class="address_name">{{item.address||' '}}</text>
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
								<view class="contact_list " v-if="item.telegram">
									<!-- <view class="contact_information_list">
										<view class="contact_information_item" style="margin-right: 14rpx;"
											v-show="item.facebook" @click="contact('facebook',item.facebook)">
											<u-icon name="/static/Continent/fb.png" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.facebook}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx"
												stop></u-icon>
										</view>
										<view class="contact_information_item" v-show="item.zalo"
											@click="contact('zalo',item.zalo)">
											<u-icon name="/static/Continent/zalo.png" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.zalo}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx"
												stop></u-icon>
										</view>
									</view> -->
									<view class="contact_information_list">
										<view class="contact_information_item " style="margin-right: 14rpx;"
											v-show="item.telegram" @click="contact('telegram',item.telegram)">
											<u-icon name="/static/Continent/tg.jpg" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.telegram}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx"
												stop></u-icon>
										</view>
										<!-- <view class="contact_information_item" v-show="item.whatsapp"
											@click="contact('whatsapp',item.whatsapp)">
											<u-icon name="/static/Continent/wa.jpg" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.whatsapp}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx"
												stop></u-icon>
										</view> -->
									</view>
								</view>
								<view class="contact_list" v-else>
									{{$t('utils.notSetContact')}}
								</view>
							</view>
						</view>
						<u-empty v-show="!agent_list" mode="list">
						</u-empty>
					</scroll-view>
				</view>
			</u-popup>
		</view>
		<!-- 开启宝石矿场的提示弹框 -->
		<u-popup :show="opendGemMine" bgColor="#F1F1F1" round="10" @close="opendGemMine = false" mode="center">
			<view class="main_box flex-center">
				<view class="top_imgBox flex-center">
					<image class="top_imgBox_img" src="/static/Continent/treasure_box.png" mode="heightFix"></image>
				</view>
				<view class="center_tip flex-colum-evenly">
					<p>{{$t('mainland.noticeTitle')}}</p>
					<p>{{$t('mainland.openSuccess')}}{{openGemMineName}}</p>
				</view>
				<view class="confir_btn bold flex-center" @click="opendGemMine=false">
					{{$t('utils.confirm')}}
				</view>
			</view>
		</u-popup>
		<tabbar :pageSrc="'pages/gather/mainland/index'" :tabList='tabList' :lang='language'></tabbar>
	</view>
</template>

<script>
	import {
		userinfo
	} from "@/common/mixins/index.js";
	import pmenu from "@/components/pmenu/pmenu.vue";
	import field from "./components/field.vue";
	import countTo from 'vue-count-to';
	// 引入加密库
	import CryptoJS from 'crypto-js';
	import tabbar from '@/components/tabbar.vue';
	import Decimal from 'decimal.js'

	export default {
		mixins: [userinfo],
		components: {
			pmenu,
			field,
			countTo,
			tabbar
		},
		filters: {
			toFixed2(value) {
				if (!value) {
					return '0';
				}

				if (value == 0) {
					return '0';
				}
				if (typeof value === 'number' || !isNaN(parseFloat(value))) {
					return parseFloat(value).toFixed(2);
				}
				return value;
			}
		},
		computed: {
			totolPrice() {
				return (this.card_info.price);
			},
			user_info() {
				return this.$store.getters.get_user_info
			},
			is_login() {
				return this.$store.getters.is_login;
			},
			end_val() {
				return this.$store.getters.get_end_val;
			}
		},
		watch: {
			'user_info.countPool': {
				handler(newVal, oldVal) {
					if (newVal != oldVal) {
						this.shop_getFriendMine();
					}
				}
			},
			'fakeFood': {
				immediate: true, // 立即执行一次
				handler(newVal, oldVal) {
					if (oldVal != 0 && newVal > oldVal) {
						this.fakeGemstoneOld = oldVal;
					} else {
						if (this.user_info.food) {
							this.fakeGemstoneOld = this.user_info.food;
						} else {

						}
					}
				}
			},
			'user_info.food': {
				immediate: true, // 立即执行一次
				handler(newVal, oldVal) {
					if (this.current == 1) {
						this.shop_getFriendMine();
					}
					if (this.current == 2) {
						this.shop_landList(2)
					}
					uni.setStorageSync('food', newVal);
					// const res = this.jugeIsOpenMine();
					if (typeof oldVal != 'undefined' && newVal != oldVal) {
						this.showCount = 1;
						this.gemstoneOld = oldVal;
						if (typeof newVal == 'undefined' && oldVal) {
							// console.log("================出现NaN===============");
							uni.setStorageSync('food', oldVal);
							this.showCount = 3;
						}
					} else {
						// if (res) {
						// 	this.timedGrowed(2000);
						// }
					}
				}
			}
		},
		data() {
			return {
				isOnlineExam: uni.getStorageSync('isOnlineExam'),
				max_mine: uni.getStorageSync('max_mine'),
				totalCount: 0,
				today_show: false,
				currentFrame: 0,
				currentActive: 0,
				nextUpgrad: {},
				friendList: [],
				opendGemMine: false,
				openGemMineName: '',
				explore_card_popup: false,
				language: '',
				showCount: 1,
				fakeFood: 0,
				timer: null, // 定时器
				fakeGemstoneOld: '',
				gemstoneOld: '',
				menuList: [],
				tabs: [],
				page: 1,
				current: '1',
				fieldList: {}, // 矿洞数据,
				fieldList2: [], // 矿场数据,
				fieldList_result: 1,
				firend_box_popup: false,
				buy_popup: false, // 购买弹框
				current_quantity: 7,
				show_goods_box: false,
				agent_list: [],
				canScroll: true,
				card_info: {
					price: 0,
					imgs: []
				},
				rate2: '',
				mine_day_product: '',
				mine_hole_food: "",
				mine_field_food: "",
				totolDayRate: '',
				miningComplete: false, // 挖矿是否完成的标志
				showOnlineBuyCard: 0,
				count: 0,
				interval1: null,
				to_other_page: false,
				tabList: []
			}
		},
		onLoad(option) {
			this.shop_getMinePool();
			this.jugeShowOnlineCard();
		},
		onShow: function() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary");
			// #endif
			this.get_user_info();
			this.tabs = [{
					name: this.$t('mainland.tab1'),
					type: '1'
				},
				{
					name: this.$t('mainland.tab2'),
					type: '2'
				},
				{
					name: this.$t('mainland.tab3'),
					type: '3'
				},
			]
			if (this.interval1) {
				clearInterval(this.interval1);
			}
			this.language = uni.getStorageSync('locale');
			this.tabList = uni.getStorageSync('tabList') || [];
			this.interval1 = setInterval(this.nextFrame, 300);
			if (this.is_login) {
				// 移除之前的监听器
				uni.$off('query');
				uni.$off('queryGame');
				this.shop_getFriendMine();
				uni.$once('openBuyModal', (query) => {
					if (query.isShow == 1) {
						this.buy_popup = true;
						uni.$off('openBuyModal');
					}
				})
				uni.$once('query', (query) => {
					if (query.needQuest == 1) {
						this.shop_landList(2);
					} else {
						this.shop_getFriendMine();
					}
				})
				uni.$once('queryGame', (query) => {
					if (query.reload == 1) {
						console.log('queryGame')
						this.get_user_info();
					}
				})
				if (this.end_val <= 0) {
					this.$store.commit("set_end_val", this.user_info.food);
				}
				const curData = uni.getStorageSync('cur');
				if (curData == 3) {
					this.shop_getFriendMine();
					this.current = 1;
				}
			}
			this.page = 1
			this.canScroll = true
			this.agent_list = []
			this.getAgentList();
			this.public_getExamConfig()
		},
		onUnload() {
			if (this.timer) {
				this.stopFakeUpdate();
				this.timer = null;
			}
			this.to_other_page = true
			if (this.interval1) {
				clearInterval(this.interval1);
			}
		},
		onHide() {
			if (this.timer) {
				this.stopFakeUpdate();
				this.timer = null;
			}
			if (this.interval1) {
				clearInterval(this.interval1);
			}
		},
		mounted() {},
		beforeDestroy() {
			if (this.interval1) {
				clearInterval(this.interval1);
			}
			this.stopFakeUpdate();
		},
		methods: {
			toShopManager() {
				this.topage('gather/mainland/shop_manager_item')
			},
			upConfirm(data) {
				this.explore_card_popup = true
			},
			contact(type, data) {
				if (type === 'telegram') {
					// #ifdef H5
					window.open("https://t.me/" + data, '_blank');
					// #endif
					// #ifdef APP
					plus.runtime.openURL("https://t.me/" + data, function(e) {
						alert("Open system default browser failed: " + e.message);
					});
					// #endif
				}
				// else if (type === 'whatsapp') {
				// 	// whatsapp
				// 	// #ifdef H5
				// 	window.open("https://api.whatsapp.com/send?phone=" + data, '_blank');
				// 	// #endif
				// 	// #ifdef APP
				// 	plus.runtime.openURL("https://api.whatsapp.com/send?phone=" + data, function(e) {
				// 		alert("Open system default browser failed: " + e.message);
				// 	});
				// 	// #endif
				// } else {
				// 	this.copy(data)
				// }
			},
			myFriend() {
				if (!this.isOnlineExam) {
					this.topage('general/invite/myFriend_all')
				}
			},
			assetAll() {
				if (!this.isOnlineExam) {
					this.topage('gather/mainland/myAssets/myAssets?type=cereal')
				}
			},

			nextFrame() {
				this.currentFrame++
				this.currentActive++
				if (this.currentFrame > 9) this.currentFrame = 0
				if (this.currentActive > 5) this.currentActive = 0
			},
			jugeShowOnlineCard() {
				this.showOnlineBuyCard = uni.getStorageSync('onlineBuyCard');
			},
			toDetails(id, index) {
				uni.navigateTo({
					url: '/pages/gather/goodDetails/goodDetails?id=' + id + '&index=' + index,
				})
			},
			to_js(type) {
				this.topage(`gather/mainland/initial_intro/initial_intro?type=${type}`)
			},
			async upgradeNow(mine_id) {
				let res = uni.ajax.mineCave_upgrade({
					mine_id,
				})
				// 使用 then 方法获取 PromiseResult
				res.then((result) => {
					if (result.code == 200) {
						console.log("升级成功--------");
						uni.setStorageSync('up_show', 0)
						uni.$u.toast(this.$t("mainland.upgradeSuccess"));
						this.shop_getFriendMine();
						this.get_user_info();
					}
				}).catch((error) => {
					console.error(error);
				});
				this.explore_card_popup = false;
			},
			finishCount() {
				this.shop_getFriendMine();
			},
			openBuyPop() {
				this.explore_card_popup = false;
				this.buy_popup = true;
			},
			close() {
				this.explore_card_popup = false;
			},
			async public_getExamConfig() {
				let res;
				if (uni.getStorageSync('is_login')) {
					res = await uni.ajax.public_getExamInfo();
				} else {
					res = await uni.ajax.public_getExamConfig();
				}
				// 确保res.data和res.data.link_list存在并且是数组
				if (res.data && Array.isArray(res.data.link_list)) {
					// 过滤掉没有title的项
					const {
						link_list
					} = res.data;
					const iconPathMap = {
						'dataosha': '/static/dataosha/',
						'block': '/static/block/',
						'default': '/static/fish/'
					};
					this.menuList = link_list.map((item, index) => {
						if (item.type === 'game' && item.kfz === false) {
							let basePath = iconPathMap.default;
							if (uni.is_online) {
								if (item.link && item.link.includes('dataosha')) {
									basePath = iconPathMap.dataosha;
								} else if (item.link && item.link.includes('block')) {
									basePath = iconPathMap.block;
								}
							} else {
								if (item.testLink && item.testLink.includes('dataosha')) {
									basePath = iconPathMap.dataosha;
								} else if (item.testLink && item.testLink.includes('block')) {
									basePath = iconPathMap.block;
								}
							}
							item.icon = [];
							for (let i = 1; i <= 10; i++) {
								item.icon.push(`${basePath}${i}.png`);
							}
						}
						return item;
					})
				}
			},
			preventHandler() {
				return;
			},
			jugeIsOpenMine() {
				if (this.user_info.product > 0) {
					return true;
				} else {
					return false;
				}
			},
			timedGrowed(interval) {
				this.stopFakeUpdate();
				this.timer = setInterval(() => {
					this.startFakeUpdate();
				}, interval);
				// 更新定时器状态
				this.$store.commit('setTimerRunning', true);
			},
			startFakeUpdate() {
				this.fakeFood = uni.getStorageSync('food');
				if (this.fakeFood) {
					const currentFood = parseFloat(this.fakeFood); // 将字符串转换为浮点数
					//每秒增加数字
					const increment = 0.00000015;
					this.showCount = 0;
					this.fakeFood = (currentFood + increment).toFixed(8); // 增加数值并保留8位小数
					uni.setStorageSync('food', this.fakeFood);
				} else {

				}
			},
			stopFakeUpdate() {
				clearInterval(this.timer);
				// 更新定时器状态
				this.$store.commit('setTimerRunning', false);
			},
			end_fn() {
				this.$store.commit('set_user_info_', {
					value: this.end_val,
					key: 'food'
				})
				this.$store.commit('set_is_scroll', true)
			},
			async shop_getMinePool() {
				let res = await uni.ajax.shop_getMinePool()
				if (res) {
					this.card_info = {
						imgs: res.data.imgs.split(","),
						price: res.data.price
					}
				}
			},
			filterAddAll(arr, ele) {
				let sum = arr
					.filter((item) => {
						return parseFloat(item[ele]) > 0;
					})
					.reduce((pre, cur) => {
						return Decimal.add(pre, new Decimal(cur[ele]));
					}, new Decimal(0));
				return sum;
			},
			async shop_getFriendMine() {
				let res = await uni.ajax.shop_getFriendMine();
				if (res) {
					this.friendList = res.data.list;
					this.nextUpgrad = res.data.next_grade_upgrade_info;
					this.rate2 = this.filterAddAll(res.data.list, "food");
					this.shop_landList(1);
				}
			},
			//获取代理列表
			async getAgentList() {
				let result = await uni.ajax.shop_getApiList({
					page: this.page,
					limit: 5,
				})
				if (result) {
					this.agent_list = this.agent_list.concat(result.data.list)
					if (this.agent_list.length == result.data.count) {
						this.canScroll = false
					}
				}
			},
			scrolltolower() {
				if (this.canScroll) {
					this.page++
					this.getAgentList()
				}
			},
			operate(type) {
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
			click_tab(e) {
				if (e.index == 1) {
					uni.$u.toast(this.$t('utils.waitDevelop'))
				}
			},
			//sha1 加密获得sign
			// 生成签名和时间戳的函数
			getSignAndTimestamp() {
				const signKey = "DNQpERPB8LVbFAkAfQt8T5RRj79WwTk7";
				const timestampInSeconds = Math.floor(Date.now() / 1000);
				const str = signKey + timestampInSeconds;
				const sign = CryptoJS.SHA1(str).toString();
				return {
					sign: sign,
					timestamp: timestampInSeconds
				};
			},
			getclientType() {
				let system = uni.getSystemInfoSync();
				let os = '';
				if (system.platform == 'ios') {
					os = 'I';
				}
				if (system.platform == 'android') {
					os = 'A';
				}
				if (system.platform == 'windows') {
					os = 'W';
				}
				return os;
			},
			async navigator(e) {
				if (e.kfz) {
					return this.$u.toast(this.$t('utils.notYetOpen'))
				}
				const lang = uni.getStorageSync('locale') || this._i18n.locale;
				const avatar = this.user_info.avatar
				const nickname = this.user_info.nickname;
				const gameUrl = uni.is_online ? e.link : e.testLink;
				const puid = this.user_info.third_uid;
				const os = this.getclientType();
				// 调用生成签名和时间戳的函数
				const {
					sign,
					timestamp
				} = this.getSignAndTimestamp();
				if (e.type == 'game') {
					console.log(new Date())
					try {
						let res = await uni.ajax.isEnterGame({
							game_name: e.game_name
						});
						if (res.code === 200) {
							console.log(new Date())
							let game_type_param = e.game_type ? '&game_type=' + e.game_type : '';
							let data =
								`${gameUrl}?token=${uni.getStorageSync('jwt')}&company_code=${uni.conf.companycode}&lang=${lang}&avatar=${avatar}&nickname=${nickname}&puid=${puid}&timestamp=${timestamp}&sign=${sign}&os=${os}${game_type_param}`;
							uni.setStorage({
								key: "pay_url",
								data: data,
								success: () => {
									console.log(new Date())
									this.topage("general/web/index");
								}
							});
						}
					} catch (error) {
						console.error('Error checking game entry:', error);
					}
				} else if (e.type === 'page') {
					let link = e.link;
					if (link === 'collect/association/myGuild/myGuild') {
						link = link.replace('collect', 'gather');
						this.totab(link);
					} else {
						this.topage(link);
					}
				}
			},
			currentChange(val) {
				if (this.current == val.type) return
				this.fieldList = val.type == 'mainland' ? {} : [];
				this.current = val.type
				switch (val.type) {
					// 园丁大陆
					case '1':
						this.shop_getFriendMine();
						uni.removeStorageSync("cur");
						break;
						// 开垦田地
					case '2':
						this.shop_landList(2);
						uni.removeStorageSync("cur");
						break;
					case '3':
						this.topage('gather/mainland/sendOut/sendOut');
						// 设置session存储
						uni.setStorageSync('cur', val.type);
						break;
				}
				this.fieldList_result = 1;
			},
			// 处理数组的方法
			formatArr(arr) {
				let valueCounts = {};
				// 遍历对象数组，计算每个值出现的次数
				arr.forEach(obj => {
					let value = obj.mineInfo.name;
					if (!valueCounts[value]) {
						valueCounts[value] = 1; // 第一次出现，设置为1
					} else {
						valueCounts[value]++; // 已存在，递增
					}
				});
				// 再次遍历对象数组，为每个元素添加属性
				arr.forEach(obj => {
					let value = obj.mineInfo.name;
					// 计算递减的属性值
					obj.mineInfo.curIndex = valueCounts[value]--;
				});
				return arr
			},
			async shop_landList(type) {
				let res = await uni.ajax.shop_landList({
					page: 1,
					limit: 30,
					type: type,
					is_need_day_product: 1
				});
				if (res) {
					//矿洞
					if (type === 1) {
						// 矿洞逻辑处理
						this.fieldList = res.data.list[0];
						this.fieldList.is_show = 1;
						// 每日收益 矿场日产 + 好友挖矿产出  mine_hole_food
						this.mine_hole_food = res.data.mine_product_info.mine_hole_food
						this.mine_field_food = res.data.mine_product_info.mine_field_food || 0
						this.totolDayRate = new Decimal(res.data.mine_day_product).plus(new Decimal(this.rate2));
						if (this.fieldList.mine_cumulative_time >= this.fieldList
							.mine_excavation_cycle_time || this.fieldList.mine_is_full === 1) {
							this.fieldList.up_show = true;
							this.miningComplete = true; // 设置挖矿完成标志为true
							// 判断是否有好友助力，如果没有那么则停止定时器，禁止宝石增加
							if (this.friendList[0].people_num == 0 && this.mine_field_food == 0) {
								console.log('不可开启定时器')
								if (this.timer) {
									this.stopFakeUpdate();
									this.timer = null;
								}
							} else {
								console.log('可开启定时器')
								if (!this.timer) {
									this.timedGrowed(2500);
								}
							}
							// await this.shop_landList(1); // 在挖矿完成时调用shop_landList(1)
						} else {
							this.fieldList.up_show = false;
							this.miningComplete = false; // 重置挖矿完成标志
							// 判断猴子是否有在挖矿，如果没有，那么则关闭定时器
							if (this.fieldList.dispatch_count == 0) {
								console.log('不可开启定时器')
								if (this.timer) {
									this.stopFakeUpdate();
									this.timer = null;
								}
							} else {
								// 判断是否开启了定时器，如果没有那么则开启定时器，宝石继续增加
								if (!this.timer) {
									this.timedGrowed(2500);
								}
							}

						}
					} else {
						// 矿场逻辑处理
						this.totalCount = res.data.count;
						this.fieldList2 = this.formatArr(res.data.list);
					}
					this.fieldList_result = 4; // 不论矿洞还是矿场，都设置fieldList_result为4
				}
			},
			landLevel() {
				uni.navigateTo({
					url: '/pages/gather/mainland/reclaimedLand/reclaimedLand',
					events: {
						landLevel: res => {
							this.openGemMineName = this.$t(res.mineName);
							this.shop_getFriendMine();
							this.opendGemMine = true;
							this.showCount = 0;
							this.get_user_info();
						}
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #121317;
	}
</style>
<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.active_nav {
		opacity: 1;
		position: relative;
	}

	.no_active_nav {
		opacity: 0;
		position: absolute;
	}

	.day_rate {
		width: 100%;
		position: absolute;
		bottom: 10rpx;
		font-size: 24rpx;
		padding: 0 40rpx;
		color: #dedede;
	}

	.mainland {
		overflow: hidden;
		margin-bottom: 60rpx;
		color: #000;

		.today_modal {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 100;
			background-color: rgba(0, 0, 0, 0.5);
			color: #000;

			.modal_content {
				width: 80%;
				background-color: #f5f5f5;

				.title {
					background-color: #fff;
					padding: 30rpx;
					font-size: 40rpx;
				}

				.text_content {
					padding: 40rpx;

					.content {
						background-color: #fff;
						border-radius: 20rpx;
						padding: 20rpx 0 20rpx 40rpx;
						margin-bottom: 20rpx;

						.content_item {
							padding: 20rpx 0;
							border-bottom: 2rpx solid #ccc;
						}

						.content_item:last-child {
							border: none;
						}
					}
				}

				.close_btn {
					position: absolute;
					top: -70rpx;
					right: 0;
				}
			}
		}

		.buy_title {
			position: absolute;
			top: 10rpx;
			z-index: 9;
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			margin-left: 60rpx;

			.buy_card {
				font-size: 40rpx;
				font-weight: 600;
				color: #FFFFFF;
			}

			.buy_copyright {
				margin-left: 100rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #999999;
			}
		}

		.buy_box {
			width: 100%;
			height: 1200rpx;
			position: relative;
			background: url('/static/Continent/bg_top2.png');
			@include backImg;
			overflow: hidden;

			.img_boxs {
				position: absolute;
				width: 400rpx;
				height: 400rpx;
				top: calc(50% - 200rpx);
				left: calc(50% - 200rpx);
				transform-style: preserve-3d;
				transform: rotate3d(1, -2, 0, 20deg);

				.hint {
					width: 190rpx;
					height: 120rpx;
					background-size: 100% 100%;
					position: absolute;
					z-index: 100;
					right: -64rpx;
					top: 0;
				}

				.img_boxs_item {
					width: 224rpx;
					height: 312rpx;
					position: absolute;
					top: calc(50% - 156rpx);
					left: calc(50% - 112rpx);

					>image {
						width: 100%;
						height: 100%;
						overflow: visible;
					}
				}

				>.img_boxs_item:nth-of-type(2n-1)>image {
					animation: mymove 5s 2500ms infinite linear;
				}

				>.img_boxs_item:nth-of-type(2n)>image {
					animation: mymove 5s infinite linear;
				}

				>.img_boxs_item:nth-of-type(1) {
					transform: translateX(250rpx);
				}

				>.img_boxs_item:nth-of-type(2) {
					transform: translateX(-250rpx);
				}

				>.img_boxs_item:nth-of-type(3) {
					transform: translateX(150rpx);
				}

				>.img_boxs_item:nth-of-type(4) {
					transform: translateZ(60rpx);
				}

				>.img_boxs_item:nth-of-type(5) {
					transform: translateX(-170rpx);
				}

			}

			@keyframes rotateGlow {
				0% {
					transform: scale(1);
					transform: rotate(-2deg);
				}

				15% {
					transform: scale(1.01);
					transform: rotate(-1deg);
				}

				25% {
					transform: scale(1.02);
					transform: rotate(0deg);
				}

				35% {
					transform: scale(1.03);
					transform: rotate(1deg);
				}

				50% {
					transform: scale(1.04);
					transform: rotate(2deg);
				}

				60% {
					transform: scale(1.03);
					transform: rotate(1deg);
				}

				70% {
					transform: scale(1.02);
					transform: rotate(0deg);
				}

				80% {
					transform: scale(1.01);
					transform: rotate(-1deg);
				}

				90% {
					transform: scale(1.005);
					transform: rotate(-1.5deg);
				}

				100% {
					transform: scale(1);
					transform: rotate(-2deg);
				}
			}

			@keyframes moveColum {
				0% {
					transform: translateY(0);
				}

				50% {
					transform: translateY(50rpx);
				}

				100% {
					transform: translateY(0);
				}
			}

			.card_box {
				width: 500rpx;
				height: 600rpx;
				background: url('/static/Continent/card.png');
				@include backImg;
				position: absolute;
				z-index: 22;
				top: 200rpx;
				animation: moveColum 3.5s infinite linear;
			}

			.lightBox {
				width: 745rpx;
				height: 730rpx;
				background: url('/static/Continent/light.png');
				@include backImg;
				position: absolute;
				bottom: 0rpx;
				transform-origin: center center;
				opacity: 0.6;
				animation: rotateGlow 2s infinite linear;
			}

			.buy_container_bg {
				width: 100%;
				height: 100rpx;
				position: absolute;
				bottom: 0rpx;
				background: #121317;
			}

			.buy_container {
				width: 100%;
				height: 240rpx;
				background: url('/static/Continent/bg2_bottom.png');
				@include backImg;
				position: absolute;
				bottom: 0rpx;
				z-index: 23;
			}

			.monekey_card_box {
				width: 100%;
				height: 80rpx;
				margin-top: -85rpx;

				.monekey_card_main {
					width: 200rpx;
					height: 100%;
					margin-right: 60rpx;
					position: relative;

					.monekey {
						width: 55rpx;
						height: 90rpx;
						background: url('/static/Continent/bg2_bottom_monkey.png');
						@include backImg;
						font-size: 18rpx;
					}

					.monekey_text {
						width: 150rpx;
						height: 40rpx;
						align-self: flex-end;
						background: url('/static/Continent/bg2_bottom_monkey2.png');
						@include backImg;
						position: absolute;
						right: 8rpx;
						bottom: -4rpx;

						text {
							font-size: 18rpx;
						}
					}
				}
			}

			.buy_info_box {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.buy_info_item {
					letter-spacing: -0.165rpx;
				}
			}

			.buy_info1 {

				view {
					width: 470rpx;
					padding-left: 20rpx;
					margin-left: 14rpx;
					//background: yellow;

					.buy_info_item {
						width: fit-content;
						color: #000000;
						font-size: 24rpx;
					}
				}
			}

			.buy_info2 {
				margin-top: 28rpx;

				.buy_info_item {
					color: #FFF;
					font-size: 36rpx;
					font-weight: 700;
				}
			}
		}

		.buy_btn {
			width: 100%;
			height: 160rpx;
			border-radius: 30rpx;
			margin-top: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			>view {
				width: 80%;
				height: 105rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20rpx;
				color: #030104;
				font-size: 38rpx;
				font-style: normal;
				font-weight: 700;
				background-image: url('/static/btn/buy.png');
				@include backImg;
			}

			@keyframes scaleBtn {
				0% {
					transform: scale(1);
				}

				50% {
					transform: scale(1.04);
				}

				100% {
					transform: scale(1);
				}
			}

			.explore {
				animation: scaleBtn 1.5s infinite linear;

				p {
					margin-bottom: 10rpx;
				}

				p:nth-child(2) {
					font-weight: 500;
					font-size: 24rpx;
				}
			}
		}

		.mineCave_level_box {
			font-size: 24rpx;
			padding: 0 20rpx;
			color: #82888A;

			.day_icome {
				image {
					height: 24rpx;
				}
			}
		}

		.buy_card {
			width: 100%;
			height: 124rpx;

			>view {
				width: 680rpx;
				height: 124rpx;
				background-image: url('../../../static/Continent/buy_btn2.png');
				@include backImg;
			}
		}

		.play_nav_box {
			width: 100%;
			height: 180rpx;
			padding: 0 20rpx;

			.play_nav_box_bg {
				width: 100%;
				height: 140rpx;
				background-image: url('../../../static/Continent/play_nav.png');
				@include backImg;

				div {
					width: 100%;
					height: 100%;
					font-size: 36rpx;
					color: #fff;
					padding-left: 40rpx;

					p:nth-child(1) {
						font-size: 30rpx;

						span:nth-child(1) {}
					}

					p:nth-child(2) {
						background-image: linear-gradient(to right, #D6DBC5, #B2CBE1, #BAAEDE);
						-webkit-background-clip: text;
						color: transparent;
						font-size: 42rpx;
						white-space: nowrap;
						/* 禁止文本换行 */
						overflow: hidden;
						/* 隐藏超出容器部分的文本 */
						text-overflow: ellipsis;
						/* 显示省略号 */
					}
				}
			}
		}

		.card {
			width: 750rpx;
			box-sizing: border-box;
			background: #fff;
			padding: 36rpx 32rpx;

			.card_title {
				font-size: 32rpx;
				font-weight: 600;
				color: #121317;
				padding-bottom: 24rpx;
			}

			.u-icon--bottom {
				flex-direction: column;
				justify-content: center;
				text-align: center;
				margin-bottom: 20rpx;

				/deep/ .u-icon__label {
					height: 40rpx;
				}
			}
		}

		.gardener_box {
			width: 100%;
			height: 660rpx;
			margin-top: 30rpx;
			background: url('/static/Continent/bg2.png');
			@include backImg;
			position: relative;
			padding-top: 180rpx;

			.gardener_text_box {
				width: 100%;
				height: 160rpx;
				padding: 0 120rpx;

				.gardener_text_bg {
					width: 100%;
					height: 100%;
					background: url('/static/Continent/bg2_1.png');
					@include backImg;

					p {
						width: fit-content;
						font-size: 60rpx;
						font-weight: normal;
						background: #D2AB71;
						-webkit-text-stroke: 2px rgba(255, 255, 255, 0.1);
						text-stroke: 2px rgba(255, 255, 255, 0.15);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;

						text-shadow:
							1rpx 1rpx 1rpx #E1C493,
							1rpx 2rpx 1rpx #E1C493,
							1rpx 3rpx 1rpx #E1C493,
							1rpx 4rpx 1rpx #E1C493,
							1rpx 5rpx 1rpx #E1C493,
					}
				}
			}

			.play_guild_box {
				width: 100%;
				height: 50rpx;
				line-height: 50rpx;
				margin-top: 28rpx;
				text-align: center;
				color: #D2AB71;
				font-family: 'Courier New', Courier, monospace;
				font-size: 30rpx;

				p {
					width: fit-content;
					height: 100%;
					border-radius: 30rpx;
					padding: 0 20rpx;
					border: 1px solid #D2AB71;
				}
			}
		}

		.asset {
			width: 100%;
			height: 200rpx;
			box-sizing: border-box;
			border-radius: 12rpx;
			margin-top: 30rpx;

			.asset_card {
				width: 710rpx;
				border-radius: 8rpx;

				.asset_card_item {
					width: 100%;
					height: 160rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					background-image: url('/static/btn/gem.png');
					@include backImg;

					.asset_info {
						padding-left: 8rpx;
						display: flex;
						flex-direction: column;

						.asset_info_title {
							font-size: 20rpx;
							font-weight: bolder;
							color: #BBB490;
						}
					}

					.asset_info_num {
						font-size: 45rpx;
						font-weight: bold;
						color: #ffffff;
					}
				}

				.give {
					background-image: url('../../../static/Continent/give_btn.png');
					@include backImg;

					text {
						font-weight: 800;
						color: #333333;
						letter-spacing: 8rpx;
						font-size: 36rpx;
					}
				}

				.desc {
					height: 44rpx;
					font-size: 20rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.4);
					padding-left: 14rpx;
					line-height: 44rpx;
				}
			}

			.gem_desc {
				width: 100%;
				padding: 20rpx;
				text-align: right;
				font-size: 28rpx;
				color: #82888A;
				margin-top: 32rpx;
			}
		}

		.content {
			.content-top-desc {
				padding-left: 24rpx;
				box-sizing: border-box;
				height: 100rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.3);
				line-height: 100rpx;
			}

			.tabs {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;

				.tabs_item {
					width: 50%;
					height: 110rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					padding: 0 10rpx;
					font-weight: 600;
					background-size: 100% 100%;
					border-radius: 8rpx 8rpx 0 0;
					box-sizing: border-box;

					text {
						color: rgba(255, 255, 255, 0.25);
					}
				}

				.active {
					background: url('/static/Continent/select_tabs.png') no-repeat;
					background-size: 100% 100%;

					text {
						color: #fff;
					}
				}
			}

			.wrap {
				background: linear-gradient(180deg, #383C47 0%, #353944 24.78%, #1A1B1F 56.48%, #1A1B1F 103.26%);

				.my_property {
					width: 100%;
					height: 200rpx;

					.my_property_item {
						width: 250rpx;
						height: 90rpx;
						background: #282A32;
						border-radius: 10rpx;
						padding: 10rpx 0;
						position: relative;

						.imgBox {
							width: 110rpx;
							height: 90rpx;
							position: absolute;
							left: -22%;
							top: -2%;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.text {
							height: 100%;
							padding-left: 80rpx;
							color: #fff;
							font-size: 26rpx;

							p:nth-child(1) {
								font-weight: bold;
							}

							p:nth-child(2) {
								font-size: 20rpx;
								letter-spacing: 2rpx;
							}
						}
					}
				}

				.monkey_box {
					width: 100%;
					height: 120rpx;
					padding: 20rpx 60rpx;

					.monkey_content {
						width: 100%;
						height: 90rpx;

						.myApe {
							width: 450rpx;
							height: 70rpx;
							background: #23262F;
							padding-right: 20rpx;
							border-radius: 6rpx;


							.myApe_box {
								width: 360rpx;
								height: 100%;
								position: relative;

								.myApe_img {
									position: absolute;
									left: -40rpx;

									image {
										height: 70rpx;
									}
								}

								.myApe_text {
									font-size: 26rpx;
									margin-left: 60rpx;
									color: #5E626B;
								}
							}
						}

						.buyApe_btn {
							width: 160rpx;
							height: 60rpx;
							padding: 0 10rpx;
							font-size: 24rpx;
							background-image: url('/static/btn/buyApe_btn.png');
							@include backImg;
						}
					}
				}

				.add_field {
					height: 358rpx;
					border-radius: 12rpx;
					background-color: rgba(0, 0, 0, 0.3);
					background: url('/static/Continent/mine_cave_bg2.png');
					@include backImg;

					.add_btn {
						height: 100rpx;
						padding: 0 20rpx;
						border-radius: 8rpx;
						font-size: 36rpx;
						font-weight: 700;
						color: #ffffff;
						background: url('/static/btn/open_cave_btn.png');
						@include backImg;
					}
				}
			}


			.openHigher_box {

				padding-bottom: 40rpx;

				.field_title {
					height: 88rpx;
					padding: 0 20rpx;
					justify-content: space-between;

					.name {
						color: #FFF;
						font-size: 32rpx;
						font-style: normal;
						font-weight: 700;
						line-height: 18px;
					}

					.introduce {
						border-radius: 4rpx;
						border: 2rpx solid #3E414A;
						padding: 6rpx 12rpx;
					}
				}


				.openHigher_bg {
					width: 100%;
					height: 300rpx;
					background: url('/static/Continent/hign_cave_condi.png');
					@include backImg;

					.openHigher_condition {
						width: 100%;
						height: 200rpx;
						color: #82888A;
						font-size: 30rpx;
						padding: 0 50rpx;

						.openHigher_condition_inner {
							height: 180rpx;
						}

						p {
							letter-spacing: 4rpx;

							image {
								width: 36rpx;
								height: 36rpx;
							}

							.progress_text {
								padding-left: 20rpx;
								font-size: 24rpx;
							}
						}

						.five_condiation {
							font-size: 30rpx;

							span {
								color: #fff;
							}
						}
					}
				}

				.openHigher_bottom {
					padding: 0 22rpx;
					font-size: 26rpx;
					color: #82888A;
					margin-top: 20rpx;
				}

			}

			.play_method_box {
				width: 100%;
				height: 920rpx;
				padding: 0 30rpx;
				margin-bottom: 100rpx;
				background: #262B31;

				.play_method_text {
					color: #FFF;
					font-size: 32rpx;
					font-style: normal;
					font-weight: 700;
					height: 100rpx;
					line-height: 100rpx;
				}

				.play_method_bg {
					width: 100%;
					height: 800rpx;
					font-size: 22rpx;
					background-image: url('/static/Continent/play_method_bg.png');
					@include backImg;

					.play_text1 {
						width: 100%;
						height: 150rpx;
						padding-left: 136rpx;
						padding-top: 60rpx;

						p {
							width: 50%;
							height: 100%;
						}
					}

					.play_text2_mid {
						width: 100%;
						height: 150rpx;
						margin-top: 230rpx;
						padding: 0 20rpx;
						gap: 70rpx;

						.play_text2 {
							width: 220rpx;
						}

						.play_text3 {
							width: 330rpx;
							padding-left: 99rpx;
							padding-bottom: 25rpx;
						}
					}

					.play_text4 {
						width: 100%;
						height: 100rpx;
						padding-left: 35rpx;
						margin-top: 16rpx;

						p {
							width: 150rpx;
							height: 100%;
							text-align: left;
							padding-left: 45rpx;
							padding-top: 18rpx;
						}
					}
				}
			}

			.mine_intro {
				width: 100%;
				height: 620rpx;

				.play_method_bg {
					width: 100%;
					height: 520rpx;
					background-image: url('/static/Continent/play_method_bg2.png');

					.play_text1 {
						width: 80%;
						margin-left: 130rpx;
						padding-top: 60rpx;
					}

					.play_text2_mid {
						width: 80%;
						margin-top: 110rpx;
					}
				}
			}
		}
	}

	.firend_box {
		width: 520rpx;
		border-radius: 12rpx;

		>image {
			width: 520rpx;
			height: 256rpx;
		}

		.info {
			padding: 16rpx 24rpx 40rpx;

			image {
				width: 60rpx;
				height: 60rpx;
				margin-right: 10rpx;
			}

			.info_name {
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;
			}

			.info_name_ {
				padding-left: 70rpx;

			}

			.btn {
				margin-top: 36rpx;
				width: 466rpx;
				height: 96rpx;
				border-radius: 8rpx;
				background: var(--linear-gradient-theme);
				box-shadow: var(--btn-shadow);
				font-size: 32rpx;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 36rpx;
			}
		}
	}

	.field_ {
		position: relative;
		overflow: hidden;
		width: 686rpx;
		height: 308rpx;
		background-color: rgba(0, 0, 0, 0.3);
		padding: 32rpx;
		border-radius: 12rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 24rpx;
		background-size: cover;

		.efficiency {

			font-size: 24rpx;
			font-weight: 400;
			color: #FFFFFF;

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.num {
			font-size: 24rpx;
			font-weight: 400;
			color: #FFFFFF;
			position: relative;
			z-index: 10;
		}

		.field_name {
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
			align-self: flex-end;
		}
	}

	.buy_popup {
		width: 750rpx;
		height: 640rpx;
		background: url('/static/Continent/pop_top.png');
		@include backImg;

		.buy_popup_top {
			margin-top: -76rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;

			.buy_name {
				padding: 0 0 10rpx 18rpx;
				margin-right: auto;
				align-self: flex-end;
				margin-bottom: 10rpx;

				>:nth-of-type(1) {
					color: #030104;
					font-size: 36rpx;
					font-weight: 600;
				}

				>:nth-of-type(2) {
					width: fit-content;
					margin-top: 10rpx;
					padding: 10rpx 0;
					border-radius: 4rpx;
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
					border-radius: 8rpx;
				}

				.current_quantity {
					color: #333;
					width: 200rpx;
					height: 60rpx;
					font-size: 40rpx;
					font-style: normal;
					line-height: 40rpx;
					background: #F5F5F5;
				}
			}

			.maximum_num {
				width: 288rpx;
				height: 60rpx;
				border-radius: 8rpx;
				color: #000;
				font-size: 32rpx;
				font-weight: 400;
			}
		}

		.buy_popup_btn {
			margin-top: 10rpx;
			background-color: #fff;

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
				position: relative;

				>text:nth-of-type(1) {
					color: #030104;
					font-size: 32rpx;
					font-style: normal;
					font-weight: 600;
				}

				>text:nth-of-type(2) {
					color: #030104;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
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
		border-radius: 40rpx 40rpx 0 0;
		padding-bottom: 80rpx;
		background-color: #F4F4F4;

		.goods_box_title {
			color: #030104;
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

				.have_card {
					font-size: 28rpx;
					font-weight: 500;
					color: #999;
				}

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
						text-align: right;
						margin-left: 10rpx;
						color: #999;
						font-size: 28rpx;
						font-style: normal;
						font-weight: 400;
					}
				}

				.contact_information {
					width: 100%;
					height: 100rpx;
					display: flex;

					.label_wid {
						flex-shrink: 0;
						width: 140rpx;
						text-align: right;
						color: #999;
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
									margin-left: 8rpx;
									//background: red;
								}
							}
						}
					}

				}
			}
		}
	}

	.main_box {
		width: 540rpx;
		height: 542rpx;
		position: relative;
		padding: 44rpx 28rpx;

		.top_imgBox {
			width: 100%;
			position: absolute;
			top: -230rpx;
			/* background: red; */

			.top_imgBox_img {
				height: 480rpx;
			}
		}

		.center_tip {
			width: 100%;
			height: 170rpx;
			border-radius: 12rpx;
			margin-top: 160rpx;
			background: #fff;
			text-align: center;

			p {
				width: 100%;
			}

			p:nth-child(1) {
				color: #333;
				font-size: 35rpx;
			}

			p:nth-child(2) {
				color: #333;
				font-size: 30rpx;
				letter-spacing: 4rpx;
			}
		}

		.confir_btn {
			width: 100%;
			height: 80rpx;
			margin-top: 60rpx;
			letter-spacing: 4rpx;
			color: #333333;
			background: #DED1AE;
		}
	}

	.footer {
		font-size: 0;
		position: fixed;
		// bottom: calc(0 - var(--window-bottom));
		/* #ifndef h5 */
		bottom: 0;
		/* #endif */
		/* #ifdef H5 */
		bottom: calc(var(--window-bottom) - var(--height));
		/* #endif */
		left: 50%;
		z-index: 60;
		transition: all 1.5s;
		transform: translate(-50%, var(--translateY));
	}

	.uoGrade_box {
		width: 500rpx;
		height: 600rpx;
		padding: 30rpx 20rpx;

		.title {
			margin-top: 70rpx;
		}

		.upgrade_good {
			width: 100%;
			height: 160rpx;
			border-radius: 10rpx;
			padding: 10rpx;
			font-size: 24rpx;
			margin-top: 50rpx;
			letter-spacing: 2rpx;
			background: #fff;

			p {
				gap: 8rpx;
				height: 40rpx;
				line-height: 40rpx;
				// background: red;

				image {
					height: 32rpx;
				}
			}
		}

		.buyCard_btn {
			height: 70rpx;
			border-radius: 10rpx;
			font-size: 26rpx;
			letter-spacing: 2rpx;
			margin-top: 40rpx;
			background: #2F2F2F;
		}

		.canUsedCard {
			margin-top: 20rpx;
			font-size: 22rpx;
			color: #ccc;
		}
	}

	@keyframes mymove {
		0% {
			transform: translate(0rpx, 0rpx);
		}

		25% {
			transform: translate(0rpx, -20rpx);
		}

		50% {
			transform: translate(0rpx, 0rpx);
		}

		75% {
			transform: translate(0rpx, 20rpx);
		}

		100% {
			transform: translate(0rpx, 0rpx);
		}
	}
</style>