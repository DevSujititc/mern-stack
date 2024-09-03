import userModel from '../models/UserModel.js'


// Add item to user cart
const addToCart = async (req,res)=>{
    const {userId, itemId, qty} = req.body;
    
    if (!userId || !itemId || typeof qty !== 'number') {
        return res.status(400).json({ status: false, message: 'Invalid input' });
    }

    try {
        // find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        // Update cart data
        let cartData = user.cartData || {};
        
        if(qty>0)
            cartData[itemId] = qty;
        else
            delete cartData[itemId];

        await userModel.findByIdAndUpdate(userId, {cartData});

        return res.status(200).json({status:true, message: "Your item has been added to the cart successfully."})
        
    } catch (error) {
        return res.status(500).json({status:false, message: error.message})
    }
}

// Remove item from user cart
const removeFromCart = async (req,res)=>{
    const { userId } = req.body; // User ID should be passed in the request body
    const { itemId } = req.params; // Item ID is retrieved from the URL path

    if (!userId || !itemId) {
        return res.status(400).json({ status: false, message: 'Invalid input' });
    }

    try {
        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        // Modify cart data
        let cartData = user.cartData || {};
        if (cartData[itemId]) {
            delete cartData[itemId];
        } else {
            return res.status(404).json({ status: false, message: 'Item not found in cart' });
        }

        // Save updated cart data
        
        await userModel.findByIdAndUpdate(userId,{cartData});

        return res.status(200).json({ status: true, message: 'Item removed from the cart successfully.' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return res.status(500).json({ status: false, message: error.message });
    }
}

// Get user cart data
const getFromCart = async (req, res)=>{
    const { userId } = req.body; // User ID should be passed in the request body
    try {

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        return res.status(200).json({status: true, data: user.cartData})
        
    } catch (error) {
        return res.status(500).json({status:false, message:error.message})
    }
}

export {addToCart, removeFromCart, getFromCart}