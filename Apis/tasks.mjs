import express from 'express';
import mongoose from 'mongoose';
import { tasksModel,userModel} from '../dbRepo/model.mjs'
import moment from 'moment'





 const router = express.Router()

 router.get('/tasksInfo',async (req, res) => {
    try {
        const TotalUser = await  userModel.countDocuments();
      console.log(TotalUser)
      const TotalTasks = await  tasksModel.countDocuments();
      console.log(TotalTasks)
      const TotalTasksPending = await  tasksModel.count({status:"pending"});
      console.log("TotalTasksPending",TotalTasksPending)     
      const TotalTasksComplete = await  tasksModel.count({status:"Complete"});
      console.log("TotalTasksComplete",TotalTasksComplete)

      res.send({

        TotalUser:TotalUser,
        TotalTasks:TotalTasks,
        TotalTasksPending:TotalTasksPending,
        TotalTasksComplete:TotalTasksComplete,
      })
      return;
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
        console.error(error.message);
    
    }
       
    })

router.post('/tasks',async(req,res)=>{
const body = req.body
    try {

        if(!body){
            res.send({message:"Required Parameter Missing"})
            return;
        }
     const tasks = await tasksModel.create({
title: body.title,
description: body.description,
status: "Pending",
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
router.get('/tasks',async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.token._id);
        console.log(userId)
        
        const verifyTasks=  await tasksModel.find().sort({"_id":-1})
    // console.log(verifyTasks,"45")
    if(!verifyTasks) throw new Error("server error")
    const now = moment();
   let diff = 0
    verifyTasks.forEach(async(element ) =>  {
        diff =   now.diff(element.dueDate, "days")
        
        if(diff >0 &&  element.isExpired === false ) {
         
      await  tasksModel.findByIdAndUpdate(element._id,
             { isExpired : true },
             { new: true }).exec()
          
        }
       
});

//     verifyTasks.map(element => (
//         const diffInMinutes  =  now.diff(element.dueDate, "days")
// ));



   
    //  const dueDate = moment('2023-02-16');
    //  console.log(verifyTasks.dueDate)
    //  console.log(now)
     
                        
   
    // let data = await userModel.findByIdAndUpdate(verifyTasks._id,{
    //     isExpired: true,
//     var a = moment([2007, 0, 29]);
//     var b = moment([2007, 0, 28]);
//      // 1
// let c= a.diff(b, 'days') // 
// console.log(c,"c")
    // },
    // { new: true }).exec()
    // if (diffInMinutes >0) throw new Error("Tasks Expired")
    // if (verifyTasks.status === "Complete") throw new Error("You can only submit one Time")
                
    res.send({
                    message: "got all tasks successfully",
                    data: verifyTasks
                })
                return;
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
        !body
        
    ) {
        res.status(400).send(` required parameter`)
        return;
    }

    try {
        let data = await tasksModel.findByIdAndUpdate(id,
            {
                title: body.title,
                description: body.description,
                dueDate: body.dueDate,
                
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
router.put('/updateStatus/:id',async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if (
        !body
        
    ) {
        res.status(400).send(` required parameter`)
        return;
    }

    try {
        let data = await tasksModel.findByIdAndUpdate(id,
            {
                status:body.status
                
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



    router.get('/userFeed' , async(req,res)=>{
        const { page, limit = 12 } = req.query;
        try {
            const data = await userModel.find()
            .sort({"_id":-1})
            .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
       if(!data) throw new Error("Category Not Found")
          const count = await  userModel.countDocuments();
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

    router.put('/user/:id',async (req, res) => {
    
        try {
     
            const body = req.body;
            const id = req.params.id;
   
            if (
                !body
                
            ) {
                res.status(400).send(` required parameter missing`)
                return;
            }
        
            let data = await userModel.findByIdAndUpdate(id,{
                isDeleted: body.isDeleted,
                

            },
            { new: true }).exec()
    
            console.log('updated123 ', data);
    
            res.send({
                message: "task modified successfully",
                data:data
            });
    
        } catch (error) {
            res.status(500).send({
                message: "server error"
               
            })
            console.log(error.message) }
    })
export default router