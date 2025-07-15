const {Schema,model} = require("mongoose")

var bidSchema = new Schema({
    product_id: {
        required: true,
        type: Schema.Types.ObjectId
    },
    seller_id:{
        required: true,
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    buyer_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text    : {
        required: true,
        type: String
    },
    phone_number: {
         required: true,
        type: String
    }
    },
    {
        timestamps: true,
    }
)

const bidModel = model("Bid",bidSchema)

module.exports = bidModel;