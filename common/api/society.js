export default {
	community_push({pid,title,desc,files,type,huifu_id,text,time,goods_id}) { //发布
			return uni.api.post("api/forum/push",{pid,title,desc,files,type,huifu_id,text,time,goods_id});
	},
	community_getList({limit,page}) { //列表
			return uni.api.get("api/forum/getList",{limit,page},false);
	},
	community_getFollow({limit,page}) { //关注列表
			return uni.api.get("api/forum/getFollow",{limit,page},false);
	},
	community_getSwitch({limit,page}) { //获取推荐
			return uni.api.get("api/forum/getSwitch",{limit,page},false);
	},
	community_getDetail({id}) { //详情
			return uni.api.get("api/forum/getDetail",{id},false);
	},
	community_getDetailAuth({id}) { //详情
			return uni.api.get("api/forum/getDetailAuth",{id},false);
	},	
	community_zan({forum_id,type}) { //点击
			return uni.api.post("api/forum/zan",{forum_id,type});
	},
	community_getReply({limit,page,id}) { //获取下级留言
			return uni.api.get("api/forum/getReply",{limit,page,id},false);
	},
	community_getMessageList({limit,page}) { //获取消息
			return uni.api.get("api/forum/getMessageList",{limit,page});
	},
	community_getPool({limit,page}) { //获取关联列表
			return uni.api.get("api/forum/getPool",{limit,page},false);
	},
	community_vote({id,vote_type}) { //投票
			return uni.api.post("api/forum/vote",{id,vote_type});
	},
	community_mygetFollow({page,limit}) { //我的关注
			return uni.api.get("api/user/getFollow",{page,limit},false);
	},
	community_mygetFans({page,limit}) { //我的粉丝
			return uni.api.get("api/user/getFans",{page,limit},false);
	},
	community_mygetForum({page,limit}) { //我的动态
			return uni.api.get("/api/user/getForum",{page,limit},false);
	},

}