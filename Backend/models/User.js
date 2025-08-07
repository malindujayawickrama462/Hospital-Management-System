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
        },
        
    },
    {
        timestamps: true,
    }
);

//pre-save middelware to hash password

userSchema.pre("save", async function(next){
    //only hash the password if it has been modified(or is new)
    if(!this.isModified("password")){
        return next();
    }
    try{
        const salt = await bcrypt.gensalt(10);//genarate salt
        const hashedPassword = await bcrypt.hash(this.password, salt);//hash the password
        this.password = hashedPassword;//replace plain password
        next();
    }catch(err){
        next(err);//pass error
    }
});

const User = mongoose.model("Users",userSchema);

export default User;