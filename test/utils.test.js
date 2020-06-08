const assert = require("assert");
const utils = require("../utils");

/**
 * utils 文件夹测试
 */
describe("# utils", () => {
	describe("## helper.js", () => {
		describe("### isNullOrEmpty", () => {
			[[], null, undefined, {}, ""].forEach((empty) => {
				it(`isNullOrEmpty(${empty}) shoule be true`, () => {
					assert.strictEqual(utils.Helper.isNullOrEmpty(empty), true);
				});
			});
		});
		describe("### threadSleep", () => {
			// mocha库最多只能异步2000ms
			it("threadSleep(1000) should be fired in 1000 ms later", (done) => {
				var preTime = new Date().getTime();
				utils.Helper.threadSleep(1000)
					.then(() => {
						var duration = new Date().getTime() - preTime;
						if (duration >= 1000) done();
						else
							done(
								`threadSleep function comes across an error,and the duration is ${duration}`
							);
					})
					.catch((err) => {
						done(err);
					});
			});
		});
	});
	describe("## jsonRes.js", () => {
		describe("### success function", () => {
			it("success('get it')", () => {
				assert.deepEqual(utils.JsonResponse.success("get it"), {
					code: 200,
					data: "get it",
					msg: "请求成功",
				});
			});
		});
		describe("### fail function", () => {
			it("fail('can't get it')", () => {
				assert.deepEqual(utils.JsonResponse.fail("can't get it"), {
					code: 1000,
					data: "can't get it",
					msg: "请求失败",
				});
			});
		});
	});
});
