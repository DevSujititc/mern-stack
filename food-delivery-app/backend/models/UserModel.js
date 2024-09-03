import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {type:String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type:String, require: true},
    cartData: {type: Object, default:{}}

}, {minimize:false});

// hashing user password just before saving it
userSchema.pre("save", async function (next) {
    const user = this;
    
    if (!user.isModified("password")) return next(); // if password is not modified

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
})

// custom method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
}

// custom method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// custom method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;