import React, { useState } from "react";

const AddressForm = () => {
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  async function savehandler() {
    fetch("https://ecommerce-backend1-1.onrender.com/updateAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...address,
        _id: "",
        username: localStorage.getItem("username"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSave(!isSave);
      })
      .catch((error) => console.error("Error:", error));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address);
    savehandler();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 w-full sm:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Address Form
        </h2>

        {/* Name Field */}
        <div className="mb-3">
          <label
            className="block text-sm text-gray-700 font-medium mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={address.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Mobile Number Field */}
        <div className="mb-3">
          <label
            className="block text-sm text-gray-700 font-medium mb-1"
            htmlFor="mobile"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={address.mobile}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="123-456-7890"
            required
          />
        </div>

        {/* Street Address Field */}
        <div className="mb-3">
          <label
            className="block text-sm text-gray-700 font-medium mb-1"
            htmlFor="street"
          >
            Street Address
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="123 Main St"
            required
          />
        </div>

        {/* City Field */}
        <div className="mb-3">
          <label
            className="block text-sm text-gray-700 font-medium mb-1"
            htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Anytown"
            required
          />
        </div>

        {/* State Field */}
        <div className="mb-3">
          <label
            className="block text-sm text-gray-700 font-medium mb-1"
            htmlFor="state"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="CA"
            required
          />
        </div>

        {/* Zip Code Field */}
        <div className="mb-3">
          <label
            className="block text-sm text-gray-700 font-medium mb-1"
            htmlFor="zip"
          >
            Zip Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={address.zip}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="12345"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-150"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
