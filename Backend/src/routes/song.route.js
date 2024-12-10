import { Router } from 'express';
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from '../Controller/song.controller.js';
import { protectRoute, Require_Admin } from '../middleware/auth.middleware.js';
const songRouter = Router();

songRouter.get("/", protectRoute, Require_Admin, getAllSongs);

songRouter.get("/featured", getFeaturedSongs);
songRouter.get("/made-for-you", getMadeForYouSongs);
songRouter.get("/trending", getTrendingSongs);

export default songRouter;
