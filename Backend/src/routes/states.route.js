import { Router } from 'express';
const statesRouter = Router();
import { getAllStates } from '../Controller/states.controler.js';
import { protectRoute, Require_Admin } from '../middleware/auth.middleware.js';
statesRouter.get("/", protectRoute, Require_Admin, getAllStates);

export default statesRouter;
