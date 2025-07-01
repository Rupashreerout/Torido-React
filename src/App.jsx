import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home/home';
import Cart from './components/pages/Cart/Cart';
import PlaceOrder from './components/pages/PlaceOrder/PlaceOrder';
import Login from './components/pages/Login/Login';

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login']; // List of paths where navbar should be hidden

  return (
    <div className='app'>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
