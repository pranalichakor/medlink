import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctor = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  return (
    <div className="px-4 sm:px-10 py-10 bg-[#030f2e] text-[#e0f7ff]">
      <p className="text-2xl font-bold mb-10 text-center text-[#00eaff]">
        Browse through the <span className="text-white">doctors specialist</span>.
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Filter button for mobile */}
        <button
          className={`py-2 px-4 border rounded text-sm transition-all sm:hidden w-fit ${
            showFilter ? 'bg-[#00eaff] text-white' : 'bg-[#0f1d4d] text-[#cdefff]'
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Mobile Filter Sidebar (toggleable) */}
        {showFilter && (
          <div className="sm:hidden w-full bg-[#112b5f] rounded-xl p-4 shadow-sm border border-[#00b4d8] h-fit">
            {specialities.map((spec, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(`/doctor/${spec}`);
                  setShowFilter(false);
                }}
                className={`w-full text-left px-4 py-2 mb-2 rounded-md text-sm font-medium ${
                  spec.toLowerCase() === speciality?.toLowerCase()
                    ? 'bg-[#00eaff] text-white'
                    : 'bg-[#0f1d4d] text-[#cdefff] hover:bg-[#00b4d8]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        )}

        {/* Desktop Filter Sidebar */}
        <div className="hidden sm:block w-full md:w-[250px] bg-[#112b5f] rounded-xl p-4 shadow-sm border border-[#00b4d8] h-fit">
          {specialities.map((spec, idx) => (
            <button
              key={idx}
              onClick={() => navigate(`/doctor/${spec}`)}
              className={`w-full text-left px-4 py-2 mb-2 rounded-md text-sm font-medium ${
                spec.toLowerCase() === speciality?.toLowerCase()
                  ? 'bg-[#00eaff] text-white'
                  : 'bg-[#0f1d4d] text-[#cdefff] hover:bg-[#00b4d8]'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-[#0f1d4d] border border-[#00b4d8] rounded-xl p-4 shadow hover:shadow-md hover:-translate-y-2 transition-all cursor-pointer flex flex-col items-center text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4 border border-[#00eaff]"
              />
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Available
              </div>
              <p className="font-semibold text-md text-[#00eaff]">{item.name}</p>
              <p className="text-sm text-[#cdefff]">{item.speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
