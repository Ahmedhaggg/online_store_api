let { Schema, model, Types } = require("mongoose")


let orderSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
            }
        ],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['sent', "received", 'shipped', "completed"],
        default: 'sent'
    }
})

const User = model("Order", orderSchema);

module.exports = User;  