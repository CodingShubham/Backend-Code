import React from 'react'
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="h-[300px] w-80 flex justify-center border rounded-lg text-xl items-center">
        <form onSubmit={handleClick} className="flex flex-col">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className=" bg-black rounded-lg text-center text-white text-md focus:outline-none"
            placeholder="Email"
            type='email'
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mt-6   bg-black rounded-lg text-center text-white text-md focus:outline-none "
            placeholder="Password"
            required
            type="password"
          />


          <div className='space-x-20'>

          <button
            type="submit"
            className="  w-[65px] mt-10 border rounded-md p-1 bg-white"
            required
          >
            Login
          </button>


            <button
            type="submit"
            className="  w-[90px] mt-10 border rounded-md p-1 bg-white"
            required
          >
            Sign Up
          </button>


          </div>

          
        </form>
      </div>
    </div>
  );
}

export default Login;
