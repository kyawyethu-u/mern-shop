const {Schema,model} = require("mongoose")

var userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        trim: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: String,
        default: "active",
    },
  },
  {
    timestamps: true,
  }
)

const userModel = model("User",userSchema)

module.exports = userModel;