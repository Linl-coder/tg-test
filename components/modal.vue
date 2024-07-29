<template>
	<view class="modal">
		<view class="modal-box" v-if="type == 1">
			<u-modal :show="show_modal" @confirm="confirm()" title="提示" :showConfirmButton="true" confirmText="确定"
				cancelText="取消" :showCancelButton="true" @cancel="cancel" content="">
				<view class="flex-center">
					{{content}}
				</view>
			</u-modal>
		</view>
		<!-- 自定义弹框 -->
		<view class="modal-box" v-if="type == 2">
			<u-modal :show="show_modal" title="温馨提示" :showConfirmButton="false" confirmButtonShape="circle"
				:content="content" confirmColor="#000">
				<slot name="confirmButton">
					<view class="flex-colum">
						<view class="flex-center" v-html="content"></view>
						<view class="confirmButton" @tap="confirm">知道了</view>
					</view>
				</slot>
			</u-modal>
		</view>
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
				default: ''
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
				this.$emit('confirm');
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
		.confirmButton {
			width: 516rpx;
			height: 88rpx;
			background: url('@/static/else/old01.png') no-repeat 100%;
			font-size: 32rpx;
			//font-family: font-family: PingFang SC-Semibold, PingFang SC;
			font-weight: 500;
			color: #ffffff;
			text-align: center;
			border-radius: 16rpx;
			line-height: 88rpx;
			margin-top: 34rpx;
		}
	}
</style>