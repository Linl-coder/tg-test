export default {
	state: { //存放状态
		"system_info": {
			width:0,
			height:0,
			appname:''
		}
	},
	getters: {
		get_system_info(state) {
			return state.system_info;
		},
	},
	mutations: {
		set_system_info(state, info) {
			state.user_info = info;
		}
	}
};
