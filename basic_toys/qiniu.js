function upload({
	url,
	token,
	filePath
}) {
	return new Promise((resolve, reject) => {
		return uni.pro.uploadFile({
			url,
			filePath,
			name: 'file',
			formData: {
				token
			},
			success: res => {
				if(res.statusCode < 400) {
					let obj = JSON.parse(res.data)
					return resolve(obj)
				} else {
					return reject(res)
				}
			},
			fail: err => {
				reject(err)	
			}
		})
	})
}

uni.qiniu = {
    upload
}