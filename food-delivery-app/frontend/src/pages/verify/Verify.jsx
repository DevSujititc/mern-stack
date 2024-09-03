import React, { useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import {API_ENDPOINTS} from '../../utils/constants.js'

function Verify() {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate()
    
    // console.log(success, orderId);
    
    const verifyPayment = async ()=>{
        try {
            const token = localStorage.getItem("token");
            
            
            const response = await axios.post(API_ENDPOINTS.verifyOrder,{success,orderId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            })
            
            if(response.data.status){
                toast.success(response.data.message);
                navigate('/myorders');
            }
            else{
                
                toast.error(response.data.message);
                navigate('/')
            }

            
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
