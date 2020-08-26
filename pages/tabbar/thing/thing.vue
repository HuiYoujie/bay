<template>
	<view class="content">
		<u-search v-model="value" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled" :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
