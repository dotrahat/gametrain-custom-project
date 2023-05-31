import express from "express";
import userRoutes from "./users/userRoutes.js";
import moduleRoutes from './modules/moduleRoutes.js'
import { login } from "./auth.js";

const Router = express.Router();

Router.post("/login", login);

Router.use("/users", userRoutes);
Router.use("/modules", moduleRoutes);

export default Router;
