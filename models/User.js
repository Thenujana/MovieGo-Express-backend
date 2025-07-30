import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    _id:{type:String,required:false},
     name:{type:String,required:false},
      email:{type:String,required:false},
       image:{type:String,required:false},
})
const User=mongoose.model('User',userSchema)
export default User;