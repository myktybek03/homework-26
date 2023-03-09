import { styled, TextField } from '@mui/material'
import React from 'react'

const Input = () => {
   return (
      <div>
         <StyledTextField
            type="number"
            InputLabelProps={{
               shrink: true,
            }}
            size="small"
         />
      </div>
   )
}

export default Input

const StyledTextField = styled(TextField)(() => ({
   '&': {
      width: '70px',
   },
   '& .MuiOutlinedInput-input': {
      padding: '5px 10px',
      fontSize: '14px',
   },
}))
