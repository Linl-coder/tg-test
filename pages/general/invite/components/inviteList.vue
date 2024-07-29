<template>
	<view class="invite-list">
		<view class="title flex-center">
			<text class="t1">邀请记录</text>
			<text class="t2">(已邀请{{count}}人)</text>
		</view>
		<view class="list">
			<view class="list-item flex-between">
				<view class="list-item-t flex-center">
					编号
				</view>
				<view class="list-item-t flex-center">
					用户手机号
				</view>
				<view class="list-item-t flex-center">
					邀请结果
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll"  @scrolltolower="scrolltolower">
				<view class="list-item flex-between"  v-for="(item,index) in list" :key="index">
					<view class="list-item-t flex-center">
						{{index+1}}
					</view>
					<view class="list-item-t flex-center" v-if="item.user">
						{{item.user.mobile}}
					</view>
					<view class="list-item-t flex-center" v-if="item.user">
						{{item.user.cert_id>=1?'已实名':'未实名'}}
					</view>
				</view>
				<iloading :result="loading"></iloading>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loading: 1,
				page: 1,
				count:0
			};
		},
		created() {
			this.public_getUserinvitationList();
		},
		methods: {		
			scrolltolower() {
				if (this.loading == 4) {
					this.loading = 1;
					this.page = this.page + 1;
					this.public_getUserinvitationList();
				}
			},
			async public_getUserinvitationList() {
				let res = await uni.ajax.public_getFrom({
					page: this.page,
					limit: uni.conf.limit,	
				});
				if (res) {
					this.count=res.data.count;
					this.list.push(...res.data.list);
					this.loading = uni.utils.loading_result(this.page, res.data.list);
					
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.invite-list{
		width: 100%;
		background-color: #fff;
		border-radius: 32rpx;
		.list{
			width: 100%;
			box-sizing: border-box;
			padding: 0rpx 32rpx;
			.scroll{
				max-height: 800rpx;
			}
			.list-item{
				border-top: 2rpx solid #F0F0F0;
				height: 88rpx;
				flex: 1;
				.list-item-t{
					font-size: 24rpx;
					color: #000000;
				}
			}
		}
		.title{
			height: 88rpx;
			.t1{
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000000;
			}
			.t2{
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
			}
		}
	}
</style>