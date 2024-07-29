<template>
	<view class="mainland">

		<!-- <view class="status"></view> -->
		<!-- <u-navbar left-icon="" :bg-color="nav_bg_color" :autoBack="false">
			<u-tabs slot="left" :current="tabscurrent" :list="tabsList" lineWidth="0"
				:activeStyle="{color:activeColor,fontSize:'40rpx',fontWeight:700}"
				:inactiveStyle="{color:'#9C9C9C',fontSize:'32rpx',fontWeight:700}" @click="click_tab"></u-tabs>
			<u-icon slot="right" name="search" bold :color="activeColor" size="38rpx"></u-icon>
		</u-navbar> -->

		<view class="buy_title">
			<view class="buy_card">
				{{$t('mainland.title')}}
			</view>
			<!-- <view class="buy_copyright">
				商业版权
			</view> -->
		</view>
		<view class="buy_box flex-center">
			<!-- 	<view class="img_boxs">
				<view class="img_boxs_item" v-for="(item,index) in card_info.imgs">
					<image :src="item" mode="aspectFill"></image>
				</view>
				<view class="hint"></view>
			</view> -->
			<view class="card_box">

			</view>
			<view class="lightBox">

			</view>
			<view class="buy_container_bg">

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
						<!-- <view class="buy_info_item buy_btn_pri">￥{{card_info.price}}/张</view> -->
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
		<!-- @click="topage('general/article/index?type=12&pagetype=playing_method')" -->
		<view class="play_nav_box  bold flex-center"
			@tap="topage('gather/mainland/playMethod_introdu/playMethod_introdu')">
			<view class="play_nav_box_bg">
				<div class="flex-colum-evenly">
					<p><span>{{$t('mainland.lookHere')}}</span> <span>>>></span> </p>
					<p>{{$t('mainland.loolTip')}}</p>
				</div>
			</view>
		</view>

		<view style="background: #f5f5f5;border-radius: 40rpx;overflow: hidden;">
			<view class="card">
				<view class="card_title">{{$t('mainland.materialApp')}}</view>
				<u-grid col="5">
					<u-grid-item v-for="(item,index) in menuList" :key="index" @click="navigator(item)"
						class="u-icon--bottom">
						<u-icon :name="item.icon" :label="$t(item.title)" width="78rpx" height="78rpx"
							label-color="#121317" label-size="24rpx" label-pos="bottom" space="8rpx"></u-icon>
					</u-grid-item>
				</u-grid>
			</view>
			<!-- <view class="card">
				<view class="card_title">角色应用</view>
				<u-grid col="5">
					<u-grid-item v-for="item in menuList1" @click="navigator(item)" class="u-icon--bottom">
						<u-icon :name="item.icon" :label="item.title" width="76rpx" height="76rpx" label-color="#121317"
							label-size="24rpx" label-pos="bottom" space="8rpx"></u-icon>
					</u-grid-item>
				</u-grid>
			</view> -->
		</view>

		<view class="gardener_box">
			<!-- 宝石榜 -->

			<!--<view class="zs_phb">
				<u-icon name="/static/Continent/gem_list.png" width="84rpx" height="84rpx"
					@click="topage('gather/mainland/rankingList/rankingList')"></u-icon>
			</view>-->
			<view class="gardener_text_box">
				<!-- <view class="gardener_text_bg flex-center">
					<p>APE MOUNTAIN</p>
				</view> -->
			</view>

			<view class="play_guild_box flex-center">
				<!-- <p class="flex-center" @click="topage('general/article/index?type=12&pagetype=playing_method')">
					{{$t('mainland.playGuild')}}
				</p> -->
			</view>

		</view>
		<!-- <p style="color: #fff;">{{showCount}}--showCount
		</p>
		<p style="color: #fff;">{{fakeGemstoneOld}}--fakeGemstoneOld</p>
		<p style="color: #fff;">{{fakeFood}}--fakeFood</p> -->
		<view class="asset flex-center">

			<!-- my gemstone button -->
			<view class="asset_card" style="height: 135rpx;">
				<view class="asset_card_item" :style="{'--asset-card-bg':'url(/static/Continent/i33.png)'}"
					@click="topage('gather/mainland/myAssets/myAssets?type=cereal')">
					<view class="flex-start">
						<u-image src="/static/btn/gem-icon1.png" width="46rpx" height="46rpx"
							style="margin-right: 10rpx;"></u-image>

						<p class="asset_info_num" v-show="showCount==0">
							<u-count-to :start-val="parseFloat(fakeGemstoneOld)" :end-val="parseFloat(fakeFood)"
								:duration="2000" :use-easing="false" :decimals="7" color="#fff" ref="countTo"
								bold></u-count-to>
						</p>

						<!-- {{gemstoneOld}}--111
						{{user_info.food}}--222 -->
						<p class="asset_info_num" v-show="showCount==1">
							<u-count-to :start-val="gemstoneOld ? parseFloat(gemstoneOld):parseFloat(user_info.food)"
								:end-val="parseFloat(user_info.food)" :duration="2000" :use-easing="false" :decimals="7"
								color="#fff" ref="countTo" bold></u-count-to>
						</p>

						<p class="asset_info_num" v-show="showCount==3">
							<text>{{gemstoneOld}}</text>
						</p>

						<!-- <view class="u-demo-block__content">
								<view class="u-page__tag-item">
									<u-count-to ref="uCountTo" :endVal="end_val*1" @end="end_fn" :startVal="user_info.food*1" :decimals="8" color="#fff"
										:bold="true"></u-count-to>
								</view>
							</view> -->
					</view>
					<!-- my gemstone text -->
					<!-- <view class="asset_info">
							<text class="asset_info_title">我的宝石</text>
						</view> -->
				</view>

			</view>
			<!-- give gemstone button -->
			<!-- 	<view class="asset_card" style="height: 105rpx;margin-top: 20rpx;">
					<view class="asset_card_item give" @tap="topage('gather/mainland/sendOut/sendOut')">
						<text>赠送宝石</text>
					</view>
				</view> -->

			<view class="gem_desc flex-between">
				<view class="">
					<text>{{$t('mainland.gemCanOpenHigh')}}</text>
				</view>
				<view class="flex-between">

					<u-image src="/static/btn/gem-icon1.png" width="24rpx" height="24rpx"
						style="margin-right: 4rpx;"></u-image>
					<span>{{totolDayRate}}</span>/{{$t('utils.day')}}
				</view>
			</view>


		</view>

		<view class="content">

			<view class="tabs">

				<view :class="['tabs_item',current == item.type ? 'active' : '']" v-for="(item,index) in tabs"
					:key="index" @click="currentChange(item)">
					<!-- {{current}}--current
					{{item.type}}--type -->
					<text>{{item.name}}</text>
				</view>
			</view>


			<!-- mine cave -->
			<view class="wrap">
				<block v-if="current == '1'" class="wrap1">
					<!-- my friends  and monkey card -->
					<view class="my_property flex-evenly">
						<view class="my_property_item  my_friends" @tap="topage('general/invite/myFriend_all')">
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
					<!-- {{fieldList}}---11111 -->
					<field :info="fieldList" :food="user_info.food*1" v-if="fieldList_result==4"></field>
					<view class="mineCave_level_box flex-between">
						<view class="level">
							{{$t('mainland.mineCave')}}Lv.{{fieldList.mine_grade}}
						</view>
						<!-- v-show="fieldList.is_explore_status!=1" -->
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
					<!-- buy card btn -->
					<view class="buy_btn buy_card">
						<view class="" v-show="fieldList.mine_cumulative_time/fieldList.mine_excavation_cycle_time<1"
							@click="buy_popup = true">
							{{$t('mainland.buyCardDigGem')}}
						</view>
						<view class="explore flex-colum"
							v-show="fieldList.mine_cumulative_time/fieldList.mine_excavation_cycle_time>=1"
							@click="explore_card_popup = true">
							<p>{{$t('mainland.upgMineImm')}}</p>
							<p>{{$t('mainland.upgradeRestore')}}</p>
						</view>
					</view>
					<view class="" style="height:20rpx;">

					</view>
					<!-- {{friendList}}--22222 -->
					<field :friendInfo="item" :nextUpgrad="nextUpgrad" :type="2" v-for="item,index in friendList">
					</field>

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
							<view class="buyApe_btn flex-center bold" @click="buy_popup = true">
								{{$t('mainland.buyBoredApe')}}
							</view>
						</view>
					</view>

					<view class="add_field flex-center">
						<view class="add_btn flex-center" @click="landLevel">
							<u-icon name="/static/Continent/i35.png" width="44rpx" height="44rpx"></u-icon>
							<text style="margin-left: 8rpx;">{{$t('mainland.openNewMine')}}</text>
						</view>
					</view>

					<field :info="item" v-for="item,index in fieldList2" :key="index">
					</field>


					<!-- <view style="height: 120rpx;">

					</view> -->
				</block>
				<!-- 	<block v-if="current == '3'">
					<view @tap="topage('gather/mainland/sendOut/sendOut')">
						yrtyrt
					</view>
				</block> -->


				<iloading :result="fieldList_result"></iloading>

			</view>
			<!-- invite friends btn -->
			<!-- <view class="team">
				<view class="teamUp" mode="" @click="topage('general/invite/share')">
					<view><strong>{{$t('mainland.inviteFriendDigGem')}}</strong></view>
				</view>
			</view> -->
			<!-- open  higher condiation -->
			<view class="openHigher_box" v-show="current == '1'">

				<view class="field_title openHigher_title flex-between">
					<view class="name">
						<!-- {{$t('mainland.advancedMining')}} -->
						Level {{nextUpgrad.next_grade}}
					</view>

					<view class="introduce" @tap="to_js(3)">
						<u-icon name="arrow-right" size="24rpx" color="rgba(255, 255, 255, 0.30)"
							:label="$t('utils.senior')+' '" labelSize="24rpx" label-color="rgba(255, 255, 255, 0.30)"
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

								<!-- <view class="">
									144444
								</view> -->
							</p>
						</view>


						<view class="five_condiation" v-else>
							<p>
								LEVEL
								1{{$t('mainland.have')}}
								<span>{{nextUpgrad.upgrade_special_condition.friend_num}}</span>{{$t('mainland.teamMem')}}<span>{{nextUpgrad.upgrade_special_condition.friend_num}}</span>{{$t('mainland.teamTip1')}}
								<image src="/static/btn/gem-icon1.png" style="height: 26rpx;" mode="heightFix"></image>
								<span>{{nextUpgrad.upgrade_special_condition.food_num}}</span>{{$t('mainland.gemStone')}}{{$t('mainland.canOpenDig')}}
								<span>Level {{nextUpgrad.next_grade}}</span>>
							</p>
						</view>



					</view>
				</view>

				<!-- <view class="openHigher_bottom">
					{{$t('mainland.mining')}}{{nextUpgrad.next_grade}}{{$t('mainland.team')}}
				</view> -->
			</view>




			<!-- play  method -->
			<view class="play_method_box" v-show="current == '1'">
				<view class="play_method_text">
					{{$t('mainland.newMusLook')}}
				</view>
				<view class="play_method_bg">
					<view class="play_text1">
						<p>{{$t('mainland.guild1')}}</p>
					</view>
					<view class="play_text2_mid flex-around">
						<view class="play_text2">
							<p>{{$t('mainland.guild2')}}</p>
						</view>
						<view class="play_text3">
							<p>{{$t('mainland.guild3')}}</p>
						</view>
					</view>
					<view class="play_text4 flex-center">
						<p>{{$t('mainland.guild4')}}</p>
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
						<p>{{$t('mainland.guild5')}}</p>
					</view>
					<view class="play_text2_mid flex-around">
						<view class="play_text2">
							<p>{{$t('mainland.guild6')}}</p>
						</view>

					</view>

				</view>
			</view>
		</view>


		<u-popup :show="explore_card_popup" bgColor="#F0F0F0" :closeable="true" :round="10" mode="center"
			@close="close">
			<view class="uoGrade_box">
				<view class="title flex-center bold">
					<text>{{$t('mainland.upgradeMineNeed')}}
						<font style="color:#babb6c;">7</font> {{$t('utils.ticket')}} {{$t('mainland.boreCard')}}
					</text>
				</view>
				<view class="upgrade_good flex-colum-evenly">
					<p class="flex-start">
						<image src="/static/else/checkmark.png" mode="heightFix"></image>
						{{$t('mainland.mineIcomeAdd')}}+1%

					</p>
					<p class="flex-start">
						<image src="/static/else/checkmark.png" mode="heightFix"></image>
						{{$t('mainland.improvMiningEff')}}
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

				<view class="buy_popup_btn flex-center" @click="show_goods_box = true">
					<view class="buy_btn bold">
						<!-- <text>立即购买</text>
						<text>限购5张,5张包邮</text> -->
						{{$t('mainland.findAgentBuy')}}
					</view>
				</view>
			</view>
		</u-popup>
		<!-- @open="shop_getApiList" -->
		<view @touchmove.stop.prevent="preventHandler">
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
						<!-- <u-icon @tap="shop_getApiList" name="/static/Continent/i40.png" color="#030104" width="36rpx"
			 				height="36rpx" size="28rpx" label="获取位置" label-size="28rpx" label-color="#030104"></u-icon> -->
					</view>
					<scroll-view scroll-y class="scroll">
						<view class="goods_box_item" v-for="(item,index) in agent_list" :key="index">
							<!-- {{item}} -->
							<view class="address flex-between">
								<text class="address_name">{{item.address||' '}}</text>
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
								<view class="contact_list "
									v-if="item.facebook||item.zalo||item.telegram||item.whatsapp">
									<view class="contact_information_list">
										<view class="contact_information_item " style="margin-right: 14rpx;"
											v-show="item.facebook">
											<u-icon name="/static/Continent/fb.png" width="36rpx"
												height="36rpx"></u-icon>

											<view class="number">{{item.facebook}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
												@click="copy(item.facebook)"></u-icon>
										</view>
										<view class="contact_information_item" v-show="item.zalo">
											<u-icon name="/static/Continent/zalo.png" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.zalo}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
												@click="copy(item.zalo)"></u-icon>
										</view>

									</view>
									<view class="contact_information_list">
										<view class="contact_information_item " style="margin-right: 14rpx;"
											v-show="item.telegram">
											<u-icon name="/static/Continent/tg.jpg" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.telegram}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
												@click="copy(item.telegram)"></u-icon>
										</view>
										<view class="contact_information_item" v-show="item.whatsapp">
											<u-icon name="/static/Continent/wa.jpg" width="36rpx"
												height="36rpx"></u-icon>
											<view class="number">{{item.whatsapp}}</view>
											<u-icon name="/static/else/copy.png" width="28rpx" height="28rpx" stop
												@click="copy(item.whatsapp)"></u-icon>
										</view>
									</view>
								</view>
								<view class="contact_list" v-else>
									{{$t('utils.notSetContact')}}
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

		<tabbar :pageSrc="'pages/gather/mainland/index'" :lang='language'></tabbar>
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
	//import tabList from '@/common/tabList/tabList.js';

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
				//console.log("value==>", value);
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
				// return (this.num * this.goodsPrice).toFixed(2);
				return (this.current_quantity * 3);
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
					console.log('oldVal==countPool:', oldVal);
					console.log('newVal==countPool:', newVal);
					if (newVal != oldVal) {
						this.shop_landList(1);
					}
				}

			},
			'fieldList': {
				// immediate: true, // 立即执行一次
				handler(newVal, oldVal) {
					// console.log('oldVal==Filed:', oldVal);
					// console.log('oldVal==type:', typeof oldVal);
					// console.log('newVal==Filed:', newVal);
					//console.log('newVal==type:', Array.isArray(newVal));
					//console.log("length-------", Object.keys(newVal).length);
					if (Object.keys(newVal).length > 0) {
						//console.log('newVal==type:', Array.isArray(newVal));
						if (Array.isArray(newVal)) {
							if (newVal[0].level == 2) {
								//console.log("监听矿场位置重新开启定时器");
								this.timedGrowed(2000);
							}
						} else {
							if (newVal.level == 1 && newVal.dispatch_count > 0) {
								//console.log("监听矿洞位置重新开启定时器");
								this.timedGrowed(2000);
							}
						}
					}

				}
			},
			'fakeFood': {
				immediate: true, // 立即执行一次
				handler(newVal, oldVal) {
					console.log('oldVal==fakeFood:', oldVal);
					console.log('newVal==fakeFood:', newVal);
					if (oldVal != 0 && newVal > oldVal) {
						this.fakeGemstoneOld = oldVal;
					} else {
						console.log("34343434==>", this.user_info.food);
						if (this.user_info.food) {
							this.fakeGemstoneOld = this.user_info.food;
						} else {
							// this.fakeGemstoneOld = oldVal;
							// this.stopFakeUpdate();

						}
					}
				}
			},
			'user_info.food': {
				immediate: true, // 立即执行一次
				handler(newVal, oldVal) {
					if (this.current == 1) {
						this.shop_landList(1)
					}
					if (this.current == 2) {
						this.shop_landList(2)
					}
					console.log('oldVal:', oldVal);
					console.log('newVal:', newVal);
					uni.setStorageSync('food', newVal);
					const res = this.jugeIsOpenMine();
					console.log("是否开启过===>", res);

					if (typeof oldVal != 'undefined' && newVal != oldVal) {
						console.log("11111");
						this.showCount = 1;
						this.gemstoneOld = oldVal;
						// this.get_user_info();
						//console.log('newVal222====>', typeof newVal);

						if (typeof newVal == 'undefined' && oldVal) {
							console.log("================出现NaN===============");
							uni.setStorageSync('food', oldVal);
							this.showCount = 3;

						}

					} else {
						//console.log("22222");
						if (res) {
							//console.log("监听food位置重新开启定时器");
							this.timedGrowed(2000);

						}
					}
				}
			}
		},
		data() {
			return {
				nextUpgrad: {},
				friendList: [],
				opendGemMine: false,
				openGemMineName: '',
				explore_card_popup: false,
				isExplore: false,
				language: '',
				showCount: 1,
				fakeFood: 0,
				timer: null, // 定时器
				friend_info: {
					total: 0,
					rate: 0,
					totalProduct: 0
				},
				fakeGemstoneOld: '',
				gemstoneOld: '',
				activeColor: 'rgb(255,255,255)',
				nav_bg_color: 'rgba(255,255,255,0)',
				tabsList: [{
						name: '无聊猿闪卡'
					},
					{
						name: '商业版权',
						disabled: true
					}
				],
				tabscurrent: 0,
				// menuList: [{
				// 		title: '星空赛马',
				// 		link: '',
				// 		icon: '/static/Continent/img1.png',
				// 		kfz: true
				// 	},
				// 	{
				// 		title: '机甲乱斗',
				// 		link: '',
				// 		icon: '/static/Continent/img2.png',
				// 		kfz: true
				// 	},
				// 	{
				// 		title: '星空大逃杀',
				// 		link: 'dts',
				// 		icon: '/static/Continent/img3.png',
				// 		kfz: true
				// 	}, {
				// 		title: '星空荣耀',
				// 		link: '',
				// 		icon: '/static/Continent/img4.png',
				// 		kfz: true
				// 	}, {
				// 		title: '星空战场',
				// 		link: '',
				// 		icon: '/static/Continent/img5.png',
				// 		kfz: true
				// 	},
				// ],
				// menuList1: [{
				// 		title: '收集得大奖',
				// 		link: '',
				// 		icon: '/static/Continent/img6.png',
				// 		kfz: true
				// 	},
				// 	{
				// 		title: '抽卡/出售',
				// 		link: '',
				// 		icon: '/static/Continent/img7.png',
				// 		kfz: true
				// 	},
				// 	{
				// 		title: '吞噬星空',
				// 		link: '',
				// 		icon: '/static/Continent/img8.png',
				// 		kfz: true
				// 	}, {
				// 		title: '打擂台',
				// 		link: '',
				// 		icon: '/static/Continent/daleitai.png',
				// 		kfz: true
				// 	}, {
				// 		title: '更多',
				// 		link: '',
				// 		icon: '/static/Continent/gengduo.png',
				// 		kfz: true
				// 	},
				// ],
				menuList: [
					// {
					// 	title: this.$t('mainland.game1'),
					// 	link: '',
					// 	icon: '/static/Continent/4.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game2'),
					// 	link: '',
					// 	icon: '/static/Continent/3.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game3'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/bsyst.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game4'),
					// 	link: 'dts',
					// 	icon: '/static/wuliaoyuan-icon/dts-baoshi.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game5'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/bsdxc.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game6'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/bshys.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game7'),
					// 	link: '',
					// 	icon: '/static/Continent/1.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game8'),
					// 	link: '',
					// 	icon: '/static/Continent/2.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game9'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/ysms.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game10'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/dts-jinbi.png',
					// 	kfz: true
					// },
					// {
					// 	title: this.$t('mainland.game11'),
					// 	link: 'dyc',
					// 	icon: '/static/wuliaoyuan-icon/dyc.png',
					// 	kfz: true
					// }, {
					// 	title: this.$t('mainland.game12'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/ckzbs.png',
					// 	kfz: true
					// }, {
					// 	title: this.$t('mainland.game13'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/daleitai.png',
					// 	kfz: true
					// }, {
					// 	title: this.$t('mainland.game14'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/xzzbs.png',
					// 	kfz: true
					// }, {
					// 	title: this.$t('mainland.game15'),
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/gengduo.png',
					// 	kfz: true
					// },

					// {
					// 	title: '更多',
					// 	link: '',
					// 	icon: '/static/wuliaoyuan-icon/gengduo.png',
					// 	kfz: true
					// },
				],
				menuList1: [{
						title: '猿石魔兽',
						link: '',
						icon: '/static/wuliaoyuan-icon/ysms.png',
						kfz: true
					},
					{
						title: '大逃杀',
						link: '',
						icon: '/static/wuliaoyuan-icon/dts-jinbi.png',
						kfz: true
					},
					{
						title: '斗猿场',
						link: 'dyc',
						icon: '/static/wuliaoyuan-icon/dyc.png',
						kfz: true
					}, {
						title: '存卡赚宝石',
						link: '',
						icon: '/static/wuliaoyuan-icon/ckzbs.png',
						kfz: true
					}, {
						title: '打擂台',
						link: '',
						icon: '/static/wuliaoyuan-icon/daleitai.png',
						kfz: true
					}, {
						title: '勋章赚宝石',
						link: '',
						icon: '/static/wuliaoyuan-icon/xzzbs.png',
						kfz: true
					}, {
						title: '更多',
						link: '',
						icon: '/static/wuliaoyuan-icon/gengduo.png',
						kfz: true
					},
				],
				// menuList1: [{
				// 		title: '收集得大奖',
				// 		link: '',
				// 		icon: '/static/Continent/img6.png',
				// 		kfz: true
				// 	},
				// 	{
				// 		title: '抽卡/出售',
				// 		link: '',
				// 		icon: '/static/Continent/img7.png',
				// 		kfz: true
				// 	},
				// 	{
				// 		title: '吞噬星空',
				// 		link: '',
				// 		icon: '/static/Continent/img8.png',
				// 		kfz: true
				// 	}, {
				// 		title: '打擂台',
				// 		link: '',
				// 		icon: '/static/wuliaoyuan-icon/daleitai.png',
				// 		kfz: true
				// 	}, {
				// 		title: '更多',
				// 		link: '',
				// 		icon: '/static/wuliaoyuan-icon/gengduo.png',
				// 		kfz: true
				// 	},
				// ],
				tabs: [{
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
					// {
					// 	name: '星空矿场',
					// 	type: '3'
					// },
				],
				page: 1,
				current: '1',
				fieldList: {}, // 矿洞数据,
				fieldList2: [], // 矿场数据,
				fieldList_result: 1,
				firend_box_popup: false,
				buy_popup: false, // 购买弹框
				current_quantity: 7,
				show_goods_box: false,
				shop_list: [],
				agent_list: [],
				shop_result: 1,
				card_info: {
					price: 0,
					imgs: []
				},
				totolDayIncome: "",
				rate2: '',
				totolDayRate: '',
				miningComplete: false, // 挖矿是否完成的标志
				showOnlineBuyCard: 0

			}
		},
		onLoad(option) {
			this.get_user_info();
			this.shop_landList(1);
			this.shop_getFriendMine();
			this.shop_getMinePool();
			// this.getAgentList();
			this.jugeShowOnlineCard();



		},
		onUnload() {
			// uni.removeStorageSync("cur");
			if (this.timer) {
				//console.log("onUnload运行");
				this.stopFakeUpdate();
				this.timer = null;
				//console.log("timer==onUnload", this.timer);
			}
		},
		onHide() {
			if (this.timer) {
				//console.log("onHide运行");
				this.stopFakeUpdate();
				this.timer = null;
				//console.log("timer==onHide", this.timer);
			}
		},
		onShow: function() {
			this.language = uni.getStorageSync('locale');
			this.initLangText();
			this.get_user_info();
			this.getAgentList();


			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary");
			// #endif


			if (this.is_login) {
				this.shop_getFriendMine();

				const isOpen = this.jugeIsOpenMine();
				//console.log("isOpen", isOpen);
				if (isOpen) {
					this.timedGrowed(2200);
				} else {
					this.stopFakeUpdate();
					this.showCount = 1;
					//console.log("timer",this.timer);
				}
				console.log("this.current", this.current);
				// 移除之前的监听器
				uni.$off('query');
				uni.$off('queryGame');

				uni.$once('openBuyModal', (query) => {
					console.log("openBuyModal==>", query);
					if (query.isShow == 1) {
						this.buy_popup = true;
						uni.$off('openBuyModal');
					}
				})


				uni.$once('query', (query) => {
					if (query.needQuest == 1) {
						this.shop_landList(2);
					} else {
						this.shop_landList(1);
						this.shop_getFriendMine();
					}
				})

				uni.$once('queryGame', (query) => {
					if (query.reload == 1) {
						//console.log("queryGame", query);
						this.get_user_info();
					}
				})

				if (this.end_val <= 0) {
					this.$store.commit("set_end_val", this.user_info.food);
				}
				const curData = uni.getStorageSync('cur');
				//console.log(sessionData); // 输出：sessionValue
				if (curData == 3) {
					this.shop_landList(1);
					this.current = 1;
				}



			}

		},
		mounted() {},
		beforeDestroy() {
			this.stopFakeUpdate();
		},
		methods: {
			jugeShowOnlineCard() {
				this.showOnlineBuyCard = uni.getStorageSync('onlineBuyCard');
			},
			toDetails(id, index) {
				//console.log("去商品详情页面", id);
				uni.navigateTo({
					url: '/pages/gather/goodDetails/goodDetails?id=' + id + '&index=' + index,

				})
			},
			//获取每日总宝石收益
			getAllDayRate() {
				this.getRate1(1);
			},
			async getRate1(type) {
				let res = await uni.ajax.shop_landList({
					page: 1,
					// limit: uni.conf.limit,
					limit: 30,
					type: type,
					is_need_day_product: 1
				});
				if (res) {
					console.log("mine_day_product====>", res.data.mine_day_product);
					//this.rate1 = this.filterAddAll(res.data.list, "day_rate");

					// //console.log("sum====>", this.rate1.toString());
					//console.log("rate1===>", new Decimal(res.data.mine_day_product));
					//console.log("rate2===>", new Decimal(this.rate2));
					this.totolDayRate = new Decimal(res.data.mine_day_product).plus(new Decimal(this.rate2));
					console.log("sum====>", this.totolDayRate);
				}
			},

			to_js(type) {
				//console.log("type", type);
				this.topage(`gather/mainland/initial_intro/initial_intro?type=${type}`)

			},
			async upgradeNow(mine_id) {
				// console.log("立即升级");
				// console.log("mine_id", mine_id);
				let res = uni.ajax.mineCave_upgrade({
					mine_id,
				})
				console.log("升级结果====>", res);
				// 使用 then 方法获取 PromiseResult
				res.then((result) => {
					console.log("result===>",
						result); // 这里的 result 就是 Promise 的解决值，即 { "code": 200, "msg": "success", "data": {} }
					if (result.code == 200) {
						console.log("升级成功--------");
						uni.$u.toast(this.$t("mainland.upgradeSuccess"));
						this.shop_landList(2);
						this.shop_landList(1);
						this.shop_getFriendMine();
						this.get_user_info();
						// setTimeout(function() {
						// 	uni.reLaunch({
						// 		url: '/pages/gather/mainland/index'
						// 	})
						// }, 100);
					}

				}).catch((error) => {
					console.error(error);
				});
				// if (res.code == 200) {
				// 	console.log("升级成功--------");
				// 	uni.$u.toast(this.$t("mainland.upgradeSuccess"));
				// 	uni.reLaunch({
				// 		url: '/pages/gather/mainland/index'
				// 	})
				// 	//location.reload();

				// }
				this.explore_card_popup = false;
			},
			finishCount() {
				this.shop_landList(1);
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
					this.menuList = res.data.link_list;
					console.log("获取游戏数据成功=========>", this.menuList);
				} else {
					// 出现错误时，可以设置默认值或错误处理
					console.error('获取游戏数据失败或数据格式不正确');
					// this.public_getExamConfig();
					// this.menuList = [{
					// 		title: this.$t('mainland.game4'),
					// 		type: 'game',
					// 		link: 'https://cdn.dataosha.ptejj.com/index.html',
					// 		testLink: 'https://dataosha.yygogogo.com/',
					// 		icon: '/static/else/battle.gif',
					// 		kfz: false
					// 	},
					// 	{
					// 		title: "Block Meta",
					// 		type: 'game',
					// 		game_type: 1,
					// 		link: 'https://cdn.block.ptejj.com/index.html',
					// 		testLink: 'https://block.yygogogo.com/',
					// 		icon: '/static/else/block.gif',
					// 		kfz: false
					// 	},

					// 	{
					// 		title: "FISHING",
					// 		type: 'game',
					// 		link: 'https://cdn.fish.ptejj.com/index.html',
					// 		testLink: 'https://fish.yygogogo.com/',
					// 		icon: '/static/else/fish.gif',
					// 		kfz: false
					// 	},
					// 	// {
					// 	// 	title: "Dice Game",
					// 	// 	type: 'game',
					// 	// 	link: 'https://cdn.dataosha.ptejj.comt/index.html',
					// 	// 	testLink: 'https://dataosha.yygogogo.com/',
					// 	// 	icon: 'https://niudantu.yygogogo.com/slot.png',
					// 	// 	kfz: true
					// 	// },
					// 	{
					// 		title: this.$t('mainland.game17'),
					// 		type: 'page',
					// 		link: 'gather/mainland/blindBox_wait',
					// 		icon: 'https://niudantu.phattai88.net/blindBox.png',
					// 		kfz: false
					// 	},
					// 	{
					// 		title: this.$t('mainland.game5'),
					// 		type: 'game',
					// 		link: 'https://cdn.dataosha.ptejj.com/index.html',
					// 		testLink: 'https://fish.yygogogo.com/',
					// 		icon: 'https://niudantu.phattai88.net/under.png',
					// 		kfz: true
					// 	},
					// 	{
					// 		title: this.$t('mainland.game18'),
					// 		type: 'game',
					// 		link: 'https://cdn.dataosha.ptejj.com/index.html',
					// 		testLink: 'https://fish.yygogogo.com/',
					// 		icon: 'https://niudantu.phattai88.net/sport.png',
					// 		kfz: true
					// 	},
					// 	// {
					// 	// 	title: "签到",
					// 	// 	type: 'page',
					// 	// 	link: 'gather/mainland/signIn/signIn',
					// 	// 	icon: '/static/else/sign.png',
					// 	// 	kfz: false
					// 	// },
					// 	{
					// 		title: this.$t('mainland.game16'),
					// 		type: 'page',
					// 		link: 'collect/association/myGuild/myGuild',
					// 		icon: '/static/wuliaoyuan-icon/gengduo.png',
					// 		kfz: false
					// 	}

					// ];
				}


			},
			initLangText() {
				//this.public_getExamConfig();
				if (uni.isOnlineExam) {
					this.public_getExamConfig();
				} else {
					console.log("222222222222222222");
					this.menuList = [{
							title: this.$t('mainland.game4'),
							type: 'game',
							link: 'https://cdn.dataosha.ptejj.com/index.html',
							testLink: 'https://dataosha.yygogogo.com/',
							icon: '/static/else/battle.gif',
							kfz: false
						},
						{
							title: "Block Meta",
							type: 'game',
							game_type: 1,
							link: 'https://cdn.block.ptejj.com/index.html',
							testLink: 'https://block.yygogogo.com/',
							icon: '/static/else/block.gif',
							kfz: false
						},

						{
							title: "FISHING",
							type: 'game',
							link: 'https://cdn.fish.ptejj.com/index.html',
							testLink: 'https://fish.yygogogo.com/',
							icon: '/static/else/fish.gif',
							kfz: false
						},
						// {
						// 	title: "Dice Game",
						// 	type: 'game',
						// 	link: 'https://cdn.dataosha.ptejj.comt/index.html',
						// 	testLink: 'https://dataosha.yygogogo.com/',
						// 	icon: 'https://niudantu.yygogogo.com/slot.png',
						// 	kfz: true
						// },
						{
							title: this.$t('mainland.game17'),
							type: 'page',
							link: 'gather/mainland/blindBox_wait',
							icon: 'https://cdn.niudantu.ptejj.com/blindBox.png',
							kfz: false
						},
						{
							title: this.$t('mainland.game5'),
							type: 'game',
							link: 'https://cdn.dataosha.ptejj.com/index.html',
							testLink: 'https://fish.yygogogo.com/',
							icon: 'https://cdn.niudantu.ptejj.com/under.png',
							kfz: true
						},
						{
							title: this.$t('mainland.game18'),
							type: 'game',
							link: 'https://cdn.dataosha.ptejj.com/index.html',
							testLink: 'https://fish.yygogogo.com/',
							icon: 'https://cdn.niudantu.ptejj.com/sport.png',
							kfz: true
						},
						// {
						// 	title: "签到",
						// 	type: 'page',
						// 	link: 'gather/mainland/signIn/signIn',
						// 	icon: '/static/else/sign.png',
						// 	kfz: false
						// },
						{
							title: this.$t('mainland.game16'),
							type: 'page',
							link: 'collect/association/myGuild/myGuild',
							icon: '/static/wuliaoyuan-icon/gengduo.png',
							kfz: false
						}

					]
				}


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
					// {
					// 	name: '星空矿场',
					// 	type: '3'
					// },
				]
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
					console.log("开始递增");
				}, interval);
				// 更新定时器状态
				this.$store.commit('setTimerRunning', true);
			},
			startFakeUpdate() {
				this.fakeFood = uni.getStorageSync('food');
				console.log("当前宝石数量===>", this.fakeFood);

				if (this.fakeFood) {
					const currentFood = parseFloat(this.fakeFood); // 将字符串转换为浮点数
					//每秒增加数字
					const increment = 0.0000015;
					this.showCount = 0;
					this.fakeFood = (currentFood + increment).toFixed(7); // 增加数值并保留7位小数
					uni.setStorageSync('food', this.fakeFood);
				} else {
					// this.showCount = 3;
					// this.stopFakeUpdate();
				}


			},
			stopFakeUpdate() {
				if (this.timer) {
					clearInterval(this.timer);
				}
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
					console.log(this.card_info, 'this.card_infothis.card_infothis.card_info')
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
				//console.log("4444");
				let res = await uni.ajax.shop_getFriendMine();
				if (res) {
					//this.friend_info = res.data;
					this.friendList = res.data.list;
					// this.friendList = [{
					// 		level: 1,
					// 		people_num: 1,
					// 		income_food: "0.0000000",
					// 		food: "0.0416665",
					// 		rate: "0.0000024"
					// 	},
					// 	{
					// 		level: 2,
					// 		people_num: 3,
					// 		income_food: "0.0003000",
					// 		food: "0.0416665",
					// 		rate: "0.0000324"
					// 	},
					// ]
					console.log("好友矿场列表==>", res);
					this.nextUpgrad = res.data.next_grade_upgrade_info;

					this.rate2 = this.filterAddAll(res.data.list, "food");

					console.log("sum2====>", this.rate2.toString());
					this.getAllDayRate();


				}
			},
			//获取代理列表
			async getAgentList() {
				let result = await uni.ajax.shop_getApiList({
					page: 1,
					// limit: 15,
					limit: 80,
					// lat: gps.latitude,
					// lng: gps.longitude
				})
				console.log("代理列表=================>", result);
				if (result) {
					this.agent_list = result.data.list
				}
			},
			shop_getApiList() { //店长列表
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						uni.chooseLocation({
							latitude: res.latitude,
							longitude: res.longitude,
							success: async (gps) => {
								let result = await uni.ajax
									.shop_getApiList({
										page: 1,
										limit: 15,
										lat: gps.latitude,
										lng: gps.longitude
									})
								if (result) {
									this.shop_list = result.data
										.list;
									if (this.shop_list.length >
										0) {
										this.shop_result = 4;
									} else {
										this.shop_result = 3;
									}
								}

							},
							fail: () => {
								this.shop_result = 3;
							}
						});
						c
					},
					fail: (err) => {
						this.shop_result = 3;
					}
				});

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
			click_tab(e) {
				console.log(e);
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
				//console.log("platform===>", system.platform);
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
				//console.log("os==========>", os);

			},
			async navigator(e) {
				console.log("eee===>", e);
				if (e.kfz) {
					return this.$u.toast(this.$t('utils.notYetOpen'))
				}
				//console.log(e);
				const lang = uni.getStorageSync('locale') ? uni.getStorageSync('locale') :
					this._i18n.locale;
				const avatar = this.handleImgUrl(this.user_info.avatar);
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
					let res = await uni.ajax.isEnterGame();
					if (res.code == 200) {
						if (!e.game_type) {
							// // #ifdef APP-PLUS
							// plus.screen.lockOrientation("landscape-primary");
							// // #endif
							uni.setStorage({
								key: "pay_url",
								data: `${gameUrl}?token=` + uni.getStorageSync(
										'jwt') +
									'&company_code=' + uni.conf.companycode + '&lang=' + lang +
									'&avatar=' + avatar + '&nickname=' + nickname + '&puid=' + puid +
									'&timestamp=' + timestamp +
									'&sign=' + sign + '&os=' + os,
								success: () => {
									this.topage("general/web/index");
								}
							})
							return;
						}
						if (e.game_type) {
							uni.setStorage({
								key: "pay_url",
								data: `${gameUrl}?token=` + uni.getStorageSync(
										'jwt') +
									'&company_code=' + uni.conf.companycode + '&lang=' + lang +
									'&avatar=' + avatar + '&nickname=' + nickname + '&os=' + os +
									'&game_type=' + e
									.game_type,
								success: () => {
									this.topage("general/web/index");
								}
							})
							return;
						}
					}
				}
				if (e.type == 'page') {
					if (e.link == 'collect/association/myGuild/myGuild') {
						// this.totab(e.link);
						this.totab(e.link.replace('collect', 'gather'));
					} else {
						// uni.$u.route(e.link);
						this.topage(e.link);
					}
				}
			},
			currentChange(val) {
				if (this.current == val.type) return
				this.fieldList = val.type == 'mainland' ? {} : [];
				this.current = val.type
				console.log("current", this.current);
				switch (val.type) {

					// 园丁大陆
					case '1':
						this.shop_landList(1);
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


						// case '3':
						// 	this.shop_landList(3)
						// 	break;
				}
				this.fieldList_result = 1;
			},
			async shop_landList(type) {
				let res = await uni.ajax.shop_landList({
					page: 1,
					// limit: uni.conf.limit,
					limit: 30,
					type: type
				});
				if (res) {
					//矿洞
					if (type == 1) {
						this.fieldList = res.data.list[0];
						//console.log("res12388657896-----", this.fieldList);
						if (this.fieldList.mine_cumulative_time >= this.fieldList.mine_excavation_cycle_time) {
							console.log("挖矿进度100%----");
							//this.shop_landList(1);
							if (!this.miningComplete) {
								this.miningComplete = true; // 设置挖矿完成标志为true
								this.shop_landList(1); // 在挖矿完成时调用shop_landList(1)
							}
						}
						//矿场
					} else {
						this.fieldList2 = res.data.list;
					}


					this.fieldList_result = 4;

				}
			},
			landLevel() {
				uni.navigateTo({
					url: '/pages/gather/mainland/reclaimedLand/reclaimedLand',
					events: {
						landLevel: res => {
							console.log('开启了宝石矿场......');
							console.log("111111111", res.mineName);
							this.openGemMineName = this.$t(res.mineName);
							this.shop_landList(2);
							this.opendGemMine = true;
							this.timedGrowed(2500);
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

	// @font-face {
	// 	font-family: 'ZhengQing';
	// 	src: url('../../../assets/font/ZhengQing/ZhengQingKeLengKuTi-2.ttf');
	// }

	.mainland {
		overflow: hidden;
		margin-bottom: 60rpx;
		//background: red;

		// .status {
		// 	height: var(--status-bar-height);
		// 	position: sticky;
		// 	top: 0;
		// 	z-index: 5;
		// }
		// overflow: hidden;
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
				//font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}


		}

		.buy_box {
			width: 100%;
			height: 1200rpx;
			position: relative;
			// background: url('/static/Continent/bg1.png') no-repeat;
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
					// background: url('/static/Continent/i38.png') no-repeat;
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
						// position: absolute;

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
					// left: calc(50% - 200rpx);
					transform: translateX(250rpx);
				}

				>.img_boxs_item:nth-of-type(2) {
					// left: calc(50% - 170rpx);
					transform: translateX(-250rpx);
				}

				>.img_boxs_item:nth-of-type(3) {
					// left: calc(50% - 140rpx);
					transform: translateX(150rpx);
				}

				>.img_boxs_item:nth-of-type(4) {
					// left: calc(50% - 110rpx);
					transform: translateZ(60rpx);
				}

				>.img_boxs_item:nth-of-type(5) {
					// left: calc(50% - 200rpx);
					transform: translateX(-170rpx);
				}

			}

			@keyframes rotateGlow {
				0% {
					transform: scale(1);
					transform: rotate(-2deg);
					// filter: brightness(80%);
				}

				15% {
					transform: scale(1.01);
					transform: rotate(-1deg);
					// filter: brightness(85%);
				}

				25% {
					transform: scale(1.02);
					transform: rotate(0deg);
					// filter: brightness(90%);
				}

				35% {
					transform: scale(1.03);
					transform: rotate(1deg);
					// filter: brightness(95%);
				}

				50% {
					transform: scale(1.04);
					transform: rotate(2deg);
					// filter: brightness(100%);
				}

				60% {
					transform: scale(1.03);
					transform: rotate(1deg);
					// filter: brightness(95%);
				}

				70% {
					transform: scale(1.02);
					transform: rotate(0deg);
					// filter: brightness(90%);
				}

				80% {
					transform: scale(1.01);
					transform: rotate(-1deg);
					// filter: brightness(85%);
				}

				90% {
					transform: scale(1.005);
					transform: rotate(-1.5deg);
					// filter: brightness(82%);
				}

				100% {
					transform: scale(1);
					transform: rotate(-2deg);
					// filter: brightness(80%);
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
				//background: red;
			}

			.lightBox {
				width: 745rpx;
				height: 730rpx;

				background: url('/static/Continent/light.png');
				//background: red;
				@include backImg;
				position: absolute;
				bottom: 0rpx;
				transform-origin: center center;
				// filter: brightness(80%);
				opacity: 0.6;
				animation: rotateGlow 2s infinite linear;

				//background: red;
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
				//background: red;
			}

			.monekey_card_box {
				width: 100%;
				height: 80rpx;
				margin-top: -85rpx;
				//background: red;

				.monekey_card_main {
					width: 200rpx;
					height: 100%;
					margin-right: 60rpx;
					position: relative;
					//background: black;

					.monekey {
						width: 55rpx;
						height: 90rpx;
						background: url('/static/Continent/bg2_bottom_monkey.png');
						@include backImg;
						font-size: 18rpx;
						//background: blue;


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
						//background: yellow;

						text {
							font-size: 18rpx;
							// position: absolute;
							// bottom: 8rpx;
							// right: 0;
						}
					}
				}


			}

			.buy_info_box {
				width: 100%;
				// height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				//background: blue;


				.buy_info_item {
					//font-family: Alimama ShuHeiTi;
					letter-spacing: -0.165rpx;
					//margin-top: 10rpx;
					//background: red;

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
			width: 750rpx;
			height: 160rpx;
			border-radius: 30rpx;
			margin-top: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			>view {
				width: 720rpx;
				height: 105rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #030104;
				font-size: 38rpx;
				font-style: normal;
				font-weight: 700;
				background-image: url('/static/btn/buy.png');
				@include backImg;
				//margin-top: 30rpx;
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
				//background: red;

				p {
					margin-bottom: 10rpx;
					//background: yellow;
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

			//background: red;

			.day_icome {
				image {
					height: 24rpx;
				}
			}
		}

		.friend_level {
			//background: red;
			// margin-bottom: 20rpx;
		}

		.buy_card {
			width: 100%;
			height: 124rpx;
			//background: red;

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

			//margin-top: 30rpx;
			//background: red;

			.play_nav_box_bg {
				width: 100%;
				height: 140rpx;
				background-image: url('../../../static/Continent/play_nav.png');
				@include backImg;
				//background: yellow;

				div {
					width: 100%;
					height: 100%;
					font-size: 36rpx;
					color: #fff;
					padding-left: 40rpx;

					p:nth-child(1) {
						font-size: 30rpx;

						span:nth-child(1) {
							//font-family: 'ZhengQing', sans-serif;
						}
					}

					p:nth-child(2) {
						//font-family: 'ZhengQing', sans-serif;
						background-image: linear-gradient(to right, #D6DBC5, #B2CBE1, #BAAEDE);
						-webkit-background-clip: text;
						color: transparent;
						font-size: 42rpx;
					}

				}
			}
		}


		.card {
			width: 750rpx;
			box-sizing: border-box;
			// margin: 0 0rpx 24rpx;
			background: #fff;
			// border-radius: 12rpx;
			padding: 36rpx 32rpx;

			.card_title {
				font-size: 32rpx;
				//font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #121317;
				padding-bottom: 24rpx;
			}

			.u-icon--bottom {
				flex-direction: column;
				justify-content: center;
				text-align: center;
				margin-bottom: 20rpx;
			}

		}

		.gardener_box {
			width: 100%;
			height: 660rpx;
			margin-top: 30rpx;
			// background: url('/static/Continent/ks_bg.png') no-repeat;
			// background-size: 100% 100%;
			background: url('/static/Continent/bg2.png');
			@include backImg;
			position: relative;
			padding-top: 180rpx;
			//background: red;

			// .zs_phb {
			// 	position: absolute;
			// 	right: 9%;
			// 	top: 18%;
			// }
			.gardener_text_box {
				width: 100%;
				height: 160rpx;
				padding: 0 120rpx;
				//background: red;

				.gardener_text_bg {
					width: 100%;
					height: 100%;
					background: url('/static/Continent/bg2_1.png');
					@include backImg;
					// padding: 10rpx;


					p {
						width: fit-content;
						font-size: 60rpx;
						//font-family: SourceHanSansCN-Bold, SourceHanSansCN-Bold;
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
							// 1rpx 6rpx 1rpx #E1C493,
							// 1rpx 7rpx 1rpx #E1C493,


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
				// font-style: italic;
				font-family: 'Courier New', Courier, monospace;
				font-size: 30rpx;


				//background: red;
				p {
					width: fit-content;
					height: 100%;
					border-radius: 30rpx;
					padding: 0 20rpx;
					border: 1px solid #D2AB71;
					//background: red;
				}
			}




		}

		.asset {
			width: 100%;
			height: 200rpx;
			// margin: 0 32rpx 0rpx;
			box-sizing: border-box;
			border-radius: 12rpx;
			// display: flex;
			// justify-content: space-between;
			margin-top: 30rpx;
			//background: red;


			.asset_card {
				width: 710rpx;
				// height: 100%;
				border-radius: 8rpx;
				//background: yellow;

				.asset_card_item {
					width: 100%;
					height: 160rpx;
					//height: 140rpx;
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
						//font-family: DIN-Medium, DIN;
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
				width: 710rpx;
				font-size: 22rpx;
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
					// fill: #393D48;

					// stroke-width: 2rpx;
					// stroke: #494F5D;

					// box-shadow: 0rpx 4rpx 0rpx 0rpx #494F5E inset;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					//buy_info_box : PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					// background: url('/static/Continent/tans.png') no-repeat;
					background-size: 100% 100%;
					border-radius: 8rpx 8rpx 0 0;
					// border: 2rpx solid;
					// border-image: linear-gradient(180deg, rgba(46, 75, 97, 1), rgba(42, 84, 90, 0)) 1 1;
					box-sizing: border-box;

					text {
						color: rgba(255, 255, 255, 0.25);

					}
				}

				.active {
					// fill: #15161A;

					// stroke: #202125;

					// background: #31516A;
					background: url('/static/Continent/select_tabs.png') no-repeat;
					background-size: 100% 100%;

					text {
						color: #fff;
					}
				}
			}








			.wrap {
				// background: #31516A;
				background: linear-gradient(180deg, #383C47 0%, #353944 24.78%, #1A1B1F 56.48%, #1A1B1F 103.26%);
				//padding: 24rpx 32rpx;
				//background: red;
				//margin-bottom: 160rpx;

				.my_property {
					width: 100%;
					height: 200rpx;
					// gap: 10rpx;
					// background: #383C47;
					//background: red;

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
							//background: yellow;

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
							//background: blue;

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
					//background: red;

					.monkey_content {
						width: 100%;
						height: 90rpx;
						//background: yellow;

						.myApe {
							width: 450rpx;
							height: 70rpx;
							background: #23262F;
							padding-right: 20rpx;
							border-radius: 6rpx;


							.myApe_box {
								// flex: 3;
								width: 360rpx;
								height: 100%;
								position: relative;
								//background: red;

								.myApe_img {
									position: absolute;
									left: -40rpx;
									//background: blueviolet;

									image {
										height: 70rpx;
										//background: blue;
									}
								}

								.myApe_text {
									font-size: 26rpx;
									margin-left: 60rpx;
									color: #5E626B;
								}
							}

							.num {
								// flex: 1;
							}

						}

						.buyApe_btn {
							width: 160rpx;
							height: 60rpx;
							font-size: 20rpx;
							background-image: url('/static/btn/buyApe_btn.png');
							@include backImg;
						}
					}
				}

				.add_field {
					height: 358rpx;
					border-radius: 12rpx;
					background-color: rgba(0, 0, 0, 0.3);
					// background: url('/static/Continent/i32.png') no-repeat;
					//background-size: cover;
					background: url('/static/Continent/mine_cave_bg2.png');
					@include backImg;
					//margin-bottom: 14rpx;
					//background: red;


					.add_btn {
						width: 300rpx;
						height: 96rpx;
						// box-shadow: var(--btn-shadow);
						border-radius: 8rpx;
						//background: var(--linear-gradient-theme);
						//background: white;
						font-size: 36rpx;
						font-weight: 700;
						color: #ffffff;
						background: url('/static/btn/open_cave_btn.png');
						@include backImg;

					}
				}

			}



			.team {

				// background: red;
				padding: 20rpx 32rpx;

				.teamUp {
					width: 100%;
					height: 124rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-image: url('/static/btn/zuduibaoshi.png');
					@include backImg;

					view {
						font-size: 40rpx;
						color: #fff;
					}

				}

				.team_ {
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.6);
				}

				.efficiency {
					display: flex;
					align-items: center;

					>image {
						width: 48rpx;
						height: 48rpx;
					}

					font-size: 24rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.6);
				}

				.invite {
					background: var(--linear-gradient-theme);
					height: 96rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #FFFFFF;
					box-shadow: var(--btn-shadow);
					border-radius: 8rpx;
					margin-top: 24rpx;
				}
			}

			.openHigher_box {

				//background: red;
				padding-bottom: 40rpx;

				.field_title {
					height: 88rpx;
					padding: 0 20rpx;
					justify-content: space-between;

					.name {
						color: #FFF;
						//font-family: Alimama ShuHeiTi;
						font-size: 32rpx;
						font-style: normal;
						font-weight: 700;
						line-height: 18px;
						/* 112.5% */
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
							//background: red;
						}

						//background: red;
						p {
							letter-spacing: 4rpx;

							image {
								width: 36rpx;
								height: 36rpx;
							}

							.progress_text {
								padding-left: 20rpx;
								font-size: 24rpx;
								//background: red;
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
					//background: red;
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
					//background: #1A1B1F;
					//background: red;


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
						//background: red;
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
						// font-size: 26rpx;
						//background: red;

						.play_text2 {
							width: 220rpx;
							//background: yellow;
						}

						.play_text3 {
							width: 330rpx;
							padding-left: 99rpx;
							padding-bottom: 25rpx;
							// font-size: 22rpx;
							//background: yellow;
						}
					}

					.play_text4 {
						width: 100%;
						height: 100rpx;
						// margin-top: 250rpx;
						padding-left: 35rpx;
						// padding-top: 40rpx;
						margin-top: 16rpx;
						//background: red;


						p {
							width: 150rpx;
							height: 100%;
							// font-size: 26rpx;
							text-align: left;
							padding-left: 45rpx;
							padding-top: 18rpx;
							//background: yellow;
						}
					}

				}
			}

			.mine_intro {
				width: 100%;
				height: 620rpx;
				//background: red;

				.play_method_bg {
					width: 100%;
					height: 520rpx;
					background-image: url('/static/Continent/play_method_bg2.png');
					// @include backImg;

					.play_text1 {
						width: 80%;
						margin-left: 130rpx;
						padding-top: 60rpx;
					}

					.play_text2_mid {
						width: 80%;
						margin-top: 110rpx;
						// padding: 0 20rpx;

					}
				}
			}
		}
	}



	.firend_box {
		width: 520rpx;
		// height: 544rpx;
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
		// background: url('/static/Continent/i32.png') no-repeat;
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
			margin-top: 10rpx;
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