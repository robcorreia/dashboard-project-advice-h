import React, { useState } from "react";
import { schedulesMock } from "../components/mocks/shedules";
import { doctorsMock } from "../components/mocks/doctors";

const SchedulesContext = React.createContext(null);

export const useSchedules = () => {
  const context = React.useContext(SchedulesContext);

  if (!context)
    throw new Error("useData precisa estar em SchedulesContextProvider");
  return context;
};

export const SchedulesContextProvider = ({ children }) => {
  const [dataSchedules, setDataSchedules] = useState(schedulesMock);

  const [doctors, setDoctors] = useState(doctorsMock);

  return (
    <SchedulesContext.Provider
      value={{ dataSchedules, setDataSchedules, doctors, setDoctors }}
    >
      {children}
    </SchedulesContext.Provider>
  );
};
