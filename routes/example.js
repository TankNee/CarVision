const express = require("express");
const router = express.Router();
const services = require("../services");
const config = require("../config");
const when = require("when");
const { JsonResponse, Uploader, Helper } = require("../utils");

// router.get("/", function (req, res, next) {
// 	// var imageUrl =
// 	// 	"https://tankneeaivision.oss-cn-shanghai.aliyuncs.com/sEO9-huxwryv7321097.jpg";
// 	// services.car
// 	// 	.serviceRequest(
// 	// 		{ ImageURL: imageUrl },
// 	// 		// "http://explorer-image.oss-cn-shanghai.aliyuncs.com/1256451755780380/bg1.jpg?OSSAccessKeyId=LTAI4Fk9FstqSEYnqKJ5Dpeo&Expires=1591500488&Signature=Ghlo0BxNWtY69SLGgl1wKznR6iM%3D",
// 	// 		config.aliyun.recognizeInterface.recognizeVehiclePlate
// 	// 	)
// 	// 	.then((result) => {
// 	// 		res.json(JsonResponse.success(result)).end();
// 	// 	})
// 	// 	.catch((err) => {
// 	// 		res.json(JsonResponse.fail(err)).end();
// 	// 	});
// });
/**
 * 这里的请求需要带有图片识别的type
 */
router.post("/imageRecognition", (req, res, next) => {
	const recognizeType = req.query.type;
	const recognizeSide = req.query.side;
	if (Helper.isNullOrEmpty(recognizeType) || !config.aliyun.recognizeInterface[recognizeType]) {
		res.json(JsonResponse.fail("参数recognizeType不存在或者参数错误")).end();
		return;
	}
	if (Helper.isNullOrEmpty(recognizeSide) && config.aliyun.recognizeInterface[recognizeType].sideRequired) {
		res.json(JsonResponse.fail("参数recognizeSide不存在或者参数错误")).end();
		return;
	}

	Uploader.handleUpload(req)
		.then((result) => {
			when.all(
				result.map((image, index) => {
					return Uploader.uploadToOSS(image.fileName, image.absolutePath);
				})
			)
				.then((uploadResult) => {
					if (Helper.isNullOrEmpty(uploadResult)) {
						res.json(JsonResponse.fail(uploadResult, "没有在请求中找到图片")).end();
					} else {
						when.all(
							uploadResult.map((uploadedImage) => {
								var type = config.aliyun.recognizeInterface[recognizeType];
								var servicePayload = {
									ImageURL: uploadedImage.url,
									Side: recognizeSide,
								};
								return services.car.serviceRequest(servicePayload, type);
							})
						)
							.then((recognizeResult) => {
								res.json(JsonResponse.success(recognizeResult)).end();
							})
							.catch((err) => {
								res.json(JsonResponse.fail(err, "图片识别错误")).end();
							});
					}
				})
				.catch((err) => {
					res.json(JsonResponse.fail(err, "图片上传到OSS出错")).end();
				});
		})
		.catch((err) => {
			res.json(JsonResponse.fail(err, "图片上传到服务器出错")).end();
		});
});
module.exports = router;
