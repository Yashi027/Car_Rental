import express from 'express';
import { protect } from '../middleware/auth.js';
import { addCar, changeRoleToOwner, deleteCar, getOwnerCars, toggleCarAvailability } from '../controllers/ownerController.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post('/change-role', protect, changeRoleToOwner)
ownerRouter.post('/cars', protect, getOwnerCars)
ownerRouter.get('/add-car', upload.single("image"), protect, addCar)
ownerRouter.post('/toggle-car', protect, toggleCarAvailability)
ownerRouter.post('/delete-car', protect, deleteCar)

export default ownerRouter;