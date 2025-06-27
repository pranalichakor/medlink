import { createContext, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <DoctorContext.Provider value={{ dToken, setDToken, backendUrl }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
