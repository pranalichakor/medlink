import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 sm:px-10 py-16 bg-[#030f2e] text-[#e0f7ff]">
      {/* About Us Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-10 text-[#00eaff]">
        ABOUT <span className="font-bold text-white">US</span>
      </h2>

      {/* About Us Content */}
      <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
        <img
          src={assets.about_image}
          alt="About"
          className="w-full max-w-md rounded-lg shadow-lg border border-[#00b4d8]"
        />
        <div className="flex-1 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            Welcome to <b className="text-[#00eaff]">MedLink</b>, your trusted partner in managing your healthcare needs conveniently and efficiently. At <b className="text-[#00eaff]">Prescripto</b>, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            <b className="text-[#00eaff]">Prescripto</b> is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <div>
            <b className="block text-md font-bold mb-1 text-[#00eaff]">Our Vision</b>
            <p>
              Our vision at <b className="text-[#00eaff]">Prescripto</b> is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <h2 className="text-lg sm:text-xl font-semibold mb-6 text-[#00eaff]">
        WHY <span className="font-bold text-white">CHOOSE US</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-lg overflow-hidden text-sm text-[#cdefff]">
        {/* Efficiency */}
        <div className="p-6 bg-[#0f1d4d] border border-[#00b4d8] rounded-lg hover:bg-[#112b5f] transition duration-300">
          <h3 className="font-bold mb-2 text-[#00eaff]">EFFICIENCY:</h3>
          <p>Streamlined Appointment Scheduling<br />That Fits Into Your Busy Lifestyle.</p>
        </div>

        {/* Convenience */}
        <div className="p-6 bg-[#0f1d4d] border border-[#00b4d8] rounded-lg hover:bg-[#112b5f] transition duration-300">
          <h3 className="font-bold mb-2 text-[#00eaff]">CONVENIENCE:</h3>
          <p>Access To A Network Of Trusted<br />Healthcare Professionals In Your Area.</p>
        </div>

        {/* Personalization */}
        <div className="p-6 bg-[#0f1d4d] border border-[#00b4d8] rounded-lg hover:bg-[#112b5f] transition duration-300">
          <h3 className="font-bold mb-2 text-[#00eaff]">PERSONALIZATION:</h3>
          <p>Tailored Recommendations And Reminders<br />To Help You Stay On Top Of Your Health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
