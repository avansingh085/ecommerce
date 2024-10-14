import Products from './Products.jsx';
import CustomerService from './CustomerService.jsx';
import CartPage from './CartPage.jsx';
import { Route,Routes } from "react-router-dom";
import Footer from "./Footer.jsx";
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Login from './Login.jsx';
import ProductExplor from './ProductExplor.jsx';
import { useSelector } from 'react-redux';
import Account from './Account.jsx'
useSelector
function Ecommerce(){
     // localStorage.setItem('token',"abc");
     
return(
<div className="bg-white min-h-screen overflow-x-hidden " >

      <Header/>
<div className="mt-20">
<Routes>
      <Route path='/CustomerService' element={<CustomerService/>}/>
      <Route path='/' element={<Products  />}/>
      <Route path='/Products' element={<Products />}/>
      <Route path='/CartPage' element={<CartPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/MyAccount' element={<Account/>}/>
      <Route path='/Product/Explor' element={<ProductExplor/>}/>
</Routes>
</div>
<Footer/>
</div>
);
}
export default Ecommerce;