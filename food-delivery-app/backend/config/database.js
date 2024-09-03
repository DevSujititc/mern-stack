import mongoose from "mongoose";

export const mongodb = async ()=>{
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI)
    .then((result)=>{
        
        console.log('Mongoose database connected to HOST: ', result.connection.host);
    }).catch((error)=>{
        console.log(`Mongoose database connection error, ${error}`);
    })
}