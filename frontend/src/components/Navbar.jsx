import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
const { token, setToken } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(true);

  const logout = () => {
  setToken(false); // Don't pass string 'false', use actual boolean
  localStorage.removeItem('token');
};


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <div className="flex items-center gap-4">
        <img onClick={() => navigate('/')} className='w-44' src={assets.logo} alt="logo" />
      </div>

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <li className='py-1'>
          <NavLink to="/">HOME</NavLink>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </li>
        <li className='py-1'>
          <NavLink to="/doctor">ALL DOCTORS</NavLink>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </li>
        <li className='py-1'>
          <NavLink to="/about">ABOUT</NavLink>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </li>
        <li className='py-1'>
          <NavLink to="/contact">CONTACT</NavLink>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {
          token
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt='' />
              <img className='w-2.5' src={assets.dropdown_icon} alt='' />
              <div className='absolute top-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p
                    onClick={() => {
                      logout();        // Call your logout function
                      navigate('/login');
                    }}
                    className='hover:text-black cursor-pointer'
                  >
                    Logout
                  </p>

                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* mobile menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex justify-between items-center px-5 py-6">
            <img src={assets.logo} alt="logo" className="w-36" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" className="w-6 cursor-pointer" />
          </div>
          <ul className="flex flex-col gap-2 mt-5 px-5 text-lg font-medium text-gray-700">
            <NavLink onClick={() => setShowMenu(false)} to="/"><p>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctor"> <p>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about"><p>ABOUT </p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact"><p>CONTACT </p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
