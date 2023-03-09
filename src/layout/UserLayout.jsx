import React, { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Basket from '../components/basket/Basket'
import Header from '../components/header/Header'

const MealsPage = () => {
   const [isBasketVisible, setIsBasketVisible] = useState(false)

   const showBasketHandler = useCallback(() => {
      setIsBasketVisible((prevState) => !prevState)
   })
   return (
      <>
         <Header onClick={showBasketHandler} />
         <Basket onClose={showBasketHandler} open={isBasketVisible} />
         <Content>
            {isBasketVisible && <Basket onClose={showBasketHandler} />}
            <Outlet />
         </Content>
      </>
   )
}

export default MealsPage

const Content = styled.div`
   margin-top: 101px;
`
