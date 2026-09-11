import Booking from "../models/Booking.js"
import Car from "../models/Car.js";

const checkAvailability = async (car, pickUpDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickUpDate: { $lte: returnDate },
        returnDate: { $gte: pickUpDate }
    })
    return bookings.length == 0;
}

export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickUpDate, returnDate } = req.body;
        const cars = await Car.find({ location, isAvailable: true });

        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car, pickUpDate, returnDate)
            return { ...car._doc, isAvailable: isAvailable }
        })

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true)

        return res.json({ success: true, availableCars })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickUpDate, returnDate } = req.body;

        const isAvailable = await checkAvailability(car, pickUpDate, returnDate)
        if (!isAvailable) {
            return res.status(404).json({ success: false, message: "Car is not available" })
        }

        const carData = await Car.findById(car)
        const picked = new Date(pickUpDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / 1000 * 60 * 60 * 24)

        const price = carData.pricePerDay * noOfDays;

        await Booking.create({ car, owner: carData.owner, user: _id, pickUpDate, returnDate, price })

        return res.json({ succes: true, message: "Booking Created" });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 });
        return res.json({ success: true, message: "Bookings fetched", bookings })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.status(401).json({ success: false, message: "Unauthorised" });
        }
        const bookings = await Booking.find({ owner: req.user._id }).populate('car user').select("-user.password").sort({ createdAt: -1 });
        return res.json({ succes: true, bookings });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;
        const booking = await Booking.findById(bookingId)

        if (booking.owner.toString() !== _id.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorised" });
        }
        booking.status = status;
        await booking.save();
        return res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}