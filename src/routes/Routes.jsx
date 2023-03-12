import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import UserLayout from '../layout/UserLayout'
import { UserRoles } from '../lib/constants/common'
import { Meals as AdminMeals } from '../pages/admin/Meals.page'
import { Orders } from '../pages/admin/Orders.page'
import NotFound from '../pages/NotFound'
import MealsPage from '../pages/user/Meals.page'
import SignIn from '../pages/user/SignIn.page'
import SignUp from '../pages/user/SignUp.page'
import { ProtectedRoute } from './ProtectedRoute'

const Routess = () => {
   const role = useSelector((state) => state.auth.user.role)

   const isAllowed = (roles) => {
      return roles.includes(role)
   }

   return (
      <Routes>
         <Route
            path="/"
            element={
               <ProtectedRoute
                  isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                  fallBackPath="/admin/meals"
                  component={UserLayout}
               />
            }
         >
            <Route
               index
               element={
                  <ProtectedRoute
                     isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                     fallBackPath="/admin/meals"
                     component={MealsPage}
                  />
               }
            />
            <Route
               path="my-order"
               element={
                  <ProtectedRoute
                     isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                     fallBackPath="/admin/meals"
                     component={Orders}
                  />
               }
            />
            <Route
               path="signup"
               element={
                  <ProtectedRoute
                     isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                     fallBackPath={
                        role === UserRoles.ADMIN ? '/admin/meals' : '/'
                     }
                     component={SignUp}
                  />
               }
            />
            <Route
               path="signin"
               element={
                  <ProtectedRoute
                     isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                     fallBackPath={
                        role === UserRoles.ADMIN ? '/admin/meals' : '/'
                     }
                     component={SignIn}
                  />
               }
            />
         </Route>
         <Route
            path="/admin"
            element={
               <ProtectedRoute
                  isAllowed={isAllowed([UserRoles.ADMIN])}
                  fallBackPath="/"
                  component={AdminLayout}
               />
            }
         >
            <Route
               path="meals"
               element={
                  <ProtectedRoute
                     isAllowed={isAllowed([UserRoles.ADMIN])}
                     fallBackPath="/"
                     component={AdminMeals}
                  />
               }
            />
            <Route
               path="orders"
               element={
                  <ProtectedRoute
                     isAllowed={isAllowed([UserRoles.ADMIN])}
                     fallBackPath="/"
                     component={Orders}
                  />
               }
            />
         </Route>
         <Route path="*" element={<NotFound />} />
      </Routes>
   )
}

export default Routess
