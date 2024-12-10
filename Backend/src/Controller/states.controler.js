import { Song } from "../modales/song.modales.js";
import { User } from "../modales/user.modales.js";
import { Albums } from "../modales/albums.modales.js";

export const getAllStates = async (req, res, next) => {
    try {
        const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
            Song.countDocuments({}),
            User.countDocuments({}),
            Albums.countDocuments({}),

            Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist"
                    }
                },
                {
                    $count: "count"
                }
            ])
        ]);

        res.status(200).json({
            totalSongs,
            totalUsers,
            totalAlbums,
            uniqueArtists
        })
    } catch (error) {
        next(error)
    }
}