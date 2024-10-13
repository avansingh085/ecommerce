function CustomerServiceBox(props){
    return(
        <div className="h-20 w-48 m-4 flex items-center justify-center border-2 border-slate-700 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer bg-white hover:bg-slate-50">
        <img
          src={props.item.src}
          className="h-14 w-14 rounded-full border border-gray-300 shadow-sm"
          alt={props.item.service} // Added alt text for accessibility
        />
        <div className="ml-3 text-center">
          <div className="font-semibold text-gray-800">{props.item.service}</div>
          <div className="text-sm text-gray-600">{props.item.serviceInf}</div>
        </div>
      </div>
    )
}
export default CustomerServiceBox;