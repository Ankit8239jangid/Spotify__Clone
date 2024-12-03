import { Router } from 'express';
const userRouter = Router();

userRouter.get("/", (req, res) => {
    req.auth.userId
    res.send("Hi, I am User");
});

export default userRouter;
