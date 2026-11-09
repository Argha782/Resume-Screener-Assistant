import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Report from "./pages/Report";

export default function App() {
  return <div className="app-shell">
    <Navbar />
    <main className="main">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/report/:id" element={<Report />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>;
}