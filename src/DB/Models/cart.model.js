import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
})

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;