import { Router } from 'express';
const userRouter = Router();
import { getAllUsers } from '../Controller/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

userRouter.get("/", protectRoute, getAllUsers);

export default userRouter;
