import mongoose, { Types } from "mongoose";

const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const User = mongoose.model('User', UserSchema );   // model is used to vrate collection name user with data Userschema in database to perform CRUD in mongodb with help of mongoose
export default User;
