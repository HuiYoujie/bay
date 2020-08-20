import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		tabIndex:''
	},
	mutations: {
		login(state, provider) {
			console.log(state, provider,'state, provider')
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		tabIndex(state,index){
			console.log(state,index,'statestate')
			state.tabIndex = index;
			uni.setStorage({//缓存用户登陆状态
			    key: 'tabIndex',  
			    data: index  
			}) 
		}
	},
	actions: {
	
	}
})

export default store
