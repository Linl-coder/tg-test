uni.device = {
	prepare() {
		//#ifdef APP-PLUS
		if(uni.getStorageSync("is_shake")==true){
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
			       uni.vibrateShort()
			       break;
			    case 'ios':
			       var UIImpactFeedbackGenerator = plus.ios.importClass("UIImpactFeedbackGenerator");
			       var impact = new UIImpactFeedbackGenerator();
			       impact.init(2);
			       impact.impactOccurred();
			       break;
			    default:
			       break;
			}
		}
		//#endif 
	}
}