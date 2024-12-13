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
    const [isSidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`w-64 bg-blue-900 text-white flex flex-col justify-between p-6 shadow-lg fixed top-16 left-0 bottom-0 z-20 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div>
                    <h2 className="text-2xl font-bold">Account</h2>
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

            {/* Mobile Toggle Sidebar Button */}
            <button className="md:hidden absolute top-4 left-4 text-white bg-blue-600 p-2 rounded-full" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                <i className="fas fa-bars"></i>
            </button>

            {/* Main Content */}
            <div className={`flex-1 p-8 md:pl-72 pt-16 ${isSidebarOpen ? 'md:pl-0' : ''}`}>
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
                <div id="addresses" className="bg-white shadow-lg p-6 rounded-lg mb-8 relative">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Addresses</h3>
                    <div className="space-y-4">
                        {address.map((data, key) => (
                            <AddressSection data={data} key={key} />
                        ))}

                        {/* Address Form Modal */}
                        {isVisible && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                <div className="bg-white shadow-lg p-6 rounded-lg w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
                                    <button className="h-10 w-10 float-right rounded-full shadow-xl bg-red-500 text-white hover:scale-110" onClick={toggleAddressForm}>X</button>
                                    <AddressForm />
                                </div>
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
