import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="text-center py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-[#003566] mb-2">Find by Speciality</h2>
      <p className="text-gray-500 text-sm mb-10">
        Simply browse through our extensive list of trusted doctors, schedule <br />
        your appointment hassle-free.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctor/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-[#062a61] hover:text-[#00eaff] transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-24 h-24 rounded-full bg-[#e0f7ff] hover:bg-[#c7f4ff] shadow-lg flex items-center justify-center mb-3 border border-[#b3eaff]">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-sm font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
