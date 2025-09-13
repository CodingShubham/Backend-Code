const express=require("express");
const userModel=require("../Model/user");
const userAuth=require("../Middlewares/authMiddleware");
const {validateEditProfile}=require("../utils/validation");

const profileApi=express.Router();


// profile api

profileApi.get("/profile/view", userAuth, (req,res)=>{

    try{

            const user=req.user

            res.send(user);

    }


    catch(err){
        res.status(400).send("Invalid credentials");
    }
});


// Update the Profile

  profileApi.patch("/profile/edit", userAuth, async(req,res)=>{



        try{

            validateSignupData(req);

            if(!validateEditProfile(req)){
                return res.status(400).send("Invalid Edit Request");
            }

            const user=req.user;
             console.log(user);
            Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]));
            console.log(user);
        }

        catch(err){

            res.status(401).send("Not Updated");

        }

    })


module.exports={profileApi};