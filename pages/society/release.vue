<template>
	<view class="release" :style="bg_style">
		<view class="header " id="header">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<view class="navbar flex-between">
				<u-icon name="arrow-left" :bold="true" color="#000" size="25" @tap="toback"></u-icon>
				<view class="btn-box flex-center" @tap="community_push">
					发布
				</view>
			</view>
		</view>

		<view class="form">
			<!--  -->
			<view class="i_input flex-start" style="height: auto;margin-top: 24rpx;">
				<u--textarea confirmType="换行" count v-model="form.desc" border="none" maxlength="500"
					placeholder="分享有价值的内容，吸引更多人看哦~"></u--textarea>
			</view>
			<view class="vote-box" v-if="form.type==3&&form.text.length>0">
				<view class="vote-title flex-between">
					<text class="t1">投票</text>
					<view class="flex-end">
						<text class="t2" @tap="topage('society/vote?type=edit')">编辑</text>
						<text class="t3" @tap="delete_vote">删除</text>
					</view>
				</view>
				<view class="vote-item flex-start" v-for="(item,index) in form.text" :key="index">
					{{item.title}}
				</view>
				
			</view>
			<view class="i_input" style="margin: 40rpx 0rpx 60rpx 0rpx">
				<u-upload   :fileList="fileList1"
					@afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="maxCount"></u-upload>
			</view>
			<view class="list flex-between"  @tap="show=true" style="border-top: 1rpx solid #E6E6E6;height: 88rpx;">
				<view class="flex-start">
					<image src="/static/community/i9.png" class="icon" mode=""></image>
					<text class="t1">动态分类</text>
				</view>
				<view class="flex-end">
					<text class="t2">{{list[form.type-1].name}}</text>
					<u-icon name="arrow-right" size="20" color="#000"></u-icon>
				</view>
			</view>
			<view class="list  flex-between" v-if="form.type==2" @tap="topage('gather/collect/correlation?type=1')">
				<view class="flex-start">
					<image src="/static/community/i10.png" class="icon" mode=""></image>
					<text class="t1">关联卡牌</text>
				</view>
				<view class="flex-end">
					<text class="t2">{{goods_name?goods_name:'关联你拥有的卡牌'}}</text>
					<u-icon name="arrow-right" size="20" color="#000"></u-icon>
				</view>
			</view>

			<view class="list  flex-between" v-if="form.type==3" @tap="topage('society/vote')">
				<view class="flex-start">
					<image src="/static/community/i11.png" class="icon" mode=""></image>
					<text class="t1">创建投票</text>
				</view>
				<view class="flex-end">
					<text class="t2">去编辑</text>
					<u-icon name="arrow-right" size="20" color="#000"></u-icon>
				</view>
			</view>
		</view>

		<u-action-sheet :actions="list" @select="selectClick" cancelText="取消" @close="show=false" title="动态分类"
			:show="show"></u-action-sheet>

	</view>
</template>

<script>
	import {
		uploadimg
	} from "@/common/mixins/index.js";
	export default {
		mixins: [uploadimg],
		data() {
			return {
				show: false,
				list: [{
						name: '动态',
						type: 1,
					},
					{
						name: '卡牌',
						type: 2
					},
					{
						name: '投票',
						type: 3
					},
					{
						name: '建议',
						type: 4
					},
				],
				bg_style: {},
				form: {
					desc: "",
					pid: 0,
					title: "",
					files: "",
					type: 1,
					huifu_id: "",
					text: [],
					time:"",
					goods_id:""
				},
				goods_name:"",
				fileList1: [],
				maxCount: 9,
				value: false, //我的建议
			}
		},
		mounted() {
			this.setnavbar();
		},
		onShow() {
			this.get_voteData();
			this.get_correlation_data();
		},
		methods: {
			get_correlation_data(){
				let info=uni.getStorageSync("correlation_data");
				if (this.form.type == 2&&info) {
					this.form.goods_id=info.id;
					this.goods_name=info.title;
				}
			},
			get_voteData() {
				let info=uni.getStorageSync("vote_data");
				if (this.form.type == 3&&info) {
					this.form.text =info.list;
					this.form.time = info.time;
				}
			},
			delete_vote(){
				this.form.text=[];
				this.form.time="";
				uni.removeStorageSync("vote_data");
			},
			selectClick(index) {
				this.form.type = index.type;
				switch (index.type) {
					case 1:
						break;
					case 2:
					this.get_correlation_data();
						break;
					case 3:
					   this.get_voteData();
						break
					case 4:
						break;
					default:
						break;
				}
				this.show = false;
			},
			async community_push() {
				await uni.utils.is_null(this.form.desc, "请输入内容");
				var arr = [];
				this.fileList1.forEach((item, index) => {
					arr.push(item.id)
				})
				this.form.files = arr.join();
				if(this.form.type==3){
					if(this.form.text.length<=0){
						uni.showToast({
							title:"请先创建投票",
							icon:"none"
						})
						return false;
					}
					
				}
				let res = await uni.ajax.community_push(this.form);
				if (res) {
					uni.setStorageSync('new_Topic', true);
					uni.showToast({
						title: "操作成功，等待平台审核。",
						icon: "none"
					})
					await uni.utils.sleep(500);
					this.toback();
				}
			},
			async setnavbar() {
				let header = await uni.utils.info_distance("header");
				this.bg_style = {
					'padding-top': header.height + "px",
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.release {
		.header {
			background-color: #fff;
			padding: 0rpx 24rpx;
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			left: 0rpx;
			top: 0rpx;
			z-index: 10;

			.navbar {
				height: 88rpx;

				.btn-box {
					width: 148rpx;
					height: 60rpx;
					background: url('@/static/else/old01.png') no-repeat 100%;
					border-radius: 36rpx;
					color: #fff;
				}
			}
		}

		.form {
			padding: 24rpx 32rpx;

			.vote-box {
				background: #F5F5F5;
				border-radius: 24rpx;
				padding: 32rpx;

				.vote-item {
					padding: 0rpx 24rpx;
					background-color: #fff;
					height: 88rpx;
					border-radius: 24rpx;
					font-size: 28rpx;
					margin-top: 24rpx;
				}

				.vote-title {
					.t1 {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
					}

					.t2 {
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
					}

					.t3 {
						padding-left: 30rpx;
						font-size: 28rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #FE3333;
					}
				}
			}

			.list {
				margin-bottom: 32rpx;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 8rpx;
				}

				.t1 {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 28rpx;
				}

				.t2 {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}

			.u-textarea {
				padding: 0rpx;
			}
		}
	}
</style>