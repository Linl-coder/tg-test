export default {
	state: { //存放状态
		"user_info": {
			is_cert: 1
		},
		showLogoutModal: false,
		"login": false,
		"appInfo": {},
		timerRunning: false // 记录定时器状态
		// "cereal":'--', // 宝石
		// "gold":'--', // 金币

	},
	getters: {
		is_login(state) {
			return state.login;
		},
		get_user_info(state) {
			return state.user_info;
		},
		get_appInfo(state) {
			return state.appInfo;
		},
		// get_cereal:state=>state.cereal,
		// get_gold:state=>state.gold
	},
	mutations: {
		setTimerRunning(state, value) {
			state.timerRunning = value;
		},
		setLogoutModal(state, value) {
			state.showLogoutModal = value;
		},
		// set_asset(state,data){
		// 	state[data.type] = data.val
		// },
		set_appInfo(state, appInfo) {
			state.appInfo = appInfo;
		},
		set_login(state, status) {
			// 变更状态
			console.log(2, status)
			state.login = status;
		},
		set_user_info(state, info) {
			state.user_info = info;
		},
		set_user_info_(state, info) {
			state.user_info[info.key] = info.value;
		},
		clear_user_info_(state) {
			state.user_info = {
				userinfo: {
					nickname: "***",
					avatar: null
				}
			}
		},
	},
	actions: {
		setALogoutModal(context, value) {
			context.commit("set_is_scroll", value)
		},
		actionSetLogin(context, value) {
			console.log(1)
			context.commit("set_login", value)
		}

	}
};