import { clerkClient } from "@clerk/express";

// Protect Routes middleware to check if the user is logged in
export const protectRoute  = async (req, res, next) => {
    const userId = req.body.userId || req.headers["user-id"];
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized - You must be Logged in" });
    }
    req.userId = userId; // Attach userId to req for subsequent middleware
    next();
};



// Admin middleware to check if the user is admin
export const Require_Admin = async (req, res, next) => {
    try {
        const userId = req.body.userId || req.headers["user-id"];
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - User ID is missing" });
        }

        const currentUser = await clerkClient.users.getUser(userId);

        if (!currentUser || !currentUser.emailAddresses || currentUser.emailAddresses.length === 0) {
            return res.status(403).json({ message: "Unauthorized - User data not found or incomplete" });
        }

        // Check if user is admin (support multiple admin emails)
        const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
        const isAdmin = adminEmails.includes(currentUser.emailAddresses[0].emailAddress);

        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - You must be an Admin" });
        }

        next();
    } catch (error) {
        console.error("Error in Require_Admin middleware:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
};
