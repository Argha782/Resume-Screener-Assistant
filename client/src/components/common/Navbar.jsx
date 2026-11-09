import { NavLink, useNavigate } from "react-router-dom";
import { FilePlus2, History } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  return <header className="topbar"><div className="nav-inner">
    <button className="brand" onClick={() => navigate("/")}>
      <span className="brand-mark">RS</span>
      <span><b>Resume Screener</b><small>Synthweb · HR internal tool</small></span>
    </button>
    <nav>
      <NavLink to="/" end className={({isActive}) => `nav-btn ${isActive ? "active" : ""}`}><FilePlus2 size={15}/> New Analysis</NavLink>
      <NavLink to="/history" className={({isActive}) => `nav-btn ${isActive ? "active" : ""}`}><History size={15}/> History</NavLink>
    </nav>
  </div></header>;
}