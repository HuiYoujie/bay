Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'wap-home',
				text: '空间',
				url: '../../pages/space/space'
			},
			{
				icon: 'apps-o',
				text: '物品',
				url: '../../pages/thing/thing'
			},
			{
				icon: 'bulb-o',
				text: '提醒',
				url: '../../pages/remind/remind',
				info: 1
			},
			{
				icon: 'user-circle-o',
				text: '我的',
				url: '../../pages/mine/mine'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `../../${page.route}`)
			});
		}
	}
});
