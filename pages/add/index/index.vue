<template>
	<view class="wrap thing">
		<view class="u-p-l-40 u-p-r-40">
			<!-- 表单数据 -->
			<u-form ref="uForm" :model="form" error-type="['toast']" label-position="top" label-width="240rpx">
				<u-form-item label="物品名称" prop="name" required>
					<u-input v-model="form.name" placeholder="请输入家具名称" />
				</u-form-item>
				<u-form-item label="物品图片" prop="picUrl">
					<u-upload
						ref="uUpload"
						max-count="3"
						width="190"
						height="190"
						:custom-btn="false" 
						:source-type="['camera', 'album']"
						:size-type="['compressed']"
						:auto-upload="true"
						:max-size="1 * 1024 * 1024"
						:show-upload-list="true" 
						:file-list="picList"
						@on-success="uploadSuccess"
						@on-remove="removeImg"
						@on-uploaded="onUploaded"
					></u-upload>
				</u-form-item>
				<u-form-item label="购买日期" prop="PD">
					<u-input v-model="form.PD" @click="showDatePicker('PD')" type="select" placeholder="请选择生产日期" />
				</u-form-item>
				<!-- <u-form-item label="保质期" prop="ED">
					<u-input v-model="form.ED" @click="showMonthSelect()" type="select" placeholder="请选择保质期" />
				</u-form-item> -->
				<u-form-item label="过期日期" prop="Exp">
					<u-input v-model="form.Exp" @click="showDatePicker('Exp')" type="select" placeholder="请选择截止日期" />
				</u-form-item>
				<u-form-item label="提醒开关" prop="remindFlag" label-position="left">
					<u-switch v-model="form.remindFlag" @change="remindFlagChange" active-color="#19be6b" active-value="1" inactive-value="0" :vibrate-short="true" slot="right"></u-switch>
				</u-form-item>
				<!-- <u-form-item label="过期提醒时间" prop="Exp_remind">
					<u-input v-model="form.Exp_remind" @click="month_select_show = true" type="select" placeholder="请选择保质期" />
				</u-form-item> -->
				<u-form-item label="开始提醒时间" prop="Exp_remind">
					<u-input v-model="form.Exp_remind" @click="showDatePicker('Exp_remind')" type="select" placeholder="请选择保质期" />
				</u-form-item>
				<u-form-item label="备注" prop="description">
					<u-input v-model="form.description" type="textarea" placeholder="请输入备注" maxlength="100"></u-input>
				</u-form-item>
				<u-form-item label="重要性" prop="rate">
					<u-rate v-model="form.rate" :colors="colors" :icons="icons" inactive-icon="thumb-up"></u-rate>
				</u-form-item>
			</u-form>
			
			<!-- 按钮 -->
			<view class="u-flex u-row-right u-m-t-60 u-m-b-60">
				<u-button class="u-m-r-30" @click="cancel" type="default" size="medium">取消</u-button>
				<u-button @click="submit" type="primary" size="medium">提交</u-button>
			</view>
		</view>
		
		<!-- 日期 -->
		<u-picker 
			mode="time" 
			v-model="date_picker_show"
			start-year="2019"
			:default-time="defaultDate"
		    cancel-text="清除日期"
			@confirm="dateChange"
		    @cancel="dateClear"
		></u-picker>
		
		<!-- 月数选择 -->
		<u-select v-model="month_select_show" mode="single-column" :list="monthList" @confirm="confirm"></u-select>
		
        <u-toast ref="uToast"></u-toast>
	</view>
</template>


<script>
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
						trigger: ['change', 'blur'],
					}
				],
			},
			picList: [], // 上传图片列表
			showUploadList: [], // 上传图片预览列表
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

	onShow() {},

	onReady() {
		this.$refs.uForm.setRules(this.rules);
		this.defaultDate = this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
	},

	onHide() {},

	onUnload() {},
	
	methods: {
		// 上传成功
		uploadSuccess(data, index, lists, name) {
			console.log('上传图片结果', data)
			// wx.cloud.uploadFile({
			// 	cloudPath: 'example.png', // 上传至云端的路径
			// 	filePath: data, // 小程序临时文件路径
			// })
			// .then(res => {
			// 	// 返回文件 ID
			// 	console.log(res.fileID)
			// })
			// .catch(err => {
			// 	fail: console.error(err)
			// })
		},
	
		// 移除图片
		removeImg(index, lists, name) {
			console.log(index, lists, name)
		},
	
		// 上传完成
		onUploaded(index, lists, name) {
			console.log(index, lists, name)
			// this.picList = lists.map(v => {
			// 	return { 
			// 		url: v.response 
			// 	}
			// })
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
			debugger
			this.lists = this.$refs.uUpload.lists;
			this.form.picUrl = this.lists.map(v => v.url).join(',')
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
								wx.cloud.callFunction({
									name: 'addFurniture',
									data: {
										userId: this.vuex_userId,
										default_familyId: this.$store.state.vuex_default_familyId,
										...this.form,
									}
								})
								.then(res => {
									if(true) {
										this.$refs.uToast.show({
											title: '新增成功',
											type: 'success',
										})
									}
								})
								.catch(err => {
									console.error(err)
								})
								.finally(() => {
									uni.hideLoading()
								})
							}
						}
					})
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.thing {
	background-color: #FFF;
}
</style>
