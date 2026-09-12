import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from "../models/Car.js";

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields" })
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Please enter strong password" })
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(401).json({ success: false, message: "An account with this mail already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })

        const token = generateToken(user._id.toString())
        return res.status(200).json({ success: true, token, message: "User created successfully" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Enter all valid credentials" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Password" })
        }
        const token = generateToken(user._id.toString())
        return res.status(200).json({ success: true, token, message: "User Login successful" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserData = async (req, res) => {
    try {
        const user = req.user;

        return res.json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvailable: true });
        return res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}