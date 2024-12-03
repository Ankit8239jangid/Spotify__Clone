import { Router } from 'express';
import { authCallback } from '../Controller/auth.controller.js';
const authRouter = Router();

authRouter.post("/callback", authCallback);

export default authRouter;
