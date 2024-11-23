import React, { useEffect, useState } from "react";
import Cart from "./Cart.jsx";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

function CartPage() {
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState(0);
  const [isFetch, setFetch] = useState(false);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const loadCartItem = async () => {
    try {
      const username = localStorage.getItem("username");
      const res = await fetch(`https://ecommerce-backend1-1.onrender.com/sendCart?username=${username}`);
      const cartData = await res.json();
      const currItems = cartData.items;

      const productRequests = currItems.map((item) =>
        fetch(`https://ecommerce-backend1-1.onrender.com/sendData?productId=${item.productId}`)
      );

      const productResponses = await Promise.all(productRequests);
      const productData = await Promise.all(productResponses.map((res) => res.json()));

      let totalPrice = 0;
      const itemsWithDetails = productData.map((product, idx) => {
        const quantity = currItems[idx].quantity;
        totalPrice += product.price * quantity;
        return { ...product, quantity };
      });

      setPrices(totalPrice);
      setItems(itemsWithDetails);
      setFetch(true);
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  useEffect(() => {
    loadCartItem();
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(() =>
      console.log("Razorpay script loaded")
    );
  }, []);

  const handlePayment = async () => {
    try {
      const response = await fetch("https://ecommerce-backend1-1.onrender.com/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: prices,
          currency: "INR",
          receipt: "receipt_1",
        }),
      });
      const order = await response.json();

      const options = {
        key: "rzp_test_099LgMWWQ1DioF",
        amount: order.amount,
        currency: order.currency,
        name: "Merchant Name",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          try {
            await fetch("https://ecommerce-backend1-1.onrender.com/verifyPayment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: order.id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            console.log("Payment Verified");
          } catch (err) {
            console.error("Error verifying payment:", err);
          }
        },
        prefill: {
          name: localStorage.getItem("username"),
          email: "test.user@example.com",
          contact: "9305275866",
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment process:", error);
    }
  };

  return (
    <div>
      <div
        className={`w-screen grid bg-black-50 ${
          !isFetch ? "items-center" : "align-top px-14"
        } justify-center min-h-screen`}
      >
        {!isFetch ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : items.length > 0 ? (
          items.map((data, key) => <Cart data={data} key={key} />)
        ) : (
          <h1 className="text-gray-300 text-9xl font-serif">NO ANY ITEMS</h1>
        )}
      </div>
      {items.length > 0 && (
        <div className="h-16 w-screen flex items-center justify-evenly shadow-lg">
          <button
            onClick={handlePayment}
            className="h-14 w-40 bg-purple-600 text-white font-bold rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-purple-700"
          >
            Payment Now
          </button>
          <div className="text-lg font-semibold text-gray-800">
            Total Price: {prices}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
