import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
const config = require('./config')

const GLOBAL = new Map()
GLOBAL.set('appid', config.appid)
GLOBAL.set('isRelease', config.isRelease)
GLOBAL.set('shareTitle', config.shareTitle)

Vue.prototype.globalData = GLOBAL

Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
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