import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import moment from 'moment'
import multer from 'multer'
import express from 'express';

import fs from 'fs';
import {signupSchema,loginSchema,resetPasswordSchema,forgetPasswordSchema}from '../helper/validation_schema.mjs'
import { nanoid, customAlphabet } from 'nanoid'
import { userModel, OtpRecordModel } from '../dbRepo/model.mjs'
import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi"
import jwt, { verify } from 'jsonwebtoken';
import nodemailer from "nodemailer";
import cookieParser from 'cookie-parser';


const SECRET = process.env.SECRET;


const router = express.Router()

router.post("/signup",async (req, res) => {
try {
const signupResult = await signupSchema.validateAsync(req.body)
      const verifyEmail = await userModel.findOne({email:signupResult.email})
      if(verifyEmail) throw new Error("User already exist")
    const signupPassword = await stringToHash(signupResult.password)

   const SignupUser= await userModel.create({
    fullName:signupResult.fullName,
    age:signupResult.age,
        email:signupResult.email,
        password:signupPassword ,
        isAdmin:false,
    })
    if(!SignupUser) {
        res.status(500).send({message:"Server Error"})
        return;
    }

    res.status(201).send({ message: "User is created" });

} catch (error) {
    if (error.isJoi === true ||error.message) error.status = 422
  
    console.log("Sign up Error: ", error,error.status);
    console.log("Sign up Error Message: ", error.message);
    error.status
    res.status(error.status).send({
        message: error.message
    })
    
}




    

});

router.post("/login",async (req, res) => {
try {
    
const loginResult = await loginSchema.validateAsync(req.body)
const verifyLogin = await userModel.findOne(
    { email: loginResult.email },
    "firstName lastName email password isAdmin isDeleted")
   

    if(verifyLogin.isDeleted === true) throw new Error(" Your Account is Banned")
if(!verifyLogin) throw new Error("Invalid Email")

    const isMatchedLoginPassword = await varifyHash(loginResult.password, verifyLogin.password)
    console.log(isMatchedLoginPassword,"isMatchedLoginPassword")
    if (!isMatchedLoginPassword) throw new Error("Invalid Password")
    const token = jwt.sign({
        _id: verifyLogin._id,
        email: verifyLogin.email,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    }, SECRET);
    if(!token) throw new Error("Server Error")
    console.log("token: ", token);
    res.cookie('Token', token, {
        maxAge: 86_400_000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.send({
        message: "login successful",
        loginData: {
            email: verifyLogin.email,
            firstName: verifyLogin.firstName,
            lastName: verifyLogin.lastName,
            _id: verifyLogin._id,
            isAdmin:verifyLogin.isAdmin
        }
    });
    return;
} catch (error) {
    if (error.isJoi === true ||error.message) error.status = 422
  
    console.log("Login up Error: ", error,error.status);
    console.log("Login up Error Message: ", error.message);
    error.status
    res.status(error.status).send({
        message: error.message
    })
}
 
})
router.post("/logout", async(req, res) => {
try {
    res.cookie('Token', '', {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });

    res.send({ message: "Logout successful" });
} catch (error) {
    console.log("logoutError",error)
    res.status(500).send({
        message: error.message
    })
}
    
})

router.post("/forget_password", async (req, res) => {
    try {
const forget_passwordResult= await forgetPasswordSchema.validateAsync(req.body)

        const user = await userModel.findOne(
            { email: forget_passwordResult.email },
            "firstName lastName email _id")

        if (!user) throw new Error("user not Found")
        const nanoid = customAlphabet('1234567890', 5)
        const OTP = nanoid()
        console.log("OTP: ", OTP)

      const newHashOtp = await stringToHash(OTP);
      console.log("HashOtp",newHashOtp)
        OtpRecordModel.create({
           otp:newHashOtp,
            // otp: OTP,
            email: forget_passwordResult.email
        })


        const transport = nodemailer.createTransport({
            service: process.env.service ,
            host:process.env.host ,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: `Password Reset Request from Work on Line`,
            text: `
    <!doctype html>
    <html lang="en-US">
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                    <td style="padding:0 35px;">
                                    <h1 style="color: #37a6da; font-weight:500; margin:0;font-size:35px;font-family:'Rubik',sans-serif;">
                                                Work on Line</h1>
                                                <br>
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                    ${user.firstName}! you have requested to reset your Work on Line password</h1>
                                    <span
                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                        We cannot simply send you your old password. A unique link to reset your
                                        password has been generated for you. To reset your password, check the
                                        following OTP and follow the instructions.
                                    </p>
                                    <h3 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Your OTP
                                    OTP</h3>
                                    <h4 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                    ${OTP}</h4>

                                </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                       
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>`,
            html: `
    <!doctype html>
    <html lang="en-US">
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                       
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                        <h1 style="color: #37a6da; font-weight:500; margin:0;font-size:35px;font-family:'Rubik',sans-serif;">
                                                Work on Line</h1>
                                                <br>
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                ${user.firstName}! you have requested to reset your Work on Line password</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                We cannot simply send you your old password. A unique link to reset your
                                                password has been generated for you. To reset your password, check the
                                                following OTP and follow the instructions.
                                            </p>
                                            <h3 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Your OTP
                                            is </h3>
                                            <h4 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                            ${OTP}</h4>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                       
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>`,
        };
        transport.sendMail(mailOptions, (error, info) => {
            console.log("error", error)
            console.log("info", info)
            if (!error) {
                const token2 = jwt.sign({
                     _id: user._id,
                    email: user.email,
                    // otp: OTP,
                    iat: Math.floor(Date.now() / 1000) - 30,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                }, SECRET);
                console.log("token2", user.email, user._id,)
                console.log("token2: ", token2);

                res.cookie('token2', token2, {
                    maxAge: 86_400_000,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });



                res.status(200);
                res.send({
                    message: "OTP sent success",
                });

                return;
            } else {
                return res.status(400).json({ message: "Error in Sending Email " });
            }

        });


    }
    catch (error) {
        if (error.isJoi === true ||error.message) error.status = 422
  
        console.log("forgetPassword Error: ", error,error.status);
        console.log("forgetPassword Error Message: ", error.message);
        error.status
        res.status(error.status).send({
            message: error.message
        })
    }
}
)


router.post("/request_otp", async (req,res)=>{
    try {
       
        const body = req.body;
       
    //   const email = req.body.token2.email
        
    if(!body.otp){
        res.status(400).send(
         {  message: `Please Enter Otp`}
        );
        return;
    }
    console.log("Email",req.cookies.token2)
 const tokenVerify = jwt.verify(req.cookies.token2, SECRET)
    
    console.log(tokenVerify.email,"a")
    const nowDate = new Date().getTime() / 1000;

    const otpRecord = await OtpRecordModel.findOne(
                            {
                                email: tokenVerify.email,
                            }
                        )
                            .sort({ _id: -1 })
                            .exec()
        
                            if (!otpRecord) throw new Error("Invalid Opt")
                            if (otpRecord.isUsed) throw new Error("Invalid OTP")
                    
                            
                    
                            console.log("otpRecord: ", otpRecord);
                            console.log("otpRecord: ", moment(otpRecord.createdOn));
                    
                            const now = moment();
                            const optCreatedTime = moment(otpRecord.createdOn);
                            const diffInMinutes = now.diff(optCreatedTime, "minutes")
                    
                            console.log("diffInMinutes: ", diffInMinutes);
                            if (diffInMinutes >= 5) throw new Error("Invalid Otp")
                    

                            const isMatched = await varifyHash(body.otp, otpRecord.otp)
                            if (!isMatched) throw new Error("Invalid OTP")
                            await otpRecord.update({ isUsed: true }).exec();
                        // success
                            res.send({
                                message: "OTP is Matched",
                            });

    } catch (error) {
        console.log("Otp_error: ", error);
        res.status(500).send({
            message: error.message
        })
    }
    })

router.post("/reset_password", async (req, res) => {
    try {
        let body = req.body
        
if(!body.password) throw new Error("New Password Not Found")
        const newPasswordHash = await stringToHash(body.password);
        const tokenVerify = jwt.verify(req.cookies.token2, SECRET)
        console.log(tokenVerify)
        const passwordChange = await userModel.findOneAndUpdate(
             {email:tokenVerify.email},
            { password: newPasswordHash }).exec()

        if (!passwordChange) throw new Error("Error in password")
        // success
        res.send({
            message: "password changed success",
        });
        return;
    } catch (error) {
        console.log("Reset Password: ", error);
        res.status(500).send({
            message: error.message
        })
    }

})


    
       
    
export default router