export default {

	/*
	 *  获取为我挖矿的队友
	 */
	getHelpMyFriendList({
		level,
		page,
		type,
		limit,
		is_need_count_info
	}) {
		return uni.api.get("api/mine/get-help-my-friend-list", {
				level,
				page,
				type,
				limit,
				is_need_count_info
			},
			false);
	},





	/*
	 *  我的挖矿队友和其他队友
	 */
	getMyMineFriendList({
		page,
		limit,
		is_teammate
	}) {
		return uni.api.get("api/mine/get-my-mine-friend-list", {
				page,
				limit,
				is_teammate
			},
			false);
	},




	/*
	 *  获取别人赠送给自己的宝石
	 */
	getBeGiveGem({
		is_need_popbox_info
	}) {
		return uni.api.get("api/user/get-user-status", {
			is_need_popbox_info
		}, false);
	},

	/*
	 *  判断是否能进入游戏
	 */
	isEnterGame({
		game_name
	}) {
		return uni.api.get("api/user/check-lock-record", {
			game_name
		}, false);
	},


	/*
	 *  设置和取消代理
	 */
	operateAgent({
		user_code,
		type
	}) {
		return uni.api.post("api/user/operate-agent", {
			user_code,
			type
		}, false, true);
	},



	/*
	 *  获取自己设置的代理列表
	 */
	getSetAgentList({
		page,
		limit
	}) {
		return uni.api.get("api/agent/get-child-agent-list", {
			page,
			limit
		}, false, true);
	},



	mineCave_upgrade({
		mine_id
	}) {
		return uni.api.post("api/mine/upgrade-mine", {
			mine_id
		}, false, true);
	},

	//获取申请代理条件列表
	collect_applyAgentCondiation({
		limit,
		page
	}) {
		return uni.api.get("api/user/get-promotion-info", {
			limit,
			page
		}, false, true);
	},


	//申请成为代理
	collect_applyAgent() {
		return uni.api.post("api/agent/apply-agent", {}, false);
	},


	//获取申请代理列表
	collect_getApplyAgentList({
		limit,
		page
	}) {
		return uni.api.get("api/agent/get-apply-record-list", {
			limit,
			page
		}, false, true);
	},

	collect_getList({
		limit,
		page,
		get_type = 1
	}) { //卡牌列表
		return uni.api.get("api/pool/getList", {
			limit,
			page,
			get_type
		}, false, true);
	},
	collect_getDetail({
		id
	}) { //卡牌详情
		return uni.api.get("api/pool/getDetail", {
			id
		}, false, true);
	},
	collect_getAuthor({
		author_id
	}) { //创作者详情
		return uni.api.get("api/author/getAuthor", {
			author_id
		}, false);
	},
	collect_getPool({
		author_id,
		page,
		limit
	}) { //创作者列表
		return uni.api.get("api/author/getPool", {
			author_id,
			page,
			limit
		}, false);
	},
	collect_getBrand({
		brand_id
	}) { //品牌方详情
		return uni.api.get("api/union/getBrandDetails", {
			brand_id
		}, false);
	},
	collect_brandgetPool({
		brand_id,
		page,
		limit
	}) { //品牌方列表
		return uni.api.get("api/union/getBrandPoolList", {
			brand_id,
			page,
			limit
		}, false);
	},

	collect_buy({
		id,
		num
	}) { //卡牌下单
		return uni.api.post("api/pool/buy", {
			id,
			num
		}, false, true);
	},
	collect_getGroup() { //卡牌下单
		return uni.api.get("api/pool/getGroup", {}, true, true);
	},
	collect_getHot() { //热门卡牌
		return uni.api.get("api/pool/getHot", {}, false);
	},
	collect_blindboxGetList({
		limit,
		page
	}) { //盲盒列表
		return uni.api.get("api/box/getList", {
			limit,
			page
		}, false);
	},
	collect_blindboxGetDetail({
		id
	}) { //盲盒详情
		return uni.api.get("api/box/getDetail", {
			id
		}, false);
	},
	collect_blincboxbuy({
		id,
		num
	}) { //盲盒下单
		return uni.api.post("api/box/buy", {
			id,
			num
		}, true, true);
	},
	collect_paylist() { //获取支付方式
		return uni.api.get("api/payment/getList", {}, false);
	},
	collect_payment({
		type,
		buy_type,
		is_mark,
		password,
		payReturn
	}) { //buy_type 	1 卡牌 2盲盒 is_mark 1 抢购 2市场
		return uni.api.post("api/payment/payment", {
			type,
			buy_type,
			is_mark,
			password,
			payReturn
		}, true);
	},
	collect_orderList({
		limit,
		page,
		buy_type,
		is_mark,
		status
	}) { //订单列表
		return uni.api.get("api/order/getList", {
			limit,
			page,
			buy_type,
			is_mark,
			status
		}, false);
	},
	collect_orderCannel({
		order_id
	}) { //取消订单
		return uni.api.post("api/order/cannel", {
			order_id
		}, false);
	},
	collect_orderDetail({
		order_id
	}) { //订单详情
		return uni.api.get("api/order/getDetail", {
			order_id
		}, false);
	},
	collect_sale({
		buy_type,
		sell_id,
		password,
		price
	}) { //市场寄售
		return uni.api.post("api/mark/sale", {
			buy_type,
			sell_id,
			password,
			price
		}, true);
	},
	collect_saleGetList({
		limit,
		page,
		buy_type,
		is_hold,
		is_follow,
		ablum_id,
		class_id,
		brand_id,
		sort,
		title
	}) { //市场列表
		return uni.api.get("api/mark/getListPool", {
			limit,
			page,
			buy_type,
			is_hold,
			is_follow,
			ablum_id,
			class_id,
			brand_id,
			sort,
			title
		}, false);
	},
	collect_getListPoolMore({
		is_follow,
		is_hold,
		limit,
		page,
		class_id,
		brand_id,
		sort,
		title
	}) { //关注和持有
		return uni.api.get("api/mark/getListPoolMore", {
			is_follow,
			is_hold,
			limit,
			page,
			class_id,
			brand_id,
			sort,
			title
		}, false);
	},
	collect_getListBox({
		limit,
		page,
		buy_type,
		is_follow,
		is_hold,
		class_id,
		brand_id,
		sort,
		title
	}) { //市场列表-盲盒
		return uni.api.get("api/mark/getListBox", {
			limit,
			page,
			buy_type,
			is_follow,
			is_hold,
			class_id,
			brand_id,
			sort,
			title
		}, false);
	},
	collect_getListBoxMore({
		limit,
		page,
		buy_type,
		is_hold,
		is_follow,
		class_id,
		brand_id,
		sort,
		title
	}) { //市场列表-盲盒 关注和持有
		return uni.api.get("api/mark/getListBoxMore", {
			limit,
			page,
			buy_type,
			is_hold,
			is_follow,
			class_id,
			brand_id,
			sort,
			title
		}, false);
	},
	collect_getCalssList({
		buy_type
	}) { //市场列表-分类
		return uni.api.get("api/mark/getClassList", {
			buy_type
		}, false);
	},
	collect_getBrandList({
		is_type
	}) { //市场列表-系列
		return uni.api.get("api/union/getBrandList", {
			is_type
		}, false);
	},
	collect_saleCannel({
		id
	}) { //取消寄售
		return uni.api.post("api/mark/cannel", {
			id
		}, true);
	},
	collect_saleBuy({
		id
	}) { //寄售购买
		return uni.api.post("api/mark/userBuyAdd", {
			id
		}, true);
	},
	collect_getBuyMaxAuth({
		buy_type,
		goods_id
	}) { //获取批量下单的权限
		return uni.api.get("api/mark/getBuyMaxAuth", {
			buy_type,
			goods_id
		}, false);
	},
	collect_getCount({
		buy_type,
		goods_id,
		price
	}) { //获取可下单数量
		return uni.api.get("api/mark/getBuyMaxCount", {
			buy_type,
			goods_id,
			price
		}, false);
	},
	collect_batchBuy({
		buy_type,
		goods_id,
		buy_num,
		price
	}) { //批量下单
		return uni.api.post("api/mark/userBatchBuyAdd", {
			buy_type,
			goods_id,
			buy_num,
			price
		}, true);
	},
	collect_fastBuy({
		buy_type,
		goods_id
	}) { //快捷下单
		return uni.api.post("api/mark/userFastBuyAdd", {
			buy_type,
			goods_id
		}, false);
	},
	collect_getOrder({
		buy_type,
		goods_id
	}) { //快捷查询订单
		return uni.api.post("api/mark/getOrder", {
			buy_type,
			goods_id
		}, false);
	},
	collect_getStayPayOrderInfo() { //快捷查询订单
		return uni.api.get("api/order/getStayPayOrderInfo", {}, true);
	},

	collect_getOrderAll({
		buy_type,
		goods_id
	}) { //批量查询订单
		return uni.api.post("api/mark/getOrderAll", {
			buy_type,
			goods_id
		}, false);
	},
	collect_sale({
		buy_type,
		sell_id,
		pay_password,
		price
	}) { //寄售
		return uni.api.post("api/mark/sale", {
			buy_type,
			sell_id,
			pay_password,
			price
		}, true);
	},
	collect_getBeforeSellList({
		pool_id,
		no,
		page,
		limit
	}) { //历史出售记录
		return uni.api.get("api/mark/getBeforeSellList", {
			pool_id,
			no,
			page,
			limit
		}, false);
	},
	collect_getPoolFlowList({
		pool_id,
		no,
		page,
		limit
	}) { //流转记录1
		return uni.api.get("api/mark/getPoolFlowList", {
			pool_id,
			no,
			page,
			limit
		}, false);
	},
	collect_cannel({
		id
	}) { //取消寄售
		return uni.api.post("api/mark/cannel", {
			id
		}, true);
	},
	getNoboxList({
		goods_id,
		limit,
		page,
		sort
	}) { //盲盒编号列表
		return uni.api.get("api/mark/getNoBoxList", {
			goods_id,
			limit,
			page,
			sort
		}, false);
	},
	collect_saleGetNoList({
		goods_id,
		limit,
		page,
		sort
	}) { //编号列表
		return uni.api.get("api/mark/getNoList", {
			goods_id,
			limit,
			page,
			sort
		}, false);
	},
	collect_saleGetLog({
		buy_type,
		limit,
		page
	}) { //寄售记录
		return uni.api.get("api/mark/getLog", {
			buy_type,
			limit,
			page
		}, true);
	},
	collect_saleGetDetail({
		id,
		buy_type
	}) { //市场详情
		return uni.api.get("api/mark/getDetail", {
			id,
			buy_type
		}, false);
	},
	// 通过user_code 获取头像 昵称 user/get-user-info-by-ucode
	getUserInfoByUcode({
		user_code
	}) {
		return uni.api.get("api/user/get-user-info-by-ucode", {
			user_code
		}, false);
	},
	collect_saleGetMyList({
		limit,
		page,
		title,
		data_type
	}) { //我的卡牌
		return uni.api.get("api/pool/getMyList", {
			limit,
			page,
			title,
			data_type
		}, false);
	},
	collect_getMyListInfo({
		limit,
		page,
		pool_id
	}) { //折叠列表
		return uni.api.get("api/pool/getMyListInfo", {
			limit,
			page,
			pool_id
		}, false);
	},
	collect_getMyListInfobox({
		limit,
		page,
		box_id
	}) { //折叠列表
		return uni.api.get("api/box/getMyListInfo", {
			limit,
			page,
			box_id
		}, false);
	},
	collect_getMyInfo({
		id
	}) { //卡牌折叠-折叠详情-单个卡牌详情
		return uni.api.get("api/pool/getMyInfo", {
			id
		}, false);
	},
	collect_giv({
		pool_id,
		user_code,
		pay_password,
		num
	}) { //卡牌转赠
		return uni.api.post("api/pool/giv", {
			pool_id,
			user_code,
			pay_password,
			num
		}, true);
	},
	collect_boxgiv({
		id,
		phone,
		pay_password
	}) { //盲盒转赠
		return uni.api.post("api/box/giv", {
			id,
			phone,
			pay_password
		}, true);
	},
	collect_getTransferEnd({
		pool_id,
		user_pool_id
	}) { //查询转赠结果
		return uni.api.get("api/pool/getTransferEnd", {
			pool_id,
			user_pool_id
		}, false);
	},
	collect_poolgGvLog({
		limit,
		page
	}) { //卡牌转增记录
		return uni.api.get("api/pool/givLog", {
			limit,
			page
		}, false);
	},
	collect_boxgGvLog({
		limit,
		page
	}) { //盲盒转增记录
		return uni.api.get("api/box/givLog", {
			limit,
			page
		}, false);
	},
	collect_markgGvLog({
		limit,
		page
	}) { //市场转增记录
		return uni.api.get("api/mark/getLog", {
			limit,
			page
		}, false);
	},
	collect_boxGetMyList({
		limit,
		page,
		title
	}) { //我的盲盒列表
		return uni.api.get("api/box/getMyList", {
			limit,
			page,
			title
		}, false);
	},
	collect_boxGetMyInfo({
		id
	}) { //我的盲盒详情
		return uni.api.get("api/box/getMyInfo", {
			id
		}, false);
	},
	collect_openBox({
		id
	}) { //开盲盒
		return uni.api.get("api/box/open", {
			id
		}, true);
	},
	collect_openBoxLog({
		limit,
		page,
		box_id,
		open_type
	}) { //开盒记录
		return uni.api.get("api/box/openLog", {
			limit,
			page,
			box_id,
			open_type
		}, false);
	},
	collect_getBalanceLogList({
		limit,
		page
	}) { //余额记录
		return uni.api.get("api/user/getBalanceLogList", {
			limit,
			page
		}, false);
	},
	collect_getIntegralLogList({
		limit,
		page
	}) { //积分记录
		return uni.api.get("api/user/getIntegralLogList", {
			limit,
			page
		}, false);
	},

	/**
	 * 合成
	 */
	collect_synGetDetail({
		with_id,
		id
	}) { //合成详情
		return uni.api.get("api/syn/getDetail", {
			with_id,
			id
		}, false);
	},
	collect_synPoolList({
		with_id,
		page,
		limit
	}) { //获取可合成卡牌列表
		return uni.api.get("api/syn/poolList", {
			with_id,
			page,
			limit
		}, false);
	},
	collect_syn({
		with_id,
		pool
	}) { //选择合成
		return uni.api.post("api/syn/syn", {
			with_id,
			pool
		}, true);
	},
	collect_synFastSyn({
		id,
		with_id,
		num
	}) { //一键合成
		return uni.api.post("api/syn/fastSyn", {
			id,
			with_id,
			num
		}, true);
	},
	collect_fastOneSyn({
		id,
		with_id
	}) { //一键合成
		return uni.api.post("api/syn/fastOneSyn", {
			id,
			with_id
		}, true);
	},
	collect_synGetLog({
		limit,
		page
	}) { //合成记录
		return uni.api.get("api/syn/getLog", {
			limit,
			page
		}, false);
	},
	collect_search({
		title,
		page,
		limit
	}) { //搜索
		return uni.api.get("api/pool/search", {
			title,
			page,
			limit
		}, false);
	},
	collect_follow({
		goods_id,
		buy_type
	}) { //关注
		return uni.api.post("api/mark/follow", {
			goods_id,
			buy_type
		}, true);
	},
	/**
	 * 
	 */
	collect_draw({
		id
	}) { //抽签
		return uni.api.post("api/pool/draw", {
			id
		}, true);
	},

	/**
	 * 开户
	 */
	collect_open() { //易宝开户
		return uni.api.post("api/wallet/Ebao/open", {}, true);
	},
	sand_open() { //杉德开户
		return uni.api.post("api/wallet/sand/open", {}, true);
	},
	hui_open() { //汇付开户
		return uni.api.post("api/wallet/huifu/open", {}, true);
	},
	collect_myreceiveCardList({
		page,
		limit,
		buy_type
	}) { //我的权益卡包
		return uni.api.get("api/card/user/getUserMyreceiveCardList", {
			page,
			limit,
			buy_type
		}, false);
	},

	/* 获取专辑列表 */
	getTypeList(obj) {
		return uni.api.get('api/union/getAlbumList', obj, true)
	},
	getMyAirdropList({
		limit,
		page,
		type,
		pool_id
	}) {
		return uni.api.get('api/pool/getMyAirdropList', {
			limit,
			page,
			type,
			pool_id
		}, false)
	},


	collect_synGet({
		no
	}) { //获取合成结果
		return uni.api.get("api/syn/synGet", {
			no
		}, false);
	},
	collect_synQueue({
		with_id,
		id,
		num
	}) { //队列合成
		return uni.api.post("api/Syn/synQueue", {
			with_id,
			id,
			num
		}, true);
	},

	collect_getBeforeSellList({
		pool_id,
		no,
		page,
		limit
	}) { //流转记录
		return uni.api.get("api/mark/getBeforeSellList", {
			pool_id,
			no,
			page,
			limit
		}, false);
	},

	/**
	 * 求购
	 */
	collect_userMakeBuyAdd({
		goods_id,
		buy_num,
		buy_type,
		price
	}) { //发起求购
		return uni.api.post("api/mark/userMakeBuyAdd", {
			goods_id,
			buy_num,
			buy_type,
			price
		}, true);
	},
	collect_userMakeBuyList({
		limit,
		page,
		goods_id,
		buy_type
	}) { //求购列表
		return uni.api.get("api/mark/userMakeBuyList", {
			limit,
			page,
			goods_id,
			buy_type
		}, true);
	},
	collect_userSellToBuyAdd({
		id
	}) { //求购列表中直接出售
		return uni.api.post("api/mark/userSellToBuyAdd", {
			id
		}, true);
	}


}