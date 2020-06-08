/**
 * 判断对象是否为null或者空
 * @param {object} obj
 */
const isNullOrEmpty = (obj) => {
	if (!obj) return true;
	if (Array.isArray(obj)) return obj.length === 0;
	switch (typeof obj) {
		case "string":
			return obj.length === 0;
		case "object":
			return Object.keys(obj).length === 0;
		case "undefined":
			return true;
		default:
			return true;
	}
};
/**
 * 实现简单的线程休眠功能
 * @param {number} time 休眠的时间长度
 */
const threadSleep = (time = 0) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
};
module.exports = {
	isNullOrEmpty: isNullOrEmpty,
	threadSleep: threadSleep,
};
