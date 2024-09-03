import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './login-popup.css'
import { assets } from '../../assets/assets'
import { AuthContext } from '../../context/AuthProvider';
import {API_BASE_URL, API_ENDPOINTS} from '../../utils/constants.js'
import { toast } from 'react-toastify';

const LoginPopup = ({setShowLogin}) => {

    const {saveToken} = useContext(AuthContext);

    const [currentState, setCurrentState] = useState('Login');
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    });
    const [error, setError] = useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    
    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        let apiURL = currentState==='Login'?API_ENDPOINTS.login:API_ENDPOINTS.signup;
         

        try {
            const response = await axios.post(apiURL, data)
            if(response.data.status === true){
                saveToken(response.data.accessToken);
                setShowLogin(false);
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            // console.log(error.response.data);
            if(error.response.data.errors){
                const errors = error.response.data.errors
                
                Object.entries(errors).map(([name, value]) => {                   
                    setError(data=>({...data,[name]:value}))
                    
                })

            }else{
                // console.log(error.response.data.message);
                toast.error(error.response.data.message)
            }
        }
        
    }
    
  return (
    <div className='login-popup'>
        <form onSubmit={onSubmitHandler} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='' />
            </div>
            <div className="login-popup-inputs">
                
                {
                    currentState==="Login"?
                    <></>:
                    <>
                    <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' />
                    {error.name?<div className="error">{error.name}</div>:""}
                    </>
                }
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' />
                {error.email?<div className="error">{error.email}</div>:""}
                <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Your password' />
                {error.password?<div className="error">{error.password}</div>:""}
            </div>
            {currentState==="Login"
             ?<></>
             :
             (<div className="login-popup-condition">
                <input type='checkbox' required />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>)
             }
            
            <button type='submit'>{currentState==="Login"?"Login":"Create an Account"}</button>
            {currentState==="Login"
             ?
             <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span> </p>
             :
             <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login Here</span> </p>
            }
        </form>
      
    </div>
  )
}

export default LoginPopup
