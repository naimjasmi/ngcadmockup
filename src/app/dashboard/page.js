// React Component (dashboard.js)
import React from 'react';
import SideNav from "@/app/components/sidenav";
import styles from "./dashboard.module.css";

const Dashboard = () => {
    return (
        <>
            <SideNav />
            <div className={styles.main}>
                <h1>Emergency CAD Admin Dashboard</h1>
                <div className={styles["card-container"]}>
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
                    <div className={styles.card}>
                        <h2>Manage Vehicles</h2>
                        <p>Track, assign, and maintain emergency response vehicles.</p>
                        <button>View Vehicles</button>
                    </div>
                    <div className={styles.card}>
                        <h2>Manage Dispatch Centers</h2>
                        <p>Coordinate dispatch operations across multiple centers.</p>
                        <button>View Dispatch Centers</button>
                    </div>
                    <div className={styles.card}>
                        <h2>Generate Reports</h2>
                        <p>Generate detailed reports on incidents, user activities, and system performance.</p>
                        <button>Generate Reports</button>
                    </div>
                    <div className={styles.card}>
                        <h2>Manage Notifications</h2>
                        <p>Configure and send notifications to emergency response teams.</p>
                        <button>Manage Notifications</button>
                    </div>
                    <div className={styles.card}>
                        <h2>System Settings</h2>
                        <p>Customize system settings and preferences.</p>
                        <button>View Settings</button>
                    </div>
                    <div className={styles.card}>
                        <h2>Personnel Training</h2>
                        <p>Organize and track training programs for emergency personnel.</p>
                        <button>Manage Training</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
