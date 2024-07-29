import store from "./../store/index.js"
uni.pro.uploadFile = (obj) => {
    uni.queue.push((callback) => {
        const originComplete = obj.complete
        obj.complete = (...args) => {
            callback()
            if(typeof originComplete === 'function') {
                originComplete(...args)
            }
        }
        uni.uploadFile(obj)
    })
}

uni.pro.navigateTo = (pageName, extras = {}) => {
	if(!uni.pro.allowPage(pageName)){
		return false;
	}
	// if(store.getters.get_user_info.is_cert!=1){
	// 	if(pageName.includes('collect')||pageName.includes('business')||pageName=='home/sale'){
	// 		uni.navigateTo({
	// 			url:"/pages/general/userinfo/certification"
	// 		})
	// 		return false;
	// 	}	
	// }
    let url = uni.url.getUrl(pageName, extras)
	
    return uni.navigateTo({
        url
    })
}
uni.pro.redirectTo = (pageName, extras = {}) => {
    let url = uni.url.getUrl(pageName, extras)
    return uni.redirectTo({
        url
    })
}

uni.pro.navigateBack = (delta = 1) => {
    uni.navigateBack({
        delta
    })
}

uni.pro.switchTab = (pageName) => {
    let url = uni.url.getUrl(pageName)
    return uni.switchTab({
        url
    })
}

uni.pro.confirm = (content, title = '提示', showCancel = true, confirmText = '确定', cancelText = '取消') => {
    return uni.showModal({ title, content, showCancel, cancelText, confirmText})
}
