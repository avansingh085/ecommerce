import data from "./CustomerServiceBoxData.jsx"
import CustomerServiceBox from "./CustomerServiceBox.jsx";
function CustomerService(){

return(
    <div className="min-h-screen w-screen bg-black flex flex-col items-center">
    <div className="text-lg mx-10 mt-10 sm:text-xl h-16 w-full md:text-2xl text-center font-semibold text-gray-800">
      Hello! What can we help you with?
    </div>

    <div className="w-full flex flex-wrap justify-center min-h-96 px-5">
      {data.map((d, ind) => (
        <div className="flex-1 m-4 max-w-xs" key={ind}>
          <CustomerServiceBox item={d} />
        </div>
      ))}
    </div>

    <div className="mx-10 font-bold text-gray-700 text-center mt-6">
      Find more solutions: Type something like, "question about a charge"
    </div>

    <div className="mt-4 flex justify-center">
      <input
        type="text"
        className="h-10 w-72 px-4 font-serif border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        placeholder="Type here..."
      />
    </div>
  </div>
)
}
export default CustomerService;