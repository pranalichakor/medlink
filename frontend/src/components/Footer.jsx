import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-[#030f2e] text-[#cde9ff] mt-20 px-6 md:px-20 py-10 border-t border-[#1e3a8a]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Left Section */}
        <div className="space-y-4">
          <img src={assets.logo} alt="Logo" className="w-36" />
          <p className="text-sm leading-relaxed text-[#a0c8ff]">
            Your trusted platform for booking appointments with certified doctors.
            Revolutionizing digital healthcare, one click at a time.
          </p>
        </div>

        {/* Center Section */}
        <div className="space-y-4">
          <p className="font-semibold text-[#6fc3ff] uppercase tracking-wider">Company</p>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-[#00eaff] transition">Home</li>
            <li className="cursor-pointer hover:text-[#00eaff] transition">About us</li>
            <li className="cursor-pointer hover:text-[#00eaff] transition">Contact us</li>
            <li className="cursor-pointer hover:text-[#00eaff] transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <p className="font-semibold text-[#6fc3ff] uppercase tracking-wider">Get in Touch</p>
          <ul className="space-y-2 text-sm">
            <li className="text-[#a0c8ff]">+1-212-456-7890</li>
            <li className="text-[#a0c8ff]">chakorstackdev@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="border-t border-[#1e3a8a] text-center text-xs text-[#7aa4d6] pt-6 mt-10">
        © 2024 ChakorStack. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
