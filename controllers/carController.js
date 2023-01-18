import { CarModel } from "../models/carModel.js";
import { UserModel } from "../models/userModel.js";
import { carUpdateValidation, carValidation } from "../validations/carsValid.js";


export const carCtrl = {
    addCar: async(req, res) => {
        try {
            const car = {...req.body }
            const validation = carValidation(car)
            if (validation.error) {
                return res.status(400).json({
                    error: true,
                    err_msg: validation.error.details
                })
            }
            car.user_id = req.tokenData._id
            const user = await UserModel.findOne({ _id: req.tokenData._id })

            const data = await CarModel.create(car)
            user.myCars.push(data._id)
            await user.save()

            return res.status(201).json({ car: data })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err_msg: err });
        }
    },
    getMyCars: async(req, res) => {
        try {
            const cars = await CarModel.find({ user_id: req.tokenData._id })
            if (!cars || !cars.length) {
                return res.status(404).json({
                    error: true,
                    err_msg: "No cars found"
                })
            }
            // When im use populate im calling to property name from Model
            // const user = await UserModel.findOne({ _id: req.tokenData._id }).populate('myCars')
            // console.log(user)
            return res.status(200).json({ cars })
        } catch (err) {
            console.log(err);
            res.status(500).json({ err_msg: err });
        }
    },
    updateCarById: async(req, res) => {
        try {
            const validation = carUpdateValidation(req.body)
            if (validation.error) {
                return res.status(400).json({
                    error: true,
                    err_msg: validation.error.details
                })
            }

            const car = await CarModel.findOne({ _id: req.params.id })
            if (!car) {
                return res.status(404).json({
                    error: true,
                    err_msg: "Car not found"
                })
            }

            if (car.user_id != req.tokenData._id) {

                return res.status(401).json({
                    error: true,
                    err_msg: "You are not authorized"
                })
            }
            const data = await CarModel.updateOne({ _id: req.params.id }, req.body)

            if (data.modifiedCount == 1) {
                return res.json({ msg: "Car Updated Successfully" })
            }

            return res.status(404).json({
                error: true
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ err_msg: err });
        }
    },
    deleteCarById: async(req, res) => {
        try {
            const car = await CarModel.findOne({ _id: req.params.id })
            if (!car) {
                return res.status(404).json({
                    error: true,
                    err_msg: "Car not found"
                })
            }

            if (car.user_id != req.tokenData._id) {

                return res.status(401).json({
                    error: true,
                    err_msg: "You are not authorized"
                })
            }
            const user = await UserModel.findById(req.tokenData._id)
            user.myCars = user.myCars.filter((carId) => carId != req.params.id)
            await user.save()

            const data = await CarModel.deleteOne({ _id: req.params.id })

            if (data.deletedCount == 1) {
                return res.json({ msg: "Car Deleted Successfully" })
            }

            return res.status(401).json({ err_msg: 'error somthing wrong' })
        } catch (err) {
            console.log(err);
            res.status(500).json({ err_msg: err });
        }
    },
    getAllCars: async(req, res) => {
        try {
            const cars = await CarModel.find({})
            return res.status(200).json({ cars })
        } catch (err) {
            console.log(err);
            res.status(500).json({ err_msg: err });
        }
    }
}