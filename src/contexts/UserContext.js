import React, { useState } from "react";

const UserContext = React.createContext(null);

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) throw new Error("useData precisa estar em UserContextProvider");
  return context;
};

export const UserContextProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState({
    username: "robsoncorreia",
    name: "Robson",
    lastName: "Correia",
    email: "robccorreia@gmail.com",
    profileImage: "https://avatars.githubusercontent.com/u/29904660?v=4",
  });

  console.log(dataUser);

  return (
    <UserContext.Provider value={{ dataUser, setDataUser }}>
      {children}
    </UserContext.Provider>
  );
};
