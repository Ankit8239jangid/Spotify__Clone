import { Router } from 'express';
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from '../Controller/admin.controller.js';
import { protectRoute, Require_Admin } from '../middleware/auth.middleware.js';
const adminRouter = Router();

adminRouter.use(protectRoute, Require_Admin);


adminRouter.get("/check", checkAdmin);

adminRouter.post("/song", createSong);
adminRouter.delete("/song/:id", deleteSong);


adminRouter.post("/albums", createAlbum);
adminRouter.delete("/albums/:id", deleteAlbum);


export default adminRouter;
