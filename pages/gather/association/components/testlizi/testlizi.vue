<template>
	<view class="space">
		<view v-for="item in 80" class="stars">
			<view class="star" ref="star">
			</view>
		</view>
		<!-- 65555 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		mounted() {
			uni.createSelectorQuery().selectAll('.star').boundingClientRect(rects => {
				rects.forEach((rect, index) => {
					if (rect) {
						rect.top = `${Math.random() * 300}px`;
						rect.left = `${Math.random() * 400}px`;
						rect.right = `${Math.random() * 500}px`;
						rect.animationDelay = `${Math.random() * 5}s`;
						let thisDistance = Math.random() * 360;
						const translateX = (Math.random() * 1000) - 500;
						const translateY = (Math.random() * 1000) - 500;
						rect.transform =
							`rotate(${thisDistance}deg) translateX(${translateX}px) translateY(${translateY}px)`;
					} else {
						console.error(
							`Element at index ${index} is undefined or does not have a style property.`
						);
					}
				});
			}).exec();

			// #ifdef H5
			this.$nextTick(() => {
				const starArr = this.$refs.star;

				if (Array.isArray(starArr)) {
					starArr.forEach((item, index) => {
						//console.log("item", item.style);
						if (item && item.$el.style) {
							item.$el.style.top = `${Math.random() * 300}px`; // 使用 'px' 而不是 'rpx'
							item.$el.style.left = `${Math.random() * 400}px`;
							item.$el.style.right = `${Math.random() * 500}px`;
							item.$el.style.animationDelay = `${Math.random() * 5}s`;
							let thisDistance = Math.random() * 360;
							const translateX = (Math.random() * 1000) - 500; // 生成介于 -500 和 500 之间的随机数
							const translateY = (Math.random() * 1000) - 500; // 生成介于 -500 和 500 之间的随机数
							item.$el.style.transform =
								`rotate(${thisDistance}deg) translateX(${translateX}px) translateY(${translateY}px)`
						} else {
							console.error(
								`Element at index ${index} is undefined or does not have a style property.`
							);
						}
					});
				} else {
					console.error('Refs "star" is not an array of elements.');
				}
			});
			// #endif

		},
		onLoad() {},
		onShow() {

		}
	}
</script>

<style lang="scss" scoped>
	.space {
		width: 100%;
		height: 650rpx;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		//background: red;

		.star {
			width: 8rpx;
			height: 8rpx;
			border-radius: 50%;
			background: #fff;
			position: absolute;
			top: 70%;
			left: 50%;
			animation: animate 40s linear infinite;
			opacity: 0;
			/* 修改这里，初始透明度为1 */
		}

		.star::before {
			content: '';
			position: absolute;
			top: 50%;
			/* transform: translateY(-50%); */
			width: 10px;
			height: 1px;
			background: linear-gradient(90deg, #fff, transparent);
		}

		@keyframes animate {
			0% {
				transform: rotate(315deg) translateX(0) translateY(0);
				opacity: 0;
			}

			70% {
				opacity: 0.7;
			}

			100% {
				//transform: rotate(315deg) translateX(500rpx);
				opacity: 0;
			}
		}
	}
</style>