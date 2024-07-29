<template>
	<view class="index">
		<view class="u-content"><u-parse :content="ritchtext"></u-parse></view>
		<iloading :result="result"></iloading>
	</view>
</template>

<script>
	import itab from "@/components/itab.vue"
	export default {
		components: {
			itab
		},
		data() {
			return {
				ritchtext: '',
				result: 1
			}
		},
		computed: {
			user_info() {
				return this.$store.getters.get_user_info;
			}
		},
		onLoad() {
			this.get_info();
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('customer.customer')
			})
		},
		methods: {
			async get_info() {
				let res = res = await uni.ajax.public_getPactInfo({
					type: 14
				});
				if (res) {
					this.ritchtext = uni.utils.turnhtml(res.data);
				}

				this.result = 4;

			}


		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.index {
		.u-content {
			padding: 24rpx;
		}
	}
</style>