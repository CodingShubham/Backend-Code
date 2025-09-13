
import axios from "axios"
import {  useNavigate } from "react-router-dom";
export default function Navbar(){


  const navlink=useNavigate();

  const handleClick= async ()=>{
     console.log("✅ Logout button clicked"); // debugging
  

    try{
    const res=await axios.post("http://localhost:3000/logout",{}, { withCredentials: true});
     console.log(res.data);
    navlink("/login");


      }

      catch(err){
        console.error(err);
        alert("Unknown Error occured while logout");
      }




  }


    return(

    <div className="flex space-x-60 p-5 justify-center text-2xl bg-blue-300">

    <h1 className="bg-blue-300 font-bold text-gray-800">DEVTINIDER</h1>

      <div className="space-x-5 bg-blue-300">
   <input name="name" className="bg-blue-300 border rounded-md text-center" placeholder="Enter"></input>
    <button type="button" onClick={handleClick} className="  bg-blue-300 px-20  rounded-lg">Logout</button>
      </div>

  
      
  
    </div>
  )
}

    
