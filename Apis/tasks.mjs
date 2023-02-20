import express from 'express';
import mongoose from 'mongoose';
import { tasksModel} from '../dbRepo/model.mjs'
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bucket from "../FirebaseAdmin/index.mjs";
import fs from 'fs';


// import path from 'path'



const storageConfig = multer.diskStorage({
   destination: '/tmp/uploads/',
// destination: './uploads/',
    filename: function (req, file, cb) {

 console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})



let uploadMiddleware = multer({
     storage: storageConfig ,
    
     fileFilter: (req, file, cb) => {
      
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
            // this is requesting in uploadMiddleware body and you can send error
            req.fileValidationError = "Forbidden extension";
               return cb(null, false, req.fileValidationError);
        //   return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }

     })

 const router = express.Router()


router.post('/task',
//  multipartMiddleware
 uploadMiddleware.any()
,  async (req, res) => {
   
   try {
    // this is The we are sending
if(req.fileValidationError){
    res.status(400).send({message:"Only .png, .jpg and .jpeg format allowed!"})
    return
}
    const token = jwt.decode(req.cookies.Token)


    const taskResult = await taskSchema.validateAsync(req.body)
     console.log(taskResult,"taskSchema")

     const userId = new mongoose.Types.ObjectId(token._id);
console.log("userId",userId)
const counttask = await tasksModel.countDocuments({owner: userId})

console.log("countPro",counttask)

// if(counttask >= 1 ) throw new Error("Sorry, you can only add 1 task")
// for multer
// if(!req.files[0]) throw new Error("Error in creating task")

// for multi Part (in multi part no file[0])
if(!req.files[0]) throw new Error("please upload task Image")
// console.log(req.files[0].mimetype)

if(req.files[0].mimetype === "image/png"||
req.files[0].mimetype === "image/jpeg"||
req.files[0].mimetype === "image/jpg" ) console.log(" accept png, jpg, jpeg")
else{
    fs.unlink(req.files[0].path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        else{
          console.log("Delete sus")
        }
      })
    throw new Error("only accept png, jpg, jpeg")
}

if(req.files[0].size >= 1000000)throw new Error("only accept 1 Mb Image")
// const UploadInStorageBucket = await bucket.upload(    req.files[0].path,
//     {
//         destination: `tweetPictures/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
//     })
//     if(!UploadInStorageBucket) throw new Error("Server Error")
    
// console.log('UploadInStorageBucket',UploadInStorageBucket)
bucket.upload(
    req.files[0].path,
    {
        destination: `SaylaniHacthon/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
    },
    function (err, file, apiResponse) {
        if (!err) {

            file.getSignedUrl({
                action: 'read',
                expires: '03-09-2999'
            }).then((urlData, err) => {
                if (!err) {


fs.unlink(req.files[0].path, (err) => {
  if (err) {
    console.error(err,"dd")
    return
  }
  else{
    console.log("Delete sus")
  }
})
                  
                    taskModel.create({
                        name: taskResult.name,
                        priceUnit: taskResult.priceUnit,
                        price: taskResult.price,
                        description: taskResult.description,
                        taskType:taskResult.taskType,

                        taskImage: urlData[0],
                        owner: new mongoose.Types.ObjectId(token._id)
                    },
                        (err, saved) => {
                            if (!err) {
                                console.log("saved: ", saved);

                                res.send({
                                    message: "task added successfully"
                                });
                            } else {
                                console.log("err: ", err);
                                res.status(500).send({
                                    message: "server error"
                                })
                            }
                        })
                }
            })
        } else {
            console.log("err: ", err)
            res.status(500).send({message:err});
        }
    });



} catch (error) {

    res.status(500).send({
        message: error.message
    })
    console.error(error.message);

   }
})

router.post('tasks',async(req,res)=>{
const body = req.body
    try {

        if(!body){
            res.send({message:"Required Parameter Missing"})
            return;
        }
     const tasks = await tasksModel.create({
title: body.title,
description: body.description,
status: body.status,
dueDate:body.dueDate,
     })

     if(!tasks) throw new Error("Server Error")

     res.send({message:"Task is created"}).status(422)
return;

} catch (error) {
      res.status(500).send({
            message: error.message
        })
        console.error(error.message);
}


})

router.get('/taskFeed' , async(req,res)=>{
    const { page, limit = 8 } = req.query;
    try {
        const data = await tasksModel.find()
        .sort({"_id":-1})
        .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
   if(!data) throw new Error("tasks Not Found")
      const count = await  tasksModel.countDocuments();
      console.log(count)
      
      res.json({
        data,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
        console.error(error.message);
    }
})

router.get('/tasks/:id', async (req, res) => {

try {
    const id = req.params.id;
    const verifytask = await tasksModel.findOne({ _id: id })
    if(!verifytask) throw new Error("task not found")
    res.send({
        message: `get task by id: ${verifytask._id} success`,
        data: verifytask
    });
    return;
} catch (error) {
    res.status(500).send({
        message: error.message
    })
    console.error(error.message);
}
   
  
})
router.get("/tasks/:name",async (req, res) => {

    try {
        const body = req.body
        const name = req.params.name
        const verifytaskName = await  tasksModel.find({ 
   
            name: { $regex: `${name}` }
         })
         if(!verifytaskName)throw new Error("task not Found")

         res.send({
            message: `get task by success`,
            data: verifytaskName,
          });

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
        console.error(error.message);
    }

  });


router.get('/tasks',async (req, res) => {
try {
    const userId = new mongoose.Types.ObjectId(req.body.token._id);
    console.log(userId)
    
    const verifyUser=  await tasksModel.find(
            { owner: userId
                // , isDeleted: false 
                }, {},{
                sort: { "_id": -1 },
                limit: 100,
                skip: 0
            })

if(!verifyUser) throw new Error("server error")
            res.send({
                message: "got all tasks successfully",
                data: verifyUser
            })
} catch (error) {
    res.status(500).send({
        message: error.message
    })
    console.error(error.message);

}
   
})

router.delete('/task/:id',async (req, res) => {
    const id = req.params.id;
    tasksModel.deleteOne({ _id: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "task has been deleted successfully",
                })
            } else {
                res.status(404);
                res.send({
                    message: "No task found",                    //  with this id: " + id,
                });
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

router.put('/task/:id',async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if (
        !body.name ||
        !body.price ||
        !body.description
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "description": "value",
            "taskImage": "value"
        }`)
        return;
    }

    try {
        let data = await tasksModel.findByIdAndUpdate(id,
            {
                name: body.name,
                price: body.price,
                description: body.description,
                taskImage:body.taskImage
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "task modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }
})
router.post('/category',
//  multipartMiddleware
 uploadMiddleware.any()
,  async (req, res) => {
   
   try {
    const body =req.body
    // this is The we are sending
if(req.fileValidationError){
    res.status(400).send({message:"Only .png, .jpg and .jpeg format allowed!"})
    return
}
    const token = jwt.decode(req.cookies.Token)


   

    

// if(counttask >= 1 ) throw new Error("Sorry, you can only add 1 task")
// for multer
// if(!req.files[0]) throw new Error("Error in creating task")

// for multi Part (in multi part no file[0])
if(!req.files[0]) throw new Error("please upload task Image")
// console.log(req.files[0].mimetype)

if(req.files[0].mimetype === "image/png"||
req.files[0].mimetype === "image/jpeg"||
req.files[0].mimetype === "image/jpg" ) console.log(" accept png, jpg, jpeg")
else{
    fs.unlink(req.files[0].path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        else{
          console.log("Delete sus")
        }
      })
    throw new Error("only accept png, jpg, jpeg")
}

if(req.files[0].size >= 1000000)throw new Error("only accept 1 Mb Image")
// const UploadInStorageBucket = await bucket.upload(    req.files[0].path,
//     {
//         destination: `tweetPictures/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
//     })
//     if(!UploadInStorageBucket) throw new Error("Server Error")
    
// console.log('UploadInStorageBucket',UploadInStorageBucket)
bucket.upload(
    req.files[0].path,
    {
        destination: `SaylaniHacthon/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
    },
    function (err, file, apiResponse) {
        if (!err) {

            file.getSignedUrl({
                action: 'read',
                expires: '03-09-2999'
            }).then((urlData, err) => {
                if (!err) {


fs.unlink(req.files[0].path, (err) => {
  if (err) {
    console.error(err,"dd")
    return
  }
  else{
    console.log("Delete sus")
  }
})
                  
               category.create({
                        name: body.name,
                       

                        CategoryImage: urlData[0],
                        owner: new mongoose.Types.ObjectId(token._id)
                    },
                        (err, saved) => {
                            if (!err) {
                                console.log("saved: ", saved);

                                res.send({
                                    message: "Category added successfully"
                                });
                            } else {
                                console.log("err: ", err);
                                res.status(500).send({
                                    message: "server error"
                                })
                            }
                        })
                }
            })
        } else {
            console.log("err: ", err)
            res.status(500).send({message:err});
        }
    });



} catch (error) {

    res.status(500).send({
        message: error.message
    })
    console.error(error.message);

   }
})


router.get('/categoryFeed' , async(req,res)=>{
    const { page, limit = 8 } = req.query;
    try {
        const data = await category.find()
        .sort({"_id":-1})
        .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
   if(!data) throw new Error("Category Not Found")
      const count = await  category.countDocuments();
      console.log(count)
      
      res.json({
        data,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
        console.error(error.message);
    }
})
router.post("/placeOrder",async (req, res) => {
    try {
    let body = req.body
          
         
        
    
       const placeOrder= await placeorder.create({
        FullName: body.FullName,
        email: body.email,
        status: body.status,
        TotalAmount:body.TotalAmount,
        totalItems:body.totalItems,
        number:body.number,
        shippingAddress:body.shippingAddress
             
        })
        if(!placeOrder) {
            res.status(500).send({message:"Server Error"})
            return;
        }
    
        res.status(201).send({ message: "Order Is Placed" });
    
    } catch (error) {
        if (error.isJoi === true ||error.message) error.status = 422
      
        console.log("placeOrder Error: ", error,error.status);
        console.log("placeOrder Error Message: ", error.message);
        error.status
        res.status(error.status).send({
            message: error.message
        })
        
    }
    
    
    
    
        
    
    });

    router.get('/placeOrders', (req, res) => {

        const userId = new mongoose.Types.ObjectId(req.body.token._id);
    
        placeorder.find(
            { owner: userId },
            {},
            {
                sort: { "_id": -1 },
                limit: 12,
                skip: 0
            }
            , (err, data) => {
                if (!err) {
                    res.send({
                        message: "got all order successfully",
                        data: data
                      
                    })  
                   
                } else {
                    res.status(500).send({
                        message: "server error...."
                    })
                }
            });
    })


    router.get('/placeOrderFeed' , async(req,res)=>{
        const { page, limit = 8 } = req.query;
        try {
            const data = await placeorder.find()
            .sort({"_id":-1})
            .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
       if(!data) throw new Error("Category Not Found")
          const count = await  placeorder.countDocuments();
          console.log(count)
          
          res.json({
            data,
            totalPages: Math.ceil(count / limit),
            currentPage: page
          });
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
            console.error(error.message);
        }
    })
    router.put('/placeOrder/:id',async (req, res) => {

        const body = req.body;
        const id = req.params.id;
    
        if (
            !body
          
        ) {
            res.status(400).send(` required parameter missing. example request body:
            {
                "name": "value",
                "price": "value",
                "description": "value",
                "taskImage": "value"
            }`)
            return;
        }
    
        try {
            let data = await placeorder.findByIdAndUpdate(id,
                {
                    status: body.status,
                },
                { new: true }
            ).exec();
    
            console.log('updated: ', data);
    
            res.send({
                message: "task modified successfully"
            });
    
        } catch (error) {
            res.status(500).send({
                message: "server error"
            })
        }
    })
export default router