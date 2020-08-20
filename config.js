const {
	appId,
	envVersion, // release-正式版 | trial-体验版 | develop-开发版
	version = ''
} = uni.getAccountInfoSync().miniProgram

module.exports = {
	appid: appId, // 您的小程序的appid，购物单功能需要使用
	isRelease: envVersion === 'release', // 是否正式版
	version, // 线上版本号
	shareTitle: '一起来整理我们的家吧！', // 首页转发的时候话术
	// subDomain: "", // 如果你的域名是： https://www.baidu.com/abcd 那么这里只要填写 abcd
}
