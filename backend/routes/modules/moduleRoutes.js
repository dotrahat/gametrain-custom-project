import express from "express";
import { IntroGenerator } from '../../controllers/modulesController.js';
import { isSignedIn } from "../auth.js";


const Router = express.Router();

Router.post('/intro-generator', isSignedIn, IntroGenerator);

export default Router