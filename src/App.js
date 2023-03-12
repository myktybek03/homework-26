import { useMemo } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import Snackbar from './components/UI/Snackbar'
import { uiActions } from './store/ui/uiSlice'
import { darkTheme, lightTheme } from './lib/constants/theme'
import { store } from './store'
import './App.css'
import Routess from './routes/Routes'

function AppContent() {
   const snackbar = useSelector((state) => state.ui.snackbar)
   const themeMode = useSelector((state) => state.ui.themeMode)

   const dispatch = useDispatch()

   const theme = useMemo(() => {
      const currentTheme =
         themeMode === 'light' ? { ...lightTheme } : { ...darkTheme }

      return createTheme(currentTheme)
   }, [themeMode])

   return (
      <>
         <ThemeProvider theme={theme}>
            <Snackbar
               isOpen={snackbar.isOpen}
               severity={snackbar.severity}
               message={snackbar.message}
               onClose={() => dispatch(uiActions.closeSnackbar())}
            />
            <Routess />
         </ThemeProvider>
      </>
   )
}

const App = () => (
   <Provider store={store}>
      <BrowserRouter>
         <AppContent />
      </BrowserRouter>
   </Provider>
)

export default App
