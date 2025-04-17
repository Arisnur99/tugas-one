import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Fragment/Dashboard";
import Login from "./Components/Fragment/FormLogin";
import Register from "./Components/Fragment/FormRegister";
import PasienAdd from "./Components/Fragment/Pasien";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Pasien" element={<PasienAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
