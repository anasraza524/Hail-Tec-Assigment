import express from 'express';
import { userModel } from '../dbRepo/model.mjs';

import jwt from 'jsonwebtoken';
const SECRET = process.env.SECRET;

const router = express.Router()
const getUser = async (req, res) => {

    let _id = "";
    if (req.params.id) {
        _id = req.params.id
    } else {
        _id = req.body.token._id
    }

    try {
        const user = await userModel.findOne({ _id: _id }, "email firstName lastName isAdmin -_id ").exec()
        console.log("user",user)
        if (!user) {
            res.status(404).send({})
            return;
        } else {

            res.set({
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
                "Surrogate-Control": "no-store"
            });
            res.status(200).send(user)
        }

    } catch (error) {

        console.log("error: ", error);
        res.status(500).send({
            message: "something went wrong on server",
        });
    }
}
router.get('profile', getUser)
router.get('profile/:id', getUser)

export default router