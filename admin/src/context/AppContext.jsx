import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/all-doctors`, {}, {
  headers: {
    Authorization: `Bearer ${adminToken}` // ⬅️ if required
  }
});

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      toast.error(error.message || "Server error");
    }
  };

  const value = {
    appointments,
    setAppointments,
    getAllAppointments,
    backendUrl
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
