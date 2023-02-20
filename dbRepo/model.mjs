import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import mongoose from 'mongoose';


let otpSchema = new mongoose.Schema({

    otp: String,
     email: String,
     isUsed: { type: Boolean, default: false },
    //  isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now }
});
export const OtpRecordModel = mongoose.model('OtpRecords', otpSchema);







const userSchema = new mongoose.Schema({
    fullName: { type: String },
    age:{type:Number,required: true},
    email: { type: String, required: true },
    isDeleted:{ type: Boolean, default: false },
    password: { type: String, required: true },
    isAdmin:{ type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
});
export const userModel = mongoose.model('Users', userSchema);



const tasksSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String },
    dueDate:{ type: String },
    createdOn: { type: Date, default: Date.now },
});

export const tasksModel = mongoose.model('tasks', tasksSchema);


const mongodbURI = process.env.mongodbURI



/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////