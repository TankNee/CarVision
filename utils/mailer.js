const mailer = require("nodemailer");
const consola = require("consola");
const config = require("../config");


var account = config.mailer.account;
var password = config.mailer.password;
var _receiver = config.mailer.default.receiver;
var _subject = config.mailer.default.subject;
const transporter = mailer.createTransport({
	host: "smtp.exmail.qq.com",
	port: 465,
	secureConnection: true,
	// 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
	auth: {
		user: account,
		pass: password,
	},
});
var mailOptions = {
	// 发送邮件的地址
	from: account, // login user must equal to this user
	// 接收邮件的地址
	to: _receiver, // xrj0830@gmail.com
	// 邮件主题
	subject: _subject,
	// 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
	html: "",
};
const sendMail = (html, subject = _subject, to = _receiver) => {
	mailOptions.html = `<html><p>${JSON.stringify(html)}</p></html>`;
	mailOptions.to = to;
	mailOptions.subject = subject;
	transporter.sendMail(mailOptions, (error, info = {}) => {
		if (error) {
			return consola.error(error);
		}
		consola.success("Message sent");
	});
};
module.exports = {
	sendMail: sendMail,
};
