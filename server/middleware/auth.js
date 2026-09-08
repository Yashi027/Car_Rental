import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorised" })
    }
    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET);
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorised" })
        }

        req.user = await User.findById(userId).select("-password")
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Not Authorised" })
    }
}