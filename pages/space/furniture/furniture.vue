<template>
	<view class="wrap furniture">
		<view class="u-p-l-40 u-p-r-40">
			<!-- 表单数据 -->
			<u-form :model="form" ref="uForm" label-position="left" label-width="240rpx">
				<u-form-item label="家具名称" prop="name" :required="true">
					<u-input v-model="form.name" placeholder="请输入家具名称" />
				</u-form-item>
				<u-form-item label="自定义家具开关" prop="customPicFlag">
					<u-switch v-model="form.customPicFlag" @change="customPicFlagChange" :disabled="false" active-color="#19be6b" active-value="1" inactive-value="0" :vibrate-short="true" slot="right"></u-switch>
				</u-form-item>
				<u-form-item label="请上传家具图片" prop="picUrl" :required="true">
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
			</u-form>
			
			<!-- 按钮 -->
			<view class="u-flex u-row-right u-m-t-60">
				<u-button class="u-m-r-30" @click="cancel" type="default" size="medium">取消</u-button>
				<u-button @click="submit" type="primary" size="medium">提交</u-button>
			</view>
		</view>
		
        <u-toast ref="uToast"></u-toast>
	</view>
</template>

<script src="./furniture.js"></script>

<style lang="scss" scoped>
  @import './furniture.scss'
</style>