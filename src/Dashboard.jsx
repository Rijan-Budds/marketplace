import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from './assets/logo.jpg';


export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <img src={logo} alt="Logo" className="dashboard-logo" />
      </header>

      <div className="dashboard-container">
        <h1>this will be the marketplace main page</h1>
        <button className="logout-button" onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
}
