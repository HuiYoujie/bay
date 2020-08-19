const config = require('../config.js');
// 日志类型
const e = (arg1, arg2) => {
    if (!config.isRelease) {
        !arg2 ? console.error(arg1) : console.error(arg1, arg2);
    }
}
const w = (arg1, arg2) => {
    if (!config.isRelease) {
        !arg2 ? console.warn(arg1) : console.warn(arg1, arg2);
    }
}
const i = (arg1, arg2) => {
    if (!config.isRelease) {
        !arg2 ? console.info(arg1) : console.info(arg1, arg2);
    }
}

module.exports = {
    e,
    w,
    i
}