
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
		
		// uToast
		// this.$refs.uToast.show({
		// 	title: '登录成功',
		// 	type: 'success',
		// 	url: '/pages/user/index'
		// })
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
        reachBottom() {
        	// 此tab为空数据
        	if(this.current != 2) {
        		this.loadStatus.splice(this.current,1,"loading")
        		setTimeout(() => {
        			this.getOrderList(this.current);
        		}, 1200);
        	}
		},
		
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
		addFurniture() {
			this.$u.route('/pages/space/furniture/furniture')
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