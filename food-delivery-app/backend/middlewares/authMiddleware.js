import jwt from 'jsonwebtoken';
import userModel from '../models/UserModel.js';

const authMiddleware = async(req, res, next)=>{
    
    // Get the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer","").trim();

// console.log("Token===",req.header("Authorization"));
    // Validate the token
    if(!token){
        return res.status(401).json({status: false, message : "Authentication token is missing or invalid. Please provide a valid token."})
    }

    try {
        // Verify and decode access token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const userId = decodedToken._id

        try {
            // fetch user details based on _id decoded from JWT token
            const user = await userModel.findById(userId).select("-password")
            if(user){
                req.body.userId = userId;
                next();
            }else{
                return res.status(401).json({status: false, message: "Invalid user access."})
            }
        } catch (error) {
            return res.status(401).json({status: false, message: error.message})
        }



    } catch (error) {
        return res.status(401).json({status: false, message : error.message})
    }
}

export default authMiddleware;