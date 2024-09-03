import React from 'react'

import './food-menu.css'

import { menu_list } from '../../assets/assets'
const FoodMenu = ({category, setCategory}) => {
  return (
    <div className='food-menu' id='food-menu'>
        <h2>Explore Our Menu</h2>
        <p className='food-menu-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque varius justo ac commodo. Suspendisse porta orci velit, eu sollicitudin turpis efficitur eu. Maecenas ultrices dui sed ante tincidunt, et blandit elit laoreet. Vestibulum non mi est. Fusce ultricies augue</p>
        <div className="food-menu-list">
            {menu_list.map((item, index)=>{
                return(
                    <div onClick={()=>setCategory((prev)=>prev===item.menu_name?'All':item.menu_name)} key={index} className="food-menu-list-item">
                        <img className={category===item.menu_name?'active':''} src={item.menu_image} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default FoodMenu
