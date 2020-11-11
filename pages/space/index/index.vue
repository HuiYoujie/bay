<template>
    <view class="u-skeleton">
        <!-- 导航栏 -->
        <u-navbar
            title="首页"
            title-color="#fff"
            back-icon-color="#efefef"
            back-icon-name="plus"
            height="44"
            :custom-back="showPopup"
			:isShowSearch="false"
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
            <view class="u-flex flex-col u-popup-cont">
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
                    :list="tabsList"
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
                <swiper-item class="swiper-item" v-for="(item, index) in tabsList" :key="index">
                    <scroll-view
                        scroll-y
                        style="height: 100%;width: 100%;"
                        @scrolltolower="reachBottom"
                    >
                        <view class="page-box">
                            <view v-if="tabsList.length > 10" class="u-flex flex-col u-col-top u-skeleton-fillet container">
								<block v-for="(item, index) in tabsList" :key="index">
									<text class="u-skeleton-fillet">{{item.area_name}}</text>
								</block>
								<view class="u-m-t-40">
									<u-loadmore class="u-skeleton-fillet" :status="loadStatus[0]" bgcolor="#f2f2f2"></u-loadmore>
								</view>
							</view>
                        	<view v-else class="u-flex flex-col u-col-center u-m-t-60">
								<u-empty  class="u-skeleton-fillet" text="暂无储物空间" mode="data"></u-empty>
								<u-button class="u-m-t-40 u-skeleton-fillet" @click="addRoom" type="primary" ripple="true" size="medium">去添加</u-button>
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
<script>
import log from '../../../utils/log';
import config from '../../../config.js';
const globalData = getApp().globalData;
export default {
    data() {
        return {
			// 页面数据
			phoneInfo: globalData.phoneInfo,

			// 骨架屏
			skeleton_loading: true,

            // content页面相关数据
            tabsList: [
                {
                    area_name: "主卧",
                    sort: 0,
                },
                {
                    area_name: "次卧",
                    sort: 0,
                },
                {
                    area_name: "玄关",
                    sort: 0,
                },
                {
                    area_name: "客厅",
                    sort: 0,
                },
                {
                    area_name: "厨房",
                    sort: 0,
                },
            ],
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
            dx: 0,
            loadStatus: ["loadmore", "loadmore", "loadmore", "loadmore"],

            // 顶部-左侧-底部相关数据
            popup_show: false,
        };
    },
    onLoad() {
        // 骨架屏
		
		this.getOrderList(0);	

		setTimeout(() => {
			this.skeleton_loading = false;
		}, 2000)
	},
	
    methods: {
        /**
         * 页面内容相关数据
         */
		// 获取页面数据
        getOrderList(i) {
            this.loadStatus.splice(this.current, 1, "loadmore");
        },

		// 触底加载数据
        // reachBottom() {
        // 	// 此tab为空数据
        // 	if(this.current != 2) {
        // 		this.loadStatus.splice(this.current,1,"loading")
        // 		setTimeout(() => {
        // 			this.getOrderList(this.current);
        // 		}, 1200);
        // 	}
		// },
		
		// 
		// addStorage() {
			
		// },

        // tabs通知swiper切换
        tabsChange(index) {
            this.swiperCurrent = index;
        },

        // swiper-item左右移动，通知tabs的滑块跟随移动
        transition(e) {
            let { dx } = e.detail;
            this.$refs.uTabs.setDx(dx);
        },

        // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
        // swiper滑动结束，分别设置tabs和swiper的状态
        animationfinish(e) {
            let { current } = e.detail;
            this.$refs.uTabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;
        },
		
		// 跳转至添加房间页面
		addRoom() {
			console.log(1);
			uni.navigateTo({
				url: '../room-edit'
			})
			// this.$u.route('/pages/space-edit')
			// this.$u.route('../../space-edit')
		},

        /**
         * 顶部-左侧-底部相关数据
         */
        showPopup() {
            this.popup_show = true;
        },
        addHome() {},
        // 弹层打开
        popupOpen() {},
        // 弹层关闭
        popupClose() {},
		
		// 跳转到搜索页面
		search() {
			console.log("1: " + 1);
			// this.$u.route('/pages/tabbar/add/add');
		},
    },

    onShow: function () {
        // Do something when page show.
	},
	
    onReady: function () {
        // Do something when page ready.
	},
	
    onHide: function () {
        // Do something when page hide.
	},
	
    onUnload: function () {
        // Do something when page close.
	},
	
    onPullDownRefresh: function () {
        // Do something when pull down.
	},
	
    onReachBottom: function () {
        // Do something when page reach bottom.
	},
	
    onShareAppMessage: function () {
		return {
			title: config.shareTitle,
			// path: '',
			// imageUrl: ''
		}
	},

	onShareTimeline: function () {
		return {
			title: config.shareTitle,
			// query: '',
			// imageUrl: ''
		}
	},
	
    onPageScroll: function () {
        // Do something when page scroll
	},
	
    onResize: function () {
        // Do something when page resize
	},
	
    onTabItemTap(item) {
        // console.log(item.index);
        // console.log(item.pagePath);
        // console.log(item.text);
    },
};
</script>

<style lang="scss" scoped>
.u-popup-cont {
	height: 100%;
}
.wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    .u-tabs-box {
        background-color: $theme-color;
        .grid-icon-box {
            width: 80upx;
            height: 80upx;
        }
    }
    .swiper-box {
        .swiper-item {
			height: 100%;
			.page-box {
				padding: 30upx;
				// .container {
				// 	width: 100%;
				// 	height: 100%;
				// }
				/deep/ .u-btn--primary {
					border-color: $theme-color;
					background-color: $theme-color;
				}
			}
        }
    }
}
</style>
