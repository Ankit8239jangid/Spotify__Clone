import { clerkClient } from "@clerk/express";

// Protect Routes middleware to check if the user is logged in
export const protectRout = async (req, res, next) => {
    if (!req.body.userId) {
        res.status(401).json({ massage: "Unauthorized - You must be Logged in" });
        return
    }
    next()
}
     

// Admin middleware to check if the user is admin
export const Require_Admin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.userId,)
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.emailAddresses[0].emailAddress;
        if (!isAdmin) {
            res.status(401).json({ massage: "Unauthorized - You must be Admin" })
            return
        }
        next()
    } catch (error) {
        res.status(500).json({ massage: "Internal Server Error" })
    }
}