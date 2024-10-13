import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay for the animation trigger
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-wrapper">
      <motion.div
        className="login-container"
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <h2>Login</h2>
        <form className="login-form">
          <div className="input-field">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-field">
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
