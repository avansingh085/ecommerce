const sendData=async (routes,object)=>{
    try{
        fetch(`https://ecommerce-backend1-1.onrender.com/${routes}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(object),
        })
          .then(response => response.json())
          .then(data => {return data})
          .catch(error => console.error('Error:', error));
      }catch(err)
      {
        return {success:false};
        console.log("AVAN-----------------------------------")
      }
      
}
export default sendData;