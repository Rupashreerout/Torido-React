// Fooditem.js
import React from 'react';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { useCart } from '../CartContext'; // Import useCart hook

const Fooditem = ({ id, name, price, description, image }) => {
    const { addToCart, removeFromCart, getItemCount } = useCart(); // Get cart functions
    const itemCount = getItemCount(id); // Get current count for this item

    const handleAddToCart = () => {
        addToCart(id);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(id);
    };

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={image} alt="" />
                {
                    !itemCount ?
                    <img onClick={handleAddToCart} src={assets.add_icon_white} alt='' />
                    :
                    <div className='food-item-counter'>
                        <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt=''/>
                        <p>{itemCount}</p>
                        <img onClick={handleAddToCart} src={assets.add_icon_green} alt=''/>
                    </div>
                }
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='' />
                </div>
                <p className='food-item-desc'>
                    {description}
                </p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    );
}

export default Fooditem;