import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, require:true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    images: {type: Array, require:[true, 'Images are required']},
    category: {type: String, require:true}
})

// Add a virtual property for image URLs
foodSchema.virtual('imageUrls').get(function() {

    // Construct the base URL from environment variable
    const baseUrl = process.env.BASE_URL + '/api/images/food/';
    
    // Map over the images array and prepend the base URL
    return this.images.map(filename => `${baseUrl}${filename}`);
  });
  
  // Ensure virtuals are included when converting to JSON
   foodSchema.set('toJSON', { virtuals: true });

const FoodModel = mongoose.models.food || mongoose.model("food",foodSchema);

export default FoodModel;