import userModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';


// user login
const userLogin = async (req, res)=>{
    const {email, password} = req.body;
    
    try {
        const user = await userModel.findOne({email});
        
        if(!user){
            // we used status code 404 When data is not found
            res.status(404).json({status: false, message: 'Invalid email address or password.'})
        }

        // Comparing the password using custom method of User model
        const passwordMatch = await user.comparePassword(password);
        
        if(passwordMatch){
            
            // call function to generate access and refresh token after that destruct it
            const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
            
            const loggedInUser = await userModel.findById(user._id).select("-password")

            return res.status(200).json({
                status: true,
                message: 'Login Successful',
                user: loggedInUser, accessToken, refreshToken
            })
        }
        else{
            // We used status code 401 when the user is unauthorize
            res.status(401).json({status: false, message: "Invalid email address or password."})
        }

    } catch (error) {
        // We used status code 500 when the system return unexpected error
        res.status(500).json({status:false, message:error});
    }
}

// controller function to handle access and refresh token generation
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        // generating access and refresh tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // updating refreshToken of user
        user.refreshToken = refreshToken;

        // saving the refresh token to the database without validation
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        res.status(500).json({status: false, error: "Something went wrong while generating refresh and access tokens" })
    }
}

// user register
const signup = async (req, res)=>{
        
    const errorResponse = {
        name:"",
        email:"",
        password:""
    }

    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error)=>{
            
            errorResponse[error.path] = error.msg;
            
        })
        // console.log(errorResponse);
        //   We used status code 400 when there are validation error, it mean bad request
          return res.status(400).json({status:false, errors: errorResponse });
    }

    const {name, email, password} = req.body;
    try {

        // check user is already exist
        const userExist = await userModel.findOne({ email });
        if(userExist){
            // We used status code 409 when used is exist, it mean conflict with existing data
            return res.status(409).json({status: false, message: 'The user already exist.'})
        }

        const newUser = new userModel({
            name: name,
            email: email,
            password: password,

        });

       const user = await newUser.save();

        //create token and access it
        // calling generateAccessTokenAndRefreshTokens and destructuring tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        // setting cookies in the response
        return res
        .status(200)        
        .json({
            'status': true,
            message: 'Register Successful',
            accessToken, refreshToken
        });

    } catch (error) {
        res.status(500).json({status:false, message: error});
    }
}

export {userLogin, signup}