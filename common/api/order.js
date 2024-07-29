export default {

	/*
	 * 获取订单详情
	 */
	handleCancelOrder({
		order_id
	}) {
		return uni.api.post('api/goods/order-cancel', {
			order_id
		}, false)
	},


	/*
	 * 获取订单详情
	 */
	getOrderDetails({
		order_id
	}) {
		return uni.api.post('api/goods/order-detail', {
			order_id
		}, false)
	},

	/*
	 * 商品下单操作
	 */
	placeOrder({
		goods_id,
		num,
		address_id,
		use_food_num
	}) {
		return uni.api.post('api/goods/commit-order', {
			goods_id,
			num,
			address_id,
			use_food_num
		}, false)
	},

	/*
	 * 获取我的订单列表(最新)
	 */
	getOrderList({
		page,
		limit,
		status
	}) {
		return uni.api.get('api/goods/get-order-list', {
			page,
			limit,
			status
		}, false)
	},

	/**
	 * 获取应用总的运营天数 和 所有注册人数的宝石数量
	 */
	agentUseCard({
		card_num,
		pool_id
	}) { //商品详情列表
		return uni.api.post('api/user/card-transfer', {
			card_num,
			pool_id
		}, false)
	},

	/**
	 * 获取应用总的运营天数 和 所有注册人数的宝石数量
	 */
	getSpaceInfo() { //商品详情列表
		return uni.api.get('api/user/get-space-info', {}, true)
	},

	/**
	 * 第三方支付
	 */
	addSunpay4vi({
		id,
		goods_price,
		pay_type,
		bank_code,
		typeStr
	}) { //商品详情列表
		return uni.api.post('api/goods/pay-commit', {
			id,
			goods_price,
			pay_type,
			bank_code,
			typeStr
		}, false)
	},

	/**
	 * 获取 商品详情列表
	 */
	getGoodsDetailsList({
		id
	}) { //商品详情列表
		return uni.api.post('api/goods/goods-detail', {
			id
		}, false)
	},
	/**
	 * 获取首页商品列表
	 * is_examine 是否获取审核商品 1为是 0为否 默认为0
	 */
	getGoodsList({
		page,
		limit,
		is_examine
	}) { //商品列表
		return uni.api.get('api/goods/get-goods-list', {
			page,
			limit,
			is_examine
		}, false)
	},

	/**
	 * 兑换商城
	 */
	shop_exchangeGetlist({
		limit,
		page,
		product_type
	}) { //兑换列表
		return uni.api.get("api/product/getList", {
			limit,
			page,
			product_type
		}, false);
	},
	shop_exchangegetDetail({
		id
	}) { //兑换详情
		return uni.api.get("api/product/getDetail", {
			id
		}, false);
	},
	shop_exchangeBuy({
		id,
		num,
		address_id
	}) { //兑换
		return uni.api.post("api/product/buy", {
			id,
			num,
			address_id
		}, false);
	},
	shop_exchangegetLog({
		limit,
		page,
	}) { //兑换
		return uni.api.get("api/product/getLog", {
			limit,
			page
		}, false);
	},
	shop_addressGetlist({
		limit,
		page,
		type
	}) { //地址列表
		return uni.api.get("api/address/get-list", {
			limit,
			page,
			type
		}, false);
	},
	shop_addressAdd({
		name,
		phone,
		province,
		city,
		area,
		address,
		type
	}) { //添加地址
		return uni.api.post("api/address/add", {
			name,
			phone,
			province,
			city,
			area,
			address,
			type
		}, true);
	},
	shop_addressEdit({
		name,
		phone,
		province,
		city,
		area,
		address,
		id,
		type
	}) { //编辑地址
		return uni.api.post("api/address/edit", {
			name,
			phone,
			province,
			city,
			area,
			address,
			id,
			type
		}, true);
	},
	shop_addressDel({
		id
	}) { //删除
		return uni.api.post("api/address/del", {
			id
		}, true);
	},

	// 实物下单
	shop_addOrder({
		address_id,
		id,
		num
	}) {
		return uni.api.post('api/product/addOrder', {
			address_id,
			id,
			num
		}, true);
	},
	// 实物支付
	shop_payment({
		type,
		password
	}) {
		return uni.api.post('api/product/addPayment', {
			type,
			password
		}, true);
	},
	// 我的矿场
	shop_landList({
		page,
		limit,
		type,
		is_need_day_product
	}) {
		return uni.api.get('api/mine/getMyMine', {
			page,
			limit,
			type,
			is_need_day_product
		}, false)
	},
	// 矿场列表
	shop_mine_landList({
		page,
		limit
	}) {
		return uni.api.get('api/mine/landList', {
			page,
			limit
		}, false)
	},
	// 开垦土地
	shop_landLevel({
		mine_id
	}) {
		return uni.api.post('api/mine/develop', {
			mine_id
		}, true)
	},
	// 获取手续费信息
	getRateInfo({
		user_code
	}) {
		return uni.api.get('api/user/get-giv-rate-info', {
			user_code
		})
	},
	// 赠送宝石
	shop_givFood({
		user_code,
		num,
		pay_password
	}) {
		return uni.api.post('api/user/givTokens', {
			user_code,
			num,
			pay_password
		})
	},
	// 排行榜
	shop_foodRanking({
		page,
		limit
	}) {
		return uni.api.get('api/mine/rank', {
			page,
			limit
		}, false)
	},
	// 宝石排行榜
	getRanklist({
		page,
		limit
	}) {
		return uni.api.get('api/user/get-rank-list', {
			page,
			limit
		}, false)
	},
	// 设置自己的社交信息
	shop_setUserqqWechat({
		facebook,
		zalo,
		telegram,
		whatsapp,
		address,
		contact_telephone
	}) {
		return uni.api.post('api/user/modifyInfo', {
			facebook,
			zalo,
			telegram,
			whatsapp,
			address,
			contact_telephone
		})
	},
	// 获取好友列表
	shop_getUserList({
		limit,
		page,
		levels
	}) {
		return uni.api.get('api/user/getFrom', {
			limit,
			page,
			levels
		}, false)
	},
	// 好友矿场
	shop_getFriendMine() {
		return uni.api.get('api/mine/getFriendMine', {}, false)
	},
	// 好友宝石奖励
	shop_invitedNums() {
		return uni.api.get('api/user/frendsRawd', {}, false)
	},
	shop_getOrderList({
		page,
		limit,
		status
	}) { // 获取订单列表 new
		return uni.api.get("api/product/getOrderList", {
			page,
			limit,
			status
		}, true);
	},
	shop_setFinish({
		id
	}) { // 订单收货 new
		return uni.api.post("api/product/setFinish", {
			id
		}, true);
	},
	shop_setCancel({
		id
	}) { // 取消订单 new
		return uni.api.post("api/product/setCancel", {
			id
		}, true);
	},
	shop_givRecord({
		page,
		limit,
		type
	}) { // 转赠记录
		return uni.api.get("api/user/getGivLog", {
			page,
			limit,
			type
		}, false);
	},
	shop_addPayment({
		type,
		password
	}) { // 积分兑换商城支付 new
		return uni.api.post("api/product/addPayment", {
			type,
			password
		}, true);
	},
	shop_userFoodList({
		page,
		limit,
		type
	}) { // 宝石记录
		return uni.api.get("api/user/foodLogList", {
			page,
			limit,
			type
		}, false);
	},
	shop_userGoldList({
		page,
		limit
	}) { // 金币记录
		return uni.api.get("api/guild/userGoldList", {
			page,
			limit
		}, true);
	},

	// 公会
	// 创建公会
	shop_createGuild({
		guild_name,
		guild_mark,
		guild_image,
		id = '',
		type
	}) {
		return uni.api.post("api/guild/createGuild", {
			guild_name,
			guild_mark,
			guild_image,
			id,
			type
		}, true);
	},
	// 公会列表
	shop_guildList({
		page,
		limit
	}) {
		return uni.api.get("api/guild/guildList", {
			page,
			limit
		}, false);
	},

	// 我的公会
	shop_getInfo() {
		return uni.api.get("api/guild/getInfo", {}, false);
	},

	// 公会成员列表
	shop_groupMemberList({
		page,
		limit
	}) {
		return uni.api.get("api/guild/getUserList", {
			page,
			limit
		}, false);
	},
	// 加入公会
	shop_addGuild({
		guild_id
	}) {
		return uni.api.post("api/guild/addGuild", {
			guild_id
		}, true);
	},
	// 公会仓库
	shop_guildPropList({
		page,
		limit
	}) {
		return uni.api.get("api/guild/wareHourse", {
			page,
			limit
		}, false);
	},
	// 公会赠送
	shop_giv_card({
		ware_id,
		num,
		mobile,
		pay_password
	}) {
		return uni.api.post("api/guild/send", {
			ware_id,
			num,
			mobile,
			pay_password
		}, true);
	},
	// 公会赠送记录
	shop_givGroupRecord({
		page,
		limit
	}) {
		return uni.api.get("api/guild/getGivLog", {
			page,
			limit
		}, false);
	},
	// 公会升级
	shop_upgradeGuild() {
		return uni.api.post("api/guild/upgradeGuild", {}, true);
	},
	// 删除公会成员
	shop_deleteGuildMember({
		id
	}) {
		return uni.api.post("api/guild/deleteGuildMember", {
			id
		}, true);
	},
	// 店长列表
	shop_getApiList({
		page,
		limit,
		lat,
		lng
	}) {
		return uni.api.get("api/agent/getApiList", {
			page,
			limit,
			lat,
			lng
		}, false);
	},
	// 获取挖矿界面潮玩卡信息
	shop_getMinePool() {
		return uni.api.get("api/config/getMinePool", {}, false);
	},
	// 获取挖矿界面潮玩卡信息
	// shop_getMinePool() {
	// 	return uni.api.get("api/config/getMinePool", {}, false);
	// },
	shop_introduce({
		mine_id
	}) {
		return uni.api.get("api/mine/introduce", {
			mine_id
		}, false);
	},
	shop_mineGivLog({
		page,
		limit,
		type
	}) {
		return uni.api.get("api/user/mineGivLog", {
			page,
			limit,
			type
		}, false);
	},

}