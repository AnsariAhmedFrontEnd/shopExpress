import React, { useState } from "react";
import axios from "axios";
import { setLoading, setUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //login function
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = {
      email,
      password,
    };

    try {
      dispatch(setLoading());
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        dispatch(setUser(response.data.user));
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        return
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium text-primary hover:underline ml-1"
            to="/auth/signup"
          >
            Signup
          </Link>
        </p>
      </div>
      <form className="flex flex-col gap-2 mt-4" onSubmit={submitHandler}>
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          className="border-2 rounded-xl p-2"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className=" bg-black text-white p-2 border rounded-xl mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
