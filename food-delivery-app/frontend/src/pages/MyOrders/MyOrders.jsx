import React, { useEffect, useState } from 'react'
import './myOrder.css'
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/constants';
import { assets } from '../../assets/assets';

function MyOrders() {

    const [data, setData] = useState([]);

    const fetchOrders = async ()=>{
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(API_ENDPOINTS.userOrders,{
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
            
                setData(response.data.data);
            // console.log(response.data.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token)
            fetchOrders()
    },[])
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>

        {
            data.map((order, index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {
                                order.items.map((item, index)=>{
                                    if(index ===order.items.length -1){
                                        return item.name + " x " + item.quantity
                                    }else{
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })
                            }
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> {order.status}</p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })
        }

      </div>
    </div>
  )
}

export default MyOrders
