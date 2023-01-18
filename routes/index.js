import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: "Server is up!" });
})



export default router;