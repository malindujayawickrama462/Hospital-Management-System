import User from "../models/User.js"

//function to check if the user with the given email already exits
const checkExtingUser = async(email)=>{
    return User.findOne({
        email
    });
}
//Signup function for user registration
export async function SignUp(req,res,next) {
    try{
        req.body

        //validate required fields
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                errror : "Invalid input",
                message : "Please provide first Name ,lastname ,email and password"
            });
        }
        //check if the user with the same email already exits
        const exitingUser = new checkExtingUser(email);
        if(exitingUser){
            return res.status(400).json({
                error : "user already exits",
                message : "A user with this email adderss already exits"
            })
        }
        //Create a new User

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
        })
        return res.status(201).json({
            success : true,
            message : "üser created successfully"
        })

    }catch(err){
       next(err);//pass the error to the error handling miidleware
    }
}