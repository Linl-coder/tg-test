<template>
	<view class="swiper">
		<u-swiper indicatorActiveColor="#D9D9D9" indicatorInactiveColor="#9D86E6" :indicator="true" indicatorMode="dot"
			:indicatorStyle="indicatorStyle" :imgMode="imgMode" :list="list" @click="click" duration="1000"
			:bgColor="bgColor" keyName="image" :height="height" :radius="radius" :autoplay="true" :loading="false"
			@change="change" :circular="true">
		</u-swiper>
	</view>
</template>

<script>
	/**
	 * list: [{
				image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				title: '昨夜星辰昨夜风，画楼西畔桂堂东',
				src: "https://www.uviewui.com/components/swiper.html",
				open_type:1
			}],
	 */
	export default {
		props: {
			is_3d: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			height: {
				type: String,
				default: "160"
			},
			bgColor: {
				type: String,
				default: ""
			},
			imgMode: {
				type: String,
				default: "heightFix"
			},
			radius: {
				type: [Number, String],
				default: 10
			},
			indicatorStyle: {
				type: String,
				default: "bottom:10rpx"
			}
		},
		data() {
			return {
				nextMargin: 0,
				previousMargin: 0
			}
		},
		created() {
			if (this.is_3d) {
				this.nextMargin = 30;
				this.previousMargin = 30;
			}
		},
		methods: {
			click(index) {
				let src = this.handleImgUrl(this.list[index].src);
				let open_type = this.list[index].open_type;
				switch (open_type) {
					case "network": //外部跳转
						// #ifdef H5
						window.location.href = src;
						// #endif
						// #ifdef APP-PLUS
						this.topage("/general/web/index?src=" + src);
						// #endif
						break;
					case "current": //内部链接
						if (src) {
							uni.pro.navigateTo(src)
						}
						break;
					default:
						break;
				}
			},
			change(e) {
				//console.log("e.current==>", e.current);
				this.$emit("change", e.current);
			},
		}
	}
</script>

<style>

</style>