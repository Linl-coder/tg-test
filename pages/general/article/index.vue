<template>
	<view class="index" :style="{ backgroundColor: isBlack ? '#000' : '#fff' }">
		<view class="u-content" :style="{ color: isBlack ? '#fff' : '#000' }">
			<u-parse :content="ritchtext"></u-parse>
		</view>
		<iloading :result="result"></iloading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				ritchtext: '',
				pagetype: '',
				id: '',
				result: 1,
				isBlack: false
			};
		},
		onLoad(query) {
			if (query.type) {
				this.type = query.type;
			}
			if (query.id) {
				this.id = query.id;
			}
			this.pagetype = query.pagetype;
			let title = '';
			switch (query.pagetype) {
				case 'agreement':
					if (this.type == 1) {
						title = this.$t('acticle.userAgreement');
					}
					if (this.type == 2) {
						title = this.$t('acticle.privacyPolicy');
					}
					break;
				case 'about':
					this.isBlack = true;
					title = this.$t('acticle.about');
					break;
				case 'kefu':
					title = this.$t('acticle.questionDetail');
					break;
				case 'invite':
					this.isBlack = true;
					title = this.$t('acticle.inviteRules');
					break;
				case 'gonghui':
					title = this.$t('acticle.guildMethod');
					break;
				case 'introduce':
					title = query.pagename;
					break;
				case 'integral':
					title = this.$t('acticle.scoreRules');
					break;
				case 'playing_method':
					title = this.$t('acticle.gameplayGuide')
					break;
				case 'f_introduce':
					title = query.pagename;
					break;
				case 'protocol':
					title = this.$t('login.protocolTitle')
					break;
				default:
					break;
			}
			uni.setNavigationBarTitle({
				title: title
			});
			this.get_info();
		},
		onShow() {
			if (this.isBlack) {
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#000',
				})
			}
		},
		methods: {
			async get_info() {
				let res = null;
				if (this.pagetype == 'gonghui' || this.pagetype == 'agreement' || this.pagetype == 'about' ||
					this.pagetype == 'invite' || this.pagetype == 'integral' || this.pagetype == 'playing_method' ||
					this.pagetype == 'protocol'
				) {
					res = await uni.ajax.public_getPactInfo({
						type: this.type
					});
					if (res) {
						this.ritchtext = uni.utils.turnhtml(res.data);
					}
				}
				if (this.pagetype == 'kefu') {
					res = await uni.ajax.public_faqgetDetail({
						id: this.id
					});
					if (res) {
						this.ritchtext = uni.utils.turnhtml(res.data.content);
					}
				}

				if (this.pagetype == 'introduce') {
					res = await uni.ajax.shop_introduce({
						mine_id: this.id
					});
					if (res) {
						this.ritchtext = uni.utils.turnhtml(res.data.content);
					}
				}
				if (this.pagetype == 'f_introduce') {
					this.ritchtext = uni.utils.turnhtml(uni.getStorageSync("f_introduce").content);
				}
				this.result = 4;
			}
		}
	};
</script>

<style lang="scss" scoped>
	// page {
	// 	background-color: #fff;

	// }

	.index {
		width: 100%;
		/* #ifndef H5  */
		min-height: calc(100vh);
		/* #endif */
		/* #ifndef APP-PLUS */
		min-height: calc(100vh - 100rpx);
		/* #endif */
		//background: red;

		.u-content {
			padding: 24rpx;
			//background: red;
		}
	}
</style>