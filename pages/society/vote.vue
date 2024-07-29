<template>
	<view class="vote">
		<view class="form-box">
			
			<view class="form flex-start" v-for="(item,index) in option" :key="index">
				<view class="i_input flex-start">
					<u--input placeholder="请输入投票选项" border="none" v-model="item.title"></u--input>
				</view>
				<image src="/static/community/i12.png" @tap="reduce_question(index)" class="icon" mode=""></image>
			</view>
			<view class="form form-add flex-start" @tap="add_question">
				<image src="/static/community/i13.png" class="icon" mode=""></image>
				<text class="t1">添加选项</text>
			</view>
		</view>
		<view class="time-box">
			<view class="flex-between"  @tap="show=true">
				<view class="flex-start">
					<image src="/static/community/i13.png" class="icon" mode=""></image>
					<text class="t1">截至时间</text>
				</view>
				<view class="flex-end">
					<text class="t2">{{time}}</text>
					<u-icon name="arrow-right" size="20" color="#000"></u-icon>
				</view>
			</view>

			<view class="btn flex-center" @tap="save">
				完成
			</view>
		</view>

		<u-datetime-picker @confirm="confirm" @cancel="cancel" :show="show" v-model="value1" mode="datetime"></u-datetime-picker>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				time:"",
				option:[
					{
						title: "",
						forum_type:2
					},
					{
						title: "",
						forum_type:2
					}
				],
				value1:Number(new Date()),
			}
		},
		onLoad(query) {
			if(query.type=='edit'){
				let info=uni.getStorageSync('vote_data')
				this.option=info.list;
				this.time=info.time;
			}
		},
		methods:{
			cancel(){
				this.show=false;
			},
			confirm(e){
				this.time=uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM');
				this.cancel();
			},
			add_question(){
				this.option.push({
					title:"",
					forum_type:2
				})
			},
			reduce_question(index){
				this.option.splice(index,1);
			},
			async save(){
				await uni.utils.is_null(this.time, "请设置投票截止时间");
				uni.setStorageSync("vote_data",{
					time:this.time,
					list:this.option
				});
				this.toback();
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;

		.time-box {
			padding: 32rpx;
			border-top: 30rpx solid #F5F5F5;

			.icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 16rpx;
			}

			.t1 {
				font-size: 28rpx;
				//font-family: font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 500;
				color: #000000;
			}

			.t2 {
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}

			.btn {
				height: 96rpx;
				background: url('@/static/else/old01.png') no-repeat 100%;
				border-radius: 24rpx;
				color: #fff;
				margin-top: 68rpx;
				font-size: 30rpx;
			}
		}

		.form-box {
			padding: 32rpx 32rpx 0rpx 32rpx;

			.form {
				margin-bottom: 24rpx;

				.i_input {
					height: 88rpx;
					background: #F7F7F7;
					border-radius: 16rpx;
					padding-left: 16rpx;
					width: 80%;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-left: 16rpx;
				}

				.t1 {
					padding-left: 16rpx;
					font-size: 28rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				}
			}

			.form-add {
				margin-bottom: 0rpx;
				height: 88rpx;
			}
		}
	}
</style>
