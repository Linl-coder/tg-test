<template>
	<view class="vote-box">
		<view class="vote flex-between" :class="{'active':item.is_vote==1}"  v-for="(item,index) in vote_data" :key="index" @click.stop="set_vote(item.id,index,item.vote_type)">
			<view class="vote-p flex-start" :style="{'width':item.percentage+'%'}">
				
			</view>
			
			<view class="vote-s flex-start">
				<text class="t">{{item.title}}</text>
				<image src="/static/community/i14.png" class="icon" mode="" v-if="item.is_vote==1"></image>
			</view>
			
			<text class="t1">{{item.vote_count}}人</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				vote_data: []
			}
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		created() {
			this.vote_data = this.list;
			this.set_percentage();
		},
		methods: {
			set_percentage(){
				let total=this.vote_data.reduce((tal,item)=>{
					return tal+item.vote_count;
				},0)
				this.vote_data.forEach((item,index)=>{
					item.percentage=(item.vote_count/total)*100;
				})
			},
			async set_vote(id,index,vote_type) {
				let res = await uni.ajax.community_vote({
					id: id,
					vote_type:vote_type
				})
				if(res){
					this.list[index].is_vote=1;
					this.list[index].vote_count=this.list[index].vote_count+1;
					this.set_percentage();
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.vote-box {
		margin-top: 24rpx;
		background: #F6F6F6;
		border-radius: 8rpx;
		padding: 24rpx;

		.vote {
			border: 1px solid #E7E7E7;
			height: 68rpx;
			width: 100%;
			margin-bottom: 24rpx;
			background: #fff;
			border-radius: 8rpx;
			position: relative;
			padding-right: 22rpx;
			box-sizing: border-box;
			
			.vote-p{
				position: absolute;
				left: 0rpx;
				top: 0rpx;			
				height: 100%;
				background-color: #EDEDED;
			}

			.vote-s {
				position: relative;
				z-index: 2;
				padding-left: 22rpx;
				box-sizing: border-box;
				font-size: 24rpx;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-left: 5rpx;
				}
			}

			.t1 {
				font-size: 24rpx;
				position: relative;
				z-index: 2;
			}
		}

		.active {
			border: 1px solid #A7CEEC;

			.vote-p {
				background: #D4E4F3;
			}
		}

		.vote:last-child {
			margin-bottom: 0rpx;
		}
	}
</style>