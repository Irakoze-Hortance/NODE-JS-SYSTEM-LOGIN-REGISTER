'use strict'
const request=require( 'supertest')
const express=require('express')
const app = require('../app'); // our Node application

const User = require('../models/userModel')
const expect = require('chai').expect
describe("Login Module for test cases", () => {
  it("should return the user if the name is valid", function(done) {
  request(app)
  .post("/login")
  .send({ username: "DAMMAK", password: "Adedamola" })
  .end(function(err, res) {
  expect(res.statusCode).equal(200);
  expect(res.text).toEqual(
  JSON.stringify({ username: "DAMMAK", password: "Adedamola" })
  );
  done();
  });
  });
  it("fails if login details is wrong", function(done) {
  request(app)
  .post("/login")
  .send({ username: "wrongUser", password: "wrongPass" })
  .end(function(err, res) {
  expect(res.statusCode).toEqual(400);
  done();
  });
  });
  it("fails if empty request data was sent", function(done) {
  request(app)
  .post("/login")
  .send({})
  .end(function(err, res) {
  expect(res.statusCode).toEqual(400);
  done();
  });
  });
  });