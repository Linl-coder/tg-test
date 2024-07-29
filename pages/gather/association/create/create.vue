<template>
	<view class="create">
		<view class="header flex-center">
			<u-avatar :src="formData.guild_image" size="156rpx" @click="chooseImage"></u-avatar>
		</view>
		<view class="info">
			<view class="name flex-between">
				<view class="label">
					公会名称
				</view>
				<u-input v-model="formData.guild_name" placeholder="请输入公会名称" border="none" input-align="right" placeholder-style="color: #333" color="#333"></u-input>
			</view>
			<view class="brief_introduction">
				<view class="label">
					公会简介
				</view>
				<u-textarea v-model="formData.guild_mark" style="background-color: #E4E4E4;border:1px solid rgba(255,255,255,0.1);margin-top: 24rpx;" confirmType="done" border="none" color="#333" placeholder="请介绍一下您的公会" height="316rpx" placeholderStyle="color:#333"></u-textarea>
			</view>
		</view>
		<view class="btn flex-center" @click="createGuild">
			{{type == 1? '确认创建' : '确认修改'}}
		</view>
	</view>
</template>

<script>
	import {uploadimg} from "@/common/mixins/index.js";
	export default {
		mixins:[uploadimg],
		data() {
			return {
				formData:{
					guild_name:'',
					guild_mark:'',
					guild_image:''
				},
				type:1,  // 1创建  2修改
				id:''
			}
		},
		computed:{
			user_info(){
				return this.$store.getters.get_user_info
			}
		},
		onLoad(option) {
			this.type = option.type;
			
			let title = null;
			switch (option.type*1){
				case 1:
				title = '创建公会';
				break;
				case 2:
				title="资料修改";
				break;
			}
			uni.setNavigationBarTitle({
				title
			})
			
			if(option.type == 2){
				
			let guildInfo = JSON.parse(option.guildInfo);
			console.log(guildInfo)
			this.id = guildInfo.id;
			this.formData.guild_name = guildInfo.guild_name
			this.formData.guild_mark = guildInfo.guild_mark
			this.formData.guild_image = guildInfo.guild_image
			}
		},
		methods: {
			chooseImage(){
				uni.chooseImage({
					count:1,
					success:async res=>{
						console.log(res.tempFilePaths[0])
						let guild_image = await this.uploadFilePromise(res.tempFilePaths[0])
						this.formData.guild_image = guild_image.src
					}
				})
			},
			async createGuild(){
				if(!this.formData.guild_image){
					return uni.$u.toast('请添加公会头像')
				}
				if(!this.formData.guild_name){
					return uni.$u.toast('请输入公会名称')
				}
				if(!this.formData.guild_mark){
					return uni.$u.toast('请输入公会简介')
				}
				let result = await uni.ajax.shop_createGuild({
					...this.formData,
					type:this.type,
					id:this.id
				});
				if(result){
					const eventChannel = this.getOpenerEventChannel();
					  eventChannel.emit('edit');
					  uni.navigateBack()
				}
				// console.log(result)
			}
		}
	}
</script>


<style lang="scss" scoped>
	.create{
		padding: 24rpx 32rpx;
		.header{
			height: 320rpx;
		}
		.info{
				.label{
					font-size: 32rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 500;
					color: #333333;
				}
			.name{
				height: 88rpx;
				border-bottom: 2rpx solid rgba(255,255,255,0.1);
				
			}
			.brief_introduction{
				margin-top: 44rpx;
				
			}
		}
		.btn{
			height: 96rpx;
			background: linear-gradient(90deg, #C7C9FF 0%, #4E80C9 100%);
			box-shadow: 0px 4rpx 0px 0px #3866A9;
			font-size: 32rpx;
			font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			border-radius: 8rpx;
			margin-top: 36rpx;
		}
		
	}
</style>
