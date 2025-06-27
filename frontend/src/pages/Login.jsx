import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (state === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        toast.success(`${state} successful!`);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030f2e]">
      <form
        onSubmit={onSubmitHandler}
        className="bg-[#0f1d4d] p-8 rounded-xl shadow-md w-full max-w-md border border-[#00b4d8]"
      >
        <h2 className="text-2xl font-bold text-[#00eaff] mb-2">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-sm text-[#cdefff] mb-6">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an appointment
        </p>

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-sm mb-1 text-[#cdefff]">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#00b4d8] bg-[#112b5f] text-white rounded-md focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1 text-[#cdefff]">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-[#00b4d8] bg-[#112b5f] text-white rounded-md focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1 text-[#cdefff]">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-[#00b4d8] bg-[#112b5f] text-white rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#00eaff] text-[#030f2e] font-semibold py-2 rounded-md hover:opacity-90 transition"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p className="text-sm text-center mt-4 text-[#cdefff]">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-[#00eaff] hover:underline cursor-pointer"
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
          >
            {state === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
