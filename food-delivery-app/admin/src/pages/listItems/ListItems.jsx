import React, { useEffect, useState } from 'react'
import {API_BASE_URL, API_ENDPOINTS} from '../../utils/constants.js'
import './list-items.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function ListItems() {
  const apiURL = `${API_BASE_URL}`;  

  const [list, setList] = useState([]);
  const fetchList = async ()=>{
    
    const response = await axios.get(`${API_ENDPOINTS.getFoodItems}`);
    // console.log(response);
    if(response.data.status == true){
      setList(response.data.data);
    }
    else{
      toast.error("Error! No any data fetch");
    }
  }

  const removeFoodItem = async (foodId)=>{
    const response = await axios.delete(`${API_ENDPOINTS.removeFoodItem}/${foodId}`)
    if(response.data.status === true){
      toast.success(response.data.message);
      fetchList();
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(()=>{fetchList()},[])

  return (
    <div className='list add flex-col'>
      <h2>All Food List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
            return (
              <div key={index} className="list-table-format">
                <img src={`${apiURL}/images/food/${item.images[0]}`} alt={`${item.name}`} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFoodItem(item._id)} className='cursor'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListItems
