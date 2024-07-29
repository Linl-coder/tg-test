<template>
	<view class="deatils" :style="bg_style">
		<view class="" v-if="loading==4">
			<!-- <view class="swiper" v-if="swiper_list.length>0"><iswiper :list="swiper_list" :height="screen_h" :radius="0"></iswiper></view> -->
			<view class="user_info flex-between">
				<image @click.stop="topage('gather/collect/author?author_id='+info.user.id)"
					:src="info.user.headimg?info.user.headimg:'/static/else/avatar.png'" class="avatar" mode=""></image>
				<view class="info flex-colum-start">
					<text class="name">{{info.user.nickname}}</text>
					<!-- <text class="desc">拥有4641卡牌</text> -->
				</view>
				<view class="time flex-end">
					{{info.add_time}}
				</view>
			</view>

			<div class="title_box" v-if="info.type==4">
				<text class="title">【建议】</text>
			</div>
			<div class="title_box" v-if="info.type==3">
				<text class="title">【投票】</text>
			</div>
			<div class="title_box" v-if="info.type==2">
				<text class="title">【卡牌】</text>
			</div>
			<view class="desc_box ">
				<u-read-more :toggle="true" ref="uReadMore" showHeight="600">
					<rich-text :nodes="info.desc" @load="load"></rich-text>
				</u-read-more>
			</view>


			<view class="img_box flex-start" v-if="swiper_list.length>0">
				<view class="icon-box flex-center" v-for="(k,i) in swiper_list" :key="i"
					@click.stop="pre_img(swiper_list,i)">
					<u--image :showLoading="true" radius="8rpx" :src="k.image" width="220rpx"
						height="220rpx"></u--image>
				</view>
			</view>



			<view class="conmmont_box flex-between">
				<view class="conmmont_box_info flex-around">
					<view class="icon_box flex-center" @click.stop="community_zan()">
						<image v-if="info.isZan==1" src="/static/community/i1_.png" class="icon" :lazy-load="true">
						</image>
						<image v-else src="/static/community/i1.png" class="icon" :lazy-load="true"></image>
						<text class="t1">{{info.zan_num_count}}</text>
					</view>
					<view class="icon_box flex-center">
						<image src="/static/community/i2.png" class="icon" :lazy-load="true"></image>
						<text class="t1">{{info.ping}}</text>
					</view>
				</view>
			</view>

			<view class="comments_box">
				<comments ref="comments" :list="CommentList" :uuid="info.uuid" :result="CommentList_result"
					@reply="reply"></comments>
			</view>

			<view class="message_input flex-between" id="message_input">
				<message_input @addComment="addComment" ref="message_input"></message_input>
			</view>

		</view>
		<iloading :result="loading"></iloading>
		<sharepopup ref="sharepopup"></sharepopup>
	</view>
</template>

<script>
	import sharepopup from "@/components/sharepopup.vue";
	import comments from './components/comments.vue';
	import message_input from './components/message_input.vue';
	import iswiper from '@/components/pswiper.vue';
	export default {
		components: {
			iswiper,
			message_input,
			comments,
			sharepopup
		},
		data() {
			return {
				id: "",
				info: {},
				loading: 1,
				swiper_list: [],
				Comment: {
					desc: '',
					pid: '',
					title: '回复',
					huifu_id: ''
				},
				page: 1,
				reply_index: -1,
				CommentList: [],
				bg_style: {},
				CommentList_result: 1,
				screen_h: "",
				type: ""
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.type = query.type;
			this.community_getDetail();
			this.getReply();
		},
		onNavigationBarButtonTap() {
			this.openShare();
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			},
			is_login() {
				return this.$store.getters.is_login;
			}
		},
		methods: {
			pre_img(arr, index) {
				let new_arr = [];
				arr.forEach(item => {
					new_arr.push(item.image);
				})
				uni.previewImage({
					urls: new_arr,
					current: index,
					indicator: "default",
					longPressActions: {
						itemList: [],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});

			},
			async setnavbar() {
				let system = await uni.pro.getSystemInfo();
				let header = await uni.utils.info_distance('header');
				let message_input = await uni.utils.info_distance('message_input');
				this.bg_style = {
					'padding-bottom': message_input.height + 10 + 'px'
				};
				this.screen_h = system.windowWidth.toString();
			},
			reply(e) {
				console.log(e)
				this.$refs.message_input.focus();
				if (e.index == undefined) {
					//二级回复
					this.Comment.pid = e.obj.obj.pid;
					this.Comment.huifu_id = e.obj.obj.pid;
					this.Comment.title = e.obj.obj.user.nickname;
					this.reply_index = e.obj.index;

				} else {
					this.reply_index = e.index;
					this.Comment.pid = e.obj.id;
				}

			},
			async addComment(content) {
				//添加评论
				this.Comment.desc = content;
				await uni.utils.is_null(this.Comment.desc, '请输入评论内容');
				if (this.reply_index == -1) {
					this.Comment.pid = this.id;
					// this.Comment.huifu_id = this.id;	
				}
				let res = await uni.ajax.community_push(this.Comment);

				if (res) {
					this.$refs.message_input.clear_data();
					let obj = {
						desc: content,
						add_time: uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss'),
						pid: this.Comment.pid,
						user: {
							headimg: this.user_info.avatar,
							nickname: this.user_info.nickname,
							id: this.user_info.id
						},
						uuid: this.user_info.id,
						// ip_address:res.address,
						// id:res.id,
						title: this.Comment.title,
						list: []
					};
					if (this.reply_index == -1) {
						this.CommentList.unshift(obj);
					} else {
						if (this.Comment.huifu_id != '') {
							this.CommentList[this.reply_index].list.unshift(obj);
						} else {
							this.CommentList[this.reply_index].list.unshift(obj);
						}
					}

					this.Comment.huifu_id = '';

					if (this.CommentList.length > 0) {
						this.CommentList_result = 2;
					}
				}
			},
			async getReply() {
				//评论列表
				let res = await uni.ajax.community_getReply({
					id: this.id,
					page: this.page,
					limit: uni.conf.limit
				});
				this.total = res.total;
				this.CommentList = this.CommentList.concat(res.data.list);
				this.CommentList_result = uni.utils.loading_result(this.page, res.data.list);
			},
			openShare() {
				this.$refs.sharepopup.open(this.info);
			},
			async community_getDetail() {
				let res = null;
				if (this.type == "share") {
					res = await uni.ajax.community_getDetailAuth({
						id: this.id
					})
				} else {
					res = await uni.ajax.community_getDetail({
						id: this.id
					})
				}

				if (res) {
					let nowtime = new Date().getTime();
					let hisTime = new Date(res.data.add_time).getTime();
					res.data.add_time = uni.utils.formdatatime(hisTime, nowtime);
					res.data.cover.forEach(item => {
						this.swiper_list.push({
							image: item.show_src
						})
					})
					this.info = res.data;
					this.loading = 4;
					this.$nextTick(() => {
						this.setnavbar();
					})
				} else {
					this.loading = 3;
				}
			},
			async community_zan() {
				let res = await uni.ajax.community_zan({
					forum_id: this.id,
					type: 1
				})
				if (res) {
					if (this.info.isZan == 1) {
						this.info.isZan = 0;
						this.info.zan_num_count = this.info.zan_num_count - 1;
					} else {
						this.info.isZan = 1;
						this.info.zan_num_count = this.info.zan_num_count + 1;
					}
				}

			},
			load() {
				this.$refs.uReadMore.init();
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.deatils {
		.img_box {
			margin-bottom: 24rpx;
			padding: 0rpx 16rpx;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;

			.icon-box {
				margin-top: 15rpx;
			}

			.icon {

				width: 216rpx;
				height: 216rpx;
				background-color: #f5f5f5;
				margin-bottom: 24rpx;
			}
		}

		.comments_box {
			padding: 0rpx 32rpx 0rpx 32rpx;

			.comments_title {
				height: 88rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				color: #000000;
			}
		}

		.message_input {
			position: fixed;
			width: 100%;
			bottom: -2rpx;
			background-color: #fff;

			.message_icon_box {
				flex: 1;

				.message_icon {
					.t1 {
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}

		.conmmont_box {
			height: 88rpx;

			.time {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}

			.conmmont_box_info {
				width: 40%;

				.icon_box {
					.t1 {
						margin-left: 6rpx;
						font-size: 24rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #999999;
					}

					.icon {
						width: 36rpx;
						height: 36rpx;
						margin-right: 8rpx;
					}
				}
			}

		}

		.desc_box {
			width: 100%;
			margin-bottom: 24rpx;
			padding: 0rpx 24rpx;
			box-sizing: border-box;

			.desc {
				width: 100%;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}

			.desc_active {
				color: #0092F5;

			}
		}

		.title_box {
			width: 100%;
			padding: 0rpx 24rpx 24rpx 24rpx;
			box-sizing: border-box;

			.title {
				font-size: 28rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #55aaff;
				line-height: 33rpx;
			}
		}

		.user_info {
			position: relative;
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;

			.avatar {
				width: 72rpx;
				height: 72rpx;
				border-radius: 100%;
				background-color: #f5f5f5;
			}

			.share {
				position: absolute;
				right: 10rpx;
			}

			.time {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				width: 200rpx;
			}

			.info {
				width: calc(100% - 272rpx);
				padding-left: 16rpx;
				box-sizing: border-box;

				.name {
					margin-bottom: 4rpx;
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #000000;
				}

				.desc {
					font-size: 22rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 26rpx;
				}

			}
		}
	}
</style>