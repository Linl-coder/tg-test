
//获取设备id
 function device_id() {
	 // #ifdef APP-PLUS
	 plus.device.getInfo({
	 	success: (res) => {
	 		if (res.uuid) {
	 			uni.deviceId = res.uuid;
	 		}else{
				uni.deviceId="unknown"
			}
	 	}
	 })
	 // #endif
	
}

device_id();

uni.guid=guid();


