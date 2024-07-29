uni.modal = {
	open(pageName, extras = {}) {
		if (pageName.indexOf('/pages') == 0) {
			throw new Error('error page name')
		}
		let eventName = pageName + '_modal_close'
		return new Promise((resolve, reject) => {
			uni.pro.navigateTo(pageName, extras).then(() => {
				uni.event.one(eventName, ({
					confirm,
					extras
				}) => {
					if(confirm) {
						resolve(extras)
					} else {
						reject(extras)
					}
				})
			}).catch(reject)
		})

	},

	close(pageName, extras = {}, confirm = true) {
		let modalResult = {
			confirm,
			extras
		}
		uni.event.fire(pageName + '_modal_close', modalResult);
	},
}