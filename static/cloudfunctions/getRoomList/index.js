const cloud = require('wx-server-sdk')

const db = cloud.database()

exports.main = async (event, context) => {
	console.log(event.data);
	const res = await db.collection('user').where({
		// _openid: openid
		
	}).get()
	
	return {
		
	}
}
