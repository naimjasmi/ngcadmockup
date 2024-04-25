// dashboard.js
'use client';
import React from 'react';
import SideNav from "@/app/components/sidenav";
import styles from "./dashboard.module.css";
import MapCard from '../components/mapcard';
import ChatBox from '../components/chatbox';

const Dashboard = () => {
    return (
        <>
            <div className={styles.main}>
                <SideNav />
                <h1>Emergency CAD Admin Dashboard</h1>
                <div className={styles.container}>
                    <div className={styles.leftPanel}>
                        <div className={styles.card}>
                            <h2>Manage Emergencies</h2>
                            <p>View, edit, and resolve emergency incidents.</p>
                            <button>View Emergencies</button>
                        </div>
                        <div className={styles.card}>
                            <h2>Manage Users</h2>
                            <p>Manage user accounts and permissions.</p>
                            <button>View Users</button>
                        </div>
                        <div className={styles.card}>
                            <h2>View Statistics</h2>
                            <p>Access statistical data on emergencies and user activities.</p>
                            <button>View Statistics</button>
                        </div>
                    </div>
                    <div className={styles.rightPanel}>
                        <MapCard />
                        <ChatBox className={styles.chatboxWidget} />
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default Dashboard;
