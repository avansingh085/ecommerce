import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from './globalSlice.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();
  const username = useRef(null);
  const password = useRef(null);
  const [tog, setTog] = useState(0);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  async function loginVeri() {
    try {
      let res = await fetch(`http://localhost:5500/${tog ? "signup" : "login"}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.current.value, password: password.current.value }),
      });
      let res1 = await res.json();
      console.log(res1);
      if (res1.success) {
        toast("Login successfully");
        localStorage.setItem('username', username.current.value);
        localStorage.setItem('token', res1.token);
        dispatch(setLogin(1));
        navigate("/");
      } else {
        toast.error("Please enter valid details");
        setMessage("Please correct the details.");
      }
    } catch (err) {
      toast.error("Something went wrong with the backend");
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg max-w-md w-full p-6 rounded-2xl border border-gray-300 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{!tog ? "Login" : "Signup"}</h2>
        <label className="block mb-4">
          <input
            type="email"
            className="h-12 w-full px-4 text-gray-700 font-serif rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Email"
            ref={username}
            required
          />
        </label>
        <label className="block mb-6">
          <input
            type="password"
            className="h-12 w-full px-4 text-gray-700 font-serif rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Password"
            ref={password}
            required
          />
        </label>
        <button
          className="w-full h-12 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mb-4"
          onClick={loginVeri}
        >
          {!tog ? "Login" : "Signup"}
        </button>
        <p className="text-center text-gray-600 text-sm mb-4">{message}</p>
        <div className="text-center">
          <button
            className="text-blue-600 hover:text-blue-800 transition duration-200"
            onClick={() => setTog(!tog)}
          >
            {tog ? "Already have an account? Login" : "Don't have an account? Signup"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
