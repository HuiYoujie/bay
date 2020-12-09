const {
	globalData
} = getApp();

// let context = wx.createCanvasContext('sign', this)

export default {
	data() {
		return {
			isMouseDown: false,
			lastLoc: {
				x: 0,
				y: 0
			},
			strokeColor: 'black'
		};
	},

	onLoad(option) {
		
	},

	onShow() {

	},

	onReady() {
		// this.ctx = wx.createCanvasContext('sign', this)
		
		const query = wx.createSelectorQuery()
		query.select('#canvas').fields({ 
			node: true, size: true ,
		}).exec((res) => {
			const canvas = res[0].node
			const ctx = canvas.getContext('2d')
			
			this.ctx = ctx
			
			this.drawGrid()
	
	// 		const dpr = wx.getSystemInfoSync().pixelRatio
	// 		canvas.width = res[0].width * dpr
	// 		canvas.height = res[0].height * dpr
	// 		ctx.scale(dpr, dpr)
	
	// 		ctx.fillRect(0, 0, 100, 100)
		})
	},

	onHide() {
		
	},

	onUnload() {
		
	},
	
	methods: {
		// //动态设置 #controller宽度,让其适应手机屏幕
		// $(" #controller").css('width',canvasWidth+'px');
		// //清除画布操作
		// $('#clear_btn').click(function(){
		// 	//清除画布上的字体
		// 	this.ctx.clearRect(0,0,canvasWidth,canvasHeight);
		// 	//重新绘画
		// 	drawGrid();
		// });
		// //颜色更换
		// $('.color_btn').click(function(e){
		// 	//选中按钮时移除掉边框
		// 	$('.color_btn').removeClass('color_btn_selected');
		// 	//再在当前按钮添加边框
		// 	$(this).addClass('color_btn_selected');
		// 	//把当前选中的按钮颜色赋值给画笔
		// 	strokeColor=$(this).css('background-color');
		// });
		
		// 画布背景
		drawGrid() {
			//保存当前画布
			this.ctx.save();
			//设置画布颜色
			this.ctx.strokeStyle = "rgb(230,11,9)";
			this.ctx.beginPath();	
			this.ctx.moveTo(3, 3);
			this.ctx.lineTo(375 - 3, 3);
			this.ctx.lineTo(375 - 3, 350 - 3);
			this.ctx.lineTo(3, 350 - 3);
			this.ctx.closePath();
		   
		
			this.ctx.lineWidth = 6;
			this.ctx.stroke();
		
		
			//四条直线
			this.ctx.beginPath();
			this.ctx.moveTo(0, 0);
			this.ctx.lineTo(375, 350);
		
			this.ctx.moveTo(0, 350);
			this.ctx.lineTo(375, 0);
		
			this.ctx.moveTo(0, 350 / 2);
			this.ctx.lineTo(375, 350 / 2);
		
			this.ctx.moveTo(375 / 2, 0);
			this.ctx.lineTo(375 / 2, 350);
		
			this.ctx.lineWidth = 1;
			this.ctx.stroke();
		
			this.ctx.restore();
		},
		
		// 开始滑动时
		touchstart(e) {
			// console.log(e)
			e.preventDefault();
			// console.log("mouse Down!");
			this.isMouseDown = true;
			console.log(this.lastLoc)
			// this.lastLoc = this.windowToCanvas(e.touches[0].x, e.touches[0].y);
			this.lastLoc = {
				x: e.touches[0].x,
				y: e.touches[0].y,
			}
			console.log(this.lastLoc)
		},
		// 结束滑动时
		touchend(e) {
			e.preventDefault();
			// console.log("mouse Up!");
			this.isMouseDown = false;
		},
		// 离开画布时
		touchcancel(e) {
			// e.preventDefault();
			// console.log("mouse out!");
			this.isMouseDown = false;
		},
		// 滑动时
		async touchmove(e) {
			e.preventDefault();
			// console.log("mouse move!");
			if(this.isMouseDown) {
				// let curLoc = await this.windowToCanvas(e.touches[0].x, e.touches[0].y)
				let curLoc = { 
					x: e.touches[0].x,
					y: e.touches[0].y,
				}
		
				//draw
				this.ctx.beginPath();
				console.log(this.lastLoc.x, this.lastLoc.y)
				this.ctx.moveTo(this.lastLoc.x, this.lastLoc.y);
				this.ctx.lineTo(curLoc.x, curLoc.y);
				//设置画笔颜色
				this.ctx.strokeStyle = this.strokeColor;
				//设置画笔粗细
				this.ctx.lineWidth = 5;
				//填补空白
				this.ctx.lineCap = "round";
				//线条更加平滑
				this.ctx.lineJoin = "round";
				//画线
				this.ctx.stroke();
				//当再画时，当前就是等于上一次开始的时候
				this.lastLoc = curLoc;
			}
		},
		
		//*屏幕坐标与canvas坐标的转换
		windowToCanvas(x, y){
			//创建canvas所对应的包围盒
			// var bbox = canvas.getBoundingClientRect();
			
			const query = wx.createSelectorQuery()
			query.select('#canvas').boundingClientRect()
			query.exec(res => {
				console.log('canvas容器', res);
				//返回屏幕x坐标减去bbox距离左边的间距就是canvas距离左边的位置,顶部同理左边
				console.log('坐标', x - res[0].left, y - res[0].top)
				return {
					x: Math.round(x - res[0].left),
					y: Math.round(y - res[0].top)
				};
			})
		}
	}
}

// window.onload=function(){
// 	//定义画布常量宽高(如果屏幕的大小-20比650小的话则在移动端，反之在pc端)
// 	var canvasWidth=Math.min(650,$(window).width()-20);
// 	var canvasHeight=canvasWidth;
// 	//默认鼠标按下为false
// 	var isMouseDown=false;
// 	//上一次鼠标记录的位置
// 	var lastLoc={x:0,y:0}; 
// 	//设置当前默认颜色
// 	var strokeColor="black";
// 	//获取画布
// 	var canvas=document.getElementById('canvas');
// 	//获取画布上下文
// 	var context=canvas.getContext('2d');
//     //设置画布大小
//     canvas.width=canvasWidth;
//     canvas.height=canvasHeight;

//     //调用画布
//  	drawGrid()
//  }
