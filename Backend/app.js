
const connectDB=require("./config/database");
const userModel=require("./Model/user");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const userAuth=require("./Middlewares/authMiddleware");

const cors=require("cors");


app.use(cors({
  origin: "http://localhost:5173", // your React dev URL
  credentials: true
}));


app.use(express.json());
app.use(cookieparser());


connectDB().then(()=>{

    console.log("Database Connected Sucessfully");
    
    app.listen(3000,(req,res)=>{

        console.log("server is listening on port 3000")
        
    })


}).catch((err)=>{

          console.log("server is not connected")

});



// CREATING The Data in Databse
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


    //  console.log(req.body)

    const{firstName,lastName,emailId,password}=req.body;
    const user=new userModel({
        firstName,
        lastName,
        emailId,
        password
    });

    
    if(password.length<5){
        throw new Error("Invalid password");
    }

    const hashed_pass= await bcrypt.hash(password, 10);
  
    user.password=hashed_pass;


    

    await user.save();
    res.send("user registered sucessfully");


})  

// Login APi

app.post("/login", async(req,res)=>{

    const{firstName, password,emailId}=req.body;
   

    try{

          const userdata= await userModel.findOne({emailId:emailId});

          if(!userdata){
            throw new Error("user not exists");
          }


          const validpassword= await bcrypt.compare(password,userdata.password);
          
          if(validpassword){
            
            //create jwt token and pass in the cookie

            const token= await jwt.sign({_id:userdata._id}, "shubham678");
            console.log(token);

            //create cookie

            res.cookie("token",token,{
            httpOnly: true,
            sameSite: "lax",
            secure: false // set true if using https
            });
            res.send("Logged in Sucessfully");

          }


          else{
            throw new Error("invalid credentials");
          }

          

          

    }

    catch(err){

        res.status(400).send("Not Exists");
    }

}); 



// profile api


app.get("/profile", userAuth, (req,res)=>{

    try{

            const user=req.user

            res.send(user);

    }


    catch(err){
        res.status(400).send("Invalid credentials");
    }
});







    //Deleting data from database
    app.delete("/user/:id", userAuth, async(req,res)=>{

        const userId=req.params.id;

        try{

            const data= await userModel.findByIdAndDelete(userId);
            res.send("deleted");
        }

        catch(err){

            res.status(400).send("Unable to delete");

        }


    });

    // UPDATING Data In Database
    app.patch("/update", async(req,res)=>{

        const userId=req.body.userId;
        const data=req.body;

        try{

            const changed= await userModel.findByIdAndUpdate(userId, data)
            res.send("Updated");
            

        }

        catch(err){

            res.send("Not Updated");

        }

    })



    //Logout API

    app.post("/logout", (req,res)=>{

    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false // must match the login cookie
  });

        res.send("Logout Sucessfully");

    });




