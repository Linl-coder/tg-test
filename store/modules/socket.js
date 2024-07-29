export default {
	state: { //存放状态
		socketurl: uni.conf.ws,
		isOnline: false,
		socket: null,
		reconnectTime: 0,
		isOpenReconnect: true,
		timer: null,
		is_send: false,
		end_val: 0,
		is_scroll: true
	},
	getters: {
		get_end_val(state) {
			return state.end_val;
		},
		get_is_scroll(state) {
			return state.is_scroll;
		},
	},
	mutations: {
		setSocket(state, data) {
			state.socket = data
		},
		set_end_val(state, val) {
			state.end_val = val;
		},
		set_is_scroll(state, val) {
			state.is_scroll = val;
		}
	},
	actions: {
		// 连接socket
		connectSocket({
			state,
			rootState,
			dispatch,
			commit
		}) {
			//console.log("url==>", state.socketurl)
			if (!rootState.user.login) {
				return
			}
			let socket = uni.connectSocket({
				url: state.socketurl,
				success() {
					console.log('成功')
				},
				fail() {
					console.log('失败')
				},
				complete: function() {}
			});
			commit('setSocket', socket)
			// 监听连接成功
			state.socket.onOpen(() => dispatch('onOpen'));
			// 监听接收信息
			state.socket.onMessage((res) => dispatch('onMessage', res));
			// 监听断开
			state.socket.onClose((e) => dispatch('onClose', e));
			// 监听错误
			state.socket.onError(() => dispatch('onError'));
		},
		onOpen({
			state,
			dispatch
		}) {
			console.log('连接成功');
			return
			// 用户上线
			state.isOnline = true;
			state.isOpenReconnect = true;
			commit("set_is_scroll", true)
		},
		// 监听关闭
		onClose({
			state,
			dispatch
		}, e) {
			// 用户下线
			state.isOnline = false;
			state.socket = null;
			console.log('连接已关闭');
			if (state.isOpenReconnect) {
				console.log("3秒后重新链接");
				setTimeout(() => {
					dispatch('reconnect');
				}, 3000);
			} else {
				uni.$u.toast('你的账号已下线')
			}
		},
		// 监听连接错误
		onError({
			state,
			dispatch
		}) {
			// 用户下线
			state.isOnline = false;
			state.socket = null;
			console.log('socket连接错误');
			if (!state.socket) {
				setTimeout(() => {
					dispatch('reconnect');
				}, 3000);
			}
		},
		// 监听接收消息
		onMessage({
			state,
			dispatch,
			commit,
			rootDispatch,
			rootState,
		}, data) {
			let companyCode = uni.conf.companycode
			if (!state.is_send) {
				if (state.timer) return
				state.timer = setInterval(() => {

					let mess = {
						type: 'pong',
						company_id: companyCode,
						uuid: rootState.user.user_info.id
					};

					try {
						// uni.sendSocketMessage({
						// 	data: JSON.stringify(mess)
						// });
						// uni.onSocketMessage(function(res) {
						// 	console.log('收到服务器内容：' + res);
						// });
						// console.log("传递参数", mess);
						state.socket.send({
							data: JSON.stringify(mess),
							async success(res) {
								console.log(res);
							}
						})
						uni.onSocketMessage(function(res) {
							console.log('收到服务器内容：' + res);
						});
					} catch (err) {
						// console.log(err)
					}
				}, 15000)
				state.is_send = true;
			}
			let message = JSON.parse(data.data)
			console.log(message)
			if (typeof(message) == 'object') {
				uni.$u.debounce(() => {
					commit('set_user_info_', {
						value: message.food,
						key: 'food'
					})
				}, 500)
			}
		},
		// 断线重连
		reconnect({
			state,
			dispatch
		}) {
			console.log("准备重新连接");
			if (state.isOnline) {
				return;
			}
			if (state.reconnectTime >= 3) {
				return dispatch('reconnectConfirm');
			}
			clearInterval(state.timer)
			state.timer = null
			state.reconnectTime += 1
			console.log(`正在${state.reconnectTime}次重新连接`);
			return dispatch('connectSocket');
		},
		// 断线重连提示
		reconnectConfirm({
			state,
			dispatch
		}) {
			dispatch('connectSocket');
			state.reconnectTime = 0
		},
		// 关闭连接
		close({
			state,
			dispatch
		}) {
			if (state.socket) {
				state.socket.close()
			}
			clearInterval(state.timer)
			state.timer = null
		},
	}
};