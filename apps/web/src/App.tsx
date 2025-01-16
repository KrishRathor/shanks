import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
