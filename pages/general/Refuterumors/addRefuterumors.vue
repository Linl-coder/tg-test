<template>
	<div class="addRefuterumors">
		<div class="buy_desc ">
			<view class="flex-start desc-box">
				<text class="t1">*</text>
				<text class="desc_t">我的疑问</text>
			</view>
			<u--input placeholder="请输入疑问" border="none" v-model="title"></u--input>
		</div>

		<div class="buy_desc ">
			<view class="flex-start desc-box">
				<text class="t1">*</text>
				<text class="desc_t">问题描述</text>
			</view>
			<textarea value="" maxlength="200" v-model="desc" placeholder="请输入您的意见(200字以内)" />
		</div>
		
		<div class="buy_desc ">
			<view class="flex-start desc-box">
				<text class="t1">*</text>
				<text class="desc_t">图片说明</text>
			</view>
			
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
				:maxCount="6"></u-upload>
		</div>
		
		<!-- <div class="buy_desc ">
			<view class="flex-start desc-box">
				<text class="desc_t">反馈须知</text>
			</view>
			<view class="flex-start desc-box">
				<text class="desc_">这是一段反馈须知这是一段反馈须知这是一段反馈须知这是一段反馈须知这是一段反馈须知</text>
			</view>			
		</div> -->
		
		<div class="form_btn flex-center" @tap="save">
			<text class="t">提交</text>
		</div>
	</div>
</template>

<script>
	import {uploadimg} from "@/common/mixins/index.js";
	export default{
		mixins:[uploadimg],
		data(){
			return{
				desc:"",
				fileList1: [],
				title:""
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onNavigationBarButtonTap() {
		   this.topage('general/feedback/feedback_list')	
		},
		methods:{
			async save(){
				await uni.utils.is_null(this.desc,"请输入您的意见");
				var arr=[];
				this.fileList1.forEach((item,index)=>{
					console.log(item)
					arr.push(item.url)
				})
				let res=await uni.ajax.rumorAdd({
					files:arr,
					title:this.title,
					content:this.desc,
				})
				if(res){
					uni.showToast({
						title:"操作成功",
						icon:"none"
					})
					await uni.utils.sleep(500);
					this.toback();
				}
			},
			
		}
	}
</script>

<style lang="scss">

	.addRefuterumors{
		.form_btn{
			margin-left: 24rpx;
			margin-right: 24rpx;
			background: linear-gradient(90deg, #FF9688, #F56A58);
			height: 88rpx;
			border-radius: 16rpx;
			color: #FFFFFF;
			font-size: 30rpx;
		}
		.buy_desc {
			margin: 24rpx;
			border-radius: 8rpx;
			background: #FFFFFF;
			// box-shadow: 0px 4px 32px 0px rgba(0,0,0,0.08);
			padding: 24rpx;
		
			.buy_title {
				margin-bottom: 30rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: bold;
				color: #000;
				line-height: 33rpx;
			}
			.uni-textarea-placeholder,textarea{
				color: #999;
				font-size: 28rpx;
			}
			
			.desc-box{
				margin-bottom: 16rpx;
				.t1{
					color: red;
					margin-right: 8rpx;
					font-weight: bold;
				}
				.desc_t {
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000;
					
				}
				.desc_{
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;			
					color: #000;	
				}
			}
		
			
		}
	}
</style>