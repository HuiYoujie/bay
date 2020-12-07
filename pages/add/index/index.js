const {
	globalData
} = getApp();

export default {
	data() {
		return {
			form: {
				// 名称
				name: '',
				// 物品图片
				picUrl: '',
				// 星级
				rate: 0,
				// 生产日期
				PD: '',
				// 保质期
				ED: '',
				// 截止日期
				Exp: '',
				// 提醒flag
				remindFlag: true,
				// 过期前几个月提醒
				Exp_remind: '',
				description: '',
			},
			// 表单校验规则
			rules: {
				name: [
					{ 
						required: true, 
						message: '请输入名称', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					}
				],
				picUrl: [
					{
						required: true, 
						message: '请上传照片', 
						trigger: 'change'
					}
				]
			},
			colors: ['#dd524d', '#ff9500', '#ffb409', '#ffc454', '#4cd964'],
			// icons: ['thumb-down-fill', 'thumb-down-fill', 'thumb-up-fill', 'thumb-up-fill']
			// 日期选择开关
			date_picker_show: false,
			dateType: '',
			defaultDate: '',
			
			// 选择月份开关
			month_select_show: false,
			monthList: [
				{
					value: 1,
					label: '1个月'
				}, {
					value: 2,
					label: '2个月'
				}, {
					value: 3,
					label: '3个月'
				}, {
					value: 4,
					label: '4个月'
				}, {
					value: 5,
					label: '5个月'
				}, {
					value: 6,
					label: '6个月'
				}, {
					value: 7,
					label: '7个月'
				}, {
					value: 8,
					label: '8个月'
				}, {
					value: 9,
					label: '9个月'
				}, {
					value: 10,
					label: '10个月'
				}, {
					value: 11,
					label: '11个月'
				}, {
					value: 12,
					label: '12个月'
				}
			],
		};
	},

	onLoad(option) {
		
	},

	onShow() {

	},

	onReady() {
		this.$refs.uForm.setRules(this.rules);
		this.defaultDate = this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
	},

	onHide() {
		
	},

	onUnload() {
		
	},
	
	methods: {
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
		
		// 选择日期 type-日期类型
		showDatePicker(type) {
			this.date_picker_show = true
			this.dateType = type
			this.defaultDate = this.form[type] || this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
		},
		
		// 日期改变
		dateChange(e) {
			const {
				year,
				month,
				day
			} = e
			this.form[this.dateType] = [year, month, day].join('-')
		},
		
		// 清楚日期
		dateClear(type) {
			this.form[type] = ''
			this.date_picker_show = false
		},
		
		// 提醒flag变更
		remindFlagChange(e) {
			
		},
		
		// 取消返回
		cancel() {
			uni.navigateBack()
		},
		
		// 提交状态和个性签名
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					uni.showModal({
						title: '提示',
						content: '确认提交吗？',
						success: (res) => {
							if (res.confirm) {
								uni.showLoading({
									title: '正在提交',
									mask: true
								})
								// this.$u.post('/api/staff/saveInfoByStaffId', {
									
								// }).then(res => {
								// 	/**
								// 	 * 将vuex方法挂在到$u中
								// 	 */
								// 	// this.$u.vuex('vuex_refresh_flag.userState', true)
								// 	// let pages = getCurrentPages(); // 当前页面栈
								// 	// let prevPage = pages[pages.length - 2]; // 上一页面
								// 	// prevPage.onLoad()
								// 	uni.navigateBack()
								// }).catch(err => {
									
								// })
							} else if (res.cancel) {
				
							}
						}
					})
				}
			});
		}
	}
}