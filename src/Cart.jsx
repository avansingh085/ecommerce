
import React, { useState,useEffect ,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, selectItem,updatePrice } from './globalSlice.jsx';
import axios from 'axios';
function Cart(props){
   
    const [count,setCount]=useState(props.data.quantity);
    
    const handleRemoveItem =async (e) => {
               try{
                        const res=await axios.get(`https://ecommerce-backend1-1.onrender.com/removeCart?productId=${props.data._id}&username=${localStorage.getItem('username')}`);
                        if(res.success)
                        {
                          
                        }
                        else{

                        }
                        
               }
               catch(err)
               {
                 console.log("cart not remove somthing error ");
               }
      };
      async function update(){
        try{
        let url=`https://ecommerce-backend1-1.onrender.com/updateItemQuantity`;
        const res=fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               productId:props.data._id,
               username:localStorage.getItem('username'),
               quantity:count,
            }),
        });
       let res1=await res.json();
          if(res1.success)
          {
              
          }
          else{

          }
        }catch(err){
            console.log(err);
        }
          
      }
      useEffect(()=>{
        try{
          
           update();
    
   }
   catch(err)
   {
     console.log("cart not remove somthing error ");
   }
      },[count])
     
    return(<>{count ? (
        <div className="w-full max-h-60 max-w-4xl mx-auto bg-white shadow-2xl my-6 flex items-center justify-between p-5 rounded-xl border border-blue-200 transition duration-300  transform ">
        <div className="flex items-center space-x-4">
            <img 
                src={props.data.image} 
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-xl shadow-lg object-cover border border-gray-200"
                alt={props.data.title} 
            />
            <div>
                <div className="text-sm md:text-base lg:text-xl font-bold text-blue-900">{props.data.title}</div>
                <div className="text-sm text-gray-500">Category: {props.data.category || 'Unknown'}</div>
                <div className="text-sm text-gray-500">Availability: {props.data.stock ? `${props.data.stock} items` : 'Out of stock'}</div>
                <div className="text-lg font-semibold text-green-700">{props.data.price} Rs per unit</div>
            </div>
        </div>
    
        <div className="flex items-center space-x-4 ">
            <input 
                type="number" 
               
                value={count}
                onChange={(e)=>{setCount(Math.max(1,e.target.value))}}
                className="w-12 h-8 border rounded-lg text-center text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                min="1"
            />

            <div className="text-xl font-bold text-gray-800" >{props.data.price } Rs</div>
            <button 
                onClick={handleRemoveItem} 
                className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition duration-200"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    </div>
    
    ) : null}
    </>);
}
export default Cart;