import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating.jsx';
import { setCurrentClick } from './globalSlice.jsx';

function Card(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleAddItem() {
        let res = await fetch("https://ecommerce-backend1-1.onrender.com/addCart", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: localStorage.getItem('username'),
                product: props.data.id,
                quantity: 1
            }),
        });
        res = await res.json();
        console.log(res);
    }

    function ExplorHandler() {
        dispatch(setCurrentClick(props.data));
        navigate(`/product/Explor`);
    }

    return (
        <div className="relative p-6 m-5 max-w-xs lg:w-auto rounded-3xl shadow-lg bg-white bg-opacity-40 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-70">

            <div className="relative h-48 w-full bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-xl" onClick={ExplorHandler}>
                <img
                    src={props.data.image}
                    className="h-full w-full object-contain transition-transform transform"
                    alt={props.data.title}
                />
            </div>

           
            <div className="mt-6 p-6 rounded-xl bg-gradient-to-b from-white to-gray-100 shadow-inner">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 tracking-wide leading-tight mb-2">{props.data.title}</h3>

                <div className="flex items-center space-x-1 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                        <Rating key={i} flag={props.data.rating.rate > i} />
                    ))}
                    <span className="text-yellow-500 font-bold ml-2">{props.data.count}</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-2xl font-extrabold text-gray-800">
                        {props.data.price}Rs
                    </div>
                    <button
                        onClick={handleAddItem}
                        className="px-6 -mx-5 py-3 rounded-full bg-gradient-to-r from-green-400 to-teal-600 text-white font-semibold shadow-xl hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-700 transition-all duration-200 transform hover:scale-110 focus:outline-none"
                    >
                        Buy Now
                    </button>
                </div>
            </div>

           
            <div className="absolute top-0 -right-10 h-32 w-32 rounded-full bg-gradient-to-r from-blue-300 to-purple-500 blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 -left-10 h-32 w-32 rounded-full bg-gradient-to-r from-pink-300 to-red-500 blur-3xl opacity-30"></div>
        </div>
    );
}

export default Card;
