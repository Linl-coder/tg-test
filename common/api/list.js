export default {
	getCate(){
		return uni.api.get("/api/affiche/getCate");
	},
	getCateList(params){
		return uni.api.get('api/affiche/getList',{...params},false)
	},
	getNewsCate(params){
		return uni.api.get('api/article/news/getCate')
	},
	getNewsList(params){
		return uni.api.get('api/article/news/getNewsList',params,false)
	},
	getNewsDetail(id){
		return uni.api.get('api/article/news/getDetail/'+id,{},false)
	},
	getRumorList(){
		return uni.api.get('api/forum/rumor/getRumorList',{},false)
	},
	rumorAdd(params){
		return uni.api.post("api/forum/rumor/rumorAdd",{...params});
	},
	getRumorDetail(params){
		return uni.api.get("api/forum/rumor/getRumorDetail",{...params},true);
	}
}