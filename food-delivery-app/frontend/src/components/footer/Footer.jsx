import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" className="footer-logo" />
                <p>Praesent ac enim suscipit, volutpat orci ac, venenatis orci. Mauris eget scelerisque ante.</p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>

            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                   <li className="">Home</li>
                   <li className="">About Us</li>
                   <li className="">Delivery</li> 
                   <li className="">Contact Us</li> 
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-256-895-8960</li>
                    <li>contact@abcopany.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <div className="footer-copyright">
            Copyright 2024 @ ABCompany - All Right Reserved.
        </div>
    </div>
  )
}

export default Footer
