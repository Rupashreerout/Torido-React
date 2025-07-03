import React from 'react';
import './CartOffcanvas.css';
import { assets, food_list } from '../../../assets/assets';
import { useCart } from '../../CartContext';

const CartOffcanvas = ({ isOpen, onClose }) => {
    const { cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems } = useCart();

    // Get cart items with details
    const getCartItemsWithDetails = () => {
        const items = [];
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find(product => product._id === itemId);
                if (itemInfo) {
                    items.push({
                        ...itemInfo,
                        quantity: cartItems[itemId]
                    });
                }
            }
        }
        return items;
    };

    const cartItemsWithDetails = getCartItemsWithDetails();
    
    // Calculate total amount from cartItems and food_list
    const calculateTotalAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find(product => product._id === itemId);
                if (itemInfo) {
                    total += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return total;
    };

    const totalAmount = calculateTotalAmount();

    // Razorpay Payment Integration
    const handlePayment = async () => {
        if (totalAmount === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            const options = {
                key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key
                amount: totalAmount * 100, // Amount in paise
                currency: 'USD',
                name: 'Food Delivery',
                description: 'Order Payment',
                image: assets.logo, // Your logo
                handler: function (response) {
                    // Payment successful
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    // Clear cart after successful payment
                    // You can implement clearCart function in your context
                    onClose();
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999'
                },
                notes: {
                    address: 'Customer Address'
                },
                theme: {
                    color: '#ff6347'
                },
                modal: {
                    ondismiss: function() {
                        console.log('Payment cancelled');
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        };

        script.onerror = () => {
            alert('Failed to load Razorpay. Please try again.');
        };
    };

    // Debug: Log the state to console
    console.log('Cart isOpen:', isOpen);
    console.log('Cart Items:', cartItems);
    console.log('Cart Items with Details:', cartItemsWithDetails);
    console.log('Total Amount:', totalAmount);

    return (
        <>
            {/* Backdrop */}
            <div className={`cart-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            
            {/* Offcanvas */}
            <div className={`cart-offcanvas ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>My Cart ({getTotalCartItems()})</h2>
                    <img 
                        src={assets.cross_icon} 
                        alt="Close" 
                        className="close-btn"
                        onClick={onClose}
                    />
                </div>

                <div className="cart-content">
                    {cartItemsWithDetails.length === 0 ? (
                        <div className="empty-cart">
                            <img src={assets.basket_icon} alt="Empty cart" />
                            <p>Your cart is empty</p>
                            <button onClick={onClose} className="continue-shopping">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItemsWithDetails.map((item) => (
                                    <div key={item._id} className="cart-item">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p className="item-description">{item.description}</p>
                                            <div className="item-price-quantity">
                                                <span className="price">${item.price}</span>
                                                <div className="quantity-controls">
                                                    <img 
                                                        src={assets.remove_icon_red} 
                                                        alt="Remove"
                                                        onClick={() => removeFromCart(item._id)}
                                                        className="quantity-btn"
                                                    />
                                                    <span className="quantity">{item.quantity}</span>
                                                    <img 
                                                        src={assets.add_icon_green} 
                                                        alt="Add"
                                                        onClick={() => addToCart(item._id)}
                                                        className="quantity-btn"
                                                    />
                                                </div>
                                            </div>
                                            <div className="item-total">
                                                Total: ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Delivery Fee:</span>
                                    <span>${totalAmount === 0 ? 0 : 2}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total:</span>
                                    <span>${totalAmount === 0 ? 0 : (totalAmount + 2).toFixed(2)}</span>
                                </div>
                                <div className="p-3">
                  <h5 className="fw-bold mb-2">Cancellation Policy</h5>
                  <p className="text-muted small mb-0">
                    Orders cannot be cancelled once packed for delivery. In case of unexpected delays,
                    a refund will be provided, if applicable.
                  </p>
                </div>
             
                                <button 
                                    className="checkout-btn"
                                    onClick={handlePayment}
                                    disabled={totalAmount === 0}
                                >
                                    <img src={assets.bag_icon} alt="Checkout" />
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartOffcanvas;