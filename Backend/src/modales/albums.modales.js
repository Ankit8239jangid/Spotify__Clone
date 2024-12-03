import mongoose from "mongoose";
const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    releaseYear: { type: String, required: true },
    songs: [{ type: mongoose.Types.ObjectId, ref: "Song" }],
}, { timestamps: true })

export const Albums = mongoose.model("Albums", albumSchema)      