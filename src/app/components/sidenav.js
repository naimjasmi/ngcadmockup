'use client';
import React, { useState } from 'react';
import { FaBars, FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import "./sidenav.css";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const collapsedWidth = 40; // Width of the hamburger icon plus padding

  return (
    <>
      <div className={`sidenav ${isNavOpen ? 'open' : ''}`} style={{ width: isNavOpen ? '250px' : `${collapsedWidth}px` }}>
        <button className="toggle-btn" onClick={toggleNav}>
          <FaBars />
        </button>
        <ul>
          {isNavOpen && (
            <>
              <li><FaHome /> Home</li>
              <li><FaInfoCircle /> About</li>
              <li><FaEnvelope /> Contact</li>
            </>
          )}
          {!isNavOpen && (
            <>
              <li><FaHome /></li>
              <li><FaInfoCircle /></li>
              <li><FaEnvelope /></li>
            </>
          )}
        </ul>
        <ul>
          {isNavOpen && (
            <>
              <li><FaSignOutAlt /> Log out</li>
            </>
          )}
          {!isNavOpen && (
            <>
              <li><FaSignOutAlt /></li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default SideNav;
