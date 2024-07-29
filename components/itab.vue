<template>
	<div class="itab">
		<!-- 自定义滑块背景 -->
		<u-tabs v-if="type==1" :list="tab_list" :current="current" lineWidth="20" @change="change" lineHeight="7"
			:lineColor="lineColor" :activeStyle="{
		         color: '#000',
		         fontWeight: 'bold',
		         transform: 'scale(1.05)',
				 fontSize:'32rpx'
		     }" :inactiveStyle="{
		         color: '#999999',
		         transform: 'scale(1)',
				 fontSize:'30rpx'
		     }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
		</u-tabs>

		<!-- 自定义tab -->

		<!-- <div class="tab_box flex-start" v-if="type==2"  >
			<div class="tab_item flex-center" @tap="change(index)" :class="{'tab_item_active':current==index}"
				v-for="(item,index) in tab_list" :key="index">
				<text class="tab_t">{{item.name}}</text>
			</div>
		</div> -->
		<view class="a" v-if="type==2">
			<view class="a_list"
				:class="[language === 'zh-CN' || language === 'zh-HK' ? 'fontSize_large' : 'fontSize_small', current == index ? 'a_list_active' : '']"
				@tap="change(index)" v-for="(item,index) in tab_list" :key="index">
				{{item.name}}
			</view>
		</view>

		<!-- 默认滑块 -->
		<div class="tab_box" v-if="type==3">
			<u-tabs :list="tab_list" :lineHeight="lineHeight" :lineColor="lineColor_" :activeStyle="{
		         color: 'var(--theme)',
				 fontSize:'32rpx',
				 
		     }" :inactiveStyle="{
		         color: '#999999', 
				 fontSize:'30rpx',
				 
		     }" :current="current" :itemStyle="{width: width,height:'88rpx',padding:'0rpx'}" @click="change"></u-tabs>
		</div>

		<!-- 		<view class="b" v-if="type==3">
			<view class="a_list" @click="change(index)" :class="current == index ? 'a_list_active':''" v-for="(item,index) in tab_list" :key="index">
				{{item.name}}
			</view>
		</view> -->
		<!-- 		<view class="e" v-if="type==3">
			<scroll-view scroll-x="true" class="e_scroll">
				<view class="e_list" :class="{'e_list_active':current == item.id}" v-for="(item,index) in tab_list" :key="index" @click="change(item)">
					{{item.name}}
				</view>
			</scroll-view>
		</view> -->
		<view class="b" v-if="type==4">
			<view class="a_list" @tap="change(index)" :class="current == index ? 'a_list_active':''"
				v-for="(item,index) in tab_list" :key="index">
				{{item.name}}
			</view>
		</view>
		<!-- 		<div class="tab_box flex-start" v-if="type==4"  >
			<div class="tab-item-one flex-center" @tap="change(index)" :class="{'tab-item-active':current==index}"
				v-for="(item,index) in tab_list" :key="index">
				<text class="tab-t">{{item.name}}</text>
			</div>
		</div> -->

	</div>
</template>

<script>
	// #ifdef H5
	const lineBg =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAUCAYAAADC1B7dAAAAAXNSR0IArs4c6QAABLZJREFUWEfNWFtoXFUUXevMRNNkakZQm9CIlX400BD60aLgIwlSihRtRavVPJwPNRaF1A9BkGI+/FE/Wj8kKFQTU5OChBZMhWJDglSx+pHiA1Ko2Dbah7E1j0kyNDN3y3nd3JmkoSrauYSZm3P2PXets9de+yQEgBckVaMg7xB8CEAWwCCgXuvkh6f0fLFdGm8MeBvAZkCyAI95vHST3wJICMRgJ0hA0kBsY7GRsnjlOwHLCRjE+htAGlCbuEuePQRwm8uCmzOBQsiRTnY/UkwZ2iWpQwA8XrP/AhGdBIEMaELTjq0nIxHWmU52lRUZoSkAK+2G2+T4ewJzfH4+dVUgcQtaKw3UgtNxWoIzc1fv6Lul749iIJX6M5WMJ+SKQUpqgAYvaO40+hxb0qlzEKkOAZsAW0w2iq8cSHS9WwyEmidb26m415KgTowl5C/FMe74vfUzEFttdrQUnTO4IBHMSI739ld1/3QjST1+PlWj4jICys0QpyFKpDyMuo7w0bHWdgH25oGV0OmMMyDgJQGaB+7qHrwRpB4ea6mPBzwIhVWhETsBRc1MQV5mw0gqWVIe/AJIhdZXfoZsVo2LAxnJ4b3sBbVnuLEr838Q09jiK4LXSdkNImZxWAswjcVZtm02yIiaqzJIH/yh+Q0E7LBRJj36w5DTSfV+70hcFOFb6StT3ScbD0/8F8Q2jGxPJphoo2I7iUoLyRuA9QLaOvLepbG++WVdzx4Tt2aooXRV+Z0jAqxzO2ALLVpPoVmEpp4JAukPRA0Emamj/5bchqHtyfiKsnogtlMp02dKI5tlkehP52oWjr0IOX1p5te6M43DmdAh6oZaahHD1xBZGT7oPIRCirNGU5DeJv24IAfBjznBcSiOIofTitmz07PZCZSNT+gX+Y27CVWJGOKVSrCaMdZAgloFbKTiehEpKTQlDzksGf9+IxzzMw0lm76//4A5pi1YHoCaL57ZEojSnTi6O2F6bUc2qgxrLU+O0XF3X6Bzs5Y2mkXrRMcjPcTYk7dmr5iFtTOKwWOjm3uP+kfyCOnBtZ833TefVX2AVNuXi+gMaRohuIKisgXq6s9tk3kmrEGdYdfWHDh/XAlj/CKmXzpBhScauwm2epwDExdF5Ilz2z75KlrHiwjpydX9TdW5HHoEqM/vShGTdNZS6BgOi+XuNZ9vsVEVhbVqCr+gMBCAUKZuvJr83WAWsdTlJz/+rdCUliTkg27taW4LAukAUOnGPA1/znWg3bDLyhK0HaDQr2xIoZQK0UUk7KYmEJdXJ5t69xeGXlNyiwLf31GRiJfsFuAlgreHefeozZlqQQqRk687X7mubvC7wMhLzMFRS1vXZ2QtswPud4KTAWTfbHZ+H9o+nbwWmUWmsFwgPmooLZeqpxjwRSHucU3AgDT3kYL14KJZWIpMFPTCDvtjjVn6mwDYP1sSO4jWnpll8UVkcT1xeTGlnTvXqBJuoeJWCh8AURFmKc8bzN8orq8vzpDPzsLiMi7gCYgcywGHM8/1nv274JatoetdLPHB0+tBVQtKLRTXIpC7Ad4GskIgSRJxKyvMk0hDcBmQcVCdCYLgZxKjzMnJ9PkLp9AxrP8F8I+vvwDmGTt4BsP7GwAAAABJRU5ErkJggg==";
	// #endif
	export default {
		props: {
			language: {
				type: String,
				default: ""
			},
			position: {
				type: String,
				default: ""
			},
			lineColor_: {
				type: String,
				default: "#000"
			},
			tab_list: {
				type: Array,
				default () {
					return []
				}
			},
			current: {
				type: Number,
				default: 0
			},
			type: {
				type: Number,
				default: 1
			},
			width: {
				type: String,
				default: ""
			},
			lineHeight: {
				type: Number,
				default: 4
			}
		},
		created() {
			// #ifdef APP-PLUS
			this.lineColor = "#0C9D5B";
			// #endif
			// #ifdef H5
			this.lineColor = `url(${lineBg}) 100% 100%`;
			// #endif
		},
		methods: {
			change(e) {
				if (this.type == 1 || this.type == 2 || this.type == 3) {
					this.$emit("change", e)
				} else {
					this.$emit("change", {
						name: this.tab_list[e].name,
						index: e
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.e {
		padding: 12rpx 32rpx;

		.e_scroll {
			width: 100%;
			white-space: nowrap;
		}

		.e_list {
			display: inline-block;
			margin-right: 16rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #717171;
			padding: 12rpx 24rpx;
			border-radius: 82rpx;
			background: #e9e7e7;
			// border: 2rpx solid #999999;
		}

		.e_list_active {
			font-weight: 500;
			color: #FFFFFF;
			font-size: 26rpx;
			background: #1777FF;
			border: none;
		}
	}

	.b {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 40rpx;

		.a_list {
			font-size: 24rpx;
			font-weight: bold;
			color: #999999;
			// margin-right:48rpx;
			//font-family: PingFang SC-Bold, PingFang SC;
		}

		.a_list_active {
			position: relative;
			color: #1A1818;
			z-index: 1;
			font-size: 32rpx;
		}

		.a_list_active::after {
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: -1;
			content: '';
			width: 100%;
			height: 12rpx;
			background-color: #93CA86;
		}
	}

	.a {
		display: flex;
		//text-align: center;
		// align-items: center;

		// justify-content: center;
		.a_list {
			//font-size: 24rpx;
			font-weight: 400;
			color: #999;
			// margin: 0 24rpx;
			margin-right: 40rpx;
		}

		.fontSize_large {
			font-size: 30rpx;
		}

		.fontSize_small {
			font-size: 24rpx;
		}

		.a_list_active {
			font-weight: 500;
			color: var(--theme);
		}
	}

	.tab_a {
		.a {
			display: flex;
			align-items: center;

			// justify-content: center;
			.a_list {
				font-size: 32rpx;
				font-weight: 400;
				color: #FFFFFF;
				// margin: 0 24rpx;
				margin-right: 40rpx;
			}

			.a_list_active {
				font-size: 34rpx;
				font-weight: 600;
				color: #ffffff;
			}
		}
	}

	.itab {
		display: flex;
		// justify-content: center;

		.tab_box {
			.tab_item {
				padding: 0rpx 34rpx;
				height: 76rpx;
				border-radius: 8rpx;
				opacity: 1;
				background-color: #f5f5f5;
				margin: 0rpx 16rpx;
				box-sizing: border-box;

				.tab_t {
					font-size: 28rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000;
					line-height: 33rpx;
				}
			}

			.tab_item_active {
				border: 0rpx;
				background: #000 !important;

				.tab_t {
					font-weight: bold;
					color: #fff;
				}
			}

			.tab-item-one {
				width: 212rpx;
				height: 88rpx;
				opacity: 1;
				box-sizing: border-box;

				.tab-t {
					font-size: 28rpx;
					//font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #000;
					line-height: 33rpx;
				}
			}

			.tab-item-active {
				border: 0rpx;
				background: #FFFFFF;
				border-radius: 24rpx 24rpx 0rpx 0rpx;

				.tab-t {
					font-weight: bold;
					color: #000;
				}

			}


		}

		.tab_box_active {
			justify-content: space-between !important;

			.tab_item {
				margin-right: 0rpx;
			}
		}

	}
</style>