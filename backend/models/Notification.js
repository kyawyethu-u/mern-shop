const {model, Schema} = require("mongoose")

const notificationSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String,
    },
    product_id: {
        required: true,
        type: String,
    },
    owner_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    phone_number: {
        required: true,
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
})

const notificationModel = model("Notification",notificationSchema)

module.exports = notificationModel;