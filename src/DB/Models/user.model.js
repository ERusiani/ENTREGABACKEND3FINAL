import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        type: mongoose.SchemaTypes.ObjectId,
        required:true,
        ref: 'Carts'
    },
    role:{
        type:String,
        required:true,
        enum:['user','admin'],
        default:'user'
    }
})

const usersModel = mongoose.model(collection,schema);

export default usersModel;