import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 py-16 bg-[#030f2e] text-[#e0f7ff]">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-10 text-[#00eaff]">
        CONTACT <span className="font-bold text-white">US</span>
      </h2>

      {/* Content Grid */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Image */}
        <img
          src={assets.contact_image}
          alt="Contact"
          className="w-full max-w-md rounded-lg shadow-lg border border-[#00b4d8]"
        />

        {/* Text Info */}
        <div className="flex-1 space-y-5 text-sm sm:text-base leading-relaxed">
          {/* Office Info */}
          <div>
            <h3 className="font-bold mb-1 text-[#00eaff]">OUR OFFICE</h3>
            <p className="text-[#cdefff]">
              54709 Willms Station<br />
              Suite 350, Washington, USA
            </p>
            <p className="mt-2 text-[#cdefff]">Tel: (415) 555-0132</p>
            <p className="text-[#cdefff]">Email: greatstackdev@gmail.com</p>
          </div>

          {/* Careers Info */}
          <div>
            <h3 className="font-bold mb-1 text-[#00eaff]">CAREERS AT PRESCRIPTO</h3>
            <p className="text-[#cdefff]">Learn more about our teams and job openings.</p>
            <button className="mt-3 px-5 py-2 border border-[#00b4d8] text-sm text-[#00eaff] rounded hover:bg-[#112b5f] transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
