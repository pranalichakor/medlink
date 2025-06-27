import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="w-64 h-[130vh] bg-[#f0f8ff] border-r border-[#cce6ff] shadow-md p-6 text-sm font-medium text-[#003566]">
      <ul className="flex flex-col gap-3">
        {/* Admin Sidebar */}
        {aToken && (
          <>
            <SidebarLink to="/admin-dashboard" icon={assets.home_icon} label="Dashboard" />
            <SidebarLink to="/all-appointments" icon={assets.appointment_icon} label="Appointments" />
            <SidebarLink to="/add-doctor" icon={assets.add_icon} label="Add Doctor" />
            <SidebarLink to="/doctor-list" icon={assets.people_icon} label="Doctors List" />
          </>
        )}

        {/* Doctor Sidebar */}
        {dToken && (
          <>
            <SidebarLink to="/doctor-dashboard" icon={assets.home_icon} label="Dashboard" />
            <SidebarLink to="/doctor-appointments" icon={assets.appointment_icon} label="Appointments" />
            <SidebarLink to="/doctor-profile" icon={assets.people_icon} label="Profile" />
          </>
        )}
      </ul>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-2 rounded-lg transition-all ${
        isActive
          ? "bg-[#00509e] text-white"
          : "hover:bg-[#e6f2ff] text-[#003566]"
      }`
    }
  >
    <img src={icon} alt={label} className="w-5 h-5" />
    <p>{label}</p>
  </NavLink>
);

export default Sidebar;
