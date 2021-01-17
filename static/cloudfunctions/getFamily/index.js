const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
	let {
		userId,
	} = event.data
	
	let familyInfo = await db.collection('family').where({
		userId
	}).get()
	
	return {
		// familyInfo: familyInfo.data
		familyInfo
	}
	
	await db.collection('family').where({
		userId
	}).then(resp => {
		console.info(resp)
		// return {
		// 	familyInfo: resp
		// }
	}).catch(err => {
		console.error(err)
	})
	
	
}
