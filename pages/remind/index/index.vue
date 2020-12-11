<template>
	<view class="wrap">11
		<canvas type="2d" id="canvas" canvas-id='sign' @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancel="touchcancel" @longtap="" @error="touchcancel"></canvas>
	</view>
</template>


<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>