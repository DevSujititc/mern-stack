import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-list">
                <img src={assets.add_icon} alt="add icon" />
                <p>Add Item</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-list">
                <img src={assets.order_icon} alt="add icon" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-list">
                <img src={assets.order_icon} alt="add icon" />
                <p>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
