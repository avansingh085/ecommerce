import { useDispatch } from "react-redux";
import {setSearch} from "./globalSlice.jsx";
function RecomendationCom(props){
   const dispatch=useDispatch();
    function DispatchSearch()
    {
      dispatch(setSearch(props.data.title));
    }
    console.log("NO_____________");
    return(+
      <button 
      className="w-52 md:w-72 shadow-md rounded-lg  text-pink-400 border-0 my-1 hover:bg-gradient-to-r transition-all duration-300 transform hover:scale-105" 
      onClick={DispatchSearch}
    >
      {props.data.title}
    </button>
    
    )
}
export default RecomendationCom;