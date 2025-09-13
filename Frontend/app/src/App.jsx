import "./App.css"
import Navbar from "./Navbar";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
import Test from "./Test";
export default  function APP(){


  return(

    <div> 
      <Navbar/>
       <Test/>
      <Outlet></Outlet>
     

    </div>

  );
}