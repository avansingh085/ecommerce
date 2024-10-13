import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Ratings from "./Ratings";
import axios from "axios";
import { useEffect, useState ,useRef} from "react";
import Review from "./Review";
import { current } from "@reduxjs/toolkit";
import sendData from './sendData';
function ProductExplor()
{
 
      const comment=useRef("");
      console.log(comment);
     
     const {currClick}=useSelector((state)=>state.currClick);
     console.log(currClick)
   
      let product=currClick;
     function addCart(){
      sendData('addCart',{
        username: localStorage.getItem('username'),
        product:product.id,
        quantity: 1,
      })
      
    }
   function addComment(){
         sendData('addComment',{username:localStorage.getItem('username'),
           product:product.id,
           comment:comment.current.value
         })
   }
    return(
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-4/5 md:w-2/3 lg:w-1/2 space-y-4">
        <img src={currClick.image} className="h-48 w-48 rounded-full object-cover" alt="Product" />
        
        <p className="text-2xl font-semibold text-gray-800">{currClick.title}</p>
        
        <div className="text-pink-500 text-3xl font-bold">{currClick.price} Rs</div>
        
        <div className="flex items-center justify-center">
          <Ratings data={{ rate: currClick.rating.rate, count: currClick.rating.count }} />
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="bg-rose-500 hover:bg-orange-400 text-white font-medium rounded-md w-40 h-14 transition-transform transform hover:scale-95 shadow-lg"
            onClick={addCart}>
            Add to Cart
          </button>
          <button 
            className="bg-green-500 hover:bg-pink-500 text-white font-medium rounded-md w-40 h-14 transition-transform transform hover:scale-95 shadow-lg"
            onClick={() => { /* Buy Now action */ }}>
            Buy Now
          </button>
        </div>
        
        <p className="text-gray-600 text-center px-4">{currClick.description}</p>
      </div>
    
      <div className="mt-8 bg-white shadow-lg rounded-lg p-4 w-4/5 md:w-2/3 lg:w-1/2 flex flex-col items-center space-y-4">
        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Download.png" className="h-20 w-20 rounded-full object-cover" alt="User Profile" />
        
        <textarea 
          className="border border-gray-300 rounded-md w-full h-24 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your comment..."
          ref={comment}>
        </textarea>
        
        <button 
          className="bg-blue-700 hover:bg-blue-600 text-white font-medium rounded-md w-24 h-10 transition-transform transform hover:scale-95 shadow-md"
          onClick={addComment}>
          Submit
        </button>
      </div>
    </div>
    
    )
}
export default ProductExplor;