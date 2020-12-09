<template>
    <canvas type="2d" id="canvas" canvas-id='sign' @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancel="touchcancel" @longtap="" @error="touchcancel"></canvas>
</template>


<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>