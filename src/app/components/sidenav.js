'use client'

import React, { useState } from 'react';
import { FaBars, FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt, FaBuffer } from 'react-icons/fa'; // Import icons
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./sidenav.css";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const router = useRouter(); // Initialize useRouter

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  function handleLogout(ev) {
    ev.preventDefault();
    router.push('/login');
  };

  const collapsedWidth = 40; // Width of the hamburger icon plus padding

  return (
    <>
      <div className={`sidenav ${isNavOpen ? 'open' : ''}`} style={{ width: isNavOpen ? '200px' : `${collapsedWidth}px` }}>
        <button className="toggle-btn" onClick={toggleNav}>
          <FaBars />
        </button>
        <ul>
          {isNavOpen && (
            <>
              <li><Link className='navLink' href="/dashboard"><FaHome /> Dashboard</Link></li>
              <li><Link className='navLink' href="/dashboard"><FaBuffer /> Event</Link></li>
              <li><Link className='navLink' href="/about"><FaInfoCircle /> About</Link></li>
              <li><Link className='navLink' href="/contact"><FaEnvelope /> Contact</Link></li>
            </>
          )}
          {!isNavOpen && (
            <>
              <li><Link className='navLink' href="/dashboard"><FaHome /></Link></li>
              <li><Link className='navLink' href="/dashboard"><FaBuffer/></Link></li>
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
    </>
  );
};

export default SideNav;
