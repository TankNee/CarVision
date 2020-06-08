const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const config = require("../config");
const { Helper } = require("../utils");
const OSS = require("ali-oss");
const OSSClient = new OSS({
	region: config.aliyun.account.oss.buckets.shanghai.region,
	accessKeyId: config.aliyun.account.oss.accessKeyId,
	accessKeySecret: config.aliyun.account.oss.accessKeySecret,
	bucket: config.aliyun.account.oss.buckets.shanghai.bucketName,
});
/**
 * 文件上传解析
 * @param {object} request
 * @param {{encoding:string,uploadDir:string,maxFieldsSize:number}} options
 * @returns {Promise<string[]>} 返回一个字符串数组
 */
const handleUpload = (request, options = {}) => {
	var form = formidable.IncomingForm();
	form.encoding = options.encoding || "utf-8";
	form.uploadDir = options.uploadDir || path.join(__dirname + "/../upload/images");
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = options.maxFieldsSize || 2 * 1024 * 1024;
	return new Promise((resolve, reject) => {
		form.parse(request, (err, field, files) => {
			if (err) {
				reject(err);
				return;
			}
			var fileArray = new Array();
			var fileNameArray = new Array();
			for (var key in files) {
				if (files[key].size === 0) {
					fs.unlinkSync(files[key].path);
					reject(files);
					return;
				} else {
					fileArray.push(files[key]);
				}
			}
			fileArray.forEach((file) => {
				var fileName = file.name;
				var nameArray = fileName.split(".");
				var suffix = nameArray[nameArray.length - 1];
				var newFileName = `${Date.now()}${Math.floor(Math.random() * 10000000)}.${suffix}`;
				var newPath = `${form.uploadDir}/${newFileName}`;
				fs.renameSync(file.path, newPath);
				fileNameArray.push({
					fileName: newFileName,
					absolutePath: newPath,
					relativePath: `/upload/images/${newFileName}`,
				});
			});
			resolve(fileNameArray);
		});
	});
};
/**
 * 将文件上传到OSS
 * @param {string} fileName 文件名
 * @param {string} fileAbsolutePath 文件绝对路径
 * @param {{}} options 其他选项
 * @returns {Promise<>}
 */
const uploadToOSS = (fileName, fileAbsolutePath, options) => {
	return OSSClient.put(fileName, fileAbsolutePath, options);
};
module.exports = {
	handleUpload: handleUpload,
	uploadToOSS: uploadToOSS,
};
