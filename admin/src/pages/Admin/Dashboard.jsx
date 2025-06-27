import { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  return (
    dashData && (
      <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-6 mb-10">
          {/* Doctors Card */}
          <div className="bg-white shadow-lg border rounded-2xl p-5 w-60 flex items-center gap-4">
            <img src={assets.doctor_icon} className="w-12" alt="Doctors" />
            <div>
              <p className="text-2xl font-bold text-blue-700">{dashData.doctors}</p>
              <p className="text-gray-500 text-sm">Doctors</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white shadow-lg border rounded-2xl p-5 w-60 flex items-center gap-4">
            <img src={assets.appointments_icon} className="w-12" alt="Appointments" />
            <div>
              <p className="text-2xl font-bold text-blue-700">{dashData.appointments}</p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white shadow-lg border rounded-2xl p-5 w-60 flex items-center gap-4">
            <img src={assets.patients_icon} className="w-12" alt="Patients" />
            <div>
              <p className="text-2xl font-bold text-blue-700">{dashData.patients}</p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="bg-white shadow-lg border rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Latest Appointments</h2>
          {dashData.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.map((appt, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b last:border-none hover:bg-blue-50 px-2 rounded transition">
                <div className="flex gap-3 items-center">
                  <img src={assets.profile_icon} className="w-10 h-10 object-cover rounded-full" alt="Profile" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {appt.doc?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Booking on{" "}
                      {new Date(appt.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-600 text-lg font-bold transition"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent appointments.</p>
          )}
        </div>
      </div>
    )
  );
};

export default Dashboard;
