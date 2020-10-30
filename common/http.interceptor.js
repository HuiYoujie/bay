// /common/http.interceptor.js

import {
	BASE_URL,
	subDomain,
	appid
} from "@/config.js";

import md5 from "../utils/md5";

//排序的函数
function objKeySort(arys) {
	//先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
	let newkey = Object.keys(arys).sort();
	let newObj = ''; //创建一个新的对象，用于存放排好序的键值对
	for (let i = 0; i < newkey.length; i++) {
		//遍历newkey数组
		newObj += [newkey[i]] + arys[newkey[i]];
	}
	return newObj.substring(0, newObj.length);
}


// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: BASE_URL + subDomain,
		// loadingText: '努力加载中~',
		// loadingTime: 800,

		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true, 
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		const thirdSession = uni.getStorageSync('thirdSession') || '';
		// config.header.token = token;
		config.header.thirdSession = thirdSession;

		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if(config.url == '/user/login') config.header.noToken = true;
		// console.log(config)
		// console.warn('接口：', config.url)

		let sign = objKeySort(config.data)
		config.data.sign = md5.md5(appid + sign + appid).toUpperCase();
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		console.warn('接口返回结果：', res)
		if (res.respCode == 100) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res.data;
		} else if (res.respCode == 110) {
			uni.showToast({
				title: res.message || '内容含有违法违规内容',
				icon: 'none'
			})
			return false
		} else if (res.respCode == 119) {
			uni.showToast({
				icon: 'none',
				title: res.message || '签名错误'
			})
		} else {
			uni.showToast({
				icon: 'none',
				title: res.message
			})
			return false;
		}
	}
}

export default {
	install
}