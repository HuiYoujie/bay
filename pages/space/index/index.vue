<template>
    <view class="wrap u-skeleton">
        <!-- 导航栏 -->
        <u-navbar
            title="首页"
            title-color="#fff"
            back-icon-color="#efefef"
            back-icon-name="plus"
            height="44"
            :custom-back="showPopup"
			:isShowSearch="true"
			:searchThing="search"
            :background="{ backgroundColor: '#1ab16c' }"
            :border-bottom="false"
        ></u-navbar>


        <!-- 左侧弹层 -->
        <u-popup
            border-radius="10"
            v-model="popup_show"
            @open="popupOpen"
            @close="popupClose"
            length="75%"
            closeable="closeable"
            close-icon-pos
            safe-area-inset-bottom="true"
        >
            <view class="u-flex u-flex-col u-popup-cont">
				<u-gap height="80"></u-gap>
                <u-button class="u-m-t-60" size="medium" @click="popup_show = false;">关闭弹窗</u-button>
            </view>
        </u-popup>

        <!--  -->
        <!-- <u-action-sheet
            :cancel-btn="cancel"
            :mask-close-able="maskClick"
            :tips="tips"
            @click="click"
            :list="list"
            v-model="show"
            :safe-area-inset-bottom="true"
        ></u-action-sheet>-->

        <!-- 页面内容 -->
        <view class="wrap" :style="{height: (phoneInfo.windowHeight - phoneInfo.statusBarHeight - 44) + 'px'}">
            <!-- tab盒子 -->
            <view class="u-flex u-row-between u-tabs-box">
                <u-tabs-swiper
                    ref="uTabs"
                    class="u-flex-1 u-skeleton-fillet"
					style="width: 670rpx;"
                    :list="roomInfo"
                    name="area_name"
                    :current="current"
                    @change="tabsChange"
                    :is-scroll="true"
                    swiperWidth="750"
                    bg-color="$theme-color"
                    active-color="#fff"
                    inactive-color="#dedede"
                    bold="false"
                ></u-tabs-swiper>
                <view class="u-flex u-row-center grid-icon-box">
                    <u-icon class="u-skeleton-circle" name="grid" size="40" color="#efefef"></u-icon>
                </view>
            </view>
            <!-- 内容盒子 -->
            <swiper
                class="u-flex-1 swiper-box"
                :current="swiperCurrent"
                @transition="transition"
                @animationfinish="animationfinish"
            >
                <swiper-item class="swiper-item" v-for="(item, index) in roomInfo" :key="index">
                    <scroll-view
                        scroll-y
                        style="height: 100%;width: 100%;"
                        @scrolltolower="reachBottom"
                    >
                        <view class="page-box">
                            <view v-if="furnitureInfo.length > 0" class="u-flex flex-col u-col-top u-skeleton-fillet container">
								<u-grid :col="3" :border="true" @click="furnitureDetail">
									<u-grid-item v-for="(item, i) in furnitureInfo" :key="i" :index="i" bg-color="transparent">
										<u-icon name="plus-circle" :size="50" color="#1ab16c"></u-icon>
										<view class="grid-text">{{item.furnitureName}}</view>
									</u-grid-item>
								</u-grid>
							</view>
                        	<view v-else class="u-flex u-flex-col u-col-center u-p-t-60">
								<u-empty  class="u-skeleton-fillet" text="暂无家具" mode="data"></u-empty>
								<u-button class="u-m-t-40 u-skeleton-fillet" @click="toPageAddFurniture" type="primary" ripple="true" size="medium">去添加</u-button>
							</view>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>

		<u-skeleton :loading="skeleton_loading" :animation="false" el-color="#ddd" bg-color="#fff"></u-skeleton>

        <u-toast ref="uToast"></u-toast>
    </view>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import './index.scss'
</style>