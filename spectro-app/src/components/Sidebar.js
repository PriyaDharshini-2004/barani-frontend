import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/Barani logo.jpg"

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Spectro", path: "/spectro" },
    { name:"Quality Plan",path:"/quality" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-container">
          <img src={logo} alt="Barani Hydraulics Logo" className="logo-image" />
        </div>
      </div>
      <div className="sidebar-header">
        <h2>MENU</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink 
              to={item.path}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;