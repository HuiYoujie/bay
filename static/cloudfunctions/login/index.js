// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
// const defaultRoomList = require('./roomList.js')

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
	// 查询user表数据条数
	const userNumber = await db.collection('user').count()
	console.log(userNumber)
	// if (user.data.length <= 0) {
	// 	// 查询user表数据条数
	// 	const userNumber = await db.collection('user').count()
	// 	let newUser = {
	// 		_openid,
	// 		userId: Number(userNumber) + 1,
	// 		status: 0,
	// 		phone: '',
	// 		gender: null,
	// 		nickName: '',
	// 		avatar: '',
	// 		country: '',
	// 		province: '',
	// 		city: '',
	// 		createdTime: db.serverDate(),
	// 		updateTime: db.serverDate()
	// 	}
	// 	// 添加新的用户
	// 	db.collection('user').add({
	// 		data: newUser
	// 	}).then(res => {
	// 		console.log(res)
	// 	}).catch(err => {
	// 		console.log(err)
	// 	})
	// } else {
	// 	console.log('获取到当前的登录用户', resp.data[0])
	// 	let user = resp.data[0]
	// 	user.updateTime = db.serverDate()
	// 	// let _id = user._id
	// 	// delete user._id
	// 	// 更新用户信息
	// 	db.collection('user').doc(_id).update({
	// 		data: user
	// 	}).then(resp => {
	// 		console.log(resp)
	// 	}).catch(err => {
	// 		console.log(err)
	// 	})
	// }
	
	// // 查询family表数据条数
	// const familyNumber = await db.collection('family').count()
	// // 登录后，自动创建默认家庭，允许修改名称，但不可以删除
	// db.collection('family').where({
	// 	_openid
	// }).get().then(resp => {
	// 	// 不存在默认家庭，创新新的默认家庭
	// 	if (resp.data.length <= 0) {
	// 		let family = {
	// 			_openid,
	// 			user: wxContext.OPENID,
	// 			userId: Number(userNumber) + 1,
	// 			familyId: familyNumber + 1,
	// 			name: '默认家庭',
	// 			status: 0,
	// 			isDefault: true,
	// 			isAuto: true,
	// 			createdTime: new Date(),
	// 			updateTime: new Date(),
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
	// 		for(data of defaultRoomList) {
	// 			// 查询room表数据条数
	// 			const roomNumber = await db.collection('room').count()
	// 			data.roomId = roomNumber + 1
	// 			data._openid,
	// 			data.userId: Number(userNumber) + 1,
	// 			data.familyId: Number(familyNumber) + 1,
	// 			data.roomId: roomNumber + 1,
	// 			db.collection('room').add({
	// 				data
	// 			}).then(resp => {
	// 				console.log(resp)
	// 			}).catch(err => {
	// 				console.log(err)
	// 			})
	// 		}
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

