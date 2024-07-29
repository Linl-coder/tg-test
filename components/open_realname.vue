<template>
	<view class="modal">
		<u-modal :show="show_modal" title="温馨提示" :showConfirmButton="false" confirmButtonShape="circle" :content="content" confirmColor="#000">
			<slot name="confirmButton">
				<view class="content">
					<view class="flex-center">{{ content }}</view>
					<view class="flex-around confirmButton-box">
						<view class="confirmButton" @tap="cancel">取消</view>
						<view class="confirmButton" @tap="confirm">前往认证</view>
					</view>				
				</view>
			</slot>
		</u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show_modal: false
		};
	},
	props: {
		content: {
			type: String,
			default: '请先实名认证'
		},
		type: {
			type: Number,
			default: 1
		}
	},
	methods: {
		open() {
			this.show_modal = true;
		},
		confirm() {
			this.topage('general/userinfo/certification');
			this.cancel();
		},
		cancel() {
			this.show_modal = false;
		}
	}
};
</script>

<style lang="scss">
.modal {
	.content{
		.confirmButton-box{
			margin-top: 46rpx;
			.confirmButton {
				width: 220rpx;
				height: 88rpx;
				background: url('@/static/else/old01.png') no-repeat 100%;
				font-size: 32rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				text-align: center;
				border-radius: 16rpx;
				line-height: 88rpx;
				margin: 0rpx 24rpx;
				box-sizing: border-box;
			}
		}
	}
	
	
}
</style>
