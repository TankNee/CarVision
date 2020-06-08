const Core = require("@alicloud/pop-core");
const config = require("../config");
const coreConfig = {
	accessKeyId: config.aliyun.account.imageRecognize.accessKeyId,
	accessKeySecret: config.aliyun.account.imageRecognize.accessKeySecret,
	endpoint: "",
	apiVersion: "",
};
var params = {
	RegionId: "cn-shanghai",
};
requestOption = {
	method: "post",
};
/**
 * 服务调用
 * @param {{ImageURL:string}} payload 图片OSS地址
 * @param {string} recognizeType 识别类型
 * @returns {Promise<>}
 */
const serviceRequest = (payload, recognizeType) => {
	coreConfig.endpoint = recognizeType.endpoint;
	coreConfig.apiVersion = recognizeType.apiVersion;
	params = { ...params, ...payload };
	var client = new Core(coreConfig);
	return client.request(recognizeType.type, params, requestOption);
};
module.exports = {
	serviceRequest: serviceRequest,
};
