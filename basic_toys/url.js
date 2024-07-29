const getUrl = (pageName, extras = null) => {
	let url = '/pages/' + pageName + '/index'
	
	if (pageName.indexOf('/pages') == 0) {
		url = pageName
	} else if(pageName.indexOf('/') != -1) {
		url = '/pages/' + pageName
	}
	
	if (url == uni.utils.getCurrentRoute()) {
		return
	}
	
    if (extras && JSON.stringify(extras) != '{}') {
        url += '?' + uni.utils.transformRequest(extras)
    }
    return url
}

const getPageName = url => {
    const matchs = url.match(/\/pages\/(.+)\/(.+)/i)
    if (matchs.length != 3) {
		throw new Error('not match')
    }
	
	if (matchs[2] == 'index') {
		return matchs[1]
	} else {
		return matchs[1] + '/' + matchs[2]
	}
}

uni.url = { 
    getUrl, 
    getPageName
}