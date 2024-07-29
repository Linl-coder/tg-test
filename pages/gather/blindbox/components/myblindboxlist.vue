<template>
	<view class="marketList flex-between">
		<view class="left">
			<ilist :list="left"></ilist>
		</view>
		<view class="right">
			<ilist :list="right"></ilist>
		</view>
	</view>
</template>

<script>
	import ilist from "./list.vue";
	export default {
		components: {
			ilist
		},
		data() {
			return {
				left: [],
				right: [],
				index: 0
			}
		},
		methods: {
			init_fn(){
				this.index=0;
				this.left=[];
				this.right=[];
			},
			async setData(arr) {
				for (let key of arr) {
					if (this.index % 2 == 0) {
						await this.formData('left', key);
					} else {
						await this.formData('right', key);
					}
					this.index = this.index + 1;
				}	
			},
			formData(type, item) {
				return new Promise((reslove, reject) => {
					if (type == 'left') {
						this.left.push(item);
					}
					if (type == 'right') {
						this.right.push(item);
					}
					setTimeout(() => {
						reslove();
					}, 20)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.marketList {
		align-items: flex-start;

		.left,
		.right {
			width: 48%;
		}
	}
</style>
