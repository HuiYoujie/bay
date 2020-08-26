var config = require('../config.js');

// 获取当前页面栈
const getCurrentPage = (isCurrent) => {
    let pages = getCurrentPages()
    let currentPage = pages.pop().route
    return isCurrent ? currentPage : pages
}

// 深拷贝
const deepClone = (obj, hash = new WeakMap()) => {
    if (obj === null) return obj;
    // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor();
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现一个递归拷贝
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    return cloneObj;
}

//判断两个对象里的值是否相等
function equals(x, y) {
    var f1 = x instanceof Object;
    var f2 = y instanceof Object;
    if (!f1 || !f2) {
        return x === y
    }
    if (Object.keys(x).length !== Object.keys(y).length) {
        return false
    }
    var newX = Object.keys(x);
    for (var p in newX) {
        p = newX[p];
        var a = x[p] instanceof Object;
        var b = y[p] instanceof Object;
        if (a && b) {
            equals(x[p], y[p])
        } else if (x[p] != y[p]) {
            return false;
        }
    }
    return true;
}

module.exports = {
    getCurrentPage,
    deepClone,
    equals
}