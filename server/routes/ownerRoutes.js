import express from 'express';
import { protect } from '../middleware/auth.js';
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from '../controllers/ownerController.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post('/change-role', protect, changeRoleToOwner)
ownerRouter.post('/cars', protect, getOwnerCars)
ownerRouter.get('/add-car', upload.single("image"), protect, addCar)
ownerRouter.post('/toggle-car', protect, toggleCarAvailability)
ownerRouter.post('/delete-car', protect, deleteCar)
ownerRouter.get('/dashboard', protect, getDashboardData);
ownerRouter.post('/update-image',upload.single("image"),updateUserImage);

export default ownerRouter;