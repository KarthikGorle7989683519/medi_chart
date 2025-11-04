// components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src="src/assets/TestLogo.svg" alt="Tech.Care Logo" />
      </div>
      <div className="nav">
        <ul>
          <li><i className="icon">🏠</i> Overview</li>
          <li className="active"><i className="icon">👥</i> Records</li>
          <li><i className="icon">📅</i> Schedule</li>
          <li><i className="icon">✉️</i> Message</li>
          <li><i className="icon">💳</i> Transactions</li>
        </ul>
      </div>
      <div className="profile">
        <img src="src/assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png" alt="User" />
        <span>Jane Simmons</span>
      </div>
    </div>
  );
};

export default Header;