import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
      navigate('/login');
    } else if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
      navigate('/login');
    }
  };

  return (
    <div className="h-16 w-full flex items-center justify-between px-6 md:px-12 py-2 shadow-sm bg-[#f0f8ff] border-b border-[#b3d9ff]">
      {/* Logo & Role */}
      <div className="flex items-center gap-4">
        <img
          src={assets.logo}
          alt="logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate('/')}
        />

        {aToken && (
          <span className="text-xs px-3 py-1 border border-[#00509e] bg-[#e0f0ff] text-[#003566] rounded-full font-medium">
            Admin
          </span>
        )}

        {dToken && (
          <span className="text-xs px-3 py-1 border border-green-400 bg-green-50 text-green-700 rounded-full font-medium">
            Doctor
          </span>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-[#00509e] hover:bg-[#003f7f] text-white text-sm px-5 py-2 rounded-full transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
