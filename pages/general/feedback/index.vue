<template>
	<div class="feedback">
		<div class="buy_desc ">
			<textarea value="" maxlength="200" v-model="desc" placeholder="请输入您的意见(200字以内)" />
		</div>
		<div class="buy_desc flex-between">
			<text class="desc_t">联系方式</text>
			<text class="desc_t">{{user_info.mobile}}</text>
		</div>
		<div class="buy_desc ">
			<div class="div" style="margin-bottom: 24rpx;">
				<text class="desc_t">上传图片(最多6张)</text>
			</div>
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
				:maxCount="6"></u-upload>
		</div>
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
					arr.push(item.id)
				})
				let res=await uni.ajax.public_push({
					files:arr.join(),
					text:this.desc
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
	.feedback{
		.form_btn{
			margin-left: 24rpx;
			margin-right: 24rpx;
			background: url('@/static/else/old01.png') no-repeat 100%;
			height: 88rpx;
			border-radius: 16rpx;
			color: #FFFFFF;
			font-size: 30rpx;
		}
		.buy_desc {
			margin: 24rpx;
			border-radius: 24rpx;
			background: #FFFFFF;
			box-shadow: 0px 4px 32px 0px rgba(0,0,0,0.08);
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
				color: #000;
			}
		
			.desc_t {
				font-size: 28rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #000;
				line-height: 36rpx;
			}
		}
	}
</style>