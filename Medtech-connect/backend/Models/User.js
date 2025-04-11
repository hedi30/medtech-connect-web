var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
userName: {
type: String,
required: true,
},
email: {
type: String,
required: true,
unique:true,
},
password: {
    type: String,
    required: true},
    role: {
    type: String,
    enum: ['admin'], // Allowed roles
    default: 'admin' // Default role
    }
}
);
const User = mongoose.model('User',userSchema)
module.exports= User;