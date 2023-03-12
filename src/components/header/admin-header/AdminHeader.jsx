import React from 'react'
import {
   AppBar,
   Button,
   Grid,
   IconButton,
   styled,
   Toolbar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import styledComponents from 'styled-components'
import { useDispatch } from 'react-redux'
import { signOut } from '../../../store/auth/auth.thunk'

const menus = [
   {
      path: 'meals',
      title: 'Meals',
   },
   {
      path: 'orders',
      title: 'Orders',
   },
]

const AdminHeader = () => {
   const dispatch = useDispatch()

   const signOutHandler = () => {
      dispatch(signOut())
   }
   return (
      <AppBar position="static">
         <Toolbar>
            <GridStyle>
               <Grid>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     sx={{ mr: 2 }}
                  >
                     <MenuIcon />
                  </IconButton>
                  {menus.map((item) => (
                     <NavlinkStyle key={item.path} to={item.path}>
                        {item.title}
                     </NavlinkStyle>
                  ))}
               </Grid>
               <Button color="inherit" onClick={signOutHandler}>
                  Sign Out
               </Button>
            </GridStyle>
         </Toolbar>
      </AppBar>
   )
}

export default AdminHeader

const NavlinkStyle = styledComponents(NavLink)`
   margin-right: 20px;
`

const GridStyle = styled(Grid)`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
`
