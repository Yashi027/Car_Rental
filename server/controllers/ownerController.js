import User from "../models/User.js";
import Car from "../models/Car.js";
import imageKit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";

export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;

        await User.findByIdAndUpdate(_id, {
            role: "owner",
        });

        return res.status(200).json({
            success: true,
            message: "Now you can list cars",
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;

        const carData = JSON.parse(req.body.carData);

        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Car image is required",
            });
        }

        const response = await imageKit.files.upload({
            file: imageFile.buffer.toString("base64"),
            fileName: imageFile.originalname,
            folder: "/cars",
        });

        const car = await Car.create({
            owner: _id,
            ...carData,
            image: response.url,
        });

        return res.status(201).json({
            success: true,
            message: "Car added successfully",
            car,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id });
        return res.json({ success: true, message: "Cars fetched successfully", cars });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId);

        if (car.owner.toString() !== _id.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        car.isAvailable = !car.isAvailable;
        await car.save();

        return res.json({ success: true, message: "Availability toggled" });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId);

        if (car.owner.toString() !== _id.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        car.owner = null;
        car.isAvailable = false;

        await car.save();

        return res.json({ success: true, message: "Car removed" });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user;
        if (role !== "owner") {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const cars = await Car.find({ owner: _id });
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });
        const pendingBookings = await Booking.find({ owner: _id, status: "pending" });
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" });

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === "confirmed").reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalcars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }

        return res.json({ success: true, dashboardData })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }

        const response = await imageKit.files.upload({
            file: imageFile.buffer.toString("base64"),
            fileName: imageFile.originalname,
            folder: "/users",
        });

        await User.findByIdAndUpdate(_id, { image: response.url, }, { new: true })
        return res.json({ success: true, message: "Image updated Successfully" })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}