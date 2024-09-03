import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{

    const [token, setToken] = useState("");

    const saveToken = (newToken)=>{
        setToken(newToken);
        localStorage.setItem('token', newToken);
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            saveToken(localStorage.getItem("token"));
        }
    },[])

    return (
        <AuthContext.Provider value={{token, saveToken}}>
            {children}
        </AuthContext.Provider>
    )
}
