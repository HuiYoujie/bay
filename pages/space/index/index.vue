<template>
    <view class="u-flex-col wrap u-skeleton">
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
            closeable
            close-icon-pos
            safe-area-inset-bottom="true">
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
		 <!-- :style="{height: (phoneInfo.windowHeight - phoneInfo.statusBarHeight - 44) + 'px'}" -->
        <view class="u-flex-12 u-flex-col">
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
                @animationfinish="animationfinish">
                <swiper-item class="swiper-item" v-for="(item, index) in roomInfo" :key="index">
                    <scroll-view
                        scroll-y
                        style="height: 100%;width: 100%;"
                        @scrolltolower="reachBottom">
                        <view class="page-box">
							<!-- <view class="u-m-t-40" style="width: 100%;">
								<u-loadmore class="u-skeleton-fillet" :status="loadStatus[index]" bg-color="transparent"></u-loadmore>
							</view> -->
                            <view v-if="furnitureInfo.length" class="u-flex flex-col u-col-top u-skeleton-fillet container">
								<u-grid :col="3" :border="true" @click="furnitureDetail">
									<u-grid-item v-for="(item, i) in furnitureInfo" :key="i" :index="i" bg-color="transparent">
										<u-icon name="plus-circle" :size="50" color="#1ab16c"></u-icon>
										<view class="grid-text">{{item.furnitureName}}</view>
									</u-grid-item>
								</u-grid>
							</view>
							<view v-else class="u-m-t-40">
								<u-empty class="u-skeleton-fillet" text="暂无家具" mode="data"></u-empty>
							</view>
                        	<view class="u-flex u-flex-col u-col-center u-m-t-40">
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

<script>
import log from '../../../utils/log';
import config from '../../../config.js';
const globalData = getApp().globalData;
export default {
	data() {
		return {
			// 设备相关数据
			phoneInfo: globalData.phoneInfo,

			// 骨架屏
			skeleton_loading: true,

			// content页面相关数据
			familyInfo: [], // 家庭信息
			roomInfo: [],	// 房间信息
			furnitureInfo: [], // 家具信息
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			// dx: 0,
			loadStatus: [],

			// 顶部-左侧-底部相关数据
			popup_show: false,
		};
	},
	
	async onLoad() {
		// 登录
		await this.login()
		await this.getFurnitureInfo(this.current);	
		
		// 骨架屏
		
		// uToast
		// this.$refs.uToast.show({
		// 	title: '登录成功',
		// 	type: 'success',
		// 	url: '/pages/user/index'
		// })
	},
	
	methods: {
		// 登录
		login() {
			return new Promise((resolve, reject) => {
				wx.cloud.callFunction({
					name: 'login',
				}).then(res => {
					let {
						openid,
						appid,
						unionid,
						env,
						// 解构
						userInfo: {
							userId,
							avatar,
							gender,
							status
						},
						familyInfo,
						roomInfo
					} = res.result
					// console.log(res) 
					// console.log(userId, avatar, gender, status);
					
					this.familyInfo = familyInfo
					this.roomInfo = roomInfo
					
					this.loadStatus = new Array(roomInfo.length).fill('loadmore')
					
					// 隐藏骨架屏
					this.skeleton_loading = false;
					
					/**
					 * 保存房屋重要信息
					 */
					this.$u.vuex('vuex_userId', userId)
					this.$u.vuex('vuex_openid', openid)
					let defaultFamilyId = familyInfo.find(v => v.isDefault).familyId
					this.$u.vuex('vuex_defaultFamilyId', defaultFamilyId)
					
					resolve()
				}).catch(console.error)
			})
		},
		
		/**
		 * 页面内容相关数据
		 */
		// 获取页面数据
		getFurnitureInfo(index) {
			return new Promise((resolve, reject) => {
				this.loadStatus.splice(index, 1, "loading");
				wx.cloud.callFunction({
					name: 'getFurniture',
					data: {
						roomId: this.roomInfo[index].roomId || ''
					}
				})
				.then(res => {
					this.loadStatus.splice(index, 1, "nomore");
					console.log(res);
					this.furnitureInfo = res.result.furnitureInfo
				})
				.catch(err => {
					console.error(err)
				})
			})
		},

		// 触底加载数据
		reachBottom() {
			// 此tab为空数据
			// if(this.current != 2) {
			// 	this.loadStatus.splice(this.current,1,"loading")
			// 	setTimeout(() => {
			// 		this.getFurnitureInfo(this.current);
			// 	}, 1200);
			// }
		},
		
		// 
		// addStorage() {
			
		// },

		// tabs通知swiper切换
		tabsChange(index) {
			this.furnitureInfo = []
			this.swiperCurrent = index;
			this.getFurnitureInfo(index);
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
			
			this.$u.vuex('currentRoomInfo', this.roomInfo[current])
		},
		
		// 跳转至添加家具页面
		toPageAddFurniture() {
			this.$u.route('/pages/space/furniture/furniture?roomId=' + this.roomInfo[this.current].roomId)
		},
		
		// 跳转到家具物品页面 
		furnitureDetail(e) {
			let { current } = e.detail;
			this.$u.route('/pages/space/thing-list/thing-list?furnitureId=' + this.furnitureInfo[current].furnitureId)
		},
		
		// 跳转至添加物品页面
		toPageAddThing(roomId) {
			
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
			this.$u.route('/pages/space/furniture/furniture')
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
    width: 100%;
	background-color: #FFF;
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
				/deep/ .u-btn--primary {
					border-color: $theme-color;
					background-color: $theme-color;
				}
				/deep/ .grid-text {
					font-size: 28rpx;
					margin-top: 20rpx;
					color: $u-type-info;
				}
			}
        }
    }
}
</style>