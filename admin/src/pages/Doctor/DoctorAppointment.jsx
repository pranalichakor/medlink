import React, { useState, useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointment = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    if (!dToken) return;
    fetch(`${backendUrl}/api/doctor/appointments`, {
      headers: { Authorization: `Bearer ${dToken}` }
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) setAppts(d.appointments);
      });
  }, [dToken]);

  const markComplete = (id) => {
    fetch(`${backendUrl}/api/doctor/appointments/${id}/complete`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${dToken}` }
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setAppts(prev => prev.map(a => a._id === id ? d.appointment : a));
        }
      });
  };

  return (
    <div className="p-8 w-full bg-[#f0faff] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#003566]">Appointments</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-left border border-[#d4e9ff]">
          <thead className="bg-[#e6f2ff] text-[#003566] uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appts.map((a, i) => (
              <tr key={i} className="border-b border-[#e0f0ff] hover:bg-[#f6fbff]">
                <td className="px-6 py-4">{a.user?.name}</td>
                <td className="px-6 py-4">{a.user?.email}</td>
                <td className="px-6 py-4">{a.slotDate}</td>
                <td className="px-6 py-4">{a.slotTime}</td>
                <td className="px-6 py-4">
                  {a.isCompleted ? (
                    <span className="text-green-600 font-semibold">Completed</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {!a.isCompleted && (
                    <button
                      onClick={() => markComplete(a._id)}
                      className="bg-[#00b894] hover:bg-[#019874] text-white px-4 py-1 rounded-full shadow-md transition duration-300"
                    >
                      Mark Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {appts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;
