import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
//Redis LC2pbq5JVbO26fSdS7vTiLekO0TyBHxI
import { addItem, removeItem, selectItem,updatePrice,setCurrentClick } from './globalSlice.jsx';
import Rating from './Rating.jsx';
function Card(props){
    const dispatch=useDispatch();
    const navigate=useNavigate();
  async  function handleAddItem()
    {
       
      let res=await fetch("https://ecommerce-backend1-1.onrender.com/addCart",{
           method:"post",
           headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username:localStorage.getItem('username'),
            product:props.data.id,
            quantity:1
        }),

        })
        res=await res.json();
        console.log(res);
    }
    
    function ExplorHandler(){
        dispatch(setCurrentClick(props.data));
        navigate(`/product/Explor`);
    }
    return(
        <div
        className="p-5 m-5 border max-w-72  lg:w-auto border-gray-200 rounded-lg shadow-lg bg-gradient-to-r from-white to-[#F0F4F8] hover:shadow-2xl transition-all duration-300 ease-in-out "
       
      >
      
        <div className="relative grid h-40 w-full bg-white overflow-hidden rounded-md shadow-md cursor-pointer"  onClick={ExplorHandler}>
          <img
            src={props.data.image}
            className="h-40 w-11/12 justify-self-center self-center transition-transform transform hover:scale-105"
            alt={props.data.title}
          />
        </div >
      
     
        <div className="bg-blue-100 mt-4 p-4 rounded-lg shadow-inner relative z-10">
          <div className="text-xl font-semibold text-gray-800 mb-3">{props.data.title}</div>
      
          <div className="flex items-center space-x-1 mb-2">
            {<Rating flag={props.data.rating.rate > 0} />}
            {<Rating flag={props.data.rating.rate > 1} />}
            {<Rating flag={props.data.rating.rate > 2} />}
            {<Rating flag={props.data.rating.rate > 3} />}
            {<Rating flag={props.data.rating.rate > 4} />}
            <span className="text-yellow-600 font-bold ml-2">{props.data.count}</span>
          </div>
      
          {/* Price and Buy Button Section */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-2xl font-bold text-gray-900">
              {props.data.price} <span className="text-lg font-medium text-gray-600">Rs</span>
            </div>
            <button
              onClick={handleAddItem}
              className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    
  );

}
export default Card;