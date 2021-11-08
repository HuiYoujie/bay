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
		defaultFamilyId,
		thingForm: {
			name,
			picUrl,
			rate,
			PD,
			ED,
			Exp,
			remindFlag,
			Exp_remind,
			description
		}
	} = event
	
	const { total: thingCount } = await db.collection('thing')
		.where({
			userId
		})
		.count()
		
	await db.collection('thing').add({
		data: {
			userId,
			defaultFamilyId,
			...thingForm,
			thingId: Number(thingCount) + 1
		}
	}).then(resp => {
		return resp
	}).catch(err => {
		console.error(err)
	})
}