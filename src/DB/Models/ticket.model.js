import mongoose from "mongoose";

const collection = "Tickets";

function code() {
    return Date.now() + '-' + Math.floor(Math.random() * 10000);
  }

const schema = new mongoose.Schema({
    code: {
        type: String,
        default: code(),
        unique: true      
    },
      purchase_datetime: {
        type: Date,
        default: Date.now
      },
      amount: {
        type: Number,
        required: true
      },
      purchaser: {
        type: String,
        required: true
      }
})

const ticketsModel = mongoose.model(collection, schema);

export default ticketsModel;