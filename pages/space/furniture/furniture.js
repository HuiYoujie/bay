const {
	globalData
} = getApp();

export default {
	data() {
		return {
			form: {
				name: '',
				customPicFlag: true,
				picUrl: '',
			},
		};
	},

	onLoad(option) {
		
	},

	onShow() {

	},

	onReady() {
		
	},

	onHide() {
		
	},

	onUnload() {
		
	},
	
	methods: {
		// 选择系统家具图片
		customPicFlagChange(e) {
			this.$refs.uToast.show({
				title: '暂不支持系统图片',
				type: 'warning'
			})
			this.form.customPicFlag = true
		},

		// 上传成功
		uploadSuccess(data, index, lists, name) {
			console.log('上传图片结果', data)
		},

		// 移除图片
		removeImg(index, lists, name) {
			let picList = []
			lists.map(v => {
				picList.push(v.response.url)
			})
			this.picList = picList
		},

		// 上传完成
		onUploaded(index, lists, name) {
			// console.log(index, lists, name)
		},
		
		// 取消返回
		cancel() {
			uni.navigateBack()
		},
		
		// 提交状态和个性签名
		submit() {
			/**
			 * 获取在线状态相关数据
			 * @param staffId - 员工Id *
			 * @param code - 在线状态 根据this.stateList
			 * @param autoFlag - 是否开启自动回复
			 * @param autoReplay - 自动回复内容
			 */
			this.$u.post('/api/staff/saveInfoByStaffId', {
				
			}).then(res => {
				/**
				 * 将vuex方法挂在到$u中
				 */
				// this.$u.vuex('vuex_refresh_flag.userState', true)
				// let pages = getCurrentPages(); // 当前页面栈
				// let prevPage = pages[pages.length - 2]; // 上一页面
				// prevPage.onLoad()
				uni.navigateBack()
			}).catch(err => {
				
			})
		}
	}
}
