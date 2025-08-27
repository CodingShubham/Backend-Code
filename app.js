
const connectDB=require("./config/database");
const userModel=require("./Model/user");

const express=require("express");
const app=express();

app.use(express.json());


connectDB().then(()=>{

    console.log("Database Connected Sucessfully");
    
    app.listen(3000,(req,res)=>{

        console.log("server is listening on port 3000")
        
    })


}).catch((err)=>{

          console.log("server is not connected")

});



app.post("/signup", async(req,res)=>{


    // Hard coding method for sending data in db through API

    // console.log(req.body)
    // const user=new userModel({
    //     firstName:"ram",
    //     age:34,
    //     emailId:"ss9824473@gmail.com",
    // })

    // await user.save();
    // res.send("user registered sucessfully");


    
    // Dynamic method for sending data in db through API


     console.log(req.body)
    const user=new userModel(req.body);

    await user.save();
    res.send("user registered sucessfully");


})  

//login

app.get("/login", async(req,res)=>{

    const user=  req.query.firstName;
    console.log(user)

    try{

          const userdata= await userModel.find({firstName:user});

            res.send(userdata);

    }

    catch(err){

        res.send("Not Exists");
    }

  

}); 



