<template>
	<view class="basic_wrap">
		<view class="list">
			<section v-for="item in msg_list" :key="item.id">
				<view class="content notice flex-between" @click="msgClick(item)">
					<view class="imgBox pr">
						<image style="width:100rpx;" mode="widthFix" :src="item.icon_url">
						</image>
					</view>
					<view class="textBox flex-colum-between">
						<view class="text1 flex-between">
							<p class="pr">{{ $t(findRecordResponseKey(item.name)) }}
								<u-badge type="error" absolute :offset='[0,-20]' :value="item.unread_num"></u-badge>
							</p>
							<p>{{item.cat_child_last_info.publish_time &&item.cat_child_last_info.publish_time.substr(0,10) || ''}}
							</p>
						</view>
						<view class="text2 flex-start ">
							{{item.cat_child_last_info.title}}
						</view>
					</view>
				</view>
			</section>
		</view>
	</view>
</template>

<script>
	import localeData from '@/locale/zh-CN.json'
	export default {
		data() {
			return {
				msg_list: []
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('msgCenter.msgCenter')
			})
			this.getCateList()
		},
		methods: {
			findRecordResponseKey(value) {
				for (const key in localeData.msgCenter) {
					if (localeData.msgCenter[key] === value) {
						return 'msgCenter' + '.' + key;
					}
				}
				return null; // 如果没有找到匹配的项，则返回null或者其他自定义的默认值
			},
			msgClick(item) {
				if (item.name === '平台公告') {
					this.topage('general/userinfo/announcement?id=' + item.id)
				} else if (item.name === '运营活动') {
					this.topage('general/userinfo/activities?id=' + item.id)
				} else {
					this.topage('general/userinfo/player_msg')
				}
			},
			async getCateList() {
				let res = await uni.ajax.public_adgetCateList()
				if (res.data.length > 0) {
					this.msg_list = res.data
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.basic_wrap {
		padding-top: 30rpx;

		.list {
			height: calc(100vh - 30rpx - 44px - env(safe-area-inset-top));
			background: #fff;


			section {
				width: 100%;
				height: 160rpx;
				padding: 0 20rpx 0 20rpx;

				.content {
					width: 100%;
					height: 100%;

					.imgBox {
						width: 100rpx;
						height: 100rpx;
					}

					.textBox {
						flex: 1;
						height: 100rpx;
						padding-left: 20rpx;

						.text1 {
							P:nth-child(1) {
								color: #333333;
								font-weight: bold;
								font-size: 34rpx;
							}

							P:nth-child(2) {
								color: #666666;
								font-size: 26rpx;
							}
						}

						.text2 {
							color: #666666;
							font-size: 28rpx;
						}
					}
				}

				.notice {
					border-bottom: 2rpx solid #F1F1F1;
				}
			}
		}
	}
</style>