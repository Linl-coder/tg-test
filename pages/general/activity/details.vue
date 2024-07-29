<template>
	<div class="task_details">
		<u-navbar leftText="返回" title="活动详情" @rightClick="href('index/Integralbills?integral='+integral.integral)"
			:fixed="true" leftIconColor="#fff" :titleStyle="{'color':'#fff'}" rightcolor="#fff" bgColor="transparent"
			:autoBack="true">
		</u-navbar>
		
		<view v-if="loading!=1">
			<div class="header">
				<u--image :showLoading="true"  :src="info.cover.show_src" width="100%" :height="info.cover.imgheight" ></u--image>
			</div>
			<div class="content">
				
				<div class="title">
					<text class="t">{{info.title}}</text>
				</div>
				<div class="title">
					<text class="t">活动时间</text>
				</div>
				<div class="desc">
					<text class="t">{{info.start_time}} - {{info.end_time}}</text>
				</div>
				<div class="title">
					<text class="t">活动描述</text>
				</div>
				
				<div class="desc" >
					<u-parse :content="info.content"></u-parse>
				</div>
				
				<!-- <div class="upload">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="1"></u-upload>
				</div>
				<div class="desc">
					<text class="t">注：任务完成后，请上传任务完成后的生成图</text>
				</div> -->
			</div>
			<div class="btn_box flex-center" v-show="this.info.open_src">
				<div class="btn flex-center" @tap="commitTask">
					<text class="t">立即前往</text>
				</div>
			</div>
		</view>
		
		<iloading :result="loading"></iloading>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
				info:{},
				id:"",
				loading:1
			}
		},
		onLoad(option) {
			this.id=option.id;
			this.activeInfo();
		},
		methods:{
			async activeInfo(){
				let res=await uni.ajax.public_activeGetDetail({
					id:this.id
				})
				if(res){
					this.info=res.data;
					this.set_imginfo();
					this.loading=4;
				}else{
					this.loading=3;
				}
				
			},
			async set_imginfo() {
				//设置图片展现形式
				let system = await uni.pro.getSystemInfo();	
				this.info.cover.imgheight = parseFloat(uni.utils.set_imgh(this.info.cover.width, this.info.cover.height, system.windowWidth)).toFixed(2) + 'px';
			},
			async commitTask(){
				let src=this.info.open_src;
				if(src.includes("http")){
					// #ifdef H5
					window.open(src);
					// #endif
					// #ifdef APP-PLUS
					this.href("web/index?src=" + src);
					// #endif
				}else{
					uni.pro.navigateTo(src)
				}
				return false;
				var arr = [];
				this.fileList1.forEach((item, index) => {
					arr.push(item.url)
				})
				if(arr.length<=0){
					uni.showToast({
						title:"请上传图片"
					})
				}
				
				let res=await uni.ajax.commitTask({
					image:arr[0],
					id:this.info.id
				})
				
			},
		
		}
	}
</script>

<style lang="scss">
	.task_details {
		.btn_box {
			position: fixed;
			bottom: 0rpx;
			width: 750rpx;
			left: 0rpx;
			height: 120rpx;

			.btn {
				width: 686rpx;
				height: 96rpx;
				background: #DF1717;
				border-radius: 160rpx;

				.t {
					font-size: 28rpx;
					//font-family: font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 33rpx;
				}
			}
		}

		.content {
			position: relative;
			
			padding: 0rpx 32rpx;

			.desc {

				.t {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 28rpx;
				}
			}

			.title {
				margin: 24rpx 0rpx;

				.t {
					font-size: 32rpx;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: bold;
					color: #000;
					line-height: 38rpx;
				}
			}

			.user_info {
				align-items: flex-end !important;

				.avatar {
					width: 136rpx;
					height: 136rpx;
					border-radius: 100%;
					border: 4rpx solid #000;
				}

				.t {
					color: #fff;
					font-size: 30rpx;
				}

				.line {
					flex: 1;
				}
			}
		}

	}
</style>
