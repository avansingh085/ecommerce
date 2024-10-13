import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { useSelector } from "react-redux";
function Products(){
    let {filData}= useSelector((state) => state.filData);
  
  return(
      <div className="justify-items-center items-center pt-20 min-h-screen w-screen  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        { 
   filData.map((it,ind)=>{
   return <Card data={it}/>;
    })
        }
       
      </div>
  )
}
export default Products;