import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const AllAppointments = () => {
  const {
    appointments,
    getAllAppointments,
    cancelAppointment,
  } = useContext(AdminContext);

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">All Appointments</h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-800 uppercase text-xs rounded-md">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
              {appointments.map((appointment, index) => (
                <tr key={appointment._id} className="hover:bg-blue-50 transition">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{appointment.user?.name || "N/A"}</td>
                  <td className="py-3 px-4">
                    {appointment.slotDate} | {appointment.slotTime}
                  </td>
                  <td className="py-3 px-4">{appointment.doc?.name || "N/A"}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => cancelAppointment(appointment._id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
