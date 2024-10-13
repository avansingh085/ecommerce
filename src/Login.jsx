import { useEffect, useState,useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {setLogin} from './globalSlice.jsx';
function Login()
{ 
   const navigate=useNavigate();
   const username=useRef(null);
   const password=useRef(null);
   const [tog,setTog]=useState(0);
   const [message,setMessage]=useState("");
   const dispatch=useDispatch();
   console.log("AVANANNNN");
 async  function loginVeri(){
   
   
    try{
  let res=await fetch(`https://ecommerce-backend1-1.onrender.com/${tog ? "signup" : "login"}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({username:username.current.value,password:password.current.value}), 
    })
    let res1=await res.json();
    
    console.log(res1);
    if(res1.success)
    {
        localStorage.setItem('username',username.current.value)
        localStorage.setItem('token',res1.token);
        dispatch(setLogin(1));
        navigate("/");
    }
    else
    {
        setMessage("please correct")
    }
}
catch(err)
{
    console.log(err);
}
   
   
   
   }
  
    return(
        <div className="w-screen -my-7 h-screen grid items-center justify-center shadow-2xl bg-gray-800">
        <div className="bg-white shadow-2xl h-60 w-96 px-10 grid items-center justify-center rounded-2xl border border-gray-300">
          <label>
            <input
              type="email"
              className="h-12 w-72 px-3 text-gray-700 font-serif mx-5 outline-none rounded-lg shadow-lg focus:ring focus:ring-blue-400"
              placeholder="Email"
              ref={username}
              required
            />
          </label>
          <label>
            <input
              type="password"
              className="h-12 px-3 w-72 outline-none rounded-lg mx-5 shadow-lg focus:ring focus:ring-blue-400"
              placeholder="Password"
              ref={password}
              required
            />
          </label>
          <button
            className="h-12 rounded-xl hover:scale-105 w-28 text-white bg-blue-600 transition duration-200 ease-in-out mt-4"
            onClick={loginVeri}
          >
            {!tog ? "Login" : "Signup"}
          </button>
        </div>
        <div className="text-white text-xl mt-4">{message}</div>
        <button
          className="h-12 rounded-xl hover:scale-105 w-28 text-white bg-blue-600 transition duration-200 ease-in-out mt-4"
          onClick={() => {
            setTog(!tog);
          }}
        >
          {tog ? "Login" : "Signup"}
        </button>
      </div>
      
      
    )
}
export default Login;