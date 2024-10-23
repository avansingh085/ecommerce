import { useEffect, useState,useRef } from 'react';
import Cart from './Cart.jsx';
import { useSelector } from "react-redux";
import axios from 'axios';
import { ColorRing } from "react-loader-spinner";
function CartPage()
{
   
    const [items,setItem]=useState([]);
     const [prices,setPrice]=useState(0);
     const [isFetch,setFetch]=useState(0);
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
        setFetch(1);
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
    
                 fetch('http://localhost:5500/createOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount:parseInt(prices), // amount in INR
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
                        fetch('http://localhost:5500/verifyPayment', {
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
                        .then(result => {})
                        .catch(error => console.error('Error:', error));
                    },
                    prefill: {
                        name: localStorage.getItem('username'),
                        email: 'test.user@example.com',
                        contact: '9305275866'
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
<div className={`w-screen grid bg-black-50 ${!isFetch ? "items-center" :"align-top px-14"} justify-center min-h-screen`}>
     
   {!isFetch ? <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          /> :(items.length>0 ? items.map((data,key)=>{ 
//    totalPrice+=((data.price)*(data.quantity));
    return(<Cart data={data}/>)
    }):<h1 className='text-gray-300 text-9xl font-serif '>NO ANY ITEMS</h1>)
}
</div>
 { items.length>0 ? <div className="h-16  w-screen flex items-center justify-evenly shadow-lg">
    <button 
        onClick={handlePayment}  // Ensure you have a function defined for handling payment
        className="h-14 w-40 bg-purple-600 text-white font-bold rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-purple-700">
        Payment Now
    </button>
    <div className="text-lg font-semibold text-gray-800">
        Total Price: {parseInt(prices)}
    </div>
</div>

 :""
}
</div>
    )
}
export default CartPage;