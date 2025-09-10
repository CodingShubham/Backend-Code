
import axios from "axios"
import {  useNavigate } from "react-router-dom";
export default function Navbar(){


  const navlink=useNavigate();

  const handleClick= async ()=>{

    try{
    const res=await axios.post("http://localhost:3000/logout",{}, { withCredentials: true});
    navlink("/login");


      }

      catch(err){

        alert("Unknown Error occured while logout");
      }




  }


    return(

    <div className="flex space-x-60 p-5 justify-center text-2xl">

    <h1>DEVTINIDER</h1>

      <div>
   <input name="name" className="border rounded-md text-center" placeholder="Enter"></input>
    <button onClick={handleClick} className="px-20">Logout</button>
      </div>

  
      
  
    </div>
  )
}

    
