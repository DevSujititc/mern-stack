import FoodModel from "../models/FoodModel.js";
import fs from 'fs';

// add food item
const addFood = async (req, res)=>{
  // console.log(req.files);
  // console.log(req.body);return false;
    // Access uploaded images from req.files
    const imageNames = req.files.map((file)=>file.filename);
    // Access other form data from req.body
    const { name, price, description, category } = req.body;
    

    // Save product data to database
    try {
        
        const food = new FoodModel({
            name: name,
            category: category,
            price: price,
            description: description,
            images: imageNames
        });

        await food.save();

        res.status(200).json({status: true, message: 'Food added successfully' });
    } catch (error) {
        res.status(500).json({status: false, message: `Failed to add product, ${error.message}` });
    }
}

// Update food item
const updateFood = async(req, res)=>{

    const foodId = req.params.id;
    // Access uploaded images from req.files
    const imageNames = req.files.map((file)=>file.filename);
    // Access other form data from req.body
    const { name, price, description, category } = req.body; 
    
    try {


        // Check food item
        const foodItem = await FoodModel.findById(foodId);
        if(!foodItem){
            return res.status(404).json({ status: false, message: 'Food item not found' });
        }

        foodItem.name = name;
        foodItem.category = category;
        foodItem.price = price;
        foodItem.description = description;

        // Update images if new ones are provided
        if(imageNames.length > 0){
            // Delete existing images (if needed)
            deleteImages(foodItem.images);
            foodItem.images = imageNames;
        }

        // Save food item
        foodItem.save()

        res.status(200).json({status: true, message: `The food item update successfully.`, data: foodItem})

        
    } catch (error) {
        res.status(500).json({status: false, message: `Failed to update food item, ${error.message}` });
    }
}

// List food items
const foodList = async (req, res)=>{
    try {
        const foodData = await FoodModel.find({});

        res.json({status: true, data: foodData})
    } catch (error) {
        res.status(200).json({status: false, message:"Food item can't listed because of "+error})
    }
}

// Function to delete images asynchronously
const deleteImages =  (foodImages) => {
    try {
      const foodImgPath = 'uploads/food';
      foodImages.map((image) => {
        fs.unlink(`${foodImgPath}/${image}`,()=>{});
        // console.log(`Deleted: ${foodImgPath}/${image}`);
      });
    } catch (error) {
      throw error; // Throw error to be caught by the caller
    }
  };

// Remove food item
const deleteFood = async (req, res) => {
    const id = req.params.id;
    try {
      // Find food item to delete images
      const foodItem = await FoodModel.findById(id);
      if (!foodItem) {
        return res.status(404).json({ status: false, message: 'Food item not found' });
      }
  
      // Delete food item images
      deleteImages(foodItem.images);
  
      // Delete food item from database
      const query = { _id: id };
      await FoodModel.deleteOne(query);
  
      res.status(200).json({ status: true, message: `The food item has been deleted successfully.` });
    } catch (error) {
      console.error('Error deleting food item:', error);
      res.status(500).json({ status: false, message: `There was an error while deleting the food item: ${error.message}` });
    }
  };

export {addFood, updateFood, foodList, deleteFood};