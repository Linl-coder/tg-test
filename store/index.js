import Vue from 'vue'
import Vuex from 'vuex'
import User from "./modules/user.js"
import Socket from './modules/socket.js'
Vue.use(Vuex);
//Vuex.Store 构造器选项
const store = new Vuex.Store({
	modules:{
		user:User,
		socket:Socket
	},
	// strict: true
})
export default store
