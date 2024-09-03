import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS } from "../../utils/constants";
import axios from "axios";
import "./add-item.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddItem() {

  const navigate = useNavigate();
  
  const {handleSubmit, register, reset, formState: { errors }, } = useForm();

  const [images, setImages] = useState([]);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList).slice(0, 4);
    
      setImages(fileArray);
    }
  };

  const onSubmit = async (data) => {

    const formData = new FormData();
    
    // Append all fields to FormData
    // Iterate over keys of data object
    Object.keys(data).forEach(key => {
        if (key === 'images') {
          for (let i = 0; i < data[key].length; i++) {
            formData.append('images', data[key][i]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });

    

    try {
    
      
      const response = await axios.post(`${API_ENDPOINTS.addFoodItem}`, formData);
    
      if (response.data.status == true) {
        // console.log("success");
        toast.success(response.data.message)
        setImages([]);
        // After submission, reset the form
        reset();
        navigate("/list");
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  };

  return (
    <div className="add-item">
      <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="images">
            <div className="uploaded-images">
              {
                    images.length !== 0 ? 
                    (
                        images.map((image, index) => (
                        <div key={index}>
                            <img
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index}`}
                            />
                        </div>
                        ))
                    ) 
                    : 
                    (
                        <img src={assets.upload_area} alt="image upload" />
                    )
                }
            </div>
          </label>
          <input
            multiple
            type="file"
            {...register("images", { required: true })}
            name="images"
            id="images"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* errors will return when field validation fails  */}
          {errors.image && (
            <span className="text-red-600 text-left">
              This field is required
            </span>
          )}
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>

          <input
            type="text"
            {...register("name", { required: true })}
            name="name"
            placeholder="Type here..."
          />

          {errors.name && (
            <span className="text-red-600 text-left">
              This field is required
            </span>
          )}
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            {...register("description", { required: true })}
            rows="6"
            placeholder="Write content here"
          ></textarea>
          {errors.description && (
            <span className="text-red-600 text-left">
              This field is required
            </span>
          )}
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              {...register("category", { required: true })}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
            {errors.category && (
              <span className="text-red-600 text-left">
                This field is required
              </span>
            )}
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="Number"
              {...register("price", { required: true })}
              name="price"
              placeholder="Price..."
            />
            {errors.price && (
              <span className="text-red-600 text-left">
                This field is required
              </span>
            )}
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;
