import { Router } from 'express';
import { getAlbumById, getallAlbums } from '../Controller/albums.controller.js';
const albumsRouter = Router();

albumsRouter.get("/", getallAlbums);
albumsRouter.get("/:albumsId", getAlbumById);

export default albumsRouter;
