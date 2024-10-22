import { useEffect, useState } from "react";
import AddressSection from './AddressSection.jsx';

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from './globalSlice.jsx';
import AddressForm from "./AddressForm.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Account(){
   const [isVisible,setVisible]=useState(false);
   const [address,setAddress]=useState([]);
   const dispatch=useDispatch();
   const [img,setImg]=useState(0);
    function setUpdateAddress(){
      setVisible(!isVisible)
    }
    const [imgUrl,setImgUrl]=useState(localStorage.getItem('imgUrl'));
    function imgUrlHandler(e){
        console.log(e.target.value)
   setImgUrl(e.target.value);
   localStorage.setItem('imgUrl',imgUrl);
    }
    //https://ecommerce-backend1-1.onrender.com
    async function getAddress()
    {
        try{
        let res=await axios.get(`http://localhost:5500/getaddress/?username=${localStorage.getItem('username')}`);
         setAddress(res.data);
         console.log(res.data)
        }
        catch(err)
        {
            console.log("getaddress not fetch",err);
        }
    }
    useEffect(()=>{
        getAddress();
    },[]);
    function logouthandler(){

        localStorage.setItem('token','');
        localStorage.setItm('username','');
        toast("you have logout!")
        dispatch(setLogin(0))
    
    }
    return(
        <div className="flex min-h-screen bg-gray-100 -my-2">
    {/* Sidebar */}
    <div className="w-64 bg-blue-900 text-white flex flex-col justify-between p-6 shadow-lg">
        <div className="">
            <h2 className="text-2xl font-bold text-white">Account</h2>
            <nav className="flex flex-col space-y-3">
                <a href="#account-details" className="hover:bg-blue-700 p-2 rounded-md">Account Details</a>
                <a href="#addresses" className="hover:bg-blue-700 p-2 rounded-md">Addresses</a>
                <a href="#order-history" className="hover:bg-blue-700 p-2 rounded-md">Order History</a>
                <a href="#settings" className="hover:bg-blue-700 p-2 rounded-md">Settings</a>
                <a href="#logout" className="hover:bg-red-700 p-2 rounded-md text-red-200" onCLick={logouthandler}>Logout</a>
            </nav>
        </div>
        <div>
            <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md text-center text-white font-semibold" onClick={logouthandler}>Logout</button>
        </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8">
        {/* Account Details Section */}
        <div id="account-details" className="bg-white shadow-lg p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h3>
            <div className="flex items-center space-x-4">
                <img src={imgUrl} className="w-20 h-20 rounded-full shadow-md" alt="Profile" onClick={()=>{setImg(!img)}} />
                  <div className={`absolute bg-black rounded-lg shadow-lg grid items-center justify-items-center transition-all duration-1000 ease-in-out ${img ? 'h-48 min-w-96 opacity-100': 'opacity-0 h-0 w-0'}`} >
                      <input type="text" onChange={imgUrlHandler} placeholder="write url"  className=" text-gray-500 mx-4 h-10 w-72 outline-blue-500" value={imgUrl}/>
                      <button onClick={(e)=>setImg(!img)} className="bg-blue-600 px-4 h-10 w-20 text-white rounded-lg">save</button>
                  </div>
                <div>
                    <p className="text-lg font-bold">Avan Singh</p>
                    <p className="text-gray-600">{localStorage.getItem('username')}</p>
                </div>
            </div>
        </div>

        {/* Addresses Section */}
        <div id="addresses" className="bg-white shadow-lg p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Addresses</h3>
            <div className="space-y-4 grid">
            {
                        address.map((data,key)=>{
                            return <AddressSection data={data} key={key} />
                        })
            }
                
                <div className={`content-none absolute self-center justify-self-center  bg-white shadow-lg transition-all ease-in-out duration-1000 ${isVisible ? 'min-h-96 w-3/5 opacity-100': 'h-0 w-0 opacity-0'}`}>
                       
                       <button className="h-10 w-10 float-right rounded-full shadow-xl bg-red-500 hover:scale-110" onClick={setUpdateAddress}>X</button>
                           <AddressForm/>
                     
                       
                </div>
                <button className="mt-4 bg-blue-600 w-48 text-white py-2 px-4 rounded-md hover:bg-blue-700" onClick={setUpdateAddress}>Add New Address</button>
            </div>
        </div>

        {/* Order History Section */}
        <div id="order-history" className="bg-white shadow-lg p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order History</h3>
            <p className="text-gray-600">No orders placed yet.</p>
        </div>

        {/* Settings Section */}
        <div id="settings" className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Settings</h3>
            <p className="text-gray-600">Customize your account settings here.</p>
        </div>
    </div>
</div>

    )
}
export default Account;