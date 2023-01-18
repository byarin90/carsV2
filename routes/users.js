import express from "express";
import { authAdmin, authUser } from "../middleware/authentication.js";
import { authCtrl } from "../controllers/authController.js";
import { userCtrl } from "../controllers/userController.js";
const router = express.Router();
//?Admin Routes
router.put('/changerole/:id', authAdmin, userCtrl.updateRoleForUserById)


// ? User Routes
router.get('/getInfo', authUser, userCtrl.getInfo)



//!AUTH ROUTES
router.get('/checktoken', authUser, authCtrl.checkToken)
router.post('/', authCtrl.signUp)
router.post('/login', authCtrl.signIn)

export default router;