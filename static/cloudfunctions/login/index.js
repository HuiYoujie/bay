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
		OPENID: _openid,
		APPID: appid,
		UNIONID: unionid,
		ENV: env
	} = cloud.getWXContext()
	
	/**
	 * 获取用户信息
	 */
	// 正常请求方式
	// db.collection('user').where({
	// 	_openid
	// }).get().then(res => {
	// 	// userInfo = res.data[0]
	// 	// console.log('用户信息', res.data[0]);
	// 	if (resp.data.length <= 0) {
			
	// 	} else {
			
	// 	}
	// })
	// Promise方式
	const user = await db.collection('user').where({
		_openid
	}).get()
	if (user.data.length <= 0) {
		let newUser = {
			_openid,
			userId: 1,
			createdTime: db.serverDate(),
			updateTime: db.serverDate(),
			status: 0,
			phone: '',
			gender: null,
			nickName: '',
			avatar: '',
			country: '',
			province: '',
			city: ''
		}
		// 添加新的用户
		db.collection('user').add({
			data: newUser
		}).then(res => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
	} else {
		console.log('获取到当前的登录用户', resp.data[0])
		let newUser = resp.data[0]
		newUser.updateTime = db.serverDate()
		let _id = newUser._id
		delete newUser._id
		// 更新用户信息
		db.collection('user').doc(_id).update({
			data: newUser
		}).then(resp => {
			// console.log(resp)
		}).catch(err => {
			console.log(err)
		})
	}
	
	// 登录后，自动创建默认家庭，允许修改名称，但不可以删除
	// db.collection('family').where({
	// 	_openid
	// }).get().then(resp => {
	// 	// 不存在默认账本，创新新的默认账本
	// 	if (resp.data.length <= 0) {
	// 		let family = {
	// 			"status": 0,
	// 			"createdTime": new Date(),
	// 			"updateTime": new Date(),
	// 			"user": wxContext.OPENID,
	// 			"name": '默认账本',
	// 			"isDefault": true,
	// 			"isAuto": true,
	// 			"_openid": wxContext.OPENID
	// 		}

	// 		// 新建家庭 默认一个
	// 		db.collection('family').add({
	// 			data: family
	// 		}).then(resp => {
	// 			console.log(resp)
	// 		}).catch(err => {
	// 			console.log(err)
	// 		})
			
	// 		// 新建房间 默认8个 => 主卧 次卧 客厅 厨房 餐厅 卫生间 玄关 阳台
	// 		db.collection('room').add({
	// 			data: book
	// 		}).then(resp => {
	// 			console.log(resp)
	// 		}).catch(err => {
	// 			console.log(err)
	// 		})
	// 	}
	// })
	
	return {
		openid: _openid,
		appid,
		unionid,
		env,
		userInfo: {
			...user.data[0]
		},
		// event
	}
}

