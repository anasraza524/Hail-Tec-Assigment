import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import auth from './Apis/auth.mjs'

import tasks from '././Apis/tasks.mjs'
import loginBarrier from './helper/loginBarrier.mjs'
import loginEquip from './helper/loginEquip.mjs'
import { userModel,OtpRecordModel, } from './dbRepo/model.mjs';



//   mongoose.set('strictQuery', false);

const app = express();

const port = process.env.PORT || 3001;

app.use(cors({
    origin: ['http://localhost:3001','http://localhost:3000', 'https://localhost:3001', "*"],
    credentials: true
}));

const SECRET = process.env.SECRET ;
app.use(express.json());
app.use(cookieParser());


app.use('/api/v1', auth)

app.use('/api/v1', loginBarrier)
const getUser = async (req, res) => {

    let _id = "";
    if (req.params.id) {
        _id = req.params.id
    } else {
        _id = req.body.token._id
    }

    try {
        const user = await userModel.findOne({ _id: _id }, "email fullName  isAdmin _id age ").exec()
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

app.get('/api/v1/profile', getUser)
app.get('/api/v1/profile/:id', getUser)
app.use('/api/v1', tasks )








const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

