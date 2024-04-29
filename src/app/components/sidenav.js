'use client'

// sidenav.js
import React, { useState } from 'react';
import { FaBars, FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt, FaBuffer, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./sidenav.css";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [showTopNav, setShowTopNav] = useState(false);
  const router = useRouter();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleTopNav = () => {
    setShowTopNav(!showTopNav);
  };

  function handleLogout(ev) {
    ev.preventDefault();
    router.push('/login');
  };

  const collapsedWidth = 40;

  return (
    <>
      <div className={`sidenav ${isNavOpen ? 'open' : ''}`} style={{ width: isNavOpen ? '200px' : `${collapsedWidth}px` }}>
        <button className="toggle-btn" onClick={toggleNav}>
          {isNavOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul>
          {isNavOpen && (
            <>
              <li><Link className='navLink' href="/dashboard"><FaHome /> Dashboard</Link></li>
              <li onClick={toggleTopNav}><FaBuffer /> Event</li>
              <li><Link className='navLink' href="/about"><FaInfoCircle /> About</Link></li>
              <li><Link className='navLink' href="/contact"><FaEnvelope /> Contact</Link></li>
            </>
          )}
          {!isNavOpen && (
            <>
              <li><Link className='navLink' href="/dashboard"><FaHome /></Link></li>
              <li onClick={toggleTopNav}><FaBuffer/></li>
              <li><Link className='navLink' href="/about"><FaInfoCircle /></Link></li>
              <li><Link className='navLink' href="/contact" ><FaEnvelope /></Link></li>
            </>
          )}
        </ul>
        <ul>
          {isNavOpen && (
            <>
              <li onClick={handleLogout} className='navLink'><FaSignOutAlt /> Log out</li>
            </>
          )}
          {!isNavOpen && (
            <>
              <li onClick={handleLogout} className='navLink'><FaSignOutAlt /></li>
            </>
          )}
        </ul>
      </div>
      {showTopNav && (
        <div className="top-nav">
          <ul>
            <li>Report Event</li>
            <li>Event summary</li>
            <li>Event Management</li>
            <li className="close-button" onClick={toggleTopNav}>
              <FaTimes />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SideNav;

