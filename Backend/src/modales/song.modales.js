import mongoose from "mongoose";

const songSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,       
        required: true,

    },
    discription: {
        type: String,
        require: true,

    },
    albumId: {
        type: mongoose.Types.ObjectId,
        ref: "Albums",
    }


}, { timestamps: true })


export const Song = mongoose.model("Song", songSchema)

