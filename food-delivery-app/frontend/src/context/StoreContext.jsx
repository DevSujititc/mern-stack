import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { API_ENDPOINTS} from '../utils/constants.js'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthProvider.jsx";


export const StoreContext = createContext(null);



const StoreContextProvider = ({children})=>{

    // Cart functionality 
    const [cartItem, setCartItem] = useState({})
    const [food_list, setFood_list] = useState([])
    const [itemToAdd, setItemToAdd] = useState(null);
    const navigate = useNavigate()
    const {saveToken} = useContext(AuthContext)
    
    const addToCart = async (itemId)=>{
        const token = localStorage.getItem('token');
        if(!token){
            toast.error("Please log in to add items to your cart..")    
            return false;                      
        }

         setCartItem((prev) => {
            const newQty = prev[itemId] ? prev[itemId] + 1 : 1;
            setItemToAdd({ itemId, qty: newQty }); // Store item and quantity to use after state updates
            return { ...prev, [itemId]: newQty };
        });

        
    }

     useEffect(() => {
        if (itemToAdd) {
            const { itemId, qty } = itemToAdd;
            const token = localStorage.getItem('token');
            if (token) {
                
                // Make API request with updated qty
                axios.post(API_ENDPOINTS.addToCart, { itemId, qty }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).catch(error => {
                    if(error.response.data.message == "jwt expired"){
                        toast.error("Token expired. Please log in to continue.")
                        localStorage.removeItem("token");   
                        saveToken("");                    
                        navigate("/");
                    }
                    else{
                        console.log(error);
                        toast.error(error.message)
                    }
                });
            }
        }
    }, [cartItem, itemToAdd]); // Trigger effect when itemToAdd changes

    const removeCardItem = (itemId)=>{
        setCartItem((prev)=>{
            ({...prev, [itemId]:prev[itemId]-1})

            const newQty = prev[itemId] - 1;
            setItemToAdd({ itemId, qty: newQty }); // Store item and quantity to use after state updates
            return { ...prev, [itemId]: newQty };

        })
    }

    const getTotalCartAmount = ()=>{

        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodItems = async () => {
        try {
            
            const response = await axios.get(API_ENDPOINTS.fetchFoodItems);
            // console.log(response)
            setFood_list(response.data.data)
        } catch (error) {
            if(error.response.data.message == "jwt expired"){
                toast.error("Token expired. Please log in to continue.")
                localStorage.removeItem("token");   
                saveToken("");                    
                navigate("/");
            }
            else{
                console.log(error);
                toast.error(error.message)
            }
        }
    } 

    const loadCartData = async ()=>{
        const token = localStorage.getItem("token");
                
        try {
            const response = await axios.get(API_ENDPOINTS.getCartItems, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data.data);
            
            setCartItem(response.data.data);
            
        } catch (error) {
            console.error('Error fetching cart items:', error);
            // Handle errors accordingly
            if(error.response.data.message == "jwt expired"){
                toast.error("Token expired. Please log in to continue.")
                localStorage.removeItem("token");   
                saveToken("");                    
                navigate("/");
            }
            else{
                console.log(error);
                toast.error(error.message)
            }
        }
        
    }

    useEffect(()=>{
        
        fetchFoodItems()
        if(localStorage.getItem("token"))
            loadCartData()
    },[])

    const contextValue = {
        food_list,
        cartItem,
        addToCart,
        removeCardItem,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;