<template>
	<view>
		<view class="field_title flex-between">
			<view class="name">
				<text style="margin-right: 10rpx;">{{ type === 1&&info && Object.keys(info).length > 0 && info.mineInfo && info.mineInfo.name ? 
				$t(info.mineInfo.name) :"Level"+'  '+ friendInfo.level }}</text>
				<text
					v-show="info.mineInfo&&!info.is_show">{{info.mineInfo&&info.mineInfo.curIndex}}/{{info.mineInfo&&info.mineInfo.num}}</text>
			</view>
			<view class="introduce" v-if="!isOnlineExam" @tap="to_js(type)" v-show="type==2||info.level<2">
				<u-icon name="arrow-right" size="24rpx" color="rgba(255, 255, 255, 1)"
					:label="type==1?$t('utils.primary'):$t('utils.adavanced')+' '" labelSize="24rpx"
					label-color="rgba(255, 255, 255, 1)" labelPos="left"></u-icon>
			</view>
		</view>
		<!-- 1:矿山 2：宝石矿场 -->
		<!-- {{type}} -->
		<view class="field" v-show="type==1" @click="clickField(type,info)"
			:style="{'--field-bg': info.level<2 ? `url('/static/Continent/mine_cave_bg.png')` : `url('/static/Continent/mine_cave_bg2.png')`}">
			<!-- &&info.dispatch_count>0 -->
			<view class="field_item" v-show="info.level<2">
				<view class="flex-between">
					<block v-show="!info.up_show">
						<!-- 产出效率 -->
						<view class="efficiency flex-start">
							<text>{{$t('utils.grandTotal')}}</text>
							<image src="/static/btn/gem-icon1.png" mode=""></image>
							<span class="bold">{{info.product_all}}</span>
						</view>
						<view class="num " @click="$emit('firend_box')">
							<view class="" style="text-align: right;margin-bottom: 10rpx;">
								<image src="/static/Continent/my_monkey.png" style="width: 30rpx;height: 25rpx;"
									mode="">
								</image>
								<span>{{info.dispatch_count}}</span> {{$t('utils.mining')}}
							</view>
							<text
								v-show="info.dispatch_count>0">{{$t('mainland.complete')}}：{{formatDate(info.mine_cumulative_time,1)}}</text>
						</view>
					</block>
				</view>
				<view class="progress_section" style="width: 100%;" v-show="info.dispatch_count>0">
					<u-line-progress activeColor="#888" inactiveColor="#0A0B0F" :showText="true"
						:percentage="info.mine_cumulative_time/info.mine_excavation_cycle_time*100" height="14">
						<template #default>
							<text class="progress_text" style="position: absolute; left: 0;">
								{{$t('utils.upgradeProgress')}}{{info.mine_cumulative_time>info.mine_excavation_cycle_time?100:info.mine_cumulative_time/info.mine_excavation_cycle_time*100|toFixed2}}%
							</text>
						</template>
					</u-line-progress>
					<view class="remain">
						<text>{{$t('mainland.lastRemaining')}}：{{formatDate(info.mine_excavation_cycle_time-info.mine_cumulative_time,2)}}</text>
					</view>
				</view>
			</view>
			<view class="" v-show="info.level>1">
				<view class="flex-between">
					<block>
						<!-- 产出效率 -->
						<view class="efficiency flex-start">
							<text>{{$t('utils.grandTotal')}}</text>
							<image src="/static/btn/gem-icon1.png" mode=""></image>
							<span>{{info.product}}</span>
						</view>
						<view class=""
							style="background-color: rgba(255, 255, 255, 0.4);color: #fff;font-size: 24rpx;padding: 4rpx;">
							{{$t('mainland.lastRemaining')}}：{{formatEndDate(info.end_time)}}
						</view>
					</block>
				</view>
			</view>
			<view class="day_rate flex-end" v-show="info.level>1&&!info.up_show">
				<view class="flex-center">
					<image src="/static/btn/gem-icon1.png" mode="heightFix" style="height:24rpx;">
					</image>
					<text> <span>{{info.day_rate?info.day_rate:'0'}}</span>/{{$t('utils.day')}}</text>
				</view>
			</view>
			<!-- mining income anim (move up)  not explore -->
			<view class="up_mine tc df alc jc" v-show="info.level<2&&info.up_show">
				<view class="">
					<view>{{$t('mainland.mineCompleted')}}</view>
					<view class=" flex-colum-evenly">
						<p class="">
							{{$t('mainland.cumulativeMined')}}
						</p>
						<p class="fw df alc jc" style="font-size: 44rpx;margin: 10rpx 0;">
							<image style="width: 40rpx;height: 40rpx;margin-right: 4rpx; "
								src="/static/btn/gem-icon1.png" mode=""></image>
							{{info.product}}
						</p>
					</view>
					<view class="tc up_btn fw" @click.stop="upConfirm">
						{{$t('mainland.upgradeNow')}}
					</view>
				</view>
			</view>
			<view class="" v-show="info.level<2&&info.is_explore_status!=1&&!info.up_show">
				<view :class="[info.dispatch_count==1?'flex-center':'flex-around']">
					<view class="gardener" v-for="(item,index) in info.dispatch_count>7?7:info.dispatch_count"
						:key="index">
						<view class="add_num">+{{info.productIn}}</view>
						<u-icon class="mining_icon" :name="mining_images[currentActive]" size="40"
							color="#fff"></u-icon>
					</view>
				</view>
			</view>
			<view class="explore_box" v-show="info.level<2&&info.is_explore_status==1&&!info.up_show">
				<view class="flex-center">
					<view class="explore flex-center" v-for="(index, i) in 7" :key="index">
						<u-icon class="first_icon" :name="query1_images[currentActive]" v-if="i==6" size="60"
							color="#fff"></u-icon>
						<u-icon :name="query2_images[currentActive]" v-else size="40" color="#fff"></u-icon>
					</view>
				</view>
			</view>
			<view class="" v-show="info.level>1">
				<view class="flex-center">
					<view class="gardener mine" v-for="(item,index) in 1" :key="index">
						<view class="add_num">+{{info.productIn}}</view>
						<u-icon :name="mining_images[currentActive]" size="60" color="#fff"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="field_friend" v-show="type==2">
			<view class="field_friend_bg">
				<block v-if="friendInfo.income_food>=0">
					<!-- 产出效率 -->
					<view class="flex-between">
						<view class="efficiency flex-start">
							{{$t('utils.grandTotal')}}
							<image src="/static/btn/gem-icon1.png" mode=""></image>
							<span>{{friendInfo.income_food}}</span>
						</view>
						<view class="num flex-start" @tap="topage('general/invite/myFriend2?level='+friendInfo.level)">
							<image src="/static/Continent/my_friends.png" style="width: 30rpx;height: 25rpx;" mode="">
							</image><span>{{friendInfo.people_num}}</span> {{$t('utils.mining')}}
						</view>
					</view>
					<!-- fiend mine cave income anim (move up) -->
					<view class="friend_bottom " @click="clickField(type,friendInfo)">
						<view
							:class="[friendInfo.people_num == 1 ? 'flex-center' : 'flex-evenly', { 'left': friendInfo.people_num == 1 ? '50%' : '' }]"
							@click="clickField(type,friendInfo)">
							<view class="gardener"
								v-for="(item,index) in friendInfo.people_num>7?7:friendInfo.people_num" :key="index">
								<view class="add_num">+{{friendInfo.rate}}</view>
								<u-icon class="friend_icon" :name="friend_images[currentActive]" size="30"
									color="#fff"></u-icon>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="mineCave_level_box friend_level  flex-between">
				<view class="level">
					<!-- {{$t('mainland.mining')}} {{friendInfo.level}} {{$t('mainland.team')}} -->
				</view>
				<view class="day_icome flex-center">
					<image src="/static/btn/gem-icon1.png" mode="heightFix">
					</image>
					<text> <span class="bold">{{friendInfo.food}}</span>/{{$t('utils.day')}}</text>
				</view>
			</view>
			<!-- invite friends btn -->
			<view class="team" v-show="nextUpgrad.next_grade-1==friendInfo.level">
				<view class="teamUp" mode="" @click="topage('general/invite/share')">
					<view><strong>{{$t('mainland.inviteFriendDigGem')}}</strong></view>
				</view>
			</view>
			<!-- mining income anim (move up)-->
			<view :class="[info.dispatch_count==1?'flex-center':'flex-around']">
				<view class="gardener" v-for="(item,index) in info.dispatch_count>7?7:info.dispatch_count" :key="index">
					<view class="add_num">+{{info.productIn}}</view>
					<image v-for="(i,j) in friend_images" :key="i" :class="j==currentActive?'active':'no_active'"
						:src="i" mode="heightFix" style="height:60rpx;">
					</image>
				</view>
			</view>
		</view>
		<!-- common modal to show gemInfo or digInfo(click field to show) -->
		<u-popup :show="showCommModal" bgColor="#F0F0F0" :round="6" mode="center">
			<view class="modal_box ">
				<!-- {{type}}--type -->
				<view class="mine_type flex-center" v-if="type>=2">
					Level {{mineCaveInfo.level}}
				</view>
				<view class="mine_type flex-center" v-else>
					{{mineCaveInfo.mineInfo?$t(mineCaveInfo.mineInfo.name):''}}
				</view>
				<view class="top_backImg flex-colum-around">
					<view class="income flex-between">
						<view class="left color_w flex-colum-between">
							<p>{{$t('mainland.income')}}</p>
							<p class="flex-center">
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
								<span
									class="bold">{{type>=2?mineCaveInfo.food:mineCaveInfo.day_rate}}</span><span>/{{$t('utils.day')}}</span>
							</p>
						</view>
						<view class="right" v-show="info.level<2||type>=2">
							<p class="flex-center">
								<image
									:src="type>=2?'/static/Continent/friend_static.png':'/static/Continent/modal_moneky.png'"
									mode="heightFix"></image>
								<span>X{{type>=2?mineCaveInfo.people_num:mineCaveInfo.dispatch_count}}</span>
							</p>
						</view>
					</view>
				</view>
				<view class="bottom_content ">
					<view class="bottom_bg flex-colum-evenly">
						<view class="title">
							<text class="bold">{{$t('mainland.yield')}}</text>
						</view>
						<view class="min_content flex-colum">
							<p>{{$t('mainland.haveYield')}}</p>
							<p class="flex-center">
								<image src="/static/btn/gem-icon1.png" mode="heightFix"></image>
								<span>{{type>=2?mineCaveInfo.income_food:mineCaveInfo.product}}</span>
							</p>
						</view>
					</view>
					<view class="confirm_btn " @click="confirm">
						<button class="flex-center color_w">{{$t('utils.confirm')}}</button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			},
			friendInfo: {
				type: Object,
				default: () => {
					return {}
				}
			},
			nextUpgrad: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type: {
				type: Number,
				default: 1
			},
			food: {
				type: Number,
				default: 1
			},
			to_other_page: {
				type: Boolean,
				default: false
			},
			currentActive: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				isOnlineExam: uni.getStorageSync('isOnlineExam'),
				userInfo: uni.getStorageSync('user_info'),
				showCommModal: false,
				mineCaveInfo: {},
				currentFrame: 0,
				mining_images: [
					'/static/mining/1.png',
					'/static/mining/2.png',
					'/static/mining/3.png',
					'/static/mining/4.png',
					'/static/mining/5.png',
					'/static/mining/6.png',
				],
				query1_images: [
					'/static/shoudian/1.png',
					'/static/shoudian/2.png',
					'/static/shoudian/3.png',
					'/static/shoudian/4.png',
					'/static/shoudian/5.png',
					'/static/shoudian/6.png',
				],
				query2_images: [
					'/static/tuodi/1.png',
					'/static/tuodi/2.png',
					'/static/tuodi/3.png',
					'/static/tuodi/4.png',
					'/static/tuodi/5.png',
					'/static/tuodi/6.png',
				],
				friend_images: [
					'/static/friend/1.png',
					'/static/friend/2.png',
					'/static/friend/3.png',
					'/static/friend/4.png',
					'/static/friend/5.png',
					'/static/friend/6.png',
				],
				timer: null
			}
		},
		created() {

		},
		watch: {},
		filters: {
			toFixed2(value) {
				if (typeof value === 'number' || !isNaN(parseFloat(value))) {
					return parseFloat(value).toFixed(2);
				}
				return value;
			},
		},
		methods: {
			formatDate(time, type) {
				let d = Math.floor(time / (24 * 3600));
				let h = Math.floor((time % (24 * 3600)) / 3600);
				let m = Math.floor((time % 3600) / 60);
				d = d < 0 ? 0 : d
				h = h < 0 ? 0 : h
				m = m < 0 ? 0 : m
				let day = this.$t('mainland.day')
				let hour = this.$t('mainland.hour')
				let minute = this.$t('mainland.minute')
				return type == 2 ? `${d}${day} ${h}${hour} ${m}${minute}` : `${d}${day}`;
			},
			formatEndDate(data) {
				// 将时间戳转换成标准日期时间格式
				const now = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
				const difference = data - now;
				let d = Math.floor(difference / (24 * 3600));
				let h = Math.floor((difference % (24 * 3600)) / 3600);
				let m = Math.floor((difference % 3600) / 60);
				d = d < 0 ? 0 : d
				h = h < 0 ? 0 : h
				m = m < 0 ? 0 : m
				let day = this.$t('mainland.day')
				let hour = this.$t('mainland.hour')
				let minute = this.$t('mainland.minute')
				return `${d}${day} ${h}${hour} ${m}${minute}`
			},
			confirm() {
				this.showCommModal = false;
			},
			upConfirm() {
				this.$emit('upConfirm')
			},
			// 点击field
			clickField(type, info) {
				this.showCommModal = true;
				this.mineCaveInfo = info;
			},
			to_js(type) {
				this.topage(`gather/mainland/initial_intro/initial_intro?type=${type}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-line-progress__line {
		align-items: center !important;
		justify-content: flex-start !important;
	}

	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.up_mine {
		position: absolute;
		top: 20%;
		left: 20%;
		width: 60%;
		color: #fff;
		z-index: 100;

		.up_btn {
			padding: 10rpx 0rpx;
			color: #000;
			background-image: url('/static/Continent/buy_btn2.png');
			@include backImg;
		}
	}

	.mining_icon {
		/deep/ .u-icon__img {
			height: 45px !important;
		}
	}

	.active {
		opacity: 1;
		position: relative;
	}

	.no_active {
		opacity: 0;
		position: absolute;
	}

	@keyframes goup {
		12% {
			transform: translate(-50%, -40%);
			opacity: 1;
		}

		32% {
			transform: translate(-50%, -70%);
			opacity: 0.8;
		}

		45% {
			transform: translate(-50%, -90%);
			opacity: 0.6;
		}

		100% {
			transform: translate(-50%, -150%);
			opacity: 0;
		}
	}

	.modal_box {
		width: 550rpx;
		height: 820rpx;
		padding: 30rpx;

		.mine_type {
			font-size: 36rpx;
			margin-bottom: 20rpx;
			font-weight: bold;
		}

		.top_backImg {
			width: 100%;
			height: 180rpx;
			padding: 35rpx 25rpx;
			background-image: url(/static/Continent/modal_bg.png);
			@include backImg;


			.income {
				width: 100%;
				height: 100%;

				.left {
					height: 100%;

					p {
						image {
							height: 36rpx;
						}

						span {
							font-size: 34rpx;
						}
					}

					p:nth-child(1) {
						font-size: 24rpx;
						margin-bottom: 8rpx;
					}
				}

				.right {
					align-self: flex-end;

					p {
						font-size: 22rpx;

						color: #9E9591;
						padding: 2rpx 10rpx;

						image {
							height: 40rpx;
						}
					}
				}
			}

		}

		.bottom_content {
			height: 500rpx;

			.bottom_bg {
				width: 100%;
				height: 350rpx;
				padding: 10rpx 30rpx;
				margin-top: 20rpx;
				background-image: url(/static/Continent/modal_bottom_bg.png);
				@include backImg;

				.title {
					font-size: 34rpx;
				}

				.min_content {
					width: 100%;
					height: 160rpx;
					padding: 10rpx;
					font-size: 24rpx;
					letter-spacing: 2rpx;
					background: #F1F1F1;

					p {
						margin-bottom: 10rpx;

						image {
							height: 40rpx;
							margin-bottom: 4rpx;
						}

						span {
							font-size: 40rpx;
							font-weight: 800;
							font-family: 'Microsoft YaHei', 'SimSun', sans-serif;
							font-style: italic;
						}
					}
				}
			}

			.confirm_btn {
				width: 100%;
				height: 80rpx;
				padding: 0 30rpx;
				margin-top: 40rpx;

				button {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
					font-size: 30rpx;
					letter-spacing: 4rpx;
					background: #2F2F2F;
				}
			}
		}
	}

	.day_rate {
		width: 100%;
		position: absolute;
		bottom: 10rpx;
		font-size: 24rpx;
		padding: 0 40rpx;
		color: #dedede;
	}

	.progress_section {
		position: absolute;
		bottom: 0;

		.progress_text {
			width: 730rpx;
			height: 30rpx;
			line-height: 30rpx;
			padding-left: 20rpx;
			font-size: 20rpx;
		}

		.remain {
			position: absolute;
			right: 20rpx;
			top: 0;
			color: #fff;
			font-size: 20rpx;
		}
	}

	.gardener {
		position: relative;
		width: 80rpx;
		@include backImg;

		.add_num {
			color: #fffad8;
			position: absolute;
			top: -50%;
			left: 50%;
			transform: translate(-50%, 0%);
			animation: goup 1.9s linear 0s infinite;
			opacity: 0;
			font-size: 16rpx;
			font-weight: bold;
		}

		.friend_icon {
			/deep/ .u-icon__img {
				height: 40px !important;
			}
		}
	}

	.mine {
		width: 110rpx;
		height: 120rpx;

		.add_num {
			font-size: 30rpx;
		}
	}

	.explore_box {
		width: 100%;
		height: 170rpx;
		padding-top: 50rpx;

		.explore {
			overflow: hidden;

			.first_icon {
				margin-left: 10rpx;

				/deep/ .u-icon__img {
					width: 90px !important;
					margin-bottom: 10rpx !important;
				}
			}
		}

		.isFirst {
			margin-left: 8rpx;
			height: 140rpx;
		}

		.isSecond {
			margin-top: 10rpx;
			height: 90rpx;
		}
	}

	.overturn {
		margin-top: -20rpx;
	}

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

	.field_friend {
		position: relative;
		overflow: hidden;
		width: 100%;

		.field_friend_bg {
			width: 100%;
			height: 308rpx;
			padding: 32rpx 32rpx 32rpx 8rpx;
			border-radius: 12rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background: url('/static/Continent/mine_cave_bg3.png');
			@include backImg;

			.friend_bottom {
				height: 200rpx;
				position: relative;

				>view {
					width: 100%;
					position: absolute;
					bottom: 0;
				}
			}

			.gardener {
				@include backImg;
			}
		}

		.mineCave_level_box {
			font-size: 24rpx;
			padding: 0 20rpx;
			color: #82888A;
			height: 40rpx;
			margin-top: 20rpx;

			.day_icome {
				image {
					height: 24rpx;
				}
			}
		}

		.team {
			padding: 20rpx 32rpx;

			.teamUp {
				width: 100%;
				height: 124rpx;
				padding: 0 20rpx;
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

		.efficiency {
			gap: 8rpx;
			padding-left: 24rpx;

			image {
				width: 24rpx;
				height: 24rpx;
			}

			.countPerson {
				font-size: 20rpx;
				font-weight: 400;
				color: #FFFFFF;
			}

			font-size: 24rpx;
			font-weight: 400;
			color: #dedede;
		}

		.num {
			font-size: 24rpx;
			font-weight: 400;
			color: #fff;
			position: relative;
			z-index: 10;
			gap: 5rpx;
		}

		.field_name {
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
			align-self: flex-end;
		}
	}

	.field {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 360rpx;
		padding: 32rpx 32rpx 32rpx 8rpx;
		border-radius: 12rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 24rpx;
		background: var(--field-bg);
		@include backImg;

		.mineCave_level_box {
			font-size: 24rpx;
			padding: 0 20rpx;
			color: #82888A;
			position: absolute;
			bottom: 0;

			.day_icome {
				image {
					height: 24rpx;
				}
			}
		}

		.efficiency {
			gap: 8rpx;
			padding-left: 24rpx;

			image {
				width: 24rpx;
				height: 24rpx;
			}

			.countPerson {
				font-size: 20rpx;
				font-weight: 400;
				color: #FFFFFF;
			}

			font-size: 24rpx;
			font-weight: 400;
			color: #dedede;
		}

		.num {
			font-size: 24rpx;
			font-weight: 400;
			color: #fff;
			position: relative;
			z-index: 10;
			gap: 5rpx;
		}

		.field_name {
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
			align-self: flex-end;
		}
	}
</style>