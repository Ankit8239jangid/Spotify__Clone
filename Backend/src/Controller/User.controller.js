import { User } from "../modales/user.modales.js";

export  const getAllUsers = async (req, res , next) => {

    try {
        const currentUser = req.auth.userId
        const users = await User.find({ clerkid: { $ne: currentUser } })
        res.status(200).json(users) 
    } catch (error) {
        next(error) 
    }
}