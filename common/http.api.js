// /common/http.api.js

	// ---------------------------------------------- 首页
	/**
	 * 微信登录
	 * @param code - 登录凭证 *
	 */
let wxlogin = '/xcx/get-session-id',
	
	/**
	 * 企业微信登录
	 * @param code - 登录凭证 *
	 */
	qywxlogin = '/qy-xcx/get-session-id',
	
	/**
	 * 问题列表
	 * @param userId - 用户ID *
	 * @param pageNum * 页码
	 * @param size * 条数
	 * @param state - 状态 0-待处理 1-进行中 2-已解决 3-已关闭,
	 * @param date - 时间
	 * @param content - 标题或内容
	 */
	selectQuestionList = '/api/appletsQuestionHead/selectQuestionList',
	
	// ---------------------------------------------- 新增问题页面
	/**
	 * 提问人员类型列表
	 */
	getCategoryList = '/api/sysPosition/getList',
	
	/**
	 * 提问人员部门列表
	 */
	getDepartList = '/api/sysSalesDepart/getList',
	
	/**
	 *  新增问题 - insertQuestion
	 *	@param staffId - 员工id
	 *	@param staffId - 员工id
	 *	@param questionTitle - 标题
	 *	@param questionContent - 内容
	 *	@param questionPic - 附件地址 逗号拼接
	 */
	insertQuestion = '/api/appletsQuestionHead/insertQuestion',
	
	// ---------------------------------------------- 聊天页面
	/**
	 * 更改问题状态
	 * @param questionHeadId - 问题id 
	 * @param state - 状态
	 */
	updateQuestionState = '/api/appletsQuestionHead/updateQuestionState',
	
	/**
	 * 问题详情
	 * @param questionHeadId - 问题id 
	 */
	getQuestionInfo = '/api/appletsQuestionHead/getQuestionInfo',
	
	/**
	 * 发送消息-并且存入数据库	
	 *	@param questionIm * {
			questionHeadId - 问题id *
			staffId - 用户id *
			imType - 发言类型 0文本 1图片 2文件 3语音 4小视频' *
			imContent - 内容 *
			atStaffId - @人ID 
		} 
	 *
	 */
	insertQuestionIm = '/api/questionIm/insertQuestionIm',
	
	/**
	 * 获取聊天记录
	 * @param questionHeadId - 问题id  
	 * @param pageNum - 页码
	 * @param size - 条数
	 */
	getListByQuestionHeadId = '/api/questionIm/getListByQuestionHeadId',

	
	// ---------------------------------------------- 分享页面
	/**
	 * 根据企业id获取人员
	 * @param questionHeadId - 问题id *
	 */
	selectStaffList = '/api/staff/selectStaffList',
	
	/**
	 * 分享问题
	 * @param questionHeadId - 问题id
	 * @param staffId - 选择的人,逗号分隔
	 * @param createBy - 当前登录人
	 * @param groupId - 群组id
	 */
	shareQuestion = '/api/questionGroup/insertQuestionGroup';


// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	let wxlogin = (params = {}) => vm.$u.get(wxlogin, params);
	let qywxlogin = (params = {}) => vm.$u.get(qywxlogin, params);
	let selectQuestionList = (params = {}) => vm.$u.get(selectQuestionList, params);
	let getCategoryList = (params = {}) => vm.$u.get(getCategoryList, params);
	let getDepartList = (params = {}) => vm.$u.get(getDepartList, params);
	let insertQuestion = (params = {}) => vm.$u.post(insertQuestion, params);
	let updateQuestionState = (params = {}) => vm.$u.get(updateQuestionState, params);
	let getQuestionInfo = (params = {}) => vm.$u.get(getQuestionInfo, params);
	let insertQuestionIm = (params = {}) => vm.$u.post(insertQuestionIm, params);
	let getListByQuestionHeadId = (params = {}) => vm.$u.get(getListByQuestionHeadId, params);
	let selectStaffList = (params = {}) => vm.$u.get(selectStaffList, params);
	let shareQuestion = (params = {}) => vm.$u.post(shareQuestion, params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		wxlogin,
		qywxlogin, 
		selectQuestionList,
		getCategoryList,
		getDepartList,
		insertQuestion,
		updateQuestionState,
		getQuestionInfo,
		insertQuestionIm,
		getListByQuestionHeadId,
		selectStaffList,
		shareQuestion
	};
}

export default {
	install
}