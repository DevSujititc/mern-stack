import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext'
import Footer from './components/footer/Footer'
import LoginPopup from './components/loginPopup/LoginPopup'
import { AuthProvider } from './context/AuthProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <StoreContextProvider>
          {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
          <div className='app'>
            <Navbar setShowLogin={setShowLogin} />
            <Outlet />
          </div>
            <Footer />
            
        </StoreContextProvider>
      </AuthProvider>
    </>
    
  )
}

export default App
