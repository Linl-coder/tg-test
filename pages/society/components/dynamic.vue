<template>
	<view class="hot_dynamic">
		<view class="hot_dynamic_box" @tap="topage('society/deatils?id='+item.id)" v-for="(item,index) in list"
			:key="index">
			<view class="user_info flex-start" v-if="item.user">
				<image @click.stop="topage('gather/collect/author?author_id='+item.user.id)" :src="item.user.headimg?item.user.headimg:'/static/else/avatar.png'" class="avatar" mode=""></image>
				
				<view class="info flex-colum-start">
					<view class="flex-start">
						<text class="name">{{item.user.nickname}}</text>
						<view class="flex-start tag"  v-for="(k,i) in item.user.Labels" :key="i">
							<text class="t1">{{k.name}}</text>
						</view>
					</view>
					<text class="time" v-if="item.user.is_possess_num==1">拥有{{item.user.pool_num}}卡牌</text>
				</view>
				
				<view class="share-box flex-end"  @click.stop="openShare(item)">
					<u-icon name="more-dot-fill" class="share" size="28"></u-icon>
				</view>			
			</view>
			<view class="title_box" v-if="item.type==4">
				<text class="title">【建议】</text>
			</view>
			<view class="title_box" v-if="item.type==3">
				<text class="title">【投票】</text>
			</view>
			<view class="title_box" v-if="item.type==2">
				<text class="title">【卡牌】</text>
			</view>
			
			<view class="desc_box ">
				<view class="desc">{{item.desc}}</view>
			</view>
			
			
			
			<view class="img_box flex-start">
				<view class="icon-box flex-center" v-for="(k,i) in item.cover" :key="i"   @click.stop="pre_img(item.cover,i)">	
					<u--image :showLoading="true" radius="8rpx" :src="k.show_src" width="196rpx" height="196rpx"></u--image>
				</view>
			</view>
			
			<!-- 卡牌 -->
			<view class="correlation-box"  v-if="item.type==2">
				<correlation :info="item.pool">
					
				</correlation>
			</view>
			
			<!-- 投票 -->
			<view class="vote-box"  v-if="item.type==3&&item.vote.length>0">
				<vote :list="item.vote">
					
				</vote>
			</view>
			
			<view class="conmmont_box flex-between">
				<view class="time">
					{{item.add_time}}
				</view>
				<view class="conmmont_box_info flex-around">
					<view class="icon_box flex-center" @click.stop="community_zan(index)">
						<image v-if="item.isZan==1" src="/static/community/i1_.png" class="icon" :lazy-load="true"></image>
						<image v-else src="/static/community/i1.png" class="icon" :lazy-load="true"></image>
						<text class="t1">{{item.zan_num_count}}</text>
					</view>
					<view class="icon_box flex-center" >
						<image src="/static/community/i2.png" class="icon" :lazy-load="true"></image>
						<text class="t1">{{item.ping}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {community_list,clearcommunity_list} from './../list.js';
	import vote from "./vote.vue";
	import correlation from './correlation.vue';
	export default {
		components:{
			vote,
			correlation
		},
		data() {
			return {
				list:[],			
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
								苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
								无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
			}
		},
		props: {
			info: {
				type: Object,
				default () {
					return {}
				}
			},
			type: { //1推荐 2 关注 3 最新 4 动态
				type: Number,
				default: 1
			}
		},
		created() {
			this.list = community_list.slice(this.info.begin, this.info.end);		
		},
		methods: {
			openShare(item){
				this.$emit("openShare",item);
			},
			load() {
				this.$refs.uReadMore.init();
			},
			async community_zan(index){
				let res=await uni.ajax.community_zan({
					forum_id:this.list[index].id,
					type:1
				})	
				if(res){
					let info=this.list[index];
					if(info.isZan==1){
						info.isZan=0;
						info.zan_num_count=info.zan_num_count-1;
					}else{
						info.isZan=1;
						info.zan_num_count=info.zan_num_count+1;
					}
				}
			},
			pre_img(arr, index) {
				let new_arr = [];
				arr.forEach(item => {
					new_arr.push(item.show_src);
				})
				uni.previewImage({
					urls: new_arr,
					current:index,
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
		}
	}
</script>

<style lang="scss" scoped>
	.hot_dynamic {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.hot_dynamic_box {
			position: relative;
			margin-bottom: 24rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 32rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 24rpx;
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			
			.vote-box{
				
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
					width: 60%;

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

			.img_box {
				margin-top: 24rpx;
				display: grid;
				grid-template-columns:1fr 1fr 1fr;
				.icon-box{
					margin-top: 15rpx;
					
				}
				.icon {
					width: 196rpx;
					height: 196rpx;
					background-color: #f5f5f5;
					margin-bottom: 24rpx;
				}
			}

			.desc_box {
				margin-top: 24rpx;
				.desc {
					text-indent: 2em;
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
				margin-top: 16rpx;
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

				.avatar {
					width: 72rpx;
					height: 72rpx;
					border-radius: 100%;
					overflow: hidden;
					background-color: #f5f5f5;
				}
				.share-box{
					position: absolute;
					right: 10rpx;
				}
				.info {
					width: calc(100% - 72rpx);
					padding-left: 16rpx;
					box-sizing: border-box;
					
					/deep/.u-tag--mini{
						height: auto;
						padding:6rpx 8rpx;
					}

					.name {
						margin-bottom: 4rpx;
						font-size: 28rpx;
						//font-family: font-family: PingFang SC-Semibold, PingFang SC;
						font-weight: 500;
						color: #000000;
						margin-right: 8rpx;
					}
					
					.tag{
						margin-left: 10rpx;
						padding: 0rpx 8rpx;
						background-color: #55aaff;
						border-radius: 4rpx;								
						.t1{
							font-size: 24rpx;
							//font-family: font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 500;
							color: #fff;	
						}
					}

					.time {
						font-size: 22rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 26rpx;
					}
				}
			}
		}

		
	}
</style>
