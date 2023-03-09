import { useState } from 'react'
import { Button, Grid, styled, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signIn } from '../store/auth/auth.thunk'

const SignIn = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')

   const emailChangeHandler = (e) => {
      setEmail(e.target.value)
      setError('')
   }

   const passworChangeHandler = (e) => {
      setPassword(e.target.value)
      setError('')
   }

   const submitHandler = (event) => {
      event.preventDefault()

      const data = {
         email,
         password,
      }
      dispatch(signIn(data))
         .unwrap()
         .then(() => navigate('/'))
         .catch((e) => {
            setError(e.response.data.message)
         })
   }

   const isEmailValid = () => {
      return email.length === 0 || (email.length > 0 && email.includes('@'))
   }

   const isPasswordValid = () => {
      return (
         password.length === 0 || (password.length > 0 && password.length >= 6)
      )
   }

   return (
      <MainGridStyle>
         <GridStyle>
            <form onSubmit={submitHandler}>
               <FormGrid>
                  <TextFieldStyle
                     error={!isEmailValid()}
                     value={email}
                     onChange={emailChangeHandler}
                     label="Email"
                  />
                  <TextFieldStyle
                     error={!isPasswordValid()}
                     value={password}
                     onChange={passworChangeHandler}
                     label="Password"
                  />
                  {error && <TypographyStyle>{error}</TypographyStyle>}
                  <Button type="submit" variant="contsined">
                     Sign In
                  </Button>
                  <Link to="/signup">{`Don't have account?`}</Link>
               </FormGrid>
            </form>
         </GridStyle>
      </MainGridStyle>
   )
}

export default SignIn

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
`
const TypographyStyle = styled(Typography)(({ theme }) => ({
   textAlign: 'center',
   color: theme.palette.error.main,
}))

const TextFieldStyle = styled(TextField)`
   margin-bottom: 15px;
`
