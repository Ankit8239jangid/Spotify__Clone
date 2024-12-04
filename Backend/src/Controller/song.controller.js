import { Song } from "../modales/song.modales.js";

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find()
        res.status(200).json(songs)
    } catch (error) {

    }
}

//-------------------------------------------------------------------------------
export const getFeaturedSongs = async (req, res, next) => {
    try {
        // Get 6 random songs from the database
        const songs = await Song.aggregate([
            { $sample: { size: 6 } },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    image: 1,
                    artist: 1,
                    audioUrl: 1,
                }
            }
        ])
        res.status(200).json(songs)
    } catch (error) {
        next(error)
    }
}

//-------------------------------------------------------------------------------

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        // Get 4 random songs from the database
        const songs = await Song.aggregate([
            { $sample: { size: 4 } },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    image: 1,
                    artist: 1,
                    audioUrl: 1,
                }
            }
        ])
        res.status(200).json(songs)
    } catch (error) {
        next(error)
    }
}

//-------------------------------------------------------------------------------

export const getTrendingSongs = async (req, res, next) => { }

