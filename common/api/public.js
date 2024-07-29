export default {
	public_getAgentInfo({
		user_code
	}) { //获取某人的代理信息
		return uni.api.get("api/agent/get-agent-info-by-code", {
			user_code
		}, false);
	},
	public_setMyParentCode({
		user_code
	}) { //设置我的上级信息
		return uni.api.post("api/user/set-my-parent-info", {
			user_code
		}, false);
	},
	public_getUserSignRecord({
		limit,
		page
	}) { //获取用户签到记录
		return uni.api.get("/api/ad-sign/get-sign-record-by-uid", {
			limit,
			page
		}, false);
	},
	public_hanleSignIn() { //签到
		return uni.api.post("api/ad-sign/sign-in", {}, false);
	},
	public_haveSeeAds() { //记录看广告
		return uni.api.post("api/ad-sign/view-ad-operate", {}, false);
	},
	public_getSignConfig() { //获取广告签到配置
		return uni.api.get("api/ad-sign/get-ad-sign-config", {}, false);
	},
	public_getUserSignInfo() { //获取用户签到信息
		return uni.api.get("api/ad-sign/get-user-ad-sign-info", {}, false);
	},
	public_getmyParentInfo() { //获取我的上级信息
		return uni.api.get("api/user/get-my-parent-info", {}, false);
	},
	public_getCustomerInfo() { //获取客服信息
		return uni.api.get("api/config/get-customer-service-info", {}, true);
	},
	public_getCompanyCode({
		package_name
	}) { //获取companyCode
		return uni.api.get("api/config/get-company-code-info", {
			package_name
		}, true);
	},
	public_userLogout() { //退出登录
		return uni.api.post("api/user/logout", {}, false);
	},
	public_getOnlineInfo() { //获取在线用户信息
		return uni.api.post("api/config/get-online-user-info", {}, false);
	},
	public_getExamConfig() { //获取审核开关配置信息
		return uni.api.get("api/config/get-examine-switch-config", {}, true);
	},
	public_getExamInfo() { //获取审核开关配置信息
		return uni.api.get("api/config/get-examine-switch-info", {}, true);
	},
	//注销账号（fake）
	public_cancelAccount() {
		return uni.api.post("api/user/cancel-account", {}, false);
	},
	public_getMineIncomeInfo() { //获取矿洞几张卡可以挖多少宝石数量信息
		return uni.api.get("api/config/get-mine-rate-info", {}, false);
	},
	public_passwordLogin({
		mobile,
		password,
		device_sn,
		device_info
	}) { //账号密码登录
		return uni.api.post("api/login/passwordLogin", {
			mobile,
			password,
			device_sn,
			device_info
		}, true);
	},
	public_smsLogindLogin({
		mobile,
		sms_code
	}) { //短信登录
		return uni.api.post("api/login/smsLogin", {
			mobile,
			sms_code
		}, true);
	},
	public_createVerifyCode({
		is_img
	}) { //获取图形验证码 是否直接显示图片 1是 2否
		return uni.api.get("api/code/createVerifyCode", {
			is_img
		}, false);
	},
	public_forgertPassword({
		password,
		repassword,
		tel,
		vcode
	}) { //忘记密码
		return uni.api.post("api/login/retrieve-password", {
			password,
			repassword,
			tel,
			vcode
		}, true);
	},
	public_sendEmailVerifyCode({
		email,
		type
	}) { //发送邮箱验证码 1为注册场景,2为找回登录密码,3为找回支付密码
		return uni.api.post("api/login/send-email-vcode", {
			email,
			type
		}, true);
	},
	public_sendPhoneVerifyCode({
		tel,
		type,
		device_sn
	}) { //发送短信验证码 1登录 2修改手机号 3修改密码 4注册
		return uni.api.post("api/login/get-vcode", {
			tel,
			type,
			device_sn
		}, true);
	},
	public_modifyLoginPassword({
		password,
		repassword,
		vcode,
		ori_password
	}) { //修改登录密码
		return uni.api.post("api/user/modifyLoginPassword", {
			password,
			repassword,
			vcode,
			ori_password
		}, true);
	},
	public_modifyLoginPayPassword({
		pay_password,
		repassword,
		vcode,
		password
	}) { //修改二级密码
		return uni.api.post("api/user/modifyLoginPayPassword", {
			pay_password,
			repassword,
			vcode,
			password
		}, true);
	},
	public_setmodifyInfo({
		nickname,
		user_sex,
		birthday
	}) { //修改昵称/性别/生日（不改的字段为空）
		return uni.api.post("api/user/modifyInfo", {
			nickname,
			user_sex,
			birthday
		}, true);
	},
	public_bindTel({
		tel,
		vcode
	}) { //修改昵称/性别/生日（不改的字段为空）
		return uni.api.post("api/user/bind-tel", {
			tel,
			vcode
		}, true);
	},

	public_register({
		nickname,
		tel_area_code,
		mobile,
		email,
		email_code,
		password,
		sms_code,
		user_code,
		pay_password,
		pool_id,
		device_sn,
		device_info,
		vcode

	}) { //注册
		return uni.api.post("api/login/register", {
			nickname,
			tel_area_code,
			mobile,
			email,
			email_code,
			password,
			sms_code,
			user_code,
			pay_password,
			pool_id,
			device_sn,
			device_info,
			vcode
		}, true);
	},
	public_getlist({
		site_id,
		page,
		limit
	}) { //获取轮播图
		return uni.api.get("api/poster/getlist", {
			site_id,
			page,
			limit
		}, true);
	},
	public_adgetCate() { //获取栏目
		return uni.api.get("api/affiche/getCate", {}, false);
	},
	public_adgetCateList() { //获取平台公告列表
		return uni.api.get("api/affiche/get-cate-list", {}, false);
	},
	//获取用户消息列表
	public_getUserMsgList({
		page,
		limit

	}) {
		return uni.api.get("api/user/get-msg-list", {
			page,
			limit
		}, false);
	},
	//消息详情
	public_getMsgDetail({
		id
	}) {
		return uni.api.get("api/user/msg-detail", {
			id
		}, false);
	},
	//获取公告列表
	public_adgetList({
		cate_id,
		limit,
		page,
		keywords
	}) {
		return uni.api.get("api/affiche/getList", {
			cate_id,
			limit,
			page,
			keywords
		}, false);
	},
	//公告详情
	public_adgetDetail({
		id
	}) {
		return uni.api.get("api/affiche/getDetail", {
			id
		}, false);
	},
	public_adgetNew() { //获取最新公告
		return uni.api.get("api/affiche/getNew", {}, false);
	},
	public_getNewAnnouce() { //获取最新公告
		return uni.api.get("api/affiche/get-last-info", {}, false);
	},
	public_applyCert({
		username,
		number
	}) { //实名认证
		return uni.api.post("api/user/cert/applyCert", {
			username,
			number
		}, true);
	},
	public_getUserInfo() { //个人信息
		return uni.api.get("api/user/getUserInfo", {}, false);
	},
	public_getBalanceLogList({
		limit,
		page
	}) { //余额记录
		return uni.api.get("api/user/getBalanceLogList", {
			limit,
			page
		}, false);
	},

	/**
	 * 留言板 user/get-message-board-my-msg user/leave-message
	 */
	public_leaveMessage({
		content
	}) {
		return uni.api.post("api/user/leave-message", {
			content
		}, false);
	},
	public_getMessageList({
		page,
		limit
	}) {
		return uni.api.get("api/user/get-message-board-my-msg", {
			page,
			limit
		}, false);
	},

	/**
	 * 交易所
	 */
	// 获取某个用户上榜信息
	getItemApplyInfo({
		uuid
	}) {
		return uni.api.get("api/exchange/get-cancel-member-apply-info", {
			uuid
		}, false);
	},
	// 获取交易列表
	public_getExchangeList({
		type,
		tradet_type,
		page,
		limit,
		sort_type
	}) {
		return uni.api.get("api/exchange/get-exchange-list", {
			type,
			tradet_type,
			page,
			limit,
			sort_type
		}, false);
	},
	// 申请上榜
	public_applyExchangeMember({
		pledge_food_num,
		contact_telephone
	}) {
		return uni.api.post("api/exchange/apply-exchange-member", {
			pledge_food_num,
			contact_telephone
		}, false);
	},
	// 发布修改交易信息
	public_publishExchangeList({
		id,
		region_coin_price,
		usdt_price,
		merchant_name,
		tradet_num,
		type,
		tradet_type
	}) {
		return uni.api.post("api/exchange/publish-exchange-info", {
			id,
			region_coin_price,
			usdt_price,
			merchant_name,
			tradet_num,
			type,
			tradet_type
		}, false);
	},
	// 获取当前用户上榜信息
	public_getMyExchangeMemberInfo() {
		return uni.api.get("api/exchange/get-my-exchange-member-info", {}, false);
	},
	// 获取我发布的交易信息
	public_getMyExchangeInfo({
		type,
		tradet_type
	}) {
		return uni.api.get("api/exchange/get-my-exchange-info", {
			type,
			tradet_type
		}, false);
	},
	// 申请取消上榜
	public_applyCancelExchangeMember() {
		return uni.api.post("api/exchange/apply-cancel-exchange-member", {}, false);
	},
	// 获取取消上榜信息
	public_getCancelExchangeMemberApply() {
		return uni.api.get("api/exchange/get-cancel-exchange-member-apply", {}, false);
	},
	// 获取上榜信息
	// public_getApplyExchangeMemberInfo() {
	// 	return uni.api.get("api/exchange/get-my-exchange-member-info", {}, false);
	// },
	// 删除上架商品
	public_delExchangeInfo({
		id
	}) {
		return uni.api.post("api/exchange/del-exchange-info", {
			id
		}, false);
	},
	/**
	 * 活动
	 */
	public_activeGetList({
		limit,
		page,
		active_type,
		sort,
		keywords
	}) { //活动列表
		return uni.api.get("api/active/getList", {
			limit,
			page,
			active_type,
			sort,
			keywords
		}, false);
	},
	public_activeGetDetail({
		id
	}) { //普通活动详情
		return uni.api.get("api/active/getDetail", {
			id
		}, false);
	},

	/**
	 * 抽奖
	 */
	public_drawgetDetail({
		with_id,
		id
	}) { //抽奖详情
		return uni.api.get("api/draw/getDetail", {
			with_id,
			id
		}, false);
	},
	public_draw({
		with_id,
		id,
		num
	}) { //抽奖
		return uni.api.post("api/draw/draw", {
			with_id,
			id,
			num
		}, false);
	},
	public_getLog({
		limit,
		page,
		with_id,
		id
	}) { //抽奖
		return uni.api.get("api/draw/getLog", {
			limit,
			page,
			with_id,
			id
		}, false);
	},
	/**
	 * 常见问题
	 */
	public_faqgetCate() { //常见问题分类
		return uni.api.get("api/article/faq/getCate", {}, false);
	},
	public_faqgetFaqList({
		page,
		limit,
		keywords,
		cate_id
	}) { //常见问题列表
		return uni.api.get("api/article/faq/getFaqList", {
			page,
			limit,
			keywords,
			cate_id
		}, false);
	},
	public_faqgetDetail({
		id
	}) { //常见问题详情
		return uni.api.get("api/article/faq/getDetail", {
			id
		}, false);
	},
	/**
	 * 基本配置
	 */
	public_getSmsConfig() { // 获取短信配置
		return uni.api.get("api/config/getSmsConfig", {}, false);
	},
	public_getPactInfo({
		type
	}) { //获取平台协议1用户协议 2隐私政策  3注销协议
		return uni.api.get("api/config/getPactInfo", {
			type
		}, false);
	},
	public_getSiteInfo() { //获取网站信息
		return uni.api.get("api/config/getSiteInfo", {}, false);
	},
	public_modifyAvatar({
		avatar
	}) { //修改头像
		return uni.api.post("api/user/modifyAvatar", {
			avatar
		}, true);
	},
	public_follow({
		id
	}) { //关注/取消
		return uni.api.post("api/affiche/follow", {
			id
		}, true);
	},
	public_followgetLog({
		page,
		limit
	}) { //我的关注
		return uni.api.get("api/affiche/getLog", {
			page,
			limit
		}, false);
	},
	public_getFrom({
		page,
		limit
	}) { //下级列表
		return uni.api.get("api/user/getFrom", {
			page,
			limit
		}, false);
	},
	public_push({
		files,
		text
	}) { //反馈
		return uni.api.post("api/user/message/push", {
			files,
			text
		}, true);
	},
	public_pushGetList({
		page,
		limit
	}) { //反馈记录
		return uni.api.get("api/user/message/getList", {
			page,
			limit
		}, false);
	},
	public_modifyInfo({
		is_possess,
		is_sale,
		is_possess_num
	}) { //隐私设置
		return uni.api.post("api/user/modifyInfo", {
			is_possess,
			is_sale,
			is_possess_num
		}, false);
	},
	public_getProgramConfig() { //市场、社区、寄售配置信息
		return uni.api.get('api/config/getProgramConfig', {}, false)
	},
	public_updateLoginTime({
		device_sn,
		device_info
	}) { //上传登录时间
		return uni.api.post('api/config/get-server-timestamp', {
			device_sn,
			device_info
		}, true)
	},
	public_getUpdateConfig() { //获取App 版本更新配置
		return uni.api.post('api/config/version', {}, false)
	},
	public_getversionConfig() { //获取App 版本信息
		return uni.api.get('api/config/getversionConfig', {}, false)
	},

}