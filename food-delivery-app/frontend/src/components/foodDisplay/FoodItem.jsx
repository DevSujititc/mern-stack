import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({foodElement}) => {
  
  const {cartItem, addToCart, removeCardItem} = useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={foodElement.imageUrls[0]} alt={foodElement._id} className="food-item-image" />
            {!cartItem[foodElement._id]?
              <img onClick={()=>addToCart(foodElement._id)} className='add' src={assets.add_icon_white} alt=''/>
              :
              <div className='food-item-counter'>
                <img onClick={()=>removeCardItem(foodElement._id)} src={assets.remove_icon_red} alt='' />
                <p>{cartItem[foodElement._id]}</p>
                <img onClick={()=>addToCart(foodElement._id)} src={assets.add_icon_green} alt='' />

              </div>


            }
        </div>  
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{foodElement.name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-description">{foodElement.description}</p>
          <p className="food-item-price">${foodElement.price}</p>
        </div>
    </div>
  )
}

export default FoodItem
