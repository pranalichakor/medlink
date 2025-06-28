import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const loginMode = params.get('mode'); // ?mode=admin or ?mode=doctor

  const [state, setState] = useState(loginMode === 'doctor' ? 'Doctor' : 'Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success("Welcome Admin");
          navigate('/admin-dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success(`Welcome Dr. ${data.doctor.name}`);
          navigate('/doctor-dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100"
    >
      <div className="flex flex-col gap-4 p-8 w-[90%] max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100">
        <h2 className="text-2xl font-bold text-center text-[#003566]">
          {state} <span className="text-blue-600">Login</span>
        </h2>

        <div className="w-full">
          <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-blue-200 rounded-md w-full p-2 focus:outline-blue-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-blue-200 rounded-md w-full p-2 focus:outline-blue-500"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-full hover:bg-blue-700 transition-all font-medium"
        >
          Login
        </button>

        <p className="text-sm mt-2 text-center text-gray-500">
          {state === 'Admin' ? (
            <>
              Doctor Login?{" "}
              <span
                onClick={() => setState('Doctor')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span
                onClick={() => setState('Admin')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
