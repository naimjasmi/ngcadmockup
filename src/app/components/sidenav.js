'use client';
import React, { useState } from 'react';
import { FaBars, FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import Link from 'next/link';
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
              <li><Link href="/dashboard" className='navLink'><FaHome /> Dashboard</Link></li>
              <li><Link href="/about" className='navLink'><FaInfoCircle /> About</Link></li>
              <li><Link href="/contact" className='navLink'><FaEnvelope /> Contact</Link></li>
            </>
          )}
          {!isNavOpen && (
            <>
              <li><Link href="/dashboard" className='navLink'><FaHome /></Link></li>
              <li><Link href="/about" className='navLink'><FaInfoCircle /></Link></li>
              <li><Link href="/contact" className='navLink'><FaEnvelope /></Link></li>
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
