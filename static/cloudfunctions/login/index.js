// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
const { defaultRoomList } = require('./roomList.js')

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
	const wxContext = cloud.getWXContext()
	const {
		OPENID: _openid,
		APPID: appid,
		UNIONID: unionid,
		ENV: env
	} = cloud.getWXContext()
	
	/**
	 * 示例 请求方式
	 */
	// // 请求方式-1
	// db.collection('user').doc(_openid).get({
	//   success: function(res) {}
	// })
	// // 请求方式-2
	// db.collection('user').doc(_openid).get().then(res => {})
	// // 请求方式-3
	// const sth = db.collection('user').doc(_openid).get()
	
	
	/**
	 * 获取用户信息
	 */
	const user = await db.collection('user').where({
		_openid
	}).get()
	if(user.data.length > 0) {
		let { userId } = user.data[0]
		console.log(1)
		// 获取用户家庭信息
		// let familyInfo = await cloud.callFunction({
		//     name: 'getFamily',
		//     data: {
		//       userId
		//     }
		// })
		let familyInfo = await db.collection('family').where({
			userId
		}).get()
		// console.log(familyInfo);
		
		// 获取默认显示的家庭ID
		let familyId = familyInfo.data[familyInfo.data.findIndex(v => v.isDefault === true)].familyId
		
		// 获取用户房间信息
		let roomInfo = await db.collection('room').where({
			familyId
		}).get()
		
		// 更新用户信息
		db.collection('user').where({ 
			userId 
		}).update({
			data: {
				updateTime: db.serverDate()
			}
		}).then(resp => {
			console.info(resp)
		}).catch(err => {
			console.error(err)
		})
		
		// 查询家庭 和 房间 显示默认家庭
		
		return {
			openid: _openid,
			appid,
			unionid,
			env,
			userInfo: {
				...user.data[0]
			},
			familyInfo: familyInfo.data || {},
			roomInfo: roomInfo.data || defaultRoomList
		}
	} else {
		// 没有数据 新建用户 新建家庭 新建房间
	
		// 查询user表数据条数
		const { total: userCount } = await db.collection('user').count()
		// console.log('user表数据条数', userCount)
		let newUser = {
			_openid,
			userId: userCount + 1,
			status: 0,
			phone: '',
			gender: 1,
			nickName: '',
			avatar: '',
			country: '',
			province: '',
			city: '',
			createdTime: db.serverDate(),
			updateTime: db.serverDate()
		}
		// 添加新的用户
		await db.collection('user').add({
			data: newUser
		}).then(resp => {
			console.info(resp)
		}).catch(err => {
			console.error(err)
		})
		
		// 查询family表数据条数
		const { total: familyCount } = await db.collection('family').count()
		// console.log('family表数据条数', familyCount)
		
		// 家庭以及房间排序 ！！！
		let family = {
			userId: userCount + 1,
			familyId: familyCount + 1,
			name: '我的家',
			status: 0,
			isDefault: true,
			isAuto: true,
			createdTime: new Date(),
			updateTime: new Date(),
		}
				
		// 新建家庭 默认一个
		await db.collection('family').add({
			data: family
		}).then(resp => {
			console.info(resp)
		}).catch(err => {
			console.error(err)
		})
		
		// 新建房间 默认8个 => 主卧 次卧 客厅 厨房 餐厅 卫生间 玄关 阳台
		for(data of defaultRoomList) {
			// 查询room表数据条数
			const { total: roomCount } = await db.collection('room').count()
			// console.log('room表数据条数', roomCount)
			data.userId = userCount + 1
			data.familyId = familyCount + 1
			data.roomId = roomCount + 1
			await db.collection('room').add({
				data
			}).then(resp => {
				console.info(resp)
			}).catch(err => {
				console.error(err)
			})
		}
		
		return {
			openid: _openid,
			appid,
			unionid,
			env,
			// 新建的数据
			userInfo: newUser,
			familyInfo: family,
			roomInfo: defaultRoomList
		}
	}
	
	// 默认返回
	// const wxContext = cloud.getWXContext()
	// return {
	//   event,
	//   openid: wxContext.OPENID,
	//   appid: wxContext.APPID,
	//   unionid: wxContext.UNIONID,
	// }
}

// 云函数中调用其他云函数
// exports.main = async (event, context) => {
//   return await cloud.callFunction({
//     name: 'sum',
//     data: {
//       x: 1,
//       y: 2,
//     }
//   })
// }