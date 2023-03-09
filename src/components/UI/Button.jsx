import React from 'react'
import { styled } from '@mui/material'
import Button from '@mui/material/Button'

const Buttons = ({
   children,
   variant = 'contained',
   borderStyle = 'rounded',
   ...props
}) => {
   return (
      <StyledButton {...props} borderStyle={borderStyle} variant={variant}>
         {children}
      </StyledButton>
   )
}

export default Buttons

const getBackgroundColor = (variant) => {
   return variant === 'contained' ? '#fff' : '#8a2b06'
}

const getBorder = (variant) => {
   return variant === 'contained' ? 'none' : '1px solid #8a2b06'
}

const getBorderRadius = (borderStyle) => {
   return borderStyle === 'rounded' ? '20px' : ' 6px'
}

const getPadding = (borderStyle) => {
   return borderStyle === 'rounded' ? '10px 32px' : '8px 14px'
}

const StyledButton = styled(Button, {
   shouldForwardProp: (propName) => propName !== 'borderStyle',
})((variant, borderStyle) => ({
   '&': {
      display: 'flex',
      alignItems: 'center',
      gap: '0.3125rem',
      background: getBackgroundColor(variant),
      borderRadius: getBorderRadius(borderStyle),
      padding: getPadding(borderStyle),
      fontWeight: '600',
      lineHeight: '1.5rem',
      border: getBorder(variant),
      cursor: 'pointer',
      color: '#fff',

      '&:hover': {
         background: '#7e2a0a',
         color: '#fff',
         path: {
            stroke: '#fff',
         },
      },
      '&:active': {
         background: '#993108',
      },
   },
   '&.bump': {
      animation: 'bump 300ms ease-out',
   },

   '@keyframes bump': {
      '0%': {
         transform: 'scale(1)',
      },
      '10%': {
         transform: ' scale(0.9)',
      },
      '30%': {
         transform: 'scale(1.1)',
      },
      '50%': {
         transform: 'scale(1.15)',
      },
      '100%': {
         transform: 'scale(1)',
      },
   },

   '&:hover': {
      backgroundColor: '#2c0d00',
   },

   '&:hover > #counter': {
      background: '#662207',
   },
}))
