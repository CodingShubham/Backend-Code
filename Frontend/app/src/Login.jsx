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
      <div className="h-60 w-80 flex justify-center border rounded-lg text-xl items-center">
        <form onSubmit={handleClick} className="flex flex-col">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border rounded-lg text-center"
            placeholder="Email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mt-6 border rounded-lg text-center"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="mt-10 border rounded-md p-3 bg-white"
            required
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
