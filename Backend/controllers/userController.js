import User from "../models/User.js";
import bcrypt from "bcrypt";

//function to check if the user with the given email already exits
const checkExtingUser = async(email)=>{
    return User.findOne({
        email
    });
}
//Signup function for user registration
export async function SignUp(req,res,next) {
    try{
        const { firstName, lastName, email, password } = req.body;

        //validate required fields
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                errror : "Invalid input",
                message : "Please provide first Name ,lastname ,email and password"
            });
        }
        //check if the user with the same email already exits
        const exitingUser = await checkExtingUser(email);
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
            message : " User created successfully",
            data : newUser
        })

    }catch(err){
       next(err);//pass the error to the error handling miidleware
    }
}
export async function loginUser(req,res,next){
    try{
        const{ email, password} = req.body;

        //Validate input fields
        if(!email || !password){
            return res.status(400).json({
                error : "Missing credentials",
                message : "Email and passsword are required"
            })
        }

        //find the user
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                error : "User not found",
                message : "Invalid email or password"
            })
        }
        //compare passwords
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                error : "Invalid credintials",
                message : "Email or password is incorrect"
            })
        }else{
            //genarate jwt tokens
            const token = user.generateAuthToken();

            //send response
            return res.status(200).json({
                success : true,
                message : "Login successful",
                token,
                user : {
                      id: user._id,
                      email: user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      role: user.role
                }
            })
        }
    } catch (err){
        next(err);
    }
}