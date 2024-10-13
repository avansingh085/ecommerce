import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from 'react';
async function fun(){
  let url="https://ecommerce-backend1-1.onrender.com/sendData";
  let url1=`https://fakeapidata.com/products?page=1&limit=400`;
  try{
  let {data}=await axios.get(url1);
  return data;
  }
  catch(err)
  {
      console.log(err);
  }
  return [];
  }
async  function checkLogin(){
  let url1=`https://ecommerce-backend1-1.onrender.com/verifyToken?token=${localStorage.getItem("token")}`;
  try{
  let {data}=await axios.get(url1);
      return(data.success);
  }
  catch(err)
  {
      console.log(err);
  }
  return(false);
  }
  let data=await fun();
 
  let check=await checkLogin();

  console.log(check);
  const initialState={
  filData:data,
  items: [],
  searchVal:"",
   price:0,
   isLogin:check,
   selectedItem: null,
   currClick:{}
  
};
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    UpdateFilData:(state,action)=>{
        state.filData=action.payload;
    },
    setLogin:(state,active)=>{
      state.isLogin=active.payload;
    },
    setCurrentClick:(state,active)=>{
      state.currClick=active.payload;
    },
    setSearch:(state,active)=>{
      state.searchVal=active.payload;
    },
    updatePrice:(state,action)=>{
       state.price=state.price+parseInt(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    selectItem: (state, action) => {
      state.selectedItem = state.items.find(item => item.id === action.payload) || null;
    },
  },
});
export const {setCurrentClick,addItem, removeItem, selectItem,UpdateFilData,updatePrice,setLogin ,setSearch} = itemsSlice.actions;
export default itemsSlice.reducer;
