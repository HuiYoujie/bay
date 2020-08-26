// ios new Date()无法处理“XXXX-XX-XX”日期
// date = new Date(date.toString().replace(/-/g, "/"));

const addZreo = (num) => {
    if (num < 10) {
        num = '0' + num
    }
    return num;
};

// 年月日
const formatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
}

// 年月日-时分秒
const formatTime = date => {
    const date = new Date(date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

moudle.exports = {
    formatDate,
    formatTime
}