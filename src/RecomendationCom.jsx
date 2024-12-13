import { useDispatch } from "react-redux";
import { setSearch } from "./globalSlice.jsx";

function RecomendationCom(props) {
  const dispatch = useDispatch();

  // Dispatch search term to Redux when a recommendation is clicked
  function DispatchSearch() {
    dispatch(setSearch(props.data.title));  // Set the clicked title as the search term
  }

  return (
    <button
      className="w-52 md:w-72 shadow-md rounded-lg text-pink-400 border-0 my-1 hover:bg-gradient-to-r transition-all duration-300 transform hover:scale-105"
      onClick={DispatchSearch}
    >
      {props.data.title}  {/* Display the title of the recommended product */}
    </button>
  );
}

export default RecomendationCom;
