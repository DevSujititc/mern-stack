import multer from "multer";
import fs from "fs";

// Function to create multer middleware with dynamic destination
const multerUpload = (destination) => {
    // console.log("multerUpload calling...")

    // Multer disk storage settings
    const storage = multer.diskStorage({
        destination: async(req, file, callback)=>{
            try {
                // console.log("Storage...",req, file);
                
                // create the directory if it doesn't exist
                await fs.promises.mkdir(destination, { recursive: true });

                // Directory where files will be stored
                callback(null, destination); 

            } catch (error) {
                callback(error);
            }
            
        },
        filename: (req, file, callback)=>{
            // Naming the file inside the destination folder
            callback(null, Date.now() + '-' + file.originalname);
        }
    });

    // Initiate multer instance and configure upload settings
    const upload = multer({ 
        storage,
        limits: {
            fileSize: 1024 * 1024 * 5 // Limit file size to 5MB, for example
        },
        fileFilter: (req, file, cb) => {
            // Example: Accept only image files with specific extensions
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only images are allowed'));
            }
        } 
    });

    // Return multer middleware
    return upload.array('images', 4); //It handles up to 4 files simultaneously

}

export default multerUpload;