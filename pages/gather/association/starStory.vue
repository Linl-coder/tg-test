<template>
	<view class="index">
		<view class="container">
			<!-- @click="topage('gather/association/echartsTest')" -->
			<p>
				Jewel Jungle Coin (JJC) Metaverse Moguls:
				<br />
				Mining for Profit & Collectibles
			</p>
			<p>{{$t('starStory.tip1')}}
			</p>
			<p>{{$t('starStory.tip2')}} </p>
			<p>{{$t('starStory.tip8')}}</p>
			<p>{{$t('starStory.tip9')}}</p>
			<p>{{$t('starStory.tip10')}}</p>
			<p>{{$t('starStory.tip3')}}
			</p>
			<p>{{$t('starStory.tip4')}}</p>
			<p>{{$t('starStory.tip12')}}</p>
			<p>{{$t('starStory.tip11')}}</p>
			<p>
				{{$t('starStory.tip5')}}
			</p>
			<p>{{$t('starStory.tip6')}}</p>
			<p>{{$t('starStory.tip7')}}</p>
			<!-- <p>Jewel Jungle Coin (JJC) Metaverse Moguls: Mining for Profit & Collectibles</p>
			<p>理由：强调JJCoin在元宇宙中的领导者地位，玩家通过挖矿获得利润和收藏品，打造独特的潮玩IP。“Jewel”意为宝石，代表价值和稀有性；“Jungle”代表未知的冒险和挑战，与链游挖矿的主题相符。 -
				挖矿逐利与收藏传奇</p>
			<p>在不久的未来，一个全新的Web3游戏世界“Jewel Jungle”诞生了。在这个世界中，有一个独特的数字货币——Jewel Jungle
				Coin（JJC），它不仅是游戏中的交易媒介，更是玩家身份的象征和权力的标志。</p>
			<p>“Jewel”寓意着珍贵与稀有，正如游戏中的JJC一样，每一枚都是限量发行，稀有度高，价值无法估量。而“Jungle”则象征着未知与冒险，玩家在游戏中挖矿，就像是探险家一样，在未知的丛林中寻找宝藏。</p>
			<p>在这个世界中，有一群特殊的玩家，他们被称为“Metaverse
				Moguls”。他们是游戏中的佼佼者，不仅拥有高超的游戏技巧，还具备卓越的商业头脑。他们通过挖矿，不仅获得了丰厚的游戏利润，还收集到了许多珍稀的收藏品。</p>
			<p>挖矿在“Jewel
				Jungle”中是一项至关重要的活动。玩家需要利用自己的智慧和技巧，在虚拟世界中寻找那些隐藏在深处的矿石和宝藏。每一次成功的挖矿，都会为玩家带来大量的JJC和珍稀的收藏品。这些收藏品不仅具有极高的游戏价值，还可以作为独特的潮玩IP，在现实世界中进行交易和收藏。
			</p>
			<p>然而，挖矿并不是一件容易的事情。玩家需要面对恶劣的环境、危险的敌人和未知的挑战。但是，正是这些挑战和冒险，让挖矿变得更加刺激和有趣。玩家们通过团队合作、策略规划和技巧运用，成功地攻克了一个又一个的难关，成为了真正的“Metaverse
				Moguls”。</p>
			<p>在“Jewel Jungle”这个充满未知和可能性的世界里，每一位玩家都有机会成为“Metaverse
				Moguls”的一员。他们用自己的智慧和勇气，创造了一个又一个的传奇故事。而JJC和珍稀的收藏品，就是他们成功和荣耀的最好见证</p> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {


		},
		onShow() {

			uni.setNavigationBarTitle({
				title: this.$t('starStory.title')
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@mixin backImg {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.index {
		width: 100%;
		min-height: 100vh;


		.container {
			width: 100%;
			height: 9000rpx;
			background: url('/static/else/story_bg.jpg');
			@include backImg;
			padding: 20rpx;
			color: #fff;
			position: relative;
			font-size: 26rpx;



			p:nth-child(2) {
				font-size: 26rpx;
				margin-top: 550rpx;
			}

			p:nth-child(3) {
				margin-top: 600rpx;
			}

			p:nth-child(4) {
				margin-top: 200rpx;
			}

			p:nth-child(5) {
				margin-top: 160rpx;
			}

			p:nth-child(6) {
				margin-top: 205rpx;
			}

			p:nth-child(7) {
				margin-top: 105rpx;
			}

			p:nth-child(8) {
				margin-top: 300rpx;
			}

			p:nth-child(9) {
				margin-top: 160rpx;
			}

			p:nth-child(10) {
				margin-top: 140rpx;
			}

			p:nth-child(12) {
				margin-top: 500rpx;
			}

			p:nth-child(13) {
				position: absolute;
				bottom: 800rpx;
				left: 50%;
			}
		}

	}
</style>