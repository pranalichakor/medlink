import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Doctors List</h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-800 uppercase text-xs">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Speciality</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
              {doctors.map((doctor, index) => (
                <tr key={doctor._id} className="hover:bg-blue-50 transition">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{doctor.name}</td>
                  <td className="py-3 px-4">{doctor.speciality}</td>
                  <td className="py-3 px-4">{doctor.experience} yrs</td>
                  <td className="py-3 px-4">
                    {doctor.available ? (
                      <span className="text-green-600 font-semibold">Available</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Unavailable</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => changeAvailability(doctor._id)}
                      className={`px-4 py-1 rounded-full text-white text-xs font-medium transition duration-300 ${
                        doctor.available
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {doctor.available ? "Make Unavailable" : "Make Available"}
                    </button>
                  </td>
                </tr>
              ))}

              {doctors.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No doctors found.
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

export default DoctorsList;
