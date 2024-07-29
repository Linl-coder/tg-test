<template>
	<view class="basic_wrap">
		<view class="brand_title color_w">
			{{$t('myGuild.collaBrand')}}
		</view>

		<view class="brand_list">
			<view class="" v-for="(item, index) in brandList" :key="index">
				<view class="backImg" :style="{ backgroundImage: 'url(' + item.imgurl + ')' }"
					@click="topage(`gather/association/brandDetails/brandDetails?id=${item.id}`)">
					<!-- 其他内容 -->
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				brandList: [{
					imgurl: '/static/else/old01.png',
					id: 1

				}]
			}
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.basic_wrap {
		width: 100%;
		height: 600rpx;
		padding: 40rpx 20rpx;
		background-color: #181C1F;

		.brand_title {}

		.brand_list {
			margin-top: 20rpx;
			//background: red;

			.backImg {
				width: 100%;
				height: 400rpx;
				@include backImg;
			}
		}
	}
</style>