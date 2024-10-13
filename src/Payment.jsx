import React from 'react';
   const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
 loadScript('https://checkout.razorpay.com/v1/checkout.js').then((res)=>{console.log("yes")});

   function handlePayment() {

             fetch('https://ecommerce-backend1-1.onrender.com/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 500, // amount in INR
                    currency: 'INR',
                    receipt: 'receipt_1',
                }),
            }).then((responce)=>responce.json()).then((order)=>{
            
            let key_id="rzp_test_099LgMWWQ1DioF";
            const options = {
                key: key_id, // Replace with your Razorpay key ID
                amount: order.amount,
                currency: order.currency,
                name: 'Merchant Name',
                description: 'Test Transaction',
                order_id: order.id,
                handler: function (response) {
                    fetch('https://ecommerce-backend1-1.onrender.com/verifyPayment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            order_id: order.id,
                            payment_id: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        }),
                    })
                    .then(res => res.text())
                    .then(result => alert(result))
                    .catch(error => console.error('Error:', error));
                },
                prefill: {
                    name: 'Test User',
                    email: 'test.user@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                }
            };
            const rzp1 =new window.Razorpay(options);
            rzp1.open();
        });
    };
 export default fun={loadScript,handlePayment};
// import React from 'react';
// //import Razorpay from 'razorpay';

// const Payment = () => {
//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = src;
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const displayRazorpay = async () => {
//     loadScript('https://checkout.razorpay.com/v1/checkout.js').then((res)=>{

//     if (!res) {
//       alert('Razorpay SDK failed to load. Are you online?');
//       return;
//     }
//    // let key_id="rzp_test_099LgMWWQ1DioF";
//     const options = {
//       key: 'rzp_test_099LgMWWQ1DioF', // Enter the Key ID generated from the Dashboard
//       amount: '500', // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or INR 500.
//       currency: 'INR',
//       name: 'Your Company Name',
//       description: 'Test Transaction',
      
//       order_id: '1234567', // This is a sample Order ID. Replace it with your Order ID.
//       handler: function (response) {
//         alert(response.razorpay_payment_id);
//         alert(response.razorpay_order_id);
//         alert(response.razorpay_signature);
//       },
//       prefill: {
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         contact: '9999999999'
//       },
//       notes: {
//         address: 'Razorpay Corporate Office'
//       },
//       theme: {
//         color: '#F37254'
//       }
    
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
// })
//   };

//   return (
//     <button onClick={displayRazorpay}>
//       Pay with Razorpay
//     </button>
//   );
// };

// export default Payment;
