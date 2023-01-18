import { UserModel } from "../models/userModel.js";
import { addUserValid, loginValid } from "../validations/usersValid.js";
import bcrypt from 'bcrypt'
import { createJWT } from "../helpers/authHelper.js";

export const authCtrl = {
    signUp: async(req, res) => {
        try {
            const bodyData = req.body
            const validation = addUserValid(bodyData)
            if (validation.error) {
                res.status(400).json({
                    error: true,
                    err_msg: validation.error.details
                })
            }

            const user = await UserModel.create(bodyData)
                // hash (Password,Hash Salt)
            const hashedPassword = await bcrypt.hash(bodyData.password, 10)
            user.password = hashedPassword;
            await user.save()
            user.password = "**********"
            res.status(201).json({ msg: 'User added', user })
        } catch (err) {
            //code == 11000 >> when email is Uniqiue
            if (err.code == 11000) {
                return res.status(400).json({
                    error: true,
                    err_msg: "User already exists"
                })

            }
            console.log(err);
            res.status(500).json({ err_msg: err })
        }
    },
    signIn: async(req, res) => {
        try {

            const bodyData = req.body;
            //if got all Keys : Password & email -->
            const validation = loginValid(bodyData)
            if (validation.error) {
                res.status(400).json({
                    error: true,
                    err_msg: validation.error.details
                })
            }

            // if user exist -->>>
            const user = await UserModel.findOne({ email: bodyData.email })
            if (!user) {
                return res.status(400).json({
                    error: true,
                    err_msg: "User not found"
                })
            }

            // If password Correct
            //bcrypt.compare(Password String From Body,Password Hashed from DB)
            const validPassword = await bcrypt.compare(bodyData.password, user.password)
            if (!validPassword) {
                return res.status(400).json({
                    error: true,
                    err_msg: "Password is incorrect"
                })
            }
            const token = createJWT(user)
            return res.json({ token })
        } catch (err) {
            res.status(500).json({
                error: true,
                err_msg: err
            })

        }
    },
    checkToken: (req, res) => {
        res.json({ msg: 'You are avalible', tokenData: req.tokenData })
    }
}