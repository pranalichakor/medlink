import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#030f2e] text-[#e0f7ff] flex flex-col md:flex-row items-center justify-between rounded-2xl px-6 sm:px-10 md:px-20 py-20 mt-20 overflow-hidden shadow-lg border border-[#1e3a8a]">
      
      {/* Left Text Section */}
      <div className="flex flex-col gap-4 text-center md:text-left z-10">
        <p className="text-2xl sm:text-3xl font-semibold text-[#00eaff]">Book Appointment</p>
        <p className="text-2xl sm:text-3xl font-semibold text-[#6fc3ff]">With 100+ Trusted Doctors</p>

        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-gradient-to-r from-[#00eaff] to-[#0088ff] text-[#030f2e] px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 w-fit mx-auto md:mx-0"
        >
          Create Account
        </button>
      </div>

      {/* Doctor Image */}
      <div className="absolute bottom-0 right-2 sm:right-10 md:right-32 z-0">
        <img
          src={assets.appointment_img}
          alt="Doctor pointing"
          className="w-48 sm:w-60 md:w-72 object-contain"
        />
      </div>

      {/* Glowing Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00eaff33] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Banner;
