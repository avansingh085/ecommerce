import { useEffect, useState } from "react";
import AddressSection from './AddressSection.jsx';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from './globalSlice.jsx';
import AddressForm from "./AddressForm.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Account() {
    const [isVisible, setVisible] = useState(false);
    const [address, setAddress] = useState([]);
    const dispatch = useDispatch();
    const [img, setImg] = useState(false);
    const [imgUrl, setImgUrl] = useState(localStorage.getItem('imgUrl') || '');

    // Toggles address form modal visibility
    function toggleAddressForm() {
        setVisible(!isVisible);
    }

    // Handle image URL change
    function handleImgUrlChange(e) {
        setImgUrl(e.target.value);
    }

    // Save image URL to local storage
    function saveImgUrl() {
        localStorage.setItem('imgUrl', imgUrl);
        setImg(false);
    }

    // Fetch user's address from the server
    async function fetchAddress() {
        try {
            const res = await axios.get(`https://ecommerce-backend1-1.onrender.com/getaddress/?username=${localStorage.getItem('username')}`);
            setAddress(res.data);
        } catch (err) {
            console.error("Failed to fetch address", err);
        }
    }

    // Handle logout
    function handleLogout() {
        localStorage.setItem('token', '');
        localStorage.setItem('username', '');
        toast("You have logged out!");
        dispatch(setLogin(0));
    }

    useEffect(() => {
        fetchAddress();
    }, []);

    return (
        <div className="flex bg-gray-100 -my-2 mb-2 min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white flex flex-col justify-between p-6 shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold text-white">Account</h2>
                    <nav className="flex flex-col space-y-3 mt-6">
                        <a href="#account-details" className="hover:bg-blue-700 p-2 rounded-md">Account Details</a>
                        <a href="#addresses" className="hover:bg-blue-700 p-2 rounded-md">Addresses</a>
                        <a href="#order-history" className="hover:bg-blue-700 p-2 rounded-md">Order History</a>
                        <a href="#settings" className="hover:bg-blue-700 p-2 rounded-md">Settings</a>
                        <a href="#logout" className="hover:bg-red-700 p-2 rounded-md text-red-200" onClick={handleLogout}>Logout</a>
                    </nav>
                </div>
                <div>
                    <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md text-center text-white font-semibold" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Account Details Section */}
                <div id="account-details" className="bg-white shadow-lg p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h3>
                    <div className="flex items-center space-x-4">
                        <img src={imgUrl} className="w-20 h-20 rounded-full shadow-md cursor-pointer" alt="Profile" onClick={() => setImg(!img)} />
                        {img && (
                            <div className="absolute bg-black rounded-lg shadow-lg grid items-center justify-items-center p-4 transition-all duration-500 ease-in-out">
                                <input type="text" onChange={handleImgUrlChange} placeholder="Enter image URL" className="text-gray-500 h-10 w-72 outline-none p-2 mb-2 rounded-md" value={imgUrl} />
                                <button onClick={saveImgUrl} className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-700">Save</button>
                            </div>
                        )}
                        <div>
                            <p className="text-lg font-bold">Avan Singh</p>
                            <p className="text-gray-600">{localStorage.getItem('username')}</p>
                        </div>
                    </div>
                </div>

                {/* Addresses Section */}
                <div id="addresses" className="bg-white shadow-lg p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Addresses</h3>
                    <div className="space-y-4 grid">
                        {address.map((data, key) => (
                            <AddressSection data={data} key={key} />
                        ))}

                        {/* Address Form Modal */}
                        {isVisible && (
                            <div className="absolute bg-white shadow-lg transition-all duration-500 ease-in-out min-h-96 w-3/5 opacity-100 p-6 rounded-lg">
                                <button className="h-10 w-10 float-right rounded-full shadow-xl bg-red-500 text-white hover:scale-110" onClick={toggleAddressForm}>X</button>
                                <AddressForm />
                            </div>
                        )}
                        <button className="mt-4 bg-blue-600 w-48 text-white py-2 px-4 rounded-md hover:bg-blue-700" onClick={toggleAddressForm}>Add New Address</button>
                    </div>
                </div>

                {/* Order History Section */}
                <div id="order-history" className="bg-white shadow-lg p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Order History</h3>
                    <p className="text-gray-600">No orders placed yet.</p>
                </div>

                {/* Settings Section */}
                <div id="settings" className="bg-white shadow-lg p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Settings</h3>
                    <p className="text-gray-600">Customize your account settings here.</p>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
}

export default Account;
