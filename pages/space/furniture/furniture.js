const {
	globalData
} = getApp();

export default {
	data() {
		return {
			roomId: '',
			form: {
				name: '',
				customPicFlag: true,
				picUrl: '',
				action: '',
			},
			fileID: '',
			showUploadList: true
		};
	},

	onLoad(option) {
		this.roomId = option.roomId
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
			console.log('上传图片结果', lists)
			this.form.picUrl = data
		},

		// 移除图片
		removeImg(index, lists, name) {
			
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
			// 检查数据
			this.$refs.uUpload.upload();
			
			if(!this.form.picUrl) {
				uni.showToast({
					title: '图片不能为空'
				})
				return
			}
			wx.cloud.callFunction({
				name: 'addFurniture', 
				data: {
					roomId: this.roomId,
					userId: this.userId,
					furnitureName: this.form.name,
					customPicFlag: this.form.customPicFlag,
					picUrl: this.form.picUrl,
				},
			}).then(res => {
			  console.log(res) 
			  
			  uni.navigateBack()
			}).catch(console.error)
		}
	}
}
