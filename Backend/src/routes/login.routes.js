import { handleLogin } from "../services/loginService.js";
import express from "express";

export const loginRouter = express.Router();

loginRouter.post("/", handleLogin);