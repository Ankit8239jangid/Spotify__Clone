import { Router } from 'express';
const statesRouter = Router();
import { getAllStates } from '../Controller/states.controller.js';
statesRouter.get("/", getAllStates);

export default statesRouter;
