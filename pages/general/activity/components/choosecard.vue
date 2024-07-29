<template>
	<view class="choosecard" :style="{ top: top + 'px' }">
		<u-transition :show="show" mode="fade">
			<scroll-view scroll-y="true" class="scroll">
				<view class="list flex-between" @tap="choose(item,index)" :class="{ 'list-active': current == index }" v-for="(item, index) in list" :key="index">
					<text class="t1">{{item.name}}</text>
					<u-icon name="checkbox-mark" color="#fe3333" size="25" v-show="current == index"></u-icon>
				</view>
			</scroll-view>
		</u-transition>
	</view>
</template>

<script>
export default {
	props: {
		current: {
			type: Number,
			default: 0
		},
		top: {
			type: Number,
			default: 0
		},
		show: {
			type: Boolean,
			default: false
		},
		list:{
			type:Array,
			default(){
				return[]
			}
		}
	},
	methods:{
		choose(item,index){
			this.$emit("choose_fn",{
				info:item,
				index:index
			})	
		}
	}
};
</script>

<style lang="scss">
.choosecard {
	position: fixed;
	width: 100%;
	background-color: #fff;
	left: 0rpx;
	.scroll {
		height: 400rpx;
		.list {
			box-sizing: border-box;
			height: 88rpx;
			width: 100%;
			padding: 0rpx 24rpx;
			.t1 {
				font-size: 28rpx;
			}
		}
		.list-active {
			background: #f5f5f5;
			.t1 {
				color: #fe3333;
			}
		}
	}
}
</style>
