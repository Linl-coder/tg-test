<template>
	<view class="index">
		<view class="info">
			<u-form labelPosition="top" labelWidth="auto" :labelStyle="{fontSize:'32rpx',color:'#222',fontWeight:600}">
				<u-form-item class="form-item" :label="$t('index.inviteCode')" leftIcon="/static/else/invite.png"
					leftIconStyle="width:64rpx;height:64rpx;">
					<u-input v-model="form.user_code" class="u-input" maxlength="8" type="number"
						:placeholder="$t('index.plsInputInviteCode')"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="save_btn flex-center" @click="save">
			{{$t('utils.sumbit')}}
		</view>
	</view>
</template>

<script>
	import {
		userinfo
	} from "@/common/mixins/index.js";
	export default {
		mixins: [userinfo],
		data() {
			return {
				form: {
					user_code: ''

				},
				type: 0 //type为1 来自首页。2来自宝石转增
			};
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info
			},
			is_login() {
				return this.$store.getters.is_login;
			},
		},
		onLoad(option) {
			// this.form.inviteCode = this.$store.state.user.user_info.inviteCode;
			this.type = option.from;

		},
		onShow() {
			// console.log("userinfo", this.userinfo);
			uni.setNavigationBarTitle({
				title: this.$t('index.setInviteCode')
			})
		},
		methods: {
			async public_getmyParentInfo() {
				let result = await uni.ajax.public_getmyParentInfo();
				if (result.code == 200) {
					this.form.user_code = result.data.user_code;
				}

			},
			async save() {
				if (!this.form.user_code) {
					uni.$u.toast(this.$t('utils.cannotEmpty'))
					return;
				}
				//console.log("4322222222");
				let result = await uni.ajax.public_setMyParentCode(this.form);
				if (result) {
					//console.log("设置上级邀请码结果====>", result)
					uni.showToast({
						title: this.$t('utils.operateSuccess'),
						duration: 2000,
						icon: 'loading'
					});
					await uni.utils.sleep(500);


					if (this.type == 1) {
						console.log("返回首页.....");
						// 在跳转前设置Vuex状态
						uni.$emit('setInvCode', {
							setSuccess: true
						});
						this.totab("gather/homepage");

					} else {
						console.log("返回宝石转增.....");
						uni.navigateTo({
							url: '/pages/gather/mainland/sendOut/sendOut?setSuccess=' + true
						})
					}


					// // 获取页面栈
					// let pages = getCurrentPages();
					// let prevPage = pages[pages.length - 2]; // 上一页面

					// // 直接修改上一页面的data中的变量
					// prevPage.showSetIvCode = false;

					// // 返回上一页
					// uni.navigateBack();

				} else {
					console.log("错误信息==》");
					this.public_getmyParentInfo();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.index {
		padding: 24rpx 32rpx;

		.info {
			border-radius: 12rpx;
			background-color: #fff;
			padding: 40rpx 32rpx;
			margin-bottom: 24rpx;

			.u-input {
				height: 108rpx;
				border: 2rpx solid #222 !important;
				padding: 0 32rpx !important;
				border-radius: 12rpx;
			}

			// 		.possess {
			// 			font-size: 24rpx;
			// 			//font-family: PingFang SC-Regular, PingFang SC;
			// 			font-weight: 400;
			// 			color: #222222;

			// 			text {
			// 				font-size: 32rpx;
			// 				font-weight: 600;
			// 				color: var(--theme);
			// 			}
			// 		}
		}

		.save_btn {
			height: 96rpx;
			background: url('/static/btn/nick_edit.png');
			@include backImg;
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
		}
	}
</style>