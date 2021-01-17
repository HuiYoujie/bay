// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	let {
		roomId
	} = event
	let furnitureInfo = await db.collection('furniture')
		.where({
			roomId
		})
		.get()
	return {
		furnitureInfo: furnitureInfo.data
	}
	
	// let {
	// 	userId,
	// 	furnitureName,
	// 	customPicFlag,
	// 	picUrl,
	// } = event.data
	// await db.collection('furniture').add({
	// 	data: newUser
	// }).then(resp => {
	// 	console.info(resp)
	// 	return {
	// 		furnitureInfo: resp
	// 	}
	// }).catch(err => {
	// 	console.error(err)
	// })
}