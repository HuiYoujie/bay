import Vue from 'vue'
import store from './store'
import App from './App'
import uView from "uview-ui";
const config = require('./config')
const log = require('./utils/log.js')

Vue.prototype.log = {...log}


// 使用插件
Vue.use(uView);

// 阻止生产模式消息
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()

	// "subpackages": [
	// 	{
	// 		"root": "pages/sub-space",
	// 		"name": "SPACE",
	// 		"pages": [
	// 			"index/index"
	// 		]
	// 	},
	// 	{
	// 		"root": "pages/sub-thing",
	// 		"name": "THING",
	// 		"pages": [
	// 			"index/index"
	// 		]
	// 	},
	// 	{
	// 		"root": "pages/sub-remind",
	// 		"name": "REMIND",
	// 		"pages": [
	// 			"index/index"
	// 		]
	// 	},
	// 	{
	// 		"root": "pages/sub-mine",
	// 		"name": "MINE",
	// 		"pages": [
	// 			"index/index"
	// 		]
	// 	}
	// ],
	// "preloadRule": {
	// 	"pages/space/space": {
	// 		"network": "all",
	// 		"packages": ["SPACE"]
	// 	},
	// 	"pages/thing/thing": {
	// 		"network": "all",
	// 		"packages": ["THING"]
	// 	},
	// 	"pages/remind/remind": {
	// 		"network": "all",
	// 		"packages": ["REMIND"]
	// 	},
	// 	"pages/mine/mine": {
	// 		"network": "all",
	// 		"packages": ["MINE"]
	// 	}
	// },