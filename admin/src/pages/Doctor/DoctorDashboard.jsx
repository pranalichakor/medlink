import React, { useEffect, useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [stats, setStats] = useState({ total: 0, completed: 0 });

  useEffect(() => {
    if (!dToken) return;
    fetch(`${backendUrl}/api/doctor/appointments`, {
      headers: { Authorization: `Bearer ${dToken}` }
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setStats({
            total: d.appointments.length,
            completed: d.appointments.filter(a => a.isCompleted).length
          });
        }
      });
  }, [dToken]);

  return (
    <div className="p-8 w-full bg-[#f0faff] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-[#003566]">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border-l-4 border-[#0058d4] shadow-xl rounded-xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-sm text-gray-500 font-medium">Total Appointments</h2>
          <p className="text-4xl font-bold text-[#0058d4] mt-1">{stats.total}</p>
        </div>
        <div className="bg-white border-l-4 border-[#00b894] shadow-xl rounded-xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-sm text-gray-500 font-medium">Completed</h2>
          <p className="text-4xl font-bold text-[#00b894] mt-1">{stats.completed}</p>
        </div>
        <div className="bg-white border-l-4 border-[#ff5252] shadow-xl rounded-xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-sm text-gray-500 font-medium">Pending</h2>
          <p className="text-4xl font-bold text-[#ff5252] mt-1">{stats.total - stats.completed}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
