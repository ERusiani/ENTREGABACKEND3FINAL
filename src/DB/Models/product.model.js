import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new mongoose.Schema({
    title:String,
    description:String,
    code:String,
    price:Number,
    stock:Number,
    category:String,
    status:{
        type:Boolean,
        default:true
    }
})

schema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection,schema);

export default productsModel;