 
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Ecommerce from './Ecommerce.jsx'
import Check from './check.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
   
  return (
    <>
         <ToastContainer
position="bottom-right"
/>
       <Ecommerce/>
       
    </>
  )
}

export default App
