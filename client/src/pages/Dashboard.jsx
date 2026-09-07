import { useState } from "react";
import "../styles/SideBare.css";

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      
      <header className="top-navbar">
        <button className="menu-btn" onClick={toggleSidebar} aria-label="Toggle Menu">
          
          <svg className="menu-icon" viewBox="0 0 24 24" width="28" height="28">
            <path
              fill="#0a4332"
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            />
          </svg>
        </button>
        <h1 className="dashboard-title">Dashboard</h1>
      </header>

      
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>E-Commerce Admin</h3>
          <button className="close-btn" onClick={toggleSidebar}>✕</button>
        </div>

        <ul className="sidebar-menu">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#orders">Orders</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;