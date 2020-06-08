const helper = require("./helper");
const jsonRes = require("./jsonRes");
const mailer = require("./mailer");
const uploader = require("./uploader");

module.exports = {
	Helper: helper,
	JsonResponse: jsonRes,
	Mailer: mailer,
	Uploader: uploader,
};
