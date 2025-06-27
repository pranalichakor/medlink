import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-6 my-16 text-[#062a61] px-4 md:px-10'>
      <h1 className='text-3xl font-bold text-center text-[#003566]'>Top Doctors to Book</h1>
      <p className='text-center text-gray-500 max-w-xl'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className='bg-[#e6f4ff] border border-[#b3d9ff] rounded-xl overflow-hidden shadow-md p-4 flex flex-col items-center gap-2 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-40 object-cover rounded-lg'
            />

            <div className='flex items-center gap-2 text-sm text-green-600 mt-2'>
              <span className='w-2 h-2 bg-green-500 rounded-full'></span>
              <p>Available</p>
            </div>

            <p className='font-semibold text-md text-center'>{item.name}</p>
            <p className='text-sm text-[#062a61] text-center'>{item.speciality}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctor');
          scrollTo(0, 0);
        }}
        className='mt-8 px-6 py-2 bg-[#003566] text-white rounded-full hover:bg-[#00509e] transition'
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
