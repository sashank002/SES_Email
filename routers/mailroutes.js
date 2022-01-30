const express = require("express");
const { sendMail } = require("../controller/mailController");

const route = express.Router();

route.post("/sendMail", sendMail);

module.exports = route;
