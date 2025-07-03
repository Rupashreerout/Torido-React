// Navbar.js
import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useCart } from "../CartContext"; 
import CartOffcanvas from "../pages/CartOffcanvas/CartOffcanvas";

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { getTotalCartItems } = useCart();
    const navigate = useNavigate(); // Fixed: Added navigate hook

    const totalCartItems = getTotalCartItems();

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    return (
        <>
            <div className="navbar">
                <img src={assets.logo} alt="Logo" className="logo" />
                <ul className="navbar-menu">
                    <li 
                        onClick={() => setMenu("home")} 
                        className={menu === "home" ? "active" : ""}
                    >
                        Home
                    </li>
                    <li 
                        onClick={() => setMenu("menu")} 
                        className={menu === "menu" ? "active" : ""}
                    >
                        Menu
                    </li>
                    <li 
                        onClick={() => setMenu("mobile")} 
                        className={menu === "mobile" ? "active" : ""}
                    >
                        Mobile
                    </li>
                    <li 
                        onClick={() => setMenu("contact-us")} 
                        className={menu === "contact-us" ? "active" : ""}
                    >
                        Contact us
                    </li>
                </ul>
                <div className="navbar-right">
                    <img src={assets.search_icon} alt="Search" />
                    <div className="navbar-search-icon">
                        <img 
                            src={assets.basket_icon} 
                            alt="Cart" 
                            onClick={handleCartClick}
                            style={{ cursor: 'pointer' }}
                        />
                        {totalCartItems > 0 && (
                            <div className="cart-count">{totalCartItems}</div>
                        )}
                    </div>
                    <button onClick={() => navigate('/login')}>Sign In</button>
                </div>
            </div>
           {isCartOpen && <CartOffcanvas isOpen={isCartOpen} onClose={handleCloseCart} />}

        </>
    );
};

export default Navbar;