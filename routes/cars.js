import express from "express";
import { carCtrl } from "../controllers/carController.js";
import { authAdmin, authUser } from "../middleware/authentication.js";

const router = express.Router();

//?Routes For Admin
router.get('/', authAdmin, carCtrl.getAllCars)

//?Routes For User
//TODO: CRUD:
//!Create
router.post('/', authUser, carCtrl.addCar)
    //!Read
router.get('/myCars', authUser, carCtrl.getMyCars)
    //!Update
router.put('/:id', authUser, carCtrl.updateCarById)
    //!Delete
router.delete('/:id', authUser, carCtrl.deleteCarById)

export default router;