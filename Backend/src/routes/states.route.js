import { Router } from 'express';
const statesRouter = Router();

statesRouter.get("/", (req, res) => {
    res.send("Hi, I am States");
});

export default statesRouter;
