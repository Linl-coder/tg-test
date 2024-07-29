<template>
	<view class="edit_address">
		<view class="form">
			<u--form ref="uForm" :rules="rules" label-width="100" :labelStyle="{'color':'#000'}">
				<u-form-item :label="$t('address.name')">
					<u-input input-align="right" color="#000" border="false" v-model="addressInfo.name" maxlength="50"
						:placeholder="$t('address.plsWriteName')" />
				</u-form-item>
				<u-form-item :label="$t('address.phone')">
					<u-input color="#000" border="false" v-model="addressInfo.phone"
						:placeholder="$t('address.plsWritePhone')" type="number" input-align="right" maxlength="11" />
				</u-form-item>
				<!-- <u-form-item label="所在地区">
					<view @tap="openPicker()" class="flex-end" style="font-size: 28rpx;color:#aaaaaa; width: 100%;">
						{{addressInfo.pickerText}}
						<u-icon name="arrow-right"></u-icon>
					</view>
				</u-form-item> -->
				<!-- <u-form-item :label="$t('address.province')">
					<u-input color="#000" border="false" input-align="right" maxlength="50"
						v-model="addressInfo.province" :placeholder="$t('address.plsInputProvince')" />
				</u-form-item>
				<u-form-item :label="$t('address.city')">
					<u-input color="#000" border="false" input-align="right" maxlength="50" v-model="addressInfo.city"
						:placeholder="$t('address.plsInputCity')" />
				</u-form-item>
				<u-form-item :label="$t('address.county')">
					<u-input color="#000" border="false" input-align="right" maxlength="50" v-model="addressInfo.area"
						:placeholder="$t('address.plsInputCounty')" />
				</u-form-item> -->
				<u-form-item :label="$t('address.addressDetail')">
					<u-input type="textarea" height="200" auto-height="true" color="#000" border="false"
						input-align="right" v-model="addressInfo.address" maxlength="100"
						:placeholder="$t('address.addressDetail')" />
				</u-form-item>

				<u-form-item :label="$t('address.defaultAddress')">
					<view class="flex-end" style="width: 100%;">
						<!-- {{!isCancelDefault}} -->
						<u-switch v-model="checked" :disabled="mustSetDefault" active-color="var(--theme)"></u-switch>
					</view>
				</u-form-item>
				<!-- <div class="flex-end" style="font-size: 26rpx;color:red;">
					抽奖实物奖励默认地址为发货地址
				</div> -->
			</u--form>
		</view>


		<div style="padding: 0rpx 32rpx;">
			<div class="btn flex-center" @tap="create_address">
				<!-- <image src="/static/shop/add.png" style="width: 35rpx;height: 35rpx;"  mode=""></image> -->
				<text class="t">{{type=='add'?$t('utils.sumbit'):$t('utils.edit')}}</text>
			</div>
		</div>

		<!-- <lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address> -->
	</view>
</template>

<script>
	const validatePhone = (rule, value, callback) => {
		if (!validPhoneNum(value)) {
			callback(new Error(this.$t('address.plsInputRightPhone')));
		} else {
			callback();
		}
	};
	// import lotusAddress from "@/components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	export default {
		// components: {
		// 	lotusAddress
		// },
		data() {
			return {
				rules: {},
				lotusAddressData: {
					visible: false,
					provinceName: '',
					cityName: '',
					townName: '',
				},
				region: '',
				checked: false,
				type: 'add', //'add'添加地址，'edit'修改地址
				addressInfo: {
					province: "",
					city: "",
					area: "",
					pickerText: '请选择',
					phone: "",
					name: "",
					address: ""
				}, //选择地址信息
				mustSetDefault: false

			}
		},
		onLoad(options) {
			//console.log("options", options);
			if (options.empyList == 'true') {
				//console.log("1111");
				this.mustSetDefault = true;
				this.checked = this.mustSetDefault ? true : false;
			}
			if (options.type == 'edit') {
				this.type = 'edit';
				let editData = uni.getStorageSync("edit_address");
				uni.setNavigationBarTitle({
					title: this.$t('address.editShipAddress')
				})
				this.checked = editData.type == 1 ? true : false;
				this.addressInfo = editData;
				this.addressInfo.code = editData.code;
				editData.pickerText = this.addressInfo.province + this.addressInfo.city + this.addressInfo.area
				this.lotusAddressData.provinceName = this.addressInfo.province;
				this.lotusAddressData.cityName = this.addressInfo.city;
				this.lotusAddressData.townName = this.addressInfo.area;
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('address.addShipAddress')
				})
			}
		},
		methods: {
			radioChange(e) {
				console.log(this.radiovalue)
			},
			//打开picker
			openPicker() {
				this.lotusAddressData.visible = true;
				// this.lotusAddressData.provinceName = '广东省';
				// this.lotusAddressData.cityName = '广州市';
				// this.lotusAddressData.townName = '白云区';
			},
			//回传已选的省市区的值
			choseValue(res) {
				//res数据源包括已选省市区与省市区code
				console.log(res);
				this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					console.log("sss")
					this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
					this.addressInfo.province = res.province;
					this.addressInfo.city = res.city;
					this.addressInfo.area = res.town;
					this.addressInfo.pickerText = res.province + res.city + res.town;
					this.$forceUpdate();
				}
			},

			//选择完省市区回调
			confirmCallback(e) {

			},
			//新增地址
			async create_address() {
				await uni.utils.is_null(this.addressInfo.name, this.$t('address.receiverName'));
				await uni.utils.is_null(this.addressInfo.phone, this.$t('address.phoneNum'));
				// await uni.utils.is_null(this.addressInfo.province, "地址");
				await uni.utils.is_null(this.addressInfo.address, this.$t('address.detailAddress'));
				this.addressInfo.type = this.checked == true ? 1 : 2;
				//console.log("mustSetDefault", this.mustSetDefault);
				if (this.mustSetDefault) {
					console.log("34324");
					if (!this.checked) {
						this.$u.toast('您的第一条地址必须要设置默认地址!')
						return;
					}
				}
				if (this.type == "add") {
					let res = await uni.ajax.shop_addressAdd(this.addressInfo);
					this.success(res);
					this.mustSetDefault = false;
					//console.log("添加结果==>", res);
				} else {
					let res = await uni.ajax.shop_addressEdit(this.addressInfo);
					// uni.$u.toast(res.msg)
					this.success(res);
				}
			},
			success(res) {
				if (res.msg === 'ok') {
					uni.showToast({
						title: this.$t('utils.operateSuccess'),
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					})
				} else {
					uni.showToast({
						title: this.$t('address.mustSetDefTip'),
						icon: "none"
					})
				}
			},
		},

		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	page {}

	.edit_address {
		.form {
			background: #FFFFFF;
			// margin: 10rpx 32rpx;
			//border-radius: 24rpx;
			padding: 10rpx 24rpx;

			box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.02);

		}

		.btn {
			color: #FFFFFF;
			width: 100%;
			height: 100rpx;
			margin-top: 100rpx;
			// background: url('@/static/else/old01.png') no-repeat 100%;
			//background: var(--linear-gradient-theme);
			// border-radius: 100rpx;
			background: #000;
			color: #fff;
		}
	}
</style>