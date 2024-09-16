import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = {
      userName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/auth/login");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium text-primary hover:underline ml-1"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <form className="flex flex-col gap-2 mt-4" onSubmit={submitHandler}>
        <label htmlFor="userName" className="font-semibold">
          User Name
        </label>
        <input
          type="text"
          placeholder="Enter user name"
          name="userName"
          className="border-2 rounded-xl p-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          className="border-2 rounded-xl p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter user password"
          name="password"
          className="border-2 rounded-xl p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className=" bg-black text-white p-2 border rounded-xl mt-4"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
