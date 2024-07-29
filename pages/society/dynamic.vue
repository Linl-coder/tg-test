<template>
	<view class="mydynamic">
		<view class="mydynamic-box">
			<dynamic :list="list"   @openShare="openShare"></dynamic>
		</view>
		<iloading :result="loading"></iloading>
		<sharepopup ref="sharepopup" ></sharepopup>
	</view>
</template>

<script>
	import sharepopup from "@/components/sharepopup.vue";
	import dynamic from "./components/mydynamic.vue";
	import {pages} from "@/common/mixins/index.js";
	export default{
		mixins: [pages],
		components:{
			dynamic,
			sharepopup
		},
		data(){
			return{
				list:[],
				loading: 1,
			}
		},
		created() {
			this.community_mygetForum();
		},
		methods:{
			async community_mygetForum() {
				let res = await uni.ajax.community_mygetForum({
					page: this.page,
					limit: uni.conf.limit
				});
				if (res) {								
					this.setPagedata('', 'list', res.data.list, 'community_mygetForum', false);
					
				}
			},
			openShare(item) {
				this.$refs.sharepopup.open(item);
			},
		}
	}
</script>

<style lang="scss">
	.mydynamic{
		.mydynamic-box{
			padding: 32rpx;
		}
	}
</style>