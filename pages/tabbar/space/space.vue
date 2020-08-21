<template>
    <view>
		<!-- <u-navbar :is-back="false" title="首页" height="44">
			<u-icon slot="right" name="search"></u-icon>
		</u-navbar> -->
        <view class="wrap">
            <!-- tab盒子 -->
            <view class="u-flex u-row-between u-tabs-box">
                <u-tabs-swiper
                    ref="uTabs"
					class="u-flex-1"
                    :list="tabsList"
                    name="area_name"
                    :current="current"
                    @change="tabsChange"
                    :is-scroll="true"
                    swiperWidth="750"
					bg-color="$theme-color"
					active-color="#fff"
					inactive-color="#ddd"
					bold="false"
                ></u-tabs-swiper>
				<view class="u-flex u-row-center grid-icon-box">
					<u-icon name="grid" size="40" color="#fff"></u-icon>
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
                            <view class="order"></view>
                            <u-loadmore :status="loadStatus[0]" bgcolor="#f2f2f2"></u-loadmore>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
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
        };
    },
    onLoad() {
		// 骨架屏
		this.getOrderList(0)
	},
    methods: {
		getOrderList(i) {
			this.loadStatus.splice(this.current,1,"loadmore")
		},
		
        // reachBottom() {
        // 	// 此tab为空数据
        // 	if(this.current != 2) {
        // 		this.loadStatus.splice(this.current,1,"loading")
        // 		setTimeout(() => {
        // 			this.getOrderList(this.current);
        // 		}, 1200);
        // 	}
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
    },
};
</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--window-top)); //  - 88upx
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
        }
    }
}
</style>
