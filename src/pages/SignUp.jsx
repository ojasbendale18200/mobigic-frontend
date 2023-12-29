import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields.");
    } else if (password.length < 6) {
      console.log(password);
      alert("Password must be at least 6 characters long.");
    } else {
      const payload = {
        username,
        password,
      };

      await axios
        .post(`https://mobigic-1p0g.onrender.com/auth/register`, payload)
        .then((res) => {
          alert("Registration Successful");
          navigate("/signin");
          setUsername("");
          setPassword("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <form
      className="w-96 h-96 mx-auto flex flex-col justify-center items-center gap-4 bg-gray-100 mt-10 p-8 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Sign Up</h1>

      <input
        type="text"
        name="name"
        className="w-full h-12 px-4 rounded border focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="Set your Password"
        value={password}
        className="w-full h-12 px-4 rounded border focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Sign Up
      </button>

      <p className="mt-4">
        Already signed up?{" "}
        <Link to="/signin" className="text-blue-500">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
