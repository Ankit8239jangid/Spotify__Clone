import { Router } from 'express';
const songRouter = Router();

songRouter.get("/", (req, res) => {
    res.send("Hi, I am Song");
});

export default songRouter;
