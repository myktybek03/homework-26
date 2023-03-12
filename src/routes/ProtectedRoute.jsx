import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({
   component: Component, // UserLayout
   fullBackPath, // "/admin/meals"
   isAllowed, // ["USER", "GUEST"]
}) => {
   if (!isAllowed) {
      return <Navigate to={fullBackPath} />
   }
   return <Component />
}
