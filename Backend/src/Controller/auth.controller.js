import { User } from "../modales/user.modales.js";

export const authCallback = async (req, res , next) => {
    
    try {
        const { id, fristName, lastName, imageUrl } = req.body

        //check the user in exists or not  
  
        const user = await User.findOne({ clerkId: id });
        if (!user) {     
            // singup
            await User.create({
                clerkId: id,
                fullname: `${fristName} ${lastName}`,
                imageUrl
            })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        console.log("error in Auth_CallBack", error)
        next(error)
    }
}  