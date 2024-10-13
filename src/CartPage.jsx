import { useEffect, useState,useRef } from 'react';
import Cart from './Cart.jsx';
import { useSelector } from "react-redux";
import axios from 'axios';

function CartPage()
{
   
    const [items,setItem]=useState([]);
     const [prices,setPrice]=useState(0);
 let curr={};
    async function loadCartItem(){
        let data=await fetch(`https://ecommerce-backend1-1.onrender.com/sendCart?username=${localStorage.getItem('username')}`);
        let res=await data.json();
         curr=res.items;
        
        // setPrice(curr.totalPrice)
        //setCart(curr);
        Promise.all(curr.map(url => fetch(`https://ecommerce-backend1-1.onrender.com/sendData?productId=${url.productId}`)))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
        let r=[];
        let p=0;
         for(let i=0;i<data.length;i++)
         {
            p=p+(data[i].price)*(curr[i].quantity);
            r.push({...data[i],quantity:curr[i].quantity});
            
         }
         setPrice(p);
        setItem(r);
    })
    .catch(error => {
        console.error('One of the requests failed:', error);
    });
   
    
   return 0;
    }
   
  
    useEffect(()=>{
      loadCartItem();
       
       //console.log(items)
    },[])
   
    const {price}=useSelector((state)=>state.price);
    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };
     loadScript('https://checkout.razorpay.com/v1/checkout.js').then((res)=>{console.log("yes")});
    
       function handlePayment() {
    
                 fetch('https://ecommerce-backend1-1.onrender.com/createOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount:price, // amount in INR
                        currency: 'INR',
                        receipt: 'receipt_1',
                    }),
                }).then((responce)=>responce.json()).then((order)=>{
                
                let key_id="rzp_test_099LgMWWQ1DioF";
                const options = {
                    key: key_id, // Replace with your Razorpay key ID
                    amount: order.amount,
                    currency: order.currency,
                    name: 'Merchant Name',
                    description: 'Test Transaction',
                    order_id: order.id,
                    handler: function (response) {
                        fetch('https://ecommerce-backend1-1.onrender.com/verifyPayment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                order_id: order.id,
                                payment_id: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                            }),
                        })
                        .then(res => res.text())
                        .then(result => alert(result))
                        .catch(error => console.error('Error:', error));
                    },
                    prefill: {
                        name: 'Test User',
                        email: 'test.user@example.com',
                        contact: '9999999999'
                    },
                    theme: {
                        color: '#F37254'
                    }
                };
                const rzp1 =new window.Razorpay(options);
                rzp1.open();
            });
        };
       
       
    return(
        <div>
<div className='w-screen grid bg-black-50 align-top px-14 justify-center min-h-screen'>
     
   {items.length>0 ? items.map((data,key)=>{ 
//    totalPrice+=((data.price)*(data.quantity));
    return(<Cart data={data}/>)
    }):<h1 className='text-gray-300 text-9xl font-serif '>NO ANY ITEMS</h1>
}
</div>
 { items.length>0 ? <div className="h-16 bg-gradient-to-r from-lime-400 to-lime-500 w-screen flex items-center justify-evenly shadow-lg">
    <button 
        onClick={handlePayment}  // Ensure you have a function defined for handling payment
        className="h-14 w-40 bg-purple-600 text-white font-bold rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-purple-700">
        Payment Now
    </button>
    <div className="text-lg font-semibold text-gray-800">
        Total Price: {prices}
    </div>
</div>

 :""
}
</div>
    )
}
export default CartPage;