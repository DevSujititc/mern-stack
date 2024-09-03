import express from 'express'
import {addFood, updateFood, foodList, deleteFood} from '../controllers/FootController.js'
import multerUpload from '../middlewares/multerMiddleware.js';

const foodRouter = express.Router();

// Specify the destination folder dynamically
const foodDestinationFolder = './uploads/food';

// Middleware for product upload
const uploadMiddleware = multerUpload(foodDestinationFolder);

foodRouter.post('/add',uploadMiddleware, addFood)
foodRouter.put('/update/:id',uploadMiddleware, updateFood)
foodRouter.get('/list',foodList);
foodRouter.delete('/delete/:id',deleteFood);
export default foodRouter;