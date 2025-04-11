const express = require("express");
const { signIn, signUp } = require("../Controllers/userController");

const userRoute = express.Router();

userRoute.post("/signIn", signIn);
userRoute.post("/signUp", signUp);

module.exports = userRoute;
