import React, { useContext, useId } from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {food_list, cartItem, removeCardItem, getTotalCartAmount} = useContext(StoreContext)
  const getTotalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  return (
    <div className='cart'>

      <div className='cart-item'>
        <h2>Tomato Cart</h2>
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index)=>{
            if(cartItem[item._id]>0){
              return (
                <div key={index}>
                  <div className="cart-item-title cart-items-item">
                    <img src={item.imageUrls[0]} alt='' />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>${item.price*cartItem[item._id]}</p>
                    <p onClick={()=>removeCardItem(item._id)} className='delete'>X</p>
                  </div>
                    <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h3>Cart Totals</h3>
          <div className="cart-total-items">
            <div className="cart-total-items-item">
              <p>Subtotal</p>
              <p>
                
                ${getTotalAmount===0?0:getTotalAmount}
                </p>
            </div>
            <hr />
            <div className="cart-total-items-item">
              <p>Delivery Fee</p>
              <p>${getTotalAmount===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-items-item">
              <b>Grand Total</b>
              <b>${getTotalAmount===0?0:getTotalAmount+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="promo-code">
          <p>If you have a promo code, Enter it here</p>
          <div className="promo-code-item">
            <input type='text' className='' placeholder='Enter your promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
