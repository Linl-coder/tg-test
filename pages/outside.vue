<template>
	<view class="web_view">
		<view class="status_bar" :style="statusBarHeight_style" ></view>
		<web-view  ref="webview"  :fullscreen="false" :src="src" :style="w_style" class="webview" @message="handlePostMessage"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src: 'https://cat.catchaowan.com/?time='+new Date().getTime(),
			w_style: {},
			id: '',
			statusBarHeight_style: {},
			back_style:{
				
			},
			
		};
	},
	onReady() {
	
	},
	mounted() {
		uni.getSystemInfo({
			success: res => {
				this.w_style={			
					height:  res.windowHeight - res.statusBarHeight+"px",
					width:res.windowWidth+"px",
					top:res.statusBarHeight+"px"
				}
				this.statusBarHeight_style = {
					height: res.statusBarHeight + 'px'
				};
				
				var currentWebview = this.$scope.$getAppWebview();			
				var wv = currentWebview.children()[0];
				wv.setStyle({
					//设置web-view距离顶部的距离以及自己的高度，单位为px
					top: res.statusBarHeight, //此处是距离顶部的高度，应该是你页面的头部 40  65
					height: res.windowHeight - res.statusBarHeight, //webview的高度
					scalable: true //webview的页面是否可以缩放，双指放大缩小,
				});
				
			}
		});
	},
	methods: {
		
		handlePostMessage: async function(data) {
			//接收到消息：{"data":[{"action":"open_video"}]}
			//console.log("接收到消息：" + JSON.stringify(data.detail));
			let resulet = data.detail.data[0].action;
			this.evalJs();
		},
		// 调用 webview 内部逻辑
		evalJs: function(resulet) {
			if (this.id == 7) {
			}
		}
	}
};
</script>

<style lang="scss">
.web_view {
	
	.status_bar {		
		width: 750rpx;
		background: #fff;
	}
	.backbtn {
		width: 130rpx;
		height: 130rpx;
		position: absolute;
		bottom: 40rpx;
		right: 35rpx;
		background:#000000;
		border-radius: 100%;
		.t1{
			color: #fff;
			font-size: 30rpx;
		}
	}

	.box {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		background-color: aqua;
		position: absolute;
		right: 50rpx;
		bottom: 100rpx;
	}
}
</style>
