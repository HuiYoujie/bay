// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	console.log(event);
	let {
		userId,
		furnitureName,
		customPicFlag,
		picUrl,
	} = event
	
	const { total: furnitureCount } = await db.collection('furniture')
		.where({
			userId
		})
		.count()
		
	await db.collection('furniture').add({
		data: {
			...event,
			furnitureId: Number(furnitureCount) + 1
		}
	}).then(resp => {
		return resp
	}).catch(err => {
		console.error(err)
	})
}