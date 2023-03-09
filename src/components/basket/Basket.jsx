import { useCallback } from 'react'
import { Box, Modal, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import styledComponent from 'styled-components'
import {
   deleteBasketItem,
   submitOrder,
   updateBasketItem,
} from '../../store/basket/basketSlice'
import { uiActions } from '../../store/ui/uiSlice'
import BasketItem from './BasketItem'
import TotalAmount from './TotalAmount'

const Basket = ({ onClose, open }) => {
   const dispatch = useDispatch()
   const items = useSelector((state) => state.basket.items)

   const getTotalPrice = useCallback(() => {
      return items.reduce((sum, { amount, price }) => sum + amount * price, 0)
   }, [])

   const decrementAmount = (id, amount) => {
      if (amount > 1) {
         // eslint-disable-next-line object-shorthand
         dispatch(updateBasketItem({ amount: amount - 1, id: id }))
      } else {
         dispatch(deleteBasketItem(id))
      }
   }

   const incrementAmount = (id, amount) => {
      // eslint-disable-next-line object-shorthand
      dispatch(updateBasketItem({ amount: amount + 1, id: id }))
   }

   const orderSubmitHandler = async () => {
      try {
         await dispatch(
            submitOrder({
               orderData: { items },
            })
         ).unwrap()
         dispatch(
            uiActions.showSnackBar({
               isOpen: true,
               severity: 'success',
               message: 'Order completed successfully!',
            })
         )
      } catch (error) {
         dispatch(
            uiActions.showSnackBar({
               isOpen: true,
               severity: 'error',
               message: 'Failed, Try again later!',
            })
         )
      } finally {
         onClose()
      }
   }

   return (
      <>
         <Modal onClose={onClose} open={open}>
            <ModalStyle>
               <Content>
                  {items.length ? (
                     <FixedHeightContainer>
                        {items.map((item) => (
                           <BasketItem
                              // eslint-disable-next-line no-underscore-dangle
                              key={item._id}
                              title={item.title}
                              price={item.price}
                              amount={item.amount}
                              incrementAmount={() =>
                                 // eslint-disable-next-line no-underscore-dangle
                                 incrementAmount(item._id, item.amount)
                              }
                              decrementAmount={() =>
                                 // eslint-disable-next-line no-underscore-dangle
                                 decrementAmount(item._id, item.amount)
                              }
                           />
                        ))}
                     </FixedHeightContainer>
                  ) : null}
                  <TotalAmount
                     price={getTotalPrice()}
                     onCLose={onClose}
                     onOrder={orderSubmitHandler}
                  />
               </Content>
            </ModalStyle>
         </Modal>
      </>
   )
}

export default Basket

const Content = styledComponent.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem 1.5rem 1rem;
`
const FixedHeightContainer = styledComponent.div`
  max-height: 228px;
  overflow-y: scroll;
`
const ModalStyle = styled(Box)(({ theme }) => ({
   position: 'fixed',
   top: '20vh',
   backgroundColor: theme.palette.primary.main,
   padding: '1rem',
   borderRadius: '14px',
   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
   zIndex: '30',
   animation: '300ms ease-out forwards',
   width: '40rem',
   left: 'calc(50% - 20rem)',

   '@keyframes slide-down': {
      from: {
         opacity: '0',
         transform: 'translateY(-3rem)',
      },
      to: {
         opacity: '1',
         transform: 'translateY(0)',
      },
   },
}))
