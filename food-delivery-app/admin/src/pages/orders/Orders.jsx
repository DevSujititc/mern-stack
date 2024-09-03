import React from 'react'
import {API_BASE_URL, API_ENDPOINTS} from '../../utils/constants.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import './order.css'
import {assets} from '../../assets/assets.js'

function Orders() {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async ()=>{
      try {
          const response = await axios.get(API_ENDPOINTS.listOrders);
          // console.log(response.data.data);
          if(response.data.status == true){
            setOrders(response.data.data)
          }
          else{
            toast.error("Error! No any data fetch");
          }
          
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=>{fetchAllOrders()},[])

  const updateFoodStatus = async (event, orderId)=>{
    // console.log(event, orderId);
    const response = await axios.post(API_ENDPOINTS.updateOrderStatus,{
      orderId:orderId,
      status: event.target.value
    })
    if(response.data.status == true){
      toast.success(response.data.message);
      fetchAllOrders()
    }
    else{
      toast.error(response.data.message);
    }
  }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {
          orders.map((order, index)=>(
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {
                    order.items.map((item, index)=>{
                      if(index == order.items.length-1){
                        return item.name + " x " + item.quantity
                      }
                      return item.name + " x " + item.quantity + ", "
                    })
                  }
                </p>
                <p className='order-item-name'>{`${order.address.first_name} ${order.address.last_name}`}</p>
                <div className='order-item-address'>
                  <p>{`${order.address.address}, `}</p>
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zip_code}`}</p>
                </div>
                <p className='order-item-phone'>{`${order.address.phone}`}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>$ {order.amount}</p>
              <select onChange={(event)=>updateFoodStatus(event, order._id)} value={order.status}>
                <option value="Food Procession">Food Procession</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Deliver">Deliver</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}
import './order.css'
import { useState } from 'react'
import { useEffect } from 'react';

export default Orders
