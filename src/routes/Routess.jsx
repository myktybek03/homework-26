import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import MealsPage from '../pages/Meals'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Routess = () => {
   return (
      <Routes>
         <Route path="/" element={<UserLayout />}>
            <Route index element={<MealsPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
         </Route>
      </Routes>
   )
}

export default Routess
