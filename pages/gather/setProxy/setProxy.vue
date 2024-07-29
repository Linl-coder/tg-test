<template>
	<view class="baic_wrap">
		<!-- #ifdef H5 -->
		<view class="addProxy_bth flex-end">
			<p @click="openAddModal">{{$t('setProxy.addProxy')}}</p>
		</view>
		<!-- #endif -->
		<view class="agent_list_box" v-for="(item,index) in agentList" :key="index">
			<view class="agent flex-start">
				<text class="address_name"> {{$t('setProxy.inviteCode')}}: {{item.user_info.user_code}}</text>
				<u-icon name="/static/Continent/i42.png" width="30rpx" height="30rpx" stop
					@click="copy(item.user_info.user_code)"></u-icon>
			</view>
			<view class="shop_manager flex-between">
				<u-avatar :src="handleImgUrl(item.user_info.avatar)"></u-avatar>
				<u-icon name="/static/Continent/i41.png" size="40rpx" :label="item.user_info.nickname"
					label-color="#999" label-size="28rpx"></u-icon>
			</view>
			<view class="flex-end cancelAgentBtn">
				<text @click="openCancelPro(item.user_info.user_code)">{{$t('setProxy.cancelProxy')}}</text>
			</view>
		</view>

		<!-- 是否取消代理弹框   -->
		<u-modal :show="showCancelPro" :cancelText="$t('utils.cancel')" :confirmText="$t('utils.confirm')"
			@cancel="cancelModal" @confirm="confirmCancel" :showCancelButton="true" title=" "
			:content="$t('setProxy.sureCancelProxy')"></u-modal>
		<u-modal :show="show" :cancelText="$t('utils.cancel')" :confirmText="$t('utils.confirm')"
			:title="$t('setProxy.addProxy')" @confirm="confirmBtn" @cancel="cancelBtn" :showCancelButton="true">
			<u-input v-model="inputValue" @clear="clearInput" @input="getValue" type="number" clearable
				:placeholder="$t('setProxy.plsInputUserId')"></u-input>
			<!-- <u-transition :show="inputValue!=''&&showUserList">
				<view class="userList" v-for="item,index in userList" :key="index"
					v-show="inputValue!=''&&showUserList">
					<view class="userList_content">
						<li class="flex-center" v-show="findIndex.indexOf(index)!==-1" @click="handleAssign(index)">
							{{item.userCode}}
						</li>
					</view>
				</view>
			</u-transition> -->
		</u-modal>
		<u-empty mode="list" :text="$t('utils.noData')" iconSize="110" marginTop="50"
			v-show="agentList.length==0"></u-empty>
	</view>
</template>

<script>
	import {
		pages
	} from "@/common/mixins/index.js";
	export default {
		mixins: [pages],
		data() {
			return {
				//自己设置的代理列表
				agentList: [],
				showCancelPro: false,
				show: false, // 控制弹出框显示隐藏的变量
				inputValue: '', // 输入框的值
				userList: [{
						userCode: "11111"
					},
					{
						userCode: "12222"
					},
					{
						userCode: "123333"
					},
					{
						userCode: "4444"
					}
				],
				findIndex: [],
				showUserList: true,
				cancelUserCode: '',
				isStop: false
			};
		},
		onShow() {
			this.stop = false
			this.getSetAgentList();
			uni.setNavigationBarTitle({
				title: this.$t('setProxy.setProxy')
			})

			// #ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview();
			// 修改buttons  
			webView.setTitleNViewButtonStyle(0, {
				text: this.$t('setProxy.addProxy'),
			});
			// #endif
		},
		onNavigationBarButtonTap(e) {
			if (this.stop) {
				uni.$u.toast(this.$t('backendRespon.msg122'));
				return
			}
			this.inputValue = '';
			this.showUserList = true;
			this.show = true;
		},
		methods: {
			openAddModal() {
				if (this.stop) {
					uni.$u.toast(this.$t('backendRespon.msg122'));
					return
				}
				this.inputValue = '';
				this.showUserList = true;
				this.show = true;
			},
			confirmCancel() {
				this.operateAgent(this.cancelUserCode, 2);
			},
			cancelModal() {
				this.cancelUserCode = '';
				this.showCancelPro = false;
			},
			openCancelPro(userCode) {
				this.cancelUserCode = userCode;
				this.showCancelPro = true;
			},
			async getSetAgentList() {
				let res = await uni.ajax.getSetAgentList({
					page: this.page,
					limit: uni.conf.limit
				})
				if (res) {
					this.agentList = res.data.list;
					if (this.agentList.length == 10) {
						this.isStop = true
					}
				}
			},
			// 设置和取消代理  1为设置 2为取消
			async operateAgent(user_code, type) {
				let res = await uni.ajax.operateAgent({
					user_code,
					type
				})
				//console.log("res==>", res);
				if (res) {
					uni.$u.toast(this.$t('setProxy.Success'));
					this.cancelUserCode = '';
					this.getSetAgentList();
				}
				this.show = false;
				this.showCancelPro = false;
			},
			handleAssign(index) {
				this.inputValue = this.userList[index].userCode;
				this.showUserList = false;
			},
			clearInput() {
				this.findIndex = [];
				this.showUserList = true;
			},
			getValue(value) {
				//console.log("value", value);
				//console.log("inputValue", this.inputValue);
				this.findIndex = [];
				for (let i = 0; i < this.userList.length; i++) {
					// for (let j = 0; j < value.length; j++) {
					if (this.userList[i].userCode.indexOf(value) !== -1) {
						//console.log("符合的index==>", i);
						this.findIndex.push(i);
					}
					// }
				}

			},
			cancelBtn() {
				this.show = false;
			},
			confirmBtn() {
				console.log("点击确认按钮");
				if (!this.inputValue) {
					uni.$u.toast(this.$t('setProxy.setProxyIdCanntEmpty'))
					return;
				}
				this.operateAgent(this.inputValue, 1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-modal__content {
		flex-direction: column;
	}

	.baic_wrap {
		padding: 20rpx;
	}

	.addProxy_bth {
		width: 100%;

		p {
			font-size: 34rpx;
			color: red;
		}
	}


	.agent_list_box {
		box-sizing: border-box;
		width: 100%;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 34rpx 28rpx;
		margin: 24rpx 0;

		.agent {
			margin-bottom: 30rpx;

			.address_name {
				color: #000;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 700;
			}
		}

		.shop_manager {
			margin-bottom: 30rpx;
			display: flex;

		}

		.cancelAgentBtn {


			text {
				padding: 10rpx 20rpx;
				font-size: 28rpx;
				color: #fff;
				background: #000;
			}
		}

	}

	.userList {
		text-align: center;

		.userList_content {
			//background-color: red;

			li {
				height: 50rpx;
				border: 1px solid #ccc;
				border-top: none;
			}
		}


	}
</style>