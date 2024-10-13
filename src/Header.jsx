
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { UpdateFilData,setLogin ,setSearch} from './globalSlice.jsx';
import RecomendationCom from "./RecomendationCom.jsx";

function Header(){
  
  const [Rec,setRec]=useState([]);
  const dispatch = useDispatch();
  let {searchVal}=useSelector((state)=>state.searchVal);
 
  let {filData}=useSelector((state)=>state.filData);
  let {isLogin}=useSelector((state)=>state.isLogin);
  const [flag,setFlag]=useState(false);
  const value=useRef();
 
   useEffect(()=>{
        let slide=document.getElementById("slide");
       let list=slide.classList;
       
       if(flag)
       {
       list.remove("w-0");
       list.add("w-60");
       
       }
       else{
        list.remove("w-60");
        list.add("w-0");
       }
       

    },[flag]);
  function handlerShowRec(e){
 
    let rec=document.getElementsByClassName("recomendation")[0];
     rec.classList.add("h-screen");
     rec.classList.remove("h-0");
     rec.classList.remove("opacity-0");
      let sel=document.getElementById("search");
      let data1=[]
          let data2=filData;
          
          for(let i=0;i<data2.length;i++)
          {
              let j=0,k=0;
              let datain=data2[i];
              let tit=datain.title.toLocaleLowerCase();
              let sc=0;
              let sr=searchVal.toLocaleLowerCase();
            
                while(k<tit.length&&j<searchVal.length)
                {
                     if(tit[k]==' ')
                     {
                      k++;
                      continue;
                     }
                     if(sr[j]==' ')
                     {
                      j++;
                      continue;
                     }
                    if(sr[j]==tit[k])
                     {
                        j++;
                        k++;
                        sc=sc+100000-j*(k/(j+1));
                     }
                     else{
                          k++;
                     }
                }
          data1.push({sc,datain});
          }
          
         data1.sort((a,b)=>{ return b.sc-a.sc});
          let data3=[];
        
          for(let i=0;i<data1.length;i++)
          {
            if(i<10)
                data3.push(data1[i].datain);
          }
      setRec(data3)
      sel.style.opacity=1;
      dispatch(setSearch(e.target.value));
 }
 function handlerHidRec(e){
     let rec=document.getElementsByClassName("recomendation")[0];
     rec.classList.add("h-0");
     rec.classList.remove("h-screen");
     rec.classList.add("opacity-0");
     let sel=document.getElementById("search");
    setTimeout(() => {
      setRec([]);
     sel.style.opacity=0;
    }, 1000); 
 }
 
 function handlerSearch(e)
 {
     if(e.key=="Enter")
     {
          let data1=[]
          let data2=filData;
          
          for(let i=0;i<data2.length;i++)
          {
              let j=0,k=0;
              let datain=data2[i];
              let tit=datain.title.toLocaleLowerCase();
              let sc=0;
                while(k<tit.length&&j<searchVal.length)
                {
                     
                    if(searchVal[j]==tit[k])
                     {
                        j++;
                        k++;
                        sc=sc+100000-j*(k/(j+1));
                     }
                     else{
                          k++;
                     }
                }
          data1.push({sc,datain});
          }
          
         data1.sort((a,b)=>{ return b.sc-a.sc});
          let data3=[];
        
          for(let i=0;i<data1.length;i++)
          {
                data3.push(data1[i].datain);
          }
       
         
          dispatch(UpdateFilData(data3));
     }
 }
 
    return(
       
      <div id="p" className="bg-gray-900 z-50">
      <div className="z-40 fixed w-screen bg-gray-900 text-white flex items-center justify-evenly border-b-2 border-indigo-500">
        <Link to="/">
          <img 
            src="https://img.freepik.com/premium-vector/bag-shop-gradient-colorful-logo-vector-icon-illustration_269830-2269.jpg?w=740" 
            className="h-14 w-20" 
            style={{ borderRadius: "100%" }} 
          />
        </Link>
        <div className='md:w-96'>
          <div className="flex mt-4 h-12 w-full max-w-lg items-center rounded-3xl shadow-lg">
            <input 
              type="text" 
              className="h-full w-4/5 md:w-80 px-5 rounded-l-3xl bg-gray-800 text-gray-300 placeholder-gray-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 text-lg font-medium" 
              onKeyDown={handlerSearch} 
              onChange={handlerShowRec} 
              ref={value} 
              onBlur={handlerHidRec} 
              placeholder="Search for anything..."  
              value={searchVal}  
            />
            <button 
              className="h-full w-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-3xl transition-all duration-300">
              <img 
                src="https://img.icons8.com/?size=100&id=132&format=png&color=ffffff" 
                alt="search icon" 
                className="h-6 w-6" 
              />
            </button>
          </div>
          <div name="search" type="text" id="search" className='mt-1 z-20 sticky h-1 md:w-96'>
            <div className="bg-black h-0 text-black opacity-0 recomendation border-x-2 shadow-xl grid items-center justify-center transition-all" style={{ transitionDuration: "10000" }}>
              {Rec.map((d, key) => {
                return (<RecomendationCom data={d} key={key} />);
              })}
            </div>
          </div>
        </div>
        <Link to="/Products" className="text-sm hidden sm:text-md md:text-xl sm:block font-serif">Home</Link>
        <Link to="/CustomerService" className="text-sm hidden sm:text-md md:text-xl sm:block font-serif">Customer Service</Link>
        <Link to="/CartPage" className="hidden md:text-xl sm:block font-serif"><IoCartOutline className="w-10 h-10" /></Link>
        <Link to={isLogin ? "/MyAccount" : "/Login"} className="md:text-xl text-sm hidden sm:text-md sm:block font-serif">
          {isLogin ? "My Account" : <button className="h-12 w-28 bg-indigo-700 rounded-xl">login</button>}
        </Link>
        <button className='sm:hidden' onClick={(e) => { setFlag(!flag) }}>
          <img src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000" className='h-8 w-8' />
        </button>
      </div>
    
      <div className="mt-0 w-0 absolute sm:hidden sm:w-0 h-screen transition-all duration-1000 border-r-2 border-r-slate-700 bg-gray-800 z-10" id="slide">
      </div>
    </div>
    )    
}
export default Header;