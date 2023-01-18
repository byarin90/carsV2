import { UserModel } from "../models/userModel.js";

export const userCtrl = {
    getInfo: async(req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0, _id: 0, __v: 0 });
            if (!user) {
                return res.status(401).json({ msg: 'User not found' });
            }
            return res.json({ user });
        } catch (err) {
            console.log(err)
            res.status(500).json({ err_msg: err });
        }
    },
    updateRoleForUserById: async(req, res) => {
        try {
            const user = await UserModel.findById(req.params.id)
            if (!user) {
                return res.status(401).json({ msg: 'User not found' });
            }
            if (req.tokenData._id == req.params.id) {
                return res.status(403).json({ err_msg: `You can't change role of yourself`, error: true })
            }

            if (user._id == '63bedcc7d3449c738d23a5b3') {
                return res.status(403).json({ err_msg: `You can't change role of super admin`, error: true })
            }



            if (user.role == 'admin') {
                user.role = 'user'
                await user.save()
                return res.status(200).json({ msg: 'Role updated successfully', roleChanged: 'user' })
            } else if (user.role == 'user') {
                user.role = 'admin'
                await user.save()
                return res.status(200).json({ msg: 'Role updated successfully', roleChanged: 'admin' })
            }




        } catch (err) {
            console.log(err)
            res.status(500).json({ err_msg: err });
        }
    }
}