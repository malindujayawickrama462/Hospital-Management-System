import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        role : {
            type : String,
            required : true,
            default : "patient"
        },
        isBlocked : {
            type : Boolean,
            required : true,
            default : false
        },
        img : {
            type : String,
            required : true,
            default : "https://eu.ui-avatars.com/api/?name=John+Doe&size=250"
        }
    }
);

const User = mongoose.model("Users",userSchema);

export default User;