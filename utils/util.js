var config = require('../config.js');

// 获取当前页面栈
// function getCurrentPage(isCurrent) {
//     let pages = getCurrentPages()
//     let currentPage = getCurrentPages().pop().route
//     return isCurrent ? currentPage : ''
// }
const getCurrentPage = (isCurrent) => {
    let pages = getCurrentPages()
    let currentPage = pages.pop().route
    return isCurrent ? currentPage : pages
}

// 日志类型
const e = (vlaue, key) => {
    if (!config.isRelease) {
        !key ? console.error(vlaue) : console.error(key, vlaue);
    }
}
const w = (vlaue, key) => {
    if (!config.isRelease) {
        !key ? console.warn(vlaue) : console.warn(key, vlaue);
    }
}
const i = (vlaue, key) => {
    if (!config.isRelease) {
        !key ? console.info(vlaue) : console.info(key, vlaue);
    }
}

module.exports = {
    getCurrentPage,
}