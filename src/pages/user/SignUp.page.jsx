import { useState } from 'react'
import { Button, Grid, styled, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/auth/auth.thunk'
import { UserRoles } from '../../lib/constants/common'

const SignUp = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const emailChangeHandler = (e) => {
      setEmail(e.target.value)
   }

   const passworChangeHandler = (e) => {
      setPassword(e.target.value)
   }
   const nameChangeHandler = (e) => {
      setName(e.target.value)
   }
   const confirmPasswordChangeHandler = (e) => {
      setConfirmPassword(e.target.value)
   }

   const submitHandler = (event) => {
      event.preventDefault()
      const data = {
         email,
         name,
         password,
         role: UserRoles.ADMIN,
      }
      dispatch(signUp(data))
         .unwrap()
         .then(() => navigate('/'))
   }

   return (
      <MainGridStyle>
         <GridStyle>
            <form onSubmit={submitHandler}>
               <FormGrid>
                  <TextField
                     value={name}
                     onChange={nameChangeHandler}
                     label="Name"
                  />
                  <TextField
                     value={email}
                     onChange={emailChangeHandler}
                     label="Email"
                  />
                  <TextField
                     value={password}
                     onChange={passworChangeHandler}
                     label="Password"
                  />
                  <TextField
                     value={confirmPassword}
                     onChange={confirmPasswordChangeHandler}
                     label="ConfirmPassword"
                  />
                  <Button variant="contained" type="submit">
                     Sign Up
                  </Button>
                  <Link to="/signin">Have an account?</Link>
               </FormGrid>
            </form>
         </GridStyle>
      </MainGridStyle>
   )
}

export default SignUp

const GridStyle = styled(Grid)(({ theme }) => ({
   background: theme.palette.primary.main,
   width: '500px',
   padding: '20px',
}))

const MainGridStyle = styled(Grid)`
   display: flex;
   justify-content: center;
   margin-top: 20px;
`

const FormGrid = styled(Grid)`
   display: flex;
   flex-direction: column;
   gap: 15px;
`
