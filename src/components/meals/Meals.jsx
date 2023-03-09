import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styledComponents from 'styled-components'
import { styled } from '@mui/material'
import { getMeals } from '../../store/meals/mealsSlice'
import MealItem from './meal-item/MealItem'

const Meals = () => {
   const { meals = [], isLoading, error } = useSelector((state) => state.meals)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getMeals())
   }, [dispatch])

   return (
      <Card>
         {isLoading && !error && <p>Loading</p>}
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <StyledUl>
            {meals.map((item) => (
               // eslint-disable-next-line no-underscore-dangle
               <MealItem key={item._id} item={item} />
            ))}
         </StyledUl>
      </Card>
   )
}

export default memo(Meals)

const Card = styled('div')(({ theme }) => ({
   background: theme.palette.primary.main,
   borderRadius: '1rem',
   width: '64.9375rem',
   margin: '160px auto',
}))

const StyledUl = styledComponents.ul`
  list-style: none;
  padding: 20px 40px;
`
