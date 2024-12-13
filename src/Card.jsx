import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating.jsx';
import { setCurrentClick } from './globalSlice.jsx';

function Card(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle adding item to cart
    async function handleAddItem() {
        let res = await fetch("https://ecommerce-backend1-1.onrender.com/addCart", {
            method: "POST",
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

    // Navigate to product exploration page
    function ExplorHandler() {
        dispatch(setCurrentClick(props.data));
        navigate(`/product/Explor`);
    }

    return (
        <div className="relative max-w-[80%] w-full mx-auto my-4 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-4">
            
            {/* Card Image */}
            <div className="relative w-full h-64 bg-gray-200 rounded-t-xl overflow-hidden">
                <img
                    src={props.data.image}
                    alt={props.data.title}
                    className="w-full h-full object-cover transition-all duration-300 ease-in-out transform hover:scale-105"
                    onClick={ExplorHandler}
                />
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800 truncate">{props.data.title}</h3>

                <div className="flex items-center space-x-2">
                    {/* Rating Stars */}
                    {Array(5).fill(0).map((_, i) => (
                        <Rating key={i} flag={props.data.rating.rate > i} />
                    ))}
                    <span className="text-sm text-gray-600">{props.data.count} reviews</span>
                </div>

                <div className="flex justify-between items-center">
                    {/* Price */}
                    <div className="text-2xl font-bold text-gray-900">
                        {props.data.price} Rs
                    </div>

                    {/* Buy Now Button */}
                    <button
                        onClick={handleAddItem}
                        className="px-6 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold rounded-full shadow-md hover:from-teal-500 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 focus:outline-none"
                    >
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Decorative background effects */}
            <div className="absolute top-0 -right-5 h-24 w-24 rounded-full bg-gradient-to-r from-purple-300 to-pink-500 blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 -left-5 h-24 w-24 rounded-full bg-gradient-to-r from-blue-300 to-teal-500 blur-3xl opacity-20"></div>
        </div>
    );
}

export default Card;
