import "./App.css"
import Navbar from "./Navbar";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
export default  function APP(){


  return(

    <div> 
      <Navbar/>
      <Outlet></Outlet>
     

    </div>

  );
}