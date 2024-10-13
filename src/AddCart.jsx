import { useState } from "react";

function AddCart(props)
{
    const [count,setCount]=useState(0);
    const [flag,setFlag]=useState(true)
    return(
        <>
        {
            flag ? <div className="w-56 sm:w-72 md:w-96 h-40">
         <img src={props.item.src} className="h-30 w-20"/>
         <input type="number"  onChage={(e)=>{setCount(e.target.value)}} className="min-w-8 h-10"/>
         <div className>{props.item.title}</div>
         <div className="font-bold">{props.item.price*count}Rs</div>
         <button onClick={()=>{setFlag(!flag)}}>
            
         </button>
        </div>: null}
        </>
    )
}
export default AddCart;