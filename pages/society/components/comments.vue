<template>
	<view class="comments" :class="{'comments_active':type==2}">
		<view class="comments_list flex-between" :class="{'comments_list_end':index==list.length-1}"
			v-for="(item,index) in list" :key="index">
			<image :src="item.user.headimg?item.user.headimg:'/static/else/avatar.png'" class="avatar" mode=""></image>
			<view class="info flex-colum-start">
				<view class="flex-start">
					<text class="user_name">{{item.user.nickname}}</text>
					<view class="flex-start tag"  v-for="(k,i) in item.user.Labels" :key="i">
						{{k.name}}
					</view>
					<text class="autor_name" v-if="uuid==item.uuid">作者</text>
					<view v-if="item.title!='回复'" class="flex-start" style="margin: 0rpx 6rpx;">
						<u-icon name="play-right-fill" color="#c0c4cc" size="15" style="margin-top: -6rpx;"></u-icon>
						<text class="user_name" >{{item.title}}</text>
					</view>
				</view>
				<text class="desc">
					{{item.desc}}
				</text>
				<view class="time_box flex-start">
					<text class="time">{{item.add_time}}</text>
					<view class="replay_box flex-start" @tap="reply(item,index)" >
						<text class="replay">回复</text>
					</view>
					<text class="time " @tap="delete_modal(item,index)" v-if="user_info.id==item.uuid">删除</text>
				</view>
				<comments ref="comments" :type="2" @delet_info="detlet_more" :index="index" :list="item.list" :uuid="uuid" :result="4" @reply="reply"></comments>
			</view>
		</view>

		<u-modal :show="modal_show" title="提示" :show-title="false" @cancel="cancel" cancel-text="取消"
			:show-confirm-button="true" :show-cancel-button="true" cancel-color="#999999" confirm-color="#FF3300"
			@confirm="delet_info()">
			<view class="slot-content"><text class="t">确定删除该条评论</text></view>
		</u-modal>

		<iloading :result="result" v-if="type==1"></iloading>

	</view>
</template>

<script>

	export default {
		name: "comments",
		data() {
			return {
				show_more: 1,
				obj: {},
				delect_index: 0,
				modal_show: false
				
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		props: {
			index:{
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			result: {
				type: Number,
				default: 1
			},
			type: {
				type: Number,
				default: 1
			},
			uuid: {
				type: Number,
				default: 0
			}
			
		},

		methods: {
			delete_modal(item, index) {
				this.obj = item;
				this.delect_index = index;
				this.modal_show = true;
			},
			cancel() {
				this.modal_show = false;
			},
			detlet_more(query) {
				this.delet_info(query.obj, query.index)
			},
			delet_info(item,index) {
				let son_index=null;
				if (item) {
					this.obj = item;
					son_index = item.sindex;
					this.delect_index=index;
				}
				this.$emit("delet_info", {
					type: 2,
					id: this.obj.id,
					index: this.delect_index,
					son_index:son_index
				})
				this.cancel();
			},
			reply(item, index) {
				if(this.type==2){				
					index=this.index;
				}
				this.$emit("reply", {
					obj: item,
					index: index
				})
			},
			reply_grandson(option) {
				this.$emit("reply", {
					obj: option.obj,
					index: option.index,
					pid: option.pid
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comments {
		.more {
			color: #5555ff;
			font-size: 26rpx;
		}

		.comments_list {
			margin-bottom: 24rpx;
			padding-top: 32rpx;
			border-top: 2rpx solid rgba(240, 240, 240, 0.9412);
			align-items: flex-start !important;

			.avatar {
				width: 88rpx;
				height: 88rpx;
				margin-right: 15rpx;
				background-color: #E6E6E6;
				border-radius: 100%;
			}

			.info {
				flex: 1;

				.time_box {
					margin-top: 20rpx;

					.time {
						font-size: 22rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.replay_box {

						height: 40rpx;
						margin: 0rpx 24rpx;

						.replay {
							font-size: 22rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}
				}

				.user_name {
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000000;
					margin-bottom: 8rpx;
				}
				
				.tag{
					margin-left: 10rpx;
					padding: 0rpx 8rpx;
					background-color: #55aaff;
					border-radius: 4rpx;
					font-size: 24rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #fff;
					margin-bottom: 8rpx;
				}

				.autor_name {
					margin-left: 10rpx;
					padding: 0rpx 8rpx;
					background-color: #FFBA34;
					border-radius: 4rpx;
					font-size: 24rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #000000;
					margin-bottom: 8rpx;
				}

				.desc {
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					/* #ifndef APP-NVUE */
					display: inline-block;
					text-align: justify;
					/* #endif */

				}
			}
		}

		.comments_list_end {
			border-bottom: 0rpx;
			margin-bottom: 0rpx;
		}
	}

	.comments_active {
		width: 100%;
		.comments_list {		
			width: 100%;
			margin-top: 24rpx;
			padding-top: 16rpx;
			border-bottom: 0rpx;
			.avatar {
				width: 66rpx;
				height: 66rpx;
			}

			.info {
				.user_name,
				.desc {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
