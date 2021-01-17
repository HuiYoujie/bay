# 云开发 quickstart
这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：
- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## uni
- 由于1.5.6版本新增了this.$u.sys()和this.$u.os()属性，因为属性是初始化时执行一次，导致获取首页和 内页通过this.$u.sys获取windowHeight高度可能不准确的问题，详见全局赋值设备信息的陷阱。
- 如果之前是HBuilderX工程，则把HBuilderX工程内的文件（除 unpackage、node_modules 目录）拷贝至 vue-cli 工程的 src 目录。 在 vue-cli 工程内重新安装 npm 依赖（如果之前使用了 npm 依赖的话）
- cli创建项目时若选择hello uni-app模板，可看到其中已经自带部分测试例。

## 云开发 uni-app每次编译会出问题 
- cnpm install --save wx-server-sdk@latest

## sdk
# @vant
- npm i @vant/weapp -S --production


## 全局变量以及缓存
- 全局变量——存储个人信息
- 缓存——手机信息，版本号，部分个人信息（openId，unionId，头像，昵称）


## 小程序结构
- 空间——区分房子——分区——大收纳——小收纳（可忽略）——具体物品——物品信息 | 物品迁移
- 物品——区分是否已收纳——具体物品——物品信息 | 搜索——物品列表——具体物品——物品信息
- 提醒——区分状态——具体物品（过期时间）——物品信息
- 我的——小工具——扫码/备忘录
- 物品信息 食物：生产日期/保质期/过期时间/位置 | 提醒时间（过期时间前几个月）


## 全局配置
# 属性	                      类型	    必填	描述	最低版本
- entryPagePath	            string	    否	小程序默认启动首页	
- pages	                    string[]	是	页面路径列表	
- window	                Object	    否	全局的默认窗口表现	
- tabBar	                Object	    否	底部 tab 栏的表现	
- networkTimeout	        Object	    否	网络超时时间	
- debug	                    boolean	    否	是否开启 debug 模式，默认关闭	
- functionalPages	        boolean	    否	是否启用插件功能页，默认关闭	2.1.0
- subpackages	            Object[]	否	分包结构配置	1.7.3
- workers	                string	    否	Worker 代码放置的目录	1.9.90
- requiredBackgroundModes	string[]	否	需要在后台使用的能力，如「音乐播放」	
- plugins	                Object	    否	使用到的插件	1.9.6
- preloadRule	            Object	    否	分包预下载规则	2.3.0
- resizable	                boolean	    否	PC 小程序是否支持用户任意改变窗口大小（包括最大化窗口）；iPad 小程序是否支持屏幕旋转。默认关闭	2.3.0
- usingComponents	        Object	    否	全局自定义组件配置	开发者工具 1.02.1810190
- permission	            Object	    否	小程序接口权限相关设置	微信客户端 7.0.0
- sitemapLocation	        string	    是	指明 sitemap.json 的位置	
- style	                    string	    否	指定使用升级后的weui样式	2.8.0
- useExtendedLib	        Object	    否	指定需要引用的扩展库	2.2.1
- entranceDeclare	        Object	    否	微信消息用小程序打开	微信客户端7.0.9
- darkmode	                boolean	    否	小程序支持 DarkMode	2.11.0
- themeLocation	            string	    否	指明 theme.json 的位置，darkmode为true为必填	开发者工具 1.03.2004271
- lazyCodeLoading	        string	    否	配置自定义组件代码按需注入	2.11.1
- singlePage	            Object	    否	单页模式相关配置	2.12.0

## 页面配置
# 属性	                            类型	    默认值	    描述	最低版本
- navigationBarBackgroundColor	HexColor	#000000	    导航栏背景颜色，如 #000000	
- navigationBarTextStyle	    string	    white	    导航栏标题颜色，仅支持 black / white	
- navigationBarTitleText	    string		            导航栏标题文字内容	
- navigationStyle	            string	    default	    导航栏样式，仅支持以下值：1.default 默认样式 2.custom 自定义导航栏，只保留右上角胶囊按钮	微信客户端 7.0.0
- backgroundColor	            HexColor	#ffffff	    窗口的背景色	
- backgroundTextStyle	        string	    dark	    下拉 loading 的样式，仅支持 dark / light	
- backgroundColorTop	        string	    #ffffff	    顶部窗口的背景色，仅 iOS 支持	微信客户端 6.5.16
- backgroundColorBottom	        string	    #ffffff	    底部窗口的背景色，仅 iOS 支持	微信客户端 6.5.16
- enablePullDownRefresh	        boolean	    false	    是否开启当前页面下拉刷新。详见 Page.onPullDownRefresh	
- onReachBottomDistance	        number	    50	        页面上拉触底事件触发时距页面底部距离，单位为px。详见 Page.onReachBottom	
- pageOrientation	            string	    portrait	屏幕旋转设置，支持 auto / portrait / landscape 详见 响应显示区域变化	2.4.0 (auto) / 2.5.0 (landscape)
- disableScroll	                boolean	    false	    设置为 true 则页面整体不能上下滚动。只在页面配置中有效，无法在 app.json 中设置	
- usingComponents	            Object	    否	        页面自定义组件配置	1.6.3
- style	                        string	    default	    启用新版的组件样式	2.10.2
- singlePage	                Object	    否	        单页模式相关配置	2.12.0