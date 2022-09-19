let { Schema, model, Types } = require("mongoose")


let productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


const Product = model("Product", productSchema);

module.exports = Product;