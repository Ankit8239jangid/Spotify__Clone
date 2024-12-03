import { Song } from "../modales/song.modales.js";
import { Albums } from "../modales/albums.modales.js";
import cloudinary from "cloudinary";

    
// helper function to upload file to cloudinary
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        throw new Error("Error uploading file to Cloudinary");
    }
}


//--------------------------------------------------------------------------------------


// create song controller
export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({
                message: "Please upload all files"
            })
        }
        // get the song data from the request body
        const { title, artist, albumId, duration } = req.body;


        const audioFile = req.files.audioFile;   // get the audio  file from the request
        const imageFile = req.files.imageFile;  // get the image file from the request


        // upload audio and image to cloudinary
        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({ // create a new song instance
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,

        })
        await song.save() // save the song to the database


        //if the songe belongs to an album then update the album songs array
        if (albumId) {
            await Albums.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            })
        }
        res.status(201).json({
            message: "Song created successfully",
            song
        })
    } catch (error) {
        console.log("Error in auth controller", error)
        next(error)
    }
}


//cerate a delete song controller
export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findByIdAndDelete(id);

        //if the songe belonges to an album then update the album songs array
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            })
        }
        res.status(200).json({
            message: "Song deleted successfully",
            song
        })
    } catch (error) {
        console.log("Error in delete song controller", error)
        next(error)
    }

}

//--------------------------------------------------------------------------------------

// create a create album controller
export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, songs } = req.body;
        const imageFile = req.files.imageFile;
        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Albums({
            title,
            artist,
            imageUrl,
            songs,
        })
        await album.save();

        res.status(201).json({
            message: "Album created successfully",
            album
        })
    } catch (error) {
        console.log("Error in create album controller", error)
        next(error)
    }
}

// creating delete a album controller
export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id }); // delete all songs that belong to the album
        await Albums.findByIdAndDelete(id); // delete the album
        res.status(200).json({
            message: "Album deleted successfully",

        })
    } catch (error) {
        console.log("Error in delete album controller", error)
        next(error)
    }
}

//--------------------------------------------------------------------------------------

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({
        admin: true
    })
}
