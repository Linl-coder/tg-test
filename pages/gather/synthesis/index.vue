<template>
	<view class="synthesis">

		<synthesislist :list="list" v-show="list.length>0"></synthesislist>	
		<iloading :result="loading"></iloading>
	</view>
</template>

<script>
	import {pages} from "@/common/mixins/index.js";
	import synthesislist from "@/pages/gather/synthesis/components/synthesislist.vue";
	export default {
		components: {
			synthesislist
		},
		mixins:[pages],
		data() {
			return {
				list:[],
				loading:1
			}
		},
		onNavigationBarButtonTap() {
		   this.topage('gather/collect/regift?type=3')	
		},
		created() {
			this.collect_getFuseList();
		},
		methods: {
			async collect_getFuseList(){
				let res = await uni.ajax.public_activeGetList({
					page: this.page,
					limit: uni.conf.limit,
					active_type:1,
					sort:"",
					keywords:""
				});
				if(res){
					res.data.list.forEach(a=>{
						a.end_time = this.formatDateTimeForHMS(a.end_time)
						a.start_time = this.formatDateTimeForHMS(a.start_time)
					})
					this.setPagedata("","list",res.data.list,'collect_getFuseList',false);
					
				}
			},
			formatDateTimeForHMS(obj) {
			    if (obj == null) {
			        return null
			    }
			    let date = new Date(obj);
			    let y = 1900 + date.getYear();
			    let m = "0" + (date.getMonth() + 1);
			    let d = "0" + date.getDate();
			    let h = "0" + date.getHours();
			    let mm = "0" + date.getMinutes();
			    let s = "0" + date.getSeconds();
			    return m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + " " + h.substring(h.length - 2, h.length) + ":" + mm.substring(mm.length - 2, mm.length);
			}
		}
	}
</script>

<style lang="scss">
	.synthesis {
		padding:0rpx 32rpx;

		.header-box {
			position: relative;
			border-radius: 32rpx;
			overflow: hidden;

			.icon {
				width: 100%;
			}

			.tips {
				background-color: #fff;
				position: absolute;
				padding: 0rpx 16rpx 0rpx 32rpx;
				height: 88rpx;
				border-radius: 88rpx 0rpx 0rpx 88rpx;
				right: 0rpx;
				top: 32rpx;
				font-size: 30rpx;
			}
		}
	}
</style>
