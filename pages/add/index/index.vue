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
						:action="action"
						max-count="9"
						width="190"
						height="190"
						:custom-btn="false" 
						:source-type="['camera', 'album']"
						:size-type="['compressed']"
						:auto-upload="true"
						:max-size="1 * 1024 * 1024"
						:show-upload-list="showUploadList" 
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


<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index.scss';
</style>
