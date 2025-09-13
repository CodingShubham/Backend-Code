const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema(
    {

        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
        },

        status:{
            type:String,
            enum:{
                values:["accepted","rejected","ignore","interested"],
                message:`{values} is incorrect status type`,
            }
        }
    },

    {timestamps:true}

);



const ConnectionRequestModel=new mongoose.model("ConnectionRequestModel",connectionRequestSchema);

module.exports=ConnectionRequestModel