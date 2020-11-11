<template>
    <view class="content">
		<!-- 个人信息 -->

		<!-- 工具列表 -->
        <u-cell-group title="tools">
            <u-cell-item title="计算日期" label="两种计算方式"></u-cell-item>
            <u-cell-item title="备忘录"></u-cell-item>
        </u-cell-group>

		<!-- 设置 -->
        <u-cell-group title="settings">
            <u-cell-item title="主题"></u-cell-item>
            <u-cell-item title="提示开关" arrow="false">
				<u-switch slot="right-icon" v-model="remind_checked" size="40"></u-switch>
			</u-cell-item>
        </u-cell-group>
    </view>
</template>

<script>
import log from '../../../utils/log';
import config from '../../../config.js';
const globalData = getApp().globalData;
export default {
    data() {
        return {
			remind_checked: true,
        };
    },
    onLoad() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 100vh;
}
</style>
