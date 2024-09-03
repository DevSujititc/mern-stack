import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";


// Store user place order
const placeOrder = async (req, res)=>{
    // console.log(req.body);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    const {userId, items, amount, address} = req.body;
    try {

        // Save order to order table
        const newOrder = new orderModel({
            userId:userId,
            items:items,
            amount:amount,
            address:address
        })
        await newOrder.save();

        // Remove cart items
        await userModel.findByIdAndUpdate(userId,{cardData: {}});

        // 
        const line_items = items.map((item)=>({
            price_data:{
                currency:"usd",
                product_data:{
                    name: item.name
                },
                unit_amount:item.price*100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charge"
                },
                unit_amount:2*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode: 'payment',
            success_url: `${process.env.FRONT_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONT_URL}/verify?success=false&orderId=${newOrder._id}`
        })

        res.status(200).json({status:true, session_url: session.url})
        
    } catch (error) {

        console.log(error);
        
        res.status(500).json({status:false, message:error.message})

    }
}

const verifyOrder = async (req, res)=>{
    const {orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.status(200).json({status: true, message: "Your payment has been successfully completed."})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.status(400).json({status: false, message: "Your payment was not completed."})
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({status:false, message: error})
    }
}

// User Order for frontend

const userOrders = async (req, res)=>{
    const {userId} = req.body;

    try {
        const orders = await orderModel.find({userId})
        res.status(200).json({status: true, data:orders})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({status: false, message: error.message})
    }
}

// Listing Order for admin panel
const listOrders = async (req, res)=>{
    
    try {
        const orders = await orderModel.find({})
        res.status(200).json({status: true, data:orders})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({status: false, message: error.message})
    }
}

// Api for updating order status
const updateOrderStatus = async (req, res)=>{
    const {orderId, status} = req.body

    try {
        await orderModel.findByIdAndUpdate(orderId, {status: status})
        res.status(200).json({status: true, message: "Status Updated."})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({status: false, message: error.message})
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus};