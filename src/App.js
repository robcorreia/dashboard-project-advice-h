import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SideNav from "./components/SideMenu";
import Summary from "./pages/Sumarry";
import Schedule from "./pages/Schedule";
import Consult from "./pages/Consult";
import Doctors from "./pages/Doctors";
import { SchedulesContextProvider } from "./contexts/SchedulesContext";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <SchedulesContextProvider>
          <Header />
          <div className="layout">
            <SideNav />
            <main>
              <Routes>
                <Route path="/" element={<Summary />} />
                <Route path="/agendar" element={<Schedule />} />
                <Route path="/consultar" element={<Consult />} />
                <Route path="/medicos" element={<Doctors />} />
              </Routes>
            </main>
          </div>
        </SchedulesContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
