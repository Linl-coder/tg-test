<template>
	<view class="my_association">
		<u-navbar bgColor="#F4F4F4" leftIcon="arrow-leftward" autoBack :is-back="true" title="我的工会" placeholder>
			<view class="u-nav-slot" slot="left">

			</view>
			<view slot="right" class="rule">
				<u-icon name="plus-circle" width="40rpx" height="40rpx" label="创建工会" label-size="28rpx"
					label-color="#222" space="10rpx" @click="topage('gather/association/create/create')"></u-icon>
			</view>
		</u-navbar>

		<view class="header">
			<view class="association_info"
				:class="[JSON.stringify(guildInfo) == '{}' || !guildInfo ? 'flex-center' : '']">
				<block v-if="JSON.stringify(guildInfo) == '{}' || !guildInfo">
					<view class="without">当前暂无公会</view>
				</block>
				<block v-else>
					<view class="info">
						<view class="flex-start">
							<u-avatar :src="guildInfo.guild_image" size="84rpx"></u-avatar>
							<view class="president_info">
								<view class="flex-start">
									<text class="name">{{guildInfo.guild_name}}</text>
									<!-- <u-icon name="/static/Continent/i25.png" width="84rpx" height="36rpx"></u-icon> -->
								</view>
								<view class="flex-start promotion_info">
									<text style="margin-right: 10rpx;">ID: {{guildInfo.id}}</text>
									<text>推广码: {{user_info.user_code}}</text>
									<u-icon name="/static/Continent/i27.png" width="36rpx" height="36rpx"></u-icon>
								</view>
							</view>
						</view>
						<view class="edit">
							<u-icon name="/static/Continent/i26.png" width="36rpx" height="36rpx" label="编辑"
								labelSize="24rpx" labelColor="#fff" labelPos="left" @click="edit"></u-icon>
						</view>
					</view>

					<view class="association_grade" @click="upgradeGuildPopup = true">
						<view class="grade flex-start">
							<text>{{number[guildInfo.level] }}级公会</text>
							<u-icon name="play-left-fill" size="16rpx" color="rgba(255,255,255,0.41)"></u-icon>
						</view>
						<view class="addition">
							公会加速:{{guildInfo.level == 1 ? 0 : guildInfo.level}}%
						</view>
					</view>
					<view class="brief_introduction u-line-2">
						公会简介：{{guildInfo.guild_mark}}
					</view>
				</block>
			</view>
		</view>
		<view class="content">
			<view class="tabs ">
				<view class="tabs_item ranking_list " :class="{'active':current=='ranking_list'}"
					@click="currentChange('ranking_list')">公会排行</view>
				<view class="tabs_item member_list" :class="{'active':current=='member_list'}"
					@click="currentChange('member_list')">成员名单</view>
			</view>

			<!-- 公会排行 -->
			<ranking_list v-if="current=='ranking_list'" :height="height"></ranking_list>
			<!-- 成员名单 -->
			<member_list ref="member_list" v-if="current=='member_list'" :id="guildInfo.id"
				:guild_id="guildInfo.uuid || '0'" :guild_person="guildInfo.guild_person" :height="height"></member_list>
		</view>

		<!-- 升级弹框 -->
		<u-modal :show="upgradeGuildPopup" title="升级" show-cancel-button @cancel="upgradeGuildPopup = false"
			@confirm="upgradeGuild">
			<view>
				是否升级公会？
			</view>
		</u-modal>

	</view>
</template>

<script>
	import ranking_list from '../components/ranking_list.vue'
	import member_list from '../components/member_list.vue'
	export default {
		components: {
			ranking_list,
			member_list
		},
		data() {
			return {
				number: ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
				upgradeGuildPopup: false,
				current: 'ranking_list',
				height: 0,
				guildInfo: {}
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
		},
		onLoad() {
			this.get_guildInfo()
		},
		async onReady() {

			let system = uni.getSystemInfoSync();

			let header = await this.$u.getRect('.header')
			let tabs = await this.$u.getRect('.tabs');
			this.height = system.windowHeight - header.height - tabs.height;
		},
		methods: {
			currentChange(e) {
				if (e == this.current) return
				this.current = e
				this.$nextTick(() => {
					if (e == 'member_list') {
						this.$refs.member_list.groupMemberList(this.guildInfo.id)
					}
				})
			},
			async get_guildInfo() {
				let res = await uni.ajax.shop_getInfo()
				if (res) {

					this.guildInfo = res.data;
				}
			},
			edit() {
				uni.navigateTo({
					url: `/pages/gather/association/create/create?type=2&guildInfo=${JSON.stringify(this.guildInfo)}`,
					events: {
						edit: res => {
							this.get_guildInfo()
						}
					}
				})
			},
			async upgradeGuild() {
				let result = await uni.ajax.shop_upgradeGuild({
					guild_id: this.guildInfo.id,
					level: this.guildInfo.level * 1 + 1
				})
				if (result) {
					this.upgradeGuildPopup = false
					this.get_guildInfo()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F4F4F4;
	}

	.my_association {
		.header {
			border-radius: 0rpx 0rpx 32rpx 32rpx;
			background: #F4F4F4;
			padding: 24rpx 32rpx;

			.association_info {
				padding: 32rpx;
				box-sizing: border-box;
				// background: url('/static/Continent/i32.png') no-repeat;
				background-size: cover;
				width: 686rpx;
				height: 308rpx;
				background-color: rgba(0, 0, 0, .6);
				border-radius: 12rpx;

				.without {
					font-size: 32rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
				}

				.info {
					display: flex;
					justify-content: space-between;
					margin-bottom: 8rpx;

					.president_info {
						padding-left: 10rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;

						.name {
							font-size: 32rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
						}

						.promotion_info {
							font-size: 24rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(255, 255, 255, 0.6);
						}
					}
				}

				.association_grade {
					display: flex;
					align-items: center;
					margin-bottom: 30rpx;

					.grade {
						background: var(--theme);
						padding: 2rpx 6rpx;
						border-radius: 0 50px 50px 0;
						font-size: 20rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 36rpx;
						margin-right: 24rpx;

						>text {
							margin-right: 6rpx;
						}
					}

					.addition {
						font-size: 20rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
				}

				.brief_introduction {
					font-size: 24rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 36rpx;
				}
			}
		}

		.content {
			background: #F4F4F4;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
		}

		.tabs {
			margin-top: 32rpx;
			display: flex;

			.tabs_item {
				width: 130rpx;
				height: 94rpx;
				margin-left: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #999999;
				// filter: brightness(50%);
			}

			.ranking_list {

				// background: url('/static/Continent/i28.png') no-repeat center / cover;
			}

			.member_list {
				// background: url('/static/Continent/i29.png') no-repeat center / cover;

			}

			.active {
				color: #000000;
				filter: brightness(100%);

			}
		}
	}
</style>