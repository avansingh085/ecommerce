import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from "./confiSlice.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    
     <BrowserRouter>
   <App/>
   </BrowserRouter>
   </Provider>
  </StrictMode>,
)
