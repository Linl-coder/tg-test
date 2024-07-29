<template>
	<div class="message_input_ flex-between">
		<div class="box flex-start">
			<u-icon name="edit-pen" color="#c0c4cc" size="25"></u-icon>
			<u--input placeholder="说点什么..." :focus="is_focus" @confirm="addComment" confirmType="发送" style="padding-left: 4rpx;" border="0" v-model="content">
   
			</u--input>
		</div>
		<u-button type="primary" @tap="addComment" text="发送" class="custom-style"></u-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
               content:"",
			   is_focus:false
			}
		},
		methods:{
			addComment(){
				this.$emit("addComment",this.content)
			},
			clear_data(){
				this.content="";
			},
			blur() {
				this.is_focus=false;
			},
			focus(){
				this.is_focus=true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message_input_ {
		width: 100%;
		height: 120rpx;
		background: #FFFFFF;
		box-shadow: 0px -4px 32px 0px rgba(0,0,0,0.08);
		padding: 12rpx 12rpx;
		box-sizing: border-box;
		.custom-style {
			width: 126rpx;
			height: 64rpx;
			border-radius: 48rpx;
			background: #000;
		}

		.box {
			min-height: 84rpx;
			flex: 1;
			margin-right: 32rpx;
			// background: #F7F8F9;
			border-radius: 84rpx;
			padding-left: 16rpx;
		}
	}
</style>
