import React from 'react'
import './app-download.css'
import { assets } from '../../assets/assets'

export default function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br /> Tomato App</p>
        <div className="app-download-platform">
            <img src={assets.app_store} alt='' />
            <img src={assets.play_store} alt='' />
        </div>
    </div>
  )
}
