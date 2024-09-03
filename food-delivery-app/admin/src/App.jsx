import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Outlet} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="sidebar-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
