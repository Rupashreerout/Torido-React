import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
const Navbar = () => {
  const [menu,setMenu]=useState("home");
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</li>
        <li onClick={()=>setMenu("menu")}className={menu==="menu"?"active":""}>Menu</li>
        <li onClick={()=>setMenu("mobile")}className={menu==="mobile"?"active":""}>Mobile</li>
        <li onClick={()=>setMenu("contact-us")}className={menu==="contact-us"?"active":""}>Contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
        </div>
          <button onClick={() => navigate('/login')}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
