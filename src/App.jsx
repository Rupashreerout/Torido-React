import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home/home';
import Cart from './components/pages/Cart/Cart';
import PlaceOrder from './components/pages/PlaceOrder/PlaceOrder';
import Login from './components/pages/Login/login';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/Torido-React/login'];

  return (
    <StoreContextProvider>
      <div className='app'>
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/Torido-React/login' element={<Login />} />

          {/* Protected Routes */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/cart'
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path='/order'
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />

          {/* Torido-React Protected Routes */}
          <Route
            path='/Torido-React'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/Torido-React/home' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/Torido-React/cart'element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path='/Torido-React/order'
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </StoreContextProvider>
  );
};

export default App;
