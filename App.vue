<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<!-- <script src="./config"></script> -->
<!-- const config = require('./config') -->

<script>
	const config = require('./config.js')
	export default {
		// 全局变量
		globalData: {
			appid: config.appid,
			isRelease: config.isRelease,
			version: config.version,
		},
		
		onLaunch: function() {
			console.log('App Launch');

			setTimeout(() => {
				uni.setTabBarBadge({
					index: 1,
					text: '31'
				});
				uni.showTabBarRedDot({
					index: 3
				});
			}, 1000);

			const phoneInfo = wx.getSystemInfoSync()
			this.$scope.globalData.phoneInfo = {
				phoneInfo,
			}

			if (!wx.cloud) {
				console.error('请使用 2.2.3 或以上的基础库以使用云能力')
			} else {
				wx.cloud.init({
					// env 参数说明：
					//   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
					//   此处请填入环境 ID, 环境 ID 可打开云控制台查看
					//   如不填则使用默认环境（第一个创建的环境）
					// env: config.isRelease ? 'test-0e84h' : 'test-0e84h',
					env: 'test-0e84h',
					traceUser: true,
				})
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},

		//获取设备ip地址
		getDeviceIp() {
			wx.request({
				url: 'https://pv.sohu.com/cityjson?ie=utf-8',
				success: (res) => {
					if (res && res.data && res.data.indexOf("cip") > -1) {
						var str = res.data.split(" = ")[1].split(";")[0];
						if (!utils.isEmpty(str)) {
							this.globalData.deviceIp = JSON.parse(str).cip;
							this.globalData.deviceCity = JSON.parse(str).cname;
						}
					}
				}
			});
		},

		// 检查更新
		checkUpdateVersion: function() {
			const updateManager = wx.getUpdateManager()
			const version = wx.getSystemInfoSync().SDKVersion;
			if (this.compareVersion(version, '1.1.0') < 0) {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
				return
			}
			// 检查更新
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					// 存在新版本
					updateManager.onUpdateReady(function() {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function(res) {
								if (res.confirm) {
									updateManager.applyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function() {
						wx.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，为了保证功能正常运行，请您手动删除当前小程序，重新搜索打开哟~',
							showCancel: false
						})
					})
				}
			})

		},
		compareVersion: function(v1, v2) {
			v1 = v1.split('.')
			v2 = v2.split('.')
			const len = Math.max(v1.length, v2.length)

			while (v1.length < len) {
				v1.push('0')
			}
			while (v2.length < len) {
				v2.push('0')
			}
			for (let i = 0; i < len; i++) {
				const num1 = parseInt(v1[i])
				const num2 = parseInt(v2[i])

				if (num1 > num2) {
					return 1
				} else if (num1 < num2) {
					return -1
				}
			}
			return 0
		},
	};
</script>

<style>
	/*每个页面公共css */
</style>
