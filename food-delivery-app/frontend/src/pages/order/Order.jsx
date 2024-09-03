import React, { useContext, useEffect, useState } from "react";
import "./order.css";
import { StoreContext } from "../../context/StoreContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import {API_ENDPOINTS} from '../../utils/constants.js'
import { AuthContext } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

const Order = () => {

  const { getTotalCartAmount, food_list, cartItem } = useContext(StoreContext);
  const {token} = useContext(AuthContext);
  const getTotalAmount = getTotalCartAmount();
  const navigate = useNavigate()
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: ""
  })

  const changeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData({...data, [name]:value});

  }

  const handleSubmit = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItem[item._id]>0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItem[item._id];
          orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()
    }

    try {
      // const token = localStorage.getItem("token");
      let response = await axios.post(API_ENDPOINTS.placeOrder, orderData, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                      
                  })
                  console.log(response);
                  
      if(response.data.status==true){
        const {session_url} = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      
      console.log(error);
    }
    
  }

  useEffect(()=>{
    if(!token || getTotalAmount === 0){
      navigate('/cart')
    }
    
  },[token])

  return (
    <div className="order">
      <form onSubmit={handleSubmit} className="place-order">
        <div className="place-order-left">
          <h3>Delivery Information</h3>
          <div className="place-order-input">
            <input name="first_name" value={data.first_name} onChange={changeHandler} type="text" placeholder="First Name" />
            <input name="last_name" value={data.last_name} onChange={changeHandler} type="text" placeholder="Last Name" />
          </div>
          <div className="place-order-input">
            <input name="email" value={data.email} onChange={changeHandler} type="email" placeholder="Email" />
            <input name="phone" value={data.phone} onChange={changeHandler} type="text" placeholder="Phone" />
          </div>
          <input name="address" value={data.address} onChange={changeHandler} type="text" placeholder="Street Address" />
          <div className="place-order-input">
            <input name="city" value={data.city} onChange={changeHandler} type="text" placeholder="City" />
            <input name="state" value={data.state} onChange={changeHandler} type="text" placeholder="State" />
          </div>
          <div className="place-order-input">
            <input name="zip_code" value={data.zip_code} onChange={changeHandler} type="text" placeholder="Zip Code" />
            <input name="country" value={data.country} onChange={changeHandler} type="text" placeholder="Country" />
          </div>
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h3>Cart Totals</h3>
            <div className="cart-total-items">
              <div className="cart-total-items-item">
                <p>Subtotal</p>
                <p>${getTotalAmount === 0 ? 0 : getTotalAmount}</p>
              </div>
              <hr />
              <div className="cart-total-items-item">
                <p>Delivery Fee</p>
                <p>${getTotalAmount === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-items-item">
                <b>Grand Total</b>
                <b>${getTotalAmount === 0 ? 0 : getTotalAmount + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
