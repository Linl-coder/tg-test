<template>
	<view class="zfbH5">
		<view class="" v-html="zfbForm">
			
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			zfbForm:{
				type:String,
				default:""
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			async submit(){
				await uni.utils.sleep(500);
				document.forms[0].submit();
			}
		}
	}
</script>

<style lang="scss">
	.zfbH5{
		
	}
</style>