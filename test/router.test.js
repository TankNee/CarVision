const express = require("express");
const supertest = require("supertest");
const router = require("../routes/index");

var app = require("../app");
var port = process.env.PORT || 3000;
app.set("port", port);

describe("# routers", () => {
	describe("## example.js", () => {
		it("get request", (done) => {
			supertest(app).get("/").expect(200, done);
		});
	});
});
