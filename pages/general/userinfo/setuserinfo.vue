<template>
	<div class="userName">
		<div class="form_box">
			<view class="form_input flex-between" style="margin-bottom: 20rpx;">
				<u--input :placeholder="$t('setNickName.plsInputYourNickName')" fontSize="32rpx" maxlength='16'
					color="#999999" type="text" :clearable="true" border="none" v-model="user_name"></u--input>
			</view>

			<div class="form_btn flex-center" @tap="confirmUse()">
				<text class="t">{{$t('utils.sumbit')}}</text>
			</div>

		</div>

	</div>
</template>

<script>
	/**
	 * type 1 修改支付密码
	 */
	import debounce from 'lodash/debounce';
	export default {
		data() {
			return {
				type: 1,
				user_name: "",
				is_emil: false
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onLoad(query) {

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('setNickName.setNickName')
			})
			this.user_name = this.user_info.nickname;
		},
		methods: {
			confirmUse: debounce(function() {
				// 要实现的业务逻辑
				this.set_info();
			}, 2000, {
				leading: true,
				trailing: false
			}),
			async set_info() {
				let res = null;
				await uni.utils.is_null(this.user_name, this.$t('setNickName.inputNickName'));
				if (this.user_name.length > 16) {
					uni.showToast({
						title: this.$t('setNickName.nickNameless8'),
						icon: "none"
					})
					return false;
				}
				res = await uni.ajax.public_setmodifyInfo({
					nickname: this.user_name
				})
				if (res) {
					uni.set_userInfo({
						nickname: this.user_name,
					})
					uni.showToast({
						title: this.$t('utils.operateSuccess'),
						icon: "none"
					})
					await uni.utils.sleep(1000);
					this.toback();

				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.userName {
		padding: 24rpx 32rpx;

		.form_input {
			border-bottom: 1rpx solid #F0F0F0;
			padding: 24rpx 0rpx;
		}

		.form_btn {
			margin-top: 100rpx;
			height: 88rpx;
			// background: url('@/static/else/old01.png') no-repeat 100%;
			// background: var(--linear-gradient-theme);
			background: url('/static/btn/nick_edit.png');
			@include backImg;
			// border-radius: 88rpx;
			color: #fff;
		}
	}
</style>