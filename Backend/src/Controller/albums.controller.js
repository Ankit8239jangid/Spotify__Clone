import {Albums} from "../modales/albums.modales.js"
export const  getallAlbums = async (req ,res ,next) =>{
    try {
        const albums = await Albums.find()
        res.status(200).json(albums)
    } catch (error) {
        next(error)
    }
}
     

export const getAlbumById  = async (req, res, next)=>{
    try {
        const {albumId} = req.params
        const album  = await Albums.findById(albumId).populate("sonag")
        if(!album) return next(createError(404, "Album not found"))
        res.status(200).json(album)
    } catch (error) {
        next(error)
    }
}