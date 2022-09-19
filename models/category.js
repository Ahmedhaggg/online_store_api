let { Schema, model, Types } = require("mongoose")


let categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    products: {
        type: [{
            type: Types.ObjectId,
            ref: "Product"
        }],
        default: []
    }
})

const Category = model("Category", categorySchema);

module.exports = Category;