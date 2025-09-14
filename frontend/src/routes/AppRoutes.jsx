import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import Profile from '../pages/foodpartner/Profile';
import BottomNav from '../components/BottomNav';
import ChooseRegister from '../pages/auth/ChooseRegister';
import CreateFood from '../pages/foodpartner/CreateFood';
import Logout from '../pages/general/logout';

function AppRoutes() {
  
  return (
    <Router>
      <Routes>
        <Route path="/register" element={ <ChooseRegister />} />
        <Route path="/user/register" element={ <UserRegister />} />
        <Route path="/user/login" element={ <UserLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/saved" element={<><Saved /> <BottomNav /> </>} />
        <Route path="/foodpartner/:id" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes;