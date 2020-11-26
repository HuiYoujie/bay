// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
	// console.log('event', event)
	// console.log('context', context)

	// 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
	// const wxContext = cloud.getWXContext()
	const {
		OPENID: openid,
		APPID: appid,
		UNIONID: unionid,
		ENV: env
	} = cloud.getWXContext()
	
	/**
	 * 获取用户信息
	 */
	// 正常请求方式
	// db.collection('user').where({
	// 	_openid: openid
	// }).get().then(res => {
	// 	userInfo = res.data[0]
	// 	console.log('用户信息', res.data[0]);
	// })
	// Promise方式
	const res = await db.collection('user').where({
		_openid: openid
	}).get()

	return {
		openid,
		appid,
		unionid,
		env,
		userInfo: {
			...res.data[0]
		},
		// event
	}
}

