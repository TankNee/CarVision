module.exports = {
	mailer: {
		account: "",
		password: "",
		default: {
			receiver: "",
			subject: "",
		},
	},
	aliyun: {
		account: {
			imageRecognize: {
				accessKeyId: "put your access key Id",
				accessKeySecret: "put you access key secret",
			},
			oss: {
				accessKeyId: "put your access key Id",
				accessKeySecret: "put you access key secret",
				buckets: {
					shanghai: {
						region: "oss-cn-shanghai",
						bucketName: "put your shanghai oss bucket name",
					},
				},
			},
		},
		recognizeInterface: {
			recognizeVehicle: {
				endpoint: "https://imagerecog.cn-shanghai.aliyuncs.com",
				type: "RecognizeVehicleType",
				apiVersion: "2019-09-30",
			},
			recognizeVehiclePlate: {
				endpoint: "https://ocr.cn-shanghai.aliyuncs.com",
				type: "RecognizeLicensePlate",
				apiVersion: "2019-12-30",
			},
			recognizeDriverLicense: {
				endpoint: "https://ocr.cn-shanghai.aliyuncs.com",
				type: "RecognizeDriverLicense",
				apiVersion: "2019-12-30",
				sideRequired: true,
			},
			recognizeIdentityCard: {
				endpoint: "https://ocr.cn-shanghai.aliyuncs.com",
				type: "RecognizeIdentityCard",
				apiVersion: "2019-12-30",
				sideRequired: true,
			},
			recognizeDrivingLicense: {
				endpoint: "https://ocr.cn-shanghai.aliyuncs.com",
				type: "RecognizeDrivingLicense",
				apiVersion: "2019-12-30",
				sideRequired: true,
			},
		},
	},
};
