// dashboard.js
'use client';
// dashboard.js
import React from 'react';
import SideNav from "@/app/components/sidenav";
import styles from "./dashboard.module.css";
import MapCard from '../components/mapcard';
import Image from "next/image";

const Dashboard = () => {
    return (
        <>
            <SideNav />
            <div className={styles.container}>
                <div className={styles.main}>
                <div>
                        <Image
                            src="/emergensyslogo.png"
                            alt="CAD Logo"
                            width={270}
                            height={50}
                        />
                    </div>
                    <h1 className={styles.heading}>Incident Response Dashboard</h1>
                    <MapCard />
                </div>
            </div>
        </>

    );
};

export default Dashboard;

