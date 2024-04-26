// dashboard.js
'use client';
// dashboard.js
import React from 'react';
import SideNav from "@/app/components/sidenav";
import styles from "./dashboard.module.css";
import MapCard from '../components/mapcard';

const Dashboard = () => {
    return (
        <>
            <SideNav />
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1>Emergency CAD Admin Dashboard</h1>
                    <MapCard />
                </div>
            </div>
        </>

    );
};

export default Dashboard;

