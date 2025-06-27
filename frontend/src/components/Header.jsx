import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-14 bg-gradient-to-br from-[#071740] via-[#062a61] to-[#003566] text-white rounded-b-3xl shadow-lg">

      {/* Left Side */}
      <div className="flex-1 mb-10 md:mb-0 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          Book Appointment <br />With Trusted Doctors
        </h1>

        <img src={assets.group_profiles} alt="group" className="mx-auto md:mx-0 my-4 w-48" />

        <p className="text-[#c7e4ff] text-base md:text-lg mb-6">
          Simply browse through our extensive list of trusted doctors,<br />
          and schedule your appointment hassle-free.
        </p>

        <a
          href="#speciality"
          className="inline-flex items-center bg-[#00eaff] text-[#003566] px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-blue-500 transition-transform duration-300"
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="arrow" className="ml-3 w-5 h-5" />
        </a>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <img
          src={assets.header_img}
          alt="header visual"
          className="w-full max-w-md mx-auto drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Header;
