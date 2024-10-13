import axios from "axios";
import { useState } from "react";
function AddressSection(props){
    const [address, setAddress] = useState(props.data);
    const [isEdit,setEdit]=useState(false);
      const handleChange = (e) => {
        const { name, value } = e.target;
        
        setAddress({ ...address, [name]: value });
      };
       function savehandler(){
    
        setEdit(!isEdit);
        console.log("HWLLLLLLLLLLLLLLLL")
        try
        {
        fetch('https://ecommerce-backend1-1.onrender.com/updateAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...address,username:localStorage.getItem('username')})
        })
            .then(response => response.json())
            .then(data => { })
.catch(error =>{ console.error('Error:', error)});

    }catch(err)
    {

    }
      
     }
   
    return(<><div className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
       {!isEdit ?
        <div className="">
            <p className="font-semibold">{address.name}</p>
            <p className="text-sm text-gray-500">{address.zipcode} ,{address.city},{address.state}, {address.mobile}</p>
            <button className="text-sm text-blue-600 hover:text-blue-800" onClick={()=>setEdit(!isEdit)}>Edit</button>
        </div>
        :
        <div className={`grid flex-wrap  items-center justify-evenly md:grid-cols-2 transition-all duration-1000  ease-in-out ${isEdit ? 'opacity-100 h-48 w-11/12' :'opacity-0'}`} >
            <input type="text" name="name" className="h-10 w-48 outline-blue-500" placeholder="Name" value={address.name} onChange={handleChange}/>
            <input type="text" name="city" className="h-10 w-48 outline-blue-500" placeholder="city" value={address.city} onChange={handleChange}/>
            <input type="text" name="zipcode" className="h-10 w-48 outline-blue-500" placeholder="zipcode" value={address.zipcode} onChange={handleChange}/>
            <input type="number" name="mobile" className="h-10 w-48 outline-blue-500" placeholder="mobile" value={address.mobile} onChange={handleChange}/>
            <input type="number" name="street" className="h-10 w-48 outline-blue-500" placeholder="street" value={address.street} onChange={handleChange}/>
            <button   className="h-10 w-48 bg-blue-500 text-white rounded-md " onClick={savehandler}>save</button>
        </div>
         }
       
    </div></>)
}
export default AddressSection;