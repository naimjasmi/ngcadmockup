import React from 'react';
import SideNav from "@/app/components/sidenav";
import './dashboard.module.css'; // Import CSS file

const Dashboard = () => {
    return (
        <>
        <SideNav/>
            <div className="main">
                <h1>Welcome to the Dashboard!</h1>
                <p>This is your dashboard page. You can add your content here.</p>
            </div>
        </>

    );
};

export default Dashboard;

