import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styledComponents from 'styled-components'
import { addToBasket } from '../../../store/basket/basketSlice'
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg'
import Button from '../../UI/Button'
import Input from '../../UI/Input'

const MealItemForm = ({ id, title, price }) => {
   const [amount, setAmount] = useState(1)

   const dispatch = useDispatch()

   const amountChangeHandler = (e) => {
      setAmount(e.target.value)
   }

   const submitHandler = (e) => {
      e.preventDefault()

      const basketItem = {
         id,
         price,
         title,
         amount,
      }

      dispatch(addToBasket(basketItem))
   }

   return (
      <StyledForm>
         <Container>
            <StyledLabel htmlFor={id}>Amount</StyledLabel>
            <Input id={id} value={amount} onChange={amountChangeHandler} />
         </Container>
         <Button onClick={submitHandler}>
            <PlusIcon />
            Add
         </Button>
      </StyledForm>
   )
}

export default MealItemForm

const StyledForm = styledComponents.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Container = styledComponents.div`
  margin-bottom: 15px;
`

const StyledLabel = styledComponents.label`
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.6875rem;
  margin: 0 1.25rem 0 0;
`
