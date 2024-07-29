<!-- 成员名单 -->
<template>
	<view class="member_list" :style="{height:height+'px'}">
		<view class="header">成员（{{total}}/{{guild_person}}）</view>
		<view class="member_list_content">
			<scroll-view class="scroll" scroll-y @scrolltolower="scrolltolower">

				<u-swipe-action>
					<u-swipe-action-item style="height: 108rpx;margin-bottom: 20rpx;" :options="options" :name="item.id"
						v-for="item,index in dataList" :key="item.id" :disabled="guild_id == item.user.id"
						@click="remove">
						<view :class="[guild_id == item.user.id ? 'president' : '','member_list_item']">
							<view class="flex-start">
								<u-avatar :src="item.user.show_src" size="80rpx"></u-avatar>
								<view class="member_info">
									<view class="flex-center">
										<text class="member_name">{{item.user.mobile | cut_out}}</text>
										<image v-if="guild_id == item.user.id" class="president_icon"
											src="/static/Continent/i25.png" mode=""></image>
									</view>
									<view class="member_id">ID:{{item.user.id}}</view>
								</view>
							</view>
							<view v-if="guild_id == item.user.id" class="warehouse"
								@click="topage(`gather/association/warehouse/warehouse?guild_id=${id}`)">
								公会仓库
							</view>
							<view v-else class="accumulative_total">
								<text>累积获得</text>
								<image src="/static/Continent/i9.png" mode=""></image>
								<text>{{Math.round(item.user.p_list_sum)}}</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>

				<iloading :result="result"></iloading>
			</scroll-view>
		</view>

		<u-modal :show="delPopup" title="提示" show-cancel-button @cancel="delPopup = false" @confirm="deleteGuildMember">
			<view>
				是否移除该用户？
			</view>
		</u-modal>

	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: [Number, String],
				default: 0
			},
			guild_id: {
				type: [String, Number],
				default: 0
			},
			id: {
				type: [String, Number],
				default: 0
			},
			guild_person: {
				type: [Number, String],
				default: 0
			},
		},
		data() {
			return {
				dataList: [],
				page: 1,
				result: 1,
				total: 0,
				ids: 0,
				options: [{
					text: '移除'
				}],
				del_id: 0,
				delPopup: false
			}
		},

		methods: {
			async groupMemberList() {
				let res = await uni.ajax.shop_groupMemberList({
					page: this.page,
					limit: uni.conf.limit
				})
				if (res) {
					this.total = res.data.count;
					this.dataList = this.dataList.concat(res.data.list);
					this.result = uni.utils.loading_result(this.page, res.data.list);
				}
			},
			scrolltolower() {
				if (this.result == 4) {
					this.page = this.page + 1;
					this.groupMemberList()
				}
			},
			remove(e) {
				console.log(e)
				this.del_id = e.name;
				this.delPopup = true

			},
			async deleteGuildMember() {
				let result = await uni.ajax.shop_deleteGuildMember({
					id: this.del_id
				});
				if (result) {
					console.log(result)

					this.dataList = this.dataList.filter(val => {
						return val.id != this.del_id
					})

					this.total -= 1
					this.delPopup = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.member_list {
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding-bottom: calc(constant(safe-area-inset-bottom) + 24rpx);
		padding-bottom: calc(env(safe-area-inset-bottom) + 24rpx);

		.header {
			background: #69A0B7;
			box-shadow: inset 0px -1px 2px 0px rgba(255, 255, 255, 0.72);
			height: 84rpx;
			box-sizing: border-box;
			// background: url('/static/association/header.png') no-repeat;
			background-size: 100% 100%;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 66rpx;
			display: flex;
			// align-items: center;
			justify-content: center;

		}

		.member_list_content {
			height: calc(100% - 84rpx);
			padding: 24rpx 32rpx 0;
			box-sizing: border-box;

			.scroll {
				height: 100%;

				.member_list_item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 108rpx;
					background-color: #4E80C9;
					border-radius: 8rpx;
					padding: 0 32rpx;

					// margin-bottom: 20rpx;
					.member_info {
						padding-left: 18rpx;
						display: flex;
						flex-direction: column;
						height: 80rpx;
						justify-content: space-around;

						.member_name,
						.member_id {
							font-size: 24rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							margin-right: 30rpx;
						}

						.president_icon {
							width: 84rpx;
							height: 36rpx;
						}

					}

					.accumulative_total {
						display: flex;
						align-items: center;

						>text {
							font-size: 24rpx;
							font-family: DIN-Medium, DIN;
							font-weight: 500;
							color: #FFFFFF;
						}

						>image {
							width: 48rpx;
							height: 48rpx;
						}
					}

					.warehouse {
						font-size: 24rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						border-radius: 100px;
						border: 2rpx solid #FFFFFF;
						padding: 6rpx 24rpx;
					}
				}

				.president {
					// background: var(--linear-gradient-theme);
					background: linear-gradient(148deg, #69954D 2%, #AADC8B 100%);
				}
			}
		}
	}
</style>